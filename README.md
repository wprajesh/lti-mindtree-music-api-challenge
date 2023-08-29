# LTIMindtree Music Tracks API Challenge

This project implements a REST API for storing and retrieving music track metadata using Node.js, Express, and Sequelize(DB ORM).

The music data are consumed from Spotify API, you need to have a developer account with app created with credentials(App's client & secret keys) in Spotify.

## Features

- Create a new track with ISRC, title, and artist information.
- Retrieve a track by its ISRC.
- Retrieve tracks by artist name.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/wprajesh/lti-mindtree-music-api-challenge.git
2. Navigate to the project directory:
    ```bash
    cd lti-mindtree-music-api-challenge
3. Install dependencies:
    ```bash
    npm install
4. Set up database configurations:
    ```bash
    DB_NAME=your_db_name
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
5. Set up Spotify credentials:
    ```bash
    CLIENT_ID=your_client_id
    CLIENT_SECRET=your_client_secret
    
Add above details in .env file
## Usage
1. Start the server:
    ```bash
    npm start
    The server will start on port 3000 by default.

2. Access the API:
    * To create a new track: Send a POST request to http://localhost:3000/tracks
    * To get a track by ISRC: Send a GET request to http://localhost:3000/tracks/{isrc}
    * To get tracks by artist name: Send a GET request to http://localhost:3000/tracks/artist/{artistName}

## API Documentation
The API is documented using Swagger. Access the documentation by starting the server and visiting http://localhost:3000/docs.