"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Endpoint de login
@api.route('/login', methods=['POST'])
def handle_login(): 
    request_body = request.json # Recogemos los datos del body mandado    
    password = request_body.get('password') # Recogemos el campo password del request_body
    username = request_body.get('username') # Recogemos el campo username del request_body

    if not username or not password: # Validamos si existen los campos username y password
        return jsonify({"message": "Todos los campos deben estar completos"}), 400
    
    user = User.query.filter_by(username = username, password = password).first() # Buscamos dentro de la tabla user si hay ya un usuario que contenga los mismos datos

    if not user: # Validamos si existe ese usuario dentro de la base de datos
        return jsonify({"message": "Nombre de usuario o contraseña erroneos"}), 400
    
    user_serialize = user.serialize()
    token = create_access_token(identity=user.username) # Creamos el token del usuario
    return jsonify({"token": token,
                    "user":user_serialize}), 200


# Endpoint de registro
@api.route('/signup', methods=['POST'])
def handle_register():
    request_body = request.json # Recogemos los datos del body mandado  
    username = request_body.get('username') # Recogemos el campo username del request_body
    email = request_body.get('email') # Recogemos el campo email del request_body
    password = request_body.get('password') # Recogemos el campo password del request_body

    if not username or not password or not email: # Validamos si existen los campos email, username y password
        return jsonify({"message": "Todos los campos deben estar completos"}), 400

    user = User.query.filter_by(username = username, password = password).first() # Buscamos dentro de la tabla user si hay ya un usuario que contenga los mismos datos

    if user: # Validamos si existe ese usuario dentro de la base de datos
        return jsonify({"message": "Ese usuario ya existe"}), 400
    
    usuario_add = User(username = username, email = email, password = password) # Indicamos la inserccion que deseamos hacer en la base de datos

    db.session.add(usuario_add) # Realizamos la insercion
    db.session.commit() # Actualizamos la base de datos

     # Retornamos los datos añadidos
    usuario_add_serialize = usuario_add.serialize()
    return jsonify({"response":usuario_add_serialize}), 200


# Ruta solo existente si se tiene un token
@api.route('/payment', methods=['POST'])
@jwt_required() # Esta funcion hace que si no hay token valido no se pueda acceder a ella
def pago():
    data = request.json # Recogemos los datos del body mandado
    amount = data.get('amount')
    current_user = get_jwt_identity() # Recogemos los datos del usuario que está intentado hacer el post

    return jsonify({"message": current_user}), 200




