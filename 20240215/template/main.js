import * as BABYLON from "babylonjs";

const canvas = document.getElementById("renderCanvas"); // get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D Engine

const scene = createScene(); // Call the createScene function

// Register a render loop to repeatedly render the scene
engine.renRenderLoop(() => {
    scene.render();
})

// Watch for browser/canvas resize events
window.addEventListener("resize", () => {
    engine.resize();
});