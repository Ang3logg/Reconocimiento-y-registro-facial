import { useRef, useCallback } from 'react';
import type { FaceDetectionResult } from '../../types/faceDetection';

interface AutoAttendanceConfig {
  // Minimum confidence score to consider a face detection valid
  minConfidence: number;
  // Minimum time (in ms) between attendance records for the same person
  cooldownPeriod: number;
}

const DEFAULT_CONFIG: AutoAttendanceConfig = {
  minConfidence: 0.7,
  cooldownPeriod: 60000 // 1 minute cooldown
};

export function useAutoAttendance(config: Partial<AutoAttendanceConfig> = {}) {
  const lastDetectionTime = useRef<number>(0);
  const settings = { ...DEFAULT_CONFIG, ...config };

  const processDetection = useCallback((
    result: FaceDetectionResult,
    onAttendance: (data: any) => void
  ) => {
    const now = Date.now();
    
    // Check cooldown period
    if (now - lastDetectionTime.current < settings.cooldownPeriod) {
      return;
    }

    // Find the face with highest confidence
    const bestDetection = result.detections.reduce((best, current) => {
      const confidence = current.detection.score;
      return confidence > (best?.detection.score || 0) ? current : best;
    }, null);

    if (bestDetection && bestDetection.detection.score >= settings.minConfidence) {
      lastDetectionTime.current = now;
      
      // Record attendance
      onAttendance({
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        status: 'Present',
        // You would typically get these from a form or user input
        studentCode: 'AUTO-DETECT',
        studentName: 'Auto Detected Student'
      });
    }
  }, [settings]);

  return { processDetection };
}