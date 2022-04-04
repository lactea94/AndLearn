import React, { useState, useCallback } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import { MyButton } from 'styles/Button'

export function AudioRecord({ setScript, next, setAudioUrl1, setAud1 }) {
  const [stream, setStream] = useState()
  const [media, setMedia] = useState()
  const [onRec, setOnRec] = useState(true)
  const [source, setSource] = useState()
  const [analyser, setAnalyser] = useState()
  const [audioUrl, setAudioUrl] = useState()
  const [audio1, setAudio1] = useState()
  const [hidden, setHidden] = useState(false)

  const { transcript, resetTranscript, finalTranscript } =
    useSpeechRecognition()

  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1)
    setAnalyser(analyser)
    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream)
      setSource(source)
      source.connect(analyser)
      analyser.connect(audioCtx.destination)
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorder.start()
      setStream(stream)
      setMedia(mediaRecorder)
      makeSound(stream)
      if (finalTranscript !== '') {
        resetTranscript()
      }
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' })
      analyser.onaudioprocess = function (e) {
        // 1분(60초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 60) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop()
            setScript(finalTranscript)
          })
          mediaRecorder.stop()

          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect()
          audioCtx.createMediaStreamSource(stream).disconnect()

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data)
            setOnRec(true)
          }
          SpeechRecognition.stopListening()
        } else {
          setOnRec(false)
        }
      }
    })
  }

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    SpeechRecognition.stopListening()

    media.ondataavailable = function (e) {
      setAudioUrl(e.data)
      setOnRec(true)
    }

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop()
    })
    //스크립트 저장
    setScript(finalTranscript)
    // 미디어 캡처 중지
    media.stop()
    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect()
    source.disconnect()
  }

  const onSubmitAudioFile = useCallback(() => {
    if (finalTranscript) {
      setHidden(true)
      next()
    } else {
      alert('녹음을 완료해주세요!.')
    }
    if (audioUrl) {
      // 출력된 링크에서 녹음된아이포트폴리오
      setAudio1(URL.createObjectURL(audioUrl))
      setAudioUrl1(URL.createObjectURL(audioUrl))
    }
    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], 'soundBlob.m4a', {
      lastModified: new Date().getTime(),
      type: 'audio/x-m4a',
    })
 
    setAud1(sound)
  }, [audioUrl])

  return (
    <>
      {!hidden && (
        <>
          {onRec ? (
            <MyButton onClick={onRecAudio}>녹음</MyButton>
          ) : (
            <MyButton onClick={offRecAudio}>정지</MyButton>
          )}
          {finalTranscript && (
            <MyButton onClick={onSubmitAudioFile}>다음</MyButton>
          )}
        </>
      )}

      {/* 실시간 스크립트 */}
      {/* <p>{transcript}</p> */}
      {/* 최종 스크립트 */}
      {finalTranscript}
    </>
  )
}
