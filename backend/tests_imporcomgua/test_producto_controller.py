import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from app import create_app
from unittest.mock import patch

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
        assert data is not None, "No se recibió respuesta JSON"
        assert data["error"] == "Producto no encontrado"
