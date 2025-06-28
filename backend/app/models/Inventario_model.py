from app.models.base_model import BaseModel
class InventarioModel(BaseModel):
    def buscar_si_existe_inventario(self, producto_id, duca_id):
        query = """
            SELECT COUNT(*) as count
            FROM inventario_movimientos
            WHERE productos_id = %s AND duca_id = %s
        """
        result = self.execute_query(query, (producto_id, duca_id))
        return result[0]['count'] > 0
    
    def insertar_duca(self, numero_duca, fecha, numero_contendor, numero_duca_rectificada, fecha_duca_rectificada):
        if len(fecha) != 10:
            return {"error": "La fecha debe tener exactamente 10 caracteres en formato YYYY-MM-DD."}
        if fecha_duca_rectificada and len(fecha_duca_rectificada) != 10:
            return {"error": "La fecha rectificada debe tener exactamente 10 caracteres en formato YYYY-MM-DD."}

        print(f"Insertando Duca: {numero_duca}, Fecha: {fecha}, Contenedor: {numero_contendor}, Rectificada: {numero_duca_rectificada}, Fecha Rectificada: {fecha_duca_rectificada}")
        query = """
            INSERT INTO duca (numero_duca, fecha, numero_contenedor, numero_duca_rectificada, fecha_duca_rectificada)
            VALUES (%s, %s, %s, %s, %s)
        """
        duca_id = self.returning_id(query, (numero_duca, fecha, numero_contendor, numero_duca_rectificada, fecha_duca_rectificada))
        print(f"Nuevo Duca insertado con ID: {duca_id}")
        return duca_id

    def insertar_inventario(self, tipo, cantidad_fardos, unidades_totales,  producto_id, duca_id, observaciones=None):
        query = """
            INSERT INTO inventario_movimientos (tipo, cantidad_fardos, unidades_totales,  productos_id, duca_id, comentario)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        return self.returning_id(query, (tipo, cantidad_fardos, unidades_totales,  producto_id, duca_id, observaciones))
    
    def salida_inventario(self, tipo, cantidad_fardos, unidades_totales, salida_bodega ,producto_id):
        query = """
            INSERT INTO inventario_movimientos (tipo, cantidad_fardos, unidades_totales, salida_bodega,  productos_id)
            VALUES (%s, %s, %s, %s, %s)
        """
        return self.returning_id(query, (tipo, cantidad_fardos, unidades_totales, salida_bodega, producto_id))
    
    def update_created_at(self, inventario_id, fecha):
        query = """
            UPDATE inventario_movimientos
            SET created_at = %s
            WHERE id = %s
        """
        self.execute_query(query, (fecha, inventario_id))
        return
    
    def update_stock_intentario(self, product_id, total):
        query = """
            UPDATE inventario
            SET stock_unidades = stock_unidades + %s
            WHERE productos_id = %s
        """
        self.execute_query(query, (total, product_id))
        return
    
    def update_stock_inventario_salida(self, producto_id, cantidad):
        query = """
            UPDATE inventario
            SET stock_unidades = stock_unidades - %s
            WHERE productos_id = %s
        """

        self.execute_query(query, (cantidad, producto_id))
        return
    
    def get_stock_info(self, producto_id):
        """Obtiene información completa del stock de un producto"""
        query_actual = """
            SELECT i.stock_unidades, p.nombre, p.codigo
            FROM inventario i
            INNER JOIN productos p ON i.productos_id = p.id
            WHERE i.productos_id = %s
        """
        stock_actual_info = self.execute_single_query(query_actual, (producto_id,))
        
        if not stock_actual_info:
            return None
        

        query_inicial = """
            SELECT COALESCE(SUM(cantidad_fardos), 0) as stock_inicial_unidades
            FROM inventario_movimientos
            WHERE productos_id = %s AND tipo = 'Ingreso'
        """
        stock_inicial_result = self.execute_single_query(query_inicial, (producto_id,))
        stock_inicial_unidades = stock_inicial_result['stock_inicial_unidades'] if stock_inicial_result else 0
        
        return {
            'producto_id': producto_id,
            'producto_nombre': stock_actual_info['nombre'],
            'producto_codigo': stock_actual_info['codigo'],
            'stock_actual': stock_actual_info['stock_unidades'],
            'stock_inicial': stock_inicial_unidades
        }
    
    def verificar_stock_minimo(self, producto_id, porcentaje_minimo=10):
        """Verifica si el stock actual está por encima del porcentaje mínimo"""
        stock_info = self.get_stock_info(producto_id)
        
        if not stock_info:
            return None
        
        stock_inicial = stock_info['stock_inicial']
        stock_actual = stock_info['stock_actual']
        
        if stock_inicial == 0:
            porcentaje_actual = 0
        else:
            porcentaje_actual = (stock_actual / stock_inicial) * 100
        
        stock_minimo_requerido = (stock_inicial * porcentaje_minimo) / 100
        cumple_minimo = stock_actual > stock_minimo_requerido  
        
        print(f"📊 VERIFICACIÓN DE STOCK:")
        print(f"   Producto: {stock_info['producto_nombre']} (ID: {producto_id})")
        print(f"   Unidades totales iniciales: {stock_inicial} unidades")
        print(f"   Unidades restantes: {stock_actual} unidades")
        print(f"   Porcentaje actual: {porcentaje_actual:.2f}%")
        print(f"   Estado: {'✅ OK' if cumple_minimo else '⚠️  STOCK BAJO'}")
        print("-" * 50)
        
        return {
            'producto_id': producto_id,
            'producto_nombre': stock_info['producto_nombre'], 
            'producto_codigo': stock_info['producto_codigo'],
            'unidades_totales_iniciales': stock_inicial,
            'unidades_restantes': stock_actual,
            'porcentaje_actual': round(porcentaje_actual, 2),
            'porcentaje_minimo': porcentaje_minimo,
        }