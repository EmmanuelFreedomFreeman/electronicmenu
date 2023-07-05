import React from 'react'
import Homescreen from './Homescreen'
import {RecoilRoot} from 'recoil';



function Home() {
  return (
    <RecoilRoot>
        <Homescreen />
    </RecoilRoot>
  )
}

export default Home