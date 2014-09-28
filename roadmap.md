
# create `#recipe` page
# create `all recipes` page
# create search functionallity
# BUG clear omnibox form on submit
# store recipe on editRecipeForm submit

# CORS request
  _ get jquery
  _ test `GET` request
  	- XMLHttpRequest cannot load http://localhost:3000/. No 'Access-Control-Allow-Origin' header is present on the requested resource.
  	- set that request header using $.ajax I think
# make scraper
	_ experiment using JSON file to define parser
	- create seperate class for parser
	- load <parser>.json from file system
# jade templates on client
# Store API
	_ find out if there is differences in chrome.storage.local vs. window.localStorage
	- write storage class to do the following
		+ get
		+ add
		+ getRecipes
		+ remove
		+ search - takes in a string an does full text search; should be async

# Unit tests
	- get unit test framework going
	- write unit test for 
		+ RecipeStore

# UI functionallity
## upload 
on form submit parse url
go to edit page
on edit recipe form sumbit store recipe
