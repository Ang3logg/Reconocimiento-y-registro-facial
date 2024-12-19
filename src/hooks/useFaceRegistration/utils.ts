import { PATHS } from '../../config/paths';

export function generateImagePath(studentCode: string): string {
  const timestamp = new Date().getTime();
  const filename = `${studentCode}_${timestamp}.jpg`;
  return `${PATHS.FACE_IMAGES}\\${filename}`;
}

export function createFormData(data: {
  imageData: string;
  studentCode: string;
  fullName: string;
  email: string;
  imagePath: string;
}): FormData {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}