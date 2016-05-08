# LA-train
Public Transportation App, Project 2 from Udacity Senior Web Developer Nanodegree. It's a responsive app with IndexedDB and service worker.

##Demo
- You can see a demo [here](https://udacitytwo.firebaseapp.com/#/dashboard).

##Technologies:
[IndexedDB](https://developer.mozilla.org/en/docs/Web/API/IndexedDB_API)
[Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
[AngularJS](https://angularjs.org/)   
[Firebase](https://www.firebase.com/)  
JavaScript  
HTML5  
CSS3  
Gulp  
JQuery  

##Dependencies:
- **Node.js**  
You must download and install it [here](https://nodejs.org/en/).

##Running:
Go to root folder of project, open your terminal and then follow steps:  

- Installing and store our dependencies:  
`$ npm install`

- Download packages that we need:  
`$ bower install`

- Running serve task:  
`$ npm run gulp server`

##Service Worker
- Generate service work calling a task from gulp. The task will to set up all you need.

`$ gulp generate-sw`

##Indexed Data Base
  Reading from GTFS files and setting up. I used idbwrapping lib to help me with the functionalities that I need to store my json files. From GTFS files I use only stops.json and stop_times.json to solve my problem.

##Distribution
- Generate dist folder with all needs such as minify, uglify, compress and others.

`$ gulp dist`

##Features  
**Version 1.0.0**  
- First commit
