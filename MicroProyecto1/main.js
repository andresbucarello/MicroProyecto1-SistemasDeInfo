// ########## Variables ##########
let imagenesDestapadas = 0;
let imagen1 = null;
let imagen2 = null;
let primerResultado = null;
let segundoResultado = null;
let puntajeMaximo = 800;
let encontradas = 0;
let temporizador = false;
let tiempoInicial=180;
let tiempo=180;
let tiempoRegresivoId = null;
const inicio = document.querySelector('.play');
const reseat = document.querySelector('.reset');
const allImages = document.querySelectorAll('.image') 

// ########## Eventos ##########
document.addEventListener('DOMContentLoaded',() => {
    cargarWeb();
})

inicio.addEventListener('click', ()=>{
    habilitar();
})

reseat.addEventListener('click', _ => {
    location.reload();
})

// ########## Posiciones aleatorias ##########
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(() => {return Math.random()-0.5});

// ########## Funciones ##########
function contarTiempo() {
    tiempoRegresivoId = setInterval(()=>{
        tiempo--;
        contadorRegresivo.innerHTML = tiempo;
        if (tiempo==0){
            clearInterval(tiempoRegresivoId);
            reseat.classList.add('desbloqueo');
        };
    },1000);
}

function bloquear(id){
    for (let index = 0; index < 16; index++) {
        let imagen = document.getElementById(index);
        imagen.innerHTML = `<img src="./imagenes/imagen${numeros[index]}.jpeg" alt="">`;
        imagen.disabled = true;
    }
}

function revelar(id){
    
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    imagenesDestapadas++;

    if (imagenesDestapadas == 1){
        imagen1 = document.getElementById(id);
        primerResultado = numeros[id];
        imagen1.innerHTML = `<img src="./imagenes/imagen${primerResultado}.jpeg" alt="">`;
        imagen1.disabled = true;
    }
    
    else if(imagenesDestapadas == 2){
        imagen2 = document.getElementById(id);
        segundoResultado = numeros[id];
        imagen2.innerHTML = `<img src="./imagenes/imagen${segundoResultado}.jpeg" alt="">`;
        imagen2.disabled = true;

        if (primerResultado==segundoResultado){
            imagenesDestapadas=0;
            encontradas++;
    
            if (encontradas == 8 ){
                clearInterval(tiempoRegresivoId)
                contadorRegresivo.innerHTML = `ENHORABUENA! Tardaste ${tiempoInicial - tiempo} s. FELICIDADES!`;
                puntaje.innerHTML = `Tu puntacion total fue: ${puntajeMaximo*(tiempo/tiempoInicial)} pts !!`;
                reseat.classList.add('desbloqueo');
            }
        }else{
            setTimeout(()=>{
                imagen1.innerHTML = ' ';
                imagen1.disabled = false;
                imagen2.innerHTML = ' ';
                imagen2.disabled = false;
                imagenesDestapadas=0;
            },1000);
        }
    } 
}

function habilitar(){
    inicio.classList.add('bloqueo');
    reseat.classList.add('bloqueo');
    for (let index = 0; index < 16; index++) {
        allImages[index].disabled = false
    }
}

function cargarWeb(){
    for (let index = 0; index < 16; index++) {
        allImages[index].disabled = true;
    }
    inicio.disabled=false;
}