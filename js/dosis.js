const searchInput = document.getElementById('searchInput');
const optionsList = document.getElementById('optionsList');
const options = optionsList.getElementsByTagName('li');

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

//funcion para calcular dosis por peso del peciente
function calcularDosisKg(){
    const nombre = document.getElementById('searchInput').value || "el medicamento";
    const peso = parseFloat(document.getElementById('peso').value);
    const recomendada = parseFloat(document.getElementById('recomendada').value);
    const displayResultadoKg = document.getElementById('resultadoKg');

    const inputPrescrita = document.getElementById('prescrita');

    if (isNaN(peso) || isNaN(recomendada) || recomendada <= 0) {
        displayResultadoKg.innerHTML = "Por favor, Ingresa valores válidos.";
        displayResultadoKg.style.color = "red";
        return;
    }

    const dosisKg = peso * recomendada;

    inputPrescrita.value = dosisKg;

    displayResultadoKg.style.color = '#2c3e50';
    // displayResultadoKg.innerHTML = `Dosis Prescrita: <strong>${dosisKg} mg</strong>`
    displayResultadoKg.innerHTML = `Dosis de ${nombre}: <strong>${dosisKg} mg</strong>`
}
//funcion para realizar la conversion a volumen en ml del medicamento
function calcularDosis() {
    
    const nombre = document.getElementById('searchInput').value || "el medicamento";
    const prescrita = parseFloat(document.getElementById('prescrita').value);
    const disponible = parseFloat(document.getElementById('disponible').value);
    const volumen = parseFloat(document.getElementById('volumen').value);
    const displayResultado = document.getElementById('resultadoVol');

    if (isNaN(prescrita) || isNaN(disponible) || isNaN(volumen) || disponible <= 0) {
        displayResultado.innerHTML = "Por favor, ingresa valores válidos.";
        displayResultado.style.color = "red";
        return;
    }

    const dosisfinal = (prescrita * volumen) / disponible;

    displayResultado.style.color = "#2c3e50";
    displayResultado.innerHTML = `Administrar: <strong>${dosisfinal} ml de ${nombre}</strong>`;
}