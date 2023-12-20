<?php
$dbHost = 'localhost';
$dbUser = 'root';
$dbPass = '';
$dbName = 'prac';

$conn = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

if (mysqli_connect_errno()) {
    die("Failed to connect to MySQL: " . mysqli_connect_error());
}
$query = "SELECT `Contract Name`, `End Date` FROM addcontract";
$result = mysqli_query($conn, $query);

$currentDate = date('Y-m-d');
include('smtp/PHPMailerAutoload.php');
// echo smtp_mailer('naggarwal_be21@thapar.edu','Reminder','This is a system generated E-mail.');
function smtp_mailer($to,$subject, $msg){
	$mail = new PHPMailer(); 
	$mail->SMTPDebug  = true;
	$mail->IsSMTP(); 
	$mail->SMTPAuth = true; 
	$mail->SMTPSecure = 'tls'; 
	$mail->Host = "smtp.gmail.com";
	$mail->Port = 587;
	$mail->IsHTML(true);
	$mail->CharSet = 'UTF-8';
	$mail->Username = "youremailhere";
	$mail->Password = "yourpasswordhere";
	$mail->SetFrom("youremailhere");
	$mail->Subject = $subject;
	$mail->Body =$msg;
	$mail->AddAddress($to);
	$mail->SMTPOptions=array('ssl'=>array(
		'verify_peer'=>false,
		'verify_peer_name'=>false,
		'allow_self_signed'=>false
	));
	if(!$mail->Send()){
		echo $mail->ErrorInfo;
	}else{
		return 'Sent';
	}
}


while ($row = mysqli_fetch_assoc($result)) {
    $contractName = $row['Contract Name'];
    $endDate = $row['End Date'];

    $threeMonthsFromNow = date('Y-m-d', strtotime($currentDate . '+1 months'));

    if ($endDate >= $currentDate && $endDate <= $threeMonthsFromNow) {
		
		echo smtp_mailer('receiver email', 'Reminder', 'This is a system-generated email for '.$contractName.' expiring on '.$endDate.'.');

    }
}

mysqli_close($conn);
?>
