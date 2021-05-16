module.exports = {
  mode: 'development',

  entry: './src/index.tsx',

  output: {
    publicPath: './build/',
    filename: 'bundle.js',
    path: __dirname + '/build'
  },

  devtool: 'source-map',

  target: 'web',

  plugins: [
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  }
};
