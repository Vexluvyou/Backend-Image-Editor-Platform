import { DataTypes } from 'sequelize';
import sequelize from '../../MyDbContext.js';
import { v4 as uuidv4 } from 'uuid';

const Payment = sequelize.define(
  'Payment',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subscription_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_card: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last4_card: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_billed_at: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    next_billed_at: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billing_interval: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Payments',
    timestamps: true,
    paranoid: true,
  }
);

export default Payment;
