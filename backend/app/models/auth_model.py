from app.models.base_model import BaseModel

class AuthModel(BaseModel):
    """Modelo para manejar la autenticación de usuarios"""

    def login(self, email, password):
        """Verifica las credenciales del usuario y devuelve su información si son válidas"""
        query = """
            SELECT id,  nombre, correo, rol_id
            FROM usuarios
            WHERE correo = %s AND contrasena = SHA2(%s,256)
        """
        user_info = self.execute_query(query, (email, password))
        if user_info:
            return user_info[0]

    def crear_usuario(self, nombre,  email, password, rol):
        """Crea un nuevo usuario en la base de datos"""
        query = """
            INSERT INTO usuarios (nombre, correo, contrasena, rol_id)
            VALUES (%s, %s,  SHA2(%s,256), %s)
        """
        return self.execute_query(query, (nombre,  email, password, rol))