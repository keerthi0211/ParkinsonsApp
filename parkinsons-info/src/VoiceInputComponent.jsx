// src/VoiceInputComponent.jsx
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceInputComponent = ({ onTextSubmit }) => {
  const { transcript, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  const handleVoiceInput = () => {
    SpeechRecognition.startListening();
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    onTextSubmit(transcript);
    resetTranscript();
  };

  return (
    <div>
      <button onClick={handleVoiceInput}>Start Voice Input</button>
      <button onClick={handleStopListening}>Stop Voice Input</button>
      <p>{transcript}</p>
    </div>
  );
};

export default VoiceInputComponent;
