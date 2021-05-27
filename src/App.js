import React from 'react';
import useMediaRecorder from './wmik/use-media-recorder';
import '../src/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import DropboxUpload from './Dropbox';
import { useEffect, useState } from 'react';

// let blobLinkForDropbox = "";
// export{blobLinkForDropbox};


function bindEvent(element, eventName, eventHandler) {
  if (element.addEventListener) {
    element.addEventListener(eventName, eventHandler, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + eventName, eventHandler);
  }
}

function Player({ srcBlob, audio }) {
  if (!srcBlob) {
    return null;
  }

  if (audio) {
    return <audio src={URL.createObjectURL(srcBlob)} controls />;
  }

  console.log(URL.createObjectURL(srcBlob));
  if(srcBlob){
    // blobLinkForDropbox = URL.createObjectURL(srcBlob);
    window.parent.postMessage(URL.createObjectURL(srcBlob), '*');
  }
  

  return (
    <video
      src={URL.createObjectURL(srcBlob)}
      width={520}
      height={400}
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

  ////
  const [exampleColor, setExampleColor] = useState('');
  const [firstOptions, setFirstOptions] = useState(''); // eslint-disable-line
  const [secondOptions, setSecondOptions] = useState(''); // eslint-disable-line

  useEffect(()=> {
    bindEvent(window, 'message', function (e) {
      console.log("****"+e.data);
      const { color, firstinputs, secondinputs } = e.data;
      setExampleColor(color);
      setFirstOptions(firstinputs);
      setSecondOptions(secondinputs);
    });
  }, []);

  ////

  return (
    <article>
      <section>
        {/* <div className="button1">
          <button
            type="button"
            onClick={getMediaStream}
            disabled={status === 'ready'}
          >
            Share screen
        </button>
        </div> */}
        <div className= "buttonWrapper">
        <p className="button2">
          <button 
            className="startButton"
            type="button"
            onClick={startRecording}
            disabled={status === 'recording'}
          >
            <i class="fas fa-play"></i>
            Start recording
        </button>
        </p>

        <p className="button3">
          <button
            className="stopButton"
            type="button"
            onClick={stopRecording}
            //onClick={onRecordingFinished}
            disabled={status !== 'recording'}
            
          >
            <i class="fas fa-stop"></i>
          Stop recording
        </button>
        </p>
        {status === 'recording' && <div className= "recording">Recording...</div>}
        </div>

      </section>
      {/* <DropboxUpload/> */}
      <Player srcBlob={mediaBlob} />
    </article>
  
  );
  
}



export default ScreenRecorderApp;