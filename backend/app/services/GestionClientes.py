from app.models.Cliente import Cliente

class ClienteService:
    def __init__(self):
        self.Cliente = Cliente()

    def create_cliente(self, *args):
        return self.Cliente.create_cliente(*args)

    def get_cliente_by_id(self, cliente_id):
        return self.Cliente.get_cliente_by_id(cliente_id)

    def get_all(self):
        return self.Cliente.get_all()

    def update_cliente(self, cliente_id, data):
        return self.Cliente.update_cliente(cliente_id, data)

    def delete_cliente(self, cliente_id):
        return self.Cliente.delete_cliente(cliente_id)

    def raiz(self):
        return self.Cliente.raiz()
