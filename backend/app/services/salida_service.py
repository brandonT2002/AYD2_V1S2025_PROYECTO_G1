from app.services.base_service import BaseService
from app.models.venta_model import VentaModel
from app.models.Inventario_model import InventarioModel
from app.models.Cliente import Cliente
from app.models.auth_model import AuthModel
from datetime import datetime
from app.mail.notif_email import enviar_correo
import os
from dotenv import load_dotenv
load_dotenv()
EMAIL_NOTIFICATIONS = os.getenv('EMAIL_NOTIFICATIONS')

class SalidaService(BaseService):
    """Servicio para manejar la lógica de salidas de bodega"""
    
    def setup(self):
        self.venta_model = VentaModel()
        self.inventario_model = InventarioModel()
        self.Cliente = Cliente()
        self.auth_model = AuthModel()
    
    def buscar_ventas(self, criterio, valor):
        """Busca ventas según el criterio especificado"""
        if criterio == 'envio':
            return self.venta_model.buscar_ventas_por_envio(valor)
        elif criterio == 'cliente':
            return self.venta_model.buscar_ventas_por_cliente(valor)
        else:
            raise ValueError("Criterio de búsqueda no válido")
    
    def obtener_detalle_venta(self, venta_id):
        """Obtiene el detalle completo de una venta"""
        return self.venta_model.obtener_productos_venta(venta_id)
    
    def registrar_salida_bodega(self, venta_id, fecha_salida=None):
        """Registra la salida de bodega para una venta"""
        if fecha_salida is None:
            fecha_salida = datetime.now().strftime('%Y-%m-%d')
        
        venta = self.venta_model.obtener_productos_venta(venta_id)
        if not venta:
            raise ValueError("Venta no encontrada")
        
        print(f"\n🏪 INICIANDO REGISTRO DE SALIDA DE BODEGA")
        print(f"Venta ID: {venta_id}")
        print(f"Fecha de salida: {fecha_salida}")
        print("=" * 60)
        
        # Verificar stock antes de procesar la salida
        productos_con_stock_bajo = []
        productos_verificados = []
        
        tipo = "Salida"
        for producto in venta:
            cantidad_fardos = producto['cantidad_unidades']
            unidades_totales = producto['total_producto']
            producto_id = producto['producto_id']
            
            print(f"\n📦 PROCESANDO PRODUCTO:")
            print(f"   Producto ID: {producto_id}")
            print(f"   Cantidad a sacar: {cantidad_fardos} fardos")
            print(f"   Unidades totales: {unidades_totales}")
            
            # Verificar stock ANTES de la salida
            verificacion_antes = self.inventario_model.verificar_stock_minimo(producto_id, 10)
            if verificacion_antes:
                productos_verificados.append({
                    'producto_id': producto_id,
                    'antes': verificacion_antes,
                    'cantidad_salida': cantidad_fardos
                })
            
            # Registrar la salida en inventario_movimientos
            self.inventario_model.salida_inventario(tipo, cantidad_fardos, unidades_totales, fecha_salida, producto_id)
            
            # Actualizar stock en inventario
            self.inventario_model.update_stock_inventario_salida(producto_id, cantidad_fardos)
            
            # Verificar stock DESPUÉS de la salida
            print(f"\n📊 VERIFICACIÓN POST-SALIDA:")
            verificacion_despues = self.inventario_model.verificar_stock_minimo(producto_id, 10)
            if verificacion_despues and not verificacion_despues['cumple_minimo']:
                productos_con_stock_bajo.append(verificacion_despues)
        
        # Resumen final
        print(f"\n📋 RESUMEN DE SALIDA:")
        print(f"   Total productos procesados: {len(venta)}")
        print(f"   Productos con stock bajo: {len(productos_con_stock_bajo)}")

        # unimos por comas los ids de los productos con stock bajo
        id_productos_stock_bajo = ", ".join([str(p['producto_id']) for p in productos_con_stock_bajo])
        
        if productos_con_stock_bajo:
            fecha = datetime.now().strftime('%d/%m/%Y a las %I:%M %p')
            print("Esta es la fecha:", fecha)
            
            # Obtener usuarios con rol_id 1 (Gerencia General) o 3 (Gerente de Inventario)
            usuarios_notificar = self.auth_model.obtener_usuarios_por_roles([1, 3])
            
            if usuarios_notificar:
                print(f"📧 Enviando notificaciones a {len(usuarios_notificar)} usuarios...")
                for usuario in usuarios_notificar:
                    try:
                        enviar_correo(
                            destinatario=usuario['correo'],
                            nombre=usuario['nombre'],
                            fecha=fecha,
                            id_productos_stock_bajo=id_productos_stock_bajo
                        )
                        print(f"   ✅ Correo enviado a {usuario['nombre']} ({usuario['correo']})")
                    except Exception as e:
                        print(f"   ❌ Error enviando correo a {usuario['nombre']}: {str(e)}")
            else:
                print("⚠️  No se encontraron usuarios para notificar")
            
            print(f"\n🚨 ALERTA - PRODUCTOS CON STOCK BAJO:")
            for producto in productos_con_stock_bajo:
                print(f"   ⚠️  {producto['producto_nombre']}: {producto['unidades_restantes']} unidades ({producto['porcentaje_actual']}%)")
        else:
            print(f"\n✅ TODOS LOS PRODUCTOS MANTIENEN STOCK ADECUADO")

        
        print("=" * 60)
        
        return {
            'success': True,
            'message': 'Salida de bodega registrada exitosamente',
            'venta_id': venta_id,
            'fecha_salida': fecha_salida,
            'productos_procesados': len(venta),
            'productos_con_stock_bajo': productos_con_stock_bajo,
            'alerta_stock_bajo': len(productos_con_stock_bajo) > 0
        }