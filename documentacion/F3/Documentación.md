## AyD2 Proyecto único
## Documentación Grupo 1
# IMPORCOMGUA

## 1. Core de Negocio
### A. Descripción

IMPORCOMGUA busca digitalizar de extremo a extremo sus procesos, inventario, comisiones y cobranzas debido a que cuentan con mucha intervención manual, para asegurar que el producto correcto salga a tiempo, la factura se emita sin errores y el dinero ingrese puntualmente. La plataforma web propuesta centraliza la captura de datos, valida las reglas de negocio y expone reportes en tiempo real, de modo que Administrador, Vendedor, Bodeguero y Encargado de Cobranza trabajen sobre la misma fuente de datos. El flujo unificado abarca el mantenimiento de clientes, productos y vendedores. Las entradas / salidas de inventario, el registro de ventas con descuentos, el seguimiento de pagos y el cálculo automático de comisiones, complementado con alertas inteligentes (crédito vencido, stock crítico) que agilizan la toma de decisiones.




### B.1 Diagrama de CDU de Alto nivel

![alt text](image-1.png)

### B.2 Diagrama de CDU Primera descomposición

![alt text](img/image-2.png)

### B. 4 Identificación de Stakeholders

| Actor                       | Funciones                                                                                        |
|-----------------------------|---------------------------------------------------------------------------------------------------|
| **Cliente**                 | Autorizar y efectuar pagos de sus compras.                                                       |
| **Vendedor**                | Registrar ventas y consultar su comisión.                                                        |
| **Aduana**                  | Verificar DUCA y liberar inventario de importación.                                              |
| **Administrador del sistema** | Gestionar inventario, datos maestros, ventas y pagos; configurar reglas de negocio; emitir reportes. |



## 2. Drivers Arquitectónicos

## A. Requerimientos funcionales críticos

### 1. Gestión de Inventario (CUN 100)

- **RF-101 Recepción de mercancía (DUCA)**
  - El sistema debe solicitar:
    - Número de DUCA (si ya existe, número y fecha de DUCA rectificada).
    - Número de contenedor.
    - Fecha de ingreso (autorrellenada, editable).
    - Producto y cantidad en fardos/paquetes.
  - Recuperar automáticamente las unidades por fardo desde la ficha de producto y calcular las unidades totales.
  - Actualizar el saldo del producto y guardar el movimiento en el historial.

- **RF-102 Despacho de productos**
  - Seleccionar una venta vigente y marcar sus productos como despachados.
  - Restar las unidades correspondientes del inventario.

- **RF-103 Revisión de historial de ventas**
  - Mostrar las ventas asociadas al cliente o al producto para ayudar a elegir el despacho.

- **RF-104 Salida de bodega**
  - Registrar la fecha de salida y el responsable; actualizar el saldo de inventario al confirmar la salida.

- **RF-105 Recibir productos**
  - Permite añadir productos debido a la recepción de los mismos.

- **RF-106 Cálculo de unidades**
  - Multiplicar la cantidad en fardos/paquetes por unidades por fardo y mostrar el resultado.

- **RF-107 Actualización de inventario**
  - Reflejar el saldo final de cada producto después de cualquier movimiento.

- **RF-108 Supervisión de niveles**
  - Mostrar el stock actual.

---

### 2. Gestionar datos (CUN 200)

#### 2.1 Clientes

- **RF-201 Registrar Cliente**
  - Solicitar: nombre del negocio, nombre del contacto, NIT, departamento, municipio, tipo de venta.
  - Generar automáticamente el código de cliente (prefijo de departamento + correlativo).

- **RF-202 Consultar Cliente**
  - Buscar por código de cliente o NIT para mostrar los datos del usuario.

- **RF-203 Actualizar Cliente**
  - Permitir modificar datos no clave (teléfono, dirección, observaciones).

- **RF-204 Dar de baja Cliente**
  - Marcar al cliente como inactivo y conservar su historial de ventas.

#### 2.2 Productos

- **RF-205 Registrar Producto**
  - Solicitar: código, nombre, unidad de medida, unidades por fardo/paquete.

- **RF-206 Consultar Producto**
  - Buscar por código o nombre y mostrar disponibilidad actual.

- **RF-207 Actualizar Producto**
  - Permitir editar precio, nombre o unidades.

- **RF-208 Retirar Producto de catálogo**
  - Marcar el producto como no disponible para nuevas ventas.

#### 2.3 Vendedores

- **RF-209 Registrar Vendedor**
  - Solicitar datos personales y porcentaje de comisión.

- **RF-210 Consultar Vendedor**
  - Mostrar los datos del vendedor con historial de ventas.

- **RF-211 Actualizar Vendedor**
  - Permitir modificar teléfono o porcentaje de comisión.

- **RF-212 Dar de baja Vendedor**
  - Marcar al vendedor como inactivo sin eliminar registros anteriores.

---

### 3. Gestionar Ventas (CUN 300)

- **RF-301 Registrar Venta**
  - El sistema debe solicitar:
    - Fecha de venta (autorrellenada, editable).
    - Cliente (Se recupera automáticamente su NIT).
    - Productos (código o nombre + cantidad).
    - Tipo de pago (contado/crédito) y, si es crédito, días de plazo.
    - Vendedor.
    - Número de envío (obligatorio).
    - Datos de factura (número DTE, nombre y NIT de factura) opcionales.
  - Validar disponibilidad en inventario.
  - Calcular cantidades en unidades, precio por fardo/paquete y total en quetzales.
  - Guardar la venta con estado inicial “Cobro pendiente” y estado “Vigente”.

- **RF-302 Aplicar Descuento**
  - Permitir aplicar un porcentaje de descuento autorizado y recalcular totales.

- **RF-304 Consultar Venta**
  - Buscar por número de envío, cliente o fecha y mostrar detalle.

- **RF-305 Liquidar Comisión**
  - Una vez pagada la venta, calcular y registrar la comisión del vendedor.

---

### 4. Manejar Datos (CUN 400)

- **RF-401 Registrar Pago**
  - Seleccionar la venta y solicitar:
    - Fecha de pago.
    - Banco (Industrial, Banrural, G&T, BAM).
    - Número de cuenta y n.º de transferencia/depósito.
    - Número de recibo de caja.
    - Monto de abono.
  - Antes de confirmar, mostrar saldo pendiente.

- **RF-402 Revisar Información de Cobranza**
  - Mostrar al encargado el saldo pendiente, los días de crédito restantes y la lista de abonos anteriores.

- **RF-403 Registrar Medio de Pago**
  - Identificar si la cuenta está en estado “Pagado en su totalidad” o “Pago Parcial” si no se cubrió la totalidad del monto.

- **RF-404 Actualizar Estado de Cobro**
  - Recalcular saldo y cambiar estado a “Parcial” o “Pagado”; registrar la fecha de cancelación definitiva si el saldo llega a cero.

- **RF-405 Consultar Saldo de Cliente**
  - Permitir al encargado ver en cualquier momento el saldo de un cliente.

- **RF-406 Liquidar Comisión en Pago Total**
  - Cuando el saldo llegue a cero, se liquidará automáticamente la comisión correspondiente al vendedor.

## B. Requerimientos no funcionales

### 2.1 Rendimiento y capacidad
- Las operaciones de alta — ventas, abonos y recepciones de inventario— deben finalizar en **≤ 5 s** con hasta **200 transacciones concurrentes**.  
- Para lograrlo se emplearán índices en las tablas principales y consultas paginadas; si el volumen crece, bastará optimizar los índices o mover la base a un servidor con más recursos, sin tocar el código.

### 2.2 Escalabilidad
- El sistema se construirá con **capas separadas (presentación, lógica y datos)** y variables de entorno para las conexiones; así, en el futuro podrá trasladarse a un servidor con mayor CPU/RAM o duplicarse en otra instancia **sin reescribir la aplicación**.  

### 2.3 Disponibilidad
- Se exige una disponibilidad práctica de **≥ 95 %** en horario laboral.  
- Una única instancia con reinicios automáticos ante fallo.

### 2.4 Seguridad y cumplimiento
- Contraseñas almacenadas con **SHA-256**.  
- Acceso cifrado vía **HTTPS (TLS 1.2 o superior)**.  
- Control de acceso por roles (Administrador, Vendedor, Bodeguero, Cobranza, Cliente).  
- Se registrará en bitácora la creación, edición o eliminación de ventas, pagos e inventario para auditoría.

### 2.5 Usabilidad
- Interfaz web **responsiva** con validación en línea para minimizar errores de captura.  
- Usuarios operativos (bodega y cobranza) deberán dominar sus tareas habituales tras **dos sesiones de práctica** como máximo.

### 2.6 Mantenibilidad
- Repositorio Git con código comentado y un **README** de instalación.  
- Al menos **una prueba automática** por módulo crítico (Inventario, Ventas, Pagos).  

### 2.7 Portabilidad / despliegue
- La aplicación debe poder ejecutarse localmente (ambiente de desarrollo) y, en su entrega final, **deploy** a una instancia **AWS EC2**.
- La misma versión de código debe correr sin cambios entre ambos entornos.


## C. Requerimientos de Restricción

### R-01: Restricción Temporal
**Descripción:** El proyecto debe completarse en el transcurso de un mes, dividido en tres fases específicas con entregables definidos.

**Justificación:** La empresa IMPORCOMGUA requiere una implementación rápida debido a las ineficiencias operativas actuales que están impactando la productividad y capacidad de respuesta hacia clientes.

**Impacto en la arquitectura:**
- Necesidad de implementar una arquitectura modular que permita desarrollo incremental
- Priorización de funcionalidades críticas para el MVP (Fase 2)
- Selección de tecnologías maduras y bien documentadas para reducir curva de aprendizaje
- Reutilización de componentes y patrones de diseño establecidos

### R-02: Restricción de Recursos Humanos
**Descripción:** El desarrollo debe ser realizado por un equipo de tamaño limitado (grupo de 7 personas) con roles específicos y participación validada de todos los integrantes.

**Justificación:** Todos los integrantes deben estar presentes en la calificación y tener commits sustanciales a lo largo del desarrollo.

**Impacto en la arquitectura:**
- Diseño de arquitectura simple y comprensible para facilitar el trabajo colaborativo
- Implementación de patrones de diseño conocidos para reducir complejidad
- Documentación exhaustiva para facilitar la colaboración del equipo
- División clara de responsabilidades entre módulos del sistema

### R-03: Restricción de Plataforma Web
**Descripción:** La solución debe ser una aplicación web que permita automatizar y optimizar los procesos clave del negocio.

**Justificación:** IMPORCOMGUA requiere una solución tecnológica web accesible desde diferentes ubicaciones y dispositivos.

**Impacto en la arquitectura:**
- Implementación de protocolos web estándar (HTTP/HTTPS)
- Consideración de navegadores web como plataforma de ejecución
- Diseño de interfaces adaptables a diferentes dispositivos

### R-04: Restricción de Despliegue en la Nube
**Descripción:** El sistema final debe ser desplegado en un entorno en la nube, preparado para el entorno operativo de IMPORCOMGUA.

**Justificación:** Necesidad de escalabilidad, disponibilidad y mantenimiento eficiente del sistema.

**Impacto en la arquitectura:**
- Arquitectura compatible con servicios de nube
- Implementación de patrones cloud-native
- Configuración para ambientes distribuidos

### R-05: Restricción de Metodología Ágil
**Descripción:** El desarrollo debe seguir una metodología ágil con iteraciones rápidas, validación continua y entrega incremental de funcionalidades.

**Justificación:** Necesidad de gestión eficiente del tiempo, colaboración continua y alineación con prioridades del cliente.

**Impacto en la arquitectura:**
- Arquitectura modular que permita desarrollo e integración incremental
- Diseño de componentes independientes para facilitar iteraciones
- Implementación de interfaces bien definidas entre módulos

---

## 3. Diagramas CDU Expandidos

### 3.1. CDU 100 Gestionar Inventario
![alt text](img/image-3.png)

#### 3.1.1 Descripción de CDU 100 Gestionar Inventario
| **Campo**                  | **Descripción**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nombre del caso de uso** | **CUN 100 Gestionar Inventario**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Actores**                | - **Administrador**: Encargado de la gestión del inventario. <br> - **Proveedores**: Involucrados en el proceso de abastecimiento. <br> - **Aduana**: Maneja los procesos aduaneros relacionados con los productos.                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Propósito**              | Gestionar las entradas, salidas y actualización del inventario, asegurando que todos los productos estén correctamente registrados y disponibles en el sistema.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Resumen**                | El caso de uso **Gestionar Inventario** incluye el registro de productos que entran y salen del inventario, la actualización del mismo y las gestiones relacionadas con la aduana. Los actores realizan tareas específicas como registrar productos y gestionar el cumplimiento de las normativas aduaneras.                                                                                                                                                                                                                                                                                                                      |
| **Flujo de trabajo**       | **Flujo Básico (Normal):** <br> 1. El **Administrador** registra la salida de productos de la bodega (**RF101 Registrar Salida de Bodega**). <br> 2. El sistema actualiza el inventario (**RF102 Actualizar Inventario**). <br> 3. El inventario es gestionado (**RF103 Gestionar Inventario**). <br> 4. La **Aduana** realiza gestiones aduaneras (**RF104 Gestiones Aduana (DUCA)**).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Mejoras**                | Integración con sistemas de trazabilidad en tiempo real para un mejor seguimiento de los productos.                                                                                                                                                                                                                                                                    |



### 3.2. CDU 200 Gestionar Datos

![alt text](img/image-5.png)

#### 3.2.1 Descripción de CDU 200 Gestionar Datos

| **Campo**                  | **Descripción**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Nombre del caso de uso** | **CUN 200 Gestionar Datos**                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Actores**                | - **Administrador**: Encargado de gestionar los datos (clientes, productos, vendedores). <br> - **Cliente**: Interactúa con el sistema para registrar y consultar sus datos. <br> - **Proveedor**: Se encarga del registro de productos y actualización de su información. <br> - **Vendedor**: Registra y actualiza datos de los vendedores y consulta la información.                                                                                                                          |
| **Propósito**              | Gestionar la información de clientes, productos y vendedores, permitiendo su registro, actualización y consulta de manera eficiente y organizada.                                                                                                                                                                                                                                                                                                                                                |
| **Resumen**                | El caso de uso **Gestionar Datos** se centra en tres áreas principales: <br> 1. **Clientes**: Involucra su registro, actualización y consulta. <br> 2. **Productos**: Gestión de los productos a través del registro, actualización y retiro. <br> 3. **Vendedores**: Registro de vendedores, actualización y gestión de bajas.                                                                                                                                                                  |
| **Flujo de trabajo**       | **Flujo Básico (Normal):** <br> 1. **Administrador** registra un nuevo **Cliente** (RF205). <br> 2. El **Administrador** actualiza la información del cliente (RF206). <br> 3. Se consulta el **Cliente** (RF207). <br> 4. El **Administrador** gestiona **Productos** (RF209) y **Vendedores** (RF213).  |
| **Prioridad**              | Alta, ya que gestionar los datos correctamente es crucial para el funcionamiento eficiente del sistema de gestión.                                                                                                                                                                                                                                                                                                                                                                               |
| **Mejoras**                | Integración con un sistema automatizado para la validación de datos y mejorar la interacción con el cliente en tiempo real.                                                                                                                                                                                                                                                                                                                                                                      |




### 3.3. CDU 300 Gestionar Ventas
![alt text](img/CDU_300.png)

#### 3.3.1 Descripción de CDU 300 Gestionar Ventas
| **Campo**                  | **Descripción**                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Nombre del caso de uso** | **CUN 300 Gestionar Ventas**                                                                                                                                                                                                                                                                                                                                                                                 |
| **Actores**                | - **Administrador**: Encargado de registrar y consultar las ventas.                                                                                                                                                                                                                                                                                                                                          |
| **Propósito**              | Registrar, consultar y gestionar las ventas dentro del sistema, interactuando con los datos de clientes, productos y vendedores.                                                                                                                                                                                                                                                                             |
| **Resumen**                | El caso de uso **Gestionar Ventas** cubre el proceso de registrar una venta, consultar los clientes, productos y vendedores asociados a cada transacción.                                                                                                                                                                                                                                                    |
| **Flujo de trabajo**       | **Flujo Básico (Normal):** <br> 1. El **Administrador** registra una venta (RF301). <br> 2. El **Administrador** consulta los **clientes** (RF302). <br> 3. El **Administrador** consulta los **productos** involucrados en la venta (RF303). <br> 4. El **Administrador** consulta los **vendedores** relacionados con la venta (RF304). <br> 5. El **Administrador** consulta la venta registrada (RF305). |
| **Prioridad**              | Alta, ya que el proceso de ventas es crucial para la operación del negocio.                                                                                                                                                                                                                                                                                                                                  |
| **Mejoras**                | Se podría integrar un sistema automatizado para recomendaciones de productos basados en ventas previas y optimización del proceso de facturación.                                                                                                                                                                                                                                                            |

### 3.4. CDU 400 Manejar Pagos
![alt text](img/CDU_400.png)

#### 3.4.1 Descripción de CDU 400 Manejar Pagos

| **Campo**                  | **Descripción**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Nombre del caso de uso** | **CUN 400 Manejar Pagos**                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Actores**                | - **Administrador**: Encargado de registrar pagos, consultar ventas y gestionar saldos de clientes. <br> - **Cliente**: Revisa su saldo y realiza pagos.                                                                                                                                                                                                                                                                                                                                               |
| **Propósito**              | Gestionar el proceso de pagos, permitiendo el registro de pagos, consulta de ventas y gestión de saldos de los clientes.                                                                                                                                                                                                                                                                                                                                                                               |
| **Resumen**                | Este caso de uso se centra en el manejo de los pagos. El **Administrador** puede registrar pagos y gestionar los saldos de los clientes, mientras que los **Clientes** pueden consultar su saldo y realizar pagos.                                                                                                                                                                                                                                                                                     |
| **Flujo de trabajo**       | **Flujo Básico (Normal):** <br> 1. El **Administrador** consulta la información de la venta (RF401). <br> 2. El **Administrador** registra un pago (RF402). <br> 3. El **Administrador** gestiona el saldo de los clientes (RF403). <br> 4. El **Cliente** revisa su saldo (RF404). <br>                                                                                                                                                                                                                                                                                                                     |
| **Mejoras**                | Integración con un sistema de pagos en línea y notificaciones automáticas de saldos y pagos realizados para mejorar la experiencia del cliente.                                                                                                                                                                                                                                                                                                                                                        |


## 4. Matrices de Trazabilidad

> [!NOTE]
>
> Los nombres de los casos de uso se encuentran en el diagrama CDU expandido.

### A. Stakeholders vs Requerimientos
|Requerimiento|Administrador|Vendedor|Cliente|
|:-:|:-:|:-:|:-:|
|RF 101|✅|||
|RF 102|✅|||
|RF 103||✅|✅|
|RF 104|✅|||
|RF 105|✅|||
|RF 106|✅|||
|RF 107|✅|||
|RF 108|✅|||
|RF 109|✅|||
|RF 201|✅||✅|
|RF 202|✅|✅||
|RF 203|✅|✅||
|RF 204|✅|||
|RF 205|✅|✅||
|RF 206|✅|✅||
|RF 207|✅|✅||
|RF 208|✅|||
|RF 209|✅|✅||
|RF 210|✅|✅||
|RF 211|✅|||
|RF 212|✅|||
|RF 301|✅|✅||
|RF 302|✅|||
|RF 303|✅|||
|RF 304|✅|||
|RF 305|✅|||
|RF 306|✅|||
|RF 401||✅||
|RF 402||✅||
|RF 403||✅||
|RF 404||✅||
|RF 405||✅||
|RF 406|||✅|

### B. Stakeholders vs Casos de Uso
|CDU/Stakeholders|Administrador|
|:-:|:-:|
|RF 101|✅|
|RF 102|✅|
|RF 103|✅|
|RF 104|✅|
|RF 105|✅|
|RF 106|✅|
|RF 107|✅|
|RF 108|✅|
|RF 109|✅|
|RF 201||
|RF 202||
|RF 203||
|RF 204||
|RF 205|✅|
|RF 206||
|RF 207|✅|
|RF 208|✅|
|RF 209|✅|
|RF 210|✅|
|RF 211|✅|
|RF 212|✅|
|RF 213|✅|
|RF 214|✅|
|RF 215|✅|
|RF 216|✅|
|RF 301|✅|
|RF 302|✅|
|RF 303|✅|
|RF 304|✅|
|RF 305|✅|
|RF 306|✅|
|RF 307|✅|
|RF 308|✅|
|RF 309|✅|
|RF 401|✅|
|RF 402|✅|
|RF 403|✅|
|RF 404|✅|
|RF 405|✅|
|RF 406|✅|

### C. Requerimientos vs Casos de uso
|Requerimiento/CDUs|CDU 1.0|CDU 2.1|CDU 2.2|CDU 2.3|CDU 3.0|CDU 4.0|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|RF 101|✅|
|RF 102|✅|
|RF 103|✅|
|RF 104|✅|
|RF 105|✅|
|RF 106|✅|
|RF 107|✅|
|RF 108|✅|
|RF 109|✅|
|RF 201||✅|||
|RF 202||✅|||
|RF 203||✅|||
|RF 204||✅|||
|RF 205|||✅||
|RF 206|||✅||
|RF 207|||✅||
|RF 208|||✅||
|RF 209||||✅|
|RF 210||||✅|
|RF 211||||✅|
|RF 212||||✅|
|RF 301|||||✅|
|RF 302|||||✅|
|RF 303|||||✅|
|RF 304|||||✅|
|RF 305|||||✅|
|RF 306|||||✅|
|RF 401||||||✅|
|RF 402||||||✅|
|RF 403||||||✅|
|RF 404||||||✅|
|RF 405||||||✅|
|RF 406||||||✅|

> [!NOTE]
>
> Los nombres de los casos de uso se encuentran en el diagrama CDU expandido.

## 5. Identificación de estructuras arquitectónicas y selección del o los estilos arquitectónicos y la razón de su elección.

**ARQUITECTURA EN CAPAS (REACT + FLASK + MYSQL)**

**1. Capa de Presentación** – Frontend (React.js)

El motivo de esta selección responde a la neesidad de mostrar una interfaz web responsiva, amigable y rápida, donde sea posible validar entradas del usuario antes de enviarlas al backend, así como consumir APIs RESTful expuestas por Flask, manejar autenticación y sesiones.

**2. Capa de Lógica de Negocio** – Backend (Python + Flask)

El motivo de esta selección responde a la necesidad de procesar toda la lógica del negocio: ventas, inventario, pagos, comisiones, control de usuarios, así como validar reglas antes de interactuar con la base de datos, gestionar sesiones y control de acceso; y exponer APIs REST para el frontend.

**3. Capa de Persistencia** – Base de Datos (MySQL)

El motivo de esta selección responde a la necesidad de almacenar y consultar toda la información del sistema (clientes, ventas, inventario, pagos, historial), relacionar correctamente las entidades con claves foráneas, garantizar integridad referencial, optimizar consultas con índices y vistas.

## 6. Diagrama de bloques que represente la arquitectura implementada

![alt text](img/Diagrama%20de%20bloques.jpeg)

## 7. Diagrama de Despliegue

![alt text](img/diagrama_despliegue.png)

## 8. Diagrama Entidad Relación

![alt text](image.png)

## 9. Prototipos

Los prototipos de interfaz presentados a continuación fueron diseñados aplicando principios de usabilidad y accesibilidad, con el objetivo de facilitar la interacción del usuario con las diferentes funcionalidades del sistema IMPORCOMGUA. Cada prototipo se centra en proporcionar una experiencia intuitiva y eficiente para los procesos operativos clave de la empresa.

### 9.1 Clientes
![alt text](img/Clientes.png)

**Funcionalidades principales:**
- Validación de campos obligatorios y opcionales
- Selección dinámica de municipios según departamento
- Configuración de tipos de venta (Crédito/Contado/Ambas)

### 9.2 Productos
![alt text](img/Producto.png)

**Funcionalidades principales:**
- Configuración de unidades de medida (Unidad/Fardo/Paquete)
- Definición de unidades por fardo/paquete para cálculos automáticos
- Validación de campos obligatorios

### 9.3 Vendedores
![alt text](img/vendedor.png)

**Funcionalidades principales:**
- Registro de información personal y de contacto
- Configuración de porcentaje de comisión personalizado
- Validación de formato de teléfono

### 9.4 Registrar Salida
![alt text](img/salida.png)

**Funcionalidades principales:**
- Búsqueda de ventas por número de envío o cliente
- Visualización completa de información de venta
- Registro de fecha de salida de bodega

### 9.5 Regstrar pagos
![alt text](img/pagos.png)

**Funcionalidades principales:**
- Búsqueda de ventas por número de envío o cliente
- Registro de pagos con múltiples bancos (Industrial/Banrural/G&T/BAM)
- Mostrar al usuario:
  - Días de créditos restantes
  - Total a pagar
  - El monto ya pagado
  - El saldo pendiente a pagar

### 9.6 Registrar Nueva venta
![alt text](img/nueva_venta.png)

**Funcionalidades principales:**
- Selección de cliente con recuperación automática de datos fiscales
- Configuración de términos de pago (Contado/Crédito) con días de crédito
- Registro múltiple de productos
- Generación automática de cantidades en unidades

### 9.7 Recepción de Mercancía
![alt text](img/ingresar_inventario.png)

**Funcionalidades principales:**
- Registro automático de fecha de ingreso (modificable)
- Selección de productos con recuperación automática de configuraciones
- Registro de información aduanera (No. Contenedor, DUCA)
- Campos para observaciones adicionales

## 10. Tablero de Kanban/Trello
https://trello.com/invite/b/6848d8b34f62ec9b0b2df06d/ATTI486dda9bfe069d4d8850c3d784877eebF8C22A4B/kanban-template

## 11. Elección de Frameworks

| Framework      | Uso                                                                                           | Razón de Elección                                                                                   |
|----------------|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| **Flask**      | Backend                                                                                       | Sencillo, flexible y fácil de usar para crear APIs rápidas y eficientes sin la necesidad de complejidad. |
| **Vite-React** | Frontend                                                                                      | Optimiza tiempos de carga y ofrece recarga en caliente, acelerando el desarrollo en **React**.         |
| **Tailwind CSS** | Diseño de interfaz de usuario                                                                  | Permite construir interfaces modernas, personalizadas y responsivas rápidamente sin escribir CSS complejo.   |
| **Node.js**    | Backend (intermediario fronted)                                                                  | Potente para aplicaciones en tiempo real y con alta concurrencia, ideal para manejar múltiples conexiones simultáneas. |
