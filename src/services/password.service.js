import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_RESET_SECRET, JWT_RESET_EXPIRES, APP_URL } from '../config/env.js';
import { UserRepository } from '../repositories/user.repo.js';
import { UserDAO } from '../daos/mongo/user.dao.js';
import { sendMail } from './mail.service.js';

const userRepo = new UserRepository(new UserDAO());

export const PasswordService = {
  async sendResetEmail(email) {
    const user = await userRepo.getByEmail(email);
    if (!user) return;
    const token = jwt.sign({ uid: user._id, typ: 'reset' }, JWT_RESET_SECRET, { expiresIn: JWT_RESET_EXPIRES });
    const link = `${APP_URL}/api/sessions/reset-password?token=${token}`;
    const html = `
      <div style="font-family:Arial,sans-serif">
        <h2>Restablecer contraseña</h2>
        <p>Hacé clic en el botón para restablecer tu contraseña. Este enlace vence en 1 hora.</p>
        <p><a href="${link}" style="background:#1f2937;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Restablecer contraseña</a></p>
        <p>Si no solicitaste esto, ignorá este correo.</p>
      </div>`;
    await sendMail({ to: email, subject: 'Restablecer contraseña', html });
  },

  async verifyToken(token) {
    const payload = jwt.verify(token, JWT_RESET_SECRET);
    if (payload.typ !== 'reset') throw new Error('Token inválido');
    return payload;
  },

  async resetPassword({ token, newPassword }) {
    const { uid } = await this.verifyToken(token);
    const user = await userRepo.getById(uid);
    if (!user) throw new Error('Usuario no encontrado');
    const same = bcrypt.compareSync(newPassword, user.password);
    if (same) throw new Error('La nueva contraseña no puede ser igual a la anterior');
    const hash = bcrypt.hashSync(newPassword, 10);
    await userRepo.update(uid, { password: hash });
    return true;
  }
};
