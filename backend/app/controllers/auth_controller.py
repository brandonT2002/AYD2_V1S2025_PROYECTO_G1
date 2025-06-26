from flask import request, jsonify
from app.services.auth_service import AuthService

class AuthController:
    """Controlador para manejar las operaciones de autenticación de usuarios"""

    def __init__(self):
        self.auth_service = AuthService()
        self.auth_service.setup()

    def login(self):
        """Maneja el inicio de sesión de un usuario"""
        try:
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return jsonify({'error': 'Los campos "email" y "password" son requeridos'}), 400

            user_info = self.auth_service.login(email, password)
            if user_info:
                return jsonify({'success': True, 'user_info': user_info})
            else:
                return jsonify({'error': 'Credenciales inválidas'}), 401
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    def crear_usuario(self):
        """Crea un nuevo usuario en el sistema"""
        try:
            data = request.get_json()
            nombre = data.get('nombre')
            email = data.get('email')
            password = data.get('password')
            rol = data.get('rol')

            if not nombre or not  email or not password or not rol:
                return jsonify({'error': 'Todos los campos son requeridos'}), 400

            user_id = self.auth_service.crear_usuario(nombre,  email, password, rol)
            return jsonify({'success': True, 'user_id': user_id})
        except Exception as e:
            return jsonify({'error': str(e)}), 500