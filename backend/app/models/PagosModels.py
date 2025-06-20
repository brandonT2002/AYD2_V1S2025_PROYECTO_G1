from app.models.base_model import BaseModel

class PagosModels(BaseModel):
    """Modelo para manejar las pagos"""
    def __init__(self):
        super().__init__()
        self.table_name = "pagos"

    def get_pago_by_id(self, pago_id):
        """Obtiene un pago por su ID"""
        query = f"SELECT * FROM {self.table_name} WHERE id = %s"
        return self.execute_single_query(query, (pago_id,))
    
    def create_pago(self, data):    
        """Crea un nuevo pago"""
        query = f"INSERT INTO {self.table_name} (fecha, cliente_id, monto, metodo_pago, observaciones) VALUES (%s, %s, %s, %s, %s)"
        # Asegurarse de que los campos en 'data' coincidan con los de la tabla 'pagos'
        id = self.returning_id(query, (data['fecha'], data['cliente_id'], data['monto'], data['metodo_pago'], data['observaciones']))
        return "Pago creado con éxito", id
    
    def update_pago(self, pago_id, data):
        """Actualiza un pago existente"""
        query = f"UPDATE {self.table_name} SET fecha = %s, cliente_id = %s, monto = %s, metodo_pago = %s, observaciones = %s WHERE id = %s"
        self.execute_query(query, (data['fecha'], data['cliente_id'], data['monto'], data['metodo_pago'], data['observaciones'], pago_id))
        return "Pago actualizado con éxito"

  
    
