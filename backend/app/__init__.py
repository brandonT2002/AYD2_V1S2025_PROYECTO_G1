from flask import Flask, jsonify
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
    
    # Endpoint raíz
    @app.route('/')
    def root():
        return "<h1>Hello World!</h1>"

    return app