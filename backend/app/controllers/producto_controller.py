from flask import request, jsonify
from app.services.producto_service import ProductoService

class ProductoController:
    """Controlador para manejar los productos"""
    
    def __init__(self):
        self.producto_service = ProductoService()

    def create_producto(self):
        """Crea un nuevo producto"""
        data = request.json
        if not data:
            return jsonify({"error": "Datos del producto son requeridos"}), 400    
        try:
            producto = self.producto_service.create(data)
            return jsonify(producto), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    def get_producto(self, producto_id):
        """Obtiene un producto por su ID"""
        if not producto_id:
            return jsonify({"error": "ID del producto es requerido"}), 400
        
        try:
            producto = self.producto_service.get_producto(producto_id)
            if not producto:
                return jsonify({"error": "Producto no encontrado"}), 404
            return jsonify(producto), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    def update_producto(self, producto_id):
        """Actualiza un producto existente"""
        if not producto_id:
            return jsonify({"error": "ID del producto es requerido"}), 400
        
        data = request.json
        if not data:
            return jsonify({"error": "Datos del producto son requeridos"}), 400
        
        try:
            updated_producto = self.producto_service.update_producto(producto_id, data)
            return jsonify(updated_producto), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    def delete_producto(self, producto_id):
        """Elimina un producto por su ID"""
        if not producto_id:
            return jsonify({"error": "ID del producto es requerido"}), 400
        
        try:
            self.producto_service.delete_producto(producto_id)
            return jsonify({"message": "Producto eliminado exitosamente"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    def get_all_productos(self):
        """Obtiene todos los productos"""
        try:
            productos = self.producto_service.get_all_productos()
            return jsonify(productos), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
