
const userModel = require('../models/login'); 
const { matchedData } = require('express-validator');
const {encrypt} = require("../utils/handlePassword");
const {compare} = require("../utils/handlePassword");
const {handleHttpError} = require("../utils/handleError");
const { tokenSign } = require("../utils/handleJwt");



exports.registerCtrl = async (req, res) => {
  try {
      console.log("Datos recibidos en el cuerpo:", req.body);

      const userExists = await userModel.findOne({ username: req.body.username });

      if (userExists) {
          return res.status(400).send({ error: 'El correo ya está registrado' });
      }

      let data = matchedData(req);
      console.log("Datos después de matchedData:", data);

      if (!data.password) {
          return res.status(400).send({ error: 'La contraseña es requerida' });
      }
      console.log("Contraseña antes de encriptar:", data.password)
      data.password = await encrypt(data.password);

      const dataUser = await userModel.create(data);

      return res.status(201).json({
          token: await tokenSign(dataUser),
          user: dataUser,
      });
      
  } catch (err) {
      console.log("Error en el registro:", err);
      handleHttpError(res, "ERROR_REGISTER_USER");
  }
};



exports.loginCtrl = async (req, res) => {
  try {
      const user = await userModel.findOne({ username: req.body.username }).select("password username");
      
      if(!user){
          handleHttpError(res, "USER_NOT_EXISTS");
          return;
      }
      
      const hashPassword = user.password;
      const check = await compare(req.body.password, hashPassword);
      if(!check){
          handleHttpError(res, "INVALID_PASSWORD");
          return;
      }
      
     
      return  res.status(200).json({
          token: await tokenSign(user),
          user
      });

     
      
  } catch(err){
      console.log(err);
      handleHttpError(res, "ERROR_LOGIN_USER");
  }
}