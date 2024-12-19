<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../config/database.php';

$method = $_SERVER['REQUEST_METHOD'];

function checkUserRole($conn, $userId) {
    $stmt = $conn->prepare("SELECT role FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();
    return $user['role'];
}

switch ($method) {
    case 'GET':
        $sql = "SELECT ar.*, s.student_code, s.full_name as student_name, u.username as created_by_user 
                FROM attendance_records ar
                JOIN students s ON ar.student_id = s.id
                JOIN users u ON ar.created_by = u.id
                ORDER BY ar.date DESC, ar.time DESC";
        $result = $conn->query($sql);
        $attendance = [];
        
        while ($row = $result->fetch_assoc()) {
            $attendance[] = $row;
        }
        
        echo json_encode($attendance);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        // Start transaction
        $conn->begin_transaction();
        
        try {
            // Check if student exists, if not create them
            $stmt = $conn->prepare("SELECT id FROM students WHERE student_code = ?");
            $stmt->bind_param("s", $data->studentCode);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows === 0) {
                $stmt = $conn->prepare("INSERT INTO students (student_code, full_name, email) VALUES (?, ?, ?)");
                $stmt->bind_param("sss", 
                    $data->studentCode,
                    $data->studentName,
                    $data->studentCode . "@student.example.com"
                );
                $stmt->execute();
                $studentId = $conn->insert_id;
            } else {
                $student = $result->fetch_assoc();
                $studentId = $student['id'];
            }
            
            // Insert attendance record
            $stmt = $conn->prepare("INSERT INTO attendance_records (student_id, date, time, status, detection_method, created_by) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("issssi", 
                $studentId,
                $data->date,
                $data->time,
                $data->status,
                $data->detectionMethod,
                $data->createdBy
            );
            
            $stmt->execute();
            $conn->commit();
            
            echo json_encode(['message' => 'Attendance recorded successfully']);
        } catch (Exception $e) {
            $conn->rollback();
            echo json_encode(['error' => 'Failed to record attendance: ' . $e->getMessage()]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        
        // Only allow admin to update records
        $userRole = checkUserRole($conn, $data->userId);
        if ($userRole !== 'admin') {
            echo json_encode(['error' => 'Unauthorized: Only administrators can update records']);
            exit();
        }
        
        $stmt = $conn->prepare("UPDATE attendance_records SET status = ? WHERE id = ?");
        $stmt->bind_param("si",
            $data->status,
            $data->id
        );
        
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Attendance updated successfully']);
        } else {
            echo json_encode(['error' => 'Failed to update attendance']);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $userId = $_GET['userId'];
        
        // Only allow admin to delete records
        $userRole = checkUserRole($conn, $userId);
        if ($userRole !== 'admin') {
            echo json_encode(['error' => 'Unauthorized: Only administrators can delete records']);
            exit();
        }
        
        $stmt = $conn->prepare("DELETE FROM attendance_records WHERE id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Attendance deleted successfully']);
        } else {
            echo json_encode(['error' => 'Failed to delete attendance']);
        }
        break;
}

$conn->close();
?>