import passport from 'passport';

export const requireAuth = passport.authenticate('current', { session: false });

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'No autenticado' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'No autorizado' });
  next();
};
