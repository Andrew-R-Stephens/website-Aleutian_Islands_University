<?php header("Access-Control-Allow-Origin: *");

require ("connect.php");

$conn = connect();

/** @var $conn */

$table = "Users";

echo "<p>Getting id 1</p>";
$sql = "SELECT * FROM {$table} WHERE (id = 1);";

$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    echo "<table><tr><th>ID</th><th>First Name</th><th>Last Name</th></tr>";
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo "<tr><td>". $row["id"]."</td><td>" . $row["firstName"]."</td><td>". $row["lastName"]. "</td></tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}


/*
// Insert record in database
$sql = "INSERT INTO {$table} (firstName, lastName) VALUES ( 'Joe', 'Mama' );";
if(doQuery($conn, $sql) === false){
    echo "Error inserting record: " . $conn->error . "<br>";
}*/

// display records from table
echo "<p>Getting all id's</p>";
$sql = "SELECT * FROM {$table};";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    echo "<table><tr><th>ID</th><th>First Name</th><th>Last Name</th></tr>";
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo "<tr><td>". $row["id"]."</td><td>" . $row["firstName"]."</td><td>". $row["lastName"]. "</td></tr>";
    }
    echo "</table>";
} else {
    echo "<table/>";
}

mysqli_close($conn);
