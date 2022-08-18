const formElement= document.getElementById("guardarTransaccion");

formElement.addEventListener("submit",(event)=>{
    event.preventDefault();
    let transaccionCod = document.getElementById("transaccionCod").value;
    let transaccionNombre = document.getElementById("transaccionNombre").value;
    let transaccionDireccion = document.getElementById("transaccionDireccion").value;
    let transaccionLocalidad = document.getElementById("transaccionLocalidad").value;
    let transaccion={transaccionCod:transaccionCod,transaccionNombre:transaccionNombre,transaccionDireccion:transaccionDireccion,transaccionLocalidad:transaccionLocalidad};
    let transaccionJson= JSON.stringify(transaccion);
    console.log(transaccionJson);
    
    fetch('https://localhost:3000/nuevaPersona', {
        method:'Post',
        body: transaccionJson
       
    })
    
})

/*fetch('http://localhost:3000/mostrarPers',{
    method:'Get'
})//.then(x=>x.json()).then(console.log)*/
