from app.services.base_service import BaseService
from app.models.Inventario_model import InventarioModel

class InventarioService(BaseService):
    """Servicio para manejar la lógica de inventario"""

    def setup(self):
        self.inventario_model = InventarioModel()

    def verificar_existencia_inventario(self, producto_id, duca_id):
        """Verifica si existe un inventario para un producto y Duca específicos"""
        return self.inventario_model.buscar_si_existe_inventario(producto_id, duca_id)

    def registrar_duca(self, numero_duca, fecha, numero_contendor, numero_duca_rectificada=None, fecha_duca_rectificada=None):
        """Registra un nuevo Duca en el sistema"""
        return self.inventario_model.insertar_duca(numero_duca, fecha, numero_contendor, numero_duca_rectificada, fecha_duca_rectificada)

    def registrar_movimiento_inventario(self, tipo, cantidad_fardos, unidades_totales,   producto_id, duca_id):
        """Registra un nuevo movimiento de inventario"""
        return self.inventario_model.insertar_inventario(tipo, cantidad_fardos, unidades_totales,  producto_id, duca_id)
    
    def actualizar_fecha_creacion(self, inventario_id, fecha):
        """Actualiza el campo created_at de un movimiento de inventario"""
        self.inventario_model.update_created_at(inventario_id, fecha)
    
    def actualizar_stock_inventario(self, producto_id, total):
        """Actualiza el stock de un producto en inventario"""
        self.inventario_model.update_stock_intentario(producto_id, total)