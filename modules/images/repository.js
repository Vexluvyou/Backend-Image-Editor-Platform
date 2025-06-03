import IRepository from '../../core/repository.js';
import Image from './model.js';

export class IImageRepository extends IRepository {
  constructor() {
    super(Image); 
  }
}

export default new IImageRepository();

// import IRepository from '../../core/repository.js';
// import Image from './model.js';
// import User from '../user/model.js';
// import { v2 as cloudinary } from 'cloudinary';
// import sequelize from '../../MyDbContext.js';

// export class IImageRepository extends IRepository {
//   constructor() {
//     super(Image);
//   }

//   // Additional methods specific to Image repository
//   async getAll(limit = 9, page = 1, searchQuery = '') {
//     try {
//       // Configure cloudinary
//       cloudinary.config({
//         cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET,
//         secure: true,
//       });

//       const offset = (page - 1) * limit;
//       let query = {};

//       // If searchQuery is provided, search in cloudinary and filter by resulting public IDs
//       if (searchQuery) {
//         const expression = `folder=imaginify AND ${searchQuery}`;
//         const { resources } = await cloudinary.search
//           .expression(expression)
//           .execute();

//         const resourceIds = resources.map(resource => resource.public_id);
        
//         if (resourceIds.length > 0) {
//           query = {
//             where: {
//               publicId: resourceIds
//             }
//           };
//         } else {
//           // No matches found in cloudinary
//           return {
//             data: [],
//             totalPages: 0,
//             savedImages: 0
//           };
//         }
//       }

//       // Get images with pagination
//       const images = await Image.findAll({
//         ...query,
//         limit,
//         offset,
//         order: [['updatedAt', 'DESC']],
//         include: [{
//           model: User,
//           as: 'author',
//           attributes: ['id', 'firstName', 'lastName']
//         }]
//       });

//       // Count total images matching query
//       const totalImages = await Image.count(query);
      
//       // Count all saved images
//       const savedImages = await Image.count();

//       return {
//         data: images,
//         totalPages: Math.ceil(totalImages / limit),
//         savedImages
//       };
//     } catch (error) {
//       throw error;
//     }
//   }

//   async getUserImages(userId, limit = 9, page = 1) {
//     try {
//       const offset = (page - 1) * limit;
      
//       const images = await Image.findAll({
//         where: { userId },
//         limit,
//         offset,
//         order: [['updatedAt', 'DESC']],
//         include: [{
//           model: User,
//           as: 'author',
//           attributes: ['id', 'firstName', 'lastName']
//         }]
//       });

//       const totalImages = await Image.count({
//         where: { userId }
//       });

//       return {
//         data: images,
//         totalPages: Math.ceil(totalImages / limit)
//       };
//     } catch (error) {
//       throw error;
//     }
//   }
  
//   async addImage(imageData, userId) {
//     try {
//       const user = await User.findByPk(userId);
      
//       if (!user) {
//         throw new Error("User not found");
//       }
      
//       const newImage = await Image.create({
//         ...imageData,
//         userId
//       });
      
//       // Fetch the created image with author information
//       const imageWithAuthor = await Image.findByPk(newImage.id, {
//         include: [{
//           model: User,
//           as: 'author',
//           attributes: ['id', 'firstName', 'lastName']
//         }]
//       });
      
//       return imageWithAuthor;
//     } catch (error) {
//       throw error;
//     }
//   }
  
//   async updateImage(imageData, userId) {
//     try {
//       const imageToUpdate = await Image.findByPk(imageData.id);
      
//       if (!imageToUpdate) {
//         throw new Error("Image not found");
//       }
      
//       if (imageToUpdate.userId !== userId) {
//         throw new Error("Unauthorized to update this image");
//       }
      
//       // Update the image
//       await imageToUpdate.update(imageData);
      
//       // Fetch the updated image with author information
//       const updatedImage = await Image.findByPk(imageData.id, {
//         include: [{
//           model: User,
//           as: 'author',
//           attributes: ['id', 'firstName', 'lastName']
//         }]
//       });
      
//       return updatedImage;
//     } catch (error) {
//       throw error;
//     }
//   }

//   // For database associations
//   setupAssociations() {
//     // Set up association with User model
//     Image.belongsTo(User, { 
//       foreignKey: 'userId',
//       as: 'author'
//     });
//   }
// }

// // Ensure associations are set up
// const imageRepository = new IImageRepository();
// imageRepository.setupAssociations();

// export default imageRepository;