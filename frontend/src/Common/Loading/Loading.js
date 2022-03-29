import { useState } from "react"

export default function Loading()  {
  const [image, setImage] = useState(true);
  const [load, setLoad] = useState(0);

  setTimeout(function() {
    setImage(!image)
  }, 500);

  setTimeout(function() {
    if (load < 3) {
      setLoad(load + 1)
    } else {
      setLoad(0)
    }
  }, 500);

  const Image = () => {
    if (image) {
      return (
        <img src="/images/allu-4.png" alt="allu-4.png" style={{marginTop: '10rem'}}/>
      )
    } else {
      return (
        <img src="/images/allu-5.png" alt="allu-5.png" style={{marginTop: '10rem'}}/>
      )
    }}
  
  const Load = () => {
    if (load === 0) {
      return (
        <h1>Loading</h1>
      )
    } else if (load === 1) {
      return (
        <h1>Loading .</h1>
      )
    } else if (load === 2) {
      return (
        <h1>Loading ..</h1>
      )
    } else {
      return (
        <h1>Loading ...</h1>
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
