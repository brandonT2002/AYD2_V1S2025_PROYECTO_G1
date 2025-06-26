from app.models.base_model import BaseModel

class Cliente(BaseModel):
    """Modelo para manejar los clientes"""

    def __init__(self):
        super().__init__()
        self.table_name = "clientes"

    def get_cliente_by_id(self, cliente_id):
        query = f"SELECT * FROM {self.table_name} WHERE id = %s"
        return self.execute_single_query(query, (cliente_id,))

    def get_all(self):
        query = f"SELECT * FROM {self.table_name}"
        return self.execute_query(query)

    def create_cliente(self, nombre_negocio, nombre_contacto, departamento, municipio, direccion, nit, encargado_bodega, telefono, tipo_venta, observaciones):
        # Validación del NIT
        if not nit.isdigit() or len(nit) != 7:
            return {"error": "El NIT debe tener 7 dígitos."}

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

    def update_cliente(self, cliente_id, data):
        query = f"""
            UPDATE {self.table_name} SET 
                nombre_negocio = %s,
                nombre_contacto = %s,
                departamento = %s,
                municipio = %s,
                direccion = %s,
                nit = %s,
                encargado_bodega = %s,
                telefono = %s,
                tipo_venta = %s,
                observaciones = %s
            WHERE id = %s
        """
        params = (
            data.get("nombre_negocio"),
            data.get("nombre_contacto"),
            data.get("departamento"),
            data.get("municipio"),
            data.get("direccion"),
            data.get("nit"),
            data.get("encargado_bodega"),
            data.get("telefono"),
            data.get("tipo_venta"),
            data.get("observaciones"),
            cliente_id
        )
        self.execute_query(query, params)

        # Regenerar el código del cliente si el departamento cambió
        update_codigo = f"UPDATE {self.table_name} SET codigo_cliente = CONCAT(%s, id) WHERE id = %s"
        self.execute_query(update_codigo, (data.get("departamento"), cliente_id))

        return {"mensaje": "Cliente actualizado exitosamente"}

    def delete_cliente(self, cliente_id):
        query = f"DELETE FROM {self.table_name} WHERE id = %s"
        self.execute_query(query, (cliente_id,))
        return {"mensaje": "Cliente eliminado exitosamente"}

    def raiz(self):
        return "Conexión exitosa a la base de datos desde el modelo Cliente"
