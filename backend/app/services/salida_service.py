from app.services.base_service import BaseService
from app.models.venta_model import VentaModel
from app.models.Inventario_model import InventarioModel
from app.models.Cliente import Cliente
from datetime import datetime

class SalidaService(BaseService):
    """Servicio para manejar la lógica de salidas de bodega"""
    
    def setup(self):
        self.venta_model = VentaModel()
        self.inventario_model = InventarioModel()
        self.Cliente = Cliente()
    
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
        print(venta)
        # result = self.venta_model.actualizar_fecha_salida(venta_id, fecha_salida)
        tipo = "Salida"
        for producto in venta:
            # print(f"Producto: {producto['producto_nombre']}")
            cantidad_fardos = producto['cantidad_unidades']
            unidades_totales = producto['total_producto']
            producto_id = producto['producto_id']
            print(f"Producto ID: {producto_id}, Cantidad Fardos: {cantidad_fardos}, Unidades Totales: {unidades_totales}")
            self.inventario_model.salida_inventario(tipo, cantidad_fardos, unidades_totales, fecha_salida, producto_id)
            self.inventario_model.update_stock_inventario_salida(producto_id, cantidad_fardos)
        
        return {
            'success': True,
            'message': 'Salida de bodega registrada exitosamente',
            'venta_id': venta_id,
            'fecha_salida': fecha_salida
        }