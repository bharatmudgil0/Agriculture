#Smart Agriculture System

• Overview
  Smart Agriculture is a web-based platform that facilitates direct communication between farmers and traders. The system integrates weather forecasting and air quality monitoring to assist farmers in making       informed decisions.

•  Features
  Direct Farmer-Trader Communication: Farmers can list their produce, negotiate prices, and finalize transactions directly with traders.
  Weather Forecast: Fetches hourly and 5-day weather forecasts to help farmers plan agricultural activities.
  Air Quality Monitoring: Detects and displays the concentration of gases in the air, ensuring a better farming environment.

•  Technologies Used
  Frontend: HTML, CSS, JavaScript
  Backend: Node.js, Express.js
  Database: MongoDB
  API Integration: OpenWeather API for weather data

•  Installation and Setup

  Clone the repository:
  git clone https://github.com/bharatmudgil0/Agriculture.git

  Navigate to the project directory:
  cd Agriculture

  Install dependencies:
  npm install

  Set up environment variables:
  Create a .env file in the root directory.

  Add the following:
  MONGO_URI=your_mongodb_connection_string
  WEATHER_API_KEY=your_openweather_api_key

  Start the server:
  node app.js
•  Usage
  Farmers can register, list their produce, and communicate with traders.
  Traders can browse listings and negotiate deals.
  Weather data and gas levels are displayed in real-time.
