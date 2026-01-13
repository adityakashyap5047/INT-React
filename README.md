# <img src="client/public/summarizer.png" height="20px"> Website Summarizer

A full-stack web app that scrapes any website and generates concise summaries using OpenAI. 

The app handles both static HTML pages and JavaScript-heavy sites (like Medium or React apps) by switching between Cheerio and Puppeteer for content extraction.

![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT-orange)

## What It Does

- Paste any URL and get a bullet-point summary in seconds
- Works with dynamic sites (React, Next.js, Vue) using headless browser scraping
- Clean dark-themed UI with one-click copy functionality
- Choose between fast extraction (Cheerio) or full JS rendering (Puppeteer)

## Tech Stack

**Frontend:** React + Vite, Tailwind CSS, shadcn/ui components, Axios

**Backend:** Node.js, Express, LangChain loaders, Puppeteer, Cheerio, OpenAI API

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components (UrlForm, SummaryCard, etc.)
│   │   ├── services/       # API calls
│   │   └── lib/            # Utilities
│   └── ...
│
└── server/                 # Express backend
    ├── src/
    │   ├── controller/     # Route handlers
    │   ├── services/       # Scraping & summarization logic
    │   ├── middleware/     # Error handling
    │   └── utils/          # Helper functions
    └── index.js
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- An OpenAI API key

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
PORT=5000
OPENAI_API_KEY=your_api_key_here
```

Start the server:

```bash
node index.js
# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
# Opens at http://localhost:5173
```

## How to Use

1. Open `http://localhost:5173` in your browser
2. Paste a URL you want summarized
3. Pick an extraction method:
   - **Puppeteer** — Use this for modern JS-heavy sites (slower but more reliable)
   - **Cheerio** — Use this for simple static pages (fast)
4. Hit "Summarize" and wait a few seconds
5. Copy the summary or try another URL

## API Reference

**POST** `/api/summarize`

```json
{
  "url": "https://en.wikipedia.org/wiki/Artificial_intelligence",
  "method": "puppeteer",
  "maxChars": 8000
}
```

**Response:**

```json
{
  "success": true,
  "url": "https://...",
  "extractedChars": 8000,
  "summary": "• AI is the simulation of human intelligence...\n• Key areas include..."
}
```

## How AI Was Used

This project uses OpenAI's GPT model to transform raw website content into digestible summaries. Here's the flow:

1. **Content Extraction** — When you submit a URL, the backend uses LangChain's web loaders to fetch the page content. For static sites, it uses `CheerioWebBaseLoader` which parses HTML directly. For JavaScript-heavy sites, it uses `PuppeteerWebBaseLoader` which spins up a headless browser to render the page first.

2. **Text Cleaning** — Raw scraped content is messy—full of navigation links, footers, ads, and repeated text. The backend strips out this noise and trims the content to a reasonable length (configurable via `maxChars`) before sending it to the AI.

3. **AI Summarization** — The cleaned text gets sent to OpenAI with a prompt that asks for 6-10 bullet points in simple English. The prompt is designed to avoid filler and focus on the main takeaways from the page.

4. **Response** — The AI-generated summary is returned to the frontend and displayed in a clean card format.

Puppeteer is slower but necessary for sites that load content dynamically. Cheerio is lightweight and perfect for blogs or news articles with server-rendered content.

## Author

**Aditya Kumar** — MERN Stack Developer

## License

Free to use for learning and personal projects.