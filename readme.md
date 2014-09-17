# Recipe Site
A chrome extension to make using and reusing recipies simple

# key features
recipe Site has a simple set of functionallity:
	- scrape a recipe sites to get only the recipe
	- display them in a mobile first and concise web page
	- store them on local storage for option offline usage
	- share recipe via evernote

# competing products
	- the main competitor is probably evernote
	- the recipe sites that this extension will be scraping are also competitors

# competitive advantage
	- light weight: a simple solution that doesn't have ads, or is a big application
	- open source parsers: parsers for the recipe site will be open source. Anyone can contribute a parser or improve an existing one. The goal is for the app to become the best web-crawler/scraper for any recipe site.

# monitization strategy
There are multiple routes to go here:
	1. freemium app with ads, pay to get ads removed and add some features like evernote sharing
	2. the full functionallity of the extension is free. There are only ads on the page where you put a recipe url in to get parsed.  You can also pay to have ads removed here.  Also have a donate option

The main difference is that option 2 focuses on providing a solid ad free experience.  This sharpens our competitive advantage of being a site that displays recipes without **any** ads.  

# projects

## scraper
There is an important design decision to be made: do we use a server to parse the websites or build the parser into the app?
### client side scraper
this is a chrome extension so everything will run in client

### server-side parser
Pros:
	- 
Cons: 
	-
## ui design
Components:
	- add url bar: always visible
	- list of recipes

need to use jade client-side templates


## storage
NOTE: Phonegap localStorage is the same as window.localStorage; i.e. Phonegap gives access to the W3C localStorage
## evernote integration