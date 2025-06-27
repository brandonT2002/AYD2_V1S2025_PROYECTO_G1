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

# Nit solo 7 caracteres, aquí soo miramos el largo
def test_nit_exacto_7_digitos():
    cliente = Cliente()
    resultado = cliente.create_cliente(
        nombre_negocio="NIT Exacto",
        nombre_contacto="Juan",
        departamento="01",
        municipio="Guatemala",
        direccion="Zona 1",
        nit="1234567",  # Se peude cambair a 123456 o 12345678 para que falle
        encargado_bodega="Pedro",
        telefono="12345678",
        tipo_venta="Contado",
        observaciones=""
    )
    assert isinstance(resultado, tuple), "El NIT no tiene exactamente 7 caracteres"

# Valdier que que el NIT sea numeros
def test_nit_solo_numeros():
    cliente = Cliente()
    resultado = cliente.create_cliente(
        nombre_negocio="NIT Numérico",
        nombre_contacto="Luis",
        departamento="02",
        municipio="Mixco",
        direccion="Zona 2",
        nit="1234567",   # Cambiar a "12345A67" para que de error
        encargado_bodega="Carlos",
        telefono="87654321",
        tipo_venta="Crédito",
        observaciones=""
    )
    assert isinstance(resultado, tuple), "El NIT debe contener solo números"

# Telefono 8 digios, aquí es el largo 
def test_telefono_exacto_8_digitos():
    cliente = Cliente()
    resultado = cliente.create_cliente(
        nombre_negocio="Teléfono Exacto",
        nombre_contacto="Ana",
        departamento="02",
        municipio="Mixco",
        direccion="Zona 2",
        nit="7654321",
        encargado_bodega="Luis",
        telefono="87654321",  # Se puede cambiar a 123456789 para que falle
        tipo_venta="Crédito",
        observaciones=""
    )
    assert isinstance(resultado, tuple), "El teléfono no tiene exactamente 8 dígitos numéricos"

# Prba solo pueda tener 10 dígitos con la estrucutra que se coloca 
def test_fecha_formato_correcto():
    inventario = InventarioModel()
    resultado = inventario.insertar_duca(
        numero_duca="DUCA123",
        fecha="2025-06-26",  # Cambair a  2025-6-26 paraque falle
        numero_contendor="CONT123",
        numero_duca_rectificada=None,
        fecha_duca_rectificada=None
    )
    assert isinstance(resultado, int), "La fecha no tiene exactamente 10 caracteres en formato YYYY-MM-DD"
