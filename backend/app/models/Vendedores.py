from app.models.base_model import BaseModel

class Vendedores(BaseModel):
    """Modelo para manejar los vendedores"""
    def __init__(self):
        super().__init__()
        self.table_name = "vendedores"
    
    def get_vendedores_by_id(self, vendedores_id):
        """Obtiene un vendedores por su ID"""
        query = f"SELECT * FROM {self.table_name} WHERE id = %s"
        return self.execute_single_query(query, (vendedores_id,))
    
    def create_vendedores(self, data):
        """Crea un nuevo vendedores"""
        try:
            # Insertar el vendedores usando el codigo recibido en el JSON
            query = f"INSERT INTO {self.table_name} (apellido, nombre, telefono, direccion, comision) VALUES (%s, %s, %s, %s, %s)"
            vendedores_id = self.returning_id(query, (
                data['apellido'],
                data['nombre'],
                data['telefono'],
                data['direccion'],
                data['comision']
            ))

            return {"message": "vendedores creado con éxito", "id": vendedores_id, "data": data}

        except Exception as e:
            raise e
    
    def update_vendedores(self, vendedores_id, data):
        """Actualiza un vendedores existente"""
        try:
            # Actualizar los datos del vendedores, incluyendo el campo 'codigo'
            query = f"""UPDATE {self.table_name} 
                          SET apellido = %s, nombre = %s, telefono = %s, direccion = %s, comision = %s 
                          WHERE id = %s"""
            self.execute_query(
                query,
                (
                    data['apellido'],
                    data['nombre'],
                    data['telefono'],
                    data['direccion'],
                    data['comision'],
                    vendedores_id
                )
            )
            return {"message": "vendedores actualizado con éxito"}
        except Exception as e:
            raise e
        
    def delete_vendedores(self, vendedores_id):
        """Elimina un vendedores por su ID"""
        try:
            # Eliminar el vendedores
            query = f"DELETE FROM {self.table_name} WHERE id = %s"
            self.execute_query(query, (vendedores_id,))
            # Despues de eliminar, debemos hacer un alter table para reiniciar el auto_increment en una unidad arriba al id maximo que existe
            
            return {"message": "vendedores eliminado con éxito"}
            
        except Exception as e:
            raise e
    
    def get_all_vendedoress(self):
        """Obtiene todos los vendedores"""
        query = f"SELECT * FROM {self.table_name} ORDER BY id"
        return self.execute_query(query)
