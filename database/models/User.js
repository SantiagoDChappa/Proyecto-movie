module.exports = (sequelize, DataTypes) =>{
    let alias = 'Users';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        rol: {
            type: DataTypes.NUMBER
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    return User   
}