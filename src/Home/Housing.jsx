import React from 'react';

const articles = [
  {
    id: 1,
    category: 'Research',
    title: 'How do environmental and social factors impact real estate market?',
    author: 'Harini Balasubramanian',
    date: 'July 4, 2025',
    image:
      'https://assets-news.housing.com/news/wp-content/uploads/2025/07/03152207/Untitled-design-4-compressed.jpg',
    href: 'https://housing.com/news/how-do-environmental-and-social-factors-impact-real-estate-market/',
    excerpt:
      'Explores how climate risk, sustainability and social factors like demographics and urbanisation shape India’s housing demand and price trends.',
  },
  {
    id: 2,
    category: 'Research',
    title: 'Understanding real estate market cycles',
    author: 'Sagar Sharma',
    date: 'November 6, 2025',
    image:
      'https://assets-news.housing.com/news/wp-content/uploads/2025/07/02170131/Untitled-design-1-compressed.jpg',
    href: 'https://housing.com/news/understanding-real-estate-market-cycles/',
    excerpt:
      'Breaks down recovery, expansion, peak and recession phases of real estate cycles, and how buyers and developers can adjust strategies to each.',
  },
  {
    id: 3,
    category: 'Research',
    title:
      'Realty Round-Up Dec’24: As the year ends, new opportunities drive demand',
    author: 'Housing Research Team',
    date: 'December 27, 2024',
    image:
      'https://assets-news.housing.com/news/wp-content/uploads/2024/09/23194444/Realty-Roundup-SepT.jpg',
    href: 'https://housing.com/news/realty-round-up-dec24-as-2025-begins-new-opportunities-drive-demand/',
    excerpt:
      'Summarises December 2024 housing trends, highlighting new launches in key cities and policy cues that could boost demand in 2025.',
  },
  {
    id: 4,
    category: 'Research',
    title:
      'Realty Roundup Oct 2024: New supply to enter as festive season begins',
    author: 'Housing Research Team',
    date: 'November 6, 2024',
    image:
      'https://assets-news.housing.com/news/wp-content/uploads/2024/11/23181926/October-Roundup-T-1.jpg',
    href: 'https://housing.com/news/realty-roundup-oct-2024-2/',
    excerpt:
      'Covers sales, supply and price movements in India’s top markets ahead of the festive quarter, with focus on launches and loan-rate outlook.',
  },
];

const Housing = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 pt-10">
        {/* Breadcrumb + page title */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-1">
            Home &raquo; Housing Trends
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Housing Trends – Research &amp; News
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Curated research articles and news reports from Housing.com.
          </p>
        </div>

        {/* Article list */}
        <div className="space-y-8 sm:space-y-10">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md:w-2/5 relative block group"
                >
                  <div className="h-56 md:h-full w-full overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover transform group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                  <span className="absolute top-3 left-3 bg-black/80 text-white text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded">
                    {article.category}
                  </span>
                </a>

                {/* Text content */}
                <div className="md:w-3/5 px-5 sm:px-6 py-4 sm:py-5 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-medium tracking-wide text-gray-500 uppercase mb-1">
                      By {article.author}{' '}
                      <span className="mx-1">|</span>
                      {article.date}
                    </p>
                    <a
                      href={article.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug hover:text-indigo-700">
                        {article.title}
                      </h2>
                    </a>
                    <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-4">
                    <a
                      href={article.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-indigo-700 hover:text-indigo-800"
                    >
                      READ FULL STORY
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Housing;