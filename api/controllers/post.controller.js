import { errorHandler } from "../utils/error.js";
import Post from "../models/post.model.js";

export const create = async(req, res, next) => {
    if(!req.user.isAdmin){
        return(next(errorHandler(403, 'No tienes los permisos para crear post')));
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400, 'Porfavor proporciona todos los campos requeridos'));
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, ' ');
    const newPost = new Post({
        ...req.body, slug, userId: req.user.id
    });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
}