import React from 'react'
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar'
import Rightsidebar from '../../Comnponent/Rightsidebar/Rightsidebar'
import Homemainbar from '../../Comnponent/Homemainbar/Homemainbar'
import '../../App.css'
const Question = ({slidein}) => {
  return (
    <div className="home-container-1">
      <Leftsidebar slidein={slidein}/>
      <div className="home-container-2">
        <Homemainbar/>
        <Rightsidebar/>
      </div>
    </div>
  )
}

export default Question