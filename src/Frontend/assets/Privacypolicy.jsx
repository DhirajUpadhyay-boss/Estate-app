import React, { useState } from 'react';
import { Shield, Lock, Eye, Database, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const PrivacyPolicy = () => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      alert('Privacy Policy accepted! You can now proceed.');
      // In your actual implementation, proceed with registration
    } else {
      alert('Please accept the Privacy Policy to continue.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={32} className="text-green-500" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
              <p className="text-sm text-gray-500">Effective Date: November 17, 2025</p>
            </div>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <div className="flex items-start gap-3">
              <Lock size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                Your privacy is important to us. This policy explains how we collect, use, and protect 
                your personal information on our real estate platform.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="prose max-w-none">
            
            {/* Section 1 */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Database size={24} className="text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-800">1. Information We Collect</h2>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Personal Information:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Contact Details:</strong> Name, phone number, email address</li>
                <li><strong>Account Information:</strong> Username, password (encrypted)</li>
                <li><strong>Profile Data:</strong> Property preferences, search history, saved listings</li>
                <li><strong>Communication:</strong> Messages, inquiries, feedback submitted through our platform</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">Automatically Collected Data:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                <li><strong>Usage Data:</strong> Pages viewed, time spent, click patterns</li>
                <li><strong>Location Data:</strong> Approximate location based on IP (for showing local properties)</li>
                <li><strong>Cookies:</strong> Session cookies for authentication and preferences</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye size={24} className="text-purple-500" />
                <h2 className="text-2xl font-bold text-gray-800">2. How We Use Your Information</h2>
              </div>
              
              <p className="text-gray-700 mb-3">We use your personal information for the following purposes:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Service Delivery:</strong> To provide property listings, search functionality, and account access</li>
                <li><strong>Communication:</strong> To send OTPs, property alerts, updates, and respond to inquiries</li>
                <li><strong>Personalization:</strong> To recommend properties based on your preferences and search history</li>
                <li><strong>Security:</strong> To verify your identity, prevent fraud, and protect our platform</li>
                <li><strong>Analytics:</strong> To improve our services, understand user behavior, and optimize performance</li>
                <li><strong>Marketing:</strong> To send promotional offers and property updates (with your consent)</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Mail size={24} className="text-orange-500" />
                <h2 className="text-2xl font-bold text-gray-800">3. Information Sharing</h2>
              </div>
              
              <p className="text-gray-700 mb-3">We may share your information with:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Property Sellers/Agents:</strong> When you express interest in a property, we share your contact 
                details with the listing agent</li>
                <li><strong>Service Providers:</strong> Third-party vendors for hosting, analytics, payment processing (if applicable)</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
              </ul>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mt-4">
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> We never sell your personal information to third parties for marketing purposes.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock size={24} className="text-red-500" />
                <h2 className="text-2xl font-bold text-gray-800">4. Data Security</h2>
              </div>
              
              <p className="text-gray-700 mb-3">We implement security measures to protect your information:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Encryption:</strong> All sensitive data is encrypted during transmission (SSL/TLS)</li>
                <li><strong>Access Controls:</strong> Limited access to personal data by authorized personnel only</li>
                <li><strong>Regular Audits:</strong> Periodic security assessments and vulnerability testing</li>
                <li><strong>Secure Storage:</strong> Data stored on secure servers with backup systems</li>
              </ul>
              
              <p className="text-gray-700 mt-3">
                However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security 
                but strive to use commercially acceptable means to protect your data.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle size={24} className="text-green-500" />
                <h2 className="text-2xl font-bold text-gray-800">5. Your Rights</h2>
              </div>
              
              <p className="text-gray-700 mb-3">You have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and personal data</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time</li>
                <li><strong>Data Portability:</strong> Request your data in a machine-readable format</li>
                <li><strong>Withdraw Consent:</strong> Revoke consent for data processing where applicable</li>
              </ul>
              
              <p className="text-gray-700 mt-3">
                To exercise these rights, contact us at <strong>privacy@yourrealestate.com</strong>
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Cookies & Tracking</h2>
              <p className="text-gray-700 mb-3">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for authentication and security</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
              </ul>
              <p className="text-gray-700 mt-3">
                You can control cookies through your browser settings, but disabling them may affect functionality.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Data Retention</h2>
              <p className="text-gray-700">
                We retain your personal information for as long as necessary to provide our services and comply with 
                legal obligations. When you delete your account, we will remove your personal data within 30 days, 
                except where retention is required by law.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Third-Party Links</h2>
              <p className="text-gray-700">
                Our platform may contain links to third-party websites. We are not responsible for the privacy 
                practices of these external sites. We encourage you to review their privacy policies.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect 
                personal information from children. If we become aware of such collection, we will delete it immediately.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of significant changes via 
                email or platform notification. The "Effective Date" at the top indicates when the policy was last updated.
              </p>
            </section>

            {/* Contact Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-3">
                If you have questions or concerns about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-700"><strong>Email:</strong> privacy@yourrealestate.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> +91-XXXXXXXXXX</p>
                <p className="text-gray-700"><strong>Address:</strong> Delhi, India</p>
                <p className="text-gray-700 mt-2"><strong>Data Protection Officer:</strong> dpo@yourrealestate.com</p>
              </div>
            </section>

          </div>
        </div>

        {/* Acceptance Footer */}
        <div className="bg-white rounded-lg shadow-md p-6 sticky bottom-4">
          <div className="flex items-start gap-3 mb-4">
            <input 
              type="checkbox" 
              id="accept-privacy"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            />
            <label htmlFor="accept-privacy" className="text-gray-700 cursor-pointer">
              I have read and understood the Privacy Policy. I consent to the collection and use of my personal 
              information as described above.
            </label>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => window.history.back()}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-semibold transition"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
            <button 
              onClick={handleAccept}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition ${
                accepted 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!accepted}
            >
              <CheckCircle size={20} />
              Accept & Continue
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;