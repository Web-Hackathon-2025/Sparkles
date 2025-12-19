import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

const BookingTimeline = ({ currentStep }) => {
    const steps = [
        { id: 1, name: 'Request Sent', description: 'Waiting for provider approval' },
        { id: 2, name: 'Confirmed', description: 'Provider accepted the job' },
        { id: 3, name: 'In Progress', description: 'Service is being performed' },
        { id: 4, name: 'Completed', description: 'Service completed successfully' },
    ];

    return (
        <div className="py-6">
            <nav aria-label="Progress">
                <ol role="list" className="overflow-hidden">
                    {steps.map((step, stepIdx) => (
                        <li key={step.name} className={`relative pb-10 ${stepIdx === steps.length - 1 ? 'pb-0' : ''}`}>
                            {stepIdx !== steps.length - 1 ? (
                                <div
                                    className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${step.id < currentStep ? 'bg-indigo-600' : 'bg-gray-200'}`}
                                    aria-hidden="true"
                                />
                            ) : null}
                            <div className="relative flex items-start group">
                                <span className="h-9 flex items-center">
                                    {step.id < currentStep ? (
                                        <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800 transition">
                                            <CheckCircle className="w-5 h-5 text-white" aria-hidden="true" />
                                        </span>
                                    ) : step.id === currentStep ? (
                                        <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full">
                                            <span className="h-2.5 w-2.5 bg-indigo-600 rounded-full" />
                                        </span>
                                    ) : (
                                        <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                                            <div className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                                        </span>
                                    )}
                                </span>
                                <span className="ml-4 min-w-0 flex flex-col">
                                    <span className={`text-xs font-semibold tracking-wide uppercase ${step.id <= currentStep ? 'text-indigo-600' : 'text-gray-500'}`}>
                                        {step.name}
                                    </span>
                                    <span className="text-sm text-gray-500">{step.description}</span>
                                </span>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
};

export default BookingTimeline;
