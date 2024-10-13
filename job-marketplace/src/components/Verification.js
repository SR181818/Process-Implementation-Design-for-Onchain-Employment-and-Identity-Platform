import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';


const FaceVerification = () => {
  const webcamRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isVerified, setIsVerified] = useState(null);
  const [error, setError] = useState(null);
  const [referenceDescriptors, setReferenceDescriptors] = useState([]);

  const MODEL_URL = '/models'; 

  useEffect(() => {
    const loadModels = async () => {
      try {
        console.log('Loading models...');
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        setModelsLoaded(true);
        console.log('Models loaded successfully');
      } catch (err) {
        console.error('Error loading models:', err);
        setError('Error loading models');
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    const importAll = (r) => {
      let images = [];
      r.keys().map((item, index) => { images.push(r(item)); });
      return images;
    };

    const images = importAll(require.context('../immigration-app-backend/uploads', false, /\.(jpg|jpeg|png|gif)$/));
    const loadReferenceImages = async () => {
      const descriptors = [];

      for (const img of images) {
        const image = new Image();
        image.src = img;

        image.onload = async () => {
          const detection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
          if (detection) {
            descriptors.push(detection.descriptor);
          }
        };
      }

      setReferenceDescriptors(descriptors);
    };

    if (modelsLoaded) {
      loadReferenceImages();
    }
  }, [modelsLoaded]);

  const captureAndVerify = async () => {
    if (webcamRef.current && modelsLoaded && referenceDescriptors.length > 0) {
      const capturedImage = webcamRef.current.getScreenshot();
      const img = new Image();
      img.src = capturedImage;

      img.onload = async () => {
        const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        if (detection) {
          const distances = referenceDescriptors.map(descriptor =>
            faceapi.euclideanDistance(detection.descriptor, descriptor)
          );
          const minDistance = Math.min(...distances);

          const threshold = 0.5;
          if (minDistance < threshold) {
            setIsVerified(true);
            console.log('Captured image matches a reference image!');
          } else {
            setIsVerified(false);
            console.log('Captured image does not match any reference image.');
          }
        }
      };
    } else {
      setError('Please ensure models are loaded and descriptors are available.');
    }
  };

  return (
    <div>
      <h1>Face Verification</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isVerified === true ? (
        <p style={{ color: 'green' }}>Captured image: Same face as uploaded!</p>
      ) : isVerified === false ? (
        <p style={{ color: 'red' }}>Captured image: Not the same face as uploaded. Try again.</p>
      ) : (
        <p>Please capture your face.</p>
      )}

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="640"
        height="480"
      />

      <button onClick={captureAndVerify}>Verify Webcam Face</button>
    </div>
  );
};

export default FaceVerification;
