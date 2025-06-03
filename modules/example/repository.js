import IRepository from '../../core/repository.js';
import Example from './model.js';

export class IExampleRepository extends IRepository {
  constructor() {
    super(Example); 
  }
}

export default new IExampleRepository();
