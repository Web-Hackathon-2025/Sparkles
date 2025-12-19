import { BOOKING_STATUS } from '../utils/constants';

// Status mapping to match request: requested, confirmed, completed, cancelled
export const bookings = [
    {
        id: 101,
        providerId: 1,
        customerName: 'Fatima Jones',
        service: 'Move-in Deep Clean',
        date: '2023-12-10',
        status: 'completed',
        amount: 180,
    },
    {
        id: 102,
        providerId: 2,
        customerName: 'James Wilson',
        service: 'Kitchen Sink Repair',
        date: '2023-12-18',
        status: 'confirmed',
        amount: 95,
    },
    {
        id: 103,
        providerId: 3,
        customerName: 'Linda Chen',
        service: 'Ceiling Fan Installation',
        date: '2023-12-22',
        status: 'requested',
        amount: 120,
    },
    {
        id: 104,
        providerId: 5,
        customerName: 'Robert Taylor',
        service: 'Math Tutoring Session',
        date: '2023-12-15',
        status: 'cancelled',
        amount: 40,
    }
];
