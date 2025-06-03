import { DataTypes } from 'sequelize';
import sequelize from '../../MyDbContext.js'; 
import { v4 as uuidv4 } from 'uuid';

const Example  = sequelize.define(
  'Example',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'Examples',
    timestamps: true,     
    paranoid: true,      
  }
);

export default Example;
