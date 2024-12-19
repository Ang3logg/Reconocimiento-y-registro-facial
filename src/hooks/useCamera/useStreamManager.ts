import { useRef, useCallback } from 'react';

export function useStreamManager() {
  const streamRef = useRef<MediaStream | null>(null);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const setStream = useCallback((stream: MediaStream) => {
    stopStream();
    streamRef.current = stream;
  }, [stopStream]);

  return {
    currentStream: streamRef.current,
    setStream,
    stopStream
  };
}