import User from '../models/user.model.js';
import bcrypt from 'bcrypt'; 
import bcryptjs from 'bcryptjs'; 
import { errorHandler } from '../utils/error.js';

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