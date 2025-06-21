from flask import request, jsonify
from app.services.Inventario import InventarioService
from datetime import datetime

class InventarioController:
    """Controlador para manejar las operaciones de inventario"""

    def __init__(self):
        self.inventario_service = InventarioService()
        self.inventario_service.setup()

    def verificar_existencia_inventario(self, producto_id, duca_id):
        """Verifica si existe un inventario para un producto y Duca específicos"""
        try:
            existe = self.inventario_service.verificar_existencia_inventario(producto_id, duca_id)
            return jsonify({'existe': existe})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    def registrar_duca(self):
        """Registra un nuevo Duca en el sistema"""
        try:
            data = request.get_json()
            numero_duca = data.get('numero_duca')
            fecha = data.get('fecha')
            numero_contendor = data.get('numero_contendor')
            numero_duca_rectificada = data.get('numero_duca_rectificada')
            fecha_duca_rectificada = data.get('fecha_duca_rectificada')

            if not numero_duca or not fecha or not numero_contendor:
                return jsonify({'error': 'Los campos "numero_duca", "fecha" y "numero_contendor" son requeridos'}), 400

            duca_id = self.inventario_service.registrar_duca(
                numero_duca, fecha, numero_contendor, 
                numero_duca_rectificada, fecha_duca_rectificada
            )
            return jsonify({'success': True, 'duca_id': duca_id})
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
    def update_stock_inventario(self, id_producto,  stokc_unidades):
        """Actualiza el stock de un producto en inventario"""
        try:
            self.inventario_service.actualizar_fecha_creacion(id_producto, stokc_unidades)
            return jsonify({'success': True})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    def registrar_movimiento_inventario(self):
        """Registra un nuevo movimiento de inventario"""
        try:
            data = request.get_json()
            tipo = "Ingreso"
            cantidad_fardos = data.get('cantidad_fardos')
            unidades_totales = data.get('unidades_totales')
            producto_id = data.get('producto_id')
            fecha_ingreso = data.get('fecha_ingreso')
            # data del duca
            duca_num = data.get('numero_duca')
            fecha = data.get('fecha')
            duca_num_rectificada = data.get('numero_duca_rectificada')
            fecha_duca_rectificada = data.get('fecha_duca_rectificada')
            num_contendor = data.get('numero_contendor')

            print(f"Datos recibidos: {data}")
            duca_id = self.inventario_service.registrar_duca(
                duca_num, fecha, num_contendor, 
                duca_num_rectificada, fecha_duca_rectificada
            )

            inventario_id = self.inventario_service.registrar_movimiento_inventario(
                tipo, cantidad_fardos, unidades_totales, 
                producto_id, duca_id
            )
            # convertir fecha a formato current timestamp
            fecha_datetime = datetime.strptime(fecha_ingreso, "%Y-%m-%d")
            formato_mysql_con_hora = fecha_datetime.strftime("%Y-%m-%d %H:%M:%S")

            self.inventario_service.inventario_model.update_created_at(inventario_id, formato_mysql_con_hora)
            self.inventario_service.actualizar_stock_inventario(producto_id, unidades_totales)
            return jsonify({'success': True, 'inventario_id': inventario_id})
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        