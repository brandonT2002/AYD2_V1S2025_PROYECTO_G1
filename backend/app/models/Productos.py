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
        try:
            # Primero obtenemos el último ID para generar el código
            print("La data recibida para crear el producto es:", data)
            query_last_id = "SELECT MAX(id) as last_id FROM productos"
            result = self.execute_single_query(query_last_id)
            print("El resultado de la consulta para el último ID es:", result)
            last_id = result['last_id'] if result and 'last_id' in result else 0
            new_id = last_id + 1
            codigo = f"P{new_id:03d}"  # Formatea el id con 3 dígitos y añade P al inicio
            print("El nuevo ID generado es:", new_id)
            # Insertar el producto incluyendo el id generado manualmente
            query = f"INSERT INTO {self.table_name} (id, codigo, nombre, unidad_medida, precio_unidad, unidades_por_fardo) VALUES (%s, %s, %s, %s, %s, %s)"
            producto_id = self.returning_id(query, (new_id, codigo, data['nombre'], data['unidad_medida'], data['precio_unidad'], data['unidades_por_fardo']))

            return {"message": "Producto creado con éxito", "id": producto_id, "codigo": codigo}

        except Exception as e:
            raise e
    
    def update_producto(self, producto_id, data):
        """Actualiza un producto existente"""
        try:
            # Actualizar los datos del producto
            query = f"UPDATE {self.table_name} SET nombre = %s, unidad_medida = %s, precio_unidad = %s, unidades_por_fardo = %s WHERE id = %s"
            self.execute_query(query, (data['nombre'], data['unidad_medida'], data['precio_unidad'], data['unidades_por_fardo'], producto_id))
            
            return {"message": "Producto actualizado con éxito"}
            
        except Exception as e:
            raise e
        
    def delete_producto(self, producto_id):
        """Elimina un producto por su ID"""
        try:
            # Eliminar el producto
            query = f"DELETE FROM {self.table_name} WHERE id = %s"
            
            self.execute_query(query, (producto_id,))
            # Despues de eliminar, debemos hacer un alter table para reiniciar el auto_increment en una unidad arriba al id maximo que existe
            query_alter = f"ALTER TABLE {self.table_name} AUTO_INCREMENT = (SELECT MAX(id) + 1 FROM {self.table_name})"
            
            return {"message": "Producto eliminado con éxito"}
            
        except Exception as e:
            raise e
    
    def get_all_productos(self):
        """Obtiene todos los productos"""
        query = f"SELECT * FROM {self.table_name} ORDER BY id"
        return self.execute_query(query)
