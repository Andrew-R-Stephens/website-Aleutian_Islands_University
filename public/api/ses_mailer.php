<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function sendEmail($sender, $recipient, $header, $message){
//Load Composer's autoloader

    require '/home/ubuntu/vendor/autoload.php';
    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                              //Enable verbose debug output
        $mail->isSMTP();                                                    //Send using SMTP
        $mail->Host = 'email-smtp.us-east-1.amazonaws.com';                 //Set the SMTP server to send through
        $mail->SMTPAuth = true;                                             //Enable SMTP authentication
        $mail->Username = 'AKIAZRL3E4HTZDTE6JPY';                           //SMTP username
        $mail->Password = 'BDbjkdO2cDhuMkRYOQHXbpZbz+PZ7FTgJszlJaf1shrT';   //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;  //PHPMailer::ENCRYPTION_STARTTLS;                  //Enable implicit TLS encryption
        $mail->Port = 465; //587;//                                                 //TCP port to connect to;
                                                                            //use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom($sender, 'Aleutian Islands University');
        $mail->addAddress($recipient, '');                          //Add a recipient


        //Content
        $mail->isHTML(true);                                                //Set email format to HTML
        $mail->Subject = $header;
        $mail->Body = $message;
        $mail->AltBody = $message;


        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

?>