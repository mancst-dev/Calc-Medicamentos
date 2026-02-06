const searchInput = document.getElementById('searchInput');
const optionsList = document.getElementById('optionsList');
const options = optionsList.getElementsByTagName('li');

//variables publicas

//
window.onload = function() {
    const presentacion = document.getElementById('presentacion');
    const iniDosis = document.getElementById('tiempoDosis');
    if (iniDosis || presentacion) {
        iniDosis.selectedIndex = 0;
        presentacion.selectedIndex = 0;
    }
};

//filtro de opciones input busqueda medicamentos
searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    
    for (let i = 0; i < options.length; i++) {
        const text = options[i].textContent.toLowerCase();
        options[i].style.display = text.includes(filter) ? "" : "none";
    }
});

//validar al seleccionar una opción de buscar un medicamento
optionsList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        searchInput.value = e.target.textContent;
        optionsList.classList.add('hidden');
        console.log("Valor seleccionado:", e.target.getAttribute('data-value'));
    }
});

//funcion para limpiar
function cl() {
    document.getElementById('peso').value = '';
    document.getElementById('recomendada').value = '';
    document.getElementById('presentacion').value = 'Selecciona uno';
    // document.getElementById('mgUnidad').value = '';
    document.getElementById('prescrita').value = '';
    document.getElementById('disponible').value = '';
    document.getElementById('volumen').value = '';
    document.getElementById('resultadoKg').innerHTML = 'Datos en consulta...';
    document.getElementById('resultadoKg').style.color = 'black';
    document.getElementById('resultadoDosis').innerHTML = 'Datos en consulta...';
    document.getElementById('resultadoDosis').style.color = 'black';
    document.getElementById('resultadoVol').innerHTML = 'Datos en consulta...';
    document.getElementById('resultadoVol').style.color = 'black';
}


//funcion para bton calcular todo
function calcularTodo() {
    
    //inputs de la interfaz
    const nombre = document.getElementById('searchInput').value || "el medicamento";
    const peso = parseFloat(document.getElementById('peso').value);
    const recomendada = parseFloat(document.getElementById('recomendada').value);
    const disponible = parseFloat(document.getElementById('disponible').value);
    const volumen = parseFloat(document.getElementById('volumen').value);
    const preMed = document.getElementById('presentacion');
    const selectTiempo = document.getElementById('tiempoDosis');
        
    //resultados 
    const displayKg = document.getElementById('resultadoKg');
    const displayXToma = document.getElementById('resultadoDosis');
    const displayVolumen = document.getElementById('resultadoVol');
    const inputPrescrita = document.getElementById('prescrita');
    const prescrita = parseFloat(document.getElementById('prescrita').value);

    //validaciones y calculos
    //dosis diaria
    if (isNaN(peso) || isNaN(recomendada) ||recomendada <= 0) {
        displayKg.innerHTML = "Verifique peso y dosis recomendada.";
        displayKg.style.color = "red";
        return;
        
    }
    
    const dosisKg = peso * recomendada;
    inputPrescrita.value = dosisKg;

    //eleccion tipo presentacion
    const presentacion = parseInt(preMed.value);
    if (isNaN(presentacion) || presentacion <= 0){
        alert("Seleccione el tipo de presentación del medicamento.");
        return;
    }
    //dosis por toma
    const numeroDosis = parseInt(selectTiempo.value);
    if (isNaN(numeroDosis) || numeroDosis <= 0){
        displayXToma.innerHTML = "Seleccione la frecuencia de dosis.";
        displayXToma.style.color = "red";
        return;
    }

    const horas = 24 / parseInt(numeroDosis);
    const dosisPorTomaMg = dosisKg / numeroDosis;

    //volumen ´por cada toma
    if (isNaN(disponible) || isNaN(volumen) || disponible <= 0) {
        displayVolumen.innerHTML = "Verifique la concentración y volumen.";
        displayVolumen.style.color = "red";
        return;
    }

    const volumenPorTomaMl = (prescrita * volumen) / disponible;

    //resultados
    displayKg.style.color = "#2c3e50";
    displayKg.innerHTML = `Dosis Total Diaria: <strong>${dosisKg.toFixed(2)} mg</strong>`;

    displayXToma.style.color = "#2c3e50";
    displayXToma.innerHTML = `${numeroDosis} dosis cada ${horas} horas en <strong>${dosisPorTomaMg.toFixed(2)} mg</strong> de <strong>${nombre}</strong>`;

    displayVolumen.style.color = "#2c3e50";
    displayVolumen.innerHTML = `Administrar: <strong>${volumenPorTomaMl.toFixed(2)} ml</strong> de ${nombre} por cada toma.`;

}