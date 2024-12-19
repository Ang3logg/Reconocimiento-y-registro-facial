-- Create students table if it doesn't exist
CREATE TABLE IF NOT EXISTS students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_code VARCHAR(20) NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  face_image_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add face_image_path column to students table if it doesn't exist
ALTER TABLE students
ADD COLUMN IF NOT EXISTS face_image_path VARCHAR(255) AFTER email;

-- Add index for faster face image lookups
CREATE INDEX IF NOT EXISTS idx_face_image_path ON students(face_image_path);

-- Insert Adrian Villantoy as a pre-registered student
INSERT INTO students (student_code, full_name, email) 
VALUES ('72192900', 'Adrian Villantoy', '72192900@student.example.com')
ON DUPLICATE KEY UPDATE 
  full_name = VALUES(full_name),
  email = VALUES(email);

-- Create attendance_records table if it doesn't exist
CREATE TABLE IF NOT EXISTS attendance_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status ENUM('Present', 'Absent', 'Late') NOT NULL,
  detection_method ENUM('Face', 'QR', 'Manual') NOT NULL,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Add some sample attendance records for Adrian Villantoy
INSERT INTO attendance_records (student_id, date, time, status, detection_method, created_by)
SELECT 
  s.id,
  CURDATE(),
  CURTIME(),
  'Present',
  'Face',
  (SELECT id FROM users WHERE username = 'admin' LIMIT 1)
FROM students s
WHERE s.student_code = '72192900'
LIMIT 1;