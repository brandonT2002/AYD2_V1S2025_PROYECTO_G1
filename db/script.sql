-- -----------------------------------------------------
-- Schema imporcomgua
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `imporcomgua` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `imporcomgua` ;

-- -----------------------------------------------------
-- Table `imporcomgua`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `imporcomgua`.`clientes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,  -- Asegúrate de que sea INT UNSIGNED
  `codigo_cliente` CHAR(10),
  `nombre_negocio` VARCHAR(100) NOT NULL,
  `nombre_contacto` VARCHAR(100) NOT NULL,
  `departamento` CHAR(2) NOT NULL,
  `municipio` VARCHAR(60) NOT NULL,
  `direccion` TEXT NULL DEFAULT NULL,
  `nit` VARCHAR(20) NULL DEFAULT NULL,
  `encargado_bodega` VARCHAR(100) NULL DEFAULT NULL,
  `telefono` VARCHAR(15) NULL DEFAULT NULL,
  `tipo_venta` ENUM('Credito', 'Contado', 'Ambas') NOT NULL,
  `observaciones` VARCHAR(250) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `imporcomgua`.`duca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `imporcomgua`.`duca` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `numero_duca` VARCHAR(30) NOT NULL,
  `fecha` DATE NOT NULL,
  `numero_contenedor` VARCHAR(30) NOT NULL,
  `numero_duca_rectificada` VARCHAR(30) NULL DEFAULT NULL,
  `fecha_duca_rectificada` DATE NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `imporcomgua`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `imporcomgua`.`productos` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,  -- Asegúrate de que sea INT UNSIGNED
  `codigo` VARCHAR(20) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `unidad_medida` ENUM('Unidad', 'Fardo', 'Paquete') NOT NULL,
  `precio_unidad` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `unidades_por_fardo` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `imporcomgua`.`inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `imporcomgua`.`inventario` (
  `stock_unidades` INT UNSIGNED NOT NULL DEFAULT 0,
  `productos_id` INT UNSIGNED NOT NULL,  -- Asegúrate de que sea INT UNSIGNED
  INDEX `fk_inventario_productos1_idx` (`productos_id`),
  CONSTRAINT `fk_inventario_productos1`
    FOREIGN KEY (`productos_id`)
    REFERENCES `imporcomgua`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `imporcomgua`.`inventario_movimientos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `imporcomgua`.`inventario_movimientos` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tipo` ENUM('Ingreso', 'Despacho', 'Salida', 'Recepcion') NOT NULL,
  `cantidad_fardos` INT UNSIGNED NOT NULL,
  `unidades_totales` INT UNSIGNED NOT NULL,
  `salida_bodega` DATE,
  `comentario` TEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `productos_id` INT UNSIGNED NOT NULL,
  `duca_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_inventario_movimientos_productos1_idx` (`productos_id`),
  INDEX `fk_inventario_movimientos_duca1_idx` (`duca_id`),
  CONSTRAINT `fk_inventario_movimientos_productos1`
    FOREIGN KEY (`productos_id`)
    REFERENCES `imporcomgua`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_inventario_movimientos_duca1`
    FOREIGN KEY (`duca_id`)
    REFERENCES `imporcomgua`.`duca` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `imporcomgua`.`Vendedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `imporcomgua`.`Vendedores` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,  -- Asegúrate de que sea INT UNSIGNED
  `apellido` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(100) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `telefono` VARCHAR(9) NOT NULL,
  `direccion` VARCHAR(45) NOT NULL,
  `Comision` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `imporcomgua`.`ventas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `imporcomgua`.`ventas` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,  -- Cambié a BIGINT UNSIGNED
  `numero_envio` VARCHAR(45),
  `fecha_venta` DATE NOT NULL,
  `fecha_salida_bodega` DATE NULL DEFAULT NULL,
  `cliente_id` INT UNSIGNED NOT NULL,  -- Cambié a UNSIGNED para que coincida con la tabla clientes
  `tipo_pago` ENUM('Contado', 'Credito') NOT NULL,
  `dias_credito` INT UNSIGNED NOT NULL,  -- Cambié a UNSIGNED para que coincida con la tabla `clientes`
  `vendedor_id` INT UNSIGNED NOT NULL,  -- Cambié a UNSIGNED para que coincida con la tabla Vendedores
  `estado_cobro` ENUM('Pendiente', 'Parcial', 'Pagado') NULL DEFAULT 'Pendiente',
  `estado_venta` ENUM('Vigente', 'Anulada') DEFAULT 'Vigente', -- aqui iba un null por si acaso 
  `dte_numero` VARCHAR(30) NULL DEFAULT NULL,
  `dte_nombre` VARCHAR(100) NULL DEFAULT NULL,
  `dte_nit` VARCHAR(20) NULL DEFAULT NULL,
  `total_quetzales` DECIMAL(12,2) NULL DEFAULT 0.00,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_ventas_fecha` (`fecha_venta`),
  INDEX `fk_ventas_clientes1_idx` (`cliente_id`),
  INDEX `fk_ventas_Vendedores1_idx` (`vendedor_id`),
  CONSTRAINT `fk_ventas_clientes1`
    FOREIGN KEY (`cliente_id`)
    REFERENCES `imporcomgua`.`clientes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ventas_Vendedores1`
    FOREIGN KEY (`vendedor_id`)
    REFERENCES `imporcomgua`.`Vendedores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `imporcomgua`.`pagos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `imporcomgua`.`pagos` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `venta_id` BIGINT UNSIGNED NOT NULL,  -- Cambié a BIGINT UNSIGNED para que coincida con la tabla ventas
  `fecha_pago` DATE NOT NULL,
  `banco` ENUM('Industrial', 'Banrural', 'G&T', 'BAM') NOT NULL,
  `numero_cuenta` VARCHAR(30) NOT NULL,
  `numero_transaccion` VARCHAR(30) NULL DEFAULT NULL,
  `recibo_caja` VARCHAR(30) NOT NULL,
  `monto_abono` DECIMAL(12,2) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_pagos_venta` (`venta_id`, `fecha_pago`),
  CONSTRAINT `pagos_ibfk_1`
    FOREIGN KEY (`venta_id`)
    REFERENCES `imporcomgua`.`ventas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `imporcomgua`.`venta_detalle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `imporcomgua`.`venta_detalle` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `producto_id` INT UNSIGNED NOT NULL,  -- Cambié a INT UNSIGNED para que coincida con productos.id
  `cantidad_unidades` INT UNSIGNED NOT NULL,
  `Observaciones` VARCHAR(250) NULL,
  `ventas_id` BIGINT UNSIGNED NOT NULL,  -- Cambié a BIGINT UNSIGNED para que coincida con ventas.id
  PRIMARY KEY (`id`),
  INDEX `idx_detalle_producto` (`producto_id`),
  INDEX `fk_venta_detalle_ventas1_idx` (`ventas_id`),
  CONSTRAINT `venta_detalle_ibfk_2`
    FOREIGN KEY (`producto_id`)
    REFERENCES `imporcomgua`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_venta_detalle_ventas1`
    FOREIGN KEY (`ventas_id`)
    REFERENCES `imporcomgua`.`ventas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;



-- cleintes
INSERT INTO `imporcomgua`.`clientes` (codigo_cliente, nombre_negocio, nombre_contacto, departamento, municipio, direccion, nit, encargado_bodega, telefono, tipo_venta, observaciones)
VALUES 
('C001', 'Supermercado A', 'Juan Pérez', 'GT', 'Guatemala', 'Av. Reforma 12-34', '123456789', 'María López', '5551234', 'Credito', 'Cliente frecuente'),
('C002', 'Ferretería B', 'Ana Gómez', 'VC', 'Escuintla', 'Calle 5 # 20', '987654321', 'Carlos Ramos', '5555678', 'Contado', 'Pago en efectivo');

-- Productos

/* INSERT INTO `imporcomgua`.`productos` (codigo, nombre, unidad_medida, precio_unidad, unidades_por_fardo)
VALUES
('P001', 'Cemento', 'Fardo', 50.00, 20),
('P002', 'Grava', 'Unidad', 30.00, 1),
('P003', 'Cal', 'Paquete', 15.00, 10);

 */
-- Duca

INSERT INTO `imporcomgua`.`duca` (numero_duca, fecha, numero_contenedor)
VALUES
('DUCA001', '2025-06-19', 'C00123'),
('DUCA002', '2025-06-20', 'C00124');


-- vendedores 

INSERT INTO `imporcomgua`.`Vendedores` (apellido, nombre, telefono, direccion, Comision)
VALUES
('López', 'Carlos', '5559999', 'Zona 10', 'Comisión por ventas'),
('Martínez', 'Juan', '5558888', 'Zona 2', 'Comisión por ventas');
