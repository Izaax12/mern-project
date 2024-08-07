import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js'
 
export const test = (req, res) => {
    res.json({message: 'The API is working'}); 
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'No puedes modificar este usuario'));
    }
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(errorHandler(400, 'La contraseña debe tener al menos 6 caracteres'));
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
      if (req.body.username.length < 7 || req.body.username.length > 20) {
        return next(
          errorHandler(400, 'Username debe ser entre 7 y 20 caracteres')
        );
      }
      if (req.body.username.includes(' ')) {
        return next(errorHandler(400, 'Username no puede contener espacio'));
      }
      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, 'Username debe ser minusculas'));
      }
      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(
          errorHandler(400, 'Username solo puede contener letras y numeros')
        );
      }
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

export const deleteUser = async (req, res, next) => {
  if(req.user.id !== req.params.userId){
    return next(errorHandler(403, 'No tienes permisos para borrar este usuario'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('El usuario ha sido borrado exitosamente');
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) =>{
  try{
    res.clearCookie('access_token').status(200).json('Usuario ha cerrado sesion');
  }catch(error){
    next(error);
  }
};