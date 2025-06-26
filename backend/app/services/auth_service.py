from app.services.base_service import BaseService
from app.models.auth_model import AuthModel

class AuthService(BaseService):
    """Servicio para manejar la lógica de autenticacion de usuarios"""

    def setup(self):
        self.auth_model = AuthModel()

    def login(self, email, password):
        """Verifica las credenciales del usuario y devuelve su información si son validas"""
        return self.auth_model.login(email, password)

    def crear_usuario(self, nombre, email, password, rol):
        """Crea un nuevo usuario en la base de datos"""
        return self.auth_model.crear_usuario(nombre, email, password, rol)