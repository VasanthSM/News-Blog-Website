import React, { useState } from 'react';
import axios from 'axios';
import './Addblogs.css';

const Addblogs = ({ Add, AddBlogs, Author, Title, Description, Category }) => {
  const url = 'http://localhost:5000';
  const [data, setData] = useState({
    author: '',
    title: '',
    description: '',
    category: 'General',
  });

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/blogs`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        alert('Blog data added successfully!');
        setData({
          author: '',
          title: '',
          description: '',
          category: 'General',
        });
      } else {
        console.error('Error:', response.data.message);
        alert('Failed to add blog data. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add blog data. Please try again.');
    }
  };

  return (
    <div className="blogs">
      <h1 className="blog-title">{AddBlogs}</h1>
      <form className="blog-form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <p className="form-label">{Author}</p>
          <input
            className="form-input"
            onChange={onChangeData}
            value={data.author}
            type="text"
            name="author"
            placeholder="Type here.."
            required
          />
        </div>
        <div className="form-group">
          <p className="form-label">{Title}:</p>
          <input
            className="form-input"
            onChange={onChangeData}
            value={data.title}
            type="text"
            name="title"
            placeholder="Type here.."
            required
          />
        </div>
        <div className="form-group">
          <p className="form-label">{Description}:</p>
          <textarea
            className="form-textarea"
            onChange={onChangeData}
            value={data.description}
            name="description"
            placeholder="Write the description"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <p className="form-label">{Category}</p>
          <select
            className="form-select"
            onChange={onChangeData}
            name="category"
            value={data.category}
          >
            <option value="Entertainment">Entertainment</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
        <button type="submit" className="form-button">
          {Add}
        </button>
      </form>
    </div>
  );
};

export default Addblogs;
