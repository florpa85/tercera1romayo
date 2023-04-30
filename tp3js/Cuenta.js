
class Item {
    /** 
     * 
     * @param {String} titular Nombre del titular de la cuenta
     * @param {String} codigo tiene numeros pero funciona como string porque es un codigo
     * @param {Number} saldo Saldo deudor
     * @param {String} zona Zona de venta
     * @param {Number} cantidad Cantidad de dinero pagado
     * */

    constructor(titular,codigo,saldo,zona) {
        this.titular = titular.toLowerCase(); 
        this.codigo = codigo;
        this.saldo = saldo;
        this.zona = zona;
    }

 
    depositarDinero(cantidad) {
        if (cantidad && cantidad > 0) { 
            this.saldo -= cantidad; 
            return true;
        } else return false;
    }

    /**
     * Funcion que permite obtener el saldo de la cuenta
     */
    consultar() {
        return this.saldo;
    }
}
