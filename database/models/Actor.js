const sequelize = require("sequelize");
const { config } = require("../../.sequelizerc");

module.exports = (sequelize, dataTypes) =>{
    let alias = 'Actors';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3,1),
            allowNull: false
        },
        favorite_movie_id:{
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'actors',
        timestamps: false
    };

    const Actor = sequelize.define(alias, cols, config);

    Actor.associate = function(models){
        Actor.belongsToMany(models.Movies, {
            as:'movies',
            through:'actor_movie',
            foreignKey:'actor_id',
            otherKey: 'movie_id',
            timestamps:false
        })
    }

    return Actor   
}