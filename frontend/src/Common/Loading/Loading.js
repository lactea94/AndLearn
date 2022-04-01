import { useEffect, useState } from "react"
import './Loading.css'

export default function Loading()  {
  const [image, setImage] = useState(true);
  const [load, setLoad] = useState(0);

  useEffect(() => {
    const imageTimer = setTimeout(() => {
      setImage(!image)
    }, 500)
    return () => clearTimeout(imageTimer)
  }, [image])

  useEffect(() => {
    const wordTimer = setTimeout(function() {
      if (load < 3) {
        setLoad(load + 1)
      } else {
        setLoad(0)
      }
    }, 500)
    return () => clearTimeout(wordTimer)
  }, [load])

  const Image = () => {
    if (image) {
      return (
        <img src="/images/allu-1.png" alt="allu-1.png" style={{marginTop: '10rem'}}/>
      )
    } else {
      return (
        <img src="/images/allu-2.png" alt="allu-2.png" style={{marginTop: '10rem'}}/>
      )
    }}
  
  const Load = () => {
    if (load === 0) {
      return (
        <h1 style={{fontFamily: 'Maru Buri'}}>Loading</h1>
      )
    } else if (load === 1) {
      return (
        <h1 style={{fontFamily: 'Maru Buri'}}>Loading .</h1>
      )
    } else if (load === 2) {
      return (
        <h1 style={{fontFamily: 'Maru Buri'}}>Loading ..</h1>
      )
    } else {
      return (
        <h1 style={{fontFamily: 'Maru Buri'}}>Loading ...</h1>
      )
    }
  }

  return (
    <div>
      {Image()}
      {Load()}
    </div>
  )
}
