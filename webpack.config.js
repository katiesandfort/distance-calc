const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 


// console.log('process.env.NODE_ENV in webpack.config is ', process.env); 

module.exports = {
  mode:  process.env.NODE_ENV, //sets the mode for webpack to determine how it optimizes the bundles
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js/, 
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.s[ac]ss/, //.sass or .scss 
        use: [ 
          'style-loader', 'css-loader', 'sass-loader'
        ] 
      }
    ]
  }, 
  plugins: [ new HtmlWebpackPlugin({
    title: 'Development',
    template: 'index.html'
   }), 

], 
  devServer: { 
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};
