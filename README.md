# LA-train
Public Transportation App, Project 2 from Udacity Senior Web Developer Nanodegree. It's a responsive app with IndexedDB and Service Worker. Offline first and Mobile first.  
### Requirement  
> You will build an application that allows users to select a departure and arrival train station, and see a list of trains, times, and durations. A default train schedule will be provided that should be used when the application is offline. If a network connection exists, the application will query an endpoint that provides information about all arrival and departure times.  

> Udacity

##[Demo](https://udacitytwo.firebaseapp.com/#/dashboard)  
You can see a demo [here](https://udacitytwo.firebaseapp.com/#/dashboard).  

### Mobile  
<img src="https://raw.githubusercontent.com/mortoni/LA-train/master/app/images/demo1.png" width="393" height="800" />  
### Desktop  
![image](https://raw.githubusercontent.com/mortoni/LA-train/master/app/images/demo2.png)  

##Technologies
[IndexedDB](https://developer.mozilla.org/en/docs/Web/API/IndexedDB_API)  
[Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)  
[AngularJS](https://angularjs.org/)  
[Firebase](https://www.firebase.com/)  
JavaScript  
HTML5  
CSS3  
Gulp
BootStrap 3  
JQuery  

##Dependencies
- **Node.js**  
You must download and install it [here](https://nodejs.org/en/).  

##Running
Go to root folder of project, open your terminal and then follow steps:  
###Development Server  
- Installing dependencies:
```{r, engine='bash', count_lines}
$ npm install
```

- Download packages:  
```{r, engine='bash', count_lines}
$ bower install
```

- Running server:  
```{r, engine='bash', count_lines}
$ npm run gulp server:dev
```
###Distribution Server  
- Generate distribution:  
```{r, engine='bash', count_lines}
$ gulp dist
```

- Running server:  
```{r, engine='bash', count_lines}
$ npm run gulp server:dist
```

##Service Worker
[Service Worker Precache](https://github.com/GoogleChrome/sw-precache) is a module to generate the service work to precache user resources. To Generate service work:  
```{r, engine='bash', count_lines}
$ gulp generate-sw
```

##IndexedDB
  Reading from GTFS files and setting up. I use [idbwrapper](https://github.com/jensarps/IDBWrapper) to manipulate user IndexedDB.  

##Features  
**Version 1.0.0**  
- First commit
