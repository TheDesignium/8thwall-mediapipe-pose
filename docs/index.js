// Copyright (c) 2018 8th Wall, Inc.
/* global XR8 */
/* global XRExtras */

import { customThreejsPipelineModule } from "./customThreejsPipelineModule.js";
import { initScenePipelineModule } from "./threejsSceneInit.js";
import { bodySegmentationPipelineModule } from "./bodySegmentation.js";
import { blazePoseDetectionPipelineModule } from "./blazePoseDetection.js";

const onxrloaded = () => {
  const canvas = document.getElementById("camerafeed");
  canvas.getContext("webgl");

  XR8.addCameraPipelineModules([
    XR8.GlTextureRenderer.pipelineModule(), // Draws the camera feed.
    XR8.Threejs.pipelineModule(), // Creates a ThreeJS AR Scene.
    // customThreejsPipelineModule(),
    XR8.XrController.pipelineModule(), // Enables SLAM tracking.
    XRExtras.AlmostThere.pipelineModule(), // Detects unsupported browsers and gives hints.
    XRExtras.RuntimeError.pipelineModule(), // Shows an error image on runtime error.
    XRExtras.FullWindowCanvas.pipelineModule(),
    XR8.CameraPixelArray.pipelineModule(),
    // XRExtras.Loading.pipelineModule(),
    initScenePipelineModule(),
    // bodySegmentationPipelineModule(),
    blazePoseDetectionPipelineModule(),
  ]);

  // Open the camera and start running the camera run loop.
  XR8.run({ canvas });
};

window.onload = () => {
  window.XR ? onxrloaded() : window.addEventListener("xrloaded", onxrloaded);
};
