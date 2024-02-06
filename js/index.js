//Funcion principal para el boton de encriptacion
function encriptadorTexto(){
    let textoEscrito=obtenerTextoEscrito()
    let textoEncriptado=encriptarTexto(textoEscrito)
    mostrarVentanaTexto(textoEncriptado)
}

//Funcion que encripta el texto escrito
function encriptarTexto(texto){
    let textoEncriptado = texto
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');

    return textoEncriptado
}

//Funcion principal para el boton de desencriptado
function desencriptadorTexto(){
    let textoEscrito=obtenerTextoEscrito()
    let textoDesencriptado=desencriptarTexto(textoEscrito)
    mostrarVentanaTexto(textoDesencriptado)
}

//Funcion que desencriptar el texto escrito
function desencriptarTexto(texto) {
    // Creamos un mapa inverso para desencriptar
    let mapaDesencriptar = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    // Reemplazar las palabras encriptadas según las reglas inversas
    let textoDesencriptado = texto.replace(/enter|imes|ai|ober|ufat/g, match => mapaDesencriptar[match]);

    return textoDesencriptado;
}


//Funcion para el boton de copiar
async function copiarTexto(){
    let texto=document.getElementById('texto-resultado').innerHTML
    await navigator.clipboard.writeText(texto)    
}

//Funcion para mostrar texto encriptado o desencriptado en pantalla
function mostrarVentanaTexto(texto){
    let estadoSinTexto=document.querySelector('div.resultado-sin-texto')
    let estadoConTexto=document.querySelector('div.resultado-con-texto')
    if(texto.trim()!=""){
        estadoSinTexto.style.display='none'
        estadoConTexto.style.display='block'
        document.getElementById('texto-resultado').innerText=texto
        document.getElementById('entrada-texto').value=""
    }else{
        estadoSinTexto.style.display='block'
        estadoConTexto.style.display='none'
    }
}


//Funcion para obtener texto escrito
function obtenerTextoEscrito(){
    let textoEscrito=document.getElementById('entrada-texto').value
    return textoEscrito
}

//Funcion que verifica texto escrito sea correcto
function validarTextoEscrito() {
    let textArea = document.getElementById('entrada-texto');

    textArea.addEventListener('input', (e) => {
        let entradaTexto = e.data;

        if (entradaTexto !== null) {
            let ultimaLetra = entradaTexto.charAt(entradaTexto.length - 1);

            // Verificar si la letra es una letra minúscula, espacio en blanco o letra "ñ"
            if (!(ultimaLetra.toLowerCase() === ultimaLetra && /^[a-zñ\s]$/.test(ultimaLetra))) {
                // Eliminar la última letra si no cumple con las condiciones
                textArea.value = textArea.value.slice(0, -1);
            }
        }
    });
    textArea.addEventListener('paste', function (e) {
        // Manejar el evento de pegado
        let textoPegado = e.clipboardData.getData('text');    
        if(!/^[a-zñ\s]+$/.test(textoPegado)){
            textArea.value=''
            e.preventDefault();
        }
    });
}
validarTextoEscrito()