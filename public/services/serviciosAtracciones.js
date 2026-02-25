async function getAtracciones() {

    try {

        const respuestaServidor = await fetch("http://localhost:3001/atracciones")


        const datosAtracciones = await respuestaServidor.json();


        return datosAtracciones;

    } catch (error) {

        console.error("Error al obtener las atracciones", error);
    }


}



//POST USUARIOS AQUI S EVA A CREAR LA FUNCION PARA GUARDAR UN NUEVO USUARIO


async function postAtracciones(atraccion) {

    try {

        const respuesta = await fetch("http://localhost:3001/atracciones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(atraccion)

        })

        const datosAtracciones = await respuesta.json();

        return datosAtracciones;

    } catch (error) {

        console.error("Error al obtener las atracciones", error);
    }



}


//PUT


async function putAtracciones(atraccion, id) {

    try {

        const respuesta = await fetch("http://localhost:3001/atracciones/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(atraccion)

        })

        const datosAtracciones = await respuesta.json();

        return datosAtracciones;

    } catch (error) {

        console.error("Error al actualizar los cambios", error);
    }
}


//DELETE
async function deleteAtracciones(id) {

    try {

        const respuesta = await fetch("http://localhost:3001/atracciones/" + id, {
            method: "DELETE",
        })

        const datosAtracciones = await respuesta.json();

        return datosAtracciones;

    } catch (error) {

        console.error("Error al Eliminar la atraccion", error);
    }
}

async function getAtraccionById(id) {
    try {
        const respuesta = await fetch("http://localhost:3001/atracciones/" + id);
        if (!respuesta.ok) {
            throw new Error("Atraccion no encontrada");
        }
        const datosAtraccion = await respuesta.json();
        return datosAtraccion;
    } catch (error) {
        console.error("Error al obtener la atraccion por ID", error);
        return null;
    }
}

export { getAtracciones, postAtracciones, putAtracciones, deleteAtracciones, getAtraccionById }
