from app.models.base_model import BaseModel

class Venta(BaseModel):
    """Modelo para manejar las clientes"""
    def __init__(self):
        super().__init__()
        self.table_name = "ventas"
    
    def get_venta_by_id(self, venta_id):
        """Obtiene una venta por su ID"""
        query = f"SELECT * FROM {self.table_name} WHERE id = %s"
        return self.execute_single_query(query, (venta_id,))
    
    def create_venta(self, data):
        """Crea una nueva venta"""
        query = f"INSERT INTO {self.table_name} (fecha_venta,fecha_salida_bodega,cliente_id,tipo_pago,dias_credito,vendedor_id,estado_cobro,dte_numero,dte_nombre,dte_nit,total_quetzales) VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        # Asegurarse de que los campos en 'data' coincidan con los de la tabla 'ventas'
        id = self.returning_id(query, (data['fecha_venta'], data['fecha_salida_bodega'], data['cliente_id'], data['tipo_pago'], data['dias_credito'], data['vendedor_id'], data['estado_cobro'], data['dte_numero'], data['dte_nombre'], data['dte_nit'], data['total_quetzales']))
        querey = f'UPDATE {self.table_name} SET numero_envio = CONCAT("E",id) WHERE id = %s'
        self.execute_query(querey, (id,))
        return "Venta creada con éxito", id
    
    def update_venta(self, venta_id, data):
        """Actualiza una venta existente"""
        query = f"UPDATE {self.table_name} SET cliente_id = %s, fecha = %s, total = %s WHERE id = %s"
        self.execute_query(query, (data['cliente_id'], data['fecha'], data['total'], venta_id))
        return "Venta actualizada con éxito"
    
    def delete_venta(self, venta_id):
        """Elimina una venta por su ID"""
        query = f"DELETE FROM {self.table_name} WHERE id = %s"
        self.execute_query(query, (venta_id,))
        return "Venta eliminada con éxito"
    
    def insert_producto_venta(self, venta_id, producto_id, observaciones, cantidad_unidades):
        """Inserta un producto en una venta"""
        query = f"INSERT INTO venta_detalle (ventas_id, producto_id, observaciones, cantidad_unidades) VALUES (%s, %s, %s, %s)"
        self.execute_query(query, (venta_id, producto_id, observaciones, cantidad_unidades))

        query = f"SELECT precio_unidad FROM productos WHERE id = %s"
        precio_venta = self.execute_single_query(query, (producto_id,))['precio_unidad']


        # Actualizar el total de la venta
        query = f"UPDATE ventas SET total_quetzales = %s + total_quetzales WHERE id = %s"
        self.execute_query(query, (cantidad_unidades*precio_venta, venta_id))

        return "Producto insertado en la venta con éxito"
    
    def delete_producto_venta(self, detalle_venta_id):
        """Elimina un producto de una venta"""

        # Verificar si el detalle de venta existe en la query query = f"SELECT cantidad_unidades, producto_id, ventas_id FROM venta_detalle WHERE id = %s"
        query = f"SELECT cantidad_unidades, producto_id, ventas_id FROM venta_detalle WHERE id = %s"
        detalle = self.execute_single_query(query, (detalle_venta_id,))
        print(detalle)
   
        if detalle is None:
            return {"error": "Detalle de venta no encontrado"}
        
        query = f"DELETE FROM venta_detalle WHERE id = %s"
        self.execute_query(query, (detalle_venta_id,))

        query = f"SELECT precio_unidad FROM productos WHERE id = %s"
        precio_venta = self.execute_single_query(query, (detalle['producto_id'],))['precio_unidad']


        # Actualizar el total de la venta
        query = f"UPDATE ventas SET total_quetzales = total_quetzales -  %s WHERE id = %s"
        self.execute_query(query, (detalle['cantidad_unidades'] * precio_venta, detalle['ventas_id']))

        return {"mensaje": "Producto eliminado de la venta con éxito", "detalle_venta_id": detalle_venta_id}

    
    