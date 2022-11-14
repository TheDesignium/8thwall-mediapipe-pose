/* global XR8 */
/* global THREE */
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

let objectParts, model;

export const setbodyPos = (parts) => {
  objectParts = parts;
  // console.log(objectParts);
};

export const initScenePipelineModule = () => {
  return {
    name: "threejsinitscene",

    onStart: ({ canvas, canvasWidth, canvasHeight }) => {
      const { scene, camera } = XR8.Threejs.xrScene();

      const alight = new THREE.AmbientLight(0xFFFFFF, 0.4);
      scene.add(alight);
      const dlight = new THREE.DirectionalLight(0xFFFFFF, 1);
      scene.add(dlight);

      XR8.XrController.updateCameraProjectionMatrix({
        origin: camera.position,
        facing: camera.quaternion,
      });

      // glb
      // const loader = new GLTFLoader();
      // loader.load("./Assets/Kobbito_Idle.glb",
      //   function (gltf) {
      //     model = gltf.scene;
      //     model.position.set(0, 0, -4);
      //     const mat = new THREE.MeshPhongMaterial({
      //       color: 0xffffff,
      //       skinning: true,
      //     });
      //     console.log(gltf.scene.children[1]);
      //     model.traverse((object) => { // モデルの構成要素をforEach的に走査
      //       if (object.isMesh) { // その構成要素がメッシュだったら
      //         object.material = mat;
      //       }
      //     });
      //     scene.add(model);
      //   },
      // );

      // fbx
      const loader = new FBXLoader();
      loader.load("./Assets/human.fbx", (obj) => {
        const mat = new THREE.MeshStandardMaterial({
          color: 0x0fffff,
          skinning: true,
        });

        obj.traverse((child) => {
          if (child.isMesh) {
            child.material = mat;
          }
        });
        const scale = 0.01;
        obj.scale.set(scale, scale, scale);
        obj.position.set(0, 0, -4);
        console.log(obj);
        model = obj;
        scene.add(model);
      });
    },

    onUpdate: () => {
      if (model != null && objectParts != null) {
        const offset = 10;
        model.children[0].traverse(function (obj) {
          if (obj.name === "mixamorigLeftArm") {
            obj.position.set(objectParts[11].x * offset, objectParts[11].y * offset, objectParts[11].z * offset);
            const parent = obj.parent;

            const dir = new THREE.Vector4(0, 0, 1, 0);
            console.log(dir.applyMatrix4(parent.matrixWorld).normalize());
          }
        });
      }
    },
  };
};
