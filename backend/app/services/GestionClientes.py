from app.services.base_service import BaseService
from app.models.Cliente import Cliente 
from datetime import datetime

class Clientes(BaseService):
    """Servicio para manejar la lógica de clientes"""

    def setup(self):
        self.Cliente = Cliente()

    def insert_cliente(self, nombre, email):
        """Inserta un nuevo cliente en la base de datos"""
        return self.Cliente.create_cliente(nombre, email)

    def get_cliente_by_id(self, cliente_id):
        """Obtiene un cliente por su ID"""
        return self.Cliente.get_cliente_by_id(cliente_id)

    def get_all(self):
        """Obtiene todos los clientes"""
        return self.Cliente.get_all()
