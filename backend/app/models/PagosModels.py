from flask import jsonify
from app.models.base_model import BaseModel

class PagosModels(BaseModel):
    """Modelo para manejar las pagos"""
    def __init__(self):
        super().__init__()
        self.table_name = "pagos"

    def get_pago_by_id(self, venta_id):
        """Obtiene un pago por su ID"""
        query = f"SELECT * FROM ventas WHERE id = %s"
        venta = self.execute_single_query(query, (venta_id,))
        return jsonify({
            "status": "success",
            "venta": venta
        })

    def create_pago(self, data):    
        """Crea un nuevo pago y calcula información relacionada"""
        venta_id = data.get('venta_id')
        pendiente = data.get('pendiente', 0)
        monto_abono = data.get('monto_abono', 0)
        # 1. Insertar el nuevo pago
        insert_query = f"""
            INSERT INTO {self.table_name} 
            (venta_id, fecha_pago, banco, numero_cuenta, numero_transaccion, recibo_caja, monto_abono) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        self.execute_query(insert_query, (
            data['venta_id'],
            data['fecha_pago'],
            data['banco'],
            data['numero_cuenta'],
            data['numero_transaccion'],
            data['recibo_caja'],
            data['monto_abono']
        ))

        if pendiente > 0:
            update_query = f"""
                UPDATE ventas 
                SET pagado = pagado + %s 
                WHERE id = %s
            """
            self.execute_query(update_query, (monto_abono, venta_id))
        else:
            update_query = f"""
                UPDATE ventas 
                SET pagado = pagado + %s, estado_cobro = 'Pagado'
                WHERE id = %s
            """
            self.execute_query(update_query, (monto_abono, venta_id))


        return jsonify({
            "status": "success",
            "mensaje": "Pago registrado correctamente",
            "pago": {
                "venta_id": data['venta_id'],
                "fecha_pago": data['fecha_pago'],
                "banco": data['banco'],
                "monto_abono": data['monto_abono']
            }
        })

    def fetch_one(self, query, params=None):
        return self.execute_single_query(query, params)

    def update_pago(self, pago_id, data):
        """Actualiza un pago existente"""
        query = f"UPDATE {self.table_name} SET fecha = %s, cliente_id = %s, monto = %s, metodo_pago = %s, observaciones = %s WHERE id = %s"
        self.execute_query(query, (data['fecha'], data['cliente_id'], data['monto'], data['metodo_pago'], data['observaciones'], pago_id))
        return "Pago actualizado con éxito"

    
    
