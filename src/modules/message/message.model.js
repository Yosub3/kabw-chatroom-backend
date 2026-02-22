module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        modelName: 'Message',
        tableName: 'messages',
        timestamps: true,
        underscored: true
    })

    Message.associate = (models) => {
        Message.belongsTo(models.User, { 
            foreignKey: 'user_id', 
            as: 'user' 
        });
    }

    return Message;
}