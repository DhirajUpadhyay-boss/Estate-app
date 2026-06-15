import React from 'react';

const posts = [
  {
    id: 1,
    label: 'Market Trends',
    author: 'ETRealty',
    date: 'December 27, 2025',
    title:
      'Housing sales fall 14% in 2025 across top cities, but value rises 6%: Anarock',
    url: 'https://realty.economictimes.indiatimes.com/news/residential/housing-sales-fall-14-in-2025-across-top-cities-but-value-rises-6-anarock/126199209',
    image:
      'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Anarock data shows sales volumes across the top seven cities dropped 14% in 2025 even as the total value of homes sold rose 6%, driven by demand for higher‑ticket housing.',
  },
  {
    id: 2,
    label: 'Market Trends',
    author: 'ETRealty',
    date: 'July 3, 2025',
    title: 'One in two homes sold in H1 2025 cost over ₹1 crore',
    url: 'https://realty.economictimes.indiatimes.com/news/residential/half-of-h1-2025-home-sales-in-india-exceed-1-crore/122231363',
    image:
      'https://etimg.etb2bimg.com/photo/122231384.cms',
    excerpt:
      'Knight Frank’s H1 2025 report finds that nearly half of all homes sold in India’s top cities were priced above ₹1 crore, underscoring the premiumisation of demand.',
  },
  {
    id: 3,
    label: 'Market Trends',
    author: 'PTI / ETRealty',
    date: 'April 4, 2025',
    title: 'Housing sales in India may fall 28% in Q1 2025: Anarock',
    url: 'https://realty.economictimes.indiatimes.com/news/residential/housing-sales-in-india-may-fall-28-in-q1-fy25-anarock/119603225',
    image:
      'https://images.unsplash.com/photo-1459535653751-d571815e906b?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Anarock estimates Q1 2025 sales across seven major cities fell sharply amid high prices and global uncertainties, after multiple years of strong growth.',
  },
  {
    id: 4,
    label: 'Market Trends',
    author: 'TOI',
    date: '2025',
    title:
      "Chennai's housing market sales rise 15%, bucking national slowdown trend",
    url: 'https://timesofindia.indiatimes.com/city/chennai/chennais-housing-market-sales-rise-by-15-buck-national-slowdown-trend/articleshow/126277923.cms',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'While most top cities saw slower housing sales in 2025, Chennai posted double‑digit growth supported by end‑user demand and a strong mid‑income segment.',
  },
  {
    id: 5,
    label: 'Market Trends',
    author: 'Sunainaa Chadha',
    date: 'August 13, 2025',
    title:
      'Home prices surge 7.7% annually: India beats US, UK, Australia, ranks 15th',
    url: 'https://www.business-standard.com/finance/personal-finance/home-prices-surge-7-7-annually-india-beats-us-uk-australia-ranks-15th-125081300143_1.html',
    image:
      'https://bsmedia.business-standard.com/_media/bs/img/article/2025-07/20/full/1753030419-6721.jpg?im=FeatureCrop,size=(826,465)',
    excerpt:
      'Knight Frank’s Global House Price Index Q1 2025 shows Indian home prices up 7.7% year‑on‑year, placing the country among the world’s better‑performing markets.',
  },
  {
    id: 6,
    label: 'Market Trends',
    author: 'TNN',
    date: '2025',
    title:
      'In Pune, new home sales down 20% in 2025; experts cite US tariffs, IT layoffs',
    url: 'https://timesofindia.indiatimes.com/city/pune/in-pune-city-new-home-sales-down-20-in-2025-experts-cite-us-tariffs-it-layoffs-as-factors/articleshow/126239215.cms',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'After record sales in 2024, Pune’s new home sales slipped in 2025 amid global headwinds, even as demand for larger and premium homes stayed resilient.',
  },
  {
    id: 7,
    label: 'Market Trends',
    author: 'Abhijeet Kumar',
    date: 'January 31, 2025',
    title:
      'Economic Survey highlights real estate boom, demand to hit 93 mn by 2036',
    url: 'https://www.business-standard.com/budget/news/india-real-estate-growth-2025-rera-gst-infrastructure-125013101263_1.html',
    image:
      'https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'The Economic Survey 2024‑25 projects housing demand of 93 million units by 2036, citing reforms, infrastructure and metro expansion as key growth drivers.',
  },
  {
    id: 8,
    label: 'Market Trends',
    author: 'Press Trust of India',
    date: 'January 28, 2025',
    title:
      'Housing prices to moderate at 3–4% in FY26 on high base effect: Ind-Ra',
    url: 'https://www.business-standard.com/industry/news/housing-prices-to-moderate-at-3-4-in-fy26-on-high-base-effect-ind-ra-125012801235_1.html',
    image:
      'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'India Ratings expects home price growth to cool to 3–4% in FY26 after a sharp run‑up, as new launches and better supply ease pressures.',
  },
  {
    id: 9,
    label: 'Market Trends',
    author: 'Padmini Dhruvaraj',
    date: 'October 29, 2025',
    title:
      '₹2–5 crore homes become the sweet spot in India’s housing market in FY26',
    url: 'https://www.moneycontrol.com/news/business/real-estate/homes-worth-rs-2-5-crore-are-now-the-sweet-spot-in-india-s-residential-housing-market-13640512.html',
    image:
      'https://images.moneycontrol.com/static-mcnews/2024/05/20240516140629_dlfbbg.jpg?impolicy=website&width=770&height=431',
    excerpt:
      'JLL data shows homes priced between ₹2–5 crore emerging as the most active segment as buyers upgrade and developers pivot to premium projects.',
  },
  {
    id: 10,
    label: 'Market Trends',
    author: 'TNN',
    date: 'December 8, 2025',
    title: 'Luxury housing supply jumps, enters newer cities: Report',
    url: 'https://timesofindia.indiatimes.com/business/india-business/luxury-housing-supply-jumps-enters-newer-cities-report/articleshow/125824290.cms',
    image:
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'A Magicbricks report says luxury homes now form over a quarter of housing supply, with demand strongest in the ₹2–5 crore bracket and spreading to new cities.',
  },
  {
    id: 11,
    label: 'Market Trends',
    author: 'Rimjhim Singh',
    date: 'September 22, 2025',
    title:
      'India ranks 4th in Apac for real estate capital inflows in H1 2025: Report',
    url: 'https://www.business-standard.com/industry/news/india-ranking-apac-asia-pacific-real-estate-investment-domestic-capital-125092200490_1.html',
    image:
      'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Colliers reports India as the 4th‑largest Apac destination for real estate capital in H1 2025, with domestic and foreign investors stepping up deployments.',
  },
  {
    id: 12,
    label: 'Market Trends',
    author: 'BS Reporter',
    date: 'November 21, 2025',
    title:
      "India's real estate may get institutional investments of ₹5–7 bn in 2025",
    url: 'https://www.business-standard.com/industry/news/india-s-real-estate-may-get-institutional-investments-of-5-7-bn-in-2025-125112100886_1.html',
    image:
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'A Colliers report pegs annual institutional investments into Indian real estate at $5–7 billion in 2025–26, highlighting sustained investor confidence.',
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

const Markets = () => {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 lg:px-0">
        {/* Category + breadcrumb */}
        <p className="text-[11px] font-semibold tracking-wide text-gray-600">
          CATEGORY{' '}
          <span className="text-gray-900">MARKET TRENDS</span>
        </p>
        <p className="mt-1 text-[11px] text-gray-500">
          Home » <span className="font-medium text-gray-700">Market Trends</span>
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[3fr,1.3fr]">
          {/* Left column – news cards */}
          <div className="space-y-8">
            {posts.map((post) => (
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
            {/* Feedback box */}
            <div className="bg-black px-5 py-4 text-xs text-white">
              <p className="font-semibold">For any feedback, write to us at</p>
              <p className="mt-2 text-[11px] font-medium">
                editor@housing.com
              </p>
            </div>

            {/* Popular searches */}
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

            {/* Languages */}
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

export default Markets;