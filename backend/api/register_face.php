<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method']);
    exit();
}

try {
    // Get form data
    $studentCode = $_POST['studentCode'];
    $fullName = $_POST['fullName'];
    $email = $_POST['email'];
    $imagePath = $_POST['imagePath'];
    
    // Process image data
    $imageData = $_POST['imageData'];
    $imageData = str_replace('data:image/jpeg;base64,', '', $imageData);
    $imageData = base64_decode($imageData);
    
    // Ensure directory exists
    $directory = dirname($imagePath);
    if (!file_exists($directory)) {
        mkdir($directory, 0777, true);
    }
    
    // Save image file
    if (!file_put_contents($imagePath, $imageData)) {
        throw new Exception('Failed to save image file');
    }
    
    // Start database transaction
    $conn->begin_transaction();
    
    try {
        // Check if student exists
        $stmt = $conn->prepare("SELECT id FROM students WHERE student_code = ?");
        $stmt->bind_param("s", $studentCode);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 0) {
            // Create new student
            $stmt = $conn->prepare("INSERT INTO students (student_code, full_name, email, face_image_path) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", 
                $studentCode,
                $fullName,
                $email,
                $imagePath
            );
            $stmt->execute();
            $studentId = $conn->insert_id;
        } else {
            // Update existing student
            $student = $result->fetch_assoc();
            $studentId = $student['id'];
            
            $stmt = $conn->prepare("UPDATE students SET face_image_path = ? WHERE id = ?");
            $stmt->bind_param("si", $imagePath, $studentId);
            $stmt->execute();
        }
        
        $conn->commit();
        
        echo json_encode([
            'success' => true,
            'message' => 'Face registered successfully',
            'studentId' => $studentId
        ]);
    } catch (Exception $e) {
        $conn->rollback();
        throw $e;
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Failed to register face: ' . $e->getMessage()
    ]);
}

$conn->close();
?>