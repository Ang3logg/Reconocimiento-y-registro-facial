<?php
// Azure Face API Configuration
define('AZURE_FACE_ENDPOINT', 'YOUR_AZURE_FACE_API_ENDPOINT');
define('AZURE_FACE_KEY', 'YOUR_AZURE_FACE_API_KEY');
define('AZURE_PERSON_GROUP_ID', 'attendance_system_students');

class AzureFaceAPI {
    private $endpoint;
    private $key;
    private $personGroupId;

    public function __construct() {
        $this->endpoint = AZURE_FACE_ENDPOINT;
        $this->key = AZURE_FACE_KEY;
        $this->personGroupId = AZURE_PERSON_GROUP_ID;
    }

    public function detectFace($imageData) {
        $url = $this->endpoint . '/face/v1.0/detect';
        $headers = [
            'Content-Type: application/octet-stream',
            'Ocp-Apim-Subscription-Key: ' . $this->key
        ];

        $params = [
            'returnFaceId' => 'true',
            'recognitionModel' => 'recognition_04'
        ];

        $ch = curl_init($url . '?' . http_build_query($params));
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $imageData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        curl_close($ch);

        return json_decode($response, true);
    }

    public function identifyPerson($faceId) {
        $url = $this->endpoint . '/face/v1.0/identify';
        $headers = [
            'Content-Type: application/json',
            'Ocp-Apim-Subscription-Key: ' . $this->key
        ];

        $data = [
            'personGroupId' => $this->personGroupId,
            'faceIds' => [$faceId],
            'maxNumOfCandidatesReturned' => 1,
            'confidenceThreshold' => 0.5
        ];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        curl_close($ch);

        return json_decode($response, true);
    }

    public function createPerson($name, $studentCode) {
        $url = $this->endpoint . "/face/v1.0/persongroups/{$this->personGroupId}/persons";
        $headers = [
            'Content-Type: application/json',
            'Ocp-Apim-Subscription-Key: ' . $this->key
        ];

        $data = [
            'name' => $name,
            'userData' => $studentCode
        ];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        curl_close($ch);

        return json_decode($response, true);
    }

    public function addFaceToPerson($personId, $imageData) {
        $url = $this->endpoint . "/face/v1.0/persongroups/{$this->personGroupId}/persons/{$personId}/persistedFaces";
        $headers = [
            'Content-Type: application/octet-stream',
            'Ocp-Apim-Subscription-Key: ' . $this->key
        ];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $imageData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        curl_close($ch);

        return json_decode($response, true);
    }

    public function trainPersonGroup() {
        $url = $this->endpoint . "/face/v1.0/persongroups/{$this->personGroupId}/train";
        $headers = [
            'Ocp-Apim-Subscription-Key: ' . $this->key
        ];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        curl_close($ch);

        return $response;
    }
}