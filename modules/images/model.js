import { DataTypes } from 'sequelize';
import sequelize from '../../MyDbContext.js';
import { v4 as uuidv4 } from 'uuid';

const Image = sequelize.define(
  'Image',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    images: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  }
);

export default Image;



// import { DataTypes } from 'sequelize';
// import sequelize from '../../MyDbContext.js'; 
// import { v4 as uuidv4 } from 'uuid';

// const Image = sequelize.define('Image', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: uuidv4,
//     primaryKey: true,
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   transformationType: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   publicId: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   secureURL: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   width: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   height: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   transformationURL: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   aspectRatio: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   color: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   prompt: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
//   config: {
//     type: DataTypes.JSON,
//     allowNull: true,
//   },
//   userId: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     references: {
//       model: 'Users',
//       key: 'id'
//     }
//   },
// }, {
//   timestamps: true, // This will add createdAt and updatedAt fields
// });

// export default Image;