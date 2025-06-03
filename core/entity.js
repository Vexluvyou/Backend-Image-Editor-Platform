import { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export class Entity extends Model {
  constructor() {
    super();
    this.Id = uuidv4();
  }
}

export class AuditableEntity extends Entity {
  constructor() {
    super();
    this.CreatedAt = new Date();
    this.CreatedBy = null;
    this.UpdatedAt = null;
    this.UpdatedBy = null;
    this.DeletedAt = null;
    this.DeletedBy = null;
    this.InActive = false;
  }

  // Method to mark an entity as updated
  Updated(updatedBy) {
    this.UpdatedAt = new Date();
    this.UpdatedBy = updatedBy;
  }

  // Method to mark an entity as deleted
  Deleted(deletedBy) {
    this.DeletedAt = new Date();
    this.DeletedBy = deletedBy;
    this.InActive = true;
  }
}