import Tesseract from 'tesseract.js';

export async function extractStudentInfo(imageData: string): Promise<StudentInfo | null> {
  try {
    const result = await Tesseract.recognize(imageData, 'eng');
    const text = result.data.text;

    // Extract student code (assuming format like "72192900")
    const codeMatch = text.match(/\b\d{8}\b/);
    const studentCode = codeMatch ? codeMatch[0] : '';

    // Extract name (assuming format like "ADRIAN VILLANTOY")
    const nameMatch = text.match(/[A-Z\s]{2,}/);
    const fullName = nameMatch ? nameMatch[0].trim() : '';

    // Extract email (assuming format like "xxx@ucvvirtual.edu.pe")
    const emailMatch = text.match(/\S+@ucvvirtual\.edu\.pe/i);
    const email = emailMatch ? emailMatch[0].toLowerCase() : '';

    if (!studentCode || !fullName || !email) {
      throw new Error('Could not extract all required information');
    }

    return {
      studentCode,
      fullName,
      email
    };
  } catch (error) {
    console.error('Error extracting student info:', error);
    return null;
  }
}