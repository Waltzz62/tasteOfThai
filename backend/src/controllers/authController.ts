import type { Request, Response } from 'express';
import { authService } from '../services/authService.js';

export const authController = {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.register(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Registration failed' 
      });
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.login(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(401).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Login failed' 
      });
    }
  },

  async staffLogin(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.staffLogin(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(401).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Login failed' 
      });
    }
  },
};