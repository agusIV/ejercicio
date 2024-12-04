const contenedor = document.getElementById("contenedor")
const bienvenida = document.getElementById('bienvenida');
const elegir = document.getElementById("elegir")
const rutinaA = document.getElementById("rutinaA")
const rutinaB = document.getElementById("rutinaB")

function mostrarRutina(R){
    console.log("mostrarRutina");

    setTimeout(() => {
        bienvenida.classList.add("ocultar")
        elegir.classList.add("ocultar")
        rutinaA.classList.add("ocultar")
        rutinaB.classList.add("ocultar")
        setTimeout(() => {
            bienvenida.remove();
            elegir.remove();
            rutinaA.remove()
            rutinaB.remove()
            aparecer(R)
            iniciarRutina()
        }, 500)
    }, 100)
}
/*---------------------------------------------------*/
const cronometro = document.createElement("div")
cronometro.textContent = "00:00:00";
let segundos = 0;
let minutos = 0;
let horas = 0;
let intervaloCrono;

const preparados = document.createElement("div")
preparados.textContent = "preparados..."

const ejercicio = document.createElement("img")
const ejercicios = [
    [["ejercicios/a-1-1.gif", "ejercicios/a-1-2.gif", "ejercicios/a-1-3.gif"], 
    ["ejercicios/a-2-1.gif", "ejercicios/a-2-2.gif", "ejercicios/a-2-3.gif"], 
    ["ejercicios/a-3-1.gif", "ejercicios/a-3-2.gif", "ejercicios/a-3-3.gif"], 
    ["ejercicios/a-4-1.gif", "ejercicios/a-4-2.gif", "ejercicios/a-4-3.gif"], 
    ["ejercicios/a-5-1.gif", "ejercicios/a-5-2.gif", "ejercicios/a-5-3.gif"], 
    ["ejercicios/a-6.gif"]],
    [["ejercicios/b-1-1.gif", "ejercicios/b-1-2.gif", "ejercicios/b-1-3.gif"], 
    ["ejercicios/b-2-1.gif", "ejercicios/b-2-2.gif", "ejercicios/b-2-3.gif"], 
    ["ejercicios/b-3-1.gif", "ejercicios/b-3-2.gif", "ejercicios/b-3-3.gif"], 
    ["ejercicios/b-4-1.gif", "ejercicios/b-4-2.gif", "ejercicios/b-4-3.gif"], 
    ["ejercicios/b-5-1.gif", "ejercicios/b-5-2.gif", "ejercicios/b-5-3.gif"], 
    ["ejercicios/b-6.gif"]]
];   
let rutina;
let set = 0;   
let ejercicioActual = 0

const pausa = document.createElement("img")
pausa.src = "pausa.png"
const play = document.createElement("img")
play.src = "play.png"

function aparecer(R){ 
    console.log("aparecer");
    
    cronometro.classList.add("aparecer")
    cronometro.classList.add("cronometro");
    contenedor.appendChild(cronometro);

    preparados.classList.add("aparecer")
    preparados.classList.add("preparados")
    contenedor.appendChild(preparados)
    
    ejercicio.classList.add("aparecer")
    ejercicio.classList.add("ejercicio")
    contenedor.appendChild(ejercicio)
    rutina = R
    ejercicio.src = ejercicios[rutina][set][ejercicioActual]  

    pausa.classList.add("aparecer")
    pausa.classList.add("boton")
    contenedor.appendChild(pausa)
}

function iniciarRutina (){
    console.log("iniciarRutina");

    if(!intervaloCrono){        
        intervaloCrono = setInterval(actualizar, 1000)
    }
}

function actualizar() {
    actualizarCrono()
    acctualizarDescanso()
    actualizarSonido()
}

function formatoTiempo(numero){
    //console.log("formatoTiempo");
    
    return numero < 10 ? `0${numero}` : numero;
}

function actualizarCrono(){
    //console.log("actualizarCrono");
    
    segundos++
    if (segundos === 60){
        segundos = 0;
        minutos++;
    }
    if (minutos === 60) {
        minutos = 0;
        horas++;
    }
    cronometro.textContent = `${formatoTiempo(horas)}:${formatoTiempo(minutos)}:${formatoTiempo(segundos)}`;
}

let descanso = {
    activo: true,
    tiempo: 10
}
let cont = 0

function actualizarEjercicio(){
    //console.log("actualizarEjercicio");

    if (ejercicioActual < 2) {
        ejercicioActual++
        reanudar()
    }
    else{
        ejercicioActual = 0
        set++
        preparados.textContent = "cambio de set"
    }
    if (set === 5 & ejercicioActual === 1) final()
    ejercicio.src = ejercicios[rutina][set][ejercicioActual]
}

function acctualizarDescanso() {
    if (descanso.activo){
        if (segundos <= descanso.tiempo){
            preparados.textContent = "preparados..."
            if (segundos === descanso.tiempo){
                descanso.activo = false
                reiniciar()
                reanudar()
            }
        }
    }else{
        preparados.textContent = "ya!!"
        if (minutos === 1){
            descanso.activo = true
            pausar()
            reiniciar()
            actualizarEjercicio()
        }
    }
}
const tic = new Audio("tic.mp3")
const ticFinal = new Audio("tic final.mp3")

function actualizarSonido() {
    if (descanso.activo){
        if(segundos === 0) ticFinal.play()
        if(segundos >= 8 & segundos <= 9)tic.play()
    } else {
        if (segundos === 0) ticFinal.play()
        if (segundos >= 56 & segundos <= 59) tic.play()
    }
}



pausa.addEventListener("click", () => {
    pausar()
})

play.addEventListener("click", () => {
    reanudar()
})

function pausar() {
    console.log("pausar");
    
    clearInterval(intervaloCrono);
    intervaloCrono = null;
    pausa.remove()
    play.classList.add("boton")
    contenedor.appendChild(play)
}

function reanudar() {
    console.log("reanudar");
    
    iniciarRutina()
    play.remove()
    pausa.classList.remove("aparecer")
    contenedor.appendChild(pausa)
    
}

function reiniciar() {
    console.log("reiniciar");
    
    clearInterval(intervaloCrono)
    intervaloCrono = null;
    segundos = 0;
    minutos = 0;
    horas = 0;
    cronometro.textContent = "00:00:00";
}

const reiniciarRutina = document.createElement("div")
reiniciarRutina.textContent = "reiniciar rutina"

reiniciarRutina.addEventListener("click", () => {
    setTimeout(() => {
        reiniciarRutina.classList.add("ocultar")
        setTimeout(() => {
            reiniciarRutina.remove()
            set = 0
            ejercicioActual = 0
            aparecer()
            iniciarRutina()
        }, 500);
    }, 100)
})

function final() {
    setTimeout(() => {
        cronometro.classList.add("ocultar")
        preparados.classList.add("ocultar")
        ejercicio.classList.add("ocultar")
        pausa.classList.add("ocultar")
        setTimeout(() => {
            cronometro.remove()
            preparados.remove()
            ejercicio.remove()
            pausa.remove()
            reiniciarRutina.classList.add("aparecer")
            reiniciarRutina.classList.add("reiniciarRutina")
            contenedor.appendChild(reiniciarRutina)
        }, 500);
    }, 100);
}