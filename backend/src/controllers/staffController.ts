import { staffService } from '../services/staffService.js';
import type { AuthRequest } from '../types/type.js';
import type { Request, Response } from 'express';

export const staffController = {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await staffService.getAll();
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch staff' });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const result = await staffService.getById(req.params.id as string);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(404).json({ success: false, message: 'Staff not found' });
    }
  },

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await staffService.create(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to create staff' 
      });
    }
  },

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await staffService.update(req.params.id as string , req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Failed to update staff' });
    }
  },

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      await staffService.delete(req.params.id as string);
      res.json({ success: true, message: 'Staff deactivated' });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Failed to delete staff' });
    }
  },
};