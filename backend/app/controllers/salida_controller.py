from flask import request, jsonify
from app.services.salida_service import SalidaService

class SalidaController:
    """Controlador para manejar las salidas de bodega"""
    
    def __init__(self):
        self.salida_service = SalidaService()

    def buscar_ventas(self):
        """Endpoint para buscar ventas (ahora espera un JSON en el body)"""
        try:
            # Verifica que el contenido sea JSON y lo parsea
            if not request.is_json:
                return jsonify({'error': 'Se requiere un JSON en el body'}), 400

            data = request.get_json()
            criterio = data.get('criterio')  # 'envio' o 'cliente'
            valor = data.get('valor')

            if not criterio or not valor:
                return jsonify({
                    'error': 'Los campos "criterio" y "valor" son requeridos en el JSON'
                }), 400

            ventas = self.salida_service.buscar_ventas(criterio, valor)
            return jsonify({
                'success': True,
                'data': ventas
            })

        except Exception as e:
            return jsonify({
                'error': f'Error interno: {str(e)}'
            }), 500
    
    def obtener_detalle_venta(self, venta_id):
        """Endpoint para obtener detalle de una venta"""
        try:
            detalle = self.salida_service.obtener_detalle_venta(venta_id)
            
            return jsonify({
                'success': True,
                'data': detalle
            })
            
        except Exception as e:
            return jsonify({
                'error': str(e)
            }), 500
    
    def registrar_salida(self):
        """Endpoint para registrar salida de bodega"""
        try:
            data = request.get_json()
            venta_id = data.get('venta_id')
            fecha_salida = data.get('fecha_salida')
            
            if not venta_id:
                return jsonify({
                    'error': 'ID de venta es requerido'
                }), 400
            
            result = self.salida_service.registrar_salida_bodega(venta_id, fecha_salida)
            
            return jsonify(result)
            
        except Exception as e:
            return jsonify({
                'error': str(e)
            }), 500

    