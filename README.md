# Climbing Adventures
This is a project that is used to showcase rock climbing videos by location.

The front-end uses [next.js](https://nextjs.org/) as well as [tailwindcss](https://tailwindcss.com/) while we use [firebase](https://console.firebase.google.com/) for authentication and database work.

# Site Structure
- `/` index page is the home page
- `/locations` shows a map powered by [leaflet.js](https://leafletjs.com/) that shows the gyms that the user climbs at
- `/climbs/{locationID}` shows a grid of videos of all the climbs that have taken place at that location
- `/login` allows for signing into the content management system
- `/contentManager` is the actual CMS for adding climbs.

> Note that currently, there is not point in adding climbs if you are not me as the site only shows climbs under my user