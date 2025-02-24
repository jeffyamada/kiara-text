'use client'

import { Clone, useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { MeshStandardMaterial } from 'three';

export default function Letters(props) {
  const { nodes, scene } = useGLTF('/glb/letters.glb')
  const [updateTrigger, setUpdateTrigger] = useState(false); // Trigger a re-render

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshStandardMaterial({ color: 'hotpink', metalness: 0.5, roughness: 0.25 });
      }
    });

    setUpdateTrigger(prev => !prev);
  }, []);

  //   return letterNodes;
  // }, []);

  const letters = ["k", "i", "a", "r", "a"];

  const BaloonMaterial = () => <meshBasicMaterial color='hotpink' wireframe />

  // return <primitive object={scene} {...props} />
  return (
    // <Environment>
    // <Lightformer />
    <group key={updateTrigger} rotation={[Math.PI / 2, 0, 0]}>
      <Clone object={[nodes.k]} position={[-2, 0, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Clone>
      <Clone object={[nodes.i]} position={[-1, 0, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Clone>
      <Clone object={[nodes.a]} position={[0, 0, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Clone>
      <Clone object={[nodes.r]} position={[1, 0, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Clone>
      <Clone object={[nodes.a]} position={[2, 0, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Clone>
    </group>
    // </Environment >
  )

}

{/* <Lightformers /> */ }