export class ProductRepository {
  constructor(dao) { this.dao = dao; }
  getById(id) { return this.dao.findById(id); }
  list(filter) { return this.dao.findAll(filter); }
  create(data) { return this.dao.create(data); }
  update(id, data) { return this.dao.updateById(id, data); }
  delete(id) { return this.dao.deleteById(id); }
}
