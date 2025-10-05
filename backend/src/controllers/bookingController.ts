import { bookingService } from '../services/bookingService.js';
import type { AuthRequest } from '../types/type.js';
import type { Request, Response } from 'express';

export const bookingController = {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await bookingService.create(req.user!.id, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Booking failed' 
      });
    }
  },

  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await bookingService.getAll();
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
    }
  },

  async getMyBookings(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await bookingService.getByUser(req.user!.id);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
    }
  },

  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await bookingService.getById(req.params.id as string);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(404).json({ success: false, message: 'Booking not found' });
    }
  },

  async updateStatus(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await bookingService.updateStatus(req.params.id as string , req.body.status);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Failed to update booking' });
    }
  },
};