import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
// import { MeshStandardMaterial } from 'three';
import { OrbitControls, Stats, useGLTF } from '@react-three/drei'; // Import OrbitControls
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import roomglb from './temp-room2.glb'
// import furn1glb from './assets/sofa.glb'
import tableglbfile from './assets/plywood_coffee_table.glb'
import chairglbfile from './assets/old_wooden_chair.glb'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as THREE from 'three'
// import Draggable from 'react-draggable'; // Import react-draggable
var TableGlb
var chairGlb
function Room3D() {
  const[initialSizeTable,setinitialSizeTable]=useState()
  const[initialSizeChair,setinitialSizeChair]=useState()

  TableGlb = useGLTF(tableglbfile)
  chairGlb= useGLTF(chairglbfile)
  useEffect(() => {
    const modelObject = TableGlb.scene.children[0]; // Replace with your actual reference
    // Getting the bounding box of the object
    const boundingBox = new THREE.Box3().setFromObject(modelObject);
    // Getting the initial size (dimensions) of the bounding box
    const initialSize = new THREE.Vector3();
    boundingBox.getSize(initialSize);
    setinitialSizeTable(initialSize)
    console.log('Initial Size of the Object:', initialSize);

  
    const modelObjectChair = chairGlb.scene.children[0]; // Replace with your actual reference
    // Getting the bounding box of the object
    const boundingBoxChair = new THREE.Box3().setFromObject(modelObjectChair);
    // Getting the initial size (dimensions) of the bounding box
    const initialSizeChair = new THREE.Vector3();
    boundingBoxChair.getSize(initialSizeChair);
    setinitialSizeChair(initialSizeChair)
    console.log('Initial Size of the Chair Object:', initialSizeChair);


  }, [])
  function Model({ scale }) {

    // loading room
    const gltf = useGLTF(roomglb);


    //  cube shape tavle model
    TableGlb = useGLTF(tableglbfile)
    const meshTable = TableGlb.scene.children[0]; // Adjust the index if needed
    const positionTable = meshTable.position;
    // const roundedScale = Math.round(scale);
    var scalingX = 2 / initialSizeTable.x
    var scalingY = 2 / initialSizeTable.y
    var scalingZ = 2 / initialSizeTable.z
    meshTable.scale.set(scalingX, scalingY, scalingZ);
    meshTable.position.set(0, -1.2, 0);
    // Getting the position
    // Getting the bounding box
    const boundingBoxTable = new THREE.Box3();
    boundingBoxTable.setFromObject(meshTable);
    // Getting the size (dimensions) of the bounding box
    const sizeTable = new THREE.Vector3();
    boundingBoxTable.getSize(sizeTable);
    // console.log('Position chair:', positionChair);
    // console.log('Size chair:', sizeChair);
    // console.log('table', meshTable);




    // --------------------------------------------
   
     //  shape chair model
     chairGlb = useGLTF(chairglbfile)
     const meshChair = chairGlb.scene.children[0]; // Adjust the index if needed
     const positionChair = meshChair.position;
     // const roundedScale = Math.round(scale);
     var scalingXchair = 2 / initialSizeChair.x
     var scalingYchair = 4 / initialSizeChair.y
     var scalingZchair = 2 / initialSizeChair.z
     meshChair.scale.set(scalingXchair, scalingYchair, scalingZchair);
     meshChair.position.set(0, -1.2, 0);
     // Getting the position
     // Getting the bounding box
     const boundingBoxChair = new THREE.Box3();
     boundingBoxChair.setFromObject(meshTable);
     // Getting the size (dimensions) of the bounding box
     const sizeChair = new THREE.Vector3();
     boundingBoxChair.getSize(sizeChair);
     // console.log('Position chair:', positionChair);
     // console.log('Size chair:', sizeChair);
     // console.log('table', meshTable);


    return <>
      <primitive object={gltf.scene} />
      {/* <primitive object={furn1Gltf.scene} /> */}
    </>

      ;
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
    var newCubeX = -2
    var newCubeY = 1
    var newCubeZ = sphereZ + 2
    if (newCubeZ >= roomMaxwidthX) {
      newCubeZ = sphereZ - 2
    }
    else {
      newCubeZ = sphereZ + 2
    }

    setboxdir([newCubeX, newCubeY, newCubeZ])
    setisBoxshow(!isBoxshow)

  }

  const handleSphereShow = () => {
    var newSphereX = -2
    var newSphereY = 1
    var newSphereZ = boxnewZdir + 2
    if (newSphereZ >= roomMaxwidthX) {
      newSphereZ = boxnewZdir - 2
    }
    else {
      newSphereZ = boxnewZdir + 2
    }

    setsphereDir([newSphereX, newSphereY, newSphereZ])


    setisSphereShow(!isSphereShow)

  }

  const handlePlaneShapeShow = () => {
    setisPlaneShapeShow(!isPlaneShapeShow)
    console.log('Box', boxdir);
    console.log('Sphere',);
  }



  //  increse Box X direction by 1
  const handleBoxXdir = () => {
    if (isSphereShow) {
      if ((boxnewZdir == sphereZ || boxnewZdir == (sphereZ - 1) || boxnewZdir == (sphereZ + 1)) && ((boxXnewDirX + 1) == (sphereX + 1) || (boxXnewDirX + 1) == (sphereX - 1) || (boxXnewDirX + 1) == sphereX)) {
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
    if (isSphereShow) {
      if (
        (boxnewZdir === sphereZ || boxnewZdir === (sphereZ - 1) || boxnewZdir === (sphereZ + 1)) &&
        ((boxXnewDirX - 1) === (sphereX + 1) || (boxXnewDirX - 1) === (sphereX - 1) || (boxXnewDirX - 1) === sphereX)) {
        toast.warning("Action Declined Due To Overlap")
      }
      else if ((boxXnewDirX - 1) < roomMinwidthX) {
        toast.warning("Action Declined Due to Exceeding Base Coordinations")
      }
      else {
        boxXnewDirX = boxdir[0] - 1;
        setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
      }

    }
    else if ((boxXnewDirX - 1) < roomMinwidthX) {
      toast.warning("Action Declined Due to Exceeding Base Coordinations")
    }
    else {
      boxXnewDirX = boxdir[0] - 1;
      setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
    }
  };

  //  increase Box Z direction by 1
  const handleBoxZdirInc = () => {
    if (isSphereShow) {
      if (
        ((boxnewZdir + 1) === sphereZ || (boxnewZdir + 1) === (sphereZ - 1) || (boxnewZdir + 1) === (sphereZ + 1)) &&
        (boxXnewDirX === (sphereX + 1) || boxXnewDirX === (sphereX - 1) || boxXnewDirX === sphereX)) {
        toast.warning("Action Declined Due To Overlap")
      }
      else if ((boxnewZdir + 1) > roomMaxwidthZ) {
        toast.warning("Action Declined Due to Exceeding Base Coordinations")
      }
      else {
        boxnewZdir = boxdir[2] + 1;
        setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
      }
    }
    else if ((boxnewZdir + 1) > roomMaxwidthZ) {
      toast.warning("Action Declined Due to Exceeding Base Coordinations")
    }
    else {
      boxnewZdir = boxdir[2] + 1;
      setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
    }
  };

  //  Decrease Box Z direction by 1
  const handleBoxZdirDec = () => {
    if (isSphereShow) {
      if (
        ((boxnewZdir - 1) === sphereZ || (boxnewZdir - 1) === (sphereZ - 1) || (boxnewZdir - 1) === (sphereZ + 1)) &&
        (boxXnewDirX === (sphereX + 1) || boxXnewDirX === (sphereX - 1) || boxXnewDirX === sphereX)) {
        toast.warning("Action Declined Due To Overlap")
      }
      else if ((boxnewZdir - 1) < roomMinwidthZ) {
        toast.warning("Action Declined Due to Exceeding Base Coordinations")
      }
      else {
        boxnewZdir = boxdir[2] - 1;
        setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
      }
    }
    else if ((boxnewZdir - 1) < roomMinwidthZ) {
      toast.warning("Action Declined Due to Exceeding Base Coordinations")
    }
    else {
      boxnewZdir = boxdir[2] - 1;
      setboxdir([boxXnewDirX, boxnewYdir, boxnewZdir]);
    }
  };

  //  increse Sphere X direction by 1
  const handleSphereXdirInc = () => {
    if (isBoxshow) {
      if (((boxnewZdir + 1) == sphereZ || (boxnewZdir - 1) == sphereZ || boxnewZdir == sphereZ) && ((boxXnewDirX + 1) == (sphereX + 1) || (boxXnewDirX - 1) == (sphereX + 1) || boxXnewDirX == (sphereX + 1))) {
        toast.warning("Action Declined Due To Overlap")
      }
      else if ((sphereX + 1) > roomMaxwidthX) {
        toast.warning("Action Declined Due to Exceeding Base Coordinations")
      }
      else {
        sphereX = sphereDir[0] + 1;
        setsphereDir([sphereX, 1, sphereZ]);
      }
    }
    else if ((sphereX + 1) > roomMaxwidthX) {
      toast.warning("Action Declined Due to Exceeding Base Coordinations")
    }
    else {
      sphereX = sphereDir[0] + 1;
      setsphereDir([sphereX, 1, sphereZ]);
    }
  }

  //  Decrease Sphere X direction by 1
  const handleSphereXdirDec = () => {
    if (isBoxshow) {
      if (((boxnewZdir + 1) == sphereZ || (boxnewZdir - 1) == sphereZ || boxnewZdir == sphereZ) && ((boxXnewDirX + 1) == (sphereX - 1) || (boxXnewDirX - 1) == (sphereX - 1) || boxXnewDirX == (sphereX - 1))) {
        toast.warning("Action Declined Due To Overlap")
      }
      else if ((sphereX - 1) < roomMinwidthX) {
        toast.warning("Action Declined Due to Exceeding Base Coordinations")
      }
      else {
        sphereX = sphereDir[0] - 1;
        setsphereDir([sphereX, 1, sphereZ]);
      }
    }
    else if ((sphereX - 1) < roomMinwidthX) {
      toast.warning("Action Declined Due to Exceeding Base Coordinations")
    }
    else {
      sphereX = sphereDir[0] - 1;
      setsphereDir([sphereX, 1, sphereZ]);
    }
  }

  //  increase Sphere Z direction by 1
  const handleSphereZdirInc = () => {
    if (isBoxshow) {
      if (
        ((boxnewZdir + 1) === (sphereZ + 1) || (boxnewZdir - 1) === (sphereZ + 1) || boxnewZdir === (sphereZ + 1)) &&
        ((boxXnewDirX + 1) === sphereX || (boxXnewDirX - 1) === sphereX || boxXnewDirX === sphereX)) {
        toast.warning("Action Declined Due To Overlap")
      }
      else if ((sphereZ + 1) > roomMaxwidthZ) {
        toast.warning("Action Declined Due to Exceeding Base Coordinations")
      }
      else {
        sphereZ = sphereDir[2] + 1;
        setsphereDir([sphereX, 1, sphereZ]);
      }
    }
    else if ((sphereZ + 1) > roomMaxwidthZ) {
      toast.warning("Action Declined Due to Exceeding Base Coordinations")
    }
    else {
      sphereZ = sphereDir[2] + 1;
      setsphereDir([sphereX, 1, sphereZ]);
    }
  };

  //  decrease Sphere Z direction by 1
  const handleSphereZdirDec = () => {
    if (isBoxshow) {
      if (
        ((boxnewZdir + 1) === (sphereZ - 1) || (boxnewZdir - 1) === (sphereZ - 1) || boxnewZdir === (sphereZ - 1)) &&
        ((boxXnewDirX + 1) === sphereX || (boxXnewDirX - 1) === sphereX || boxXnewDirX === sphereX)) {
        toast.warning("Action Declined Due To Overlap")
      }
      else if ((sphereZ - 1) < roomMinwidthZ) {
        toast.warning("Action Declined Due to Exceeding Base Coordinations")
      }
      else {
        sphereZ = sphereDir[2] - 1;
        setsphereDir([sphereX, 1, sphereZ]);
      }
    }
    else if ((sphereZ - 1) < roomMinwidthZ) {
      toast.warning("Action Declined Due to Exceeding Base Coordinations")
    }
    else {
      sphereZ = sphereDir[2] - 1;
      setsphereDir([sphereX, 1, sphereZ]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <ToastContainer autoClose={1500} />
      <Canvas style={{ height: '80vh', width: '100%', background: 'lightblue' }}>
        <OrbitControls /> {/* Add OrbitControls to enable camera navigation */}
        {/* Load GLTF Model */}
        <Model scale={2} />


        {/* Cube */}
        {isBoxshow &&

          <mesh position={boxdir}>
            {/* <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="red" /> */}
            <primitive object={chairGlb.scene} />
          </mesh>
        }

        {/* Sphere */}
        {isSphereShow && <mesh position={sphereDir}>
          {/* <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="green" /> */}
          <primitive object={TableGlb.scene} />
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
        {/* <Stats/> */}

        {/* sphere */}
        <div style={{ display: 'flex', flexDirection: 'column', width: '20%', marginLeft: '20px' }}>
          <div>
            <button onClick={handleSphereShow} style={{ width: '100%', height: '40px' }}>{!isSphereShow ? 'Add Sphere' : 'Remove Sphere'}</button>
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

