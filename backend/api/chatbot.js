const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// OpenAI API configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// API endpoint
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or any other available model
      messages: [{ role: 'user', content: userMessage }],
    });

    // Get the reply and format it
    const reply = response.choices[0].message.content.replace(/•/g, '-'); // Optionally replace bullet points
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.json({ reply: "I'm sorry, something went wrong. Please try again later." });
  }
});


// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
