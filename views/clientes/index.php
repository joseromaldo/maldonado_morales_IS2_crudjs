<?php include_once '../../includes/header.php' ?>
<div class="container">
    <h1 class="text-center">Formulario de productos</h1>
    <div class="row justify-content-center mb-3">
        <form class="col-lg-8 border bg-light p-3">
            <input type="hidden" name="cliente_id" id="cliente_id">
            <div class="row mb-3">
                <div class="col">
                    <label for="cliente_nombre">Nombre del cliente</label>
                    <input type="text" name="cliente_nombre" id="cliente_nombre" class="form-control" required>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <label for="cliente_apellido">Apellido del cliente</label>
                    <input type="number" name="cliente_apellido" id="cliente_apellido" class="form-control" required>
                </div>
            </div>
            <div class="row justify-content-center mb-3">
                <div class="col">
                    <button type="submit" id="btnGuardar" class="btn btn-primary w-100">Guardar</button>
                </div>
                <div class="col">
                    <button type="button" id="btnBuscar" class="btn btn-info w-100">Buscar</button>
                </div>
                <div class="col">
                    <button type="button" id="btnModificar" class="btn btn-warning w-100">Modificar</button>
                </div>
                <div class="col">
                    <button type="button" id="btnCancelar" class="btn btn-secondary w-100">Cancelar</button>
                </div>
                <div class="col">
                    <button type="reset" id="btnLimpiar" class="btn btn-secondary w-100">Limpiar</button>
                </div>
            </div>
        </form>
    </div>
    <div class="row justify-content-center">
        <div class="col-lg-8 table-responsive">
            <h2 class="text-center">Listado de productos</h2>
            <table class="table table-bordered table-hover" id="tablaProductos">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="5">No hay productos disponibles</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<script defer src="/maldonado_morales_IS2_crudjs/src/js/funciones.js"></script>
<script defer src="/maldonado_morales_IS2_crudjs/src/js/clientes/index.js"></script>
<?php include_once '../../includes/footer.php' ?>