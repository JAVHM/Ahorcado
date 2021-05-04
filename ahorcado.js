var frases = [
    "AL QUE MADRUGA DIOS LE AYUDA",
    "A CABALLO REGALADO NO SE LE MIRA DIENTE",
    "UNA GOLONDRINA NO HACE UN VERANO"
]

var posAleatoria;
var fraseOculta;

const OcultarFrase = (frase) =>
{
    fraseOculta = "";
    for(let i = 0; i< frase.length;i++)
    {
        const c = frase[i];
        if(c != " ") fraseOculta += "_";
        else fraseOculta += " ";
    }
    return fraseOculta;
}
const iniciarJuego = () => {
    posAleatoria = Math.floor(Math.random() * 3);
    const frase = frases[posAleatoria];
    fraseOculta = OcultarFrase(frase);

    const divFrase = document.querySelector("#frase"); //getElementById
    divFrase.innerText = fraseOculta; //o innerHTML o innerText 
    //console.log[divFrase]   es como Debug.Log();

    cont = 0;
}

const buscarLetraEnFrase = (frase, letra) =>{
    // buscar letra en frase y si la encontramos, la mostramos en la frase oculta
    let encontrado = false;

    for(let c of frase)
    {
        if(c == letra){
            encontrado = true;
            break;
        }
    }
    return encontrado;
}

const mostrarLetrasEnFrase = (frase, fraseOculta, letra) =>{
    let nuevaFraseOculta = "";

    for(let i=0; i < frase.length; i++){
        const c = frase[i];
        if(c == letra){
            fraseOculta[i] += c;
            nuevaFraseOculta += c;
        }else{
            nuevaFraseOculta += fraseOculta[i];
        }
    }
    return nuevaFraseOculta;
}

const cambiarImagen = (contador) =>{
    const img = document.querySelector("#imagen");
    img.setAttribute("src", `imagenes/hagman_${contador}.gif`)
}

const crearMensajePerdida = () =>{
    const div = document.createElement("div");
    div.setAttribute("class", "alert alert-danger");
    div.innerText = "Perdiste el juego :c";

    return div;
}

const crearMensajeGanador = () =>{
    const div = document.createElement("div");
    div.setAttribute("class", "alert alert-danger");
    div.innerText = "Ganaste!";

    return div;
}

const analizarInput = (event) => {
    const letra = event.key.toUpperCase();
    console.log(posAleatoria);
    console.log(frases);
    console.log(frases[posAleatoria]);
    const encontrado = buscarLetraEnFrase(frases[posAleatoria], letra);
    if(!encontrado){
        cont++;
        if(cont <= 6){
            cambiarImagen(cont);
        }
        if(cont == 6){
            //perdimos
            const divMensaje = crearMensajePerdida();
            const divZonaJuego =document.querySelector("#zona_juego")
            divZonaJuego.appendChild(divMensaje); 
        }
    }else{
        fraseOculta = mostrarLetrasEnFrase(frases[posAleatoria], fraseOculta, letra);
        const divFrase = document.querySelector("#frase");
        divFrase.innerText = fraseOculta;
        if(fraseOculta == frases[posAleatoria] && !ganador){
            const divMensaje = crearMensajeGanador();
            const divZonaJuego = document.querySelector("#zona_juego");
            divZonaJuego.appendChild(divMensaje);
            ganador = true
        }
    }
}

const configurarInput = () =>{
    const inputEntrada = document.querySelector("#entrada_text");
    inputEntrada.addEventListener("keydown", analizarInput);
}

const main = () => {
    iniciarJuego();
    configurarInput();
}
window.addEventListener("load",main);