import React from 'react';
import useMediaRecorder from './wmik/use-media-recorder';
import '../src/App.css';

function Player({ srcBlob, audio }) {
  if (!srcBlob) {
    return null;
  }

  if (audio) {
    return <audio src={URL.createObjectURL(srcBlob)} controls />;
  }

  console.log(URL.createObjectURL(srcBlob));
  if(srcBlob){
    window.parent.postMessage(URL.createObjectURL(srcBlob), '*');
  }
  

  return (
    <video
      src={URL.createObjectURL(srcBlob)}
      width={520}
      height={480}
      controls
    />
  );
}

function ScreenRecorderApp() {
  let {
    error,
    status,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording
  } = useMediaRecorder({
    recordScreen: true,
    blobOptions: { type: 'video/webm' },
    mediaStreamConstraints: { audio: true, video: true }
    
  });

  // function onRecordingFinished(){
  //     if(mediaBlob){
  //       window.parent.postMessage(mediaBlob, '*');
  //       console.log(URL.createObjectURL(mediaBlob));
  //     }
  // };

  

  return (
    <article>
      <div className="header">Screen recorder</div>
      {error ? `${status} ${error.message}` : status}
      <section>
        <div className="button1">
          <button
            type="button"
            onClick={getMediaStream}
            disabled={status === 'ready'}
          >
            Share screen
        </button>
        </div>
        <p className="button2">
          <button
            type="button"
            onClick={startRecording}
            disabled={status === 'recording'}
          >
            Start recording
        </button>
        </p>
        <p className="button3">
          <button
            type="button"
            onClick={stopRecording}
            //onClick={onRecordingFinished}
            disabled={status !== 'recording'}
            
          >
            <i class="far fa-stop-circle"></i>
          Stop recording
        </button>
        </p>


      </section>

      <Player srcBlob={mediaBlob} />
    </article>
  
  );
  
}



export default ScreenRecorderApp;