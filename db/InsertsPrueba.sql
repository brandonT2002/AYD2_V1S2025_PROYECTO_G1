
INSERT INTO roles (nombre) VALUES
  ('Administrador'),('Bodeguero'),('Vendedor'),('Cobranza'),('Cliente');

  
/* Insert para tabla usuarios */
INSERT INTO usuarios (username, password_sha256, nombre, rol_id) VALUES
  ('admin01', '5f4dcc3b5aa765d61d8327deb882cf99', 'Juan Pérez', 1),
  ('bodega01', '6cb75f182f9f4f39d2c3b3e56c90c0f0', 'Carlos López', 2),
  ('vendedor01', '25f9e794323b453885f5181f1b624d0b', 'María González', 3),
  ('cobranza01', 'c4ca4238a0b923820dcc509a6f75849b', 'Luis García', 4),
  ('cliente01', 'e99a18c428cb38d5f260853678922e03', 'Pedro Sánchez', 5);

/* Insert para tabla clientes */
INSERT INTO clientes (codigo_cliente, nombre_negocio, nombre_contacto, departamento, municipio, direccion, nit, encargado_bodega, telefono, tipo_venta, observaciones) VALUES
  ('AL01', 'Panadería La Esperanza', 'José Martínez', 'GT', 'Antigua', 'Calle 5ta. 10-20', '12345678', 'Juan Pérez', '55123456', 'Contado', 'Cliente habitual'),
  ('GT15', 'Ferretería El Sol', 'Ana Rodríguez', 'GT', 'Mixco', '2da. Avenida 15-30', '98765432', 'Carlos López', '55223344', 'Credito', 'Buen historial de pagos'),
  ('GT22', 'Supermercado El Valle', 'Luis Ramírez', 'GT', 'Zona 10', 'Avenida Las Palmas 8-12', '87654321', 'Miguel García', '55334455', 'Ambas', 'Solicitar nuevo crédito'),
  ('GT33', 'Tecnología Global', 'Marta Díaz', 'GT', 'San Salvador', 'Calle Nueva 30-40', '65432100', 'José García', '55445566', 'Credito', 'Requiere seguimiento de pago'),
  ('GT44', 'Electrodomésticos Rápidos', 'Felipe Gómez', 'GT', 'Quetzaltenango', 'Calle 3ra. 12-34', '12340987', 'Carlos López', '55778899', 'Contado', 'Pedido urgente');

/* Insert para tabla productos */
INSERT INTO productos (codigo, nombre, unidad_medida, unidades_por_fardo, precio_fardo, disponible) VALUES
  ('P001', 'Arroz 25kg', 'Fardo', 25, 150.00, 1),
  ('P002', 'Harina 10kg', 'Fardo', 10, 80.00, 1),
  ('P003', 'Aceite 5L', 'Unidad', 1, 40.00, 1),
  ('P004', 'Leche 1L', 'Unidad', 1, 12.00, 1),
  ('P005', 'Azúcar 25kg', 'Fardo', 25, 120.00, 1);

/* Insert para tabla vendedores */
INSERT INTO vendedores (codigo, nombres, apellidos, telefono, direccion, porcentaje_comision, estado) VALUES
  ('V001', 'Carlos', 'Méndez', '56123456', 'Calle del Comercio 10-20', 10.00, 'Activo'),
  ('V002', 'Ana', 'Martínez', '56223344', 'Avenida Central 15-25', 12.00, 'Activo'),
  ('V003', 'Luis', 'Rodríguez', '56334455', 'Zona 4, Calle 12', 8.00, 'Inactivo'),
  ('V004', 'Pedro', 'Gómez', '56445566', 'Colonia Las Flores 25-30', 15.00, 'Activo'),
  ('V005', 'Marta', 'Pérez', '56556677', 'Calle Real 18-20', 9.50, 'Activo');


/* Insert para tabla ventas */
INSERT INTO ventas (fecha_venta, fecha_salida_bodega, cliente_id, numero_envio, tipo_pago, dias_credito, vendedor_id, estado_cobro, estado_venta, dte_numero, dte_nombre, dte_nit, total_quetzales) VALUES
  ('2025-06-01', '2025-06-02', 1, 'ENV001', 'Credito', 30, 1, 'Pendiente', 'Vigente', 'DTE001', 'Supermercado La Esperanza', '12345678', 500.00),
  ('2025-06-02', '2025-06-03', 2, 'ENV002', 'Contado', 0, 2, 'Pagado', 'Vigente', 'DTE002', 'Ferretería El Sol', '98765432', 250.00),
  ('2025-06-03', '2025-06-04', 3, 'ENV003', 'Credito', 45, 3, 'Parcial', 'Vigente', 'DTE003', 'Supermercado El Valle', '87654321', 350.00),
  ('2025-06-04', '2025-06-05', 4, 'ENV004', 'Credito', 60, 4, 'Pendiente', 'Vigente', 'DTE004', 'Tecnología Global', '65432100', 800.00),
  ('2025-06-05', '2025-06-06', 5, 'ENV005', 'Contado', 0, 5, 'Pagado', 'Vigente', 'DTE005', 'Electrodomésticos Rápidos', '12340987', 1000.00);

/* Insert para tabla venta_detalle */
INSERT INTO venta_detalle (venta_id, producto_id, cantidad_fardos, cantidad_unidades, precio_fardo, total) VALUES
  (1, 1, 2, 50, 150.00, 300.00),
  (2, 2, 1, 10, 80.00, 80.00),
  (3, 3, 3, 3, 40.00, 120.00),
  (4, 4, 4, 40, 12.00, 480.00),
  (5, 5, 2, 50, 120.00, 240.00);

/* Insert para tabla inventario */
INSERT INTO inventario (producto_id, stock_unidades) VALUES
  (1, 500),
  (2, 300),
  (3, 150),
  (4, 600),
  (5, 400);

/* Insert para tabla duca */
INSERT INTO duca (numero_duca, fecha, numero_contenedor, numero_duca_rectificada, fecha_duca_rectificada) VALUES
  ('DUCA001', '2025-05-01', 'C001', NULL, NULL),
  ('DUCA002', '2025-05-02', 'C002', NULL, NULL),
  ('DUCA003', '2025-05-03', 'C003', 'DUCA002', '2025-05-04'),
  ('DUCA004', '2025-05-04', 'C004', NULL, NULL),
  ('DUCA005', '2025-05-05', 'C005', NULL, NULL);

/* Insert para tabla inventario_movimientos */
INSERT INTO inventario_movimientos (tipo, producto_id, cantidad_fardos, unidades_por_fardo, unidades_totales, fecha, responsable_id, venta_id, duca_id, comentario) VALUES
  ('Ingreso', 1, 2, 25, 50, '2025-06-01', 1, NULL, 1, 'Ingreso de nuevo producto'),
  ('Despacho', 2, 1, 10, 10, '2025-06-02', 2, 1, NULL, 'Despacho a cliente'),
  ('Recepcion', 3, 3, 5, 15, '2025-06-03', 3, NULL, 2, 'Recepcion de mercancía de proveedor'),
  ('Salida', 4, 4, 1, 4, '2025-06-04', 4, NULL, 3, 'Salida de producto a cliente'),
  ('Ingreso', 5, 2, 25, 50, '2025-06-05', 5, NULL, 4, 'Ingreso de producto para venta');

/* Insert para tabla pagos */
INSERT INTO pagos (venta_id, fecha_pago, banco, numero_cuenta, numero_transaccion, recibo_caja, monto_abono) VALUES
  (1, '2025-06-02', 'Industrial', '123456', 'TRX001', 'RC001', 300.00),
  (2, '2025-06-03', 'Banrural', '654321', 'TRX002', 'RC002', 80.00),
  (3, '2025-06-04', 'G&T', '789012', 'TRX003', 'RC003', 100.00),
  (4, '2025-06-05', 'BAM', '345678', 'TRX004', 'RC004', 400.00),
  (5, '2025-06-06', 'Industrial', '987654', 'TRX005', 'RC005', 1000.00);

/* Insert para tabla comisiones */
INSERT INTO comisiones (venta_id, vendedor_id, porcentaje, monto, fecha_liquidacion) VALUES
  (1, 1, 10.00, 30.00, '2025-06-02'),
  (2, 2, 12.00, 9.60, '2025-06-03'),
  (3, 3, 8.00, 9.60, '2025-06-04'),
  (4, 4, 15.00, 60.00, '2025-06-05'),
  (5, 5, 9.50, 95.00, '2025-06-06');
