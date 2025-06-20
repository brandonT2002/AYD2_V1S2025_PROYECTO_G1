from app.models.base_model import BaseModel

class Producto(BaseModel):
    """Modelo para manejar los productos"""
    def __init__(self):
        super().__init__()
        self.table_name = "productos"
    
    def get_producto_by_id(self, producto_id):
        """Obtiene un producto por su ID"""
        query = f"SELECT * FROM {self.table_name} WHERE id = %s"
        return self.execute_single_query(query, (producto_id,))
    
    def create_producto(self, data):
        """Crea un nuevo producto"""
        # Primero obtenemos el último ID para generar el código
        query_last_id = "SELECT MAX(id) as last_id FROM productos"
        result = self.execute_single_query(query_last_id)
        last_id = result[0] if result and result[0] is not None else 0
        new_id = last_id + 1
        codigo = f"P{new_id:03d}"  # Formatea el id con 3 dígitos y añade P al inicio
        
        # Ahora insertamos el producto con el código generado
        query = f"INSERT INTO {self.table_name} (codigo, nombre, unidad_medida, precio_unidad, disponible, unidades_por_fardo) VALUES (%s, %s, %s, %s, %s, %s)"
        # Asegurarse de que los campos en 'data' coincidan con los de la tabla 'productos'
        id = self.returning_id(query, (codigo, data['nombre'], data['unidad_medida'], data['precio_unidad'], data['disponible'] if 'disponible' in data else 1, data['unidades_por_fardo']))
        
        return f"Producto creado con éxito con código {codigo} y ID {id}"
    
    def update_producto(self, producto_id, data):
        """Actualiza un producto existente"""
        query = f"UPDATE {self.table_name} SET nombre = %s, unidad_medida = %s, precio_unidad = %s, disponible = %s, unidades_por_fardo = %s WHERE id = %s"
        self.execute_query(query, (data['nombre'], data['unidad_medida'], data['precio_unidad'], data['disponible'], data['unidades_por_fardo'], producto_id))
        return "Producto actualizado con éxito"
    
    def delete_producto(self, producto_id):
        """Elimina un producto por su ID"""
        query = f"DELETE FROM {self.table_name} WHERE id = %s"
        self.execute_query(query, (producto_id,))
        return "Producto eliminado con éxito"
    
    def get_all_productos(self):
        """Obtiene todos los productos"""
        query = f"SELECT * FROM {self.table_name}"
        return self.execute_query(query) 
