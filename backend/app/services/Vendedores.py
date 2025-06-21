from app.services.base_service import BaseService
from app.models.Vendedores import Vendedores

class VendedorService(BaseService):
    """Servicio para manejar la lógica de vendedoress"""
    
    def setup(self):
        self.vendedores_model = Vendedores()

    def create(self, data):
        """Crea un nuevo vendedores"""
        return self.vendedores_model.create_vendedores(data)
    
    def get_vendedores(self, vendedores_id):
        """Obtiene un vendedores por su ID"""
        return self.vendedores_model.get_vendedores_by_id(vendedores_id)
    
    def update_vendedores(self, vendedores_id, data):
        """Actualiza un vendedores existente"""
        return self.vendedores_model.update_vendedores(vendedores_id, data)
    
    def delete_vendedores(self, vendedores_id):
        """Elimina un vendedores por su ID"""
        return self.vendedores_model.delete_vendedores(vendedores_id)
    
    def get_all_vendedoress(self):
        """Obtiene todos los vendedoress"""
        return self.vendedores_model.get_all_vendedoress()

