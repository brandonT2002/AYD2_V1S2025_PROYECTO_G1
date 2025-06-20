from flask import Blueprint
from app.controllers.salida_controller import SalidaController
from app.controllers.Clientes import ClientesController

api_bp = Blueprint('api_bp', __name__, url_prefix='/api/')
GestionesClientes = ClientesController()

# Rutas para insertar cliente
api_bp.route('/InsertarCliente', methods=['POST'])(GestionesClientes.insert_cliente)
api_bp.route('/GetCliente/<int:cliente_id>', methods=['GET'])(GestionesClientes.get_cliente)
api_bp.route('/raiz', methods=['GET'])(GestionesClientes.raiz)
# Rutas para manejar otras operaciones de salida

