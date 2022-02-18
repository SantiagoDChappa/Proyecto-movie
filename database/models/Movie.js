const sequelize = require("sequelize");
const { config } = require("../../.sequelizerc");

module.exports = (sequelize, DataTypes) =>{
    let alias = 'Movies';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL(3,1),
            allowNull: false
        },
        awards: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        release_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        length: {
            type: DataTypes.INTEGER
        },
        genre_id: {
            type: DataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'movies',
        timestamps: false
    };

    const Movie = sequelize.define(alias, cols, config);

    Movie.associate = (models)=>{
        Movie.belongsTo(models.Genres, {
            as:'genres',
            foreignKey:'genre_id'
        })

        Movie.belongsToMany(models.Actors, {
            as:'actors',
            through:'actor_movie',
            foreignKey:'movie_id',
            otherKey:'actor_id',
            timestamps: false
        })
    }

    return Movie   
}

