import { TicketModel } from '../../models/ticket.model.js';

export class TicketDAO {
  async create(data) { return TicketModel.create(data); }
  async findByCode(code) { return TicketModel.findOne({ code }); }
}
