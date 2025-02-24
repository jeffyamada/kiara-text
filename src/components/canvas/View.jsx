'use client'

import { Three } from '@/helpers/components/Three'
import { Environment, PerspectiveCamera, PresentationControls, View as ViewImpl } from '@react-three/drei'
import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import Lightformers from './Lightformers'

export const Common = ({ color }) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    <ambientLight />
    <pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
    <pointLight position={[-10, -10, -10]} color='blue' decay={0.2} />
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
  </Suspense>
)

const View = forwardRef(({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          <Environment intensity={0.5} rotation={[Math.PI / 4, 0, 0]} frames={Infinity}>
            <Lightformers />
          </Environment>
          <PresentationControls
            global
            speed={2}
            cursor
            azimuth={[-Infinity, Infinity]}
            polar={[-Infinity, Infinity]}> {children}</PresentationControls>
          {/* {orbit && <OrbitControls />} */}
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }
