import { scheduleService } from '../services/scheduleService.js';
import { prisma } from '../config/db.js';
import type { AuthRequest } from '../types/type.js';
import type { Request, Response } from 'express';

export const scheduleController = {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await scheduleService.getAll();
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch schedules' });
    }
  },

  async getByStaff(req: AuthRequest, res: Response): Promise<void> {
    try {
      // Find staff record using user email
      const staff = await prisma.staff.findUnique({
        where: { email: req.user!.email },
        select: { id: true },
      });

      if (!staff) {
        return res.status(404).json({ success: false, message: 'Staff record not found' });
      }

      const result = await scheduleService.getByStaff(staff.id);
      res.json({ success: true, data: result });
    } catch (error) {
      console.error('Error fetching staff schedules:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch schedules' });
    }
  },

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await scheduleService.create(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Failed to create schedule' });
    }
  },

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await scheduleService.update(req.params.id as string, req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Failed to update schedule' });
    }
  },

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      await scheduleService.delete(req.params.id as string);
      res.json({ success: true, message: 'Schedule deleted' });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Failed to delete schedule' });
    }
  },
};