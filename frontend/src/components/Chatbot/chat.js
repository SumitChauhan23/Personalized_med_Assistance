import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';


dotenv.config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

// OpenAI API configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Create a health assistant prompt template
const createHealthPrompt = (userMessage) => {
  return [
    {
      role: 'system',
      content: "You are a health assistant designed to provide information about medical conditions, symptoms, and general health advice. Your responses should be accurate, informative, and empathetic. If a question is outside your expertise, suggest consulting a healthcare professional.",
    },
    {
      role: 'user',
      content: userMessage,
    },
  ];
};

// API endpoint
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: createHealthPrompt(userMessage), // Use the prompt template
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
