export class UserRepository {
  constructor(dao) { this.dao = dao; }
  getById(id) { return this.dao.findById(id); }
  getByEmail(email) { return this.dao.findByEmail(email); }
  create(data) { return this.dao.create(data); }
  update(id, data) { return this.dao.updateById(id, data); }
  delete(id) { return this.dao.deleteById(id); }
  list() { return this.dao.findAll(); }
}
