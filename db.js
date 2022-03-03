const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/db');

const Boba = sequelize.define('boba',{
    name: {
        type: Sequelize.STRING,
    },
});

Boba.createName = (name) => Boba.create({name});

const syncAndSeed = async() => {
    await sequelize.sync({ force: true });
    const [jooy, wampo, kft, gongcha, truedan, yayas] = await Promise.all(
        ['jooy', 'wampo', 'kft', 'gongcha', 'truedan', 'yayas'].map(Boba.createName));
};

module.exports = {
    models: {
        Boba
    },
    syncAndSeed
};
