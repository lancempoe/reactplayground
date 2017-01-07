process.env.NODE_ENV = 'test';

module.exports = function(config) {
    config.set({
        autoWatch: true,
        browsers: ['Chrome'], //, 'Firefox', 'Safari'],
        frameworks: ['jasmine'],
        logLevel: config.LOG_INFO,
        singleRun: false,
        port: 9876,
        colors: true,
        concurrency: Infinity, // how many browser should be started simultaneous
        files: [
            'test/**/*Spec.js',
            'src/**/*.js' //ADDED FOR COVERAGE
        ],
        preprocessors: {
            'test/**/*Spec.js' : ['babel', 'webpack', 'sourcemap'],
            'src/**/*.js' : ['babel', 'webpack', 'sourcemap', 'coverage'] //ADDED FOR COVERAGE

        },
        reporters: ['progress', 'coverage'], //ADDED FOR COVERAGE
        coverageReporter: { //ADDED FOR COVERAGE
            type : 'html',
            dir : 'coverage/'
        },
        webpack: {
            devtool: 'inline-source-map',
            resolve: {
                extensions: ['', '.js', '.jsx'],
                modulesDirectories: [
                    'node_modules'
                ]
            },
            module: {
                loaders: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader'
                    },
                    {
                        test: /\.css$/,
                        loader: "style-loader!css-loader"
                    }
                ]
            },
            externals: {
                'cheerio': 'window',
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            }
        },
        webpackServer: {
            noInfo: true //don't spam the console when running in karma!
        },

        plugins: [
            "karma-babel-preprocessor",
            "karma-chrome-launcher",
            "karma-webpack",
            "karma-sourcemap-loader",
            "karma-jasmine",
            'karma-coverage'  //ADDED FOR COVERAGE
        ],

        babelPreprocessor: {
            options: {
                presets: [
                    "latest",
                    "react-app"
                ],
                sourceMap: 'inline',
                plugins: [
                    "transform-object-rest-spread"
                ]
            }
        }
    })
}
