# {{ name }}

> {{ description }}

## Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:3000
yarn dev

# build for production with minification
yarn build
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Project Structure

```console
.
├── build/
│   └── webpack.*.js        # Webpack configurations
├── dist/                   # Compiled application
│   ├── css/
│   │   └── *.css
│   ├── fonts/
│   ├── images/
│   ├── index.html
│   └── *.js
├── src/                    # Application source files
│   ├── components/         # All your view components
│   │   ├── your-component/ # A single view component
│   │   │   ├── index.js    # The view component code
│   │   │   └── index.styl  # The view component styles
│   │   └── ...
│   ├── images/             # The assets would be compiled for internal include
│   ├── pages/              # All your page containers
│   │   ├── your-page/      # A single page view container
│   │   │   ├── index.js    # The page container code
│   │   │   └── index.styl  # The page container styles
│   │   └── ...
│   ├── routes.js           # Application routing definition
│   └── index.js            # Application entry point
├── static/                 # Static files that are copied to build production output
│   └── logo.svg            # The mithril offcial logo (download from mithril.js.org)
├── .eslintrc.js            # ESLint configuration
├── .gitignore
├── index.html              # Application HTML template
├── package.json            # NPM configuration and scripts
└── README.md
```
