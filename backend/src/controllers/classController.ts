import type { AuthRequest } from '../types/type.js';
import { classService } from '../services/classService.js';
import type { Request, Response } from 'express';

export const classController = {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await classService.getAll(req.query as any);
      res.json({ success: true, ...result });
    } catch (error) {
      console.error('Error fetching classes:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch classes' });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const result = await classService.getById(req.params.id as string);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(404).json({ success: false, message: 'Class not found' });
    }
  },

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await classService.create(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Failed to create class' });
    }
  },

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await classService.update(req.params.id as string, req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Failed to update class' });
    }
  },

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      await classService.delete(req.params.id as string);
      res.json({ success: true, message: 'Class deleted' });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Failed to delete class' });
    }
  },
};