# Superblog API

This is a little node server with CRUD interface. It's a full-stack project along with an API server.
The project consists in a blog, where i can write my posts, update them and delete them. There is also a sorting order functionality that helps me to place my posts by ascending order. 


![superblog ui](./img/Superblog.png)


# Installation
1. After creating an empty folder, with a `index.html` and `index.js`, i initialize the project with `npm init`. This will create the `package-json` and `node-moduler` folder
2. In the `package-json` i will add all the dependencies i need for the app, like `webpack`, `babel`, `materialize`, `mongoose`, `pug`, `axios`, `express` (in this app i also use the database - MongoDB)
3. I need a config file to give it instructions on what to do : `webpack.config.js`. Should look like this :
```
const path = require("path");

var config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "./src"),
    filename: 'bundle.js',
    publicPath: './src'
  },
  devServer: {
    inline: true,
    port: 8080,
  },

  module: {
    rules: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ],
  }

}
module.exports = config;
```
4. Now i can install everthing from the terminal, with `npm install` or `npm i`
5. We can create a `.gitignore` file, adding the `_node-modules` and the `.env` file




Create a copy of env file: `cp .env.example .env`  and set my credentials. Eg:
```
PORT=5000
MONGOURL=mongodb://localhost/superblog
```
(i can decide the port where the magic happens :-) )


# Start node server

`node server/server.js`

# Routes
- GET `/api/posts` all posts
- POST `/api/posts` creates a post. The request body must contain the post itself. See model
- DELETE `/api/posts:id` deletes a post by given id eg: `/api/posts/5ad4ce741a411bc2cb787445`
- PUT `/api/posts:id` deletes a post by given id
  eg: `/api/posts/5ad4ce741a411bc2cb787445`

# Model
```javascript
{
    name: String,
    content: String,
    order: Number
}```
