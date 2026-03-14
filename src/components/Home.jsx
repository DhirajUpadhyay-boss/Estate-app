import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Home = () => {
  const [researchItems, setResearchItems] = useState([]);
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
  axios.get('http://localhost:5000/api/research')
    .then((res) => {
      if (Array.isArray(res.data)) setResearchItems(res.data);
      else console.error('Expected array, got:', res.data);
    })
    .catch((err) => console.error('Failed to fetch research:', err));

  axios.get('http://localhost:5000/api/news')
    .then((res) => {
      if (Array.isArray(res.data)) setNewsItems(res.data);
      else console.error('Expected array, got:', res.data);
    })
    .catch((err) => console.error('Failed to fetch news:', err));
}, []);


  return (
    <div id="Home" className="w-full min-h-screen flex flex-col bg-white">
      {/* Hero Section with background image */}
      <section
        className="relative h-screen w-full"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Subtle dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
              Explore homes that fit your dreams
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/projects"
                className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 font-medium"
              >
                Projects
              </Link>
              <a
                href="#Contact"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Research and Insights */}
      <section className="bg-white pt-16 pb-10 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Research and Insights
          </h3>
          <p className="text-gray-600 mb-6 sm:mb-8">
            Explore useful real estate insights
          </p>

          {/* Horizontal scroll container */}
          <div className="overflow-x-auto">
            <div className="flex gap-6 pb-4 min-w-full">
              {researchItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.route}
                  className="min-w-[260px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[340px] bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex-shrink-0 text-left"
                >
                  <div className="w-full h-44 sm:h-48 md:h-52 overflow-hidden rounded-t-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1 flex items-center">
                      {item.title}
                      <span className="ml-1 text-xl leading-none">›</span>
                    </h4>
                    <p className="text-sm text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News and Articles */}
      <section className="bg-white pb-20 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                News and Articles
              </h3>
              <p className="text-gray-600">
                Read what&apos;s happening in Real Estate
              </p>
            </div>
            <button
              type="button"
              className="self-start sm:self-auto px-4 py-2 border border-gray-300 rounded-full text-sm font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors"
            >
              See all news and articles ›
            </button>
          </div>

          {/* Horizontal scroll container */}
          <div className="overflow-x-auto">
            <div className="flex gap-6 pb-4 min-w-full">
              {newsItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[380px] bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex-shrink-0"
                >
                  <div className="w-full h-44 sm:h-52 md:h-56 overflow-hidden rounded-t-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
                      <span>{item.author}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;