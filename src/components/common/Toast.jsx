import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const styles = {
        success: 'bg-green-50 text-green-800 border-green-200',
        error: 'bg-red-50 text-red-800 border-red-200',
        info: 'bg-blue-50 text-blue-800 border-blue-200'
    };

    const icons = {
        success: <CheckCircle className="h-5 w-5 text-green-500 mr-3" />,
        error: <AlertCircle className="h-5 w-5 text-red-500 mr-3" />,
        info: <AlertCircle className="h-5 w-5 text-blue-500 mr-3" />
    };

    return (
        <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg border shadow-lg transform transition-all duration-300 animate-in slide-in-from-top-2 ${styles[type]}`}>
            {icons[type]}
            <p className="font-medium">{message}</p>
            <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
            </button>
        </div>
    );
};

export default Toast;
