# Fakebook

Fakebook is a simple social media application that allows users to create profiles, share posts, and connect with other users. 
This project was built using:
Frontend: React, React Router, Formik+YUP, Redux 
Backend: NodeJS, ExpressJS, Mongoose, Json Web Token, and multer.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install Fakebook, follow these steps:

1. Clone the repository to your local machine using `git clone https://github.com/kyong4/fakebook.git`
2. Navigate to the project directory using `cd fakebook`
3. Install the required packages using `npm install` in both server and client folders.
4. Create a new MongoDB database named `fakebook` (or choose a different name if you prefer)
5. Create a `.env` file in the server directory of the project with the following contents:

```
MONGO_URL='mongodb+srv://username:password.mongodb.net/?retryWrites=true&w=majority'
JWT_SECRET='yoursecret'
PORT=3001
```
6. Replace `yourusername`, `yourpassword`, and `yoursecretkey` with your own values in MongoDB.


## Usage

To run the application locally, run the following command in both the client and server directory:

```
npm start
```

Then, navigate to `http://localhost:3000` in your web browser to use the application.

## Contributing

Contributions are welcome! If you'd like to contribute to Fakebook, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Make your changes and test them locally
4. Submit a pull request to the main repository with a detailed description of your changes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.