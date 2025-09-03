import { Router } from 'express';
import passport from 'passport';
import { SessionsController } from '../controllers/sessions.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', passport.authenticate('register', { session: false }), SessionsController.register);
router.post('/login', passport.authenticate('login', { session: false }), SessionsController.login);
router.get('/current', requireAuth, SessionsController.current);
router.post('/logout', SessionsController.logout);

router.post('/forgot-password', SessionsController.forgotPassword);
router.post('/reset-password', SessionsController.resetPassword);

export default router;
