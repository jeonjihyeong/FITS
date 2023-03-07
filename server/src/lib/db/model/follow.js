const {DataTypes, Sequelize} = require('sequelize');

const create = async (sequelize) => {
    const followTable = await sequelize.define('follow', {
        // Model attributes are defined here
        followIdx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            onDelete: 'CASCADE',
        },
        following: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'userIdx',
            },
            allowNull: false,
        },
        follower: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'userIdx',
            },
            allowNull: false,
        },
    }, {
        // Other model options go here   timestamps: false,
        freezeTableName: true,
        timestamps: false,
    });

    followTable.associate = function (models) {
        followTable.belongsTo(models.user, {
            foreignKey: 'userIdx',
            onDelete: "CASCADE"
        });
        
        followTable.belongsTo(models.user, {
            foreignKey: 'userIdx',
            onDelete: "CASCADE"
        });
    };

    return followTable;
}
module.exports = create;  