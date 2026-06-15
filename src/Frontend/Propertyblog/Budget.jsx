import React from 'react';

const budgetPosts = [
  {
    id: 1,
    label: 'Budget 2025',
    author: 'Surbhi Gloria Singh',
    date: 'January 13, 2025',
    title:
      'Budget 2025: What the real estate sector seeks for homebuyers under Modi 3.0',
    url: 'https://www.business-standard.com/finance/personal-finance/budget-2025-what-real-estate-sector-seeks-for-homebuyers-under-modi-3-0-125011300622_1.html',
    image:
      'https://bsmedia.business-standard.com/_media/bs/img/article/2024-12/24/full/1735061901-0768.jpg?im=FeatureCrop,size=(826,465)',
    excerpt:
      'Explains how developers want higher home-loan tax breaks, revamped PMAY limits, more support for rental housing and simpler approvals to revive affordability and demand.',
  },
  {
    id: 2,
    label: 'Budget 2025',
    author: 'ETRealty Bureau',
    date: 'January 30, 2025',
    title:
      'Budget 2025: Real estate industry anticipates higher tax incentives for affordable housing',
    url: 'https://realty.economictimes.indiatimes.com/news/industry/budget-2025-real-estate-industry-anticipates-increased-tax-incentives-for-affordable-housing/117699750',
    image:
      'https://etimg.etb2bimg.com/photo/117700188.cms',
    excerpt:
      'Covers industry demands such as bigger Section 24(b) interest deductions, reinstating GST input credits and extended tax holidays to make affordable projects more viable.',
  },
  {
    id: 3,
    label: 'Budget 2025',
    author: 'Business Today Desk',
    date: 'January 31, 2025',
    title:
      'Budget 2025: Real estate stocks eye home-loan tax relief, higher affordable price cap',
    url: 'https://www.businesstoday.in/union-budget/story/budget-2025-real-estate-stocks-all-eyes-on-home-loan-tax-deduction-limit-price-cap-in-affordable-housing-462713-2025-01-31',
    image:
      'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202501/679c6d718f800-budget-2025-key-expectations-include-revision-in-the-thresholds-for-the-pradhan-mantri-awas-yojana-312756408-16x9.jpg?size=948:533',
    excerpt:
      'Looks at how markets are betting on higher interest deductions and a raised affordable housing cap to support residential demand and real estate stocks.',
  },
  {
    id: 4,
    label: 'Budget 2025',
    author: 'Business Upturn Staff',
    date: 'January 2025',
    title:
      'Union Budget 2025: Real estate leaders seek tax relief, PMAY boost and urban-regeneration push',
    url: 'https://www.businessupturn.com/finance/policy/budget/union-budget-2025-real-estate-leaders-call-for-tax-relief-pmay-boosts-and-urban-regeneration-initiatives/',
    image:
      'https://www.businessupturn.com/wp-content/uploads/2023/10/real-estate.jpg',
    excerpt:
      'Industry voices call for higher PMAY allocations, bigger home-loan deductions, single-window clearances and digitised land records to speed up housing projects.',
  },
  {
    id: 5,
    label: 'Budget 2025',
    author: 'Marathon Group Editorial',
    date: 'February 5, 2025',
    title: 'Union Budget 2025–26: Key takeaways for the real estate sector',
    url: 'https://marathon.in/home-buying-guide/union-budget-2025-26/',
    image:
      'https://marathon.in/wp-content/uploads/2025/02/blog_header00002.jpg',
    excerpt:
      'Summarises post-budget measures such as higher TDS limits on rent, bigger urban development funds and more money for SWAMIH 2.0 to finish stalled housing projects.',
  },
  {
    id: 6,
    label: 'Budget 2025',
    author: 'ETGovernment',
    date: 'February 2025',
    title:
      'Union Budget 2025: A new dawn for India’s real estate and proptech sectors',
    url: 'https://government.economictimes.indiatimes.com/blog/union-budget-2025-a-new-dawn-for-the-real-estate-and-proptech-sectors/117942729',
    image:
      'https://etimg.etb2bimg.com/photo/117943133.cms',
    excerpt:
      'Explores how higher infrastructure spend, support for EV-ready townships and incentives for construction tech can open new opportunities for developers and proptech firms.',
  },
  {
    id: 7,
    label: 'Budget 2025',
    author: 'Business Standard Bureau',
    date: 'January 29, 2025',
    title:
      'Industry status for real estate a key priority, finds Grant Thornton pre-budget survey',
    url: 'https://www.business-standard.com/budget/news/industry-status-for-real-estate-a-priority-grant-thornton-survey-125012901448_1.html',
    image:
      'https://bsmedia.business-standard.com/_media/bs/img/article/2024-07/28/full/1722188317-9878.jpg?im=FeatureCrop,size=(826,465)',
    excerpt:
      'Survey highlights expectations around industry status, simpler GST on under-construction homes, stamp-duty rationalisation and better access to institutional funding.',
  },
  {
    id: 8,
    label: 'Budget 2025',
    author: 'Aurum PropTech Editorial',
    date: 'January 2025',
    title:
      'Shaping the future: What India’s real estate industry hopes to see in Budget 2025–26',
    url: 'https://www.aurumproptech.in/pulse/media/shaping-the-future-what-the-real-estate-industry-hopes-to-see-in-budget-2025-2026',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Discusses asks like higher home-loan interest deductions, tax incentives for REITs and long-awaited industry status to deepen investment into housing.',
  },
];

const sidebarLinks = [
  'Rent House in Chennai',
  'House for sale in Bangalore',
  'Rent House in Bangalore',
  'Rent Flats in Bangalore',
  'Rent Flats in Pune',
  'Rent House in Coimbatore',
  'Rent House in Hyderabad',
  'House for sale in Hyderabad',
  'Flats in Hyderabad',
  'Rent Flats in Hyderabad',
  'Rent Flats in Mumbai',
];

const Budget2024 = () => {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 lg:px-0">
        {/* Category + breadcrumb */}
        <p className="text-[11px] font-semibold tracking-wide text-gray-600">
          CATEGORY:{' '}
          <span className="text-gray-900">BUDGET 2025</span>
        </p>
        <p className="mt-1 text-[11px] text-gray-500">
          Home » <span className="font-medium text-gray-700">Property Trends</span> »{' '}
          <span className="font-medium text-gray-700">Budget 2025</span>
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[3fr,1.3fr]">
          {/* Left column – news cards */}
          <div className="space-y-8">
            {budgetPosts.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-y border-gray-200 py-6 hover:bg-gray-50"
              >
                <div className="flex flex-col gap-6 md:flex-row">
                  {/* Image + label */}
                  <div className="relative w-full overflow-hidden md:w-2/5">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-52 w-full object-cover transition-transform duration-300 md:h-44 md:w-full md:object-cover md:hover:scale-105"
                    />
                    <span className="absolute left-2 top-2 inline-block bg-black/85 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                      {post.label}
                    </span>
                  </div>

                  {/* Text content */}
                  <div className="flex-1 md:w-3/5">
                    <p className="text-[11px] font-semibold tracking-wide text-gray-500">
                      BY{' '}
                      <span className="text-gray-800">
                        {post.author.toUpperCase()}
                      </span>{' '}
                      | {post.date}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold leading-snug text-gray-900">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                      {post.excerpt}
                    </p>
                    <span className="mt-3 inline-block text-[11px] font-semibold uppercase tracking-wide text-purple-700">
                      Read full story
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Right column – sidebar */}
          <aside className="space-y-6">
            <div className="bg-black px-5 py-4 text-xs text-white">
              <p className="font-semibold">
                For any feedback, write to us at
              </p>
              <p className="mt-2 text-[11px] font-medium">
                editor@yourrealestate.com
              </p>
            </div>

            <div className="border border-gray-200 bg-white px-5 py-4">
              <h3 className="text-[11px] font-semibold uppercase tracking-wide text-gray-700">
                Popular Searches
              </h3>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-[13px] text-purple-700">
                {sidebarLinks.map((item, index) => (
                  <li
                    key={index}
                    className="cursor-pointer hover:underline"
                  >
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            <div className="border border-gray-200 bg-white px-5 py-4">
              <h3 className="text-[11px] font-semibold uppercase tracking-wide text-gray-700">
                Read in other languages
              </h3>
              <ul className="mt-3 space-y-1 text-[13px] text-purple-700">
                <li className="cursor-pointer hover:underline">Marathi</li>
                <li className="cursor-pointer hover:underline">Telugu</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Budget2024;