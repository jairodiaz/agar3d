var famous = require('famous');

var FamousEngine = famous.core.FamousEngine;
var Node = famous.core.Node;
var Mesh = famous.webglRenderables.Mesh;
var Material = famous.webglMaterials.Material;
var Color = famous.utilities.Color;
var Position = famous.components.Position;
// var Sphere = famous.webglGeometries.Sphere;
var Sphere = famous.webglGeometries.GeodesicSphere;
var Transitionable = famous.transitions.Transitionable;
var PointLight = famous.webglRenderables.PointLight;
var Camera = famous.components.Camera;

var material = Material.image([], { texture: 'https://i.imgur.com/xn7lVCw.png' });
var sphere = new Sphere({ detail: 3 });

var scene = FamousEngine.createScene('body');
FamousEngine.init();

function Ball(node, options) {
  this.node = node;
  this.node
    .setAlign(0.5, 0.5, 0.5)
    .setOrigin(0.5, 0.5, 0.5)
    .setMountPoint(0.5, 0.5, 0.5)
    .setSizeMode('absolute', 'absolute', 'absolute')
    .setAbsoluteSize(200, 200, 200);

  // Give each ball a different depth
  this.node.setPosition(null, null, -Math.random() * 1000);


  // Pass child node into new Mesh component.
  this.mesh = new Mesh(this.node);
  // Give the mesh a geometry.
  this.mesh.setGeometry(sphere);

  this.position = new Position(this.node);
  this.id = this.node.addComponent(this);

  if (!options) options = {};
  this.rotationSpeed = options.rotationSpeed || 600;

  // Let the magic begin...
  this.node.requestUpdate(this.id);

  // Use a material
  this.mesh.setBaseColor(material);

  // Use a color
  // this.color = new Color([Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)])
  // this.mesh.setBaseColor(this.color);
  // this.updateColor();
}

// Add a spinner component to the 'node' that is called, every frame
Ball.prototype.onUpdate = function(time) {
  this.node.setRotation(0, time / this.rotationSpeed, 0);
  this.node.requestUpdateOnNextTick(this.id);
};

Ball.prototype.move = function(x, y, options) {
  this.position.halt();
  this.position.set(x, y, null, options);
};

// Set a random color on the sphere
Ball.prototype.updateColor = function() {
  this.color.set([Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)], { duration: 3000 });
  setTimeout(function() {
    this.updateColor();
  }.bind(this), 6000);
}

function Main() {
  this.camera = new Camera(scene);
  this.camera.setDepth(2000);

  this.rootNode = scene.addChild();
  this.rootNode
    .setAlign(0,0, 0)
    .setOrigin(0.5, 0.5, 0.5)
    .setMountPoint(0.5, 0.5, 0.5);

  this.lightNode = this.rootNode.addChild();
  this.light = new PointLight(this.lightNode);
  this.lightColor = new Color('#ffffff');
  this.light.setColor(this.lightColor);
  this.lightNode.setPosition(-5000, 0, 5000);

  this.balls = [];
  this.init();
}

Main.prototype.init = function() {
  // Add a child node to add our mesh to.
  for (var i = 0; i < 5; i++) {
    this.balls.push(new Ball(this.rootNode.addChild()));
  }
}

var main = new Main();

document.addEventListener('mousemove', function (e) {
  for (var i = 0; i < main.balls.length; i++) {
    main.balls[i].move(e.pageX, e.pageY, { duration: 60 });
  }
});

