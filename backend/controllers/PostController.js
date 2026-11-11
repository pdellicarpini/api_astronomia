import mongoose from 'mongoose';
import PostModel from '../models/postModel.js';
import UserModel from '../models/userModel.js';

class PostController {
    async getPosts(req, res) {
        try {
            const { authorId, category } = req.query;
            const filteredPosts = {};

            if (authorId) {
                if (!mongoose.isValidObjectId(authorId)) {
                    return res.status(400).json({ msg: 'El ID del usuario proporcionado no es válido.', data: {} });
                }

                const userExists = await UserModel.exists({ _id: authorId });
                if (!userExists) {
                    return res.status(404).json({ msg: 'El usuario con el ID proporcionado no existe.', data: {} });
                }

                filteredPosts.author = authorId;
            }

            if (category) {
                filteredPosts.category = category;
            }

            const posts = await PostModel.find(filteredPosts)
                .populate({
                    path: 'author', 
                    select:'name profileImg level',
                    populate: {
                        path: 'level',
                        select: 'name'
                    }
                })
                .sort({ createdAt: -1 });

            return res.status(200).json({ msg: 'Posteos encontrados.', data: { posts } });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'No fue posible obtener los posteos.', data: {} });
        }
    }

    async getPostById(req, res) {
        try {
            const id = req.params.id;

            // validar ID 
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ msg: 'El ID proporcionado no es válido.', data: {} });
            }

            const post = await PostModel.findById(id)
                .populate('author', 'name profileImg level')
                .populate('comments.author', 'name profileImg level');

            if (post) {
                return res.status(200).json({ msg: 'Post encontrado.', data: { post } });
            } else {
                return res.status(404).json({ msg: 'Post no encontrado.', data: {} });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas.', data: {} });
        }
    }

    async postPost(req, res) {
        try {
            const { title, category, body } = req.body;

            if (!title || !category || !body) {
                return res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar.', data: {} });
            }

            // guardar post
            const newPost = new PostModel({ title, category, body, author: req.user.id });
            await newPost.save();
            await newPost.populate('author', 'name profileImg level');

            return res.status(201).json({ msg: 'Posteo creado exitosamente.', data: { question: newPost } });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    msg: 'Los datos ingresados no son válidos.',
                    errors: Object.values(error.errors).map((e) => e.message),
                });
            }

            console.error(error);
            return res.status(500).json({ msg: 'No se pudo guardar el post.', data: {} });
        }
    }

    async toggleLike(req, res) {
        try {
            const id = req.params.id;
            const userId = req.user.id;

            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ msg: 'El ID proporcionado no es válido.', data: {} });
            }

            const post = await PostModel.findById(id);
            if (!post) {
                return res.status(404).json({ msg: 'Post no encontrado.', data: {} });
            }

            const alreadyLiked = post.likes.some(like => like.equals(userId));

            const updated = await PostModel.findByIdAndUpdate(
                id,
                alreadyLiked ? { $pull: { likes: userId } } : { $addToSet: { likes: userId } },
                { new: true }
            );

            return res.status(200).json({ msg: 'Me gusta actualizado.', data: { likes: updated.likes } });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas.', data: {} });
        }
    }

    async postComment(req, res) {
        try {
            const id = req.params.id;
            const { body } = req.body;

            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ msg: 'El ID proporcionado no es válido.', data: {} });
            }

            if (!body || !body.trim()) {
                return res.status(400).json({ msg: 'El comentario no puede estar vacío.', data: {} });
            }

            const post = await PostModel.findById(id);
            if (!post) {
                return res.status(404).json({ msg: 'Post no encontrado.', data: {} });
            }

            post.comments.push({ author: req.user.id, body });
            await post.save();
            await post.populate('comments.author', 'name profileImg level');

            return res.status(201).json({ msg: 'Comentario agregado.', data: { comments: post.comments } });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    msg: 'Los datos ingresados no son válidos.',
                    data: { errors: Object.values(error.errors).map((e) => e.message) }
                });
            }

            console.error(error);
            return res.status(500).json({ msg: 'No se pudo guardar el comentario.', data: {} });
        }
    }

    async reportPost(req, res) {
        try {
            const id = req.params.id;
            const userId = req.user.id;

            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ msg: 'El ID proporcionado no es válido.', data: {} });
            }

            const post = await PostModel.findById(id);
            if (!post) {
                return res.status(404).json({ msg: 'Post no encontrado.', data: {} });
            }

            if (post.author.equals(userId)) {
                return res.status(400).json({ msg: 'No podés reportar tu propia publicación.', data: {} });
            }

            if (post.reports.some(r => r.equals(userId))) {
                return res.status(409).json({ msg: 'Ya reportaste esta publicación.', data: {} });
            }

            post.reports.push(userId);
            await post.save();

            return res.status(200).json({ msg: 'Publicación reportada.', data: {} });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas.', data: {} });
        }
    }

    async deletePost(req, res) {
        try {
            const id = req.params.id;

            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ msg: 'El ID proporcionado no es válido.', data: {} });
            }

            const post = await PostModel.findById(id);
            if (!post) {
                return res.status(404).json({ msg: 'Post no encontrado.', data: {} });
            }

            const isOwner = post.author.equals(req.user.id);
            if (!isOwner && req.user.role !== 'admin') {
                return res.status(403).json({ msg: 'No tenés permiso para borrar esta publicación.', data: {} });
            }

            await post.deleteOne();

            return res.status(200).json({ msg: 'Publicación eliminada.', data: {} });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas.', data: {} });
        }
    }

    async getMyComments(req, res) {
        try {
            const userId = req.user.id;
            const posts = await PostModel.find({ 'comments.author': userId }).select('title comments');

            const comments = posts.flatMap(post =>
                post.comments
                    .filter(comment => comment.author.equals(userId))
                    .map(comment => ({
                        _id: comment._id,
                        body: comment.body,
                        createdAt: comment.createdAt,
                        post: { _id: post._id, title: post.title }
                    }))
            );

            return res.status(200).json({ msg: 'Comentarios obtenidos.', data: { comments } });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas.', data: {} });
        }
    }
}

export default PostController;