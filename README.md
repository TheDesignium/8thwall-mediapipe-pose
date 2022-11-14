# 8thwall-mediapipe

This repository runs segmentation and pose using mediapipe on 8thwall.

### segmentation

<img src="https://user-images.githubusercontent.com/65954422/200508401-796a7dd6-6b3c-4fe4-90ed-3dce5f6a4a9f.gif" height="500">

It is implemented with reference to here.

https://google.github.io/mediapipe/solutions/selfie_segmentation.html

<br><br>
### pose
<img src="https://user-images.githubusercontent.com/65954422/200509107-92e3959c-a40e-45d9-95a6-cde33491187a.gif" height="500">

It is implemented with reference to here.

https://google.github.io/mediapipe/solutions/pose.html
<br><br>

### how to use
change the comment out, bodySegmentationPipelineModule() & blazePoseDetectionPipelineModule()

>XR8.addCameraPipelineModules([<br>
>...<br>
>  bodySegmentationPipelineModule(),<br>
>  // blazePoseDetectionPipelineModule(),<br>
>]);<br>

<br><br>
install
`npm install`

watch
`npm run watch`

build
`npm run build`
