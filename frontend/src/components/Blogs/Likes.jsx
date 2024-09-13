import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import Picker from 'emoji-picker-react';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import MoodIcon from '@mui/icons-material/Mood';
import { useParams } from 'react-router-dom';

const Likes = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [commentInputs, setCommentInputs] = useState('');
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const url = "http://localhost:5000";
  const emojiPickerRef = useRef(null);
  const textAreaRef = useRef(null);
  const userEmail = localStorage.getItem('Email');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${url}/blogs/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchArticle();
  }, [id]);  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerVisible && emojiPickerRef.current && !emojiPickerRef.current.contains(event.target) && !textAreaRef.current.contains(event.target)) {
        setEmojiPickerVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emojiPickerVisible]);

  const handleLike = async () => {
    if (!userEmail) return;
  
    try {
      const hasLiked = article.likedBy.includes(userEmail);
      const response = await axios.post(
        `${url}/blogs/${id}/${hasLiked ? 'unlike' : 'like'}`,
        { email: userEmail }
      );
        setArticle((prevArticle) => ({
        ...prevArticle,
        likes: response.data.likes,
        likedBy: response.data.likedBy,
        dislikes: response.data.dislikes,
        dislikedBy: response.data.dislikedBy
      }));
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  
  const handleDislike = async () => {
    if (!userEmail) return;
  
    try {
      const hasDisliked = article.dislikedBy.includes(userEmail);
      const response = await axios.post(
        `${url}/blogs/${id}/${hasDisliked ? 'undislike' : 'dislike'}`,
        { email: userEmail }
      );
        setArticle((prevArticle) => ({
        ...prevArticle,
        dislikes: response.data.dislikes,
        dislikedBy: response.data.dislikedBy,
        likes: response.data.likes,
        likedBy: response.data.likedBy
      }));
    } catch (error) {
      console.error('Error handling dislike:', error);
    }
  };
  

  const handleCommentChange = (event) => {
    setCommentInputs(event.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`${url}/blogs/${id}/comments`, {
        text: commentInputs,
        email: userEmail,
      });

      setArticle((prevArticle) => ({
        ...prevArticle,
        comments: [...prevArticle.comments, response.data.comments[response.data.comments.length - 1]],
      }));

      setCommentInputs('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const onEmojiClick = (emoji) => {
    setCommentInputs((prevInput) => {
      const cursorPos = textAreaRef.current.selectionStart;
      const newComment =
        prevInput.slice(0, cursorPos) +
        emoji.emoji +
        prevInput.slice(textAreaRef.current.selectionEnd);
      return newComment;
    });
  };

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  };

  if (loading) {
    return <div className='text-center text-lg text-gray-600'>Loading...</div>;
  }

  if (!article) {
    return <div className='text-center text-lg text-gray-600'>No article found.</div>;
  }

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-50 p-8'>
      <div className='bg-white shadow-md rounded-lg border border-gray-200 p-6 w-full max-w-3xl'>
        <h3 className='text-lg text-gray-800 mb-2'><b>Author:</b> {article.author}</h3>
        <h3 className='text-lg text-gray-800 mb-2'><b>Title:</b> {article.title}</h3>
        <p className='text-base text-gray-700 mb-4'><b>Description:</b> {article.description}</p>
        <p className='text-base text-gray-700 mb-5'><b>Category:</b> {article.category}</p>
        <div className='flex items-center mb-4'>
          <AiFillLike
            color={article.likedBy && article.likedBy.includes(userEmail) ? '#FF6F61' : '#757575'}
            size='2em'
            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
            className={`transform ${article.likedBy && article.likedBy.includes(userEmail) ? 'scale-110' : ''}`}
            onClick={handleLike}
          />
          <span className='ml-2 text-base text-gray-700'>{article.likes}</span>
          <AiFillDislike
            color={article.dislikedBy && article.dislikedBy.includes(userEmail) ? '#42A5F5' : '#757575'}
            size='2em'
            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
            className={`transform ${article.dislikedBy && article.dislikedBy.includes(userEmail) ? 'scale-110' : ''} ml-4`}
            onClick={handleDislike}
          />
          <span className='ml-2 text-base text-gray-700'>{article.dislikes}</span>
        </div>
        <div className='relative mb-4'>
          <textarea
            ref={textAreaRef}
            className='border border-gray-300 rounded-lg px-4 py-2 w-full h-24 resize-none'
            placeholder='Add your comment...'
            value={commentInputs}
            onChange={handleCommentChange}
          />
          {emojiPickerVisible && (
            <div className='absolute bottom-full left-0 top-36' ref={emojiPickerRef}>
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
          <div className='flex items-center mt-2'>
            <MoodIcon className='text-gray-600 cursor-pointer' onClick={toggleEmojiPicker} />
            <IconButton aria-label="comment" className='ml-2' onClick={handleCommentSubmit}>
              <CommentIcon className='text-gray-600' />
            </IconButton>
          </div>
          <ul className='mt-4 space-y-2'>
            {article.comments &&
              article.comments.map((comment) => (
                <li key={comment._id} className='flex flex-col'>
                  <span className='font-medium text-gray-800'>{comment.text}</span>
                  <span className='text-sm text-gray-600 mt-1'>{new Date(comment.date).toLocaleString()}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Likes;
