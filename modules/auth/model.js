import { DataTypes } from 'sequelize';
import sequelize from '../../MyDbContext.js'; 
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});



User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

export default User;
