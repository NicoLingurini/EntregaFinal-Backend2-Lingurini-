import { AuthService } from '../services/auth.service.js';
import { PasswordService } from '../services/password.service.js';
import { COOKIE_NAME } from '../config/env.js';
import { userToDTO } from '../dtos/user.dto.js';

export const SessionsController = {
  async register(req, res, next) {
    try {
      const user = req.user || await AuthService.register(req.body);
      const u = user.toObject ? user.toObject() : user;
      if (u.password) delete u.password;
      res.status(201).json({ message: 'Usuario registrado', user: u });
    } catch (e) { next(e); }
  },
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { token } = await AuthService.login({ email, password });
      return res.cookie(COOKIE_NAME, token, { httpOnly: true, sameSite: 'lax' })
                .json({ message: 'Login ok', token });
    } catch (e) { next(e); }
  },
  async current(req, res) { return res.json({ user: userToDTO(req.user) }); },
  async logout(req, res) { return res.clearCookie(COOKIE_NAME).json({ message: 'Logout ok' }); },
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      await PasswordService.sendResetEmail(email);
      res.json({ message: 'Si el email existe, se envió un enlace de recuperación (1h de validez).' });
    } catch (e) { next(e); }
  },
  async resetPassword(req, res, next) {
    try {
      const { token, newPassword } = req.body;
      await PasswordService.resetPassword({ token, newPassword });
      res.json({ message: 'Contraseña actualizada' });
    } catch (e) { next(e); }
  }
};
