from flask import request, jsonify
from app.services.Ventas import Ventas

class VentasController:
    """Controlador para manejar las salidas de bodega"""
    
    def __init__(self):
        self.ventas_service = Ventas()

    def create_venta(self):
        """Crea una nueva venta"""
        data = request.json
        if not data:
            return jsonify({"error": "Datos de la venta son requeridos"}), 400    
        try:
            venta = self.ventas_service.create(data)
            return jsonify(venta), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    def get_venta(self, venta_id):
        """Obtiene una venta por su ID"""
        if not venta_id:
            return jsonify({"error": "ID de la venta es requerido"}), 400
        
        try:
            venta = self.ventas_service.get_venta(venta_id)
            if not venta:
                return jsonify({"error": "Venta no encontrada"}), 404
            return jsonify(venta), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    def update_venta(self, venta_id):
        """Actualiza una venta existente"""
        if not venta_id:
            return jsonify({"error": "ID de la venta es requerido"}), 400
        
        data = request.json
        if not data:
            return jsonify({"error": "Datos de la venta son requeridos"}), 400
        
        try:
            updated_venta = self.ventas_service.update_venta(venta_id, data)
            return jsonify(updated_venta), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    def delete_venta(self, venta_id):
        """Elimina una venta por su ID"""
        if not venta_id:
            return jsonify({"error": "ID de la venta es requerido"}), 400
        
        try:
            self.ventas_service.delete_venta(venta_id)
            return jsonify({"message": "Venta eliminada exitosamente"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    def get_all_ventas(self):
        """Obtiene todas las ventas"""
        try:
            ventas = self.ventas_service.get_all()
            return jsonify(ventas), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    def insert_productos_venta(self, venta_id, producto_id, observaciones, cantidad_unidades):
        """Inserta un producto en una venta"""
        query = f"INSERT INTO venta_detalle (ventas_id, producto_id, observaciones, cantidad_unidades) VALUES (%s, %s, %s, %s)"
        self.execute_query(query, (venta_id, producto_id, observaciones, cantidad_unidades))

        query = f"SELECT precio_unidad FROM productos WHERE id = %s"
        precio_venta = self.execute_single_query(query, (producto_id,))['precio_unidad']


        # Actualizar el total de la venta
        query = f"UPDATE ventas SET total_quetzales = %s + total_quetzales WHERE id = %s"
        self.execute_query(query, (cantidad_unidades*precio_venta, venta_id))

        query = f"UPDATE inventario SET stock_unidades = stock_unidades - %s WHERE productos_id = %s"
        self.execute_query(query, (cantidad_unidades, producto_id))
        return "Producto insertado en la venta con éxito"

    def delete_producto_venta(self, detalle_venta_id):
        """Elimina un producto de una venta"""
        try:
            result = self.ventas_service.delete_producto_venta(detalle_venta_id)
            return jsonify(result), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
