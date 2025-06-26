from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Personalization, To
import datetime
import os
# cargar las variables de entorno
from dotenv import load_dotenv
load_dotenv()

# Configuración de SendGrid
SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')
TEMPLATE_ID = os.getenv('TEMPLATE_ID')
print(f"SendGrid API Key: {SENDGRID_API_KEY}")
print(f"SendGrid Template ID: {TEMPLATE_ID}")


def enviar_correo(destinatario, nombre, fecha):
    # Crear el objeto Mail
    message = Mail(
        from_email=('grupoayd692@gmail.com', 'Alertas IMPORCOMGUA')
    )
    
    # Asociar plantilla
    message.template_id = TEMPLATE_ID

    # Crear objeto Personalization
    personalization = Personalization()
    personalization.add_to(To(email=destinatario))  # ✅ Corrección aquí
    personalization.dynamic_template_data = {
        'nombre': nombre,
        'fecha': fecha,
        'subject': 'Alerta de stock bajo!'
    }
    message.add_personalization(personalization)
    
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        if response.status_code == 202:
            print(f"Correo enviado a {nombre} con éxito")
        else:
            print(f"Error al enviar el correo: {response.body}")

        """ print(f"Status: {response.status_code} para {nombre}")
        print(f"Body: {response.body}")
        print(f"Headers: {response.headers}") """
    except Exception as e:
        print(f"Error al enviar el correo: {e}")


""" correos=[
    {'nombre':'William Mazariegos','correo':'william.mazariegosineb2015@gmail.com'},
    {'nombre':'Sebastian Godoy','correo':'sebastian.godoyse@gmail.com'},
    {'nombre':'Brandon','correo':'brandonteja02@gmail.com'}
]

for correo in correos:
    print(f"Enviando correo a {correo['nombre']} con correo {correo['correo']}...")
    enviar_correo(correo['correo'], correo['nombre'], datetime.datetime.now().strftime('%d/%m/%Y a las %I:%M %p'))
    

 """