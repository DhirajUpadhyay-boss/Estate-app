import React, { useState } from 'react';
import { Star, Search, Video, Send } from 'lucide-react';

// Sample testimonial data for NCR and nearby UP
const testimonialsData = [
  {
    id: 1,
    name: "Amit Sharma",
    rating: 5,
    text: "Living in my new flat in Noida is great! Nice location and facilities.",
    videoUrl: "https://www.youtube.com/embed/qGc-XaLousw",
    date: "2025-10-01",
    featured: true
  },
  {
    id: 2,
    name: "Priya Gupta",
    rating: 4,
    text: "The house in Gurgaon is big and clean. Good service!",
    videoUrl: "https://www.youtube.com/embed/_pOhmm_s0Bk",
    date: "2025-09-15",
    featured: false
  },
  {
    id: 3,
    name: "Rakesh Singh",
    rating: 3,
    text: "Okay house in Ghaziabad, but parking is an issue.",
    videoUrl: "",
    date: "2025-09-20",
    featured: false
  },
  {
    id: 4,
    name: "Neha Verma",
    rating: 5,
    text: "Best move to Delhi NCR. My family loves the flat.",
    videoUrl: "https://www.youtube.com/embed/TdERAeBiVOo",
    date: "2025-10-05",
    featured: true
  },
  {
    id: 5,
    name: "Vikram Patel",
    rating: 4,
    text: "Nice apartment in Noida. Happy with the deal.",
    videoUrl: "",
    date: "2025-09-10",
    featured: false
  }
];

// Simple function to show star ratings
const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
          size={20}
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  // States for managing testimonials
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    rating: 0,
    text: "",
    videoUrl: ""
  });
  const [testimonials, setTestimonials] = useState(testimonialsData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Show 2 testimonials per page

  // Calculate average rating and total
  const totalRating = testimonials.reduce((sum, test) => sum + test.rating, 0);
  const averageRating = totalRating / testimonials.length || 0;
  const totalTestimonials = testimonials.length;

  // Filter testimonials
  const filteredTestimonials = testimonials.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === "All" || test.rating === parseInt(ratingFilter);
    return matchesSearch && matchesRating;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const currentTestimonials = filteredTestimonials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTestimonial({ ...newTestimonial, [name]: value });
  };

  // Submit new testimonial
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTestimonial.name && newTestimonial.rating > 0 && newTestimonial.text) {
      const newId = testimonials.length + 1;
      setTestimonials([...testimonials, { ...newTestimonial, id: newId, date: new Date().toISOString().split('T')[0], featured: false }]);
      setNewTestimonial({ name: "", rating: 0, text: "", videoUrl: "" });
    } else {
      alert("Please fill all required fields and rating!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">Testimonials</h1>
      <p className="text-gray-600 text-center mb-6">What our clients say about living in NCR and UP!</p>

      {/* Social Proof Metrics */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 text-center">
        <p className="text-lg">Average Rating: {averageRating.toFixed(1)} / 5</p>
        <p className="text-lg">Total Reviews: {totalTestimonials}</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="w-full md:w-1/4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      {/* Featured Testimonials */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Featured Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials
            .filter(test => test.featured)
            .map(test => (
              <div key={test.id} className="bg-yellow-100 p-4 rounded-lg shadow-md">
                <h3 className="font-semibold">{test.name}</h3>
                <StarRating rating={test.rating} />
                <p className="text-gray-700 mt-2">{test.text}</p>
                {test.videoUrl && (
                  <div className="mt-4">
                    <iframe
                      src={test.videoUrl}
                      title="Video Testimonial"
                      className="w-full h-48 rounded-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* All Testimonials */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">All Testimonials</h2>
        <div className="grid grid-cols-1 gap-4">
          {currentTestimonials.map(test => (
            <div key={test.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold">{test.name}</h3>
              <StarRating rating={test.rating} />
              <p className="text-gray-600 mt-2">{test.text}</p>
              {test.videoUrl && (
                <div className="mt-4">
                  <iframe
                    src={test.videoUrl}
                    title="Video Testimonial"
                    className="w-full h-48 rounded-lg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage(prev => (prev > 1 ? prev - 1 : 1))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>{currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => (prev < totalPages ? prev + 1 : totalPages))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Testimonial Submission Form */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Submit Your Testimonial</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={newTestimonial.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              value={newTestimonial.rating}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Review</label>
            <textarea
              name="text"
              value={newTestimonial.text}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Video URL (optional)</label>
            <input
              type="text"
              name="videoUrl"
              value={newTestimonial.videoUrl}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g., YouTube link"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center"
          >
            <Send className="mr-2" /> Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Testimonials;