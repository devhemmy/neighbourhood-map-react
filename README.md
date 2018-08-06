# Neighborhood Map Project
---

## What is this App

this app helps you find Great Places in Hurghada such as restaurants Cafes and Other Great shops for tourists
or anyone interested in going to Hurghada to have a nice and great time as the list of places are listed
on the right corner of the app as you can click on it's name and get right to it's point
## How run this App

All you Have to do is first Clone the Project from ....

then on your terminal run npm installed

after you are done run npm start

then the app will start automatically and if it doesn't

then navigate to [http://localhost:3000] in your browser

***NOTE:*** *The service workers for this app will only cache the site when it is in production mode.*

## How to Load the App in Production Mode

To run the app in production mode locally run:

npm run build

Navigate to the `build` directory and run a localhost server.  If you have Python 2.x installed you can run the Python Simple Server like this.

python -m SimpleHTTPServer 8080

For Python 3.x, the command is:

-m http.server 8080

In either case navigate to [http://localhost:8000](http://localhost:8000) in your browser.

Or if you prefer you can use Node [serve](https://github.com/zeit/serve).  If you do not have it installed you can install it with:

npm install -g serve

and then navigate into the build directory and run

serve -s

In this case the site will be hosted at [http://localhost:5000](http://localhost:5000)

## How to Use the App
Once the App Starts a list of restaurants will be displayed on the right side of the screen then you can click on one of
 one of those restaurants to get to it's point and as you click on it a window will appear with the image of the restaurants if provided with a Read more bottom which will get u to a new window with a lot more info about the restaurant you have clicked on

## Common mistakes

I have used my Google API quotes and for the foursquar api quotes there are just a few left so don't use them all
or else you will have to put a another foursquar api ID

##NOTE

i have removed my Google API as i used all of the quotes to let the app runs smoothly as i can't provide another billing one
