import { useState, useCallback, useRef } from 'react';
import { loadFaceApiModels, detectFaces, drawDetections, setupCanvas } from '../utils/faceDetection';
import type { FaceDetectionState, FaceDetectionResult } from '../types/faceDetection';

export function useFaceDetection() {
  const [state, setState] = useState<FaceDetectionState>({
    isModelLoading: false,
    isInitialized: false,
    error: null
  });
  const detectionRef = useRef<number>();
  const modelLoadingPromise = useRef<Promise<void>>();

  const initFaceAPI = useCallback(async () => {
    if (state.isInitialized || modelLoadingPromise.current) return;
    
    setState(prev => ({ ...prev, isModelLoading: true, error: null }));
    try {
      // Store the loading promise to prevent multiple simultaneous loads
      modelLoadingPromise.current = loadFaceApiModels();
      await modelLoadingPromise.current;
      setState(prev => ({ ...prev, isInitialized: true }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to initialize face detection' 
      }));
      throw error;
    } finally {
      setState(prev => ({ ...prev, isModelLoading: false }));
      modelLoadingPromise.current = undefined;
    }
  }, [state.isInitialized]);

  const startDetection = useCallback((
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    onDetection: (result: FaceDetectionResult) => void
  ) => {
    if (!state.isInitialized) {
      console.error('Face API not initialized');
      return;
    }

    setupCanvas(video, canvas);
    let isDetecting = true;

    const detect = async () => {
      if (!isDetecting) return;
      
      try {
        const result = await detectFaces(video, canvas);
        if (result && isDetecting) {
          drawDetections(canvas, result.detections);
          onDetection(result);
        }
        if (isDetecting) {
          detectionRef.current = requestAnimationFrame(detect);
        }
      } catch (error) {
        console.error('Detection error:', error);
      }
    };

    detect();

    return () => {
      isDetecting = false;
      if (detectionRef.current) {
        cancelAnimationFrame(detectionRef.current);
      }
    };
  }, [state.isInitialized]);

  return {
    ...state,
    initFaceAPI,
    startDetection
  };
}