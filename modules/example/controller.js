import IExampleRepository from './repository.js';
import { BadRequest, ItemNotFound,InternalServerError,NotFound } from '../../utills/status/error.js';

class ProductController {

  // ========== GET ========== // 
  /**
 * @swagger
 * /example:
 *   get:
 *     summary: Get all examples
 *     responses:
 *       200:
 *         description: A list of examples
 */
  async Gets(req, res) {
    try {
      const items = await IExampleRepository.getAll();

      if (items.length === 0) {
        return res.status(new ItemNotFound().statusCode).json([]);
      }
      return res.status(200).json(items);

    } catch (error) {
      console.error(error);
      return res.status(new InternalServerError().statusCode).json({ message: new InternalServerError().message});
    }
  }

  // ========== GETs ========== // 
  async Get(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(new NotFound().statusCode).json({ message: new NotFound().message });
    }

    const item = await IExampleRepository.getSingle({ id });

    if (!item) {
      return res.status(new ItemNotFound().statusCode).json({message: new ItemNotFound().message});
    }

    return res.status(200).json(item);

  } catch (error) {
    console.error( error);
    return res.status(new InternalServerError().statusCode).json({ message: new InternalServerError().message});
    }
  }

 // ========== POST ========== // 
  async Insert(req, res) {
    try {
      const { name} = req.body;

      if (!name ) {
        return res.status(new BadRequest().statusCode).json({ message: new BadRequest().message });
      }

      const item = await IExampleRepository.add({ name});

      res.status(200).json(item);

    } catch (error) {
      console.error(error);
     return res.status(new InternalServerError().statusCode).json({ message: new InternalServerError().message});
    }
  }

  
  // ========== UPDATE ========== // 
  async Update(req, res) {
    try {
      const { id } = req.params; 
      const { name} = req.body; 
  
      if (!id) {
         return res.status(new NotFound().statusCode).json({ message: new NotFound().message });
      }

      if (!name) {
        return res.status(new BadRequest().statusCode).json({ message: new BadRequest().message });
      }
  
      const item = await IExampleRepository.getSingle({ id }); 
      if (!item) {
        return res.status(new ItemNotFound().statusCode).json({message: new ItemNotFound().message});
      }

      const updatedItem = await IExampleRepository.update(id, { name});
  
      return res.status(200).json(updatedItem);
    } catch (error) {
     return res.status(new InternalServerError().statusCode).json({ message: new InternalServerError().message});
    }
  }
  

  // ========== DELETE ========== // 
  async Delete(req, res) {
    try {
      const { id } = req.params;
  
      if (!id) {
         return res.status(new BadRequest().statusCode).json({ message: new BadRequest().message });
      }
  
      const item = await IPaymentRepository.getSingle({ id });
      if (!item) {
        return res.status(new ItemNotFound().statusCode).json({message: new ItemNotFound().message});
      }
  
      await IExampleRepository.remove(id);
  
      return res.status(200).json({ message: 'Successfully' });
    } catch (error) {
     return res.status(new InternalServerError().statusCode).json({ message: new InternalServerError().message});
    }
  }
}

export default new ProductController();
