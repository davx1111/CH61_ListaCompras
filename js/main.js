const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const btnClear = document.getElementById("btnClear");


let cont = 0;
let totalEnProductos = 0;
let costoTotal = 0;
let datos = new Array(); // [];




function validarCantidad(cantidad) {
    if (cantidad.length == 0) {
        return false;
    } // length==0
    if (isNaN(cantidad)) {
        return false;
    }//isNan
    if (Number(cantidad) <= 0) {
    } //<=0
    return true;
}// ValidarCantidad

function getPrecio(){
    return Math.round(Math.random()*10000)/100;
}//getPrecio

btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    let isValid = true;
    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML += "";
    alertValidaciones.style.display = "none";

    if (txtName.value.length < 3) {
        txtName.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML +=
            "<strong>El nombre del producto no es correcto></strong><br/>";

        alertValidaciones.style.display = "block";
        isValid = false;
    } //name < 3

    if (!validarCantidad(txtNumber.value)) {
        txtNumber.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML += "<strong>La cantidad no es correcta</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;

    } //!ValidadCantidad

    if(isValid){
        let precio = getPrecio();
        cont++;
        let row = `<tr>
                        <td>${cont}</td>
                        <td>${txtName.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>`;

        let elemento  = {
            "cont" : cont,
            "nombre" : txtName.value,
            "cantidad" : Number(txtNumber.value),
            "precio" : precio

        };
        datos.push(elemento);
        localStorage.setItem("datos", JSON.stringify (datos));
        totalEnProductos += Number(txtNumber.value);
        costoTotal += precio * Number(txtNumber.value);

        cuerpoTabla.insertAdjacentHTML("beforeend", row)
        contadorProductos.innerText = cont;
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = new Intl.NumberFormat("es-MX", 
                    { style: "currency", currency: "MXN" }).format(costoTotal);

        
        let resumen = {
            "cont" : cont,
            "totalenProductos" : totalEnProductos,
            "costoTotal" : costoTotal
        };

        localStorage.setItem("resumen", JSON.stringify (resumen));
        
        txtName.value="";
        txtNumber.value="";
        txtName.focus();
    }//isValid
}); //btnAgregar click

// Crear un evento de limpiar todo

btnClear.addEventListener("click", function(event){
    event.preventDefault();

    // Limpieza de campos
    txtName.value = "";
    txtNumber.value = "";

    // Limpiar Alertas
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    //Limpiar bordes de los campos
    txtName.style.border = "";
    txtNumber.style.border = "";

    //Limpiar la tabla de productos
    cuerpoTabla.innerHTML = "";

    //Limpiar tabla de resumen
    contadorProductos.innerText = 0;
    productosTotal.innerText = "0";
    precioTotal.innerText = "$0.00";

    // Limpieza localStorage
    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");

    //Enfoque en el primer campo
    txtName.focus();
});

window.addEventListener("load", function (event){
    event.preventDefault();
    if(this.localStorage.getItem("datos") != null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach( (e) =>{
            let row = `<tr>
                <td>${e.cont}</td>
                <td>${e.nombre}</td>
                <td>${e.cantidad}</td>
                <td>${e.precio}</td>
            </tr>`;
            cuerpoTabla.insertAdjacentHTML("beforeend", row);
        });

    }//datos != null
    



    if(this.localStorage.getItem("resumen") != null){
    let resumen = JSON.parse (this.localStorage.getItem("resumen"));
    cont = resumen.cont
    totalEnProductos = resumen.totalEnProductos;
    costoTotal = resumen.costoTotal;
    }; //!=null
        contadorProductos.innerText = cont;
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = new Intl.NumberFormat("es-MX", 
                    { style: "currency", currency: "MXN" }).format(costoTotal);
}); //window load

