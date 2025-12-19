import React from 'react';

const BookingTimeline = ({ status }) => {
    // Define the sequence of valid statuses
    const steps = ['requested', 'confirmed', 'completed'];

    // Determine current step index
    // If cancelled, we'll handle it specially, otherwise find index
    const isCancelled = status === 'cancelled';
    const currentStepIndex = steps.indexOf(status);

    if (isCancelled) {
        return (
            <div className="w-full mt-4">
                <div className="flex items-center justify-center p-3 bg-red-50 text-red-700 rounded-lg border border-red-100">
                    <span className="font-medium">Booking Cancelled</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mt-4">
            <div className="relative flex items-center justify-between w-full">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-indigo-500 -z-10 transition-all duration-500"
                    style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}>
                </div>

                {steps.map((step, index) => {
                    const isCompleted = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;

                    return (
                        <div key={step} className="flex flex-col items-center bg-white px-2">
                            <div className={`w-3 h-3 rounded-full border-2 ${isCompleted
                                    ? 'bg-indigo-600 border-indigo-600'
                                    : 'bg-white border-gray-300'
                                }`}></div>
                            <span className={`text-xs mt-1 capitalize font-medium ${isCompleted ? 'text-indigo-600' : 'text-gray-400'
                                }`}>
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BookingTimeline;
