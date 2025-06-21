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
                cursor = connection.cursor(dictionary=True)
                cursor.execute(query, params)
                
                result = cursor.fetchall()
                if result:
                    return [dict(row) for row in result]
                return []
                
        except Exception as e:
            print(f"Error ejecutando consulta: {e}")
            raise

    def execute_query_new(self, query, params=None):
        """Ejecuta una consulta SQL"""
        connection = self.db.get_connection()
        try:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(query, params or ())
                result = cursor.fetchall()
                return result  # Ya es una lista de diccionarios, no necesitas convertirlo
        except Exception as e:
            print(f"Error ejecutando consulta: {e}")
            connection.rollback()
            raise
        finally:
            connection.close()  # O manejar la conexión de acuerdo a tu estrategia

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
