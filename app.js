import { crearLibro, obtenerLibros, buscarLibro, eliminarLibro } from "./api.js";

const form = document.getElementById("form-libro");
const listaLibros = document.getElementById("lista-libros");
const buscarId = document.getElementById("buscar-id");
const btnBuscar = document.getElementById("btn-buscar");
const resultadoBusqueda = document.getElementById("resultado-busqueda");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const titulo = document.getElementById("titulo").value.trim();
  const autor = document.getElementById("autor").value.trim();
  const paginas = document.getElementById("paginas").value.trim();

  await crearLibro(titulo, autor, paginas);
  form.reset();
  cargarLibros();
});

async function cargarLibros() {
  const libros = await obtenerLibros();
  listaLibros.innerHTML = "";

  if (libros.length === 0) {
    listaLibros.innerHTML = "<li>No hay libros registrados</li>";
    return;
  }

  libros.forEach((libro) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span><strong>${libro.titulo}</strong> - ${libro.autor} - Pag. ${libro.paginas} - ${libro._id}</span>
            <button>Eliminar</button>
        `;

    li.querySelector("button").addEventListener("click", async () => {
      await eliminarLibro(libro._id);
      cargarLibros();
    });
    listaLibros.appendChild(li);
  });
}

btnBuscar.addEventListener("click", async () => {
  const id = buscarId.value.trim();
  if (!id) return alert("Ingresa un ID válido");

  try {
    const libro = await buscarLibro(id);
    resultadoBusqueda.innerHTML = `
      <p><strong>Título:</strong> ${libro.titulo}</p>
      <p><strong>Autor:</strong> ${libro.autor}</p>
    `;
  } catch (err) {
    resultadoBusqueda.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
});

document.addEventListener("DOMContentLoaded", cargarLibros);
