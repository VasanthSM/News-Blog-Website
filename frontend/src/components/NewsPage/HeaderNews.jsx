import React, { useEffect, useState } from 'react'; 
import axios from 'axios';

const apiKey = '2db57dc5193d416e95d51bec2df29c78';
const newsapi = `https://newsapi.org/v2/top-headlines?language=en&page=1&pageSize=90&apiKey=${apiKey}`;

const HeaderNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(newsapi);
        setArticles(response.data.articles);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error fetching news: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="border rounded-lg shadow-md overflow-hidden">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex flex-col md:flex-row">
              <div className="p-4 flex-1">
                  <p className="text-gray-700 text-sm">{article.description}</p>
                </div>
                {article.urlToImage && (
                  <div className="flex-shrink-0 flex justify-center items-center p-4 md:w-1/3">
                    <img src={article.urlToImage} alt={article.title} className="w-full h-24 object-cover" />
                  </div>
                )}
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No news articles available.</p>
      )}
    </div>
  );
};

export default HeaderNews;
