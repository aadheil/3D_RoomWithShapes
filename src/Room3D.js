import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
// import { MeshStandardMaterial } from 'three';
import { OrbitControls ,useGLTF} from '@react-three/drei'; // Import OrbitControls
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import roomglb from './temp-room.glb'
function Room3D() {
  function Model() {
    const gltf = useGLTF(roomglb); // Replace with the actual path to your GLB model
    return <primitive object={gltf.scene} />;
  }
  
  const [isBoxshow,setisBoxshow]=useState(false)
  const [isSphereShow,setisSphereShow]=useState(false)
  const [isPlaneShapeShow,setisPlaneShapeShow]=useState(false)
  const [boxdir,setboxdir]=useState([-2,1,-2])

  const handleBoxShow=()=>{
    setisBoxshow(!isBoxshow)
    // setisSphereShow(false)
    // setisPlaneShapeShow(false)
  }

  const handleSphereShow=()=>{
    // setisBoxshow(false)
    setisSphereShow(!isSphereShow)
    // setisPlaneShapeShow(false)
  }

  const handlePlaneShapeShow=()=>{
    // setisBoxshow(false)
    // setisSphereShow(false)
    setisPlaneShapeShow(!isPlaneShapeShow)
  }
 var boxXnewDirX=boxdir[0]
 var boxnewYdir=boxdir[1]
 var boxnewZdir=boxdir[2]

//  increse Box X direction by 1
  const handleBoxXdir=()=>{
     boxXnewDirX=boxdir[0]+1
    setboxdir([boxXnewDirX,boxnewYdir,boxnewZdir])
    
  }

//  Decrease Box X direction by 1
  const handleBoxXdirReduce=()=>{
     boxXnewDirX=boxdir[0]-1
    setboxdir([boxXnewDirX,boxnewYdir,boxnewZdir])
    
  }

  //  increse Box Y direction by 1
  const handleBoxYdirYInc=()=>{
    boxnewYdir=boxdir[1]+1
    setboxdir([boxXnewDirX,boxnewYdir,boxnewZdir])
  }
  
  //  Decrease Box Y direction by 1
  const handleBoxYdirYDec=()=>{
    boxnewYdir=boxdir[1]-1
    setboxdir([boxXnewDirX,boxnewYdir,boxnewZdir])
  }

   //  increase Box Z direction by 1
   const handleBoxZdirInc=()=>{
    boxnewZdir=boxdir[2]+1
    setboxdir([boxXnewDirX,boxnewYdir,boxnewZdir])
  }

  //  increase Box Z direction by 1
  const handleBoxZdirDec=()=>{
    boxnewZdir=boxdir[2]-1
    setboxdir([boxXnewDirX,boxnewYdir,boxnewZdir])
  }


  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%'}}>
      <Canvas style={{height:'80vh',width:'100%',background:'lightblue'}}>
        <OrbitControls /> {/* Add OrbitControls to enable camera navigation */}
        {/* Load GLTF Model */}
      <Model />

        
         {/* Cube */}
        {isBoxshow&& <mesh position={boxdir}>
          <boxGeometry args={[2,2,2]} />
          <meshStandardMaterial color="red" />
        </mesh>}
      
        {/* Sphere */}
       {isSphereShow&& <mesh position={[-2, 1,0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="green" />
        </mesh>}
      
        {/* Plane */}
        {isPlaneShapeShow&&<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[8, 8]} />
          <meshStandardMaterial color="yellow" />
        </mesh>}
      
        <ambientLight intensity={0.1} />
        <directionalLight  position={[5, 5, 5]} />
        
      </Canvas>
      <div style={{display:'flex',flexDirection:'row',width:'100px',marginTop:'10px',height:'40px',width:'100%',justifyContent:'center'}}>
        <button onClick={handleBoxShow} style={{marginRight:'15px'}}>{!isBoxshow?'Add Box Geometry':'Remove Box Geometry'}</button>
        <button onClick={handleSphereShow} style={{marginRight:'15px'}}>{!isSphereShow?'Add Sphere Geometry':'Remove Sphere Geometry'}</button>
        <button onClick={handlePlaneShapeShow}>{!isPlaneShapeShow?'Add Plane Geometry':'Remove Plane Geometry'}</button>
      </div>
      <div style={{display:'flex',flexDirection:'row',width:'100px',marginTop:'10px',height:'40px',width:'100%',justifyContent:'center'}} >
        <div style={{display:'flex',flexDirection:'column'}}>
          {/* Change Box X Direction */}
          <div>
          <button style={{marginRight:'15px'}} onClick={handleBoxXdir}>Inc X Dir</button>
          <button onClick={handleBoxXdirReduce}>Dec X Dir</button>
          </div>

          {/* Change Box Y Direction */}
          <div style={{marginTop:'5px'}}>
          <button style={{marginRight:'15px'}} onClick={handleBoxYdirYInc}>Inc Y Dir</button>
          <button onClick={handleBoxYdirYDec}>Dec Y Dir</button>
          </div>

          {/* Change Box Z Direction */}
          <div style={{marginTop:'5px'}}>
          <button style={{marginRight:'15px'}} onClick={handleBoxZdirInc}>Inc Z Dir</button>
          <button onClick={handleBoxZdirDec}>Dec Z Dir</button>
          </div>
        </div>
        

        </div>

    </div>
  );
}

export default Room3D;

