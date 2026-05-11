const API_URL = "http://localhost:3000/libros";

//Crear un nuevo libro
export async function crearLibro(titulo, autor, paginas) {
  const res = await fetch(`${API_URL}/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, autor, paginas }),
  });

  return res.json();
}

// Listar los libros
export async function obtenerLibros() {
  const res = await fetch(`${API_URL}/list`);
  return res.json();
}

// Buscar un libro por id
export async function buscarLibro(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Libro no encontrado");
  return res.json();
}

// Eliminar un libro
export async function eliminarLibro(id) {
  const res = await fetch(`${API_URL}/delete/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("No se pudo eliminar el libro");
  }

  return res.json();
}
// Actualizar un libro
