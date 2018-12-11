<?php
$servername = "10.60.110.31:8080";
$username = "root";
$password = "Fornitori.2018";
$dbname = "albo";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Controllo la connessione
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
//QUERY PER LA VERIFICA DEL LOGIN
$sql = "SELECT ID, firstname, lastname FROM MyGuests";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>