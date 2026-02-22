module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
        underscored: true
    })

    User.associate = (models) => {
        User.hasMany(models.Message, { 
            foreignKey: 'user_id', 
            as: 'user_message' 
        });
    }

    return User;
}