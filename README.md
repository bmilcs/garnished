# Garnished Events LLP

This repo contains a full stack web app for Garnished Events LLP, a mobile bar business.

- [Live URL](https://garnished.events)
- [Preview URL](https://test.garnished.events)

## Technology Used

Server:

- RESTful API
- Express
- MongoDB
- TypeScript
- JSON Web Tokens
- Nodemailer
- Fly.io PaaS

Client:

- Vite
- React
- TypeScript
- SCSS modules
- ESLint
- React PDF
- Google Analytics
- Framer Motion
- ImageMagick
- Bash Scripts
  1. `generateAssets.sh`: Automates the compression & generation of responsive image sizes (to be used with `<img srcset="...">` for SEO optimization & load time reduction)
  2. `writeAssetsIndex.sh`: Automates the generation of `@/assets/index.ts`, including image import statements & the creation of image objects that organize responsive image sizes for each asset. The objects are then consumed by the `ResponsiveImage` component throughout the site.

## Summary

After a year of studying modern web development and building personal projects, it was time to take on a client and to solve the needs of a real business. The client's requirements were as follows:

- Landing page
- Service listing
- Seasonal menus in PDF format
- Photo gallery / carousel
- Contact form
- User Auth & Event Estimates

I was supplied with barebone details of the business, images and the content and design was left to me. After producing a near finished product, a secondary stakeholder provided an extensive list of changes, color theme and typography requirements. Fortunately, I planned ahead and used custom CSS properties that made alterations a breeze.

## Steps Taken

My general approach in web development is to get a working prototype up and running as quickly as possible. Once in place, I go back, review and refactor to improve accessibility, code quality, reduce repetition (DRY) and optimize performance.

1. Created a main repo
2. Setup WHITEBOARD markdown file with a list of ideas/questions for clients
3. Met w/ clients & documented the requirements for the project
4. Created a TODO markdown, finalized my plan of attack & began development
5. Initialized the client and server folders with essential packages & laid out a file structure
   1. Frontend: React, React Router DOM, SASS, TypeScript, etc.
   2. Backend: Express, TypeScript, MongoDB, Mongoose, dotenv, nodemailer, etc.
   3. VSCode debug config
6. Setup domain, DNS records & a workflow for publishing previews to show client my progress
7. Backend: Designed & produced basic API server
   1. Authentication via JWT & HttpOnly cookies
   2. Database models & schemas for users & events
   3. Routes
8. Frontend: Built out baseline components, hooks & utility functions for interacting with API
9. Frontend: Built out baseline site layout & React routes
10. Continued development on backend and frontend until a prototype was finished
11. Reviewed, refactored and commented code to prevent repetitiveness and improve readability
12. Added Google Analytics to track user behavior and unusual errors

As with any project, there were inevitable hiccups and challenges that arose throughout development.

## Performance, SEO & OG Images

As my career hunt continues, it is apparent that performance and SEO optimization are a desire of most employers. Fast load times and responsiveness are an essential skill of any developer. With that in mind, I made it a goal for this project.

Images can be the biggest culprits of sluggish web apps. In this instance, I was supplied with a large number of them, in excessively large, uncompressed and less than ideal file formats.

After researching the topic and the various services out there for solving this issue, I decided to go with a custom solution using the command line utility ImageMagick. Knowing that new images will be added to the site over time, a need for automating the organization and importing of images became apparent.

BASH scripts fit the bill perfectly.

1. `generateAssets.sh`: traverses the /assets directory for original/ subdirectories, then compresses, resizes and converts all images to several sizes to be used in `<img>` element's `srcsets` and `sizes` attributes.
2. `writeAssetsIndex.sh`: generates an index file in the assets/ directory, organizing all images into objects based on the image type. Each baseline image in the master object is defined as it's own key, containing an object of it's resized copies. These objects are then exported and available for consumption throughout the app.

A custom React component `ResponsiveImage` was implemented to simplify the use of `srcsets`, as most images throughout the site follow the same behavior based on the viewport size. The component accepts an image object mentioned above and the browser automatically loads the ideal image size based on the client's screen size.

The `Hero` component was an exception to this rule, as images are set as a `background` property and always needed to be `100vw`. Using a custom `useWindowSize` React hook, the background image is set in a `useEffect` hook, as a side effect of the viewport changing.

To further improve SEO, I made sure to address low color contrast errors, apply `aria-label` to buttons without discernible text, `tabIndex` to focusable/clickable elements, and semantic HTML elements in place of generic `div` when possible.

Sharing the site's link on social media, chat platforms and SMS required the need for `meta` tags and OG images. Using a online generator, I was able to accomplish this in short notice.

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

In a single page application, only one route is directly accessible from the web: the base URL. However, if a path is tacked onto the base URL in the address bar of a web browser, the browser sends the request directly to the server. GitHub Pages has no knowledge of the routes defined in our JavaScript files and throws a default 404 error page.

Fortunately, GH Pages allows us to use a custom 404.html by placing it in the root path of the repo. By adding a nifty script to a custom `404.html`, the URL that the user is attempting to visit is extracted and then passed to your `index.html` via a query string & hash fragment. Once the user is redirected to your SPA's index, it waits for the page to load and then routes the user to the correct path in your SPA.

- Explanation: https://stackoverflow.com/a/36623117
- Solution: https://github.com/rafgraph/spa-github-pages
