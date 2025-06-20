from flask import Blueprint, jsonify
from app.controllers.salida_controller import SalidaController
from app.controllers.Clientes import ClientesController
from app.controllers.Ventas import VentasController 
from app.controllers.PagosController import PagosController

api_bp = Blueprint('api_bp', __name__, url_prefix='/api/')

GestionesClientes = ClientesController()
GestionesVentas = VentasController()
GestionesPagos = PagosController()
GestionesProductos = ProductoController()
GestionesSalidas = SalidaController()

# Rutas compatibles con el frontend actual
api_bp.route('/clientes', methods=['GET'])(GestionesClientes.get_all)
api_bp.route('/clientes', methods=['POST'])(GestionesClientes.insert_cliente)
api_bp.route('/clientes/<int:cliente_id>', methods=['PUT'])(GestionesClientes.update_cliente)
api_bp.route('/clientes/<int:cliente_id>', methods=['DELETE'])(GestionesClientes.delete_cliente)

# Rutas originales del proyecto
api_bp.route('/InsertarCliente', methods=['POST'])(GestionesClientes.insert_cliente)
api_bp.route('/GetCliente/<int:cliente_id>', methods=['GET'])(GestionesClientes.get_cliente)
api_bp.route('/raiz', methods=['GET'])(GestionesClientes.raiz)

# Rutas para manejar Ventas
api_bp.route('/InsertarVenta', methods=['POST'])(GestionesVentas.create_venta)
api_bp.route('/GetVenta/<int:venta_id>', methods=['GET'])(GestionesVentas.get_venta)
api_bp.route('/ActualizarVenta/<int:venta_id>', methods=['PUT'])(GestionesVentas.update_venta)
api_bp.route('/EliminarVenta/<int:venta_id>', methods=['DELETE'])(GestionesVentas.delete_venta)

# Rutas para manejar Pagos
api_bp.route('/InsertarPago', methods=['POST'])(GestionesPagos.create_pago)
api_bp.route('/GetPago/<int:venta_id>', methods=['GET'])(GestionesPagos.get_pago)
api_bp.route('/ActualizarPago/<int:venta_id>', methods=['PUT'])(GestionesPagos.update_pago)

# Rutas para manejar Salidas
api_bp.route('/buscar-ventas', methods=['POST'])(GestionesSalidas.buscar_ventas)
api_bp.route('/obtener-detalle-venta/<int:venta_id>', methods=['GET'])(GestionesSalidas.obtener_detalle_venta)
api_bp.route('/registrar-salida', methods=['POST'])(GestionesSalidas.registrar_salida)
