# carto-frontend-test

Small application for styling data.

## Instructions
Required:

~~~~
- NodeJS
- NPM
~~~~

Steps:

~~~~
1. npm install / yarn install
2. npm run build / yarn run build
3. Open 'public/index.html' with a browser
~~~~

## Decisions

- This is my first time using a map library, I read the ones you recommended and I chose Leaflet as it was the one I knew from before.
- I've chosen Grunt as "bundler", I used to use Webpack but I think this code isn't big enough to prepare Webpack.
- I've chosen a CARTO basemap, cause It looks so clean.
- I've written the entire code in ES2015 but I transformed it using Babelify.
- All controls are coded in components, all of them are reusable and mounted in the app using a component called 'styler'.
- While coding the easter egg I noticed that the result of passing function to controls is coupled code but as I wanted to deliver the test as soon as posible I didn't changed it. A posible solution is to create something like the action dispatcher of Redux.



## Bonus points

- **How would you implement a choropleth map?**

    A choropleth map could be implemented receiving polygons from a GEOJson file and putting a color to each one based in a property of each feature.

- **Do you feel a legend would be needed?**

    I think a legend wouldn't be necesary in this case because all the points represent the same thing. But in the case of a map with points with diferents colors, a legend could be useful.

- **We love Easter eggs 😬.**

    Maybe, touching the heart twice could be a good idea. 🤔