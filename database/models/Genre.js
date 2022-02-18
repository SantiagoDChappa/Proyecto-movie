const sequelize = require("sequelize");
const { config } = require("../../.sequelizerc");

module.exports = (sequelize, dataTypes) =>{
    let alias = 'Genres';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        ranking: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        active: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: 'genres',
        timestamps: true,
        updatedAt: false
    };

    const Genre = sequelize.define(alias, cols, config);

        Genre.associate = (models)=>{
            Genre.hasMany(models.Movies, {
                as:'movies',
                foreignKey:'genre_id'
            })
        }
    

    return Genre   
}