import IRepository from '../../core/repository.js';
import User from './model.js'; 

export class IUserRepository extends IRepository {
  constructor() {
    super(User); 
  }
}

export default new IUserRepository();
