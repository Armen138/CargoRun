define("resources", ["events", "racket"], function(events, Racket) {
    if(window._GAME_RESOURCES_) {
        return window._GAME_RESOURCES_;
    }
    var meshLoader = null;
    var audio = /(wav$|mp3$|ogg$)/;
    var mesh = /(3d$|js$|json$)/;
    var resources = {
        loaded: 0,
        load: function(files) {
            resources.load.total = 0;
            resources.load.loaded = 0;
            function loaded(file) {
                resources.load.loaded++;
                resources.fire("progress", file);
                if(resources.load.loaded === resources.load.total) {
                    resources.fire("load");
                }
            }
            for(var file in files) {
                if(resources[file]) {
                    throw "naming conflict: cannot load resource named " + file;
                }
                var type = "image";
                console.log(file + " is audio: " + audio.test(files[file]));
                if(audio.test(files[file])) {
                    type = "audio";
                }
                if(mesh.test(files[file])) {
                    type = "mesh";
                }
                resources.load.total++;
                switch(type) {
                    case "audio": 
                        (function(file) {
                            resources[file] = Racket.create(files[file], function(success) {
                                if(!success) {
                                    console.log("failed to load: " + files[file]);
                                }
                                loaded(file);
                            });
                        }(file));                    
                    break;
                    case "mesh":
                        if(meshLoader === null) {
                            meshLoader = new THREE.JSONLoader();
                        }
                        (function(file) {
                            meshLoader.load(files[file], function(geometry) {
                                console.log("3d file loaded");
                                resources[file] = geometry;
                                loaded(file);
                            });                            
                        }(file));
                    break;
                    default:
                        var img = new Image();
                        (function(img, file){
                            img.onload = function() {
                                loaded(file);
                            };
                            img.onerror = function() {
                                //fail silently.
                                console.log("failed to load: " + files[file]);
                                loaded(file);
                            };
                        }(img, file));
                        img.src = files[file];
                        img.setAttribute("class", "resources");
                        img.setAttribute("name", file);                    
                        resources[file] = img;                    
                    break;
                }
            }
        }
    };

    // var domResources = document.querySelectorAll("img.resources");
    // for(var i = 0; i < domResources.length; i++) {
    //     resources[domResources[i].getAttribute("name")] = domResources[i];
    // }
    events.attach(resources);
    window._GAME_RESOURCES_ = resources;
    return resources;
});