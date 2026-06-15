import React from 'react';

const currentNewsPosts = [
  {
    id: 1,
    label: 'Current News',
    author: 'Reuters Staff',
    date: 'December 9, 2025',
    title:
      'India home prices to rise at steady 6% pace but luxury sector may lose steam',
    url: 'https://www.reuters.com/world/india/india-home-prices-rise-steady-6-pace-luxury-sector-may-lose-steam-2025-12-09/',
    image:
      'https://www.reuters.com/resizer/v2/RUQVBXLVNFKX3MKQQ5AVRC5PMM.jpg?auth=b5029f637569f4c91f05006952dd51b92c5897188b4273f17f89fcef181040dd&width=720&quality=80',
    excerpt:
      'A Reuters poll of property analysts suggests Indian home prices may keep rising around 6% annually, even as the current boom in ultra‑luxury housing is expected to cool over the next few years.',
  },
  {
    id: 2,
    label: 'Current News',
    author: 'NDTV Profit News',
    date: 'December 5, 2025',
    title:
      'RBI monetary policy: Experts see rise in affordable and mid‑segment housing demand after 25‑bps rate cut',
    url: 'https://www.ndtvprofit.com/amp/economy-finance/rbi-monetary-policy-experts-predict-rise-in-affordable-mid-segment-housing-demand-after-25-bps-rate-cut',
    image:
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'The RBI’s latest 25‑basis‑point repo rate cut to 5.25% is expected to reduce EMIs and revive demand in both residential and commercial real estate, especially in affordable and mid‑income segments.',
  },
  {
    id: 3,
    label: 'Current News',
    author: 'Sanjeev Sinha',
    date: 'March 30, 2025',
    title:
      'RBI rate cuts to boost housing demand, enhance affordability in FY26',
    url: 'https://www.financialexpress.com/money/rbi-rate-cuts-to-boost-housing-demand-enhance-affordability-in-fy26-3793113/',
    image:
      'https://www.financialexpress.com/wp-content/uploads/2025/03/home-loan4.webp?w=1024',
    excerpt:
      'With cumulative repo cuts expected to touch 75 bps, analysts say lower mortgage rates could meaningfully improve home affordability and support housing demand across key cities.',
  },
  {
    id: 4,
    label: 'Current News',
    author: 'New Indian Express Business Desk',
    date: 'February 7, 2025',
    title: 'Repo rate cut to spur housing demand',
    url: 'https://www.newindianexpress.com/business/2025/Feb/07/repo-rate-cut-to-spur-housing-demand',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Developers say the first repo rate cut in five years should lift buyer sentiment, lower borrowing costs and trigger fresh launches, particularly in the affordable housing category.',
  },
  {
    id: 5,
    label: 'Current News',
    author: 'Propsur Editorial Team',
    date: 'November 7, 2025',
    title: 'Gurgaon metro expansion: How it will impact the real estate sector',
    url: 'https://www.propsur.com/articles/gurgaon-metro-expansion-how-it-will-impact-the-real-estate-sector',
    image:
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'A new 28.5‑km metro corridor with 27 stations is expected to push up property values, rentals and new launches across Gurugram’s key residential and commercial micro‑markets.',
  },
  {
    id: 6,
    label: 'Current News',
    author: 'Times of India Bureau',
    date: 'December 3, 2025',
    title: 'DDA doubles revenue from latest e‑auction',
    url: 'https://timesofindia.indiatimes.com/city/delhi/dda-doubles-revenue-from-latest-e-auction/articleshow/125726193.cms',
    image:
      'https://images.unsplash.com/photo-1496302662116-35cc4f36df92?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Delhi Development Authority’s latest e‑auction of 81 plots across housing, commercial and industrial use fetched over ₹1,494 crore—more than twice the reserve price—signalling strong land demand.',
  },
  {
    id: 7,
    label: 'Current News',
    author: 'Times of India Mumbai Desk',
    date: 'December 5, 2025',
    title:
      'Worli’s ultra‑luxury homes rival Lower Manhattan prices as sales surge',
    url: 'https://timesofindia.indiatimes.com/city/mumbai/mumbais-worli-emerges-as-indias-ultra-luxe-hub-premium-apartments-fetch-up-to-rs-1-lakh-per-sq-ft-prices-rival-new-yorks-lower-manhattan/articleshow/125778585.cms',
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'A report shows Mumbai’s Worli micro‑market accounting for a large share of India’s ultra‑luxury flat sales, with prices touching ₹1 lakh per sq ft and drawing global‑level buyers.',
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

const CurrentNews = () => {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 lg:px-0">
        {/* Category + breadcrumb */}
        <p className="text-[11px] font-semibold tracking-wide text-gray-600">
          CATEGORY: <span className="text-gray-900">CURRENT NEWS</span>
        </p>
        <p className="mt-1 text-[11px] text-gray-500">
          Home » <span className="font-medium text-gray-700">Current News</span>
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[3fr,1.3fr]">
          {/* Left column – news cards */}
          <div className="space-y-8">
            {currentNewsPosts.map((post) => (
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

export default CurrentNews;