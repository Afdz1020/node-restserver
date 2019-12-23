// ======================
// Puerto
// ======================
process.env.PORT = process.env.PORT || 3000;

// ======================
// Entorno
// ======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ======================
// Vencimiento del token
// ======================

process.env.CADUCIDAD_TOKEN = '48h';

// ======================
// SEED de autenticacion
// ======================

process.env.SEED = process.env.SEED || 'este-es-el-send-desarrollo';
// ======================
// Base de datos
// ======================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://diaz:diaz123456@ds135335.mlab.com:35335/diaz-test';
} else {
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ======================
// Google Client ID
// ======================

process.env.CLIENT_ID =
  process.env.CLIENT_ID ||
  '982249685867-t1k8ab63gi51jfvak4kokg0s7ut9thkv.apps.googleusercontent.com';
