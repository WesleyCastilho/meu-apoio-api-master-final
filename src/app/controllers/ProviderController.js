import * as Yup from 'yup';
import Provider from '../models/Provider';
import File from '../models/File';

//Começo implementar email criar conta
import Notification from '../schemas/Notification';
import AccountCreateMail from '../jobs/AccountCreateMail';
import Queue from '../../lib/Queue';

class ProviderController {
    async index(req, res) {
        const providers = await Provider.findAll({
            attributes: ['id', 'fullname', 'email', 'avatar_id', 'provider'],
            include: {
                model: File,
                as: 'avatar',
                attributes: ['name', 'path', 'url'],
            },
        })
        return res.json(providers)
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
        const ProviderExist = await Provider.findOne({
            where: { email: req.body.email },
        });
        if (ProviderExist) {
            return res.status(400).json({ error: 'usuario já existe' });
        }

        const { fullname, email, provider, password } = req.body;

        const profissional  = await Provider.create({
            fullname,
            email,
            provider,
            password,
        });

        // await Notification.create({
        //     content: `Novo Conta criada de ${fullname} codigo ${id}}`,
        //     provider: email,
        // });

        await Queue.add(AccountCreateMail.key, {
            profissional,
        });

        return res.json(profissional);
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

        const { email, oldPassword } = req.body;

        const provider = await Provider.findByPk(req.providerId);

        if (email !== provider.email) {
            const providerExists = await Provider.findOne({ where: { email } });

            if (providerExists) {
                return res.status(400).json({ error: 'Provider already exists.' });
            }
        }

        if (oldPassword && !(await provider.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        await provider.update(req.body);

        const { id, fullname, avatar } = await Provider.findByPk(req.providerId, {
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url'],
                },
            ],
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

export default new ProviderController();
