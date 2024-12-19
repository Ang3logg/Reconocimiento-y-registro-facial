import { useCallback, useRef } from 'react';
import { detectFaces, drawDetections } from '../../utils/faceDetection';
import type { FaceDetectionResult } from '../../types/faceDetection';
import type { DetectionCleanup } from './types';

export function useDetectionLoop() {
  const detectionRef = useRef<number>();
  
  const startDetection = useCallback((
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    onDetection: (result: FaceDetectionResult) => void
  ): DetectionCleanup => {
    let isDetecting = true;

    const detect = async () => {
      if (!isDetecting) return;
      
      try {
        const result = await detectFaces(video);
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

    return {
      stop: () => {
        isDetecting = false;
        if (detectionRef.current) {
          cancelAnimationFrame(detectionRef.current);
        }
      }
    };
  }, []);

  return { startDetection };
}