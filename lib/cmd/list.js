'use strict'
const table = require('../table');
const templates = require('../../template.json');

module.exports = () => {
    table(templates);
    process.exit();
};
