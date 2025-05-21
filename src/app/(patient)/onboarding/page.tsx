"use client"
import { Metadata } from "next";
import { Suspense } from "react";
import OnboardingForm from "@/components/ui/onboarding-form";
import { useState, ChangeEvent } from 'react';
import { ChevronRight, ChevronLeft, Plus, X, Calendar, User, Heart, Pill, AlertCircle } from 'lucide-react';

// TypeScript interfaces
interface Product {
  name: string;
  startDate: string;
  frequency: 'daily' | 'twice-daily' | 'weekly' | 'monthly' | 'as-needed' | 'other';
  dosage: string;
}

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  
  // Medical Information
  height: string;
  heightUnit: 'cm' | 'ft';
  weight: string;
  weightUnit: 'kg' | 'lbs';
  bloodType: string;
  allergies: string[];
  existingConditions: string[];
  
  // Product Information
  products: Product[];
}

// Main PatientOnboarding component
export default function PatientOnboarding(): JSX.Element {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    
    // Medical Information
    height: '',
    heightUnit: 'cm',
    weight: '',
    weightUnit: 'kg',
    bloodType: '',
    allergies: [],
    existingConditions: [],
    
    // Product Information
    products: [{ name: '', startDate: '', frequency: 'daily', dosage: '' }],
  });
  
  const [newAllergy, setNewAllergy] = useState<string>('');
  const [newCondition, setNewCondition] = useState<string>('');
  
  const totalSteps: number = 3;
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleProductChange = (index: number, field: keyof Product, value: string): void => {
    const updatedProducts = [...formData.products];
    updatedProducts[index][field] = value;
    setFormData({ ...formData, products: updatedProducts });
  };
  
  const addProduct = (): void => {
    setFormData({
      ...formData,
      products: [...formData.products, { name: '', startDate: '', frequency: 'daily', dosage: '' }]
    });
  };
  
  const removeProduct = (index: number): void => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };
  
  const addAllergy = (): void => {
    if (newAllergy.trim() !== '') {
      setFormData({
        ...formData,
        allergies: [...formData.allergies, newAllergy]
      });
      setNewAllergy('');
    }
  };
  
  const removeAllergy = (index: number): void => {
    const updatedAllergies = formData.allergies.filter((_, i) => i !== index);
    setFormData({ ...formData, allergies: updatedAllergies });
  };
  
  const addCondition = (): void => {
    if (newCondition.trim() !== '') {
      setFormData({
        ...formData,
        existingConditions: [...formData.existingConditions, newCondition]
      });
      setNewCondition('');
    }
  };
  
  const removeCondition = (index: number): void => {
    const updatedConditions = formData.existingConditions.filter((_, i) => i !== index);
    setFormData({ ...formData, existingConditions: updatedConditions });
  };
  
  const nextStep = (): void => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const previousStep = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const submitForm = (): void => {
    console.log('Form submitted:', formData);
    // In a real application, this would send the data to your backend
    alert('Patient information submitted successfully!');
  };
  
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Patient Onboarding</h1>
          <p className="text-slate-600 mt-2">Please provide your information to complete the registration process</p>
        </div>
        
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3].map((step) => (
              <div 
                key={step}
                className={`flex-1 ${
                  step < currentStep 
                    ? 'text-blue-600' 
                    : step === currentStep 
                    ? 'text-blue-600' 
                    : 'text-slate-400'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      step <= currentStep 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {step < currentStep ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span>{step}</span>
                    )}
                  </div>
                  <span className="mt-2 text-sm hidden sm:block">
                    {step === 1 && 'Personal Information'}
                    {step === 2 && 'Medical Details'}
                    {step === 3 && 'Product Information'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute top-0 h-1 w-full bg-slate-200 rounded"></div>
            <div 
              className="absolute top-0 h-1 bg-blue-600 rounded transition-all duration-300" 
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <User className="mr-2 text-blue-600" size={20} />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="firstName">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="lastName">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="dateOfBirth">
                    Date of Birth *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="gender">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="phone">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="address">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Medical Information */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <Heart className="mr-2 text-blue-600" size={20} />
                Medical Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Height
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      id="height"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      id="heightUnit"
                      name="heightUnit"
                      value={formData.heightUnit}
                      onChange={handleInputChange}
                      className="w-20 px-2 py-2 border border-l-0 border-slate-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    >
                      <option value="cm">cm</option>
                      <option value="ft">ft</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Weight
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      id="weightUnit"
                      name="weightUnit"
                      value={formData.weightUnit}
                      onChange={handleInputChange}
                      className="w-20 px-2 py-2 border border-l-0 border-slate-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    >
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="bloodType">
                    Blood Type
                  </label>
                  <select
                    id="bloodType"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Allergies
                  </label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      value={newAllergy}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setNewAllergy(e.target.value)}
                      placeholder="Add allergy"
                      className="w-full px-3 py-2 border border-slate-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={addAllergy}
                      className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.allergies.map((allergy, index) => (
                      <div 
                        key={index} 
                        className="bg-blue-50 border border-blue-200 rounded-full px-3 py-1 flex items-center text-sm"
                      >
                        <span className="text-blue-800">{allergy}</span>
                        <button 
                          type="button" 
                          onClick={() => removeAllergy(index)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {formData.allergies.length === 0 && (
                      <p className="text-sm text-slate-500 italic">No allergies added</p>
                    )}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Existing Medical Conditions
                  </label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      value={newCondition}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCondition(e.target.value)}
                      placeholder="Add medical condition"
                      className="w-full px-3 py-2 border border-slate-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={addCondition}
                      className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.existingConditions.map((condition, index) => (
                      <div 
                        key={index} 
                        className="bg-blue-50 border border-blue-200 rounded-full px-3 py-1 flex items-center text-sm"
                      >
                        <span className="text-blue-800">{condition}</span>
                        <button 
                          type="button" 
                          onClick={() => removeCondition(index)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {formData.existingConditions.length === 0 && (
                      <p className="text-sm text-slate-500 italic">No medical conditions added</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Product Information */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <Pill className="mr-2 text-blue-600" size={20} />
                Product Information
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                Please provide information about the pharmaceutical products you are currently using
              </p>
              
              {formData.products.map((product, index) => (
                <div key={index} className="mb-6 p-4 border border-slate-200 rounded-lg bg-slate-50">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-slate-800">Product #{index + 1}</h3>
                    {formData.products.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleProductChange(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Start Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          type="date"
                          value={product.startDate}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleProductChange(index, 'startDate', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Usage Frequency
                      </label>
                      <select
                        value={product.frequency}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleProductChange(index, 'frequency', e.target.value as Product['frequency'])}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="daily">Daily</option>
                        <option value="twice-daily">Twice Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="as-needed">As Needed</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Dosage
                      </label>
                      <input
                        type="text"
                        value={product.dosage}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleProductChange(index, 'dosage', e.target.value)}
                        placeholder="e.g., 10mg, 1 tablet"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addProduct}
                className="flex items-center text-blue-600 font-medium hover:text-blue-800 mt-2"
              >
                <Plus size={18} className="mr-1" />
                Add Another Product
              </button>
            </div>
          )}
        </div>
        
        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex">
            <AlertCircle className="text-blue-600 mr-3 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-medium text-blue-800 mb-1">Why do we collect this information?</h3>
              <p className="text-sm text-blue-700">
                The information you provide helps us tailor our services to your specific needs and ensures you receive the most appropriate care and medication. All data is kept confidential and secure in accordance with healthcare regulations.
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={previousStep}
            className={`flex items-center px-6 py-2 border border-slate-300 rounded-md ${
              currentStep === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'
            }`}
            disabled={currentStep === 1}
          >
            <ChevronLeft size={16} className="mr-1" />
            Previous
          </button>
          
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next
              <ChevronRight size={16} className="ml-1" />
            </button>
          ) : (
            <button
              type="button"
              onClick={submitForm}
              className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}