from app.models.base_model import BaseModel

class VentaModel(BaseModel):
    """Modelo para manejar las ventas"""
    
    def buscar_ventas_por_envio(self, numero_envio):
        """Busca ventas por número de envío"""
        query = """
            SELECT v.id, v.numero_envio, v.fecha_venta, v.fecha_salida_bodega,
                   v.tipo_pago, v.dias_credito, v.estado_venta, v.estado_cobro,
                   v.total_quetzales, v.dte_numero, v.dte_nombre, v.dte_nit,
                   c.nombre_contacto, c.nombre_negocio, c.codigo_cliente,
                   vend.nombre as vendedor_nombre, vend.apellido as vendedor_apellido
            FROM ventas v
            JOIN clientes c ON v.cliente_id = c.id
            JOIN Vendedores vend ON v.vendedor_id = vend.id
            WHERE v.numero_envio LIKE %s
            AND v.estado_venta = 'Vigente'
            ORDER BY v.fecha_venta DESC
        """
        venta_info =  self.execute_query(query, (f"%{numero_envio}%",))
        query = """
            SELECT p.codigo, p.nombre, p.unidad_medida, p.precio_unidad, p.unidades_por_fardo, vd.observaciones
            FROM productos p
            JOIN venta_detalle vd ON p.id = vd.producto_id
            JOIN ventas v ON vd.ventas_id = v.id
            WHERE v.numero_envio LIKE %s
        """
        productos_info = self.execute_query(query, (f"%{numero_envio}%",))
        for venta in venta_info:
            venta['productos'] = []
            for producto in productos_info:
                venta['productos'].append(producto)
                    
        return venta_info
    
    def buscar_ventas_por_cliente(self, nombre_cliente):
        """Busca ventas por nombre de cliente"""
        query = """
            SELECT v.id, v.numero_envio, v.fecha_venta, v.fecha_salida_bodega,
                   v.tipo_pago, v.dias_credito, v.estado_venta, v.estado_cobro,
                   v.total_quetzales, v.dte_numero, v.dte_nombre, v.dte_nit,
                   c.nombre_contacto, c.nombre_negocio, c.codigo_cliente,
                   vend.nombre as vendedor_nombre, vend.apellido as vendedor_apellido
            FROM ventas v
            JOIN clientes c ON v.cliente_id = c.id
            JOIN Vendedores vend ON v.vendedor_id = vend.id
            WHERE (c.nombre_contacto LIKE %s OR c.nombre_negocio LIKE %s)
            AND v.estado_venta = 'Vigente'
            ORDER BY v.fecha_venta DESC
        """

        ventas_inf = self.execute_query(query, (f"%{nombre_cliente}%", f"%{nombre_cliente}%"))
        
        return ventas_inf
            

    
    def obtener_venta_completa(self, venta_id):
        """Obtiene la información completa de una venta con sus productos"""
        query = """
            SELECT v.id as venta_id, v.numero_envio, v.fecha_venta, v.fecha_salida_bodega,
                   v.tipo_pago, v.dias_credito, v.estado_venta, v.estado_cobro,
                   v.total_quetzales, v.dte_numero, v.dte_nombre, v.dte_nit,
                   c.nombre_contacto, c.nombre_negocio, c.codigo_cliente, c.nit as cliente_nit,
                   c.departamento, c.municipio, c.direccion, c.telefono,
                   vend.nombre as vendedor_nombre, vend.apellido as vendedor_apellido,
                   vd.id as detalle_id, vd.cantidad_unidades, vd.Observaciones as detalle_observaciones,
                   p.codigo as producto_codigo, p.nombre as producto_nombre, 
                   p.unidad_medida, p.precio_unidad, p.unidades_por_fardo,
                   -- Calcular cantidad en fardos/paquetes
                   CASE 
                       WHEN p.unidad_medida IN ('Fardo', 'Paquete') THEN 
                           vd.cantidad_unidades / p.unidades_por_fardo
                       ELSE vd.cantidad_unidades
                   END as cantidad_fardos_paquetes,
                   -- Calcular precio total por producto
                   (vd.cantidad_unidades * p.precio_unidad) as total_producto
            FROM ventas v
            JOIN clientes c ON v.cliente_id = c.id
            JOIN Vendedores vend ON v.vendedor_id = vend.id
            LEFT JOIN venta_detalle vd ON v.id = vd.ventas_id
            LEFT JOIN productos p ON vd.producto_id = p.id
            WHERE v.id = %s
            ORDER BY vd.id
        """
        return self.execute_query(query, (venta_id,))
    
    
    def actualizar_fecha_salida(self, venta_id, fecha_salida):
        """Actualiza la fecha de salida de bodega"""
        query = """
            UPDATE ventas 
            SET fecha_salida_bodega = %s
            WHERE id = %s AND estado_venta = 'Vigente'
        """
        connection = self.db.get_connection()
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (fecha_salida, venta_id))
                return cursor.rowcount > 0 
        except Exception as e:
            print(f"Error actualizando fecha de salida: {e}")
            raise
    
    def obtener_productos_venta(self, venta_id):
        """Obtiene solo los productos de una venta específica"""
        query = """
            SELECT vd.id as detalle_id, vd.cantidad_unidades, vd.Observaciones,
                   p.codigo as producto_codigo, p.nombre as producto_nombre, 
                   p.unidad_medida, p.precio_unidad, p.unidades_por_fardo,
                   -- Calcular cantidad en fardos/paquetes
                   CASE 
                       WHEN p.unidad_medida IN ('Fardo', 'Paquete') THEN 
                           vd.cantidad_unidades / p.unidades_por_fardo
                       ELSE vd.cantidad_unidades
                   END as cantidad_fardos_paquetes,
                   -- Calcular precio total por producto
                   (vd.cantidad_unidades * p.precio_unidad) as total_producto
            FROM venta_detalle vd
            JOIN productos p ON vd.producto_id = p.id
            WHERE vd.ventas_id = %s
            ORDER BY vd.id
        """
        return self.execute_query(query, (venta_id,))
    
    
    def obtener_saldo_venta(self, venta_id):
        """Obtiene el saldo pendiente de una venta"""
        query = """
            SELECT 
                v.total_quetzales,
                COALESCE(SUM(p.monto_abono), 0) as total_pagado,
                (v.total_quetzales - COALESCE(SUM(p.monto_abono), 0)) as saldo_pendiente
            FROM ventas v
            LEFT JOIN pagos p ON v.id = p.venta_id
            WHERE v.id = %s
            GROUP BY v.id, v.total_quetzales
        """
        return self.execute_single_query(query, (venta_id,))