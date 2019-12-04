// ======================
// Puerto
// ======================
process.env.PORT = process.env.PORT || 3000;

// ======================
// Entorno
// ======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ======================
// Base de datos
// ======================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://diaz:diaz123456@ds135335.mlab.com:35335/diaz-test';
} else {
  urlDB =
    'mongodb+srv://andresdiaz:yMIede4xjrGu7wZU@cluster0-bu0vr.mongodb.net/cafe';
}

process.env.URLDB = urlDB;
