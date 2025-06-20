from app.utils.singleton import Singleton

class BaseService(Singleton):
    """Servicio base con patrón Singleton"""
    
    def __init__(self):
        if not hasattr(self, 'initialized'):
            self.initialized = True
            self.setup()
    
    def setup(self):
        """Método para configuración inicial del servicio"""
        pass