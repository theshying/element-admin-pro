// dependencies
const path = require('path');
const express = require('express');
const chalk = require('chalk');
const chokidar = require('chokidar');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const config = require('../config');

// initial
const mockPort = config.dev.mockPort || 8989;
const mockFileDir = config.dev.mockFileDir;
const mockFiles = path.resolve(mockFileDir, '**/*.js');
const mockFile = path.resolve(mockFileDir, 'index.js');

const app = express();
let router = express.Router();
let mockData = {};

// utils
const notFoundGenerator = function(req, res) {
    res.status(404).send('404 Not Found. Cannot ' + req.method + ' ' + req.path);
};

const updateRouter = function() {
    router = null;
    router = express.Router();
    Object.keys(mockData).forEach(function(path) {
        router.all(path, function(req, res) {
            const methods = Object.keys(mockData[path]);

            for (let index = 0; index < methods.length; index++) {
                const method = methods[index];

                if (req.method === method) {
                    const entity = mockData[path][method];
                    if (typeof entity === 'function') {
                        entity(req, res);
                    } else {
                        res.send(entity);
                    }
                    return;
                }
            }

            notFoundGenerator(req, res);
        });
    });
}

const log = function(message) {
    console.log(chalk.gray('[MOCK] ') + message);
}

// 清除require缓存
const deleteRequireCache = function(filePath) {
    if (require.cache[filePath]) {
        if (require.cache[filePath].parent) {
            deleteRequireCache(require.cache[filePath].parent.id)
        }
        delete require.cache[filePath];
    }
}

// start the server
const startSever = function() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors({ origin: true, credentials: true }));
    app.use(morgan('dev'));

    // use middleware
    app.use(function() {
        router.apply(this, arguments);
    });

    app.use(function(req, res, next) {
        notFoundGenerator(req, res);
    });

    // listen the port
    app.listen(mockPort, () => {
        log(`Mock server is now running at port ${mockPort}!`);
    });
};

// update mock data
const updateMockData = function() {
    delete require.cache[mockFile];
    try {
        mockData = require(mockFile) || {};
        updateRouter();

        log(chalk.cyan('Mock data updated...'));
    } catch (error) {
        log(chalk.red(error.message, error.stack));
    }
}

// inintial the watch
const initWatch = function() {
    updateMockData();
    return new Promise((resolve, reject) => {
        chokidar.watch(mockFiles)
            .on('add', (path) => {
                log(chalk.green('Add ') + path);
            })
            .on('change', (path) => {
                log(chalk.yellow('Change ') + path);
            })
            .on('unlink', (path) => {
                log(chalk.magenta('Unlink ') + path);
            })
            .on('ready', () => {
                log(chalk.cyan('Watch ') + mockFiles);
                resolve();
            })
            .on('error', (err) => {
                log(chalk.red('Error ') + err.message);
                reject(err);
            })
            .on('all', (event, filePath, details) => {
                // if (['add', 'change', 'unlink'].indexOf(event) >= 0) {
                //     delete require.cache[mockFile];
                //     mockData = require(mockFile) || {};

                //     log(chalk.cyan('Mock data updated...'));
                // } else if (event === 'unlinkDir') {
                //     processDirRemoved(path);
                // }
                if (details && details.watchedPath) {
                    deleteRequireCache(path.resolve(details.watchedPath, filePath))
                }

                updateMockData();
            })
            .on('raw', (event, filePath, details) => {
                // if (event === 'moved' && details.type === 'directory') {
                //     processDirRemoved(path);
                // }
                if (details && details.watchedPath) {
                    deleteRequireCache(path.resolve(details.watchedPath, filePath))
                }

                updateMockData();
            });
    });
};

initWatch().then(startSever);
