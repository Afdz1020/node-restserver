const express = require('express');

let {
  verificarToken,
  verificarAdmin_Role
} = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

// ===========================
//Mostrar todas las categorias
// ===========================
app.get('/categoria', verificarToken, (req, res) => {
  Categoria.find({})
    .sort('descripcion')
    .populate('usuario', 'nombre email')
    .exec((err, categoriaDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        categoria: categoriaDB
      });
    });
});

// ===================================
//Mostrar todas las categorias por ID
// ===================================
app.get('/categoria/:id', verificarToken, (req, res) => {
  Categoria.findById(req.params.id, (err, categoriaDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    if (!categoriaDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'El id no es correcto'
        }
      });
    }

    res.json({
      ok: true,
      categoria: categoriaDB
    });
  });
});

// ===================================
//Crear nueva Categoria
// ===================================
app.post('/categoria', verificarToken, (req, res) => {
  let body = req.body;

  let categoria = new Categoria({
    descripcion: body.descripcion,
    usuario: req.usuario['_id']
  });

  categoria.save((err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!categoriaDB) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      categoria: categoriaDB
    });
  });
});

// ===================================
//Actualiza una categoria
// ===================================
app.put('/categoria/:id', verificarToken, (req, res) => {
  let id = req.params.id;
  let body = req.body;

  let descCategoria = {
    descripcion: body.descripcion
  };

  Categoria.findByIdAndUpdate(
    id,
    descCategoria,
    { new: true, runValidators: true },
    (err, categoriaDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if (!categoriaDB) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      res.json({ ok: true, categoria: categoriaDB });
    }
  );
});

// ===================================
//Actualiza una categoria
// ===================================
app.delete(
  '/categoria/:id',
  [verificarToken, verificarAdmin_Role],
  (req, res) => {
    // solo un administrador puede borrar

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      if (!categoriaDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'El id no existe'
          }
        });
      }

      res.json({
        ok: true,
        mensaje: 'categoria eliminada'
      });
    });
  }
);

module.exports = app;
