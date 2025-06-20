from flask import request, jsonify
from app.services.GestionesPagos import PagosService

class PagosController:
    """Controlador para manejar las salidas de bodega"""
    
    def __init__(self):
        self.pagos_service = PagosService()
    
    def create_pago(self):
        """Crea un nuevo pago"""
        data = request.json
        if not data:
            return jsonify({"error": "Datos del pago son requeridos"}), 400    
        try:
            pago = self.pagos_service.create_pago(data)
            return jsonify(pago), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    def get_pago(self, pago_id):
        """Obtiene un pago por su ID"""
        if not pago_id:
            return jsonify({"error": "ID del pago es requerido"}), 400
        
        try:
            pago = self.pagos_service.get_pago(pago_id)
            if not pago:
                return jsonify({"error": "Pago no encontrado"}), 404
            return jsonify(pago), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    def update_pago(self, pago_id):
        """Actualiza un pago existente"""
        if not pago_id:
            return jsonify({"error": "ID del pago es requerido"}), 400
        
        data = request.json
        if not data:
            return jsonify({"error": "Datos del pago son requeridos"}), 400
        
        try:
            updated_pago = self.pagos_service.update_pago(pago_id, data)
            return jsonify(updated_pago), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        




    