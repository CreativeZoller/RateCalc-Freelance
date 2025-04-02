# RateCalc-Freelance

## _The freelancer rate-calculator_

![GitHub issues](https://img.shields.io/github/issues-raw/CreativeZoller/ratecalc-freelance?logo=issues)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues-pr-raw/CreativeZoller/ratecalc-freelance)
![GitHub last commit](https://img.shields.io/github/last-commit/CreativeZoller/ratecalc-freelance?logo=last%20commit)
[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/Tuud6AkcbYJgkL83Xx2Q2Q/5EZYa3QsJCF4NkHLj1Pw5c/tree/main.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/circleci/Tuud6AkcbYJgkL83Xx2Q2Q/5EZYa3QsJCF4NkHLj1Pw5c/tree/main)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/CreativeZoller/RateCalc-Freelance)
![GitHub License](https://img.shields.io/github/license/CreativeZoller/RateCalc-Freelance)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech)
- [Development](#development)
- [Version History](#version)
- [Available Demo](#demo)
- [Running](#running)
- [Testing](#testing)
- [License](#license)
- [Credits](#credits)

> The Path to Freelance Success Starts Here

"A Proof Of Concept version for a modern mobile-first web application designed to simplify calculating your hourly rate with daily, monthly and yearly costs, working time and holiday calculations. Built with modern technologies. Perfect for solo entrepreneurs, small and medium sized companies, LLCs, LTs, etc. who want to make better living with properly aligning their rates with their needs."

![running app in chrome browser][screenshot]

## Features

- 🧠 **Well-Planned workflow:** Get personalized recommendations for destinations, weather, and activities.
- 📅 **Smart Scheduling:** Organize tasks, dates, and priorities with drag-and-drop functionality.
- 📤 **Export Options:** Save plans as PDF (print-ready) or CSV for further editing.
- 📱 **Responsive Design:** Works flawlessly on mobile and desktop.

## Tech

- **Frontend:** Angular - HTML enhanced for web apps!
- **Backend:** None - No data storage in the P.O.C. version
- **AI:** Sorry but none
- **Styling:** Tailwind CSS
- **Export:** jsPDF, PapaParse

## Development

Want to contribute? Great!

Whether you’re a developer looking to contribute or a freelancer seeking a rate planner, RateCalc-Freelance is for you. Check out the docs, open an issue, or fork the repo to start crafting your next adventure!

If you would like to contribute to this project, or having suggestions, feel free to read the [CONTRIBUTING](CONTRIBUTING.md) documentation and/or the [Contributor Covenant](https://www.contributor-covenant.org/) industry standard.

### Commands cheat-sheet for newcomers

For those who used npm till now, I would suggest to change to Yarn immediately. Here is a cheat-sheet for commands in both package manager:

| Command                  | NPM                                  | Yarn                           |
| ------------------------ | ------------------------------------ | ------------------------------ |
| Install dependencies     | `npm install`                        | `yarn`                         |
| Install package          | `npm install [package]`              | `yarn add [package]`           |
| Install Dev package      | `npm install --save-dev [package]`   | `yarn add --dev [package]`     |
| Uninstall package        | `npm uninstall [package]`            | `yarn remove [package]`        |
| Uninstall Dev package    | `npm uninstall --save-dev [package]` | `yarn remove [package]`        |
| Update                   | `npm update`                         | `yarn upgrade`                 |
| Update package           | `npm update [package]`               | `yarn upgrade [package]`       |
| Global install package   | `npm install --global [package]`     | `yarn global add [package]`    |
| Global uninstall package | `npm uninstall --global [package]`   | `yarn global remove [package]` |

| NPM                      | Yarn                      |
| ------------------------ | ------------------------- |
| `npm init`               | `yarn init`               |
| `npm run`                | `yarn run`                |
| `npm login (and logout)` | `yarn login (and logout)` |
| `npm link`               | `yarn link`               |
| `npm publish`            | `yarn publish`            |
| `npm cache clean`        | `yarn cache clean`        |

## Version

Future

For future version the following are planned:

- page animations
- i18n integration
- dark mode and light/dark mode switcher

0.0.6

The application now support subsciption to the newsletter - this is only for the POC version, so every interested party can get timely updates and also will be able to participate for free tier when the final version ships. Circle CI also configured for better testing.

- [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0
- [Rxjs](https://rxjs.dev/) version 7.8.1
- [Typescript](https://www.typescriptlang.org/) version 5.5.0
- [Jspdf](https://github.com/parallax/jsPDF) version 2.5.1
- [Autoprefixer](https://github.com/postcss/autoprefixer#readme) version 10.4.17
- [Husky](https://github.com/typicode/husky#readme) version 9.1.7
- [Prettier](https://prettier.io) version 3.4.2
- [Tailwindcss](https://tailwindcss.com) version 3.4.1

0.0.5

The application now has properly separated components, services and types for better scalability. Also the logic is seprated from view. Packages got updated. New functionalities added: export as pdf and export as xls. Mobile first responsive design added.

0.0.4

The application went through a whole refactoring, includig package changes, and upgrading to the newest Angular version at the end of 2024 and begnning of 2025.

0.0.3

Package versions were updated to 18.2.8. All other dependencies were updated accordingly.
This project features the following stack:

- [Angular CLI](https://github.com/angular/angular-cli) version 18.2.8
- [Angular Material](https://material.angular.io/) version 18.2.9
- [Rxjs](https://rxjs.dev/) version 7.5.0
- Active Eslint, Prettier, Husky, stylelint, Karma, etc.

0.0.2

This project was generated with the following stack:

- [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7
- Active Eslint, prettier, husky, stylelint, Karma, etc.

## Demo

Live demo is available at: [https://rate-calculator-poc.netlify.app/](https://rate-calculator-poc.netlify.app/)

## Installation

### Prerequirements

It is very important to have node, npm and yarn installed.

**nvm** - if you have nvm installed on your machine, please change for the proper version

- Node v20.18.0
- NPM v11.1.0
- Yarn v1.22.10

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

## Running

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Testing

> Todo: after Circle CI and unit testing successfully added

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

[screenshot]: assets/images/app-running.png
