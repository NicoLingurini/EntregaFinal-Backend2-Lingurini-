export class CartRepository {
  constructor(dao) { this.dao = dao; }
  getById(id) { return this.dao.findById(id); }
  create(data) { return this.dao.create(data); }
  update(id, data) { return this.dao.updateById(id, data); }
}
