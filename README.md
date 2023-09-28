# Garnished LLP

This repo contains a full stack web app for Garnished LLP, a mobile bar business.

- [Live URL](https://garnished.events)

## Technology

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
- SASS modules
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
- Swapped to relative import paths: `../../path/`
- Used `tsc` to compile my code into vanilla JS, making deployment simpler
- Updated my npm `dev` script to:
  - Use `nodemon` to monitor the source directory for changes in .ts files
  - Compile those changes into the `/dist` directory
  - Run the compiled code using node

These changes made the development and production modes more consistent. They also reduced complexity, the number of dependencies, and the likelihood of encountering issues like security vulnerabilities or bugs.

**Update**: Interestingly, I discovered the `tsc-alias` package, which transpiles path aliases during build time. With it, I could maintain clean import statements while enjoying the benefits mentioned above. The final npm scripts for the server code are:

```json
"scripts": {
  "dev": "concurrently \"tsc -w\" \"tsc-alias -p tsconfig.json --watch\" \"nodemon dist/index.js\"",
  "build": "tsc && tsc-alias -p tsconfig.json",
  "start": "node dist/index.js"
},
```

### Test Deployment & CORS

During development, I needed a way to share my progress with my clients. GitHub pages only allows one page per repo and this presented a problem because I did not want to overwrite the temporary "Coming Soon" splash page.

To get around this, I created a secondary GitHub repo for the test page and added it as a secondary remote origin to the primary repo.

My personal domain was already setup to host all of my GitHub repos, making them accessible via a URL path: `https://bmilcs.com/<some_repo>`. I deployed this test site, as I normally would, to `/garnished-test`. Unfortunately, my JSON Web Token based authentication relies on httpOnly cookies, and as a result, they could not be set from a different domain. This resulted in a CORS error.

My final solution was to deploy the test page to a subdomain on the parent `garnished.events` domain. I then converted my string based CORS origin to to an array, in order to cover both the public domain and the `test` subdomain.

### `react-router-dom` & GitHub Pages: URL Path Redirects

When `react-router-dom` is used for client side routing, paths will not resolve if a web site is refreshed or a URL is typed directly into the address bar. All URLs entered into the address bar of your browser are sent to the server, which in this instance, is GitHub Pages.

React router paths are not accessible unless the root custom domain is accessed, the index page is read and the JavaScript resources are fetched and read. However, this never occurs if a path is tacked onto the base URL. GitHub Pages throws their default 404 error page.

Fortunately, GH Pages allows us to use a custom 404.html by placing it in the root path of the repo. Following the instructions laid out in the `spa-github-pages` repo, two scripts are used to solve the issue:

- `404.html` script
  - takes the current url & converts the path/query string to just a query string
  - redirects the browser to the new url with a query string & hash fragment
- `index.html` script
  - checks to see if a redirect is present in the query string,
  - converts it back into the correct url
  - adds it to the browser's history using window.history.replaceState(...),
  - once the page loads, the correct url is waiting in the browser's history for the SPA to route

Explanation: https://stackoverflow.com/a/36623117
Solution: https://github.com/rafgraph/spa-github-pages
