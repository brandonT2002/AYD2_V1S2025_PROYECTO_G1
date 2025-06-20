from flask import request, jsonify
from app.services.GestionClientes import Cliente

class ClientesController:
    """Controlador para manejar clientes"""

    def __init__(self):
        self.gestion_clientes = Cliente()

    def insert_cliente(self):
        """Inserta un nuevo cliente en la base de datos"""
        data = request.get_json()

        nombre_negocio = data.get('nombre_negocio')
        nombre_contacto = data.get('nombre_contacto')
        departamento = data.get('departamento')
        municipio = data.get('municipio')
        direccion = data.get('direccion')
        nit = data.get('nit')
        encargado_bodega = data.get('encargado_bodega')
        telefono = data.get('telefono')
        tipo_venta = data.get('tipo_venta')
        observaciones = data.get('observaciones')

        try:
            cliente = self.gestion_clientes.create_cliente(
                nombre_negocio, nombre_contacto, departamento, municipio,
                direccion, nit, encargado_bodega, telefono,
                tipo_venta, observaciones
            )
            return jsonify(cliente), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def get_cliente(self, cliente_id):
        """Obtiene un cliente por su ID"""
        try:
            cliente = self.gestion_clientes.get_cliente_by_id(cliente_id)
            if not cliente:
                return jsonify({"error": "Cliente no encontrado"}), 404
            return jsonify(cliente), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def listar_clientes(self):
        """Devuelve la lista completa de clientes"""
        try:
            clientes = self.gestion_clientes.get_all()
            return jsonify(clientes), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def raiz(self):
        """Método de prueba para verificar la conexión a la base de datos"""
        try:
            result = self.gestion_clientes.raiz()
            return jsonify({"message": result}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
