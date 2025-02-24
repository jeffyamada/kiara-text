import useMousePosition from '@/hooks/useMousePosition';
import { Lightformer } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { Color, Depth, LayerMaterial } from 'lamina';
import { useControls } from 'leva';
import { useRef } from 'react';
import { BackSide } from 'three';

export default function Lightformers() {
  const sphereGroup = useRef(null);
  const frontGroupRef = useRef(null);
  const sidesGroupRef = useRef(null);
  const { size } = useThree();
  const { width: ww, height: wh } = size;

  useMousePosition((pointer) => {
    if (!frontGroupRef?.current) return;
    if (!sidesGroupRef?.current) return;

    gsap.to(frontGroupRef.current.rotation, {
      x: -pointer.x,
      y: pointer.y,
      duration: 1,
    });

    gsap.to(sphereGroup.current.rotation, {
      x: -pointer.x,
      y: pointer.y,
      duration: 1,
    });

    // console.log('pointer.x:', pointer.x)

    // sphereGroup.current.rotation.y = pointer.x * Math.PI;
    // sphereGroup.current.rotation.x = pointer.y * Math.PI;
  })

  const controls = useControls(
    'Lightformers',
    {
      sphereScale: {
        value: 2,
        min: 1,
        max: 6,
        step: 0.1,
      },
      sideIntensity: {
        value: 4,
        min: 0,
        max: 100,
      },
      cameraIntensity: {
        value: 12,
        min: 0,
        max: 100,
      },
    },
    // {
    //   render: () => false,
    // },
  );

  return (
    <>
      <group ref={sidesGroupRef}>
        {/* left side */}
        <Lightformer
          intensity={controls.sideIntensity}
          form="ring"
          color={0xffffff}
          position={[-ww / 2, 0, -ww / 4]}
          scale={[ww / 2, ww / 2, ww / 2]}
          target={[0, 0, ww / 2]}
        />
        {/* right side */}
        <Lightformer
          intensity={controls.sideIntensity}
          form="ring"
          color={0xffffff}
          position={[ww / 2, 0, -ww / 4]}
          scale={[ww / 2, ww / 2, ww / 2]}
          target={[0, 0, ww / 2]}
        />
      </group>
      {/* camera */}
      <group ref={frontGroupRef}>
        <Lightformer
          intensity={controls.cameraIntensity}
          form="ring"
          color={0xffffff}
          rotation-y={Math.PI}
          position={[0, 0, ww / 4]}
          scale={[ww / 10, ww / 10, 1]}
        />
      </group>
      <group ref={sphereGroup}>
        <mesh scale={controls.sphereScale} position={[0, 0, -10]}>
          <sphereGeometry args={[1, 64, 64]} />
          <LayerMaterial side={BackSide}>
            <Color color="#ffffff" alpha={1} mode="normal" />
            <Depth
              colorA={0xff0000}
              colorB={0xffffff}
              alpha={0.5}
              mode="normal"
              near={0}
              far={wh}
              origin={[100, 100, 100]}
            // visible={false}
            />
          </LayerMaterial>
        </mesh>
        <mesh scale={controls.sphereScale} position={[0, 0, 10]}>
          <sphereGeometry args={[2, 64, 64]} />
          <LayerMaterial side={BackSide}>
            <Color color="#ffffff" alpha={1} mode="normal" />
            <Depth
              colorA={0xff0000}
              colorB={0xffffff}
              alpha={0.5}
              mode="normal"
              near={0}
              far={wh}
              origin={[100, 100, 100]}
            // visible={false}
            />
          </LayerMaterial>
        </mesh>
      </group>
    </>
  );
}
