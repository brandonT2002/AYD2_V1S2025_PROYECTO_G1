from flask import Flask
from flask_cors import CORS
from app.config.settings import Config
from app.routes.routes import api_bp

def create_app():
    """Factory para crear la aplicación Flask"""
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Configurar CORS
    CORS(app)
    
    # Registrar blueprints
    app.register_blueprint(api_bp)
    
    return app