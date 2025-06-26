from app.models.base_model import BaseModel
class InventarioModel(BaseModel):
    def buscar_si_existe_inventario(self, producto_id, duca_id):
        """Busca si existe un inventario para un producto y Duca específicos"""
        query = """
            SELECT COUNT(*) as count
            FROM inventario_movimientos
            WHERE productos_id = %s AND duca_id = %s
        """
        result = self.execute_query(query, (producto_id, duca_id))
        return result[0]['count'] > 0
    
    def insertar_duca(self, numero_duca, fecha, numero_contendor, numero_duca_rectificada, fecha_duca_rectificada):
        """Inserta un nuevo registro de Duca"""
        print(f"Insertando Duca: {numero_duca}, Fecha: {fecha}, Contenedor: {numero_contendor}, Rectificada: {numero_duca_rectificada}, Fecha Rectificada: {fecha_duca_rectificada}")
        query = """
            INSERT INTO duca (numero_duca, fecha, numero_contenedor, numero_duca_rectificada, fecha_duca_rectificada)
            VALUES (%s, %s, %s, %s, %s)
        """
        duca_id = self.returning_id(query, (numero_duca, fecha, numero_contendor, numero_duca_rectificada, fecha_duca_rectificada))
        print(f"Nuevo Duca insertado con ID: {duca_id}")
        return duca_id

    def insertar_inventario(self, tipo, cantidad_fardos, unidades_totales,  producto_id, duca_id):
        """Inserta un nuevo movimiento de inventario"""
        query = """
            INSERT INTO inventario_movimientos (tipo, cantidad_fardos, unidades_totales,  productos_id, duca_id)
            VALUES (%s, %s, %s, %s, %s)
        """
        return self.returning_id(query, (tipo, cantidad_fardos, unidades_totales,  producto_id, duca_id))
    
    def update_created_at(self, inventario_id, fecha):
        """Actualiza el campo created_at de un movimiento de inventario"""
        query = """
            UPDATE inventario_movimientos
            SET created_at = %s
            WHERE id = %s
        """
        self.execute_query(query, (fecha, inventario_id))
        return
    
    def update_stock_intentario(self, product_id, total):
        """Actualiza el stock de un producto en inventario"""
        query = """
            UPDATE inventario
            SET stock_unidades = stock_unidades + %s
            WHERE productos_id = %s
        """
        self.execute_query(query, (total, product_id))
        return
    
    def update_stock_inventario_venta(self, venta_id):
        query = """
            UPDATE inventario_movimientos im
            JOIN detalle_venta dv ON im.productos_id = dv.producto_id
            SET im.unidades_totales = im.unidades_totales - dv.cantidad
            WHERE dv.venta_id = %s
        """

        query = """
            UPDATE inventario in
            JOIN detalle_venta dv ON in.productos_id = dv.producto_id
            SET in.stock_unidades = in.stock_unidades - dv.cantidad
            WHERE dv.venta_id = %s
        """

        self.execute_query(query, (venta_id, venta_id))
        return