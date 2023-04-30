

///informacion de las cuentas
const LIMITE_CUENTA = 100000; 
let cuentas = []; 
let cuenta = undefined;

///////////////////////TRABAJANDO CON EL REGISTRO DE UNA CUENTA
/////Obtenemos los elementos del formulario 1 - Registro

///inputs
const titular = document.getElementById('titular');
const codigo = document.getElementById('codigo');
const saldo = document.getElementById('saldo');
const zona = document.getElementById('zona');
///boton
const registrar = document.getElementById('registrar');

///formulario
const formRegistrar = document.getElementById('form-registro');



////event listener del boton registrar

registrar.addEventListener('click', (evento) => {
    evento.preventDefault(); ///prevenimos el evento por defecto (recarga de la pagina)
    cuentas.push(new Item(titular.value, codigo.value, +saldo.value, zona.value, LIMITE_CUENTA)); ///parseamos los valores numericos porque siempre un input nos trae un string
    alert('cuenta generada con exito!');
    localStorage.setItem('cuentas',JSON.stringify(cuentas)); ///guardo las cuentas en el localstorage
    console.log(cuentas);
    limpiarForm(formRegistrar);
})


///function que limpia un formulario
 function limpiarForm(form) {
    form.reset(); ///se resetea el formulario - se limpian los campos (su valor sera '');
} 

///nos limpia todos los formularios
function limpiarForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
        form.reset(); ///reseteo el formulario
    })
}

///////////////////////////TRABAJANDO CON LA INFORMACION DE LAS CUENTAS

///function que obtiene las cuentas cargadas en el localStorage
///el localstorage almacenara el objeto pero no sus metodos, por lo tanto
///cuando obtengo cada elemento del localstorage, lo mapeo a un objeto de tipo Cuenta con sus metodos incorporados
function obtenerCuentas() {
    cuentas = JSON.parse(localStorage.getItem('cuentas')) || []; // si la clave no existe devuelve undefined, entonces le guardamos un []
    cuentas = cuentas.map((cuenta) => new Item(cuenta.titular,cuenta.codigo,cuenta.saldo,cuenta.zona,LIMITE_CUENTA));
 }

///event listener que escucha cuando se carga la pagina
document.addEventListener('DOMContentLoaded', () => {
    obtenerCuentas();
})



////////////CONSULTAR UNA CUENTA

///obtenemos los elementos 
const inputTitular = document.getElementById('titular-consulta');
const botonConsulta = document.getElementById('consultar');


///event listener para el boton consultar
botonConsulta.addEventListener('click', (evento) => {
    evento.preventDefault();
    const nombreTitular = inputTitular.value; ///obtenemos el valor del input
    const cuentaEncontrada = buscarCuenta(nombreTitular);
    if (cuentaEncontrada) {
        ///utilizo los inputs del formulario de registro para rellenarlos con los valores del objeto
        titular.value = cuentaEncontrada.titular;
        codigo.value = cuentaEncontrada.codigo;
        saldo.value = cuentaEncontrada.saldo;
        zona.value = cuentaEncontrada.zona;
    } else {
        alert('No existe el cliente');
        limpiarForms();
    }
});


///function para buscar la cuenta en el array
function buscarCuenta(nombreTitular) {
   return cuentas.find((cuenta) => cuenta.titular === nombreTitular.toLowerCase()); /// si no existe devuelve undefined
}


///depositar o retirar dinero
///ingresamos el nombre de usuario , lo busca
///si esta le depositara o retirara dinero segun lo que se apreto

///obtener elementos
const inputMonto = document.getElementById('agregarPago');
const btnDepositar = document.getElementById('depositar');


///depositar dinero
///escuchar el boton depositar
btnDepositar.addEventListener('click', (evento) => {
    evento.preventDefault();
    cuenta = buscarCuenta(inputTitular.value);
    if (cuenta) {
        const resultado = cuenta.depositarDinero(+inputMonto.value);
        if (resultado) {
            alert('Operacion realizada con exito!');
        }else {
            alert('Operacion denegada');
        }
    }
});

////retirar dinero