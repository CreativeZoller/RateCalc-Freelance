# RateCalc-Freelance

![GitHub issues](https://img.shields.io/github/issues-raw/CreativeZoller/ratecalc-freelance?logo=issues)
![GitHub last commit](https://img.shields.io/github/last-commit/CreativeZoller/ratecalc-freelance?logo=last%20commit)
[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/Tuud6AkcbYJgkL83Xx2Q2Q/5EZYa3QsJCF4NkHLj1Pw5c/tree/main.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/circleci/Tuud6AkcbYJgkL83Xx2Q2Q/5EZYa3QsJCF4NkHLj1Pw5c/tree/main)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/CreativeZoller/RateCalc-Freelance)
![GitHub License](https://img.shields.io/github/license/CreativeZoller/RateCalc-Freelance)

## Table of Contents

-   [Description](#description)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Testing](#testing)
-   [License](#license)
-   [Credits](#credits)


## Description

Get paid what you're worth with RateCalc-Freelance! Our powerful calculator takes the guesswork out of setting your hourly rate for every project. Say goodbye to undercharging or overbidding, and hello to fair compensation for your hard work. Join the freelancing revolution today!

### Version

0.0.2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.

### Demo

> Todo after functionality is done

Live demo is available at: HREF

https://shields.io/

> Todo Local Circle CI https://circleci.com/docs/how-to-use-the-circleci-local-cli/

<!--
![W3C Validation](https://img.shields.io/w3c-validation/default?targetUrl=https%3A%2F%2Fgithub.com%2FCreativeZoller%2FRateCalc-Freelance)
> Todo W3c validates the repo page itself, update after a demo page is deployed
> Add Sonar coverage badge
> Add Sonar tests badge
-->


#### Features

> Todo after functionality is done

- Angular 13 for GUI with Angular-Material 15
- Export of the generated calculations

## Installation

### Prerequirements

It is very important to have node, npm and yarn installed.

**nvm** - if you have nvm installed on your machine, please change for the proper version

-   Node v20.12.2
-   NPM v10.6.0
-   Yarn v1.22.19

If Husky is not installed in your system, please also run the folowing command: `npm run prepare` or `yarn run prepare`, it will initialize Husky properly.

### Installation of the required packages

When all the requirements are installed and verified, run `npm install` or `yarn` and all the dependencies will be installed.

Since the project uses Husky to ensure some hooks are used properly, it is recommended to use the following commands after npm package installations are done:

    ```
    git config core.hooksPath .husky
    find .git/hooks -type l -exec rm {} \;
    find .husky -type f -exec ln -sf ../../{} .git/hooks/ \;
    ```

**Note:** if you have the Husky installed, first try to commit `git commit -m "Keep calm and commit 🎉"`

## Usage

> Todo after functionality is done

Provide instructions and examples for use. Include screenshots as needed.

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    ```md
    ![alt text](assets/images/screenshot.png)
    ```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Testing

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## License

This project uses GNU General Public Licence which is readable in the [LICENSE](LICENSE) file.

## Credits

List your collaborators, if any, with links to their GitHub profiles.

If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.

If you followed tutorials, include links to those here as well.

## How to Contribute

If you would like to contribute to this project, or having suggestions, feel free to read the [CONTRIBUTING](CONTRIBUTING.md) documentation and/or the [Contributor Covenant](https://www.contributor-covenant.org/) industry standard.
