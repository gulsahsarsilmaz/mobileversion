# Mobileversion Backend (ExpressJS)

# Prerequisites

### Install pm2
- `npm install pm2@latest -g` to install pm2

# Getting started

To get the Node server running locally:

- Clone this repo
- `cd backend` to go to the directory
- `npm install` to install all required dependencies
-  Navigate to `/mobileversion/backend/server.js` line 8 to adjust your MongoDB (alternate to Docker) line by replacing the DB link
- `pm2 start server.js` to start, daemonize and monitor the application


# Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models.
- `routes/apps.js` - This folder contains the route definitions for API.
- `models/app.js` - This folder contains the schema definitions for Mongoose models.


# Author
* **Gulsah Sarsilmaz** -- [MobileVersion](https://github.com/gulsahsarsilmaz/mobileversion)
