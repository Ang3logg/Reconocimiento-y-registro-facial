export async function getVideoStream(deviceId: string): Promise<MediaStream> {
  try {
    return await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: { exact: deviceId },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'NotAllowedError') {
        throw new Error('Camera access was denied. Please allow camera access and refresh the page.');
      } else if (error.name === 'NotFoundError') {
        throw new Error('Selected camera not found. Please choose a different camera.');
      } else if (error.name === 'NotReadableError') {
        throw new Error('Selected camera may be in use by another application.');
      }
    }
    throw new Error('Failed to start camera stream. Please try again.');
  }
}