import * as faceapi from 'face-api.js';
import { FACE_API_CONFIG } from '../config/constants';
import type { FaceDetectionResult } from '../types/faceDetection';

export async function loadFaceApiModels(): Promise<void> {
  try {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(FACE_API_CONFIG.MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(FACE_API_CONFIG.MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(FACE_API_CONFIG.MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(FACE_API_CONFIG.MODEL_URL)
    ]);
  } catch (error) {
    console.error('Error loading Face API models:', error);
    throw new Error('Failed to load face detection models');
  }
}

export function setupCanvas(video: HTMLVideoElement, canvas: HTMLCanvasElement): void {
  const { videoWidth, videoHeight } = video;
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  faceapi.matchDimensions(canvas, { width: videoWidth, height: videoHeight });
}

export async function detectFaces(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement
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

export function drawDetections(
  canvas: HTMLCanvasElement, 
  detections: faceapi.WithFaceLandmarks<WithFaceDetection<{}>>[]
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  faceapi.draw.drawDetections(canvas, detections);
  faceapi.draw.drawFaceLandmarks(canvas, detections);
  faceapi.draw.drawFaceExpressions(canvas, detections);
}