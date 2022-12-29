import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Lottie from 'react-lottie-player'
import lottieJson from '../public/loading.json'
import Logo from '../public/bg.jpeg'
import { saveAs } from 'file-saver';
function App() {
  const [isloading,setIsloading]=useState(false)
  const [modalOpen,setModalOpen]=useState(true)
  const [prompt,setPrompt]=useState('')
  const [data,setData]=useState([])
  
  return (
    <div className="App">
     <div className='glass'>
      <h1>Generate images for your whatsapp status, logo and lots more</h1>
      <input onChange={(e)=>{
        setPrompt(e.currentTarget.value)
      }} placeholder='Type anything to generate images' type='text'/>
      <div onClick={()=>{
       if (!prompt) {
      alert('Field cant be empty!!!!')
      return
       }
      setIsloading(true)
      const bodyData={
        prompt,
        number:2
      }

      fetch(`https://holy-thunder-1329.fly.dev/generate`,{
                        method:'POST',
                        headers:{
                          "Content-Type":'application/json'
                        },
                        body:JSON.stringify(bodyData)
                      
             })
      .then(res=>{
        res.json()
        .then(data=>{
          setIsloading(false)
          setData(data.img)
          setModalOpen(false)
          console.log(data)
        })
        .catch(err=>{
          alert('something went wrong')
          setIsloading(false)
        })
      })
      .catch(err=>{
        alert('something went wrong')
        setIsloading(false)
      })
        
      }} className='button'>
        <span>Generate</span>
      </div>
     </div>
     <div 
     style={{
      opacity:isloading?1:0,
      pointerEvents:isloading?'fill':'none'
     }}
     className='loading'>
     <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: 150, height: 150 }}
    />
     </div>


     <div style={{
      transform:modalOpen?"translateY(-1000px)":"translateY(0px)"
     }} className='images'>
      <span onClick={()=>{
        setModalOpen(true)
        setData([])
      }}>X</span>
      <h2>Generated images</h2>
      <div className='mainImage'>
      {
        data.length>0&&
        (
         data.map((dt,ind)=>(
      <div key={ind.toString()} className='image'>
      <img src={dt.url} alt='img'/>
      <a download  href={dt.url}>Click here to download</a>
      </div>
         ))
        )
      }
      </div>
     
      
      
     </div>
    </div>
  )
}

export default App
