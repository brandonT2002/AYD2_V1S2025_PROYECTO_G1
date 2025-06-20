from flask import request, jsonify
from app.services.salida_service import SalidaService

class SalidaController:
    """Controlador para manejar las salidas de bodega"""
    
    def __init__(self):
        self.salida_service = SalidaService()



    