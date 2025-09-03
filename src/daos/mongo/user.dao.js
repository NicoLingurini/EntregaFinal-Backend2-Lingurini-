import { UserModel } from '../../models/user.model.js';

export class UserDAO {
  async findById(id) { return UserModel.findById(id); }
  async findByEmail(email) { return UserModel.findOne({ email }); }
  async create(data) { return UserModel.create(data); }
  async updateById(id, data) { return UserModel.findByIdAndUpdate(id, data, { new: true }); }
  async deleteById(id) { return UserModel.findByIdAndDelete(id); }
  async findAll() { return UserModel.find(); }
}
