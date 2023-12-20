<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "prac";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM addcontract";
$result = mysqli_query($conn, $sql);
$totalorders = 0;
$totalRevenueExpenditureContracts=0;
$totalCapitalExpenditureContracts=0;


if (mysqli_num_rows($result) > 0) {
  

    while ($row = mysqli_fetch_assoc($result)) {
        
         '<tr>
                <td>' . $row["Contract Id"] . '</td>
                <td>' . $row["Contract Name"] . '</td>
                <td>' . $row["Status"] . '</td>
                <td>' . $row["Contract Type"] . '</td>
                <td>' . $row["Start Date"] . '</td>
                <td>' . $row["End Date"] . '</td>
                <td>' . $row["Description"] . '</td>
              </tr>';
              $totalorders++;

              if ($row["Contract Type"] == "Revenue Expenditure") {
                // Increment the totalRevenueExpenditureContracts variable for each revenue expenditure contract
                $totalRevenueExpenditureContracts++;
    }

    if ($row["Contract Type"] == "Capital Expenditure") {
        // Increment the totalRevenueExpenditureContracts variable for each revenue expenditure contract
        $totalCapitalExpenditureContracts++;
}
    echo '</tbody></table>';
} 
}

mysqli_close($conn);
?>
