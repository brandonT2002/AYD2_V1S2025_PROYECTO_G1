from app.services.base_service import BaseService
from app.models.venta_model import VentaModel
from app.models.Cliente import Cliente
from datetime import datetime

class SalidaService(BaseService):
    """Servicio para manejar la lógica de salidas de bodega"""
    
    def setup(self):
        self.venta_model = VentaModel()
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
        
        venta = self.venta_model.obtener_venta_completa(venta_id)
        if not venta:
            raise ValueError("Venta no encontrada")
        
        result = self.venta_model.actualizar_fecha_salida(venta_id, fecha_salida)
        
        return {
            'success': True,
            'message': 'Salida de bodega registrada exitosamente',
            'venta_id': venta_id,
            'fecha_salida': fecha_salida
        }