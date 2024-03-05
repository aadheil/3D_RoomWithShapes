import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
// import { MeshStandardMaterial } from 'three';
import { OrbitControls, useGLTF } from '@react-three/drei'; // Import OrbitControls
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import roomglb from './temp-room2.glb'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Room3D() {
  function Model() {
    const gltf = useGLTF(roomglb); // Replace with the actual path to your GLB model
    return <primitive object={gltf.scene} />;
  }
  // const notify = () => toast.info("This is a toast notification !");

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
    var newCubeX=-2
    var newCubeY=1
    var newCubeZ=sphereZ+2
   if(newCubeZ>=roomMaxwidthX){
    newCubeZ=sphereZ-2
   }
   else{
    newCubeZ=sphereZ+2
   }

   setboxdir([newCubeX,newCubeY,newCubeZ])
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
      if ((boxnewZdir == sphereZ || boxnewZdir == (sphereZ - 1) || boxnewZdir == (sphereZ + 1)) && ((boxXnewDirX + 1) == (sphereX+1) || (boxXnewDirX + 1) == (sphereX-1) || (boxXnewDirX + 1) == sphereX)) {
        toast.warning("Action Declined Due To Overlap")
      }
      else if ((boxXnewDirX + 1) > roomMaxwidthX) {
        toast.warning("Action Declined Due to Exceeding Base Coordinations")
      }
      else {
        boxXnewDirX = boxdir[0] + 1;
        setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
      }
    }
    else if ((boxXnewDirX + 1) > roomMaxwidthX) {
      toast.warning("Action Declined Due to Exceeding Base Coordinations")
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
        (boxnewZdir === sphereZ || boxnewZdir === (sphereZ - 1) || boxnewZdir === (sphereZ + 1)) &&
        ((boxXnewDirX - 1) === (sphereX+1) || (boxXnewDirX - 1) === (sphereX-1) || (boxXnewDirX - 1) === sphereX)) {
          toast.warning("Action Declined Due To Overlap")
        }
      else if ((boxXnewDirX - 1) < roomMinwidthX) {
        toast.warning("Action Declined Due to Exceeding Base Coordinations")      }
      else {
        boxXnewDirX = boxdir[0] - 1;
        setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
      }
      
    }
    else if ((boxXnewDirX - 1) < roomMinwidthX) {
      toast.warning("Action Declined Due to Exceeding Base Coordinations")    }
    else {
      boxXnewDirX = boxdir[0] - 1;
      setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
    }
  };

  //  increase Box Z direction by 1
  const handleBoxZdirInc = () => {
    if(isSphereShow){
      if (
        ((boxnewZdir + 1) === sphereZ || (boxnewZdir + 1) === (sphereZ - 1) || (boxnewZdir + 1) === (sphereZ + 1)) &&
        (boxXnewDirX === (sphereX+1) || boxXnewDirX === (sphereX-1) || boxXnewDirX === sphereX)) {
          toast.warning("Action Declined Due To Overlap")
        }
      else if ((boxnewZdir + 1) > roomMaxwidthZ) {
        toast.warning("Action Declined Due to Exceeding Base Coordinations")      }
      else {
        boxnewZdir = boxdir[2] + 1;
        setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
      }
    }
    else if ((boxnewZdir + 1) > roomMaxwidthZ) {
      toast.warning("Action Declined Due to Exceeding Base Coordinations")    }
    else {
      boxnewZdir = boxdir[2] + 1;
      setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
    }
  };

  //  Decrease Box Z direction by 1
  const handleBoxZdirDec = () => {
   if(isSphereShow){
    if (
      ((boxnewZdir - 1) === sphereZ || (boxnewZdir - 1) === (sphereZ - 1) || (boxnewZdir - 1) === (sphereZ + 1)) &&
      (boxXnewDirX === (sphereX+1) || boxXnewDirX === (sphereX-1) || boxXnewDirX === sphereX)) {
        toast.warning("Action Declined Due To Overlap")
    }
    else if ((boxnewZdir - 1) < roomMinwidthZ) {
      toast.warning("Action Declined Due to Exceeding Base Coordinations")    }
    else {
      boxnewZdir = boxdir[2] - 1;
      setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
    }
   }
   else if ((boxnewZdir - 1) < roomMinwidthZ) {
    toast.warning("Action Declined Due to Exceeding Base Coordinations")  }
    else {
      boxnewZdir = boxdir[2] - 1;
      setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
    }
  };

  //  increse Sphere X direction by 1
  const handleSphereXdirInc = () => {
    if(isBoxshow){
      if (((boxnewZdir+1) == sphereZ || (boxnewZdir-1) == sphereZ  || boxnewZdir == sphereZ) && ((boxXnewDirX + 1) == (sphereX+1) || (boxXnewDirX - 1) == (sphereX+1) || boxXnewDirX == (sphereX+1))) {
        toast.warning("Action Declined Due To Overlap")
      }
      else if ((sphereX + 1) > roomMaxwidthX) {
        toast.warning("Action Declined Due to Exceeding Base Coordinations")      }
      else {
        sphereX = sphereDir[0] + 1;
        setsphereDir([sphereX, 1, sphereZ]);
      }
    }
    else if ((sphereX + 1) > roomMaxwidthX) {
      toast.warning("Action Declined Due to Exceeding Base Coordinations")    }
    else {
      sphereX = sphereDir[0] + 1;
      setsphereDir([sphereX, 1, sphereZ]);
    }
  }

  //  Decrease Sphere X direction by 1
  const handleSphereXdirDec = () => {
    if(isBoxshow){
      if (((boxnewZdir+1) == sphereZ || (boxnewZdir-1) == sphereZ  || boxnewZdir == sphereZ) && ((boxXnewDirX + 1) == (sphereX-1) || (boxXnewDirX - 1) == (sphereX-1) || boxXnewDirX == (sphereX-1))) {
        toast.warning("Action Declined Due To Overlap")
      }
      else if ((sphereX - 1) < roomMinwidthX) {
        toast.warning("Action Declined Due to Exceeding Base Coordinations")      }
      else {
        sphereX = sphereDir[0] - 1;
        setsphereDir([sphereX, 1, sphereZ]);
      }
    }
    else if ((sphereX - 1) < roomMinwidthX) {
      toast.warning("Action Declined Due to Exceeding Base Coordinations")    }
    else {
      sphereX = sphereDir[0] - 1;
      setsphereDir([sphereX, 1, sphereZ]);
    }
  }

  //  increase Sphere Z direction by 1
    const handleSphereZdirInc = () => {
      if(isBoxshow){
        if (
          ((boxnewZdir + 1) === (sphereZ+1) || (boxnewZdir - 1) === (sphereZ+1) || boxnewZdir === (sphereZ+1)) &&
          ((boxXnewDirX+1) === sphereX || (boxXnewDirX-1) === sphereX || boxXnewDirX === sphereX)) {
            toast.warning("Action Declined Due To Overlap")
          }
        else if ((sphereZ + 1) > roomMaxwidthZ) {
          toast.warning("Action Declined Due to Exceeding Base Coordinations")        }
        else {
          sphereZ = sphereDir[2] + 1;
          setsphereDir([sphereX, 1, sphereZ]);
        }
      }
      else if ((sphereZ + 1) > roomMaxwidthZ) {
        toast.warning("Action Declined Due to Exceeding Base Coordinations")      }
      else {
        sphereZ = sphereDir[2] + 1;
          setsphereDir([sphereX, 1, sphereZ]);
      }
    };

      //  decrease Sphere Z direction by 1
      const handleSphereZdirDec = () => {
        if(isBoxshow){
          if (
            ((boxnewZdir + 1) === (sphereZ-1) || (boxnewZdir - 1) === (sphereZ-1) || boxnewZdir === (sphereZ-1)) &&
            ((boxXnewDirX+1) === sphereX || (boxXnewDirX-1) === sphereX || boxXnewDirX === sphereX)) {
              toast.warning("Action Declined Due To Overlap")
            }
          else if ((sphereZ - 1) < roomMinwidthZ) {
            toast.warning("Action Declined Due to Exceeding Base Coordinations")          }
          else {
            sphereZ = sphereDir[2] - 1;
            setsphereDir([sphereX, 1, sphereZ]);
          }
        }
        else if ((sphereZ - 1) < roomMinwidthZ) {
          toast.warning("Action Declined Due to Exceeding Base Coordinations")        }
        else {
          sphereZ = sphereDir[2] - 1;
            setsphereDir([sphereX, 1, sphereZ]);
        }
      };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <ToastContainer autoClose={1500}/>
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

        {/* cube */}
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
         
         {/* sphere */}
         <div style={{ display: 'flex', flexDirection: 'column', width: '20%',marginLeft:'20px' }}>
          <div>
          <button onClick={handleSphereShow} style={{  width: '100%', height: '40px' }}>{!isSphereShow ? 'Add Sphere' : 'Remove Sphere'}</button>
          </div>

          {isSphereShow && <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
            <button style={{ width: '70px', height: '25px' }} onClick={handleSphereXdirDec}><i className="fa-solid fa-arrow-left fa-lg"></i></button>
            <button style={{ width: '70px', height: '25px' }} onClick={handleSphereXdirInc}><i className="fa-solid fa-arrow-right fa-lg"></i></button>
          </div>
          }
          {isSphereShow && <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
            <button style={{ width: '70px', height: '25px' }} onClick={handleSphereZdirInc}><i className="fa-solid fa-arrow-down fa-lg"></i></button>
            <button style={{ width: '70px', height: '25px' }} onClick={handleSphereZdirDec}> <i className="fa-solid fa-arrow-up fa-lg"></i></button>
          </div>}

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

