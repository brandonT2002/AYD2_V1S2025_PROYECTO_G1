from app.models.base_model import BaseModel

class Cliente(BaseModel):
    """Modelo para manejar los clientes"""

    def __init__(self):
        super().__init__()
        self.table_name = "clientes"

    def get_cliente_by_id(self, cliente_id):
        """Obtiene un cliente por su ID"""
        query = f"SELECT * FROM {self.table_name} WHERE id = %s"
        return self.execute_single_query(query, (cliente_id,))

    def create_cliente(self, nombre_negocio, nombre_contacto, departamento, municipio, direccion, nit, encargado_bodega, telefono, tipo_venta, observaciones):
        """Crea un nuevo cliente"""
        query = f"""
            INSERT INTO {self.table_name} 
            (nombre_negocio, nombre_contacto, departamento, municipio, direccion, nit, encargado_bodega, telefono, tipo_venta, observaciones) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        id = self.returning_id(query, (
            nombre_negocio, nombre_contacto, departamento, municipio,
            direccion, nit, encargado_bodega, telefono, tipo_venta, observaciones
        ))
        update_query = f"UPDATE {self.table_name} SET codigo_cliente = CONCAT(departamento, id) WHERE id = %s"
        self.execute_query(update_query, (id,))
        return "Cliente creado con éxito", id

    def get_all(self):
        """Obtiene todos los clientes"""
        query = f"SELECT * FROM {self.table_name}"
        return self.execute_query(query)

    def raiz(self):
        """Método de prueba para verificar la conexión a la base de datos"""
        return "Conexión exitosa a la base de datos desde el modelo Cliente"
