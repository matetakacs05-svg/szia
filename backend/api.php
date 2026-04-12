<?php
header("Content-Type: application/json");

$host = "localhost";
$db = "gv9nmd";
$user = "gv9nmd";
$pass = "Admin1234*";
try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=UTF8",$user,$pass,
        [PDO::ATTR_ERRMODE =>
            PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE =>
            PDO::FETCH_ASSOC]);
} catch (PDOException $e) {
    die("Database connection failed");
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM pilota");
            $readData=$stmt->fetchAll();
            echo json_encode(['status' => 'Read success!', "readData"=>$readData]);
        }
        catch(PDOException $e) {
            echo json_encode(['status' => 'Read error!']);
        }
        break;
    case 'POST':
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $stmt = $pdo->prepare("INSERT INTO pilota (nev, nem, szuldat, nemzet) VALUES (?, ?, ?, ?)");
            $stmt->execute([$data['nev'], $data['nem'], $data['szuldat'], $data['nemzet']]);
            echo json_encode(['status' => 'Create success!', 'newId' => $pdo->lastInsertId()]);
        }
        catch(PDOException $e) {
            echo json_encode(['status' => 'Create error!', 'error' => $e->getMessage()]);
        }
        break;
    case 'PUT':
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            $stmt = $pdo->prepare("UPDATE users SET name=?, email=? WHERE id=?");
            $stmt->execute([$data['name'], $data['email'], $data['id']]);
            echo json_encode(['status' => 'Update success!']);
        }
        catch(PDOException $e) {
            echo json_encode(['status' => 'Update error!']);
        }
        break;
    case 'DELETE':
        try {
            $stmt = $pdo->prepare("DELETE FROM pilota WHERE az=?");
            $stmt->execute([$_GET['az']]);
            echo json_encode(['status' => 'Delete success!']);
        }
        catch(PDOException $e) {
            echo json_encode(['status' => 'Delete error!', 'error' => $e->getMessage()]);
        }
        break;
}