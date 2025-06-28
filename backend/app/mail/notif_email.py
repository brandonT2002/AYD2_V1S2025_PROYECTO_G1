from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Personalization, To
import os
from dotenv import load_dotenv
load_dotenv()

SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')
TEMPLATE_ID = os.getenv('TEMPLATE_ID')
print(f"SendGrid API Key: {SENDGRID_API_KEY}")
print(f"SendGrid Template ID: {TEMPLATE_ID}")


def enviar_correo(destinatario, nombre, fecha, id_productos_stock_bajo):
    
    message = Mail(
        from_email=('imporcomguanotification@gmail.com', 'Alertas IMPORCOMGUA')
    )
    

    message.template_id = TEMPLATE_ID


    personalization = Personalization()
    personalization.add_to(To(email=destinatario))  # ✅ Corrección aquí
    personalization.dynamic_template_data = {
        'nombre': nombre,
        'fecha': fecha,
        'ids': id_productos_stock_bajo,
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

    except Exception as e:
        print(f"Error al enviar el correo: {e}")

