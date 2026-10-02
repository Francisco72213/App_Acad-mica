// ==========================================
// ELEMENTOS DEL HTML
// ==========================================

const numeroEvaluaciones = document.getElementById("numeroEvaluaciones");
const crearEvaluaciones = document.getElementById("crearEvaluaciones");

const evaluaciones = document.getElementById("evaluaciones");
const listaEvaluaciones = document.getElementById("listaEvaluaciones");

const objetivo = document.getElementById("objetivo");
const notaObjetivo = document.getElementById("notaObjetivo");
const calcular = document.getElementById("calcular");

const resultado = document.getElementById("resultado");
const mensajeResultado = document.getElementById("mensajeResultado");
const notaNecesaria = document.getElementById("notaNecesaria");


// ==========================================
// CREAR LAS EVALUACIONES
// ==========================================

crearEvaluaciones.addEventListener("click", function () {

    const cantidad = Number(numeroEvaluaciones.value);

    if (cantidad < 2 || cantidad > 10) {
        alert("Ingresa un número de evaluaciones entre 2 y 10.");
        return;
    }

    listaEvaluaciones.innerHTML = "";


    // ==========================================
    // CREAR FILAS
    // ==========================================

    for (let i = 1; i <= cantidad; i++) {

        const fila = document.createElement("div");

        fila.className = "fila-evaluacion";


        // ==========================================
        // ÚLTIMA EVALUACIÓN
        // ==========================================

        if (i === cantidad) {

            fila.innerHTML = `
                <div>
                    <label>Evaluación ${i} 🎯</label>

                    <p class="mensaje-calculo">
                        Esta nota la calcularemos
                    </p>
                </div>

                <div>
                    <label>Porcentaje</label>

                    <input
                        type="number"
                        class="porcentaje"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="%"
                    >
                </div>

                <div>
                    <label>Nota</label>

                    <div class="nota-calcularemos">
                        Esto lo calcularemos
                    </div>
                </div>
            `;

        }


        // ==========================================
        // EVALUACIONES ANTERIORES
        // ==========================================

        else {

            fila.innerHTML = `
                <div>
                    <label>Evaluación ${i}</label>
                </div>

                <div>
                    <label>Porcentaje</label>

                    <input
                        type="number"
                        class="porcentaje"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="%"
                    >
                </div>

                <div>
                    <label>Nota obtenida</label>

                    <input
                        type="number"
                        class="nota"
                        min="0"
                        max="5"
                        step="0.01"
                        placeholder="0 - 5"
                    >
                </div>
            `;
        }

        listaEvaluaciones.appendChild(fila);
    }


    // Mostrar secciones

    evaluaciones.style.display = "block";
    objetivo.style.display = "block";

    resultado.style.display = "none";
});


// ==========================================
// CALCULAR NOTA NECESARIA
// ==========================================

calcular.addEventListener("click", function () {

    const porcentajes = document.querySelectorAll(".porcentaje");
    const notas = document.querySelectorAll(".nota");

    const objetivoFinal = Number(notaObjetivo.value);


    // ==========================================
    // VALIDAR NOTA OBJETIVO
    // ==========================================

    if (
        isNaN(objetivoFinal) ||
        objetivoFinal < 0 ||
        objetivoFinal > 5
    ) {

        alert("Ingresa una nota definitiva deseada entre 0 y 5.");

        return;
    }


    // ==========================================
    // VARIABLES
    // ==========================================

    let porcentajeTotal = 0;
    let acumulado = 0;


    // ==========================================
    // RECORRER TODOS LOS PORCENTAJES
    // ==========================================

    for (let i = 0; i < porcentajes.length; i++) {

        const porcentaje = Number(porcentajes[i].value);


        // ------------------------------------------
        // VALIDAR PORCENTAJE
        // ------------------------------------------

        if (
            isNaN(porcentaje) ||
            porcentaje <= 0 ||
            porcentaje > 100
        ) {

            alert(
                `Ingresa correctamente el porcentaje de la evaluación ${i + 1}.`
            );

            return;
        }


        // Acumular TODOS los porcentajes

        porcentajeTotal += porcentaje;


        // ==========================================
        // EVALUACIONES YA REALIZADAS
        // ==========================================

        if (i < porcentajes.length - 1) {

            const nota = Number(notas[i].value);


            // Validar nota

            if (
                isNaN(nota) ||
                nota < 0 ||
                nota > 5
            ) {

                alert(
                    `Ingresa correctamente la nota de la evaluación ${i + 1}.`
                );

                return;
            }


            // Acumular nota ponderada

            acumulado += nota * (porcentaje / 100);
        }
    }


    // ==========================================
    // VALIDAR QUE LOS PORCENTAJES SUMEN 100%
    // ==========================================

    if (Math.abs(porcentajeTotal - 100) > 0.01) {

        alert(
            `Los porcentajes deben sumar 100%. Actualmente suman ${porcentajeTotal}%.`
        );

        return;
    }


    // ==========================================
    // OBTENER PORCENTAJE DE LA ÚLTIMA EVALUACIÓN
    // ==========================================

    const ultimoPorcentaje =
        Number(porcentajes[porcentajes.length - 1].value);


    // ==========================================
    // CALCULAR NOTA NECESARIA
    // ==========================================

    const notaNecesariaCalculada =
        (objetivoFinal - acumulado) /
        (ultimoPorcentaje / 100);


    // ==========================================
    // MOSTRAR RESULTADO
    // ==========================================

    resultado.style.display = "block";


    // ==========================================
    // YA ALCANZA LA NOTA OBJETIVO
    // ==========================================

    if (notaNecesariaCalculada <= 0) {

        mensajeResultado.textContent =
            "¡Ya alcanzas la nota definitiva que deseas!";

        notaNecesaria.textContent =
            "0.00";

        return;
    }


    // ==========================================
    // NECESITA MÁS DE 5.0
    // ==========================================

    if (notaNecesariaCalculada > 5) {

        mensajeResultado.textContent =
            "La nota necesaria supera el máximo de 5.0.";

        notaNecesaria.textContent =
            "No es posible alcanzar la nota objetivo.";

        return;
    }


    // ==========================================
    // RESULTADO NORMAL
    // ==========================================

    mensajeResultado.textContent =
        "Necesitas obtener como mínimo:";

    notaNecesaria.textContent =
        notaNecesariaCalculada.toFixed(2);

});