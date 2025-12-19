import { BOOKING_STATUS } from '../utils/constants';

export const bookings = [
    {
        id: 101,
        providerId: 1,
        customerId: 99,
        service: 'Deep Cleaning',
        date: '2023-11-15',
        status: BOOKING_STATUS.COMPLETED,
        amount: 140,
    },
    {
        id: 102,
        providerId: 2,
        customerId: 99,
        service: 'Faucet Repair',
        date: '2023-12-01',
        status: BOOKING_STATUS.CONFIRMED,
        amount: 160,
    },
    {
        id: 103,
        providerId: 3,
        customerId: 99,
        service: 'Outlet Installation',
        date: '2023-12-05',
        status: BOOKING_STATUS.PENDING,
        amount: 180,
    },
];
