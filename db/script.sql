/* ===========================================================
   IMPORCOMGUA — ESQUEMA BASE DE DATOS
   Charset: utf8mb4 / Engine: InnoDB
   =========================================================== */

CREATE DATABASE IF NOT EXISTS imporcomgua
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE imporcomgua;

/*--------------------------- 1. Seguridad mínima ---------------------------*/
CREATE TABLE roles (
  id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(30) NOT NULL UNIQUE
) ENGINE=InnoDB;

INSERT INTO roles (nombre) VALUES
  ('Administrador'),('Bodeguero'),('Vendedor'),('Cobranza'),('Cliente');

CREATE TABLE usuarios (
  id           INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  username     VARCHAR(50) NOT NULL UNIQUE,
  password_sha256 CHAR(64) NOT NULL,                -- almacenar hash SHA-256
  nombre        VARCHAR(100),
  rol_id        TINYINT UNSIGNED NOT NULL,
  activo        TINYINT(1) DEFAULT 1,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (rol_id) REFERENCES roles(id)
) ENGINE=InnoDB;

/*--------------------------- 2. Datos maestros -----------------------------*/
CREATE TABLE clientes (
  id                INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  codigo_cliente    CHAR(4) NOT NULL UNIQUE,        -- AL01, GT15, etc.
  nombre_negocio    VARCHAR(100) NOT NULL,
  nombre_contacto   VARCHAR(100) NOT NULL,
  departamento      CHAR(2)  NOT NULL,              -- catálogo interno
  municipio         VARCHAR(60) NOT NULL,
  direccion         TEXT,
  nit               VARCHAR(20),
  encargado_bodega  VARCHAR(100),
  telefono          VARCHAR(15),
  tipo_venta        ENUM('Credito','Contado','Ambas') NOT NULL,
  observaciones     TEXT,
  estado            ENUM('Activo','Inactivo') DEFAULT 'Activo',
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                               ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_clientes_nit (nit)
) ENGINE=InnoDB;

CREATE TABLE productos (
  id                 INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  codigo             VARCHAR(20) NOT NULL UNIQUE,
  nombre             VARCHAR(100) NOT NULL,
  unidad_medida      ENUM('Unidad','Fardo','Paquete') NOT NULL,
  unidades_por_fardo INT UNSIGNED DEFAULT 1,
  precio_fardo       DECIMAL(10,2) DEFAULT 0,
  disponible         TINYINT(1) DEFAULT 1,
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE vendedores (
  id                   INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  codigo               VARCHAR(10) NOT NULL UNIQUE,
  nombres              VARCHAR(100) NOT NULL,
  apellidos            VARCHAR(100) NOT NULL,
  telefono             VARCHAR(15),
  direccion            TEXT,
  porcentaje_comision  DECIMAL(5,2) NOT NULL,
  estado               ENUM('Activo','Inactivo') DEFAULT 'Activo',
  created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

/*--------------------------- 3. Inventario -------------------------------*/
CREATE TABLE inventario (
  producto_id   INT UNSIGNED PRIMARY KEY,
  stock_unidades INT NOT NULL DEFAULT 0,
  updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                           ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (producto_id) REFERENCES productos(id)
) ENGINE=InnoDB;

CREATE TABLE duca (
  id                      INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  numero_duca             VARCHAR(30) NOT NULL,
  fecha                   DATE NOT NULL,
  numero_contenedor       VARCHAR(30) NOT NULL,
  numero_duca_rectificada VARCHAR(30),
  fecha_duca_rectificada  DATE,
  created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE inventario_movimientos (
  id                  BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  tipo                ENUM('Ingreso','Despacho','Salida','Recepcion') NOT NULL,
  producto_id         INT UNSIGNED NOT NULL,
  cantidad_fardos     INT UNSIGNED NOT NULL,
  unidades_por_fardo  INT UNSIGNED NOT NULL,
  unidades_totales    INT UNSIGNED NOT NULL,
  fecha               DATE NOT NULL,
  responsable_id      INT UNSIGNED,
  venta_id            BIGINT UNSIGNED,
  duca_id             INT UNSIGNED,
  comentario          TEXT,
  created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (producto_id)    REFERENCES productos(id),
  FOREIGN KEY (responsable_id) REFERENCES usuarios(id),
  FOREIGN KEY (duca_id)        REFERENCES duca(id)
) ENGINE=InnoDB;

/*--------------------------- 4. Ventas y detalle --------------------------*/
CREATE TABLE ventas (
  id                BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  fecha_venta       DATE NOT NULL,
  fecha_salida_bodega DATE,
  cliente_id        INT UNSIGNED NOT NULL,
  numero_envio      VARCHAR(30) NOT NULL UNIQUE,
  tipo_pago         ENUM('Contado','Credito') NOT NULL,
  dias_credito      INT UNSIGNED NOT NULL,
  vendedor_id       INT UNSIGNED NOT NULL,
  estado_cobro      ENUM('Pendiente','Parcial','Pagado') DEFAULT 'Pendiente',
  estado_venta      ENUM('Vigente','Anulada') DEFAULT 'Vigente',
  dte_numero        VARCHAR(30),
  dte_nombre        VARCHAR(100),
  dte_nit           VARCHAR(20),
  total_quetzales   DECIMAL(12,2) DEFAULT 0,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id)  REFERENCES clientes(id),
  FOREIGN KEY (vendedor_id) REFERENCES vendedores(id)
) ENGINE=InnoDB;

CREATE INDEX idx_ventas_cliente ON ventas(cliente_id);
CREATE INDEX idx_ventas_fecha   ON ventas(fecha_venta);

CREATE TABLE venta_detalle (
  id                BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  venta_id          BIGINT UNSIGNED NOT NULL,
  producto_id       INT UNSIGNED NOT NULL,
  cantidad_fardos   INT UNSIGNED NOT NULL,
  cantidad_unidades INT UNSIGNED NOT NULL,
  precio_fardo      DECIMAL(10,2) NOT NULL,
  total             DECIMAL(12,2) NOT NULL,
  FOREIGN KEY (venta_id)  REFERENCES ventas(id)     ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id)
) ENGINE=InnoDB;

CREATE INDEX idx_detalle_producto ON venta_detalle(producto_id);

/*--------------------------- 5. Pagos y comisiones ------------------------*/
CREATE TABLE pagos (
  id                BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  venta_id          BIGINT UNSIGNED NOT NULL,
  fecha_pago        DATE NOT NULL,
  banco             ENUM('Industrial','Banrural','G&T','BAM') NOT NULL,
  numero_cuenta     VARCHAR(30) NOT NULL,
  numero_transaccion VARCHAR(30),
  recibo_caja       VARCHAR(30) NOT NULL,
  monto_abono       DECIMAL(12,2) NOT NULL,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (venta_id) REFERENCES ventas(id)
) ENGINE=InnoDB;

CREATE TABLE comisiones (
  id                 BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  venta_id           BIGINT UNSIGNED NOT NULL,
  vendedor_id        INT UNSIGNED NOT NULL,
  porcentaje         DECIMAL(5,2) NOT NULL,
  monto              DECIMAL(12,2) NOT NULL,
  fecha_liquidacion  DATE NOT NULL,
  FOREIGN KEY (venta_id)   REFERENCES ventas(id),
  FOREIGN KEY (vendedor_id) REFERENCES vendedores(id)
) ENGINE=InnoDB;

/*--------------------------- 6. Lógica automática -------------------------*/
DELIMITER $$

/* Genera código de cliente (prefijo depto + correlativo) */
CREATE FUNCTION f_generar_codigo_cliente(p_depto CHAR(2))
RETURNS CHAR(4) DETERMINISTIC
BEGIN
  DECLARE v_next INT;
  SELECT IFNULL(MAX(SUBSTRING(codigo_cliente,3,2)),0)+1
    INTO v_next
    FROM clientes
   WHERE departamento = p_depto;
  RETURN CONCAT(p_depto, LPAD(v_next,2,'0'));
END$$

/* Asigna código antes de insertar cliente */
CREATE TRIGGER trg_clientes_before_ins
BEFORE INSERT ON clientes
FOR EACH ROW
BEGIN
  IF NEW.codigo_cliente IS NULL OR NEW.codigo_cliente = '' THEN
    SET NEW.codigo_cliente = f_generar_codigo_cliente(NEW.departamento);
  END IF;
END$$

/* Ajusta stock según movimiento */
CREATE TRIGGER trg_inventario_mov_after_ins
AFTER INSERT ON inventario_movimientos
FOR EACH ROW
BEGIN
  DECLARE v_exist INT;
  SELECT stock_unidades INTO v_exist
    FROM inventario
   WHERE producto_id = NEW.producto_id
   FOR UPDATE;

  IF v_exist IS NULL THEN
    IF NEW.tipo IN ('Ingreso','Recepcion') THEN
      INSERT INTO inventario (producto_id, stock_unidades)
      VALUES (NEW.producto_id, NEW.unidades_totales);
    ELSE
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Saldo insuficiente en inventario.';
    END IF;
  ELSE
    IF NEW.tipo IN ('Ingreso','Recepcion') THEN
      UPDATE inventario
         SET stock_unidades = stock_unidades + NEW.unidades_totales
       WHERE producto_id = NEW.producto_id;
    ELSE
      IF v_exist < NEW.unidades_totales THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Saldo insuficiente en inventario.';
      END IF;
      UPDATE inventario
         SET stock_unidades = stock_unidades - NEW.unidades_totales
       WHERE producto_id = NEW.producto_id;
    END IF;
  END IF;
END$$

/* Recalcula estado de cobro y liquida comisión */
CREATE TRIGGER trg_pagos_after_ins
AFTER INSERT ON pagos
FOR EACH ROW
BEGIN
  DECLARE v_total   DECIMAL(12,2);
  DECLARE v_pagado  DECIMAL(12,2);

  SELECT total_quetzales INTO v_total   FROM ventas WHERE id = NEW.venta_id;
  SELECT SUM(monto_abono) INTO v_pagado FROM pagos  WHERE venta_id = NEW.venta_id;

  UPDATE ventas
     SET estado_cobro =
         CASE
           WHEN v_pagado >= v_total THEN 'Pagado'
           WHEN v_pagado > 0        THEN 'Parcial'
           ELSE 'Pendiente'
         END
   WHERE id = NEW.venta_id;

  IF v_pagado >= v_total THEN
    INSERT IGNORE INTO comisiones (venta_id, vendedor_id, porcentaje, monto, fecha_liquidacion)
    SELECT v.id, v.vendedor_id, ven.porcentaje_comision,
           ROUND(v.total_quetzales * ven.porcentaje_comision/100, 2),
           CURDATE()
      FROM ventas v
      JOIN vendedores ven ON ven.id = v.vendedor_id
     WHERE v.id = NEW.venta_id;
  END IF;
END$$
DELIMITER ;

/*--------------------------- 7. Vistas e índices extra --------------------*/
CREATE INDEX idx_pagos_venta        ON pagos(venta_id, fecha_pago);
CREATE INDEX idx_mov_prod_fecha     ON inventario_movimientos(producto_id, fecha);

CREATE OR REPLACE VIEW vw_saldo_clientes AS
SELECT  c.id AS cliente_id,
        c.nombre_negocio,
        SUM(v.total_quetzales) - COALESCE(SUM(p.monto_abono),0) AS saldo_pendiente
  FROM clientes c
  JOIN ventas   v ON v.cliente_id = c.id
  LEFT JOIN pagos p ON p.venta_id = v.id
 GROUP BY c.id;

/*--------------------------- 8. Usuario de aplicación (opcional) ----------*/
/*
CREATE USER 'appuser'@'%' IDENTIFIED BY 'Strong_Pa$$w0rd!';
GRANT SELECT, INSERT, UPDATE, DELETE ON imporcomgua.* TO 'appuser'@'%';
FLUSH PRIVILEGES;
*/
