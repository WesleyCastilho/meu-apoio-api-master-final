import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

//Começo implementar email criar conta
import Notification from '../schemas/Notification';
import AccountCreateMail from '../jobs/AccountCreateMail';
import Queue from '../../lib/Queue';

class UserController {
    async index(req, res) {
        const users = await User.findAll({
            attributes: ['id', 'fullname', 'email', 'avatar_id', 'provider'],
            include: {
                model: File,
                as: 'avatar',
                attributes: ['name', 'path', 'url'],
            },
        });

        return res.json(users);
    }

    async getProvider(req, res){
        const { page = 1 } = req.query;

        const users = await User.findAll({
            attributes: ['id', 'fullname', 'email', 'avatar_id', 'provider'],
            where: { provider: 't' },
            order: ['id'],
            limit: 20,
            offset: (page - 1) * 20,
            include: {
                model: File,
                as: 'avatar',
                attributes: ['name', 'path', 'url'],
            },
        });
        return res.json(users)
    }

    async show(req, res) {
        const users = await User.findByPk(req.params.id, {
            attributes: ['id', 'fullname', 'email', 'avatar_id', 'provider', 'role','about', 'telephone'],
            include: [{
                model: File,
                as: 'avatar',
                attributes: ['id', 'path', 'url'],
            }, ],
        });
        return res.json(users);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            fullname: Yup.string().required(),
            email: Yup.string()
                .required()
                .email(),
            password: Yup.string()
                .required()
                .min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
        const UserExist = await User.findOne({
            where: { email: req.body.email },
        });
        if (UserExist) {
            return res.status(400).json({ error: 'usuario já existe' });
        }

        const { fullname, email, provider, password } = req.body;

        const user = await User.create({
            fullname,
            email,
            provider,
            password,
        });

        // await Notification.create({
        //     content: `Novo Conta criada de ${fullname} codigo ${id}}`,
        //     user: email,
        // });

        await Queue.add(AccountCreateMail.key, {
            user,
        });

        return res.json(user);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            fullname: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const { 
            email, 
            oldPassword,
            password_hash,
            provider,
            created_at, 
            updated_at,
            avatar_id,
            about,
            telephone,
            role,
        } = req.body;

        const user = await User.findByPk(req.userId);

        if (email !== user.email) {
            const userExists = await User.findOne({ where: { email } });

            if (userExists) {
                return res.status(400).json({ error: 'User already exists.' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        await user.update(req.body);

        const { id, fullname, avatar } = await User.findByPk(req.userId, {
            include: [{
                model: File,
                as: 'avatar',
                attributes: ['id', 'path', 'url'],
            }, ],
        });

        if (avatar === null) {
            const defaultAvatar = {
                url: 'https://api.adorable.io/avatars/50/abott@adorable.png',
            };
            return res.json({
                id,
                fullname,
                email,
                avatar: defaultAvatar,
            });
        }

        return res.json({
            id,
            fullname,
            email,
            avatar,
            
        });
    }
}

export default new UserController();
