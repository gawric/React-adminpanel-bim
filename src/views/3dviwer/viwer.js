import React, { lazy , useState , useRef } from 'react'

import { AmbientLight, AxesHelper, DirectionalLight, GridHelper, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Raycaster, Vector2 } from "three";


import {
  CCard,
  CCardBody,
  CHeaderBrand, 
  CCol,
  CFormLabel,
  CFormInput,
  CButton,
  CListGroup,
  CListGroupItem,
  CRow,
  CPaginationItem,
  CPagination,
  CAlert,
  CCardHeader,
} from '@coreui/react'
import { render } from 'enzyme/build';




const viwer = () => {

  

  const scene = new Scene();

  //Object to store the size of the viewport
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};


//Creates the camera (point of view of the user)
const aspect = size.width / size.height;
const camera = new PerspectiveCamera(75, aspect);
camera.position.z = 15;
camera.position.y = 13;
camera.position.x = 8;

const lightColor = 0xffffff;

const ambientLight = new AmbientLight(lightColor, 0.5);
scene.add(ambientLight);

const directionalLight = new DirectionalLight(lightColor, 1);
directionalLight.position.set(0, 10, 0);
directionalLight.target.position.set(-5, 0, 0);
scene.add(directionalLight);
scene.add(directionalLight.target);


//Sets up the renderer, fetching the canvas of the HTML
const threeCanvas = document.getElementById("three-canvas");
//const renderer = new WebGLRenderer({
  //canvas: threeCanvas,
 // alpha: true,
//});
const renderer = new WebGLRenderer();
renderer.threeCanvas = threeCanvas;
renderer.setClearAlpha(true);
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//Creates grids and axes in the scene
const grid = new GridHelper(50, 30);
scene.add(grid);


const axes = new AxesHelper();
axes.material.depthTest = false;
axes.renderOrder = 1;
scene.add(axes);

//Creates the orbit controls (to navigate the scene)
//const controls = new OrbitControls();
//camera, threeCanvas
//controls.threeCanvas = threeCanvas;
//controls.camera = camera;
//controls.enableDamping = true;
//controls.target.set(-2, 0, 0);

//Animation loop
const animate = () => {
  //controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();
document.body.appendChild( renderer.domElement );

  return (
    <>
    <canvas id="three-canvas"></canvas>
    <b>Hello World</b>
    </>
  )
}




export default viwer