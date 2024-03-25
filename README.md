# WorkWise

## Description
This project is a web application that consists of a frontend and a backend component. The frontend is built using Vite, while the backend is powered by Express. It provides functionalities that require interaction with a MongoDB database. 

## Setup
Before running the application, you need to set up the environment variables. Create a `.env` file in the backend directory with the following keys:

```
MONGO_URI_Password=your_mongo_uri_password
MONGO_URI_username=your_mongo_uri_username
PORT=3000
JWT_SECRET=WORKWISE
```

Make sure to replace `your_mongo_uri_password` and `your_mongo_uri_username` with your actual MongoDB credentials. `JWT_SECRET` is the secret key used for JSON Web Token (JWT) authentication.

## Frontend
The frontend of the application is built using Vite. To start the frontend, run the following command:
```
npm run dev
```
This command will start the development server for the frontend.

## Backend
The backend of the application runs on port 3000 and is powered by Express. To start the backend, run the following command:
```
npm start
```
Make sure to provide the necessary MongoDB credentials for the application to work properly.

## Usage
Before running the start commands for frontend and backend. Make sure to run npm install on each directories.

## License
[MIT License](LICENSE)
