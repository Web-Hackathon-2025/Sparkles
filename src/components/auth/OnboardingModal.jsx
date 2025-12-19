import React, { useState } from 'react';
import { X, User, Briefcase, ChevronRight } from 'lucide-react';
import Button from '../common/Button';
import { categories } from '../../data/categories';
import { ROLES } from '../../utils/constants';

const OnboardingModal = ({ isOpen, onClose, onComplete }) => {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState(null);
    const [errors, setErrors] = useState({});

    // Form Data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        category: '',
        pricing: '',
        experience: ''
    });

    if (!isOpen) return null;

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setStep(2);
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors = {};
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.pricing) newErrors.pricing = 'Pricing is required';
        if (!formData.experience) newErrors.experience = 'Experience is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 2) {
            if (validateStep2()) {
                if (role === ROLES.PROVIDER) {
                    setStep(3);
                } else {
                    handleSubmit();
                }
            }
        } else if (step === 3) {
            if (validateStep3()) {
                handleSubmit();
            }
        }
    };

    const handleSubmit = () => {
        const userData = {
            ...formData,
            role: role
        };
        onComplete(userData);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
                            <X className="h-6 w-6" />
                        </button>

                        <div className="sm:flex sm:items-start justify-center">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 className="text-2xl leading-6 font-bold text-gray-900 text-center mb-8">
                                    {step === 1 && "How will you use Karigar?"}
                                    {step === 2 && "Tell us about yourself"}
                                    {step === 3 && "Professional Details"}
                                </h3>

                                {/* Step 1: Role Selection */}
                                {step === 1 && (
                                    <div className="grid grid-cols-1 gap-4 mb-4">
                                        <button
                                            onClick={() => handleRoleSelect(ROLES.CUSTOMER)}
                                            className="relative rounded-lg border-2 border-gray-200 p-6 hover:border-indigo-500 hover:bg-indigo-50 transition flex items-center group"
                                        >
                                            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition">
                                                <User className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div className="ml-4 text-left">
                                                <h4 className="text-lg font-bold text-gray-900">I need a service</h4>
                                                <p className="text-sm text-gray-500">Find reliable pros for your home.</p>
                                            </div>
                                            <ChevronRight className="ml-auto h-5 w-5 text-gray-400 group-hover:text-indigo-500" />
                                        </button>

                                        <button
                                            onClick={() => handleRoleSelect(ROLES.PROVIDER)}
                                            className="relative rounded-lg border-2 border-gray-200 p-6 hover:border-indigo-500 hover:bg-indigo-50 transition flex items-center group"
                                        >
                                            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition">
                                                <Briefcase className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <div className="ml-4 text-left">
                                                <h4 className="text-lg font-bold text-gray-900">I want to offer services</h4>
                                                <p className="text-sm text-gray-500">Register as a professional.</p>
                                            </div>
                                            <ChevronRight className="ml-auto h-5 w-5 text-gray-400 group-hover:text-indigo-500" />
                                        </button>
                                    </div>
                                )}

                                {/* Step 2: Basic Info */}
                                {step === 2 && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                            <input
                                                type="text"
                                                className={`mt-1 block w-full border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                            <input
                                                type="email"
                                                className={`mt-1 block w-full border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                            <input
                                                type="tel"
                                                className={`mt-1 block w-full border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Provider Details */}
                                {step === 3 && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Service Category</label>
                                            <select
                                                className={`mt-1 block w-full border ${errors.category ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map(cat => (
                                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                ))}
                                            </select>
                                            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Hourly Rate (Est.)</label>
                                            <input
                                                type="text"
                                                placeholder="$40/hr"
                                                className={`mt-1 block w-full border ${errors.pricing ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                                value={formData.pricing}
                                                onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                                            />
                                            {errors.pricing && <p className="mt-1 text-sm text-red-600">{errors.pricing}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Experience & Bio</label>
                                            <textarea
                                                rows={3}
                                                className={`mt-1 block w-full border ${errors.experience ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                                value={formData.experience}
                                                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                            />
                                            {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        {step > 1 && (
                            <Button
                                onClick={handleNext}
                                className="w-full sm:ml-3 sm:w-auto"
                            >
                                {step === 2 && role === ROLES.CUSTOMER ? 'Complete' : step === 3 ? 'Complete Registration' : 'Next'}
                            </Button>
                        )}
                        {step > 1 && (
                            <Button
                                variant="secondary"
                                onClick={() => setStep(step - 1)}
                                className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto"
                            >
                                Back
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingModal;
