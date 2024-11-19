# app/__init__.py
from flask import Flask

app = Flask(__name__)

# Configuration for file uploads
app.config['UPLOAD_FOLDER'] = './uploads'  # Directory where files will be stored
app.config['ALLOWED_EXTENSIONS'] = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}  # Allowed file types

# Initialize routes
from app import routes
