import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = '2db57dc5193d416e95d51bec2df29c78';
const api_url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${api_key}`;

const NewsBanner = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(api_url);
        setNewsItems(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the news", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <header className="bg-white text-gray-800 py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-semibold">Breaking News</h1>
          <p className="text-sm">Loading...</p>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white text-gray-800 py-4 shadow-md">
      <div className="container mx-auto px-4">
        <h1 className="text-xl font-semibold mb-4">Breaking News</h1>
        <div className="flex space-x-4 overflow-x-auto">
          {newsItems.slice(0, 5).map((news, index) => (
            <a
              key={index}
              href={news.url}
              className="flex-1 bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="text-md font-medium text-sm mb-1">{news.title}</h2>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default NewsBanner;
