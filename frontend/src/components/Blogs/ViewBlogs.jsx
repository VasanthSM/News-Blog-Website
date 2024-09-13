import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import "../../index.css";
import { CSSTransition } from 'react-transition-group';

const ViewBlogs = () => {
  const [articles, setArticles] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const url = "http://localhost:5000";
  const sidePanelRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${url}/blogs`);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setArticles([]);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/blogs/${id}`);
      setArticles(articles.filter(article => article._id !== id));
    } catch (error) {
      console.error('Error deleting article:', error.response ? error.response.data : error.message);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`${url}/blogs/${selectedBlog._id}`, selectedBlog);
      setArticles(articles.map(article =>
        article._id === selectedBlog._id ? selectedBlog : article
      ));
      handleClosePanel();
    } catch (error) {
      console.error('Error updating blog:', error.response || error.message);
    }
  };

  const handleEdit = (article) => {
    setSelectedBlog(article);
    setIsEditing(true);
  };

  const handleClosePanel = () => {
    setIsEditing(false);
    setSelectedBlog(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidePanelRef.current && !sidePanelRef.current.contains(event.target)) {
        handleClosePanel();
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  return (
    <div className='relative min-h-screen bg-gray-100'>
      <header className='bg-gray-900 text-white text-center py-6'>
        <h1 className='text-3xl font-semibold'>Blogs</h1>
      </header>
      <main className='p-6'>
        <div className='mb-4'>
          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className='text-blue-600 hover:text-blue-800 text-lg'
          >
            &larr; Back
          </button>
        </div>
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
          {articles.length > 0 ? (
            articles.map((article) => (
              <li
                key={article._id}
                className='bg-white shadow-md rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-300'
              >
                <h4 className='text-md font-semibold mb-2'>Author: {article.author}</h4>
                <h4 className='text-md font-semibold mb-2'>Title: {article.title}</h4>
                <h6 className='text-gray-700 mb-4'>Description: {article.description}</h6>
                <div className='flex flex-col md:flex-row md:justify-between'>
                  <button
                    className='text-blue-600 hover:text-blue-800 text-s mb-2 md:mb-0'
                    onClick={() => handleEdit(article)}
                  >
                    Edit
                  </button>
                  <button
                    className='text-red-600 hover:text-red-800 text-s mb-2 md:mb-0'
                    onClick={() => handleDelete(article._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/blogs/${article._id}`} className='text-blue-600 hover:text-blue-800 text-s'>
                    Read More
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <div className='text-center text-lg text-gray-600 mt-6'>No articles found.</div>
          )}
        </ul>
      </main>
      <CSSTransition
        in={isEditing}
        timeout={300}
        classNames='side-panel'
        unmountOnExit
      >
        <div className='fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg border-l border-gray-200 p-6' ref={sidePanelRef}>
          <h2 className='text-2xl font-semibold mb-4'>Edit Blog</h2>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Title:</label>
          <input
            type='text'
            value={selectedBlog?.title || ''}
            onChange={(e) => setSelectedBlog({ ...selectedBlog, title: e.target.value })}
            className='w-full p-3 border border-gray-300 rounded-lg mb-4'
          />
          <label className='block text-sm font-medium text-gray-700 mb-2'>Description:</label>
          <textarea
            value={selectedBlog?.description || ''}
            onChange={(e) => setSelectedBlog({ ...selectedBlog, description: e.target.value })}
            className='w-full p-3 border border-gray-300 rounded-lg'
            rows='10'
          />
          <div className='flex justify-end gap-4 mt-4'>
            <button
              onClick={handleSave}
              className='bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-300'
            >
              Save
            </button>
            <button
              onClick={handleClosePanel}
              className='bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300'
            >
              Cancel
            </button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default ViewBlogs;
