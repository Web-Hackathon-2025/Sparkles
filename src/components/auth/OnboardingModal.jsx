import React, { useState } from 'react';
import { X, User, Briefcase, ChevronRight, ShieldCheck, Star, Camera, FileText, Lock } from 'lucide-react';
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
        experience: '',
        portfolioLink: '',
        cnic: '', // Mock field for security
    });

    if (!isOpen) return null;

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setStep(2);
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors = {};
        if (!formData.category) newErrors.category = 'Please select a specialization';
        if (!formData.pricing) newErrors.pricing = 'Estimated pricing is required';
        if (!formData.experience) newErrors.experience = 'Tell us about your work history';
        if (role === ROLES.PROVIDER && !formData.cnic) newErrors.cnic = 'CNIC verification is required for safety';
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
            role: role,
            id: Math.floor(Math.random() * 1000) // Mock ID
        };
        onComplete(userData);
    };

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
                    <div className="absolute inset-0 bg-[#2C475C]/60 backdrop-blur-sm"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl w-full">
                    <div className="relative bg-white px-8 pt-10 pb-8 sm:p-10">
                        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-[#F97B27] transition-colors p-2 rounded-full hover:bg-gray-100">
                            <X className="h-6 w-6" />
                        </button>

                        <div className="w-full">
                            {/* Header */}
                            <div className="mb-10 text-center">
                                <div className="inline-block p-3 bg-[#F97B27]/10 rounded-2xl mb-4">
                                    {step === 1 && <Users className="h-6 w-6 text-[#F97B27]" />}
                                    {step === 2 && <User className="h-6 w-6 text-[#F97B27]" />}
                                    {step === 3 && <ShieldCheck className="h-6 w-6 text-[#F97B27]" />}
                                </div>
                                <h3 className="text-3xl font-bold text-[#2C475C]">
                                    {step === 1 && "Choose Your Path"}
                                    {step === 2 && "The Basics"}
                                    {step === 3 && "Build Trust"}
                                </h3>
                                <p className="text-gray-500 mt-2">
                                    {step === 1 && "How will you be using Karigar today?"}
                                    {step === 2 && "Just a few details to get your account ready."}
                                    {step === 3 && "Seekers value transparency. Let's showcase your expertise."}
                                </p>
                            </div>

                            {/* Step 1: Role Selection */}
                            {step === 1 && (
                                <div className="grid grid-cols-1 gap-6">
                                    <button
                                        onClick={() => handleRoleSelect(ROLES.CUSTOMER)}
                                        className="group relative rounded-2xl border-2 border-gray-100 p-6 hover:border-[#F97B27] hover:bg-orange-50/50 transition-all flex items-center text-left"
                                    >
                                        <div className="h-14 w-14 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition">
                                            <User className="h-7 w-7 text-blue-600" />
                                        </div>
                                        <div className="ml-5">
                                            <h4 className="text-xl font-bold text-[#2C475C]">I need a Service</h4>
                                            <p className="text-sm text-gray-500 mt-1">Hire verified professionals for your home jobs.</p>
                                        </div>
                                        <ChevronRight className="ml-auto h-6 w-6 text-gray-300 group-hover:text-[#F97B27] transform group-hover:translate-x-1 transition-all" />
                                    </button>

                                    <button
                                        onClick={() => handleRoleSelect(ROLES.PROVIDER)}
                                        className="group relative rounded-2xl border-2 border-gray-100 p-6 hover:border-[#F97B27] hover:bg-orange-50/50 transition-all flex items-center text-left"
                                    >
                                        <div className="h-14 w-14 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition">
                                            <Briefcase className="h-7 w-7 text-[#F97B27]" />
                                        </div>
                                        <div className="ml-5">
                                            <h4 className="text-xl font-bold text-[#2C475C]">I want to Work</h4>
                                            <p className="text-sm text-gray-500 mt-1">Register as a Pro and grow your expert business.</p>
                                        </div>
                                        <ChevronRight className="ml-auto h-6 w-6 text-gray-300 group-hover:text-[#F97B27] transform group-hover:translate-x-1 transition-all" />
                                    </button>
                                </div>
                            )}

                            {/* Step 2: Basic Info */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-[#2C475C] mb-2">Full Legal Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Abdullah Shaikh"
                                            className={`block w-full border-2 ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-100 bg-gray-50'} rounded-xl py-4 px-5 text-[#2C475C] focus:ring-[#F97B27] focus:border-[#F97B27] transition-all`}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                        {errors.name && <p className="mt-2 text-xs font-bold text-red-500 flex items-center"><X className="w-3 h-3 mr-1" /> {errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#2C475C] mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="name@email.com"
                                            className={`block w-full border-2 ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-100 bg-gray-50'} rounded-xl py-4 px-5 text-[#2C475C] focus:ring-[#F97B27] focus:border-[#F97B27] transition-all`}
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                        {errors.email && <p className="mt-2 text-xs font-bold text-red-500 flex items-center"><X className="w-3 h-3 mr-1" /> {errors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#2C475C] mb-2">Primary Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="+92 3XX XXXXXXX"
                                            className={`block w-full border-2 ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-100 bg-gray-50'} rounded-xl py-4 px-5 text-[#2C475C] focus:ring-[#F97B27] focus:border-[#F97B27] transition-all`}
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                        {errors.phone && <p className="mt-2 text-xs font-bold text-red-500 flex items-center"><X className="w-3 h-3 mr-1" /> {errors.phone}</p>}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Provider Trust Details */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-4 mb-6">
                                        <ShieldCheck className="h-6 w-6 text-blue-600 mt-1 shrink-0" />
                                        <p className="text-xs text-blue-800 leading-relaxed font-medium">
                                            We prioritize trust. Verification increases your chance of getting hired by <span className="font-bold underline">85%</span>.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-sm font-bold text-[#2C475C] mb-2">Specialization</label>
                                            <select
                                                className={`block w-full border-2 ${errors.category ? 'border-red-300 bg-red-50' : 'border-gray-100 bg-gray-50'} rounded-xl py-4 px-5 text-[#2C475C] focus:ring-[#F97B27] focus:border-[#F97B27] appearance-none`}
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map(cat => (
                                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-sm font-bold text-[#2C475C] mb-2">Hourly Rate Pkr</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 500/hr"
                                                className={`block w-full border-2 ${errors.pricing ? 'border-red-300 bg-red-50' : 'border-gray-100 bg-gray-50'} rounded-xl py-4 px-5 text-[#2C475C] focus:ring-[#F97B27] focus:border-[#F97B27]`}
                                                value={formData.pricing}
                                                onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-[#2C475C] mb-2">CNIC Number (Encrypted)</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="42101-XXXXXXX-X"
                                                className={`block w-full border-2 ${errors.cnic ? 'border-red-300 bg-red-50' : 'border-gray-100 bg-gray-50'} rounded-xl py-4 px-5 text-[#2C475C] focus:ring-[#F97B27] focus:border-[#F97B27]`}
                                                value={formData.cnic}
                                                onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                                            />
                                            <Lock className="absolute right-4 top-4 h-5 w-5 text-gray-400" />
                                        </div>
                                        {errors.cnic && <p className="mt-2 text-xs font-bold text-red-500">{errors.cnic}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-[#2C475C] mb-2">Work Portfolio / Bio</label>
                                        <textarea
                                            rows={2}
                                            placeholder="Tell seekers about your experience and previous best projects..."
                                            className={`block w-full border-2 ${errors.experience ? 'border-red-300 bg-red-50' : 'border-gray-100 bg-gray-50'} rounded-xl py-4 px-5 text-[#2C475C] focus:ring-[#F97B27] focus:border-[#F97B27] resize-none`}
                                            value={formData.experience}
                                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                        />
                                        {errors.experience && <p className="mt-2 text-xs font-bold text-red-500">{errors.experience}</p>}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            {step > 1 && (
                                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => setStep(step - 1)}
                                        className="btn-secondary flex-1 py-4"
                                    >
                                        Go Back
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="btn-primary flex-1 py-4 shadow-lg shadow-[#F97B27]/20"
                                    >
                                        {step === 2 && role === ROLES.CUSTOMER ? 'Complete & Start' : step === 3 ? 'Register Securely' : 'Continue'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingModal;
