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



    