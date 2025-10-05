import { staffApplicationService } from '../services/staffApplicationService.js';
import { prisma } from '../config/db.js';
import type { AuthRequest } from '../types/type.js';
import type { Request, Response } from 'express';

export const staffApplicationController = {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await staffApplicationService.create(req.user!.id, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Application failed' 
      });
    }
  },

  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await staffApplicationService.getAll();
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch applications' });
    }
  },

  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await staffApplicationService.getById(req.params.id as string);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(404).json({ success: false, message: 'Application not found' });
    }
  },

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      console.log('Updating application:', req.params.id, 'with data:', req.body);
      const result = await staffApplicationService.update(req.params.id as string , req.body);
      console.log('Update result:', result);
      
      // Debug: Check if user role was actually updated
      if (req.body.status === 'APPROVED') {
        const updatedUser = await prisma.user.findUnique({
          where: { id: result.userId },
          select: { id: true, email: true, role: true }
        });
        console.log('User after update:', updatedUser);
      }
      
      res.json({ success: true, data: result });
    } catch (error) {
      console.error('Error updating application:', error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to update application' 
      });
    }
  },
};
