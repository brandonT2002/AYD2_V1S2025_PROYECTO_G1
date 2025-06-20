from app.services.base_service import BaseService
from app.models.Productos import Producto

class ProductoService(BaseService):
    """Servicio para manejar la lógica de productos"""
    
    def setup(self):
        self.producto_model = Producto()

    def create(self, data):
        """Crea un nuevo producto"""
        return self.producto_model.create_producto(data)
    
    def get_producto(self, producto_id):
        """Obtiene un producto por su ID"""
        return self.producto_model.get_producto_by_id(producto_id)
    
    def update_producto(self, producto_id, data):
        """Actualiza un producto existente"""
        return self.producto_model.update_producto(producto_id, data)
    
    def delete_producto(self, producto_id):
        """Elimina un producto por su ID"""
        return self.producto_model.delete_producto(producto_id)
    
    def get_all_productos(self):
        """Obtiene todos los productos"""
        return self.producto_model.get_all_productos()
