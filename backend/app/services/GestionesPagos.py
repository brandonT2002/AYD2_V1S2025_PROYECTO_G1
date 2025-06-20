from app.services.base_service import BaseService
from app.models.PagosModels import PagosModels
from datetime import datetime

class PagosService(BaseService):
    """Servicio para manejar la lógica de salidas de bodega"""
    
    def setup(self):
        self.Cliente = PagosModels()
    
    def create_pago(self, data):
        """Crea un nuevo pago"""
        data['fecha'] = datetime.now()
        return self.Cliente.create_pago(data)
    
    def get_pago(self, pago_id):
        """Obtiene un pago por su ID"""
        return self.Cliente.get_pago_by_id(pago_id)
    
    def update_pago(self, pago_id, data):
        """Actualiza un pago existente"""
        data['fecha'] = datetime.now()
        return self.Cliente.update_pago(pago_id, data)
    
    
