import { useState, useCallback } from 'react';
import { loadFaceApiModels, setupCanvas } from '../../utils/faceDetection';
import { useDetectionLoop } from './useDetectionLoop';
import type { FaceDetectionState } from './types';
import type { FaceDetectionResult } from '../../types/faceDetection';

export function useFaceDetection() {
  const [state, setState] = useState<FaceDetectionState>({
    isModelLoading: false,
    isInitialized: false,
    error: null
  });

  const { startDetection: startDetectionLoop } = useDetectionLoop();

  const initFaceAPI = useCallback(async () => {
    if (state.isInitialized) return;
    
    setState(prev => ({ ...prev, isModelLoading: true, error: null }));
    try {
      // Add retries for model loading
      let retries = 3;
      while (retries > 0) {
        try {
          await loadFaceApiModels();
          break;
        } catch (error) {
          retries--;
          if (retries === 0) throw error;
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      setState(prev => ({ ...prev, isInitialized: true }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to load face detection models. Please check your internet connection and refresh the page.' 
      }));
      throw error;
    } finally {
      setState(prev => ({ ...prev, isModelLoading: false }));
    }
  }, [state.isInitialized]);

  const startDetection = useCallback((
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    onDetection: (result: FaceDetectionResult) => void
  ) => {
    if (!state.isInitialized) {
      console.error('Face API not initialized');
      return { stop: () => {} };
    }

    setupCanvas(video, canvas);
    return startDetectionLoop(video, canvas, onDetection);
  }, [state.isInitialized, startDetectionLoop]);

  return {
    ...state,
    initFaceAPI,
    startDetection
  };
}

export type { FaceDetectionState, DetectionCleanup } from './types';