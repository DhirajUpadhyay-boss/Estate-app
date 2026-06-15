import React from "react";

const localityArticles = [
  // --- GURGAON / GURUGRAM ---
  {
    id: 1,
    city: "Gurugram",
    categoryLabel: "Property Trends",
    type: "Locality Insight",
    title:
      "New Gurugram Emerges as an Affordable Premium Real Estate Hub",
    source: "APN News",
    date: "September 19, 2025",
    excerpt:
      "New Gurugram is evolving into an ‘affordable premium’ micro-market, with strong demand driven by metro connectivity, upcoming infrastructure and competitive pricing versus core Gurgaon.",
    image:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
    url: "https://www.apnnews.com/new-gurugram-emerges-as-an-affordable-premium-real-estate-hub-with-strong-growth/",
  },
  {
    id: 2,
    city: "Gurugram",
    categoryLabel: "Market Watch",
    type: "Housing Market 2025",
    title: "Gurgaon Housing Market 2025: Emerging Sectors & Investment Insights",
    source: "Sobha Blog",
    date: "October 2025",
    excerpt:
      "Residential prices in Gurgaon have risen sharply since 2020, supported by new metro links, drainage upgrades and strong luxury as well as mid-premium housing demand.",
    image:
      "https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?auto=compress&cs=tinysrgb&w=1200",
    url: "https://www.sobha.com/blog/gurugram-a-prominent-housing-market-in-north/",
  },

  // --- NOIDA ---
  {
    id: 3,
    city: "Noida",
    categoryLabel: "Property Trends",
    type: "Investment Focus",
    title:
      "Noida Real Estate Market 2025: Trends, Prices & What to Expect",
    source: "HousingInIndia",
    date: "June 2025",
    excerpt:
      "With the upcoming Jewar International Airport and major corridors like the Noida–Greater Noida Expressway, Noida is seeing robust investor interest and healthy rental yields.",
    image:
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200",
    url: "https://www.housinginindia.com/noida-real-estate-market-in-2025-trends-prices-what-to-expect/",
  },
  {
    id: 4,
    city: "Noida",
    categoryLabel: "Price Trends",
    type: "Market Report",
    title:
      "Noida Real Estate: Property Prices More Than Double in Five Years",
    source: "Moneycontrol",
    date: "September 2024",
    excerpt:
      "Average prices for apartments along the Noida–Greater Noida Expressway and in Greater Noida West have jumped over 50–60% since 2019, reflecting strong end-user and office demand.",
    image:
      "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1200",
    url: "https://www.moneycontrol.com/news/business/real-estate/noida-real-estate-market-property-prices-more-than-double-in-last-five-years-12859262.html",
  },

  // --- DELHI / DELHI-NCR ---
  {
    id: 5,
    city: "Delhi",
    categoryLabel: "Investment Guide",
    type: "City Focus",
    title: "Delhi Real Estate: Your Complete Investment Guide 2025",
    source: "Royal Nivas",
    date: "September 29, 2025",
    excerpt:
      "Delhi’s housing market has posted strong yearly price growth, led by premium projects and renewed interest in established neighbourhoods like Dwarka, Rohini and South Delhi.",
    image:
      "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1200",
    url: "https://www.royalnivas.com/blog/delhi-real-estate-your-complete-investment-guide-2025",
  },
  {
    id: 6,
    city: "Delhi-NCR",
    categoryLabel: "Market Trends",
    type: "Regional Update",
    title:
      "Delhi-NCR Housing Market Surge: 24% Price Growth Leads India",
    source: "NoBroker Real Estate News",
    date: "October 6, 2025",
    excerpt:
      "Anarock data shows Delhi-NCR leading Indian metros in price growth, with Gurgaon and Noida contributing the bulk of new luxury launches and housing sales value.",
    image:
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1200",
    url: "https://blog.nobrokerage.com/realestatenews/delhi-ncr-housing-market-surge%3A-24-price-growth-leads-india",
  },
];

const sidebarLinks = [
  {
    label: "Top Luxury Projects in Gurugram",
    href: "https://www.skjlandbase.com/delhi-ncr-real-estate-boom-10245-new-homes-launched-in-q3-2025-gurgaon-leads-luxury-surge/",
  },
  {
    label: "Best Emerging Sectors in Noida for Investment",
    href: "https://www.commercialnoida.com/blog/the-rising-tide-property-prices-in-noida-on-the-upward-trend.html",
  },
  {
    label: "Delhi-NCR Real Estate Outlook 2025",
    href: "https://www.baazcapital.com/post/delhi-ncr-real-estate-outlook-2025",
  },
  {
    label: "Why Delhi-NCR Property Prices Are Surging",
    href: "https://www.housetrue.com/blog/delhi-ncr-property-prices-surge-2025",
  },
  {
    label: "Infrastructure Projects Shaping Delhi Real Estate",
    href: "https://propacity.com/blogs/future-of-delhi-real-estate-market-trends-and-investment-insights-for-2025/",
  },
  {
    label: "Latest Noida Real Estate News Updates",
    href: "https://cnc-24.in/category/noida-real-estate-news/",
  },
];

const LocalityTrends = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top purple header */}
      <header className="bg-[#5b2d90] text-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          <div className="flex items-center space-x-3">
            <span className="bg-white text-[#5b2d90] text-xs font-extrabold tracking-wide px-3 py-1 rounded-sm">
              REALTY
            </span>
            <span className="font-semibold tracking-wide text-sm md:text-base">
              Locality Trends
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-xs font-medium uppercase tracking-wide">
            <button className="hover:text-yellow-300">Home</button>
            <button className="hover:text-yellow-300">Property Trends</button>
            <button className="hover:text-yellow-300">Rent</button>
            <button className="hover:text-yellow-300">Lifestyle</button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        {/* Breadcrumb + category */}
        <section>
          <p className="text-[11px] font-semibold tracking-wide text-gray-500 uppercase">
            Category: Locality Trends
          </p>
          <p className="mt-1 text-[11px] text-gray-500">
            Home &gt; Property Trends &gt;{" "}
            <span className="text-[#5b2d90] font-semibold">Locality Trends</span>
          </p>
        </section>

        <section className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column – article cards */}
          <div className="lg:col-span-2 space-y-6">
            {localityArticles.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-gray-200 shadow-sm"
              >
                <div className="md:flex">
                  {/* Thumbnail */}
                  <div className="relative md:w-2/5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-52 md:h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-black/85 text-white text-[10px] font-semibold uppercase tracking-wide px-2 py-1">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Text content */}
                  <div className="md:w-3/5 p-4 md:p-5 flex flex-col">
                    <div className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
                      {item.city} • {item.type}
                    </div>

                    <h2 className="mt-2 text-lg md:text-xl font-semibold text-gray-900 leading-snug hover:text-[#5b2d90] transition-colors duration-150">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.title}
                      </a>
                    </h2>

                    <p className="mt-1 text-[11px] text-gray-500">
                      {item.source} • {item.date}
                    </p>

                    <p className="mt-3 text-sm text-gray-700">
                      {item.excerpt}
                    </p>

                    <div className="mt-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold tracking-wide uppercase text-[#5b2d90] hover:underline"
                      >
                        Read Full Story
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right column – sidebar */}
          <aside className="lg:col-span-1 space-y-5">
            {/* Feedback box */}
            <div className="bg-black text-white p-4">
              <p className="text-sm font-semibold">
                For any feedback, write to us at
              </p>
              <a
                href="mailto:editor@yourrealtysite.com"
                className="mt-2 block text-xs text-purple-200 underline"
              >
                editor@yourrealtysite.com
              </a>
            </div>

            {/* Hot links list */}
            <div className="bg-white border border-gray-200 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-800 mb-3">
                Hot Markets in NCR
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-[13px] text-[#5b2d90]">
                {sidebarLinks.map((link, index) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* Language selector */}
            <div className="bg-white border border-gray-200 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-800 mb-2">
                Read in other languages
              </h3>
              <button className="text-[13px] text-[#5b2d90] hover:underline">
                Hindi
              </button>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default LocalityTrends;