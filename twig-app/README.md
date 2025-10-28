# Twig App

This is a simple web application built with Node.js, Express, and the Twig templating engine.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [DevDependencies](#devDependencies)
- [License](#license)

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/twig-app.git
cd twig-app
npm install
```

## Usage

### Development

To run the application in development mode, use the following command:

```bash
npm run dev
```

This will start the server with nodemon, which will automatically restart the server when you make changes to the code. It also starts a watcher for Tailwind CSS.

### Production

To run the application in production mode, use the following command:

```bash
npm start
```

## Scripts

- `start`: Starts the server in production mode.
- `dev`: Starts the server in development mode with nodemon and a Tailwind CSS watcher.
- `build:css`: Builds the Tailwind CSS files.
- `watch:css`: Watches the Tailwind CSS files for changes.

## Dependencies

- [express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
- [twig](https://twig.symfony.com/): The flexible, fast, and secure template engine for PHP.

## DevDependencies

- [autoprefixer](https://github.com/postcss/autoprefixer): Parse CSS and add vendor prefixes to rules by Can I Use.
- [postcss](https://postcss.org/): A tool for transforming CSS with JavaScript.
- [tailwindcss](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.

## License

This project is licensed under the ISC License.
