import ReactHowler from "react-howler";
import { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import raf from 'raf'
import { duration } from "moment";

export function PlayBox ({ recordUrl }) {
  const player = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState(0);

  const handleToggle = () => {
    setIsPlaying(!isPlaying);
    console.log(player.current)
    console.log(player.current.duration())
  };

  // const handleOnLoad = () => {
  //   setLoaded(true);
  //   setDuration(player.current.duration());
  // }

  const handleStop = () => {
    player.current.stop()
    setIsPlaying(false)
    renderSeekPos()
  };

  const renderSeekPos = () => {
    if (!isSeeking) {
      setSeek(player.current.seek());
    };
    if (isPlaying) {
      raf(renderSeekPos);
    };
  };

  const handleSeekingChange = (e) => {
    setSeek(parseFloat(e.target.value));
  };

  const handleMouseDownSeek = () => {
    setIsSeeking(true);
  };

  const handleMouseUpSeek = (e) => {
    setIsSeeking(false);
    player.current.seek(e.target.value)
  };

  return (
    <div>
      <ReactHowler 
        src={recordUrl}
        playing={isPlaying}
        // onLoad={handleOnLoad()}
        ref={player}
      />
      <p>{loaded ? 'Loaded' : 'Loading'}</p>
      {/* <div>
        <span>
          <input
            type="range"
            min="0"
            max={duration ? duration.toFixed(2) : 0}
            step=".01"
            value={seek}
            onChange={handleSeekingChange()}
            onMouseDown={handleMouseDownSeek()}
            onMouseUp={handleMouseUpSeek()}
          />
        </span>
      </div> */}
      <Button onClick={() => {handleToggle()}}>
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
      <Button onClick={() => {handleStop()}}>
        Stop
      </Button>
    </div>
  )
}