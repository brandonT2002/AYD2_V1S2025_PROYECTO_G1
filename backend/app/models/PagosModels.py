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
        """Crea un nuevo pago y calcula información relacionada"""

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

        # 2. Obtener info de la venta
        venta_query = """
            SELECT fecha_venta, dias_credito, total_quetzales
            FROM ventas
            WHERE id = %s
        """
        venta = self.fetch_one(venta_query, (data['venta_id'],))

        if not venta:
            return None

        fecha_venta = venta['fecha_venta']
        dias_credito = venta['dias_credito']
        total_quetzales = float(venta['total_quetzales'])

        # 3. Calcular total pagado
        total_pagado_query = """
            SELECT SUM(monto_abono) AS total_pagado
            FROM pagos
            WHERE venta_id = %s
        """
        resultado = self.fetch_one(total_pagado_query, (data['venta_id'],))
        total_pagado = float(resultado['total_pagado']) if resultado['total_pagado'] else 0.0

        # 4. Calcular saldo pendiente
        saldo_pendiente = total_quetzales - total_pagado

        # 5. Calcular días restantes de crédito
        from datetime import datetime, timedelta
        fecha_venta_dt = datetime.strptime(str(fecha_venta), "%Y-%m-%d")
        hoy = datetime.strptime(str(data['fecha_pago']), "%Y-%m-%d")
        dias_pasados = (hoy - fecha_venta_dt).days
        dias_restantes = max(0, dias_credito - dias_pasados)

        return jsonify({
            "status": "success",
            "mensaje": "Pago registrado correctamente",
            "pago": {
                "venta_id": data['venta_id'],
                "fecha_pago": data['fecha_pago'],
                "banco": data['banco'],
                "monto_abono": data['monto_abono']
            },
            "credito": {
                "dias_credito": dias_credito,
                "dias_restantes": dias_restantes
            },
            "estado_cobro": {
                "total_venta": total_quetzales,
                "total_pagado": total_pagado,
                "saldo_pendiente": saldo_pendiente
            }
        })

    def fetch_one(self, query, params=None):
        return self.execute_single_query(query, params)


    
    def update_pago(self, pago_id, data):
        """Actualiza un pago existente"""
        query = f"UPDATE {self.table_name} SET fecha = %s, cliente_id = %s, monto = %s, metodo_pago = %s, observaciones = %s WHERE id = %s"
        self.execute_query(query, (data['fecha'], data['cliente_id'], data['monto'], data['metodo_pago'], data['observaciones'], pago_id))
        return "Pago actualizado con éxito"

  
    
