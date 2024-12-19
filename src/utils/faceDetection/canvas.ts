import * as faceapi from 'face-api.js';
import type { WithFaceDetection } from 'face-api.js';

export function setupCanvas(video: HTMLVideoElement, canvas: HTMLCanvasElement): void {
  const { videoWidth, videoHeight } = video;
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  faceapi.matchDimensions(canvas, { width: videoWidth, height: videoHeight });
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