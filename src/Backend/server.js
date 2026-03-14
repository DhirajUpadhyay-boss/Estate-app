
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ... rest of your routes stay the same


// --- Research Items API ---
const researchItems = [
  {
    id: 1,
    title: 'Price Trends',
    description: 'Find property rates & price trends of top locations',
    image:
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80',
    route: '/Price',
  },
  {
    id: 3,
    title: 'Housing Research',
    description: 'Read reports on Indian residential market',
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    route: '/Housing',
  },
];

// --- News Items API ---
const newsItems = [
  {
    id: 1,
    title: 'Delhi–Jaipur super expressway: Route map details and latest updates',
    excerpt:
      'Overview of the new Delhi–Jaipur super expressway, its route, features and expected impact on travel time and real estate along the corridor.',
    author: 'Shreshth Gupta',
    date: 'Mar 2025',
    image:
      'https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=900&q=80',
    href: 'https://aquireacres.com/delhi-jaipur-super-expressway-nh-352b-route-features-toll-rates-and-real-estate-impact',
  },
  {
    id: 2,
    title: 'How to pay Delhi Jal Board bill online?',
    excerpt:
      'Step-by-step guide to checking your Delhi Jal Board (DJB) water bill and paying it online using the portal, NEFT or digital wallets.',
    author: 'Housing News Desk',
    date: 'Nov 2025',
    image:
      'https://assets-news.housing.com/news/wp-content/uploads/2021/07/23185354/Delhi-Jal-Board-How-to-pay-water-bill-online-FB-1200x700-compressed.jpg',
    href: 'https://housing.com/news/djb-delhi-jal-board-bill/',
  },
  {
    id: 3,
    title: 'DDA launches Jan Sadharan Awaas Yojana 2025, offering 1k affordable flats',
    excerpt:
      'Details of DDA\'s Jan Sadharan Awaas Yojana 2025 scheme, which offers over 1,000 affordable EWS and LIG flats in Outer Delhi on an FCFS basis.',
    author: 'Harini Balasubramanian',
    date: 'Oct 2025',
    image:
      'https://assets-news.housing.com/news/wp-content/uploads/2022/09/14152436/DDA-Housing-Scheme-2022-shutterstock_1140375443-1200x700-compressed.jpg',
    href: 'https://housing.com/news/dda-launches-jan-sadharan-awaas-yojana-2025/',
  },
];

// Routes


app.get('/api/research', (req, res) => {
  console.log("This is my request bro!!",req);
  res.json(researchItems);
});

app.get('/api/news', (req, res) => {
    console.log(req);
res.json(newsItems);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
