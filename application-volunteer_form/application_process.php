<?php
	include 'defines.php';
	include 'email_validation.php';
	$post = (!empty($_POST)) ? true : false;
	if($post){
		$name = stripslashes($_POST['name']);
		$surname = stripslashes($_POST['surname']);
		$fathername = stripslashes($_POST['fathername']);
		$email = stripslashes($_POST['email']);
		$phone = stripslashes($_POST['phone']);
		$date = stripslashes($_POST['date']);
		$city = stripslashes($_POST['city']);
		$sex = stripslashes($_POST['sex']);
		$vk = stripslashes($_POST['vk']);
		$inst = stripslashes($_POST['inst']);
		$uni = stripslashes($_POST['uni']);
		$faculty = stripslashes($_POST['faculty']);
		$year = stripslashes($_POST['year']);
		$level = stripslashes($_POST['level']);
		$iswimExp = $_POST['iswimExp'];
		$meaning = stripslashes($_POST['meaning']);
		$agree = stripslashes($_POST['agree']);
		$subscribe = stripslashes($_POST['subscribe']);
		$subject = stripslashes($_POST['surname']);
		$error = '';	
		$message = '
			<html>
					<head>
							<title>Заявка</title>
					</head>
					<body>
							<p>Имя: '.$name.'</p>
							<p>Фамилия: '.$surname.'</p>
							<p>Отчество: '.$fathername.'</p>	
							<p>Email: '.$email.'</p>
							<p>Телефон: '.$phone.'</p>
							<p>Дата: '.$date.'</p>
							<p>Город: '.$city.'</p>
							<p>Пол: '.$sex.'</p>
							<p>Ссылка на Вконтакте: '.$vk.'</p>
							<p>Ссылка на Instagram: '.$inst.'</p>
							<p>Универ: '.$uni.'</p>
							<p>Факультет: '.$faculty.'</p>
							<p>Курс: '.$year.'</p>
							<p>Англ: '.$level.'</p>
							<p>Опыт: '.$iswimExp.'</p>
							<p>Про наш девиз: '.$meaning.'</p>
							<p>Обработка инфы: '.$agree.'</p>
							<p>Разрешение на рассылку: '.$subscribe.'</p>
					</body>
			</html>';
		// если в заголовках есть русские буквы - то их нужно кодировать, т.к. 
		// в Content-Type задаётся только кодировка тела, которое может быть отослано в любой кодировке.
		// это необходимо для нормлаьного отображения в OUTLOOK и THE BAT 
		$name = '=?UTF-8?B?'.base64_encode($name).'?='; 
		$subject = '=?UTF-8?B?'.base64_encode($subject).'?='; 
		if (!ValidateEmail($email)){
			$error = '<p class="bg-danger">Email введен неправильно!</p>';
		}
		if(!$error){
			$mail = mail(VOLUNTEER_FORM, $subject, $message,
			     "From: ".$name." <".$email.">\r\n"
			    ."Reply-To: ".$email."\r\n"
			    ."Content-type: text/html; charset=utf-8 \r\n"
			    ."X-Mailer: PHP/" . phpversion());
			if($mail){
				echo 'OK';
			}
		}else{
			echo '<div class="bg-danger">'.$error.'</div>';
		}
	}
?>