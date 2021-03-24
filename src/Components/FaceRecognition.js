
import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL,box }) =>{
    // console.log(imageURL)
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
            {/* instructor forced width to 500 but if I do that, for some reason breaks the frame */}
            <img id='inputImage' src={imageURL} alt='' width='500px' height='auto'/> 
            <div className='bounding-box' style={{top: box.top,bottom: box.bottom,left: box.left,right: box.right}}></div>
            {/* <img src='https://samples.clarifai.com/face-det.jpg' alt=''/>  */}
            </div>
        </div>
        
    )
}

export default FaceRecognition;
