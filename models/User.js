const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        is: /^[a-zA-Z0-9_-]+$/i,
      },
    },
    displayName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z0-9!_\- ]+$/,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: [8],
<<<<<<< HEAD
        is: /^[a-zA-Z0-9#$@!%*?^&()\-_+=<>[\]{}|;:'",./\\~`\s]*$/,
=======
        is: /^[a-zA-Z0-9#$@!%*?^&()\-_+=<>[\]{}|;:'",./\\~`\s]*$/i,
>>>>>>> cf1f2b2f8316b4b41cd3eaa9656d94cafc9a0354
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
