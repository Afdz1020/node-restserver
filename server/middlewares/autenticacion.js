const jwt = require('jsonwebtoken');

//=======================
// Verificar Token
//=======================

let verificarToken = (req, res, next) => {
  let token = req.get('token');

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ of: false, err: { message: 'Token no valido' } });
    }

    req.usuario = decoded.usuario;
    next();
  });
};

//=======================
// Verificar Admin
//=====================

let verificarAdmin_Role = (req, res, next) => {
  let usuario = req.usuario;

  if (usuario.role === 'ADMIN_ROLE') {
    next();
  } else {
    res
      .status(401)
      .json({ of: false, err: { message: 'El usuario no es administrador' } });
  }
};

//=======================
// Verificar token para imagen
//=====================

let verificarTokenImg = (req, res, next) => {
  let token = req.query.token;

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ of: false, err: { message: 'Token no valido' } });
    }

    req.usuario = decoded.usuario;
    next();
  });
};

module.exports = {
  verificarToken,
  verificarAdmin_Role,
  verificarTokenImg
};
