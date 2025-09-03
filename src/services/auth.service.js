import bcrypt from 'bcrypt';
import { signToken } from '../utils/jwt.js';
import { UserRepository } from '../repositories/user.repo.js';
import { UserDAO } from '../daos/mongo/user.dao.js';

const userRepo = new UserRepository(new UserDAO());

export const AuthService = {
  async register({ first_name, last_name, email, age, password, cart, role }) {
    const exist = await userRepo.getByEmail(email);
    if (exist) throw new Error('Email ya registrado');
    const hash = bcrypt.hashSync(password, 10);
    const user = await userRepo.create({ first_name, last_name, email, age, password: hash, cart: cart || null, role: role || 'user' });
    return user;
  },

  async login({ email, password }) {
    const user = await userRepo.getByEmail(email);
    if (!user) throw new Error('Credenciales inválidas');
    const ok = bcrypt.compareSync(password, user.password);
    if (!ok) throw new Error('Credenciales inválidas');
    const token = signToken({ uid: user._id, email: user.email, role: user.role });
    return { user, token };
  }
};
