import React, { useState, useEffect } from 'react';
import { Search, Heart, Loader2 } from 'lucide-react';
import { useUser } from '../../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

// Simple debounce hook
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

const Projects = () => {
  // ✅ hooks must be INSIDE component
  const navigate = useNavigate();
  const { isLoggedIn, authLoading } = useUser();

  // API state
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [userloggedIn, setuserloggedIn] = useState(true)

  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'All',
    location: '',
  });
  const [favorites, setFavorites] = useState([]);
  const [revealedPhones, setRevealedPhones] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');

  const debouncedSearch = useDebounce(searchTerm, 500);

  // Guard before opening external property link
  const handlePropertyClick = (e, href) => {
    if (!authLoading && !isLoggedIn) {
      setuserloggedIn(false);
      e.preventDefault();
      alert('Please register / login to view full property details.');
      navigate('/register');
    }
   
  };

  // Fetch mock properties once
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        const mockData = [
          {
            id: 1,
            title: 'Luxury Villa',
            location: 'Gurgaon, Haryana',
            price: '₹2.5 Cr',
            priceValue: 250,
            pricePerSqft: '₹7,800 per sqft',
            bedrooms: 4,
            bathrooms: 3,
            size: 3200,
            status: 'Ready to Move',
            floor: '2 out of 3',
            furnishing: 'Semi-Furnished',
            type: 'Villa',
            amenities: ['Pool', 'Garden', 'Parking'],
            images: [
              'https://th.bing.com/th/id/R.db77947d08bdabee4c59603b12ecdeae?rik=ZtMnnowpJlUJWQ&riu=http%3a%2f%2fwww.optus.in%2fimages%2fcms_images%2fBOUTIQUE-VILLA2-6218.jpg&ehk=61jzxxQ0qx1h9lgqdnmfIKxKfe4qvXbHRZNVqfOwqlo%3d&risl=&pid=ImgRaw&r=0',
            ],
            href: 'https://www.magicbricks.com/propertyDetails/5-BHK-4750-Sq-ft-Villa-FOR-Sale-Sector-82-in-Gurgaon&id=4d423831393933313039',
            description:
              'Spacious villa with modern amenities in a prime Gurgaon location.',
            date: '2024-01-15',
            posted: 'Updated yesterday',
            photoCount: '8 Photos',
            owner: 'Rohit',
            phone: '+91-98XXXX1234',
          },
          {
            id: 2,
            title: 'Modern Apartment',
            location: 'Noida, Uttar Pradesh',
            price: '₹1.2 Cr',
            priceValue: 120,
            pricePerSqft: '₹6,000 per sqft',
            bedrooms: 2,
            bathrooms: 2,
            size: 1200,
            status: 'Under Construction',
            floor: '7 out of 15',
            furnishing: 'Unfurnished',
            type: 'Apartment',
            amenities: ['Gym', 'Parking'],
            images: [
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
            ],
            description: 'Stylish apartment with modern interiors in Noida.',
            date: '2024-02-20',
            posted: 'Posted: Today',
            photoCount: '12 Photos',
            owner: 'Anjali',
            phone: '+91-97XXXX5678',
          },
          {
            id: 3,
            title: 'Family House',
            location: 'Delhi, Delhi NCR',
            price: '₹3.5 Cr',
            priceValue: 350,
            pricePerSqft: '₹8,200 per sqft',
            bedrooms: 5,
            bathrooms: 4,
            size: 4500,
            status: 'Ready to Move',
            floor: 'Ground + 2',
            furnishing: 'Furnished',
            type: 'House',
            amenities: ['Garden', 'Garage'],
            images: [
              'https://assets.architecturaldigest.in/photos/61922845a69fa9f9fffb41cf/16:9/w_2560%2Cc_limit/delhi%2520farmhouse.png',
            ],
            description:
              'Luxurious family home in the heart of Delhi with ample space.',
            date: '2024-03-10',
            posted: 'Posted: 3 days ago',
            photoCount: '15 Photos',
            owner: 'Karan',
            phone: '+91-99XXXX2244',
          },
          {
            id: 4,
            title: 'Cozy Flat',
            location: 'Noida, Uttar Pradesh',
            price: '₹85 Lac',
            priceValue: 85,
            pricePerSqft: '₹5,500 per sqft',
            bedrooms: 2,
            bathrooms: 2,
            size: 1100,
            status: 'Ready to Move',
            floor: '5 out of 10',
            furnishing: 'Semi-Furnished',
            type: 'Apartment',
            amenities: ['Garden'],
            images: [
              'https://api.staybluo.com/property_assets/property_images/119/1667973859-Photo%2003-11-22,%203%2050%2003%20PM.jpg',
            ],
            description:
              'Compact and cozy flat perfect for small families in Noida.',
            date: '2024-01-25',
            posted: 'Posted: 1 week ago',
            photoCount: '7 Photos',
            owner: 'Meera',
            phone: '+91-96XXXX8899',
          },
          {
            id: 5,
            title: 'Premium 3 BHK Apartment',
            location: 'Ghaziabad',
            price: '₹1.8 Cr',
            priceValue: 180,
            pricePerSqft: '₹9,000 per sqft',
            bedrooms: 3,
            bathrooms: 3,
            size: 2000,
            status: 'Ready to Move',
            floor: '10 out of 20',
            furnishing: 'Furnished',
            type: 'Apartment',
            amenities: ['Club House', 'Gym', 'Parking'],
            images: [
              'https://www.nbrgroup.in/assets/new-website/images/nbr-new-seo.png',
            ],
            description:
              'Premium 3 BHK apartment with excellent connectivity and amenities.',
            date: '2024-04-05',
            posted: 'Updated 2 days ago',
            photoCount: '10 Photos',
            owner: 'Aman',
            phone: '+91-90XXXX6543',
          },
        ];

        await new Promise((resolve) => setTimeout(resolve, 800));

        setProperties(mockData);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load properties');
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter + sort logic
  const getFilteredProperties = () => {
    let filtered = [...properties];

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (prop) =>
          prop.title.toLowerCase().includes(q) ||
          prop.location.toLowerCase().includes(q)
      );
    }

    if (filters.type !== 'All') {
      const typeFilter = filters.type.toLowerCase();
      filtered = filtered.filter(
        (prop) => prop.type && prop.type.toLowerCase() === typeFilter
      );
    }

    if (filters.location) {
      const loc = filters.location.toLowerCase();
      filtered = filtered.filter((prop) =>
        prop.location.toLowerCase().includes(loc)
      );
    }

    if (sortBy === 'priceLow') {
      filtered = [...filtered].sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortBy === 'priceHigh') {
      filtered = [...filtered].sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortBy === 'newest') {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }

    return filtered;
  };

  const filteredProperties = getFilteredProperties();

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const revealPhone = (id) => {
    setRevealedPhones((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-500" />
          <p className="mt-4 text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <span className="text-2xl text-red-600">⚠</span>
          </div>
          <p className="mt-4 font-semibold text-red-600">
            Error loading properties
          </p>
          <p className="mt-2 text-sm text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-full bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-[15px]">
      {/* Tabs */}
      <div className="mb-4 border-b border-gray-200">
        <div className="flex space-x-6 text-sm font-medium">
          <button className="border-b-2 border-red-500 pb-3 text-red-600">
            Properties ({filteredProperties.length})
          </button>
          <button className="pb-3 text-gray-500 hover:text-gray-700">
            New Projects
          </button>
          <button className="pb-3 text-gray-500 hover:text-gray-700">
            Top Agents
          </button>
        </div>
      </div>

      {/* Title + Sort by */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {filteredProperties.length} results | Affordable Properties in India
          </h1>
          <button className="mt-2 inline-flex items-center rounded-full border border-red-400 bg-red-50 px-4 py-1.5 text-xs md:text-sm text-red-600">
            <span className="mr-2 h-2 w-2 rounded-full border border-red-500 shadow-[0_0_0_2px_rgba(248,113,113,0.5)]" />
            Add Localities for more relevant results
          </button>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="relevance">Relevance</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="mb-4 space-y-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-3 text-gray-400"
            size={22}
          />
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Property Type */}
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Property Type
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, location: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="Delhi, Delhi NCR">Delhi, Delhi NCR</option>
                <option value="Noida, Uttar Pradesh">
                  Noida, Uttar Pradesh
                </option>
                <option value="Gurgaon, Haryana">Gurgaon, Haryana</option>
                <option value="Bangalore, Karnataka">
                  Bangalore, Karnataka
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2.5fr)_minmax(260px,1fr)]">
        {/* Property list */}
        <div className="space-y-5">
          {filteredProperties.map((property) => {
            const isFav = favorites.includes(property.id);
            const isPhoneRevealed = revealedPhones.includes(property.id);

            return (
              <article
                key={property.id}
                className="grid gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-md transition hover:border-red-100 hover:shadow-lg md:grid-cols-[190px_minmax(0,2.1fr)_200px]"
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="h-40 w-full object-cover sm:h-52"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[11px] text-white">
                    {property.photoCount}
                  </span>
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-[11px] text-white">
                    {property.posted}
                  </span>
                </div>

                {/* Middle content */}
                <div className="flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        
                        <h2 className="text-base font-semibold">
                          {property.href ? (
                            userloggedIn==true &&
                             <a
                              href={property.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) =>
                                handlePropertyClick(e, property.href)
                              }
                              className="text-blue-600 hover:underline"
                            >
                              {property.title}
                            </a>
                          ) : (
                            <span className="text-gray-800">
                              {property.title}
                            </span>
                          )}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          {property.location}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleFavorite(property.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white"
                      >
                        <Heart
                          size={18}
                          fill={isFav ? 'red' : 'none'}
                          color={isFav ? 'red' : 'gray'}
                        />
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-700">
                      <div className="flex items-center space-x-1">
                        <span className="text-[11px] font-semibold uppercase text-gray-500">
                          Super Area
                        </span>
                        <span>{property.size} sqft</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-[11px] font-semibold uppercase text-gray-500">
                          Status
                        </span>
                        <span>{property.status}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-[11px] font-semibold uppercase text-gray-500">
                          Floor
                        </span>
                        <span>{property.floor}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-[11px] font-semibold uppercase text-gray-500">
                          Furnishing
                        </span>
                        <span>{property.furnishing}</span>
                      </div>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm text-gray-600">
                      {property.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div>
                      Owner:{' '}
                      <span className="font-semibold text-gray-800">
                        {property.owner}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-700">
                        Posted by Owner
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col items-end justify-between text-right">
                  <div>
                    <div className="text-2xl font-semibold text-gray-900">
                      {property.price}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {property.pricePerSqft}
                    </div>
                  </div>

                  <div className="mt-4 w-full space-y-3">
                    <button className="w-full rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600">
                      Contact Owner
                    </button>
                    <button
                      onClick={() => revealPhone(property.id)}
                      className={`w-full rounded-full border px-4 py-2 text-sm font-semibold ${
                        isPhoneRevealed
                          ? 'border-red-500 bg-red-500 text-white'
                          : 'border-red-500 text-red-500 hover:bg-red-50'
                      }`}
                    >
                      {isPhoneRevealed ? property.phone : 'Get Phone No.'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}

          {filteredProperties.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-500">
                No properties found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-md border border-yellow-100 bg-yellow-50 p-5 shadow-sm">
            <h2 className="text-base font-semibold text-gray-800">
              Sell/Rent your Property with us for{' '}
              <span className="text-orange-500">Free</span>
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Find buyers & tenants easily with verified leads.
            </p>
            <button className="mt-4 w-full rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">
              Post Property
            </button>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-2 text-sm font-semibold text-gray-800">
              Here&apos;s why to choose us:
            </h3>
            <ul className="space-y-1 text-xs text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-3 w-3 rounded-full bg-green-500" />
                <span>Access to thousands of active buyers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-3 w-3 rounded-full bg-green-500" />
                <span>Sell faster with premium visibility</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-3 w-3 rounded-full bg-green-500" />
                <span>Only genuine, verified leads</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-3 w-3 rounded-full bg-green-500" />
                <span>Expert advice on market trends & insights</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Projects;