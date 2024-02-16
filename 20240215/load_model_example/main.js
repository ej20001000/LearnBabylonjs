import * as BABYLON from "babylonjs";

const canvas = document.getElementById("renderCanvas"); // get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D Engine

const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "box.babylon");

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));

    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    return scene;
}

const scene = createScene(); // Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(() => {
    scene.render();
})

// Watch for browser/canvas resize events
window.addEventListener("resize", () => {
    engine.resize();
});