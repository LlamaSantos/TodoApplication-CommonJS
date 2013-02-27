# TODO

##Setup
* Firstly install node.js 0.8.*
* (Optional) Install WebStorm for debugging.
* Clone this repo
* Get all necessary modules
    * From the root of the repository:

        npm install --prod
* To Run, use the following:

        node app.js

##Templates
Install globally hogan.js to get the hulk command line tool, you can do that by running the following command

>npm install -g hogan.js

Once this is installed run the following command to generate the latest templates and place them into the templates.js script

>hulk ./templates/* > ./public/js/templates.js

This is scoped to the root of the project so adjust paths to whatever directory you are in.