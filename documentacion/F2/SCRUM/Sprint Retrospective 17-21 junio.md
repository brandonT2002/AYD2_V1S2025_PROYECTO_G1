# Sprint Retrospective - 17 al 21 de Junio 2025
## Proyecto IMPORCOMGUA - Grupo 1

**Fecha de la retrospectiva:** 21 de junio de 2025  
**Duración del sprint:** 4 días (17-20 junio 2025)  
**Equipo:** 7 integrantes  
**Facilitador:** Equipo completo  

---

## 🎯 Objetivos del Sprint

### Objetivo Principal
Completar la **Fase 2** del proyecto IMPORCOMGUA, implementando las funcionalidades core del sistema (inventario, gestión de datos, ventas y pagos) con arquitectura en capas usando React + Flask + MySQL.

### Objetivos Específicos Alcanzados
- ✅ Corrección y refinamiento de documentación de Fase 1
- ✅ Implementación de arquitectura en capas definida
- ✅ Desarrollo de componentes de frontend en React
- ✅ Creación de APIs backend en Flask
- ✅ Diseño e implementación de base de datos MySQL
- ✅ Integración entre frontend y backend
- ✅ Implementación de funcionalidades críticas por módulo

---

## 📊 Métricas del Sprint

### Distribución de Tareas por Integrante
| Integrante | Módulo Asignado | RFs Implementados | Estado |
|------------|-----------------|-------------------|---------|
| **Joab** | Gestión de Inventario | RF 101-104 | ✅ Completado |
| **Sebastián** | Gestión de Clientes | RF 205-207 | ✅ Completado |
| **Luis René** | Gestión de Productos | RF 207, 209, 213 | ✅ Completado |
| **Daniel** | Gestión de Ventas | RF 301-303 | ✅ Completado |
| **Brandon** | Gestión de Vendedores/Pagos | RF 304-305, Pagos | ✅ Completado |
| **José** | Gestión de Pagos | RF 401-402 | ✅ Completado |
| **William** | Gestión de Saldos/Productos | RF 403-404 | ✅ Completado |

### Estadísticas de Progreso
- **Tareas planificadas:** 28 RFs
- **Tareas completadas:** 28 RFs (100%)
- **Impedimentos reportados:** 0
- **Daily meetings realizados:** 4/4
- **Participación del equipo:** 100%

---

## 🚀 ¿Qué funcionó bien? (Keep Doing)

### 💪 Fortalezas del Equipo

1. **Comunicación efectiva**
   - Daily meetings puntuales y estructurados
   - Transparencia total en el progreso de tareas
   - Cero impedimentos reportados durante todo el sprint

2. **Organización y planificación**
   - Distribución clara de responsabilidades desde el Sprint Planning
   - Uso efectivo de herramientas colaborativas (Trello, Git)
   - Documentación detallada y actualizada constantemente

3. **Adaptabilidad técnica**
   - Rápida configuración del stack tecnológico (React + Flask + MySQL)
   - Resolución eficiente de problemas técnicos (conexiones DB, endpoints)
   - Integración exitosa entre frontend y backend

4. **Colaboración y apoyo mutuo**
   - Reasignación flexible de tareas cuando fue necesario
   - Conocimiento compartido entre módulos
   - Apoyo técnico entre integrantes

### 🎯 Logros Técnicos Destacados

- **Arquitectura sólida:** Implementación exitosa de arquitectura en 3 capas
- **Frontend responsivo:** Componentes React con Tailwind CSS funcionando correctamente
- **Backend robusto:** APIs REST en Flask con validaciones de negocio
- **Base de datos optimizada:** Schema MySQL con integridad referencial
- **Integración completa:** Conexión exitosa entre todas las capas

---

## 🔧 ¿Qué se puede mejorar? (Start Doing)

### 📈 Oportunidades de Mejora

1. **Gestión de dependencias técnicas**
   - **Problema identificado:** Algunos retrasos menores por dependencias entre módulos
   - **Acción propuesta:** Definir interfaces de API más temprano en el proceso
   - **Responsable:** Todos los desarrolladores backend
   - **Fecha límite:** Antes del próximo sprint

2. **Documentación técnica en tiempo real**
   - **Problema identificado:** Documentación de APIs creada después de la implementación
   - **Acción propuesta:** Crear documentación de endpoints simultáneamente con el desarrollo
   - **Responsable:** Cada desarrollador de su módulo
   - **Fecha límite:** Durante el desarrollo

3. **Testing automatizado**
   - **Problema identificado:** Falta de pruebas unitarias implementadas
   - **Acción propuesta:** Implementar al menos una prueba por módulo crítico
   - **Responsable:** Todo el equipo
   - **Fecha límite:** Próximo sprint

4. **Revisión de código cruzada**
   - **Problema identificado:** Código revisado principalmente por el autor
   - **Acción propuesta:** Implementar peer review para commits críticos
   - **Responsable:** Definir pairs de revisión
   - **Fecha límite:** Implementar en próximo sprint

---

## ⚠️ ¿Qué no funcionó? (Stop Doing)

### 🚫 Aspectos a Eliminar o Corregir

1. **Configuración tardía del entorno**
   - **Problema:** Algunos integrantes configuraron el entorno de desarrollo durante el sprint
   - **Impacto:** Pérdida de tiempo inicial que podría haberse usado para desarrollo
   - **Solución:** Pre-configurar entornos antes del próximo sprint

2. **Dependencia excesiva en conocimiento individual**
   - **Problema:** Algunos módulos fueron desarrollados por una sola persona sin transferencia de conocimiento
   - **Impacto:** Riesgo de cuello de botella en mantenimiento futuro
   - **Solución:** Sesiones de knowledge sharing por módulo

3. **Resolución de conflictos de merge post-desarrollo**
   - **Problema:** Algunos conflictos de Git se resolvieron al final del sprint
   - **Impacto:** Tiempo extra dedicado a integración
   - **Solución:** Merges más frecuentes durante el desarrollo

---

## 📝 Plan de Acción para el Próximo Sprint

### 🎯 Acciones Inmediatas (Próximos 3 días)

1. **Configuración de entorno de testing**
   - Responsable: José, Sebastián
   - Configurar framework de testing para backend y frontend

2. **Documentación de APIs**
   - Responsable: Todos los desarrolladores backend
   - Crear documentación Swagger/OpenAPI para todos los endpoints

3. **Definición de estándares de código**
   - Responsable: Daniel, Luis René
   - Establecer linting rules y code style guide

### 🔄 Mejoras de Proceso

1. **Daily meetings más enfocados**
   - Duración máxima: 15 minutos
   - Formato: Qué hice ayer, qué haré hoy, impedimentos, dependencias

2. **Revisión de código obligatoria**
   - Mínimo 1 reviewer por pull request
   - Checklist de revisión técnica

3. **Integración continua**
   - Merges diarios a rama develop
   - Testing automático en cada merge

---

## 🏆 Reconocimientos del Sprint

### 🌟 MVP del Sprint
**José** - Por la excelente gestión de la base de datos y resolución de problemas críticos de conectividad

### 🏅 Menciones Especiales

- **Joab:** Configuración ejemplar del frontend y componentes reutilizables
- **Daniel:** Liderazgo técnico en arquitectura y correcciones de documentación
- **Sebastián:** Gestión eficiente de clientes y correcciones de CDUs
- **Brandon:** Adaptabilidad en reasignación de tareas y gestión de múltiples módulos
- **Luis René:** Flexibilidad en cambios de enfoque y soporte técnico
- **William:** Desarrollo sólido de gestión de productos y saldos

---

## 📊 Métricas de Satisfacción del Equipo

### Escala de 1-10 (10 = Excelente)

| Aspecto | Puntuación | Comentarios |
|---------|------------|-------------|
| **Comunicación del equipo** | 9/10 | Excelente transparencia y daily meetings efectivos |
| **Calidad técnica** | 8/10 | Arquitectura sólida, código funcional, falta testing |
| **Cumplimiento de objetivos** | 10/10 | Todos los RFs implementados exitosamente |
| **Colaboración** | 9/10 | Gran apoyo mutuo y flexibilidad |
| **Herramientas y proceso** | 8/10 | Buen uso de Trello y Git, mejorable en CI/CD |
| **Satisfacción general** | 9/10 | Sprint muy exitoso, equipo motivado |

---

## 🔮 Expectativas para el Próximo Sprint

### 🎯 Objetivos Preliminares

1. **Fase 3 - Despliegue y optimización**
   - Despliegue en AWS EC2
   - Optimización de performance
   - Implementación de seguridad avanzada

2. **Testing y calidad**
   - Suite de pruebas automatizadas
   - Testing de integración
   - Pruebas de carga básicas

3. **Documentación final**
   - Manual de usuario
   - Documentación técnica completa
   - Guías de instalación y despliegue

### 📈 Metas del Equipo

- Mantener el 100% de participación
- Implementar las mejoras identificadas
- Lograr un despliegue exitoso en producción
- Entregar documentación completa y de calidad

---

## 🔄 Compromisos del Equipo

### Compromisos Individuales

Cada integrante se compromete a:
- Implementar al menos 2 pruebas unitarias para su módulo
- Documentar sus APIs antes de finalizar el desarrollo
- Realizar peer review de al menos 2 pull requests
- Mantener comunicación proactiva sobre impedimentos

### Compromisos Colectivos

Como equipo nos comprometemos a:
- Mantener la excelente comunicación demostrada
- Aplicar las lecciones aprendidas en este sprint
- Apoyarnos mutuamente en los desafíos técnicos
- Entregar un producto final de alta calidad

---

**Próxima retrospectiva programada para:** Finalización del proyecto (estimada para 28 de junio de 2025)

---

*Retrospectiva facilitada por el equipo completo - Grupo 1 AyD2*  
*"Un sprint exitoso que demuestra la fortaleza de nuestro equipo y proceso"*
