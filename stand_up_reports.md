# Written stand-up reports

## TODO-app

## Sara Viktorsson and Björn Tirsén

## Assignment 1, Backend 3, Webb20 - September 2021

### Tuesday September 28th - day 1:

We read the project requirements together and then put together a Trello board with the following columns: Requirements, Backlog, In Progress, Ready for Testing. /BT

### Wednesday September 29th - day 2:

Yesterday we discussed the project and created cards on our trello board. We set up the project with dependencies, gitignore and ESLint, and created a repo on github. After that we created a database on Atlas, added a .env file with all database variables and made sure the connection was working. We created a model for a todolist and tried it with a post request from postman to see if the data was added to the database correctly. /SV

### Thursday September 30th - day 3:

Yesterday we implemented morgan as logger and removed console statements. We implemented the get all lists route and refactored the async functions with a catchAsync function in addition to some smaller changes in the code. Today we are going to work separately and then show each other what we have made./BT

### Friday October 1st - day 4:

Yesterday we worked separatly. Björn kept working on the backend while I started on the frontend. I created a React project and a github repo. I created a basic structure for the app:
* two pages: a landing page and one to display overview of the lists
* created routes for the pages
* fetched lists from the backend to display on the list page. 
/SV 

### Tuesday October 5th - day 5 

since the last time have been working on CRUD from frontend and some simple layout. I also learned about JWT and bcrypt and how to use it in this application. Today we will be working together to connect sign in/login from the frontend to our backend.
