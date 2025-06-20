from app.config.database import DatabaseConnection
from app.utils.singleton import Singleton

class BaseModel(Singleton):
    """Modelo base con patrón Singleton para operaciones de BD"""

    def __init__(self):
        self.db = DatabaseConnection()

    def execute_query(self, query, params=None):
        """Ejecuta una consulta SQL y retorna múltiples resultados como diccionarios"""
        connection = self.db.get_connection()
        try:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(query, params or ())
                return cursor.fetchall()
        except Exception as e:
            print(f"Error ejecutando consulta: {e}")
            raise

    def returning_id(self, query, params=None):
        """Ejecuta una consulta SQL que retorna el ID insertado"""
        connection = self.db.get_connection()
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, params or ())
                connection.commit()
                return cursor.lastrowid
        except Exception as e:
            print(f"Error ejecutando consulta: {e}")
            raise

    def execute_single_query(self, query, params=None):
        """Ejecuta una consulta que retorna un solo resultado como diccionario"""
        result = self.execute_query(query, params)
        return result[0] if result else None
