# Welcome to Capitals Game!
* **Description**
This is a simple React Game in which the player has to guess the capital city given the state.
It contains a WebApi that fetches data from a database and the frontend, which gets data from the WebApi.
You can try and guess all capitals of the world, or you can choose a specific continent.
* **Setup**
You need to have node.js installed in your environment in order to run this application.
Clone the project to your local machine. Extract the files from the compressed archive named *GuessTheCapitalApi.zip* and run the project on Visual Studio, as it is written in ASP.NET.
**You will need to change the database URL in the connection string in the ASP.NET Project, as it references my local DB. Based on the port the api will use, you will also need to change the API URL in App.js, everytime the Axios.Get call occurs.**
Recreate the database from the xls file provided in the root folder. After this, run the command
`npm install` to install all required dependencies. After this, run `npm start` and you're good to go.