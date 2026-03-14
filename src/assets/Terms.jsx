import React, { useState, useEffect, useRef } from 'react';
import { FileText, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Terms = () => {
  const [accepted, setAccepted] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
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
    if (!hasScrolledToBottom) return alert("Please scroll to the bottom first");
    if (!accepted) return alert("Please accept the terms");

    // Go back to where user came from (usually /Register)
    const returnPath = location.state?.from || '/Register';
    navigate(returnPath, { state: { termsAccepted: true } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={32} className="text-blue-500" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Terms & Conditions</h1>
              <p className="text-sm text-gray-500">Last Updated: November 19, 2025</p>
            </div>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-blue-600 mt-0.5" />
              <p className="text-sm">Please read carefully and scroll to the bottom before accepting.</p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div 
          ref={contentRef}
          className="bg-white rounded-lg shadow-md p-8 mb-6 max-h-[60vh] overflow-y-auto prose max-w-none"
        >
          {/* Your full terms content here - unchanged */}
          {/* ... all your sections ... */}
          <div className="bg-green-50 border-2 border-green-500 p-6 rounded text-center mt-10">
            <p className="text-green-700 font-bold text-lg">✓ You have reached the end</p>
          </div>
        </div>

        {/* Accept Footer */}
        <div className="bg-white rounded-lg shadow-md p-6 sticky bottom-0">
          <div className="flex items-start gap-3 mb-4">
            <input
              type="checkbox"
              id="accept"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              disabled={!hasScrolledToBottom}
              className="mt-1 w-5 h-5"
            />
            <label htmlFor="accept" className="text-sm text-gray-700">
              I have read and accept the Terms & Conditions
            </label>
          </div>

          <button
            onClick={handleAccept}
            disabled={!accepted || !hasScrolledToBottom}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition ${
              accepted && hasScrolledToBottom
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <CheckCircle size={20} />
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;