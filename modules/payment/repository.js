import IRepository from '../../core/repository.js';
import Payment from './model.js';

export class IPaymentRepository extends IRepository {
  constructor() {
    super(Payment); 
  }
}

export default new IPaymentRepository();
