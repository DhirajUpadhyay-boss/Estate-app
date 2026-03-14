// src/assets/LegalTerms.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FileText, CheckCircle, AlertCircle, ArrowLeft, Shield, Home, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const LegalTerms = () => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setHasScrolledToBottom(true);
      }
    };

    const el = contentRef.current;
    el?.addEventListener('scroll', handleScroll);
    return () => el?.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAccept = () => {
    if (!hasScrolledToBottom) {
      alert("Please scroll to the end to read everything");
      return;
    }
    if (!accepted) {
      alert("Please accept the Terms & Conditions and Privacy Policy");
      return;
    }

    navigate('/Register', { state: { termsAccepted: true }, replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header with Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Home size={16} />
            <ChevronRight size={16} />
            <span>Registration</span>
            <ChevronRight size={16} />
            <span className="text-blue-600 font-medium">Legal Terms</span>
          </div>
          
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-blue-600 hover:text-blue-700 transition-colors group mb-2"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Registration</span>
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-8">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-10 text-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <FileText size={32} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">Legal Agreements</h1>
                  <p className="text-blue-100 opacity-90">Please review our terms and privacy policy</p>
                </div>
              </div>
              <div className="bg-white/10 p-3 rounded-xl">
                <Shield size={32} />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-100">Last Updated: November 20, 2025</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Required</span>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="border-l-4 border-amber-500 bg-amber-50 mx-8 mt-8 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <AlertCircle size={24} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-1">Important Notice</h3>
                <p className="text-amber-700 text-sm">
                  Please read both documents carefully and scroll to the bottom before accepting. 
                  Your acceptance is required to continue with registration.
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div
            ref={contentRef}
            className="px-10 py-8 max-h-[60vh] overflow-y-auto bg-gray-50/50 m-8 rounded-xl border border-gray-200"
          >
            {/* Terms & Conditions */}
            <section className="mb-12">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-200">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText size={24} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Terms & Conditions</h2>
                  <p className="text-gray-600 text-sm">Govern your use of our platform</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Welcome to <strong className="text-blue-600">YourRealEstate NCR</strong> ("Platform"), 
                    a real estate discovery and inquiry platform operated in India. By accessing or using 
                    this Platform, you agree to be bound by these Terms & Conditions.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Use of Platform
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>You must be 18 years or older to register and use this Platform.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>You agree to provide accurate and complete information during registration.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>We act only as an information platform connecting buyers with builders/sellers.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    User Responsibilities
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>You are responsible for maintaining the confidentiality of your account.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>You agree not to misuse the Platform.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>You must verify all property information independently.</span>
                    </li>
                  </ul>
                </div>

                {/* Add other sections following the same pattern */}
              </div>
            </section>

            {/* Divider */}
            <div className="flex items-center my-12">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-4 text-gray-500 text-sm">Privacy Policy</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Privacy Policy */}
            <section>
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-200">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Shield size={24} className="text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
                  <p className="text-gray-600 text-sm">How we protect and use your data</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Your privacy is important to us. This Privacy Policy explains how we collect, 
                    use, and protect your personal information.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Information We Collect
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Contact Information:</strong> Phone number, name, email (optional)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Usage Data:</strong> Pages visited, time spent, device information</span>
                    </li>
                  </ul>
                </div>

                {/* Add other privacy policy sections following the same pattern */}
              </div>
            </section>

            {/* End Marker */}
            <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-8 text-center">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 mb-2">
                You've reached the end of the document
              </h3>
              <p className="text-green-700">
                Thank you for taking the time to read our terms and conditions
              </p>
            </div>
          </div>

          {/* Acceptance Section */}
          <div className="bg-gray-50 border-t border-gray-200 px-8 py-8">
            <div className="max-w-2xl mx-auto">
              {/* Checkbox */}
              <label className={`flex items-start gap-4 cursor-pointer p-4 rounded-xl transition-all ${
                accepted ? 'bg-blue-50 border border-blue-200' : 'bg-white border border-gray-200'
              }`}>
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  disabled={!hasScrolledToBottom}
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-1 flex-shrink-0"
                />
                <div>
                  <span className="text-lg font-semibold text-gray-900 block mb-1">
                    I accept the terms and conditions
                  </span>
                  <span className="text-gray-600 text-sm">
                    I have read and agree to the <span className="text-blue-600 font-medium">Terms & Conditions</span> and{' '}
                    <span className="text-green-600 font-medium">Privacy Policy</span>
                  </span>
                </div>
              </label>

              {/* Action Button */}
              <button
                onClick={handleAccept}
                disabled={!accepted || !hasScrolledToBottom}
                className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 ${
                  accepted && hasScrolledToBottom
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle size={20} />
                Continue to Registration
              </button>

              {/* Scroll Prompt */}
              {!hasScrolledToBottom && (
                <div className="text-center mt-4">
                  <p className="text-amber-600 text-sm font-medium animate-pulse">
                    ⬆️ Please scroll to the end to enable acceptance
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalTerms;