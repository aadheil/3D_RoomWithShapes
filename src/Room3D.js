import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
// import { MeshStandardMaterial } from 'three';
import { OrbitControls, useGLTF } from '@react-three/drei'; // Import OrbitControls
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import roomglb from './temp-room2.glb'
function Room3D() {
  function Model() {
    const gltf = useGLTF(roomglb); // Replace with the actual path to your GLB model
    return <primitive object={gltf.scene} />;
  }

  const [isBoxshow, setisBoxshow] = useState(false)
  const [isSphereShow, setisSphereShow] = useState(false)
  const [isPlaneShapeShow, setisPlaneShapeShow] = useState(false)
  const [boxdir, setboxdir] = useState([-2, 1, -2])
  const [sphereDir, setsphereDir] = useState([-2, 1, 0])


  var boxXnewDirX = boxdir[0]
  var boxnewYdir = boxdir[1]
  var boxnewZdir = boxdir[2]
  var sphereZ = sphereDir[2]
  var sphereX = sphereDir[0]
  var roomMaxwidthX = 2
  var roomMinwidthX = -2
  var roomMaxwidthZ = 3
  var roomMinwidthZ = -2

  const handleBoxShow = () => {
    setisBoxshow(!isBoxshow)

  }

  const handleSphereShow = () => {
    var newSphereX=-2
    var newSphereY=1
    var newSphereZ=boxnewZdir+2
   if(newSphereZ>=roomMaxwidthX){
    newSphereZ=boxnewZdir-2
   }
   else{
    newSphereZ=boxnewZdir+2
   }
    
    setsphereDir([newSphereX,newSphereY,newSphereZ])


    setisSphereShow(!isSphereShow)

  }

  const handlePlaneShapeShow = () => {
    setisPlaneShapeShow(!isPlaneShapeShow)
    console.log('Box',boxdir);
    console.log('Sphere',);
  }
 


  //  increse Box X direction by 1
  const handleBoxXdir = () => {
    if(isSphereShow){
      if ((boxnewZdir == sphereZ || boxnewZdir == (sphereZ - 1) || boxnewZdir == (sphereZ + 1)) && ((boxXnewDirX + 1) == -2 || (boxXnewDirX + 1) == -1 || (boxXnewDirX + 1) == -3)) {
        alert("Action Declined Due to Overlap")
      }
      else if ((boxXnewDirX + 1) > roomMaxwidthX) {
        alert("Action Declined Due to Exceeding Base Coordinations")
      }
      else {
        boxXnewDirX = boxdir[0] + 1;
        setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
      }
    }
    else if ((boxXnewDirX + 1) > roomMaxwidthX) {
      alert("Action Declined Due to Exceeding Base Coordinations")
    }
    else {
      boxXnewDirX = boxdir[0] + 1
      setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir])
    }
  }

  //  Decrease Box X direction by 1
  const handleBoxXdirReduce = () => {
    if(isSphereShow){
      if (
        (boxnewZdir === sphereZ || boxnewZdir === sphereZ - 1 || boxnewZdir === sphereZ + 1) &&
        ((boxXnewDirX - 1) === -2 || (boxXnewDirX - 1) === -1 || (boxXnewDirX - 1) === -3)) {
        alert('Action Declined Due to Overlap');
      }
      else if ((boxXnewDirX - 1) < roomMinwidthX) {
        alert("Action Declined Due to Exceeding Base Coordinations")
      }
      else {
        boxXnewDirX = boxdir[0] - 1;
        setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
      }
      
    }
    else if ((boxXnewDirX - 1) < roomMinwidthX) {
      alert("Action Declined Due to Exceeding Base Coordinations")
    }
    else {
      boxXnewDirX = boxdir[0] - 1;
      setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
    }
  };


  //  increase Box Z direction by 1

  const handleBoxZdirInc = () => {
    if(isSphereShow){
      if (
        ((boxnewZdir + 1) === sphereZ || (boxnewZdir + 1) === sphereZ - 1 || (boxnewZdir + 1) === sphereZ + 1) &&
        (boxXnewDirX === -2 || boxXnewDirX === -1 || boxXnewDirX === -3)) {
        alert('Action Declined Due to Overlap');
      }
      else if ((boxnewZdir + 1) > roomMaxwidthZ) {
        alert("Action Declined Due to Exceeding Base Coordinations")
      }
      else {
        boxnewZdir = boxdir[2] + 1;
        setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
      }
    }
    else if ((boxnewZdir + 1) > roomMaxwidthZ) {
      alert("Action Declined Due to Exceeding Base Coordinations")
    }
    else {
      boxnewZdir = boxdir[2] + 1;
      setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
    }
  };

  //  Decrease Box Z direction by 1
  const handleBoxZdirDec = () => {
   if(isSphereShow){
    if (
      ((boxnewZdir - 1) === sphereZ || (boxnewZdir - 1) === sphereZ - 1 || (boxnewZdir - 1) === sphereZ + 1) &&
      (boxXnewDirX === -2 || boxXnewDirX === -1 || boxXnewDirX === -3)) {
      alert('Action Declined Due to Overlap');
    }
    else if ((boxnewZdir - 1) < roomMinwidthZ) {
      alert("Action Declined Due to Exceeding Base Coordinations")
    }
    else {
      boxnewZdir = boxdir[2] - 1;
      setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
    }
   }
   else if ((boxnewZdir - 1) < roomMinwidthZ) {
    alert("Action Declined Due to Exceeding Base Coordinations")
  }
    else {
      boxnewZdir = boxdir[2] - 1;
      setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
    }
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <Canvas style={{ height: '80vh', width: '100%', background: 'lightblue' }}>
        <OrbitControls /> {/* Add OrbitControls to enable camera navigation */}
        {/* Load GLTF Model */}
        <Model />


        {/* Cube */}
        {isBoxshow && <mesh position={boxdir}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="red" />
        </mesh>}

        {/* Sphere */}
        {isSphereShow && <mesh position={sphereDir}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="green" />
        </mesh>}

        {/* Plane */}
        {isPlaneShapeShow && <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[8, 8]} />
          <meshStandardMaterial color="yellow" />
        </mesh>}

        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} />

      </Canvas>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', height: '40px', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '20%' }}>
          <div>
            <button onClick={handleBoxShow} style={{ width: '100%', height: '40px' }}>{!isBoxshow ? 'Add Cube' : 'Remove Cube'}</button>
          </div>

          {isBoxshow && <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
            <button style={{ width: '70px', height: '25px' }} onClick={handleBoxXdirReduce}><i className="fa-solid fa-arrow-left fa-lg"></i></button>
            <button style={{ width: '70px', height: '25px' }} onClick={handleBoxXdir}><i className="fa-solid fa-arrow-right fa-lg"></i></button>
          </div>
          }
          {isBoxshow && <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
            <button style={{ width: '70px', height: '25px' }} onClick={handleBoxZdirInc}><i className="fa-solid fa-arrow-down fa-lg"></i></button>
            <button style={{ width: '70px', height: '25px' }} onClick={handleBoxZdirDec}> <i className="fa-solid fa-arrow-up fa-lg"></i></button>
          </div>}

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '20%' }}>
          <button onClick={handleSphereShow} style={{ marginLeft: '20px', width: '100%', height: '40px' }}>{!isSphereShow ? 'Add Sphere' : 'Remove Sphere'}</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '20%' }}>
          <button style={{ marginLeft: '40px', width: '100%', height: '40px' }} onClick={handlePlaneShapeShow}>{!isPlaneShapeShow ? 'Add Plane' : 'Remove Plane'}</button>
        </div>

      </div>
      {/* <div style={{display:'flex',flexDirection:'row',width:'100px',marginTop:'10px',height:'40px',width:'100%',justifyContent:'center'}} > */}
      {/* <div style={{display:'flex',flexDirection:'column'}}> */}
      {/* Change Box X Direction */}




      {/* </div> */}


      {/* </div> */}

    </div>
  );
}

export default Room3D;

