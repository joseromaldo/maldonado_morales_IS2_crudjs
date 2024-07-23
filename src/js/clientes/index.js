const btnGuardar = document.getElementById('btnGuardar')
const btnModificar = document.getElementById('btnModificar')
const btnBuscar = document.getElementById('btnBuscar')
const btnCancelar = document.getElementById('btnCancelar')
const btnLimpiar = document.getElementById('btnLimpiar')
const tablaClientes = document.getElementById('tablaClientes')
const formulario = document.querySelector('form')

btnModificar.parentElement.style.display = 'none'
btnCancelar.parentElement.style.display = 'none'

const getClientes = async () => {
    const nombre = formulario.cliente_nombre.value.trim();
    const apellido = formulario.cliente_apellido.value.trim();
  
    const url = `/maldonado_morales_IS2_crudjs/controllers/cliente/index.php?cliente_nombre=${nombre}&cliente_apellido=${apellido}`;
  
    const config = {
        method: 'GET'
    }

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log(data);

        tablaClientes.tBodies[0].innerHTML = '';
        const fragment = document.createDocumentFragment();
        let contador = 1;

        if (respuesta.status == 200) {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "success",
                title: 'Clientes encontrados',
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire();

        if (data.length > 0) {
            data.forEach(cliente => {
                const tr = document.createElement('tr');
                const celda1 = document.createElement('td');
                const celda2 = document.createElement('td');
                const celda3 = document.createElement('td');
                const celda4 = document.createElement('td');
                const celda5 = document.createElement('td');
                const buttonModificar = document.createElement('button');
                const buttonEliminar = document.createElement('button');

                celda1.innerText = contador;
                celda2.innerText = cliente.CLIENTE_NOMBRE;
                celda3.innerText = cliente.CLIENTE_APELLIDO;

                buttonModificar.textContent = 'Modificar';
                buttonModificar.classList.add('btn', 'btn-warning', 'w-100');
                buttonModificar.addEventListener('click', () => llenardatos(cliente) )

                buttonEliminar.textContent = 'Eliminar';
                buttonEliminar.classList.add('btn', 'btn-danger', 'w-100');

                buttonCancelar.addEventListener('click', () => cancelar(cliente) )

                celda4.appendChild(buttonModificar);
                celda5.appendChild(buttonEliminar);

                tr.appendChild(celda1);
                tr.appendChild(celda2);
                tr.appendChild(celda3);
                tr.appendChild(celda4);
                tr.appendChild(celda5);
                fragment.appendChild(tr);

                contador++;
            });
        } else {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.innerText = 'No hay clientes disponibles';
            td.colSpan = 5;

            tr.appendChild(td);
            fragment.appendChild(tr);
        }
    }else{
        console.log('error al cargar clientes');
    }

        tablaClientes.tBodies[0].appendChild(fragment);
    } catch (error) {
        console.log(error);
    }
}

getClientes();


const guardarCliente = async (e) => {
    e.preventDefault();
    btnGuardar.disabled = true;

    const url = '/maldonado_morales_IS2_crudjs/controllers/cliente/index.php'
    const formData = new FormData(formulario)
   
    formData.append('tipo', 1)
    formData.delete('cliente_id')
  
    const config = {
        method: 'POST',
        body: formData
    }
   

    try {
        console.log('Enviando datos:', ...formData.entries());
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log('Respuesta recibida:', data);
        const { mensaje, codigo, detalle } = data
        if (respuesta.ok && codigo === 1) {
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "success",
            title: mensaje,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();
        getClientes();
        formulario.reset();
    }else{
        console.log('Error:', detalle);
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "error",
            title: 'Error al guardar',
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();
    }

    } catch (error) {
        console.log('Error de conexión:', error);
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "error",
            title: 'Error de conexión',
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();
    }
    btnGuardar.disabled = false;
}

const llenardatos = (cliente) => {
    formulario.cliente_nombre.value = cliente.cliente_nombre
    formulario.cliente_apellido.value = cliente.cliente_apellido

    btnBuscar.parentElement.style.display = 'none'
    btnCancelar.parentElement.style.display = ''
    btnGuardar.parentElement.style.display = 'none'
    btnModificar.parentElement.style.display = ''
}

const modificar = async (e) => {
    e.preventDefault();
    btnModificar.disabled = true;

    const url = '/maldonado_morales_IS2_crudjs/controllers/cliente/index.php'
    const formData = new FormData(formulario)
   
    formData.append('tipo', 2)
  
    const config = {
        method: 'POST',
        body: formData
    }
   

    try {
        console.log('Enviando datos:', ...formData.entries());
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        const { mensaje, codigo, detalle } = data
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "success",
            title: mensaje,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();
     
        if (codigo == 1 && respuesta.status == 200) {
            
            formulario.reset();
            getClientes();
            btnBuscar.parentElement.style.display = ''
            btnCancelar.parentElement.style.display = ''
            btnGuardar.parentElement.style.display = ''
            btnModificar.parentElement.style.display = ''
          
        } else {
            console.log(detalle);
        }

    } catch (error) {
        console.log(error);
    }
    btnGuardar.disabled = false;
}

const cancelar = async (e) => {
    e.preventDefault();
    btnCancelar.disabled = true;

    // Resetear el formulario
    formulario.reset();
    
    // Ocultar o mostrar botones según sea necesario
    btnBuscar.parentElement.style.display = '';
    btnCancelar.parentElement.style.display = '';
    btnGuardar.parentElement.style.display = '';
    btnModificar.parentElement.style.display = '';

    // Rehabilitar el botón de guardar si está deshabilitado
    btnGuardar.disabled = false;

    // Mostrar un mensaje de cancelación exitosa
    Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "info",
        title: 'Modificación cancelada',
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    }).fire();
}

formulario.addEventListener('submit', guardarCliente)
btnBuscar.addEventListener('click', getClientes)
btnModificar.addEventListener('click', modificar)
btnCancelar.addEventListener('click', cancelar)