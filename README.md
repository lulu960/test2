# PDF Summary App

## Setup

1. Copy `.env.example` to `.env` and set values.
2. Run `docker-compose up --build` to start MongoDB, backend and frontend services.

The Hugging Face API key is optional. Without it the app will use the free inference
API for summarization.

Frontend will be accessible on `http://localhost:3000` and backend on `http://localhost:5000`.
