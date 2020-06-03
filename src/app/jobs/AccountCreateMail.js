import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class AccountCreateMail {
    get key() {
        return 'AccountCreateMail';
    }

    async handle({ data }) {
        const { appointment } = data;

        console.log('a fila anda');

        await Mail.sendMail({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'Agendamento cancelado',
            template: 'cancellation',
            context: {
                provider: appointment.provider.name,
                user: appointment.user.name,
                date: format(
                    parseISO(appointment.date),
                    "'dia' d 'de' MMMM', às 'H:mm'h'",
                    {
                        locale: pt,
                    }
                ),
            },
        });
    }
}

export default new AccountCreateMail();
