import React, { useState, useEffect } from 'react';
import { SiGooglegemini } from "react-icons/si";
import { Link } from 'react-router-dom';

const Business = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [geminiResponse, setGeminiResponse] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles(selectedLanguage);
    fetchGeminiResponse();
  }, [selectedLanguage]);

  const fetchArticles = (language) => {
    const apiKey = '2db57dc5193d416e95d51bec2df29c78';
    const url = `https://newsapi.org/v2/top-headlines?category=business&language=${language}&pageSize=40&apiKey=${apiKey}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setArticles(data.articles);
        setFilteredArticles(data.articles);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchGeminiResponse = () => {
    fetch("http://localhost:5000/business-news-summary")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setGeminiResponse(data.geminiResponse);
      })
      .catch(error => {
        setError('Failed to fetch Gemini response');
      });
  };

  const handleSearchChange = (event) => {
    const query = event.target.value || "";
    setSearchQuery(query.toLowerCase());
    const filtered = articles.filter(article =>
      (article.title && article.title.toLowerCase().includes(query)) ||
      (article.description && article.description.toLowerCase().includes(query)) ||
      (article.content && article.content.toLowerCase().includes(query))
    );
    setFilteredArticles(filtered);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  const processResponse = (text) => {
    text = text.replace(/[#*]/g, '').trim();
    return text;
  };

  const isHeading = (text) => {
    return text.trim().endsWith(':');
  };

  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      <header className='bg-white text-gray-800 p-6 shadow-md'>
        <h1 className='text-4xl font-bold text-center'>Business News</h1>
      </header>
      <main className='flex-1 p-6'>
        <div className='flex flex-col md:flex-row md:justify-between mb-6 gap-4'>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearchChange}
            className='w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all'
          />
          <select
            className='w-full md:w-1/4 border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all'
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value='en'>English</option>
            <option value='es'>Spanish</option>
            <option value='fr'>French</option>
            <option value='de'>German</option>
            <option value='it'>Italian</option>
            <option value='pt'>Portuguese</option>
            <option value='ru'>Russian</option>
            <option value='ar'>Arabic</option>
            <option value='zh'>Chinese</option>
            <option value='ja'>Japanese</option>
            <option value='nl'>Dutch</option>
            <option value='sv'>Swedish</option>
            <option value='pl'>Polish</option>
            <option value='hi'>Hindi</option>
          </select>
          <div className='flex items-center'>
            <Link to='/chat' className='flex items-center text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-125'>
              <SiGooglegemini className='text-4xl' />
              <h3 className='font-semibold mt-1 ml-2'>GeminiAI</h3>
            </Link>
          </div>
        </div>

        <div className='mb-6'>
          <Link to='/' className='inline-flex items-center text-blue-500 hover:text-blue-700 text-sm font-semibold transition-colors'>
            &larr; Back
          </Link>
        </div>

        <section className='bg-white p-6 rounded-lg shadow-md mb-6'>
          <h2 className='text-2xl font-semibold mb-4'>Gemini AI Summary</h2>
          <div>
            {error && <p className='text-red-500'>{error}</p>}
            {geminiResponse ? (
              <div>
                {geminiResponse.split('\n').map((paragraph, index) => (
                  paragraph.trim() ? (
                    isHeading(paragraph) ? (
                      <div key={index} className="text-lg font-bold mb-2">{processResponse(paragraph)}</div>
                    ) : (
                      <p key={index} className="text-md leading-relaxed mb-2">{processResponse(paragraph)}</p>
                    )
                  ) : (
                    <div key={index} className="text-base">&nbsp;</div>
                  )
                ))}
              </div>
            ) : (
              <p className='text-gray-500'>Loading summary...</p>
            )}
          </div>
        </section>

        <section>
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {filteredArticles.map((article, index) => (
              <li key={index} className='bg-white shadow-md rounded-lg border border-gray-300 p-4 transition-transform transform hover:scale-105 hover:shadow-lg'>
                <h3 className='text-md font-semibold mb-2 text-gray-700'><b>Source:</b> {article.source.name}</h3>
                <h4 className='text-sm mb-2 text-gray-600'><b>Author:</b> {article.author || 'Unknown'}</h4>
                <h4 className='text-md mb-2 text-gray-700'><b>Title:</b> {truncateText(article.title, 50)}</h4>
                {article.urlToImage && <img src={article.urlToImage} alt={article.source.name} className='w-full rounded-md mb-4' />}
                <p className='text-sm mb-2 text-gray-600'><b>Description:</b> {truncateText(article.description, 100)}</p>
                <p className='text-sm mb-2 text-gray-600'><b>Published At:</b> {new Date(article.publishedAt).toLocaleString()}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:underline'>Read more</a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className='bg-white text-gray-700 text-center p-4 border-t border-gray-200'>
        <p>&copy; {new Date().getFullYear()} Business News. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Business;
