// ======================================================
// 1. MOSTRAR U OCULTAR LAS PREGUNTAS DE LA UdeA
// ======================================================

// Pregunta: ¿Es estudiante de la UdeA?
const opcionesUdeA = document.querySelectorAll(
    'input[name="estudianteUdeA"]'
);

// Campo: ¿Es primer semestre?
const campoPrimerSemestre = document.getElementById(
    "campoPrimerSemestre"
);

// Opciones de primer semestre
const opcionesPrimerSemestre = document.querySelectorAll(
    'input[name="primerSemestre"]'
);

// Campo: promedio anterior
const campoPromedioAnterior = document.getElementById(
    "campoPromedioAnterior"
);

// Input promedio anterior
const promedioAnterior = document.getElementById(
    "promedioAnterior"
);


// ======================================================
// 2. CUANDO SELECCIONA SI O NO UdeA
// ======================================================

opcionesUdeA.forEach(function(opcion) {

    opcion.addEventListener("change", function() {

        // ----------------------------------------------
        // SI ES ESTUDIANTE DE LA UdeA
        // ----------------------------------------------

        if (this.value === "si") {

            // Mostrar pregunta de primer semestre
            campoPrimerSemestre.style.display = "block";

            // Hacer obligatoria la respuesta
            opcionesPrimerSemestre.forEach(function(opcion) {
                opcion.required = true;
            });

        }

        // ----------------------------------------------
        // SI NO ES ESTUDIANTE DE LA UdeA
        // ----------------------------------------------

        else {

            // Ocultar primer semestre
            campoPrimerSemestre.style.display = "none";

            // Ocultar promedio anterior
            campoPromedioAnterior.style.display = "none";

            // Quitar obligación de primer semestre
            opcionesPrimerSemestre.forEach(function(opcion) {
                opcion.required = false;
                opcion.checked = false;
            });

            // Quitar obligación y borrar promedio anterior
            promedioAnterior.required = false;
            promedioAnterior.value = "";
        }

    });

});


// ======================================================
// 3. MOSTRAR U OCULTAR EL PROMEDIO DEL SEMESTRE ANTERIOR
// ======================================================

opcionesPrimerSemestre.forEach(function(opcion) {

    opcion.addEventListener("change", function() {

        // ----------------------------------------------
        // SI ES PRIMER SEMESTRE
        // ----------------------------------------------

        if (this.value === "si") {

            // Ocultar promedio anterior
            campoPromedioAnterior.style.display = "none";

            // Quitar obligación
            promedioAnterior.required = false;

            // Borrar cualquier valor anterior
            promedioAnterior.value = "";
        }

        // ----------------------------------------------
        // SI NO ES PRIMER SEMESTRE
        // ----------------------------------------------

        else {

            // Mostrar promedio anterior
            campoPromedioAnterior.style.display = "block";

            // Hacer obligatorio
            promedioAnterior.required = true;
        }

    });

});


// ======================================================
// 4. ELEMENTOS PRINCIPALES
// ======================================================

const formularioSemestre = document.getElementById(
    "formularioSemestre"
);

const seccionMaterias = document.getElementById(
    "seccionMaterias"
);

const resultado = document.getElementById(
    "resultado"
);


// ======================================================
// 5. GENERAR LOS CAMPOS DE LAS MATERIAS
// ======================================================

formularioSemestre.addEventListener("submit", function(event) {

    event.preventDefault();

    const cantidadMaterias = parseInt(
        document.getElementById("cantidadMaterias").value
    );

    // Limpiar resultados anteriores
    seccionMaterias.innerHTML = "";
    resultado.innerHTML = "";


    // ----------------------------------------------
    // Título
    // ----------------------------------------------

    const titulo = document.createElement("h2");

    titulo.textContent = "Información de las materias";

    seccionMaterias.appendChild(titulo);


    // ==================================================
    // CREAR CADA MATERIA
    // ==================================================

    for (let i = 1; i <= cantidadMaterias; i++) {

        const materia = document.createElement("div");

        materia.classList.add("materia");


        // ----------------------------------------------
        // Título
        // ----------------------------------------------

        const tituloMateria = document.createElement("h3");

        tituloMateria.textContent = "Materia " + i;

        materia.appendChild(tituloMateria);


        // ----------------------------------------------
        // Nombre
        // ----------------------------------------------

        const etiquetaNombre = document.createElement("label");

        etiquetaNombre.textContent = "Nombre:";


        const campoNombre = document.createElement("input");

        campoNombre.type = "text";

        campoNombre.name = "nombreMateria" + i;

        // Nombre automático, pero editable
        campoNombre.value = "Materia " + i;

        campoNombre.required = true;


        materia.appendChild(etiquetaNombre);

        materia.appendChild(campoNombre);


        // ----------------------------------------------
        // Créditos
        // ----------------------------------------------

        const etiquetaCreditos = document.createElement("label");

        etiquetaCreditos.textContent = "Créditos:";


        const campoCreditos = document.createElement("input");

        campoCreditos.type = "number";

        campoCreditos.name = "creditosMateria" + i;

        campoCreditos.min = "1";

        campoCreditos.max = "20";

        campoCreditos.placeholder = "Ejemplo: 4";

        campoCreditos.required = true;


        materia.appendChild(etiquetaCreditos);

        materia.appendChild(campoCreditos);


        // ----------------------------------------------
        // Nota
        // ----------------------------------------------

        const etiquetaNota = document.createElement("label");

        etiquetaNota.textContent = "Nota:";


        const campoNota = document.createElement("input");

        campoNota.type = "number";

        campoNota.name = "notaMateria" + i;

        campoNota.min = "0";

        campoNota.max = "5";

        campoNota.step = "0.01";

        campoNota.placeholder = "Ejemplo: 4.25";

        campoNota.required = true;


        materia.appendChild(etiquetaNota);

        materia.appendChild(campoNota);


        // Agregar materia
        seccionMaterias.appendChild(materia);
    }


    // ==================================================
    // BOTÓN CALCULAR
    // ==================================================

    const botonCalcular = document.createElement("button");

    botonCalcular.type = "button";

    botonCalcular.id = "botonCalcular";

    botonCalcular.textContent = "Calcular promedio";

    seccionMaterias.appendChild(botonCalcular);


    // ==================================================
    // EVENTO DEL BOTÓN CALCULAR
    // ==================================================

    botonCalcular.addEventListener("click", function() {

        // ----------------------------------------------
        // Variables para el cálculo
        // ----------------------------------------------

        let sumaProductos = 0;

        let totalCreditos = 0;

        let materiasPerdidas = 0;


        // ----------------------------------------------
        // Recorrer todas las materias
        // ----------------------------------------------

        for (let i = 1; i <= cantidadMaterias; i++) {

            const campoCreditos = document.querySelector(
                `[name="creditosMateria${i}"]`
            );

            const campoNota = document.querySelector(
                `[name="notaMateria${i}"]`
            );

            const creditos = parseFloat(
                campoCreditos.value
            );

            const nota = parseFloat(
                campoNota.value
            );


            // ------------------------------------------
            // Verificar que los datos estén completos
            // ------------------------------------------

            if (
                isNaN(creditos) ||
                isNaN(nota)
            ) {

                alert(
                    "Por favor completa los créditos y la nota de todas las materias."
                );

                return;
            }


            // ------------------------------------------
            // Nota × créditos
            // ------------------------------------------

            sumaProductos += nota * creditos;

            totalCreditos += creditos;


            // ------------------------------------------
            // Contar materias perdidas
            // Nota menor a 3.00
            // ------------------------------------------

            if (nota < 3.00) {

                materiasPerdidas++;
            }

        }


        // ==================================================
        // CALCULAR PROMEDIO CRÉDITO
        // ==================================================

        const promedio = sumaProductos / totalCreditos;

        const promedioRedondeado = promedio.toFixed(2);


        // ==================================================
        // DETERMINAR SI ES ESTUDIANTE UdeA
        // ==================================================

        const estudianteUdeA = document.querySelector(
            'input[name="estudianteUdeA"]:checked'
        );

        const esUdeA =
            estudianteUdeA &&
            estudianteUdeA.value === "si";


        // ==================================================
        // MOSTRAR RESULTADO DEL PROMEDIO
        // ==================================================

        resultado.innerHTML = `

            <div class="resultado-promedio">

                <h2>Resultado</h2>

                <p>
                    <strong>
                        Promedio crédito del semestre:
                    </strong>

                    ${promedioRedondeado}
                </p>

            </div>

        `;


        // ==================================================
        // SI NO ES UdeA
        // ==================================================

        if (!esUdeA) {

            return;
        }


        // ==================================================
        // INFORMACIÓN DEL ESTUDIANTE UdeA
        // ==================================================

        const primerSemestreSeleccionado =
            document.querySelector(
                'input[name="primerSemestre"]:checked'
            );

        const esPrimerSemestre =
            primerSemestreSeleccionado &&
            primerSemestreSeleccionado.value === "si";


        // ==================================================
        // OBTENER PROMEDIO ANTERIOR
        // ==================================================

        let promedioAnteriorValor = null;


        if (!esPrimerSemestre) {

            promedioAnteriorValor = parseFloat(
                promedioAnterior.value
            );


            if (isNaN(promedioAnteriorValor)) {

                alert(
                    "Por favor ingresa el promedio del semestre anterior."
                );

                return;
            }

        }


        // ==================================================
        // VARIABLES PARA LA SITUACIÓN ACADÉMICA
        // ==================================================

        let situacion = "";

        let claseSituacion = "";

        let promedioCombinado = null;


        // ==================================================
        // 1. SOBRESALIENTE
        //
        // Promedio >= 4.00
        // Mínimo 15 créditos
        // Cero materias perdidas
        // ==================================================

        const esSobresaliente =
            promedio >= 4.00 &&
            totalCreditos >= 15 &&
            materiasPerdidas === 0;


        if (esSobresaliente) {

            situacion = "Sobresaliente";

            claseSituacion = "situacion-sobresaliente";

        }


        // ==================================================
        // SI NO ES SOBRESALIENTE
        // ==================================================

        else {


            // ==================================================
            // PRIMER SEMESTRE
            // ==================================================

            if (esPrimerSemestre) {


                // ------------------------------------------
                // NORMAL
                // ------------------------------------------

                if (promedio >= 2.80) {

                    situacion = "Normal";

                    claseSituacion = "situacion-normal";

                }


                // ------------------------------------------
                // PERÍODO DE PRUEBA
                // ------------------------------------------

                else if (promedio >= 2.50) {

                    situacion = "Período de Prueba";

                    claseSituacion = "situacion-prueba";

                }


                // ------------------------------------------
                // INSUFICIENTE
                // ------------------------------------------

                else {

                    situacion = "Insuficiente";

                    claseSituacion = "situacion-insuficiente";

                }

            }


            // ==================================================
            // NO ES PRIMER SEMESTRE
            // ==================================================

            else {


                // ------------------------------------------
                // PROMEDIO ACTUAL >= 3.00
                // DIRECTAMENTE NORMAL
                // ------------------------------------------

                if (promedio >= 3.00) {

                    situacion = "Normal";

                    claseSituacion = "situacion-normal";

                }


                // ------------------------------------------
                // PROMEDIO ACTUAL < 3.00
                // NECESITAMOS PROMEDIAR CON EL ANTERIOR
                // ------------------------------------------

                else {

                    promedioCombinado =
                        (promedio + promedioAnteriorValor) / 2;


                    // --------------------------------------
                    // NORMAL
                    // Promedio combinado >= 3.00
                    // --------------------------------------

                    if (promedioCombinado >= 3.00) {

                        situacion = "Normal";

                        claseSituacion = "situacion-normal";

                    }


                    // --------------------------------------
                    // PERÍODO DE PRUEBA
                    // 2.50 <= combinado < 3.00
                    // --------------------------------------

                    else if (promedioCombinado >= 2.50) {

                        situacion = "Período de Prueba";

                        claseSituacion = "situacion-prueba";

                    }


                    // --------------------------------------
                    // INSUFICIENTE
                    // Combinado < 2.50
                    // --------------------------------------

                    else {

                        situacion = "Insuficiente";

                        claseSituacion = "situacion-insuficiente";

                    }

                }

            }

        }


        // ==================================================
        // CONSTRUIR EXPLICACIÓN DEL PROMEDIO ANTERIOR
        // ==================================================

        let explicacionPromedioAnterior = "";


        // Esta explicación SOLO aparece cuando:
        // - No es primer semestre
        // - El promedio actual es menor a 3.00
        // - Por lo tanto, fue necesario utilizar
        //   el promedio del semestre anterior

        if (
            !esPrimerSemestre &&
            promedio < 3.00
        ) {

            const promedioCombinadoRedondeado =
                promedioCombinado.toFixed(2);

            const promedioAnteriorRedondeado =
                promedioAnteriorValor.toFixed(2);


            explicacionPromedioAnterior = `

                <div class="explicacion-promedio">

                    <h3>
                        ¿Por qué se tiene en cuenta el semestre anterior?
                    </h3>

                    <p>
                        Tu promedio del semestre es
                        <strong>${promedioRedondeado}</strong>,
                        es decir, inferior a 3.00.
                        Por esta razón, se debe promediar con
                        el promedio del semestre anterior para
                        determinar tu situación académica.
                    </p>

                    <p>
                        <strong>
                            Promedio semestre anterior:
                        </strong>
                        ${promedioAnteriorRedondeado}
                    </p>

                    <p>
                        <strong>
                            Promedio combinado:
                        </strong>
                        ${promedioCombinadoRedondeado}
                    </p>

                </div>

            `;
        }


        // ==================================================
        // MOSTRAR SITUACIÓN ACADÉMICA
        // ==================================================

        resultado.innerHTML += `

            ${explicacionPromedioAnterior}

            <div
                id="situacionAcademica"
                class="${claseSituacion}"
            >

                <h3>
                    Situación académica
                </h3>

                <p id="textoSituacion">
                    ${situacion}
                </p>

                <p class="nota-situacion">
                    Materias perdidas: ${materiasPerdidas}
                </p>

            </div>

        `;

    });

});