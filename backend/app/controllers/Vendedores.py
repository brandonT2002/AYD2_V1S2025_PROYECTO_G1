from flask import request, jsonify
from app.services.Vendedores import VendedorService

class VendedoresController:
    def __init__(self):
        self.gestion_vendedores = VendedorService()

    def create_vendedor(self):
        """Crea un nuevo vendedor"""
        data = request.json
        if not data:
            return jsonify({"error": "Datos del vendedor son requeridos"}), 400
        
        try:
            vendedor = self.gestion_vendedores.create(data)
            return jsonify(vendedor), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def get_vendedor(self, vendedor_id):
        """Obtiene un vendedor por su ID"""
        if not vendedor_id:
            return jsonify({"error": "ID del vendedor es requerido"}), 400
        
        try:
            vendedor = self.gestion_vendedores.get_vendedores(vendedor_id)
            if not vendedor:
                return jsonify({"error": "Vendedor no encontrado"}), 404
            return jsonify(vendedor), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    def update_vendedor(self, vendedor_id):
        """Actualiza un vendedor existente"""
        if not vendedor_id:
            return jsonify({"error": "ID del vendedor es requerido"}), 400
        
        data = request.json
        if not data:
            return jsonify({"error": "Datos del vendedor son requeridos"}), 400
        
        try:
            updated_vendedor = self.gestion_vendedores.update_vendedores(vendedor_id, data)
            return jsonify(updated_vendedor), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
  
    def delete_vendedor(self, vendedor_id): 
        """Elimina un vendedor por su ID"""
        if not vendedor_id:
            return jsonify({"error": "ID del vendedor es requerido"}), 400
        
        try:
            self.gestion_vendedores.delete_vendedores(vendedor_id)
            return jsonify({"message": "Vendedor eliminado exitosamente"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    def get_all_vendedores(self):
        """Obtiene todos los vendedores"""
        try:
            vendedores = self.gestion_vendedores.get_all_vendedoress()
            return jsonify(vendedores), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500