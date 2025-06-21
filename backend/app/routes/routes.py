from flask import Blueprint, jsonify
from app.controllers.salida_controller import SalidaController
from app.controllers.Clientes import ClientesController
from app.controllers.Ventas import VentasController 
from app.controllers.PagosController import PagosController
from app.controllers.producto_controller import ProductoController
from app.controllers.Vendedores import VendedoresController
from app.controllers.Inventario import InventarioController

api_bp = Blueprint('api_bp', __name__, url_prefix='/api/')

GestionesClientes = ClientesController()
GestionesVentas = VentasController()
GestionesPagos = PagosController()
GestionesProductos = ProductoController()
GestionesSalidas = SalidaController()
GestionesVendedores = VendedoresController()
GestionInventario = InventarioController()

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
api_bp.route('/InsertarProductoVenta', methods=['POST'])(GestionesVentas.insert_productos_venta)
api_bp.route('/DeleteVenta/<int:detalle_venta_id>', methods=['DELETE'])(GestionesVentas.delete_producto_venta)

# Rutas para manejar Pagos
api_bp.route('/InsertarPago', methods=['POST'])(GestionesPagos.create_pago)
api_bp.route('/GetPago/<int:venta_id>', methods=['GET'])(GestionesPagos.get_pago)
api_bp.route('/ActualizarPago/<int:venta_id>', methods=['PUT'])(GestionesPagos.update_pago)

# Rutas para manejar Salidas
api_bp.route('/buscar-ventas', methods=['POST'])(GestionesSalidas.buscar_ventas)
api_bp.route('/obtener-detalle-venta/<int:venta_id>', methods=['GET'])(GestionesSalidas.obtener_detalle_venta)
api_bp.route('/registrar-salida', methods=['POST'])(GestionesSalidas.registrar_salida)

# CRUD de Productos
api_bp.route('/InsertarProducto', methods=['POST'])(GestionesProductos.create_producto)

# api_bp.route('/InsertarProducto', methods=['POST'])(GestionesProductos.insert_producto_venta)
api_bp.route('/GetProducto/<int:producto_id>', methods=['GET'])(GestionesProductos.get_producto)
api_bp.route('/ActualizarProducto/<int:producto_id>', methods=['PUT'])(GestionesProductos.update_producto)
api_bp.route('/EliminarProducto/<int:producto_id>', methods=['DELETE'])(GestionesProductos.delete_producto)
api_bp.route('/GetAllProductos', methods=['GET'])(GestionesProductos.get_all_productos)

# Rutas para manejar Vendedores
api_bp.route('/InsertarVendedor', methods=['POST'])(GestionesVendedores.create_vendedor)
api_bp.route('/GetVendedor/<int:vendedor_id>', methods=['GET'])(GestionesVendedores.get_vendedor)
api_bp.route('/GetAllVendedores', methods=['GET'])(GestionesVendedores.get_all_vendedores)
api_bp.route('/ActualizarVendedor/<int:vendedor_id>', methods=['PUT'])(GestionesVendedores.update_vendedor)
api_bp.route('/EliminarVendedor/<int:vendedor_id>', methods=['DELETE'])(GestionesVendedores.delete_vendedor)
# Rutas para manejar el Dashboard



# Rutas para inventario
api_bp.route('/insertar-inventario', methods=['POST'])(GestionInventario.registrar_movimiento_inventario)