from app.services.base_service import BaseService
from app.models.venta_model import VentaModel
from app.models.Cliente import Cliente 
from datetime import datetime

class SalidaService(BaseService):
    """Servicio para manejar la lógica de salidas de bodega"""
    
    def setup(self):
        self.venta_model = VentaModel()
        self.Cliente = Cliente()
    
    def insert_cliente(self, nombre, email):
        """Inserta un nuevo cliente en la base de datos"""
        return self.Cliente.create_cliente(nombre, email)