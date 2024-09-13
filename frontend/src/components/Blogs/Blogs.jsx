import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaBook, FaRegFileAlt, FaTag } from 'react-icons/fa';
import "../../index.css";


const Blog = ({ Add, AddBlogs, Author, Title, Description, Category }) => {
  const url = 'http://localhost:5000';
  const [data, setData] = useState({
    author: '',
    title: '',
    description: '',
    category: 'General',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFields = () => {
    const { author, title, description } = data;
    if (!author || !title || !description) {
      return 'Please fill in all required fields.';
    }
    return null;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${url}/blogs`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setSuccess('Blog data added successfully!');
        setData({
          author: '',
          title: '',
          description: '',
          category: 'General',
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setError('Failed to add blog data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md bg-white p-8 shadow-md rounded-lg'>
        <h1 className='text-3xl font-semibold text-gray-800 mb-6'>{AddBlogs}</h1>
        <form className='space-y-6' onSubmit={onSubmitHandler}>
          <div className='flex flex-col'>
            <label className='flex items-center text-lg font-medium text-gray-700'>
              <FaUser className='mr-3 text-gray-500' /> {Author}
            </label>
            <input
              className='border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
              onChange={onChangeData}
              value={data.author}
              type='text'
              name='author'
              placeholder='Author name'
              required
            />
          </div>
          <div className='flex flex-col'>
            <label className='flex items-center text-lg font-medium text-gray-700'>
              <FaBook className='mr-3 text-gray-500' /> {Title}
            </label>
            <input
              className='border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
              onChange={onChangeData}
              value={data.title}
              type='text'
              name='title'
              placeholder='Blog title'
              required
            />
          </div>
          <div className='flex flex-col'>
            <label className='flex items-center text-lg font-medium text-gray-700'>
              <FaRegFileAlt className='mr-3 text-gray-500' /> {Description}
            </label>
            <textarea
              className='border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
              onChange={onChangeData}
              value={data.description}
              name='description'
              placeholder='Blog description'
              rows='4'
              required
            ></textarea>
          </div>
          <div className='flex flex-col'>
            <label className='flex items-center text-lg font-medium text-gray-700'>
              <FaTag className='mr-3 text-gray-500' /> {Category}
            </label>
            <select
              className='border border-gray-300 rounded-md p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
              onChange={onChangeData}
              name='category'
              value={data.category}
            >
              <option value='General'>General</option>
              <option value='Entertainment'>Entertainment</option>
              <option value='Technology'>Technology</option>
              <option value='Business'>Business</option>
              <option value='Sports'>Sports</option>
              <option value='Subject'>Subject</option>
              <option value='Health'>Health</option>
            </select>
          </div>
          <button
            type='submit'
            className='w-full py-3 px-4 bg-blue-600 text-white text-lg rounded-md shadow-md transition-colors duration-300 hover:bg-blue-700'
          >
            {loading ? 'Submitting...' : Add}
          </button>
          {success && <div className='text-green-600 text-center mt-4'>{success}</div>}
          {error && <div className='text-red-600 text-center mt-4'>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Blog;
