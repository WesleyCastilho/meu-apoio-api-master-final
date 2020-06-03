import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Provider extends Model {
    
    static init(sequelize) {
        
        super.init(
            {
                fullname: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                provider: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
            
        );
        this.addHook('beforeSave', async provider => {
            if (provider.password) {
                provider.password_hash = await bcrypt.hash(provider.password, 8);
            }
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
    
}

export default Provider;
