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
    
    def actualizar_usuario(self, user_id, nombre=None, password=None, rol=None):
        """Actualiza la informacion de un usuario existente"""
        query = "UPDATE usuarios SET "
        params = []
        
        if nombre:
            query += "nombre = %s, "
            params.append(nombre)
        if password:
            query += "contrasena = SHA2(%s,256), "
            params.append(password)
        if rol:
            query += "rol_id = %s, "
            params.append(rol)

        query = query.rstrip(", ") + " WHERE id = %s"
        params.append(user_id)
        print(query, params)
        return self.execute_query(query, tuple(params))
    
    def eliminar_usuario(self, user_id):
        """Elimina un usuario de la base de datos"""
        query = "DELETE FROM usuarios WHERE id = %s"
        return self.execute_query(query, (user_id,))
    
    def obtener_usuarios(self):
        """Obtiene la lista de todos los usuarios con el nombre del rol"""
        query = """
            SELECT u.id, u.nombre, u.correo, u.rol_id, r.nombre AS rol
            FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            ORDER BY u.id
        """
        return self.execute_query(query)
    
    def obtener_usuarios_por_roles(self, roles_ids):
        """Obtiene usuarios filtrados por roles específicos"""
        placeholders = ','.join(['%s'] * len(roles_ids))
        query = f"""
            SELECT u.id, u.nombre, u.correo, u.rol_id, r.nombre AS rol
            FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            WHERE u.rol_id IN ({placeholders})
            ORDER BY u.id
        """
        return self.execute_query(query, tuple(roles_ids))