import IImageRepository from './repository.js';
import {
  BadRequest,
  ItemNotFound,
  InternalServerError,
  NotFound,
} from '../../utills/status/error.js';

class ImageController {
  // ========== GET ALL IMAGES ========== // 
  async Gets(req, res) {
    try {
      const items = await IImageRepository.getAll();
      return res.status(200).json(items);
    } catch (error) {
      console.error(error);
      return res
        .status(new InternalServerError().statusCode)
        .json({ message: new InternalServerError().message });
    }
  }

  // ========== GET SINGLE IMAGE ========== // 
  async Get(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(new NotFound().statusCode)
          .json({ message: new NotFound().message });
      }

      const item = await IImageRepository.getSingle({ id });

      if (!item) {
        return res
          .status(new ItemNotFound().statusCode)
          .json({ message: new ItemNotFound().message });
      }

      return res.status(200).json(item);
    } catch (error) {
      console.error(error);
      return res
        .status(new InternalServerError().statusCode)
        .json({ message: new InternalServerError().message });
    }
  }

  // ========== INSERT IMAGE ========== // 
  async Insert(req, res) {
    try {
      const { images } = req.body;

      if (!images) {
        return res.status(new BadRequest().statusCode).json({ message: new BadRequest().message });
      }

      const item = await IImageRepository.add({ images });

      res.status(200).json(item);

    } catch (error) {
      console.error(error);
      return res.status(new InternalServerError().statusCode).json({ message: new InternalServerError().message });
    }
  }
  // ========== UPDATE IMAGE ========== // 
  async Update(req, res) {
    try {
      const { id } = req.params;
      const { images } = req.body;

      if (!id) {
        return res
          .status(new NotFound().statusCode)
          .json({ message: new NotFound().message });
      }

      if (!images) {
        return res
          .status(new BadRequest().statusCode)
          .json({ message: new BadRequest().message });
      }

      const existing = await IImageRepository.getSingle({ id });

      if (!existing) {
        return res
          .status(new ItemNotFound().statusCode)
          .json({ message: new ItemNotFound().message });
      }

      const updated = await IImageRepository.update(id, { images });
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res
        .status(new InternalServerError().statusCode)
        .json({ message: new InternalServerError().message });
    }
  }

  // ========== DELETE IMAGE ========== // 
  async Delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(new BadRequest().statusCode)
          .json({ message: new BadRequest().message });
      }

      const existing = await IImageRepository.getSingle({ id });

      if (!existing) {
        return res
          .status(new ItemNotFound().statusCode)
          .json({ message: new ItemNotFound().message });
      }

      await IImageRepository.remove(id);
      return res.status(200).json({ message: 'Successfully deleted.' });
    } catch (error) {
      console.error(error);
      return res
        .status(new InternalServerError().statusCode)
        .json({ message: new InternalServerError().message });
    }
  }
}

export default new ImageController();

// import IImageRepository from './repository.js';
// import { BadRequest, ItemNotFound, InternalServerError, NotFound, Unauthorized } from '../../utills/status/error.js';
// import { v2 as cloudinary } from 'cloudinary';

// class ImageController {
//   // ========== GET ALL IMAGES ========== //
//   /**
//    * @swagger
//    * /images:
//    *   get:
//    *     summary: Get all images with optional search and pagination
//    *     parameters:
//    *       - in: query
//    *         name: limit
//    *         schema:
//    *           type: integer
//    *           default: 9
//    *         description: Number of images per page
//    *       - in: query
//    *         name: page
//    *         schema:
//    *           type: integer
//    *           default: 1
//    *         description: Page number
//    *       - in: query
//    *         name: search
//    *         schema:
//    *           type: string
//    *         description: Search query for images
//    *     responses:
//    *       200:
//    *         description: A list of images
//    */
//   async Gets(req, res) {
//     try {
//       const { limit = 9, page = 1, searchQuery = '' } = req.query;

//       const result = await IImageRepository.getAll(
//         parseInt(limit),
//         parseInt(page),
//         searchQuery
//       );

//       if (result.data.length === 0) {
//         return res.status(200).json({
//           data: [],
//           totalPages: result.totalPages,
//           savedImages: result.savedImages
//         });
//       }

//       return res.status(200).json(result);
//     } catch (error) {
//       console.error(error);
//       return res.status(new InternalServerError().statusCode).json({ message: new InternalServerError().message });
//     }
//   }

//   // ========== GET USER IMAGES ========== //
//   /**
//    * @swagger
//    * /images/user/{userId}:
//    *   get:
//    *     summary: Get images by user ID with pagination
//    *     parameters:
//    *       - in: path
//    *         name: userId
//    *         required: true
//    *         schema:
//    *           type: string
//    *         description: ID of the user
//    *       - in: query
//    *         name: limit
//    *         schema:
//    *           type: integer
//    *           default: 9
//    *         description: Number of images per page
//    *       - in: query
//    *         name: page
//    *         schema:
//    *           type: integer
//    *           default: 1
//    *         description: Page number
//    *     responses:
//    *       200:
//    *         description: A list of user's images
//    */
//   async GetUserImages(req, res) {
//     try {
//       const { userId } = req.params;
//       const { limit = 9, page = 1 } = req.query;

//       if (!userId) {
//         return res.status(new BadRequest().statusCode).json({ message: 'User ID is required' });
//       }

//       const result = await IImageRepository.getUserImages(
//         userId,
//         parseInt(limit),
//         parseInt(page)
//       );

//       return res.status(200).json(result);
//     } catch (error) {
//       console.error(error);
//       return res.status(new InternalServerError().statusCode).json({ message: new InternalServerError().message });
//     }
//   }

//   // ========== GET SINGLE IMAGE ========== //
//   /**
//    * @swagger
//    * /images/{id}:
//    *   get:
//    *     summary: Get a single image by ID
//    *     parameters:
//    *       - in: path
//    *         name: id
//    *         required: true
//    *         schema:
//    *           type: string
//    *         description: ID of the image
//    *     responses:
//    *       200:
//    *         description: Image details
//    *       404:
//    *         description: Image not found
//    */
//   async Get(req, res) {
//     try {
//       const { id } = req.params;

//       if (!id) {
//         return res.status(new NotFound().statusCode).json({ message: new NotFound().message });
//       }

//       const image = await IImageRepository.getSingle({ id });

//       if (!image) {
//         return res.status(new ItemNotFound().statusCode).json({ message: 'Image not found' });
//       }

//       return res.status(200).json(image);
//     } catch (error) {
//       console.error(error);
//       return res.status(new InternalServerError().statusCode).json({ message: new InternalServerError().message });
//     }
//   }

//   // ========== ADD IMAGE ========== //
//   /**
//    * @swagger
//    * /images/add:
//    *   post:
//    *     summary: Add a new image with transformation
//    *     requestBody:
//    *       required: true
//    *       content:
//    *         application/json:
//    *           schema:
//    *             type: object
//    *             required:
//    *               - image
//    *               - userId
//    *               - path
//    *             properties:
//    *               image:
//    *                 type: object
//    *                 properties:
//    *                   title:
//    *                     type: string
//    *                   transformationType:
//    *                     type: string
//    *                   publicId:
//    *                     type: string
//    *                   secureURL:
//    *                     type: string
//    *                   width:
//    *                     type: integer
//    *                   height:
//    *                     type: integer
//    *                   transformationURL:
//    *                     type: string
//    *                   aspectRatio:
//    *                     type: string
//    *                   color:
//    *                     type: string
//    *                   prompt:
//    *                     type: string
//    *                   config:
//    *                     type: object
//    *               userId:
//    *                 type: string
//    *               path:
//    *                 type: string
//    *     responses:
//    *       200:
//    *         description: Added image
//    *       400:
//    *         description: Bad request
//    */
//   async AddImage(req, res) {
//     try {
//       const { image, userId, path } = req.body;

//       if (
//         !image.title ||
//         !image.transformationType ||
//         !image.publicId ||
//         !image.secureUrl
//       ) {
//         return res.status(400).json({ message: 'Missing required fields' });
//       }

//       const newImage = await IImageRepository.addImage({ image, userId, path });

//       return res.status(200).json(newImage);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   }
// } // 👈 CLOSE the class here

// export default new ImageController(); // 👈 EXPORT outside the class
