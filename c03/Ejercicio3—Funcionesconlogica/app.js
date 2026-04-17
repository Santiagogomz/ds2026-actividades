
function calcularPrecioFinal(montoAPagar,medioDePago)
{
    if(montoAPagar < 200)
    {

    

    }
    else if ( montoAPagar >= 200 && montoAPagar <= 400)
    {

        switch (medioDePago)
        {

            case "E":

                montoAPagar = montoAPagar * 0.70;

                break;

            case "D":

                montoAPagar = montoAPagar * 0.80;

                break;

            case "C": 

                montoAPagar = montoAPagar * 0.90;

                break;

           default:
            
                console.log("Medio de Pago inválido");
        }

    }
    else
    {
        

        montoAPagar = montoAPagar * 0.60;




    }
    
    return montoAPagar;


}



// PRUEBAS

let monto;
let medio;
let resultado;

// prueba 1
monto = 150;
medio = "E";
resultado = calcularPrecioFinal(monto, medio);
console.log(`Monto: $${monto} | Pago: ${medio} | Final: $${resultado}`);

// prueba 2
monto = 250;
medio = "D";
resultado = calcularPrecioFinal(monto, medio);
console.log(`Monto: $${monto} | Pago: ${medio} | Final: $${resultado}`);

// prueba 3
monto = 300;
medio = "C";
resultado = calcularPrecioFinal(monto, medio);
console.log(`Monto: $${monto} | Pago: ${medio} | Final: $${resultado}`);

// prueba 4
monto = 450;
medio = "E";
resultado = calcularPrecioFinal(monto, medio);
console.log(`Monto: $${monto} | Pago: ${medio} | Final: $${resultado}`);

// prueba 5
monto = 500;
medio = "D";
resultado = calcularPrecioFinal(monto, medio);
console.log(`Monto: $${monto} | Pago: ${medio} | Final: $${resultado}`);



