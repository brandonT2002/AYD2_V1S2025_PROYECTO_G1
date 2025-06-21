
-- cleintes
INSERT INTO `imporcomgua`.`clientes` (codigo_cliente, nombre_negocio, nombre_contacto, departamento, municipio, direccion, nit, encargado_bodega, telefono, tipo_venta, observaciones)
VALUES 
('C001', 'Supermercado A', 'Juan Pérez', 'GT', 'Guatemala', 'Av. Reforma 12-34', '123456789', 'María López', '5551234', 'Credito', 'Cliente frecuente'),
('C002', 'Ferretería B', 'Ana Gómez', 'VC', 'Escuintla', 'Calle 5 # 20', '987654321', 'Carlos Ramos', '5555678', 'Contado', 'Pago en efectivo');

-- Productos

INSERT INTO `imporcomgua`.`productos` (codigo, nombre, unidad_medida, precio_unidad, unidades_por_fardo)
VALUES
('P1', 'Cemento', 'Fardo', 50.00, 20),
('P2', 'Grava', 'Unidad', 30.00, 1),
('P3', 'Cal', 'Paquete', 15.00, 10);


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
