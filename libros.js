import express from "express";
import Libro from "../models/Libro.js";

const router = express.Router();

//Crear un nuevo libro
router.post("/new", async (req, res) => {
  const libro = new Libro({
    titulo: req.body.titulo,
    autor: req.body.autor,
    paginas: req.body.paginas,
  });

  try {
    await libro.save();
    res.json(libro);
  } catch (error) {
    res.status(500).send("Error al guardar el libro");
  }
});

//Listar libros
router.get("/list", async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (error) {
    res.status(500).send("Error al obtener los libros");
  }
});

//Buscar libro por id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const libro = await Libro.findById(id);
    if (libro) {
      res.json(libro);
    } else {
      res.status(404).send("Libro no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al buscar el libro");
  }
});

//Eliminar un libro por id
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const libroEliminado = await Libro.findByIdAndDelete(id);

    if (!libroEliminado) {
      return res.status(404).send("Libro no encontrado");
    }

    res.json({
      mensaje: "Libro eliminado correctamente",
      libro: libroEliminado,
    });
  } catch (error) {
    res.status(500).send("Error al eliminar el libro");
  }
});
//Actualizar libro

export default router;
