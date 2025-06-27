import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from app import create_app
from unittest.mock import patch
from app.models.Cliente import Cliente
from app.models.Inventario_model import InventarioModel


@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

# PRUEBAS DE INTEGRACION
def test_create_producto_success(client):
    mock_data = {"nombre": "Zapatos", "precio": 50}
    with patch("app.services.producto_service.ProductoService.create", return_value={"id": 1, **mock_data}):
        response = client.post("/api/InsertarProducto", json=mock_data)
        assert response.status_code == 200
        assert response.get_json()["nombre"] == "Zapatos"

def test_get_producto_found(client):
    mock_producto = {"id": 1, "nombre": "Zapatos", "precio": 50}
    with patch("app.services.producto_service.ProductoService.get_producto", return_value=mock_producto):
        response = client.get("/api/GetProducto/1")
        assert response.status_code == 200
        assert response.get_json()["id"] == 1

def test_get_producto_not_found(client):
    with patch("app.services.producto_service.ProductoService.get_producto", return_value=None):
        response = client.get("/api/GetProducto/999")
        assert response.status_code == 404
        data = response.get_json()
        assert data is not None
        assert data["error"] == "Producto no encontrado"

# PRUEBAS UNITARIAS

# Nit solo 7 caracteres
def test_nit_exacto_7_digitos():
    cliente = Cliente()
    nit = "1234567"  # Se puede cambiar a 123456 o 12345678 para que falle
    resultado = cliente.is_correct_length_nit(nit)
    assert resultado is None, "El NIT no tiene exactamente 7 dígitos numéricos"

# Validar que el telefono tenga exactamente 8 digitos
def test_telefono_exacto_8_digitos():
    cliente = Cliente()
    telefono = "87654321"  # Cambiar a "123456789" para que falle
    resultado = cliente.is_correct_length_telefono(telefono)
    assert resultado is None, "El teléfono no tiene exactamente 8 dígitos numéricos"

# Telefono 8 digitos, aquí es el largo 
def test_telefono_exacto_8_digitos_funcion():
    cliente = Cliente()
    telefono = "87654321"  # Cambiar a "123456789" para que falle
    resultado = cliente.is_correct_length_telefono(telefono)
    assert resultado is None, "El teléfono no tiene exactamente 8 dígitos numéricos"

# Prueba para validar que tenga 10 caracteres en formato YYYY-MM-DD
def test_fecha_formato_correcto():
    inventario = InventarioModel()
    resultado = inventario.is_date_correct_format(
        fecha="2025-06-26",  # Cambiar a "2025-6-26" para que falle
        fecha_duca_rectificada=None
    )
    assert resultado is None, "La fecha no tiene exactamente 10 caracteres en formato YYYY-MM-DD."
