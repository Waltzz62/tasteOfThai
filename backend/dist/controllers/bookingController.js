import { bookingService } from '../services/bookingService.js';
export const bookingController = {
    async create(req, res) {
        try {
            const result = await bookingService.create(req.user.id, req.body);
            res.status(201).json({ success: true, data: result });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Booking failed'
            });
        }
    },
    async getAll(req, res) {
        try {
            const result = await bookingService.getAll();
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
        }
    },
    async getMyBookings(req, res) {
        try {
            const result = await bookingService.getByUser(req.user.id);
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
        }
    },
    async getById(req, res) {
        try {
            const result = await bookingService.getById(req.params.id);
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(404).json({ success: false, message: 'Booking not found' });
        }
    },
    async updateStatus(req, res) {
        try {
            const result = await bookingService.updateStatus(req.params.id, req.body.status);
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(400).json({ success: false, message: 'Failed to update booking' });
        }
    },
};
//# sourceMappingURL=bookingController.js.map