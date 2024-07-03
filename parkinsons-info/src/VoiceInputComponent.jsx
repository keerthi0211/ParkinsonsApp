
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

  const handleSt
