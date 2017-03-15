var _ = require('lodash');

module.exports = function (that) {
    return that.prompt([{
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: that.appname, // Default to current folder name
        store: true
    },
    {
        type: 'input',
        name: 'githubAuthor',
        message: 'git hub Author',
        default: 'polutz',
        store: true
    },
    {
        type: 'input',
        name: 'codecovToken',
        message: 'get codecov token at https://codecov.io/'
    },
    {
        type: 'confirm',
        name: 'runNpmInstall',
        message: 'Run npm install?',
        default: true,
        store: true
    }]).then((answers) => {
        that.options.appname = _.kebabCase(answers.name.replace(/\s+/g, ''));
        that.options.appnameStartCase = _.startCase(that.appname);
        that.options.codecovToken = answers.codecovToken;
        that.options.githubAuthorProject = answers.githubAuthor + '/' + answers.name;
        that.options.runNpmInstall = answers.runNpmInstall;
    });
}