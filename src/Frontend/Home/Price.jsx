import React, { useMemo, useState } from 'react';

// ---- MOCK DATA (front-end only) ----
const mockSummary = {
  buy: {
    avgPricePerSqft: '₹13,677',
    priceRange: '₹266 - ₹1 Lakh',
  },
  rent: {
    avgPricePerSqft: '₹32',
    priceRange: '₹5 - ₹250',
  },
};

const propertyTypes = ['Apartment', 'Independent House'];

const localities = [
  {
    id: 1,
    name: 'Chhattarpur',
    type: 'Apartment',
    avgPricePerSqft: 6037,
    priceRange: '₹2,500 - ₹16,666',
  },
  {
    id: 2,
    name: 'Sector 6 Dwarka',
    type: 'Apartment',
    avgPricePerSqft: 15731,
    priceRange: '₹10,800 - ₹20,294',
  },
  {
    id: 3,
    name: 'Burari',
    type: 'Independent House',
    avgPricePerSqft: 5242,
    priceRange: '₹3,692 - ₹6,551',
  },
  {
    id: 4,
    name: 'Paschim Vihar',
    type: 'Apartment',
    avgPricePerSqft: 12280,
    priceRange: '₹4,000 - ₹25,000',
  },
  {
    id: 5,
    name: 'Dwarka Mor',
    type: 'Independent House',
    avgPricePerSqft: 6458,
    priceRange: '₹2,636 - ₹14,833',
  },
];

// trendData[localityName][propertyType][mode] => quarterly or yearly
const trendData = {
  Chhattarpur: {
    Apartment: {
      quarterly: [
        { label: "Oct'24–Dec'24", value: 5700 },
        { label: "Jan'25–Mar'25", value: 5850 },
        { label: "Apr'25–Jun'25", value: 5900 },
        { label: "Jul'25–Sep'25", value: 6050 },
      ],
      yearly: [{ label: '2025', value: 5875 }],
    },
    'Independent House': {
      quarterly: [
        { label: "Oct'24–Dec'24", value: 5200 },
        { label: "Jan'25–Mar'25", value: 5300 },
        { label: "Apr'25–Jun'25", value: 5400 },
        { label: "Jul'25–Sep'25", value: 5520 },
      ],
      yearly: [{ label: '2025', value: 5355 }],
    },
  },
  'Sector 6 Dwarka': {
    Apartment: {
      quarterly: [
        { label: "Oct'24–Dec'24", value: 15000 },
        { label: "Jan'25–Mar'25", value: 15300 },
        { label: "Apr'25–Jun'25", value: 15731 },
        { label: "Jul'25–Sep'25", value: 16000 },
      ],
      yearly: [{ label: '2025', value: 15500 }],
    },
    'Independent House': {
      quarterly: [
        { label: "Oct'24–Dec'24", value: 14000 },
        { label: "Jan'25–Mar'25", value: 14250 },
        { label: "Apr'25–Jun'25", value: 14500 },
        { label: "Jul'25–Sep'25", value: 14750 },
      ],
      yearly: [{ label: '2025', value: 14375 }],
    },
  },
  Burari: {
    Apartment: {
      quarterly: [
        { label: "Oct'24–Dec'24", value: 4800 },
        { label: "Jan'25–Mar'25", value: 4950 },
        { label: "Apr'25–Jun'25", value: 5100 },
        { label: "Jul'25–Sep'25", value: 5242 },
      ],
      yearly: [{ label: '2025', value: 5023 }],
    },
    'Independent House': {
      quarterly: [
        { label: "Oct'24–Dec'24", value: 4900 },
        { label: "Jan'25–Mar'25", value: 5050 },
        { label: "Apr'25–Jun'25", value: 5150 },
        { label: "Jul'25–Sep'25", value: 5280 },
      ],
      yearly: [{ label: '2025', value: 5095 }],
    },
  },
  'Paschim Vihar': {
    Apartment: {
      quarterly: [
        { label: "Oct'24–Dec'24", value: 11800 },
        { label: "Jan'25–Mar'25", value: 11950 },
        { label: "Apr'25–Jun'25", value: 12100 },
        { label: "Jul'25–Sep'25", value: 12280 },
      ],
      yearly: [{ label: '2025', value: 12033 }],
    },
    'Independent House': {
      quarterly: [
        { label: "Oct'24–Dec'24", value: 11300 },
        { label: "Jan'25–Mar'25", value: 11500 },
        { label: "Apr'25–Jun'25", value: 11800 },
        { label: "Jul'25–Sep'25", value: 12000 },
      ],
      yearly: [{ label: '2025', value: 11675 }],
    },
  },
  'Dwarka Mor': {
    Apartment: {
      quarterly: [
        { label: "Oct'24–Dec'24", value: 5900 },
        { label: "Jan'25–Mar'25", value: 6100 },
        { label: "Apr'25–Jun'25", value: 6300 },
        { label: "Jul'25–Sep'25", value: 6458 },
      ],
      yearly: [{ label: '2025', value: 6189 }],
    },
    'Independent House': {
      quarterly: [
        { label: "Oct'24–Dec'24", value: 5600 },
        { label: "Jan'25–Mar'25", value: 5750 },
        { label: "Apr'25–Jun'25", value: 5900 },
        { label: "Jul'25–Sep'25", value: 6050 },
      ],
      yearly: [{ label: '2025', value: 5825 }],
    },
  },
};

// Simple SVG line chart
const LineChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const values = data.map((d) => d.value);
  const minY = Math.min(...values);
  const maxY = Math.max(...values);
  const paddingY = (maxY - minY || 1) * 0.1;
  const yMin = minY - paddingY;
  const yMax = maxY + paddingY;

  const width = 700;
  const height = 320;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const xStep =
    data.length > 1
      ? (width - paddingLeft - paddingRight) / (data.length - 1)
      : 0;

  const points = data.map((d, idx) => {
    const x = paddingLeft + idx * xStep;
    const ratio = (d.value - yMin) / (yMax - yMin || 1);
    const y =
      height - paddingBottom - ratio * (height - paddingTop - paddingBottom);
    return { x, y };
  });

  const pathD = points
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-64 md:h-72">
      {[0, 0.25, 0.5, 0.75, 1].map((r) => {
        const y =
          height - paddingBottom - r * (height - paddingTop - paddingBottom);
        return (
          <line
            key={r}
            x1={paddingLeft}
            x2={width - paddingRight}
            y1={y}
            y2={y}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        );
      })}
      <line
        x1={paddingLeft}
        x2={paddingLeft}
        y1={paddingTop}
        y2={height - paddingBottom}
        stroke="#e5e7eb"
        strokeWidth="1"
      />
      <path d={pathD} fill="none" stroke="#7c3aed" strokeWidth="2.5" />
      {points.map((p, idx) => (
        <circle
          key={idx}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="#7c3aed"
          stroke="#fff"
          strokeWidth="1.5"
        />
      ))}
      {data.map((d, idx) => {
        const p = points[idx];
        return (
          <text
            key={d.label}
            x={p.x}
            y={height - paddingBottom + 18}
            textAnchor="middle"
            fontSize="10"
            fill="#6b7280"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
};

// Trend modal
const TrendModal = ({ localityName, open, onClose }) => {
  const [tab, setTab] = useState('Apartment');
  const [view, setView] = useState('quarterly');

  if (!open || !localityName) return null;

  const localityData = trendData[localityName] || {};
  const current =
    localityData[tab] && localityData[tab][view]
      ? localityData[tab][view]
      : [];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-2xl w-full max-w-4xl max-height[90vh] overflow-hidden shadow-xl">
        <div className="flex items-start justify-between px-6 pt-5 pb-3 border-b border-gray-100">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {localityName} Avg. Price / Sqft
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="px-6 pt-4">
          <div className="inline-flex rounded-lg bg-gray-100 p-1 text-sm mb-4">
            {propertyTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTab(type)}
                className={`px-4 py-1.5 rounded-md font-medium ${
                  tab === type ? 'bg-indigo-600 text-white shadow' : 'text-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 sm:px-6 pb-6 pt-2">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[600px]">
              <LineChart data={current} />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 px-4 sm:px-6 py-3 bg-gray-50">
          <div className="flex justify-center gap-4 text-sm">
            <button
              type="button"
              onClick={() => setView('quarterly')}
              className={`${
                view === 'quarterly'
                  ? 'text-indigo-700 font-semibold'
                  : 'text-gray-500'
              }`}
            >
              Show Quarterly
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => setView('yearly')}
              className={`${
                view === 'yearly'
                  ? 'text-indigo-700 font-semibold'
                  : 'text-gray-500'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main page
const Price = () => {
  const [mode, setMode] = useState('buy');
  const [search, setSearch] = useState('');
  const [selectedLocality, setSelectedLocality] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const summary = mockSummary[mode];

  const filteredLocalities = useMemo(
    () =>
      localities.filter((loc) =>
        loc.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const openTrend = (name) => {
    setSelectedLocality(name);
    setModalOpen(true);
  };

  const closeTrend = () => {
    setModalOpen(false);
    setSelectedLocality(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 pt-10">
        {/* Header / toggle */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Property Rates in Delhi, India – 2025
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Front-end mock of price trends with interactive charts.
            </p>
          </div>

          <div className="inline-flex rounded-full border border-gray-200 bg-white p-1 text-sm">
            {['buy', 'rent'].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value)}
                className={`px-4 py-1.5 rounded-full font-medium capitalize ${
                  mode === value
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
              Avg. Price / Sqft
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {summary.avgPricePerSqft}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
              Price Range / Sqft
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {summary.priceRange}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-center text-sm text-gray-500 text-center">
            All numbers here are dummy front‑end data meant to mimic Housing.com.
          </div>
        </div>

        {/* Locality table header + search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Locality Price Trends
          </h2>
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search locality"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
            />
          </div>
        </div>

        {/* TABLE LAYOUT – exactly like Housing.com */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full border-collapse">
              <thead>
                <tr className="bg-[#f5efff] text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  <th className="text-left px-6 py-3">Locality</th>
                  <th className="text-right px-6 py-3">Avg. Price / Sqft</th>
                  <th className="text-right px-6 py-3">Price Range / Sqft</th>
                  <th className="text-center px-6 py-3">Trend</th>
                </tr>
              </thead>
              <tbody>
                {filteredLocalities.map((loc) => (
                  <tr
                    key={loc.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    {/* Locality */}
                    <td className="px-6 py-4 align-middle">
                      <p className="font-medium text-gray-900">{loc.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {loc.type}
                      </p>
                    </td>

                    {/* Avg price */}
                    <td className="px-6 py-4 align-middle text-right text-sm font-medium text-gray-900">
                      ₹{loc.avgPricePerSqft.toLocaleString()}
                    </td>

                    {/* Price range */}
                    <td className="px-6 py-4 align-middle text-right text-sm text-gray-800 whitespace-nowrap">
                      {loc.priceRange}
                    </td>

                    {/* See Trend button */}
                    <td className="px-6 py-4 align-middle text-center">
                      <button
                        type="button"
                        onClick={() => openTrend(loc.name)}
                        className="px-5 py-1.5 rounded-md border border-purple-500 text-xs font-semibold text-purple-600 hover:bg-purple-50"
                      >
                        See Trend
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredLocalities.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-6 text-center text-sm text-gray-500"
                    >
                      No localities found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Trend modal */}
      <TrendModal
        localityName={selectedLocality}
        open={modalOpen}
        onClose={closeTrend}
      />
    </div>
  );
};

export default Price;