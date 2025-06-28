from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Ruta al ChromeDriver
PATH = '/Users/sebas/Documents/Vacas de junio/AYD2_V1S2025_PROYECTO_G1/backend/tests_imporcomgua/chromedriver'
service = Service(PATH)
driver = webdriver.Chrome(service=service)

# Abre la página de login
driver.get("http://imporcomgua.s3-website-us-east-1.amazonaws.com/")

# Esperar a que se renderice la página (puedes mejorar esto con WebDriverWait)
time.sleep(2)

# Encontrar campo de correo por el atributo 'placeholder'
email_input = driver.find_element(By.XPATH, "//input[@placeholder='usuario@correo.com']")
email_input.clear()
email_input.send_keys("meso.israelajsivinac@gmail.com")

# Encontrar campo de contraseña por el atributo 'placeholder'
password_input = driver.find_element(By.XPATH, "//input[@placeholder='**********']")
password_input.clear()
password_input.send_keys("admin123")

# Enviar el formulario simulando Enter o dando clic al botón
password_input.send_keys(Keys.ENTER)

# Esperar un momento para ver el resultado
time.sleep(5)

# Validar si redirigió a la ruta esperada (ej. /inventario para admin)
assert "/inventario" in driver.current_url or "/ventas" in driver.current_url, "Login falló o no redirigió correctamente"

print("Login exitoso y redirección correcta")

# Cierra el navegador
driver.quit()
