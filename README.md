# Garnished Events LLP

This repo contains a full stack web app for Garnished Events LLP, a mobile bar business.

- [Live URL](https://garnished.events)
- [Preview URL](https://test.garnished.events)

## Technology Used

Server:

- Express
- MongoDB
- TypeScript
- RESTful API
- JSON Web Tokens
- Nodemailer

Client:

- Vite
- React
- TypeScript
- SCSS modules
- ESLint
- React PDF
- Framer Motion
- ImageMagick
- Bash Scripts
  1. `generateAssets.sh`: Automates the compression & generation of responsive image sizes (to be used with `<img srcset="...">` for SEO optimization & load time reduction)
  2. `writeAssetsIndex.sh`: Automates the generation of `@/assets/index.ts`, including image import statements & the creation of image objects that organize responsive image sizes for each asset. The objects are then consumed by the `ResponsiveImage` component throughout the site.

## Problems Overcome

### Deployment Struggles

My original plan was to use `ts-node` and `tsconfig-paths` for the server. The goal was to keep things simple by running TypeScript directly on the backend and using clean "@/" base paths for module imports.

However, Fly.io, the Platform as a Service I used to host the server, had issues with these packages.

Here's what I did to work around the problem:

- Removed `ts-node` and `tsconfig-paths`
- Swapped to `tsc` for compiling my code into vanilla JS during development & builds
- Added `tsc-alias` package, which transpiles path aliases during build time

My updated npm `dev` script does the following:

- Runs `tsc -w` with `tsc-alias` to automatically transpile Typescript changes with path resolution to `js`
- Runs `nodemon` on `dist/index.js` to monitor for changes & automatically reload the server

These changes made the development and production modes more consistent. They also reduced complexity, the number of dependencies, and the likelihood of encountering issues like security vulnerabilities or bugs. The final iteration of my server scripts are as follows:

```json
"scripts": {
    "dev": "concurrently \"tsc -w\" \"tsc-alias -p tsconfig.json --watch\" \"nodemon --inspect --ignore tests dist/index.js\"",
    "build": "tsc && tsc-alias -p tsconfig.json",
    "start": "node dist/index.js",
    "test": "ts-mocha --timeout 5000 -w -r tsconfig-paths/register src/tests/**/*.ts"
  },
```

### Test Deployment & CORS

During development, I needed a way to share my progress with the clients. This presented a problem because GitHub pages only allows one site per repo.

To get around this, I created a secondary GitHub repo ([bmilcs/garnished-preview](https://github.com/bmilcs/garnished-preview)) for the client previews. Using a subdomain of `test`, I setup the CNAME DNS record with Google Domains and setup npm scripts for quickly deploying previews.

Initially, I went with a `git subtree` approach for the preview site. However, my final solution was to add the preview repo as a `git submodule` on the primary repo. Using a submodule allowed me to build directly to the preview repo, add and commit changes to it, all while inside the main repo. Another benefit of using a submodule is that it kept the main repo's commit history clean of preview builds and worked flawlessly going forward.

On the backend, I then converted my string based CORS origin to to an array to cover both the apex domain and the `test` subdomain.

### `react-router-dom` & GitHub Pages: URL Path Redirects

In a single page application, only one route is directly accessible from the web: the base URL. However, if a path is tacked onto the base URL in the address bar of a web browser, the browser sends the request directly to the server. GitHub Pages has no knowledge of the paths defined in our JavaScript files and throws a default 404 error page.

Fortunately, GH Pages allows us to use a custom 404.html by placing it in the root path of the repo. By adding a nifty script to our custom `404.html`, the URL that the user is attempting to visit is extracted and then passed to your `index.html` via a query string & hash fragment. Once the user is redirected to your SPA's index, it waits for the page to load and then routes the user to the correct path in your SPA.

- Explanation: https://stackoverflow.com/a/36623117
- Solution: https://github.com/rafgraph/spa-github-pages
