import React,{useState} from 'react';
import Navigation from './Components/Navigation.js'
import ImageLinkForm from './Components/ImageLinkForm.js'
import FaceRecognition from './Components/FaceRecognition.js'
import Rank from './Components/Rank.js'
import Logo from './Components/Logo.js'
import './App.css';
import Particles from 'react-particles-js';
import SignIn from './Components/SignIn';
import Register from './Components/Register';

const particlesOptions={particles: {number: {value: 200,density: {enable: true,value_area: 800}}}}

const initialState={id:'',name:'',email:'',entries:0,joined:''}

function App() {
// class App extends Component{
  const [input,setInput]=useState("")
  const [imageURL,setimageURL]=useState("")
  const [box,setBox]=useState({})
  const [route, setRoute]=useState('signIn')
  const [signedIn,setSignedIn]=useState(false)
  const [user,setUser]=useState(initialState)

// console.log('bx',box)

  function loadUser(data){
    setUser({id:data.id,name:data.name,email:data.email,entries:data.entries,joined:data.joined})
  }

  function onInputChange(event){
    setInput(event.target.value)
    }  
   
  function onButtonSubmit () {
    setimageURL(input)

          fetch('http://localhost:3000/imageURL', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            input: input
            })
          })
      // app.models.predict(Clarifai.FACE_DETECT_MODEL,input)
          .then(respose=>respose.json())
          .then((response) => {  
            if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            id: user.id
            })
          })
            .then(response => response.json())
            .then(count => {
            //the Object.assign below alow you to change single item in an object
            //this is where the update rank of the message should happen.  looks like accepting the useState update, but doesn't happen on page??  if save here the screen then updates.  can't take any more time on this.  move on
              setUser(Object.assign(user,{entries: count}))
              // console.log('newEntresCountsb',count)
              // console.log('newEntresCountis',user.entries)
            })
            .catch(console.log)
        }
        setBox(calculateFaceLocation(response))    }
        )
    .catch(err=> console.log(err))
  }

  function onRouteChange(route){
    if(route==='signOut'){ 
        setSignedIn(false);
        setUser(initialState)
       }
    else if (route==='home'){ setSignedIn(true)  }

    // console.log(route)
     setRoute(route)
  }

  function calculateFaceLocation(data){
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputImage')
    // console.log('hw',image.height,image.width)
    // console.log('clarifai',clarifaiFace)
    return{
      top: clarifaiFace.top_row*Number(image.height),
      left: clarifaiFace.left_col *Number(image.width),
      bottom:Number(image.height)-(clarifaiFace.bottom_row*Number(image.height)),
      right: Number(image.width)-(clarifaiFace.right_col *Number(image.width))
      }
  }
  
  
  // console.log(route)
  
  
  
  return (
      <div className="App">
        <Particles className='particles' 
          params={particlesOptions} />
          <Navigation 
            onRouteChange={onRouteChange}
            isSignedIn={signedIn}
            />
        {route==='home'
          ? <div>
          <Logo />
          <Rank userName={user.name} userEntries={user.entries}  />
          <ImageLinkForm 
            onInputChange={onInputChange} 
            onButtonSubmit={onButtonSubmit}/>
          <FaceRecognition imageURL={imageURL} box={box} />
        </div>
        :(route==='signIn'
        ?<SignIn loadUser= {loadUser} onRouteChange={onRouteChange}/>
        :<Register onRouteChange={onRouteChange}/>
        )
        }
      </div>
    );
  }

export default App;
