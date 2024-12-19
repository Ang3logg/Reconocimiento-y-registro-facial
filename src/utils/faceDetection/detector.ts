import * as faceapi from 'face-api.js';
import { FACE_API_CONFIG } from '../../config/constants';
import type { FaceDetectionResult } from '../../types/faceDetection';

export async function detectFaces(
  video: HTMLVideoElement
): Promise<FaceDetectionResult | null> {
  if (video.paused || video.ended) return null;

  try {
    const detections = await faceapi
      .detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions(FACE_API_CONFIG.DETECTION_OPTIONS)
      )
      .withFaceLandmarks()
      .withFaceExpressions();

    if (detections.length === 0) return null;

    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    
    return {
      timestamp: new Date(),
      detections: resizedDetections
    };
  } catch (error) {
    console.error('Face detection error:', error);
    return null;
  }
}