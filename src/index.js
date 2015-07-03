var FamousEngine = require('famous/core/FamousEngine');
var Mesh = require('famous/webgl-renderables/Mesh');
var Material = require('famous/webgl-materials/Material');
var Transitionable = require('famous/transitions/Transitionable');

var scene = FamousEngine.createScene('body');
FamousEngine.init();

var rootNode = scene.addChild();
rootNode.setAlign(0.5,0.5, 0);
rootNode.setOrigin(0.5, 0.5, 0);
rootNode.setMountPoint(0.5, 0.5, 0.5);

// Add a child node to add our mesh to.
var node = rootNode.addChild();
node.setAlign(0.5,0.5, 0);
node.setOrigin(0.5, 0.5, 0);
node.setMountPoint(0.5, 0.5, 0.5);

node.setSizeMode('absolute','absolute','absolute');
node.setAbsoluteSize(200,200,200);

// Start a Transitionable Rotation value
var transitionY = new Transitionable();
var milisecs = 10000;
var startAngle = Math.PI * 2 / milisecs;
function rotateY() {
  transitionY.from(startAngle).set(Math.PI * 2, { duration: milisecs }, rotateY);
}

// Pass child node into new Mesh component.
var mesh = new Mesh(node);

// Give the mesh a geometry.
mesh.setGeometry('Sphere', { detail: 100 });

mesh.setBaseColor(Material.image([], { texture: 'https://i.imgur.com/xn7lVCw.png' }));

// Add a spinner component to the 'node' that is called, every frame
var spinner = rootNode.addComponent({
  onUpdate: function(time) {
    if (!transitionY.isActive()) rotateY();
    rootNode.setRotation(0, transitionY.get(), 0);
    rootNode.requestUpdateOnNextTick(spinner);
  }
});

// Let the magic begin...
rootNode.requestUpdate(spinner);
