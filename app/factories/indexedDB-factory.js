(function () {
  'use strict';

  angular.module('app').factory('indexedDBFactory', ['$q', function($q) {
  	//window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  	//window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  	//window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  	var defaultIDBSetting = {
  		name: "callTrain",
  		version: 1,
  		tableIndex: 0,
  		tableID: 0,
  		tables: [{
  			tableName: "agency",
  			keyPath: "seq",
  			autoIncrement: true,
  			index: ["agency_id", "agency_name", "agency_url", "agency_timezone", "agency_lang", "agency_phone"],
  			unique: [false, false, false, false, false, false]
  		}]
  	};

  	var module          = this,
  	/** IDBTransaction mode constants */
  	READONLY        = "readonly",
  	READWRITE       = "readwrite",
  	VERSIONCHANGE   = "versionchange",
  	/** IDBCursor direction and skip behaviour constants */
  	NEXT            = "next",
  	NEXTUNIQUE      = "nextunique",
  	PREV            = "prev",
  	PREVUNIQUE      = "prevunique";

      /** predefined variables */
      module.IDBSetting = {};
      module.setUp = false;
      module.db = null;
  	  module.tableName = '';
  	  module.tableID = '';
      module.deferred = null;
      module.debugMode = false;

  	function init(settings) {
  		module.deferred = $q.defer();

  		if(module.setUp) {
  			module.deferred.resolve(true);
  			return module.deferred.promise;
  		}

  		module.IDBSetting = settings || defaultIDBSetting;
  		module.tableName = module.IDBSetting.tables[module.IDBSetting.tableIndex].tableName;
  		module.tableID = module.IDBSetting.tables[module.IDBSetting.tableIndex].index[module.IDBSetting.tableID];

  		var openRequest = window.indexedDB.open(module.IDBSetting.name, ++module.IDBSetting.version);

  		openRequest.onerror = function(e) {
  			console.log("Error opening db");
  			console.dir(e);
  			module.deferred.reject(e.toString());
  		};

  		openRequest.onupgradeneeded = function(e) {
  			var db = e.target.result;

  			for (var i in module.IDBSetting.tables) {
  				if(!db.objectStoreNames.contains(module.IDBSetting.tables[i].tableName)) {
  					var objectStore = db.createObjectStore(module.IDBSetting.tables[i].tableName, {
  						keyPath: module.IDBSetting.tables[i].keyPath,
  						autoIncrement: module.IDBSetting.tables[i].autoIncrement
  					});

  					for (var j in module.IDBSetting.tables[i].index) {
  						objectStore.createIndex(module.IDBSetting.tables[i].index[j], module.IDBSetting.tables[i].index[j], {
  							unique: module.IDBSetting.tables[i].unique[j]
  						});
  					}
  				}
  			}
  		};

  		openRequest.onsuccess = function(e) {
  			module.db = e.target.result;

  			module.db.onerror = function(event) {
  				// Generic error handler for all errors targeted at this database's
  				// requests!
  				module.deferred.reject("Database error: " + event.target.errorCode);
  			};

  			module.setUp = true;
  			module.deferred.resolve(true);
  		};

  		return module.deferred.promise;
  	}

  	function isSupported() {
  		return ("indexedDB" in window);
  	}

  	function deleteOS(key) {
  		module.deferred = $q.defer();
  		var t = module.db.transaction([module.tableName], READWRITE);
  		var request = t.objectStore(module.tableName).delete(key);

  		t.oncomplete = function(event) {
  			module.deferred.resolve();
  		};

  		return module.deferred.promise;
  	}

  	function getOne(key) {
  		module.deferred = $q.defer();
  		var transaction = module.db.transaction([module.tableName]);
  		var objectStore = transaction.objectStore(module.tableName);
  		var request = objectStore.get(key);

  		request.onsuccess = function(event) {
  			var data = request.result;
  			module.deferred.resolve(data);
  		};

  		return module.deferred.promise;
  	}

  	function getAll() {
  		module.deferred = $q.defer();

  		init().then(function() {
  			var result = [];

  			var handleResult = function(event) {
  				var cursor = event.target.result;
  				if (cursor) {
  					result.push({key:cursor.key, title:cursor.value.title, updated:cursor.value.updated});
  					cursor.continue();
  				}
  			};
  			var transaction = module.db.transaction([module.tableName], READONLY);
  			var objectStore = transaction.objectStore(module.tableName);
              objectStore.openCursor().onsuccess = handleResult;

  			transaction.oncomplete = function(event) {
  				module.deferred.resolve(result);
  			};
  		});

  		return module.deferred.promise;
  	}

  	function ready() {
  		return module.setUp;
  	}

  	function saveOS(data) {
  		//Should this call init() too? maybe
  		module.deferred = $q.defer();

  		if(module.setUp) {
  			var t = module.db.transaction([module.tableName], READWRITE);

  			if(data[module.tableID] === "") {
  				t.objectStore(module.tableName).add(data);
  			} else {
  				t.objectStore(module.tableName).put(data);
  			}

  			t.oncomplete = function(event) {
  				module.deferred.resolve();
  			};
  		} else {
  			init().then(function() {
  				var t = module.db.transaction([module.tableName], READWRITE);

  				// verificar se "agency_id" existe, se sim "put", se não "add"
  				if(data[module.tableID] === "") {
  					t.objectStore(module.tableName).add(data);
  				} else {
  					t.objectStore(module.tableName).put(data);
  				}

  				t.oncomplete = function(event) {
  					module.deferred.resolve();
  				};
  			});
  		}

  		return module.deferred.promise;
  	}

  	function supportsIDB() {
  		return "indexedDB" in window;
  	}

  	function setupIDB(settings) {
  		module.deferred = $q.defer();
  		init(settings);
  		return module.deferred.promise;
  	}

  	return {
  		isSupported:isSupported,
  		deleteOS:deleteOS,
  		getOne:getOne,
  		getAll:getAll,
  		ready:ready,
  		saveOS:saveOS,
  		supportsIDB:supportsIDB,
  		setupIDB:setupIDB
  	};
  }]);
})();
