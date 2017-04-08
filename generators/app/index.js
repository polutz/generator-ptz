'use strict';

var Generator = require('yeoman-generator'),
    _ = require('lodash'),
    defaultPrompting = require('./defaultPrompting');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    //initializing - Your initialization methods (checking current project state, getting configs, etc)
    initializing() {
    }

    //prompting - Where you prompt users for options (where you'd call this.prompt())
    prompting() {
        if (!this.options.isComposing)
            return defaultPrompting(this);
    }

    //    configuring - Saving configurations and configure the project (creating.editorconfig files and other metadata files)
    configuring() {
        this.log('configuring');
    }

    //default - If the method name doesn't match a priority, it will be pushed to this group.
    default() {
        this.log('default');
    }

    //writing - Where you write the generator specific files (routes, controllers, etc)
    writing() {
        console.log('ptz options =>>>>>>>>>>>>>>>>>>>>>>>>>>>>', this.options.ptz);

        const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

        const pkg = _.merge({
            name: this.options.ptz.appname,
            version: "1.0.0",
            description: this.options.ptz.description || "this is a Polutz module.",
            main: "dist/index.js",
            typings: "src/index.ts",
            scripts: {
                lint: "tslint ./src/**/*.ts ./src/**/*.test.ts ./src/**/*.d.ts",
                js: "rimraf dist && tsc && babel dist -d dist --presets es2015",
                pretest: "npm-run-all --parallel js lint",
                mocha: "mocha ./dist/**/*.js --require babel-polyfill",
                test: "nyc npm run mocha && nyc report --reporter=text-lcov > coverage.lcov && codecov --token=" + this.options.ptz.codecovToken,
                predebug: "npm run pretest",
                debug: "node --nolazy --debug-brk=5858 dist/index.js"
            },
            repository: {
                type: "git",
                url: "git+https://github.com/" + this.options.ptz.githubAuthorProject + ".git"
            },
            author: "github.com/angeloocana",
            license: "ISC",
            bugs: {
                url: "https://github.com/" + this.options.ptz.githubAuthorProject + "/issues"
            },
            homepage: "https://github.com/" + this.options.ptz.githubAuthorProject + "#readme",
            devDependencies: {
                "babel-cli": "^6.24.1",
                "babel-preset-es2015": "^6.24.1",
                "codecov": "^2.1.0",
                "istanbul": "^0.4.5",
                "mocha": "^3.2.0",
                "mocha-lcov-reporter": "^1.3.0",
                "npm-run-all": "^4.0.2",
                "nyc": "^10.2.0",
                "ptz-assert": "^1.6.3",
                "rimraf": "^2.6.1",
                "sinon": "^2.1.0",
                "tslint": "^5.0.0",
                "typescript": "^2.2.2",
                "@types/mocha": "^2.2.40",
                "@types/node": "^7.0.12"
            }
        }, currentPkg);

        // Let's extend package.json so we're not overwriting user previous fields
        this.fs.writeJSON(this.destinationPath('package.json'), pkg);

        this.fs.copy(this.templatePath('_tslint.json'), this.destinationPath('tslint.json'));
        this.fs.copy(this.templatePath('_LICENSE'), this.destinationPath('LICENSE'));
        this.fs.copy(this.templatePath('_tsconfig.json'), this.destinationPath('tsconfig.json'));
        this.fs.copy(this.templatePath('_CHANGELOG.md'), this.destinationPath('CHANGELOG.md'));

        this.fs.copy(this.templatePath('vscode/_launch.json'),
            this.destinationPath('.vscode/launch.json'));

        this.fs.copyTpl(
            this.templatePath('_README.md'),
            this.destinationPath('README.md'),
            this.options.ptz);

        this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
        this.fs.copy(this.templatePath('travis.yml'), this.destinationPath('.travis.yml'));

        if (!this.options.ptz.dontCreateIndexTs)
            this.fs.copy(this.templatePath('src/_index.ts'), this.destinationPath('src/index.ts'));

        if (!this.options.ptz.dontCreateErrorsTs)
            this.fs.copy(this.templatePath('src/_errors.ts'), this.destinationPath('src/errors.ts'));
    }

    //conflicts - Where conflicts are handled (used internally)
    conflicts() {
        this.log('conflicts');
    }

    //install - Where installation are run (npm, bower)
    install() {
    }

    //end - Called last, cleanup, say good bye, etc
    end() {
        this.log('end');
    }
};

