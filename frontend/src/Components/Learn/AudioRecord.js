import React, { useState, useCallback, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import { MyButton } from 'styles/Button'
import * as S from './LearnStyle';
import onRecordingImage from './icons8-audio-wave.gif'
import RecordRTC from 'recordrtc';
import { MediaStreamRecorder, StereoAudioRecorder } from 'recordrtc';
import { invokeSaveAsDialog } from 'recordrtc';

export function AudioRecord({ setScript, setAudioUrl1, setAud1, setIsRecord, setIsRecordStart , whatRecord }) {
  const [stream, setStream] = useState()
  const [media, setMedia] = useState()
  const [onRec, setOnRec] = useState(true)
  const [source, setSource] = useState()
  const [analyser, setAnalyser] = useState()
  const [audioUrl, setAudioUrl] = useState()
  const [isComplete, setIsComplete] = useState(false);
  const [canStop, setCanStop] = useState(false);

  const { transcript, resetTranscript, finalTranscript } =
    useSpeechRecognition()

  // 사용자가 음성 녹음을 시작했을 때
  const onRecAudio = () => {
    // 첫번째 녹음을 시작했을 경우, 최소 20초의 녹음시간 이후 정지버튼 노출
    if (whatRecord === 'first') {
      setTimeout(() =>{
        setCanStop(true);
      }, 20000)
    } else {
      setCanStop(true)
    }

    setIsRecordStart(true)
    setIsComplete(false)
    setOnRec(false)
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    // const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    var AudioContext = window.AudioContext || window.webkitAudioContext;

    var audioCtx = new AudioContext({
      sampleRate: 16000,
    });
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    // const analyser = audioCtx.createAudioWorklet(0, 1, 1)
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
      // const mediaRecorder = new MediaRecorder(stream, {
      //   audioBitsPerSecond: 16000,
      // })
      // mediaRecorder.start()
      let recorder = RecordRTC(stream, {
        mimeType: 'audio/wav',
        recorderType: StereoAudioRecorder,
        numberOfAudioChannels: 1,
        desiredSampRate: 16000,
      });
      recorder.startRecording();
      setStream(stream)
      setMedia(recorder)
      // setMedia(mediaRecorder)
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

          recorder.stopRecording = function (e) {
            var blob = media.getBlob();
            setAudioUrl1(URL.createObjectURL(blob))
          }

          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect()
          audioCtx.createMediaStreamSource(stream).disconnect()

          recorder.getDataURL = function(dataURL) {
            console.log(dataURL)
          }
          setOnRec(true)
          SpeechRecognition.stopListening()
        } else {
          setOnRec(false)
        }
      }
    })
  }

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    setIsComplete(true);
    setOnRec(true)
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    SpeechRecognition.stopListening()

    media.stopRecording(function() {
      var blob = media.getBlob();
      setAudioUrl1(URL.createObjectURL(blob))
    });

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop()
    })
    //스크립트 저장
    setScript(finalTranscript)
    // 미디어 캡처 중지
    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect()
    source.disconnect()
  }

  const onSubmitAudioFile = () => {
    // File 생성자를 사용해 파일로 변환
    const resultBlob = media.getBlob();

    const sound = new File([resultBlob], 'soundBlob.wav', {
      lastModified: new Date().getTime(),
      type: 'audio/wav',
    })

    setAud1(sound);
    setIsRecord(true);
    setIsComplete(false);
  }

  return (
    <Col style={{margin: '1rem'}}>
        {onRec ? (
          isComplete ?
            <MyButton onClick={onRecAudio} style={{ width: '7rem' }}>재녹음</MyButton>
            :
            <MyButton onClick={onRecAudio} style={{ width: '7rem' }}>녹음</MyButton>
        ) : (
          <>
            <S.onRecordingImage src={onRecordingImage} alt="recording"></S.onRecordingImage>
            <div style={{ display: 'inline' }}>녹음을 진행중입니다...</div>
            {finalTranscript && canStop && 
              <MyButton onClick={() => {offRecAudio();}} style={{ width: '7rem', marginLeft: '1rem' }}>정지</MyButton>
            }
          </>
        )}
        {finalTranscript && isComplete && (
          <MyButton onClick={() => {onSubmitAudioFile()}} style={{ width: '7rem', marginLeft: '2rem' }}>녹음 확인</MyButton>
        )}
    </Col>
  )
}
