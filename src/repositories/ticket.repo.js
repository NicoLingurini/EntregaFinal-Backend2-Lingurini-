export class TicketRepository {
  constructor(dao) { this.dao = dao; }
  create(data) { return this.dao.create(data); }
  getByCode(code) { return this.dao.findByCode(code); }
}
