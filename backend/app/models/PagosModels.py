from flask import jsonify
from app.models.base_model import BaseModel

class PagosModels(BaseModel):
    """Modelo para manejar las pagos"""
    def __init__(self):
        super().__init__()
        self.table_name = "pagos"

    def get_pago_by_id(self, pago_id):
        """Obtiene un pago por su ID"""
        query = f"SELECT * FROM {self.table_name} WHERE id = %s"
        return self.execute_single_query(query, (pago_id,))
    
    def create_pago(self, data):    
        """
        Crea un nuevo pago

        INSERT INTO imporcomgua.pagos (venta_id, fecha_pago, banco, numero_cuenta, numero_transaccion, recibo_caja, monto_abono)
        VALUES
        (1, '2024-06-10', 'Banrural', '0123456789', 'TRX-999', 'RC-0001', 362.50);
        """

        query = f"""
            INSERT INTO {self.table_name} 
            (venta_id, fecha_pago, banco, numero_cuenta, numero_transaccion, recibo_caja, monto_abono) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        self.execute_query(query, (
            data['venta_id'],
            data['fecha_pago'],
            data['banco'],
            data['numero_cuenta'],
            data['numero_transaccion'],
            data['recibo_caja'],
            data['monto_abono']
        ))

        # Retornar solo lo necesario
        return jsonify({
            "status": "success",
            "mensaje": "Pago creado con éxito",
            "pago": {
                "venta_id": data['venta_id'],
                "fecha_pago": data['fecha_pago'],
                "banco": data['banco'],
                "monto_abono": data['monto_abono']
            }
        })
    
    def update_pago(self, pago_id, data):
        """Actualiza un pago existente"""
        query = f"UPDATE {self.table_name} SET fecha = %s, cliente_id = %s, monto = %s, metodo_pago = %s, observaciones = %s WHERE id = %s"
        self.execute_query(query, (data['fecha'], data['cliente_id'], data['monto'], data['metodo_pago'], data['observaciones'], pago_id))
        return "Pago actualizado con éxito"

  
    
