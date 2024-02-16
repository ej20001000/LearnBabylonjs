import * as BABYLON from "babylonjs";


const canvas = document.getElementById("renderCanvas"); // get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D Engine

const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));

    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    // Load the sound and play it automatically once ready
    const music = new BABYLON.Sound("cello", "sounds/cellolong.wav", scene, null, { loop: true, autoplay: true });

    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 });
    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});

    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
    ground.material = groundMat; // Place the material property of the ground

    const roofMat = new BABYLON.StandardMaterial("roofMat");
    roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);

    const boxMat = new BABYLON.StandardMaterial("boxMat");
    boxMat.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-payground.com/textures/floor.png");

    roof.material = roofMat;
    box.material = boxMat;

    roof.scaling.x = 0.75;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;

    box.position.y = 0.5;

    // box.scaling.x = 2;
    // box.scaling.y = 1.5;
    // box.scaling.z = 3;

    // box.scaling = new BABYLON.Vector3(2, 1.5, 3);
    // box.position = new BABYLON.Vector3(-2, 4.2, 0.1);
    // box.rotation.y = BABYLON.Tools.ToRadians(45);

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