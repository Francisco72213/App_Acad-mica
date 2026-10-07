const btnContinuar = document.getElementById("btnContinuar");

const cantidadEvaluaciones = document.getElementById(
    "cantidadEvaluaciones"
);

const evaluaciones = document.getElementById(
    "evaluaciones"
);

const btnCalcular = document.getElementById(
    "btnCalcular"
);

const resultado = document.getElementById(
    "resultado"
);


// ==========================================
// GENERAR LAS EVALUACIONES
// ==========================================

btnContinuar.addEventListener("click", function () {

    const cantidad = parseInt(
        cantidadEvaluaciones.value
    );


    // ==========================================
    // VALIDAR CANTIDAD
    // ==========================================

    if (
        !cantidad ||
        cantidad < 1 ||
        cantidad > 20
    ) {

        alert(
            "Ingresa una cantidad de evaluaciones entre 1 y 20."
        );

        return;
    }


    // ==========================================
    // LIMPIAR CONTENIDO ANTERIOR
    // ==========================================

    evaluaciones.innerHTML = "";

    resultado.innerHTML = "";


    // ==========================================
    // CREAR CADA EVALUACIÓN
    // ==========================================

    for (let i = 1; i <= cantidad; i++) {

        const fila = document.createElement("div");


        fila.innerHTML = `

            <label>
                Evaluación ${i}
            </label>

            <input
                type="number"
                class="porcentaje"
                placeholder="%"
                min="0"
                max="100"
                step="0.01"
            >

            <input
                type="number"
                class="nota"
                placeholder="Nota"
                min="0"
                max="5"
                step="0.01"
            >

        `;


        evaluaciones.appendChild(fila);

    }

});


// ==========================================
// CALCULAR NOTA DEFINITIVA
// ==========================================

btnCalcular.addEventListener("click", function () {

    const porcentajes = document.querySelectorAll(
        ".porcentaje"
    );

    const notas = document.querySelectorAll(
        ".nota"
    );


    // ==========================================
    // VERIFICAR QUE EXISTAN EVALUACIONES
    // ==========================================

    if (porcentajes.length === 0) {

        resultado.innerHTML = `

            <p>
                Primero debes indicar el número de evaluaciones.
            </p>

        `;

        return;
    }


    // ==========================================
    // SUMAR PORCENTAJES
    // ==========================================

    let sumaPorcentajes = 0;


    for (
        let i = 0;
        i < porcentajes.length;
        i++
    ) {

        const porcentaje = Number(
            porcentajes[i].value
        );

        sumaPorcentajes += porcentaje;

    }


    // ==========================================
    // VERIFICAR QUE LOS PORCENTAJES SUMEN 100
    // ==========================================

    if (sumaPorcentajes !== 100) {

        resultado.innerHTML = `

            <p>
                Los porcentajes deben sumar exactamente 100%.
            </p>

            <p>
                Actualmente suman:
                ${sumaPorcentajes}%
            </p>

        `;

        return;
    }


    // ==========================================
    // VERIFICAR QUE TODAS LAS NOTAS ESTÉN LLENAS
    // ==========================================

    for (
        let i = 0;
        i < notas.length;
        i++
    ) {

        if (notas[i].value === "") {

            resultado.innerHTML = `

                <p>
                    Debes ingresar todas las notas antes de calcular.
                </p>

            `;

            return;
        }

    }


    // ==========================================
    // CALCULAR NOTA FINAL
    // ==========================================

    let notaFinal = 0;


    for (
        let i = 0;
        i < notas.length;
        i++
    ) {

        const porcentaje = Number(
            porcentajes[i].value
        );

        const nota = Number(
            notas[i].value
        );


        notaFinal +=
            nota * (porcentaje / 100);

    }


    // ==========================================
    // REDONDEAR A UN DECIMAL
    // ==========================================

    const notaRedondeada =
        Math.round(
            (notaFinal + Number.EPSILON) * 10
        ) / 10;


    // ==========================================
    // MOSTRAR RESULTADOS
    // ==========================================

    resultado.innerHTML = `

        <h2>
            Nota definitiva
        </h2>

        <p class="nota-final">
            ${notaFinal.toFixed(2)}
        </p>


        <div class="resultado-redondeado">

            <p>
                Si en tu institución usan el redondeo
                para un solo decimal, tu nota definitiva es:
            </p>

            <strong>
                ${notaRedondeada.toFixed(1)}
            </strong>

        </div>

    `;

});


// ==========================================
// REGISTRAR SERVICE WORKER
// ==========================================

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register("./service-worker.js")

                .then(() => {

                    console.log(
                        "Service Worker registrado correctamente."
                    );

                })

                .catch(error => {

                    console.error(
                        "Error al registrar el Service Worker:",
                        error
                    );

                });

        }
    );

}
