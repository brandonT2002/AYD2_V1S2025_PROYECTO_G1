from app.services.base_service import BaseService
from app.models.Ventas import Venta
from datetime import datetime

class Ventas(BaseService):
    """Servicio para manejar la lógica de salidas de bodega"""
    
    def setup(self):
        self.venta_model = Venta()

    def create(self, data):
        """Crea una nueva venta"""
        return self.venta_model.create_venta(data)
    
    def get_venta(self, venta_id):
        """Obtiene una venta por su ID"""
        return self.venta_model.get_venta_by_id(venta_id)
    
    def update_venta(self, venta_id, data):
        """Actualiza una venta existente"""
        return self.venta_model.update_venta(venta_id, data)
    