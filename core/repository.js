export class IRepository {
  
  getAll() {}
  existed(predicate) {}
  getSingle(predicate) {}
  findBy(predicate) {}
  add(entity) {}
  update(id, entity) {}
  remove(id) {}
  removes(predicate) {}
  commit() {}
}

export class Repository extends IRepository {
  constructor(context) {
    super();
    this.context = context; 
  }

  async getAll() {
    return await this.context.findAll();
  }

  async existed(predicate) {
    return await this.context.count({ where: predicate }) > 0;
  }

  async getSingle(predicate) {
    return await this.context.findOne({ where: predicate });
  }

  async findBy(predicate) {
    return await this.context.findAll({ where: predicate });
  }

  async add(entity) {
    return await this.context.create(entity);
  }

  async update(id, entity) {
    await this.context.update(entity, { where: { id } });
    return await this.getSingle({ id });
  }

  async remove(id) {
    const entity = await this.getSingle({ id });
    if (entity) {
      await entity.destroy();
    }
  }

  async removes(predicate) {
    await this.context.destroy({ where: predicate });
  }

  async commit() {
    console.log('Commit not required. Sequelize auto-commits changes.');
  }
}

export default Repository;
