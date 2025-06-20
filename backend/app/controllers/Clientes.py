from flask import request, jsonify
from app.services.GestionClientes import ClienteService

class ClientesController:
    def __init__(self):
        self.gestion_clientes = ClienteService()

    def insert_cliente(self):
        data = request.get_json()
        try:
            cliente = self.gestion_clientes.create_cliente(
                data.get('nombre_negocio'),
                data.get('nombre_contacto'),
                data.get('departamento'),
                data.get('municipio'),
                data.get('direccion'),
                data.get('nit'),
                data.get('encargado_bodega'),
                data.get('telefono'),
                data.get('tipo_venta'),
                data.get('observaciones')
            )
            return jsonify(cliente), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def get_cliente(self, cliente_id):
        try:
            cliente = self.gestion_clientes.get_cliente_by_id(cliente_id)
            if not cliente:
                return jsonify({"error": "Cliente no encontrado"}), 404
            return jsonify(cliente), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def get_all(self):
        try:
            clientes = self.gestion_clientes.get_all()
            return jsonify(clientes), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def update_cliente(self, cliente_id):
        data = request.get_json()
        try:
            result = self.gestion_clientes.update_cliente(cliente_id, data)
            return jsonify(result), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def delete_cliente(self, cliente_id):
        try:
            result = self.gestion_clientes.delete_cliente(cliente_id)
            return jsonify(result), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def raiz(self):
        try:
            result = self.gestion_clientes.raiz()
            return jsonify({"message": result}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
