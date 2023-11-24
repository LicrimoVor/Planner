//    "start": "react-scripts start",
//    "build": "react-scripts build",
//    "test": "react-scripts test",
//    "eject": "react-scripts eject",
const CracoAlias = require('craco-alias');
module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: './src',
                tsConfigPath: './tsconfig.path.json',
            },
        },
    ],
}