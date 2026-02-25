import { postAtracciones, getAtracciones, putAtracciones, deleteAtracciones, getAtraccionById } from "../services/serviciosAtracciones.js";

const nombreAtraccion = document.getElementById("nombreAtraccion");
const categoria = document.getElementById("categoria");
const estado = document.getElementById("estado");
const alturaMinima = document.getElementById("alturaMinima");
const tiempoEsperaAprox = document.getElementById("tiempoEsperaAprox");
const btnGuardar = document.getElementById("btnGuardar");
const atraccionesData = document.getElementById("atraccionesData");

btnGuardar.addEventListener("click", async function () {
    const nombre = nombreAtraccion.value.trim();
    if (!nombre) {
        alert("El nombre de la atracción es obligatorio.");
        return;
    }

    // Validación de nombre único
    const todasLasAtracciones = await getAtracciones();
    const existe = todasLasAtracciones.some(a => a.nombreAtraccion.toLowerCase() === nombre.toLowerCase());

    if (existe) {
        alert("Ya existe una atracción con este nombre.");
        return;
    }

    const atracciones = {
        nombreAtraccion: nombre,
        categoria: categoria.value,
        estado: estado.value,
        alturaMinima: alturaMinima.value,
        tiempoEsperaAprox: tiempoEsperaAprox.value
    }
    let atraccionGuardada = await postAtracciones(atracciones);

    console.log(atraccionGuardada);

    atraccionesData.innerHTML = "";
    mostrarAtraccionesPantalla()
})

// Función para buscar por ID
const btnBuscarId = document.getElementById("btnBuscarId");
const idBusqueda = document.getElementById("idBusqueda");
const resultadoBusqueda = document.getElementById("resultadoBusqueda");

btnBuscarId.addEventListener("click", async function () {
    const id = idBusqueda.value.trim();
    if (!id) {
        alert("Por favor, ingrese un ID");
        return;
    }

    const atraccion = await getAtraccionById(id);
    resultadoBusqueda.innerHTML = "";

    if (atraccion) {
        resultadoBusqueda.innerHTML = `
            <div style="border: 1px solid blue; padding: 10px; margin-top: 10px;">
                <p><strong>ID:</strong> ${atraccion.id}</p>
                <p><strong>Nombre:</strong> ${atraccion.nombreAtraccion}</p>
                <p><strong>Categoría:</strong> ${atraccion.categoria}</p>
                <p><strong>Estado:</strong> ${atraccion.estado}</p>
            </div>
        `;
    } else {
        resultadoBusqueda.innerHTML = "<p style='color: red;'>Atracción no encontrada</p>";
    }
});

async function obtenerAtracciones() {

    const atraccionesObtenidas = await getAtracciones();


    return atraccionesObtenidas;

}


async function mostrarAtraccionesPantalla() {

    let atraccionesFinales = await obtenerAtracciones();


    for (let index = 0; index < atraccionesFinales.length; index++) {


        let h3 = document.createElement("h3"); // 
        let btnEditarA = document.createElement("button");
        let btnEliminarA = document.createElement("button");
        btnEliminarA.textContent = "Eliminar";
        btnEditarA.textContent = "Editar";
        h3.textContent = atraccionesFinales[index].nombreAtraccion + " " + atraccionesFinales[index].categoria + " " + atraccionesFinales[index].estado + " " + atraccionesFinales[index].alturaMinima + " " + atraccionesFinales[index].tiempoEsperaAprox + " " + atraccionesFinales[index].id;
        atraccionesData.appendChild(h3);
        atraccionesData.appendChild(btnEditarA);
        atraccionesData.appendChild(btnEliminarA);


        btnEliminarA.addEventListener("click", async function () {


            let atraccionEliminada = await deleteAtracciones(atraccionesFinales[index].id)
            console.log(atraccionEliminada);

        })

        btnEditarA.addEventListener("click", async function () {
            document.getElementById("modalEditar").style.display = "block";

            // 2. Llenar los campos con los valores actuales del producto
            document.getElementById("editId").value = atraccionesFinales[index].id;
            document.getElementById("editNombre").value = atraccionesFinales[index].nombreAtraccion;
            document.getElementById("editCategoria").value = atraccionesFinales[index].categoria;
            document.getElementById("editEstado").value = atraccionesFinales[index].estado;
            document.getElementById("editAlturaMinima").value = atraccionesFinales[index].alturaMinima;
            document.getElementById("editTiempoEsperaAprox").value = atraccionesFinales[index].tiempoEsperaAprox;
        })
    }
}
document.getElementById("btnGuardarCambios").addEventListener("click", async () => {
    const id = document.getElementById("editId").value;

    const newValor = {
        nombreAtraccion: document.getElementById("editNombre").value,
        categoria: document.getElementById("editCategoria").value,
        estado: document.getElementById("editEstado").value,
        alturaMinima: document.getElementById("editAlturaMinima").value,
        tiempoEsperaAprox: document.getElementById("editTiempoEsperaAprox").value
    };

    try {
        // Llamada a tu función PUT con los datos del formulario
        await putAtracciones(newValor, id);
        alert("¡Atraccion actualizada!");
        location.reload(); // Recarga para mostrar los cambios
    } catch (error) {
        console.error("Error al actualizar mediante el [Fetch API](https://developer.mozilla.org):", error);
    }
});
mostrarAtraccionesPantalla()

