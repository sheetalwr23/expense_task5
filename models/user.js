const Sequelize = require("sequelize");
const sequelize_db = require("../util/expense");
const user = sequelize_db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

user.associate = (models) => {
  user.hasMany(models.Expense, {
    foreignKey: "userId",
  });
};

module.exports = user;
