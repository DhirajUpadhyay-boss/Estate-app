import React, { useState } from 'react';

const Footer = () => {
  const [detailText, setDetailText] = useState(
    'Select a city, service, FAQ or policy item in the footer to view more details here.'
  );
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const aboutMain =
    'As a comprehensive platform connecting property buyers, sellers and renters, Router Real‑Estate brings verified listings, market insights and smart tools together in one place to make your property journey simpler and more transparent.';
  const aboutExtra =
    ' Router Real‑Estate aggregates residential and commercial listings, price trends and locality insights from multiple sources so you can shortlist, compare and connect with owners, builders or agents with greater confidence.';

  const faqs = [
    {
      q: 'How do I post a property for sale or rent on Router Real‑Estate?',
      a: 'Create an account, complete your profile and use the “Post Property” flow to add details such as location, configuration, pricing and photos. Your listing goes live after a quick basic review.',
    },
    {
      q: 'Are the property listings verified before they go live?',
      a: 'We run basic checks on contact details and perform random document verifications. However, you should always cross‑check ownership documents and visit the property personally.',
    },
    {
      q: 'Can I check my home‑loan eligibility through the website?',
      a: 'Yes, you can use our loan tools to estimate eligibility and EMI based on income, tenure and interest rate before talking to a lender.',
    },
    {
      q: 'Does Router Real‑Estate charge brokerage or commission?',
      a: 'We do not charge brokerage to buyers or tenants. Certain premium services and advertising slots for owners and agents may be chargeable.',
    },
    {
      q: 'How can I contact support if I face an issue with a listing?',
      a: 'You can raise a ticket from the help section or write to our support email with the property ID and a brief description of the issue.',
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 space-y-8">
        {/* Top grid: About + link columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h4 className="text-lg font-semibold mb-2">About Router Real‑Estate</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              {aboutMain}
              {aboutExpanded && aboutExtra}
            </p>
            <button
              type="button"
              onClick={() => {
                const next = !aboutExpanded;
                setAboutExpanded(next);
                if (next) {
                  setDetailText(aboutMain + aboutExtra);
                } else {
                  setDetailText(
                    'Router Real‑Estate helps you discover, compare and shortlist properties while keeping all final decisions in your hands.'
                  );
                }
              }}
              className="mt-2 text-sm font-medium text-blue-400 hover:text-blue-300 underline-offset-2 hover:underline"
            >
              {aboutExpanded ? 'Read less' : 'Read more'}
            </button>
          </div>

          {/* Properties in India */}
          <div>
            <h4 className="text-base font-semibold mb-2">Properties in India</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              {[
                [
                  'Property in New Delhi',
                  'Find apartments and builder floors close to metro corridors, office hubs and upcoming infrastructure in New Delhi.',
                ],
                [
                  'Property in Mumbai',
                  'Explore homes across Mumbai’s western, central and harbour corridors with a mix of under‑construction and ready projects.',
                ],
                [
                  'Property in Chennai',
                  'Browse independent houses and gated communities across OMR, ECR and key residential pockets in Chennai.',
                ],
                [
                  'Property in Pune',
                  'Track new launches and resale apartments around Hinjewadi, Kharadi and other fast‑growing Pune micro‑markets.',
                ],
                [
                  'Property in Bangalore',
                  'Discover properties near IT corridors like Whitefield, ORR and Electronic City in Bengaluru.',
                ],
                [
                  'Property in Hyderabad',
                  'Search for homes in key Hyderabad locations including Gachibowli, Kondapur and emerging western suburbs.',
                ],
              ].map(([label, text]) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => setDetailText(text)}
                    className="hover:text-gray-100 text-left w-full"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* New Projects in India */}
          <div>
            <h4 className="text-base font-semibold mb-2">New Projects in India</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              {[
                [
                  'New Projects in New Delhi',
                  'Upcoming residential projects in New Delhi with RERA‑registered towers, modern amenities and better connectivity.',
                ],
                [
                  'New Projects in Mumbai',
                  'New launches across Mumbai and suburbs offering high‑rise living, sea‑view apartments and integrated townships.',
                ],
                [
                  'New Projects in Chennai',
                  'Pre‑launch and ongoing projects along OMR, GST Road and other Chennai growth corridors.',
                ],
                [
                  'New Projects in Pune',
                  'Under‑construction projects in Pune with a focus on IT‑driven catchments and upcoming metro influence zones.',
                ],
                [
                  'New Projects in Bangalore',
                  'Premium and mid‑segment launches across North, East and South Bengaluru with strong rental demand.',
                ],
                [
                  'New Projects in Hyderabad',
                  'New projects in Hyderabad’s western corridor and emerging affordable pockets on the periphery.',
                ],
              ].map(([label, text]) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => setDetailText(text)}
                    className="hover:text-gray-100 text-left w-full"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Services */}
          <div>
            <h4 className="text-base font-semibold mb-2">Property Services</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              {[
                [
                  'Home Loan',
                  'Estimate your eligibility, compare indicative interest rates and understand documentation needed for a home loan.',
                ],
                [
                  'Home Interior',
                  'Plan interiors for your new home with layout ideas, material suggestions and budgeting tips.',
                ],
                [
                  'Property Management',
                  'Get help managing rent, documentation and basic upkeep for properties you do not occupy full‑time.',
                ],
              ].map(([label, text]) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => setDetailText(text)}
                    className="hover:text-gray-100 text-left w-full"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Network + apps + social icons */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h5 className="text-sm font-semibold mb-2">More from our Network</h5>
            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <a
                href="https://www.timesnownews.com/business-economy/real-estate"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  setDetailText(
                    'Times Now Real Estate coverage tracks policy announcements, infrastructure projects and city‑wise developments that shape housing demand across India.'
                  )
                }
                className="hover:text-gray-100"
              >
                Times Now
              </a>
              <a
                href="https://economictimes.indiatimes.com/wealth/real-estate"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  setDetailText(
                    'ET Now and the Economic Times real‑estate section analyse prices, funding trends and major deals, helping you understand the investment side of housing.'
                  )
                }
                className="hover:text-gray-100"
              >
                ET Now
              </a>
            </div>
          </div>

          {/* App store badges + social media (external only) */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            {/* App store badges */}
            <div className="flex gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.timesgroup.magicbricks"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-xs font-medium hover:bg-gray-800"
              >
                <span className="inline-block h-4 w-4 bg-green-500 rounded-sm" />
                <span>Get it on Google Play</span>
              </a>
              <a
                href="https://apps.apple.com/us/app/magicbricks-property-search/id486328406"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-xs font-medium hover:bg-gray-800"
              >
                <span className="inline-block h-4 w-4 bg-white rounded-sm" />
                <span>Download on the App Store</span>
              </a>
            </div>

            {/* Social icons – Magicbricks handles */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/magicbricks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-blue-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5 8.5H15V6h-1.5C10.91 6 9.5 7.46 9.5 10.25V12H8v2.5h1.5V20h3v-5.5H15V12h-2.5v-1.75c0-.86.23-1.75 1-1.75z" />
                </svg>
              </a>
              <a
                href="https://x.com/magicbricks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-sky-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 4H15.9l-3 3.8L10 4H6.5l4.5 6.1L6 20h1.6l3.3-4.1L14 20h3.5l-4.7-6.5L17.5 4z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/magicbricks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-blue-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.5 6.5C6.5 7.9 5.4 9 4 9S1.5 7.9 1.5 6.5 2.6 4 4 4s2.5 1.1 2.5 2.5zM2 10h4v10H2V10zm7 0h3.8v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.4V20h-4v-3.8c0-.9 0-2.1-1.3-2.1s-1.5 1-1.5 2.1V20H9V10z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@magicbricks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.6 7.2s-.2-1.5-.8-2.1c-.8-.9-1.7-.9-2.1-1C15.8 4 12 4 12 4s-3.8 0-6.7.1c-.4.1-1.3.1-2.1 1-.6.6-.8 2.1-.8 2.1S2 8.9 2 10.6v1.6c0 1.7.2 3.4.2 3.4s.2 1.5.8 2.1c.8.9 1.9.8 2.4.9 1.7.2 7 .2 7 .2s3.8 0 6.7-.1c.4-.1 1.3-.1 2.1-1 .6-.6.8-2.1.8-2.1s.2-1.7.2-3.4v-1.6c0-1.7-.2-3.4-.2-3.4zM10 14.8V8.8l4.9 3-4.9 3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* FAQ + Disclaimer */}
        <div className="border-t border-gray-800 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-base font-semibold mb-3">Frequently Asked Questions</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {faqs.map((item, index) => (
                <li key={item.q}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaqIndex(openFaqIndex === index ? null : index)
                    }
                    className="hover:text-gray-100 text-left w-full"
                  >
                    {item.q}
                  </button>
                  {openFaqIndex === index && (
                    <p className="mt-1 text-xs text-gray-300 leading-relaxed">
                      {item.a}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-gray-400 leading-relaxed">
            <p>
              Disclaimer: Router Real‑Estate is an intermediary platform offering its services
              to display property advertisements submitted by users. We do not own or control
              any of the properties listed, nor do we guarantee the accuracy of information
              provided by sellers, builders or brokers. Buyers and renters are strongly
              advised to verify all documentation and property details independently before
              entering into any transaction.
            </p>
          </div>
        </div>

        {/* Detail panel – shows extra text for clicks within the footer */}
        <div className="border-t border-gray-800 pt-4">
          <h5 className="text-sm font-semibold mb-1 text-gray-100">More details</h5>
          <p className="text-xs text-gray-300 leading-relaxed">{detailText}</p>
        </div>

        {/* Bottom navigation: Terms, Privacy, FAQ, News – internal text only */}
        <div className="border-t border-gray-800 pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-gray-300">
          <ul className="flex flex-wrap gap-6">
            <li>
              <button
                type="button"
                onClick={() =>
                  setDetailText(
                    'By using Router Real‑Estate, you agree to follow our terms and conditions, which cover acceptable use of the platform, listing guidelines and limitations of liability.'
                  )
                }
                className="hover:text-gray-100"
              >
                Terms &amp; Conditions
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  setDetailText(
                    'Our privacy policy explains how we collect, use and safeguard your personal information, including contact details, search behaviour and communication preferences.'
                  )
                }
                className="hover:text-gray-100"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  setDetailText(
                    'The FAQ section addresses common questions about posting properties, searching listings, using filters, contacting owners and managing your account.'
                  )
                }
                className="hover:text-gray-100"
              >
                FAQ
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  setDetailText(
                    'In our News highlights, you will find curated updates on housing demand, policy changes, infrastructure projects and interest rate moves that affect real‑estate.'
                  )
                }
                className="hover:text-gray-100"
              >
                News
              </button>
            </li>
          </ul>

          <p className="text-[11px] text-gray-400">
            © 2025 Router Real‑Estate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;