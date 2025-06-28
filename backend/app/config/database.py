import mysql.connector
from app.utils.singleton import Singleton
from app.config.settings import Config

class DatabaseConnection(Singleton):
    """Singleton para manejar la conexión a la base de datos"""
    
    def __init__(self):
        if not hasattr(self, 'connection'):
            self.connection = None
            self.connect()
    
    def connect(self):
        """Establece la conexión a la base de datos"""
        try:
            self.connection = mysql.connector.connect(
                host=Config.DB_HOST,
                port=Config.DB_PORT,
                user=Config.DB_USER,
                password=Config.DB_PASSWORD,
                database=Config.DB_NAME,
                charset='utf8mb4',
                autocommit=True
            )
            print("Conexión a la base de datos establecida")
        except Exception as e:
            print(f"Error al conectar a la base de datos: {e}")
            raise
    
    def get_connection(self):
        """Retorna la conexión activa"""
        if self.connection is None or not self.connection.is_connected():
            self.connect()
        return self.connection
    
    def close(self):
        """Cierra la conexión"""
        if self.connection and self.connection.is_connected():
            self.connection.close()