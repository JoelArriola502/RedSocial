//ocultar y mostrar
document.getElementById('Etiquetar').addEventListener('click', function () {
    var divFlotante = document.getElementById('Div-Flotante');
    divFlotante.style.display = 'block'; 
});

document.getElementById('Cerrar').addEventListener('click', function () {
    var divFlotante = document.getElementById('Div-Flotante');
    divFlotante.style.display = 'none'; 
});