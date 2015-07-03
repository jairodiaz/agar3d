var famous = require('famous');

var FamousEngine = famous.core.FamousEngine;
var Mesh = famous.webglRenderables.Mesh;
var Material = famous.webglMaterials.Material;
var Position = famous.components.Position;
var Transitionable = famous.transitions.Transitionable;

var scene = FamousEngine.createScene('body');
FamousEngine.init();

var rootNode = scene.addChild();
rootNode
  .setAlign(0,0, 0)
  .setOrigin(0.5, 0.5, 0.5)
  .setMountPoint(0.5, 0.5, 0.5);

// Add a child node to add our mesh to.
var node = rootNode.addChild();
node.setAlign(0.5, 0.5, 0.5);
node.setOrigin(0.5, 0.5, 0.5);
node.setMountPoint(0.5, 0.5, 0.5);
var nodePosition = new Position(node);

node.setSizeMode('absolute','absolute','absolute');
node.setAbsoluteSize(200,200,200);

// Start a Transitionable Rotation value
// var transition = new Transitionable([0, 0]);
// var milisecs = 10000;
// var startAngle = Math.PI * 2 / milisecs;
// function rotateY() {
//   transitionY.from(startAngle).set(Math.PI * 2, { duration: milisecs }, rotateY);
// }

// Pass child node into new Mesh component.
var mesh = new Mesh(node);

// Give the mesh a geometry.
mesh.setGeometry('Sphere', { detail: 100 });

mesh.setBaseColor(Material.image([], { texture: 'https://i.imgur.com/xn7lVCw.png' }));

document.addEventListener('mousemove', function (e) {
  nodePosition.halt();
  nodePosition.set(e.pageX, e.pageY, null, { duration: 400 });
    // grav.anchor.set(e.pageX, e.pageY);
    // node.setAlign(0, 0, 0);
});

var angle = Math.PI / 200;
var rot = 0;
var cir = Math.PI * 2;
// Add a spinner component to the 'node' that is called, every frame
var spinner = node.addComponent({
  onUpdate: function(time) {
    // if (!transitionY.isActive()) rotateY();
    rot+=angle;
    if (rot >= cir) {
      rot = 0;
    }
    node.setRotation(0, rot, 0);
    node.requestUpdateOnNextTick(spinner);
  }
});


// Let the magic begin...
node.requestUpdate(spinner);
