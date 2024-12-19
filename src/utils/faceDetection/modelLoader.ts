import * as faceapi from 'face-api.js';
import { FACE_API_CONFIG } from '../../config/constants';

let modelLoadingPromise: Promise<void> | null = null;

export async function loadFaceApiModels(): Promise<void> {
  if (modelLoadingPromise) {
    return modelLoadingPromise;
  }

  modelLoadingPromise = (async () => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(FACE_API_CONFIG.MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(FACE_API_CONFIG.MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(FACE_API_CONFIG.MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(FACE_API_CONFIG.MODEL_URL)
      ]);
    } catch (error) {
      console.error('Error loading Face API models:', error);
      modelLoadingPromise = null;
      throw new Error('Failed to load face detection models');
    }
  })();

  return modelLoadingPromise;
}

export function resetModelLoader(): void {
  modelLoadingPromise = null;
}