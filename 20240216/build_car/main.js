import * as BABYLON from "babylonjs";
import earcut from 'earcut';

const canvas = document.getElementById("renderCanvas"); // get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D Engine

const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));

    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    const car = makeCar(scene);
    const wheels = makeWheels(car);

    return scene;
}

const makeCar = (scene) => {
    // base
    const outline = [
        new BABYLON.Vector3(-0.3, 0, -0.1),
        new BABYLON.Vector3(0.2, 0, -0.1)
    ];

    // curved front
    for(let i = 0; i < 20; i++) {
        outline.push(new BABYLON.Vector3(0.2 * Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1));
    }

    // top
    outline.push(new BABYLON.Vector3(0, 0, 0.1));
    outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));

    return BABYLON.MeshBuilder.ExtrudePolygon("car", { shape: outline, depth: 0.2 }, scene, earcut);
}

const makeWheels = (car) => {
    const wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", { diameter: 0.125, height: 0.05 });
    wheelRB.parent = car;
    wheelRB.position.set(-0.2, 0.035, -0.1);

    const wheelRF = wheelRB.clone("wheelRF");
    wheelRF.position.x = 0.1;

    const wheelLB = wheelRB.clone("wheelLB");
    wheelLB.position.y = -0.2 - 0.035;

    const wheelLF = wheelRF.clone("wheelLF");
    wheelLF.position.y = -0.2 - 0.035;

    const wheelArr = [];

    wheelArr.push(wheelLB);
    wheelArr.push(wheelLF);
    wheelArr.push(wheelRB);
    wheelArr.push(wheelRF);

    return wheelArr;
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