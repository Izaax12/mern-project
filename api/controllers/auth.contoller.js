import User from '../models/user.model.js';
import bcrypt from 'bcrypt'; 
import bcryptjs from 'bcryptjs'; 
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async(req, res, next) =>{
    const { username, email, password } = req.body;
    const saltRounds = 10;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        next(errorHandler(400, 'All fields are required'));
    }

    //const hashedPassword = await bcrypt.hashSync(User.password, saltRounds);
    const hashedPassword = await bcryptjs.hashSync(password, saltRounds);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try{
        await newUser.save();
        res.json({message: 'Signup successful'});
    }catch(error){
       next(error);
    }    
}

export const signin = async(req, res, next) =>{
    const {email, password} = req.body;
    if(!email || !password || email === ' ' || password === ' '){
        next(errorHandler(400, 'Todos los campos son requeridos'));
    }
    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404, 'Usuario no encontrado!'));
        }
        const validPwd = bcryptjs.compareSync(password, validUser.password);
        if(!validPwd){
            return next(errorHandler(400, 'Contraseña Invalida!!'));
        }
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET,);
        const {password: pwd, ...rest} = validUser._doc;
        res.status(200).cookie('acces token', token,{httpOnly: true,}).json(rest);
    } catch (error) {
        next(error);
    }
}