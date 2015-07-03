'use strict';

var FamousEngine = require('famous/core/FamousEngine');
var Mesh = require('famous/webgl-renderables/Mesh');

// Create the scene based on a selector.

var scene = FamousEngine.createScene('body');

// Initialize the engine.

FamousEngine.init();

// App Code
// var App = require('./js/App');


function App(scene) {

    // Add a child node to add our mesh to.

    var child = scene.addChild();

    // Pass child node into new Mesh component.

    var mesh = new Mesh(child);

    // Give the mesh a geometry.

    mesh.setGeometry('Sphere');

    // Give the mesh a geometry.
  // mesh.setGeometry('Circle', { detail: 100 });

  mesh.setBaseColor(Material.image([], {
    texture: 'https://i.imgur.com/xn7lVCw.jpg'
  }));

}

var app = new App(scene);

module.exports = App;

// Famous dependencies
// var math = require('famous/math');
// var physics = require('famous/physics');

// var world = new physics.PhysicsEngine(options);

// var Sphere = physics.Sphere;
// var mySphere = new Sphere({mass: 10, radius: 25});

// world.add(mySphere);
