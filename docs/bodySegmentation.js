/* global XR8 */
/* global THREE */

import { SelfieSegmentation } from "@mediapipe/selfie_segmentation/selfie_segmentation.js";
import { setSegmentTexture } from "./customThreejsPipelineModule.js";

let selfieSegmentation, videoElement;
let processing = false;

export const bodySegmentationPipelineModule = () => {
  async function calcSegment () {
    if (selfieSegmentation == null) { return; }
    await selfieSegmentation.send({ image: videoElement[0] }).then(() => {
    }).catch(error => console.log(error));
  }

  return {
    name: "bodySegmentation",

    onStart: async ({ canvas, canvasWidth, canvasHeight }) => {
      videoElement = document.getElementsByTagName("video");
      // testCanvasElement = document.getElementById("testCanvas");
      // testCanvasCtx = testCanvasElement.getContext("2d");

      function onResults (results) {
        processing = false;
        setSegmentTexture(results.segmentationMask);
      }

      selfieSegmentation = new SelfieSegmentation({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
        },
      });
      selfieSegmentation.setOptions({
        modelSelection: 1,
      });
      selfieSegmentation.onResults(onResults);
    },

    onUpdate: () => {
      if (!processing) {
        processing = true;
        calcSegment();
      }

      // if (resultImg != null) {
      //   testCanvasCtx.clearRect(0, 0, testCanvasElement.width, testCanvasElement.height);
      //   testCanvasCtx.drawImage(resultImg.segmentationMask, 0, 0, testCanvasElement.width, testCanvasElement.height);
      // }
    },
  };
};
