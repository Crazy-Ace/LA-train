(function () {

  angular.module('app').constant('APP_SETTINGS', {
    "FIREBASE_URL": "https://trainee.firebaseio.com/"
  });

  angular.module('app').run(function ($rootScope, $location, APP_SETTINGS, jsonFactory, indexedDBFactory) {

    if ('serviceWorker' in navigator) {
      console.log('GOOD NEWS: this browser support service worker');
      navigator.serviceWorker.register('/service-worker.js', {scope: '/'})
      .then(function (registration) {
        var serviceWorker;
        if (registration.installing) {
          serviceWorker = registration.installing;
        } else if (registration.waiting) {
          serviceWorker = registration.waiting;
        } else if (registration.active) {
          serviceWorker = registration.active;
        }

        if (serviceWorker) {
          console.log("ServiceWorker phase:", serviceWorker.state);

          serviceWorker.addEventListener('statechange', function (e) {
            console.log("ServiceWorker phase:", e.target.state);
          });
        }
      }).catch(function (err) {
        console.log('ServiceWorker registration failed: ', err);
      });

    } else {
      console.log("this browser does NOT support service worker");
    }

    if (!("indexedDB" in window)){
      console.log('BAD NEWS: this browser does not support IndexedDB');
    }else{

      console.log('GOOD NEWS: this browser support IndexedDB');
      /*
      var agency01 = jsonFactory.agency();

      var agency = new IDBStore({
        dbVersion: 1,
        storeName: 'agency',
        keyPath: 'agency_id',
        autoIncrement: false,
        onStoreReady: function(){
          console.log('Agency is ready!');
          agency.put(agency01[0], onsuccess, onerror);
        }
      });

      var onsuccess = function(){
        console.log('Yeah, dude inserted! insertId is: ');
      }
      var onerror = function(error){
        console.log('Oh noes, sth went wrong!', error);
      }
      */
    }




        //var agency = jsonFactory.agency();




      /*

          var IDBSetting = {
              name: "indexedDBName",
              version: 1,
              tables: [{
                  tableName: "agency",
                  keyPath: "seq",
                  autoIncrement: true,
                  index: ["agency_id", "agency_name", "agency_url", "agency_timezone", "agency_lang", "agency_phone"],
                  unique: [false, false, false, false, false, false]
              }]
          };

          console.log("indexeDB init");

    var req = indexedDB.open(IDBSetting.name, IDBSetting.version);

    req.onsuccess = function(event) {
        console.log("indexedDB open success");
    };

    req.onerror = function(event) {
        console.log("indexed DB open fail");
    };

    //callback run init or versionUp
    req.onupgradeneeded = function(event) {
        console.log("init onupgradeneeded indexedDB ");
        var db = event.target.result;

        for (var i in IDBSetting.tables) {
            var OS = db.createObjectStore(IDBSetting.tables[i].tableName, {
                keyPath: IDBSetting.tables[i].keyPath,
                autoIncrement: IDBSetting.tables[i].autoIncrement
            });

            for (var j in IDBSetting.tables[i].index) {
                OS.createIndex(IDBSetting.tables[i].index[j], IDBSetting.tables[i].index[j], {
                    unique: IDBSetting.tables[i].unique[j]
                });
            }
        }
    }

    var IDBFuncSet = {
    //write
    addData: function(table, data) {
        var req = indexedDB.open(IDBSetting.name, IDBSetting.version);
        req.onsuccess = function(event) {
            try {
                console.log("addData indexedDB open success");
                var db = req.result;
                var transaction = db.transaction([table], "readwrite");
                var objectStore = transaction.objectStore(table);
                var objectStoreRequest = objectStore.add(data);
            } catch (e) {
                console.log("addDataFunction table or data null error");
                console.log(e);
            }

            objectStoreRequest.onsuccess = function(event) {
                console.log("Call data Insert success");
            }
            objectStoreRequest.onerror = function(event) {
                console.log("addData error");
            }
        };

        req.onerror = function(event) {
            console.log("addData indexed DB open fail");
        };
    }
}

var agency = jsonFactory.agency();
for(var i in agency){
   IDBFuncSet.addData(IDBSetting.tables[0].tableName, agency[i]);
} */
















    /*var request = indexedDB.open("LATrain", 2);

    request.onupgradeneeded = function(event) {

      var db = event.target.result;
      var objectStore = db.createObjectStore("agency", { autoIncrement : true });
      objectStore.createIndex("agency_id", "agency_id", { unique: true });
      const angecy = jsonFactory.agency();
      objectStore.transaction.oncomplete = function(event) {
        var agencyObjectStore = db.transaction("agency", "readwrite").objectStore("agency");
        for (var i in angecy) {
          agencyObjectStore.add(angecy[i]);
        }
      }
    }*/

/*
      var data = jsonFactory.agency();
      var objectStore = db.createObjectStore("agency");
      var transaction = db.transaction([STORE], IDBTransaction.READ_WRITE);
      var objstore = transaction.objectStore(STORE);

      for (i = 0; i < data.length; i++) {
          objstore.put(data[i]);
      }
*/
  });

  angular.module('app')
      .factory('appConfig', [appConfig]);


  function appConfig() {
      var pageTransitionOpts = [
          {
              name: 'Fade up',
              "class": 'animate-fade-up'
          }, {
              name: 'Scale up',
              "class": 'ainmate-scale-up'
          }, {
              name: 'Slide in from right',
              "class": 'ainmate-slide-in-right'
          }, {
              name: 'Flip Y',
              "class": 'animate-flip-y'
          }
      ];
      var date = new Date();
      var year = date.getFullYear();
      var main = {
          brand: 'LA-Train',
          name: 'Lisa',
          year: year,
          layout: 'wide',                                 // 'boxed', 'wide'
          menu: 'vertical',                               // 'horizontal', 'vertical'
          isMenuCollapsed: true,                         // true, false
          fixedHeader: true,                              // true, false
          fixedSidebar: false,                             // true, false
          pageTransition: pageTransitionOpts[0],          // 0, 1, 2, 3... and build your own
          skin: '25'                                      // 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
      };
      var color = {
          primary:    '#31C0BE',
          success:    '#60CD9B',
          info:       '#66B5D7',
          infoAlt:    '#8170CA',
          warning:    '#EEC95A',
          danger:     '#E87352',
          gray:       '#DCDCDC'
      };

      return {
          pageTransitionOpts: pageTransitionOpts,
          main: main,
          color: color
      }
  }

  /*angular.module('app').controller('HeaderCtrl', ['$scope']);

  function HeaderCtrl($scope) {

    if(navigator.onLine)
      $scope.connection = 'perfect';
    else
      $scope.connection = 'offline';
  }*/
})();
