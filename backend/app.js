const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require('body-parser');
const mongoose = require("mongoose"); 
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");


dotenv.config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const genAI = new GoogleGenerativeAI("AIzaSyDoaceoSS0kp8RT999bAPH7n9gWYvuSK3k"); 

app.post('/chat', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response =  result.response;
        const text =  response.text();
        res.json({ generatedText: text });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

const apiKey = process.env.API_KEY;
const port = 5000;

mongoose.connect('mongodb://localhost:27017/blogs')

const userSchema = new mongoose.Schema({
  name : { type: String},
  email: { type: String},
  password: { type: String}
});

const User = mongoose.model('User', userSchema);

//Routes for Authentications
app.post('/signin', async (req, res) => {
  const { name, email, password } = req.body;

  try {
      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
          return res.status(400).json({ error: "Email already exists. Please login." });
      }
      const newUser = new User({ name, email, password });
      await newUser.save();

      res.status(201).json(newUser);
  } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ email: email });

      if (user) {
          if (user.password === password) {
              res.json("Success");
          } else {
              res.status(401).json({ error: "Incorrect Password, Please Enter Correct Password" });
          }
      } else {
          res.status(404).json({ error: "No User found with this email" });
      }
  } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.post('/subscribe', (req, res) => {
  const { plan } = req.body;

  if (!plan) {
    return res.status(400).json({ error: 'Plan is required' });
  }

  const userId = 'some-user-id';
  subscriptions.push({ userId, plan });

  res.json({ message: 'Subscription successful' });
});


const blogSchema = new mongoose.Schema({
  author: String,
  title: String,
  description: String,
  category: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] },
  dislikedBy: { type: [String], default: [] },
  comments: [{ _id: mongoose.Schema.Types.ObjectId, text: String, date: { type: Date, default: Date.now } }]
});




const BlogModel = mongoose.model("blogslist", blogSchema);

app.get("/blogs", (req, res)=>{
  BlogModel.find({}).then(function(blogslist){
    res.json(blogslist)
  }).catch(function(err){
    console.log(err)
  })
})

app.post('/blogs', (req, res) => {

  const { author, title, description, category } = req.body;
  
  const newBlog = new BlogModel({ author, title, description, category });
  
  newBlog.save()
    .then(() => {
      res.status(201).json({ success: true, message: 'Blog data added successfully' });
    })
    .catch((err) => {
      console.error('Failed to add blog data:', err);
      res.status(500).json({ success: false, message: 'Failed to add blog data' });
    });
});


app.post('/blogs/:id/like', async (req, res) => {
  try {
      const blog = await BlogModel.findById(req.params.id);
      const userEmail = req.body.email;

      if (blog.likedBy.includes(userEmail)) {
          blog.likedBy.pull(userEmail);
          
          blog.likes -= 1;
      } else {
          blog.likedBy.push(userEmail);
          blog.likes += 1;
          blog.dislikedBy.pull(userEmail);
          blog.dislikes = Math.max(blog.dislikes - 1, 0);
      }

      await blog.save();
      res.json(blog);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.post('/blogs/:id/dislike', async (req, res) => {
  try {
      const blog = await BlogModel.findById(req.params.id);
      const userEmail = req.body.email;

      if (blog.dislikedBy.includes(userEmail)) {
          blog.dislikedBy.pull(userEmail);
          blog.dislikes -= 1;
      } else {
          blog.dislikedBy.push(userEmail);
          blog.dislikes += 1;
          blog.likedBy.pull(userEmail);
          blog.likes = Math.max(blog.likes - 1, 0);
      }

      await blog.save();
      res.json(blog);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


app.post('/blogs/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body; 
  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(id, {
      $push: { comments: { text } }
    }, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json(updatedBlog); 
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ success: false, message: 'Failed to add comment' });
  }
});

app.put('/blogs/:id', async (req, res) => {
  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json({ message: 'Blog post updated successfully', blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.delete('/blogs/:id', async (req, res) => {
  try {
    const blog = await BlogModel.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get("/blogs", async (req, res) => {
  try {
    const blogs = await BlogModel.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
});

app.get("/blogs/uploads", async (req, res) => {
  try {
    const blogs = await BlogModel.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
});


app.get("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blog' });
  }
});


app.get("/blogs/uploads", async (req, res) => {
  try {
    const blogs = await BlogModel.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
});


const handleApiResponse = (res, response, successMessage, failureMessage) => {
  if (response.data.totalResults > 0) {
    res.json({
      status: 200,
      success: true,
      message: successMessage,
      data: response.data,
    });
  } else {
    res.json({
      status: 200,
      success: true,
      message: failureMessage,
    });
  }
};


const fetchNews = (url, res) => {
  axios.get(url)
    .then(response => {
      handleApiResponse(
        res,
        response,
        "Successfully fetched the data",
        "No more results to show"
      );
    })
    .catch(error => {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Failed to fetch data from the API",
        error: error.message,
      });
    });
};

app.get("/news", (req, res) => {
  const url = `https://newsapi.org/v2/everything?q=page=1&pageSize=100&apiKey=${apiKey}`;
  fetchNews(url, res);
});

const fetchHeadlines = (url, res) => {
  axios.get(url)
    .then(response => {
      handleApiResponse(
        res,
        response,
        "Successfully fetched the headlines",
        "No headlines found"
      );
    })
    .catch(error => {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Failed to fetch headlines from the API",
        error: error.message,
      });
    });
};

app.get("/top-headlines", (req, res) => {
  const category = req.query.category || "entertainment";
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=1&pageSize=80&apiKey=${apiKey}`;
  fetchHeadlines(url, res);
});

app.post('/api/send-prompt', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    const geminiApiUrl = 'https://api.gemini.com/your-endpoint'; 
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
       
      },
      body: JSON.stringify({ prompt: prompt })
    };

    const response = await fetch(geminiApiUrl, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.json({ response: data.response }); 
  } catch (error) {
    console.error('Error fetching Gemini data:', error);
    res.status(500).json({ error: 'Error fetching Gemini response.' });
  }
});


app.get('/business-news-summary', async (req, res) => {
  try {
    const url = `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=10&apiKey=${apiKey}`;
    const response = await axios.get(url);

    if (!response.data.articles || response.data.articles.length === 0) {
      return res.status(404).json({ error: 'No articles found' });
    }
    const prompt = response.data.articles.slice(0, 10)
      .map(article => `Title: ${article.title}. Description: ${article.description}`)
      .join("\n\n")

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const geminiResponse = result.response.text();
    res.json({ geminiResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.get('/entertainment-news-summary', async (req, res) => {
  try {
    const url = `https://newsapi.org/v2/top-headlines?category=entertainment&language=en&pageSize=80&apiKey=${apiKey}`;
    const response = await axios.get(url);

    if (!response.data.articles || response.data.articles.length === 0) {
      return res.status(404).json({ error: 'No articles found' });
    }
    const prompt = response.data.articles.slice(0, 10)
      .map(article => `Title: ${article.title}. Description: ${article.description}`)
      .join("\n\n")

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const geminiResponse = result.response.text();

    res.json({ geminiResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/sports-news-summary', async (req, res) => {
  try {
    const url = `https://newsapi.org/v2/top-headlines?category=sports&language=en&pageSize=80&apiKey=${apiKey}`;
    const response = await axios.get(url);

    if (!response.data.articles || response.data.articles.length === 0) {
      return res.status(404).json({ error: 'No articles found' });
    }
    const prompt = response.data.articles.slice(0, 10)
      .map(article => `Title: ${article.title}. Description: ${article.description}`)
      .join("\n\n")

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const geminiResponse = result.response.text();

    res.json({ geminiResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.get('/technology-news-summary', async (req, res) => {
  try {
    const url = `https://newsapi.org/v2/top-headlines?category=technology&language=en&page=1&pageSize=80&apiKey=${apiKey}`;
    const response = await axios.get(url);

    if (!response.data.articles || response.data.articles.length === 0) {
      return res.status(404).json({ error: 'No articles found' });
    }
    const prompt = response.data.articles.slice(0, 10)
      .map(article => `Title: ${article.title}. Description: ${article.description}`)
      .join("\n\n")

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const geminiResponse = result.response.text();

    res.json({ geminiResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/topheadlines-news-summary', async (req, res) => {
  try {
    const url = `https://newsapi.org/v2/top-headlines?language=en&page=1&pageSize=80&apiKey=${apiKey}`;
    const response = await axios.get(url);

    if (!response.data.articles || response.data.articles.length === 0) {
      return res.status(404).json({ error: 'No articles found' });
    }
    const prompt = response.data.articles.slice(0, 10)
      .map(article => `Title: ${article.title}. Description: ${article.description}`)
      .join("\n\n")

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const geminiResponse = result.response.text();

    res.json({ geminiResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/all-news-summary', async (req, res) => {
  try {
    const url = `https://newsapi.org/v2/everything?q=page=1&pageSize=100&language=en&apiKey=${apiKey}`;
    const response = await axios.get(url);

    if (!response.data.articles || response.data.articles.length === 0) {
      return res.status(404).json({ error: 'No articles found' });
    }
    const prompt = response.data.articles.slice(0, 10)
      .map(article => `Title: ${article.title}. Description: ${article.description}`)
      .join("\n")

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const geminiResponse = result.response.text();

    res.json({ geminiResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});



app.get('/', (req, res) => {
  res.send("Hello World");
});


app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);

}); 
