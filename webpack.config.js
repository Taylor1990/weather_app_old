var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, "script.jsx"),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test:  /\.jsx?$/, loader: 'babel!jsx'}
        ]
    }
}
