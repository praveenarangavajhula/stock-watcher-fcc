# Watch Your Stock

## Overview

This application allows users to enter stock code which will then display a graph of that stocks price over time.You can view this app in production here: https://watch-your-stock.herokuapp.com/. 
Financial data for this app is from ```Quandl API```, and ```Highcharts``` is used for generating the interactive stock chart. The features of this app includes:
```
1. As a user, I can view a graph displaying the recent trend lines for each added stock.
2. As a user, I can add new stocks by their symbol name.
3. As a user, I can remove stocks.
4. As a user, I can see changes in real-time when any other user adds or removes a stock. 
```
## Prerequisites
```
NPM
Node.js
Express.js
Mongoose
Angular.js
Angular Material
Socket.io
Dotenv
Git
```

## Setup Local Environment Variables

Create a file with the name of '.env' in the root directory. And list the following local environment variables:
```
QUANDL_KEY=your-quandl-key-here
MONGODB_URI=your-mongodb-url-here
```

## Start the App

`cd` to the project directory and run `node server.js` in the terminal.




