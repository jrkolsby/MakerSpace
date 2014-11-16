<?
	include "../../credentials.php";
	$link = mysqli_connect("localhost",$credentials['user'],$credentials['pass'],$credentials['db_name']) or die("Error " . mysqli_error($link));

	switch ($_GET['protocol']) {
		case "removePerson":
			$id = $_GET['id'];
			$query = "DELETE from members WHERE id = '$id'";
			$result = mysqli_query($link, $query) or die(mysqli_error());
			break;
		case "addPerson":
			$email = $_GET['email'];
			$query = "INSERT INTO members (email) VALUES('$email')";
			$result = mysqli_query($link, $query) or die(mysqli_error());
			break;
		case "updatePerson":
			$id = $_GET['id'];
			$email = $_GET['email'];
			$query = "UPDATE members SET email='$email' WHERE id='$id'";
			$result = mysqli_query($link, $query) or die(mysqli_error());
		case "getPeople":
			$query = "SELECT * from members ORDER BY id";
			$result = mysqli_query($link, $query) or die(mysqli_error());
			$amount = mysql_num_rows($result);
			if ($amount == 0) {
				print '{"people": []}';
			} else {
				$i = 0;
				print '{"people": [';
				while($row = mysql_fetch_array($result)){
					if ($i==0) {$i += 1;} else { print "},";};
					$email = $row['email'];
					$id = $row['id'];
					print "{";
					print '"email": "'.$email.'", "id": "'.$id.'"';
				}
				print "}";
				print "]}";
			}
			break;
		case "sendMessage":
			include "mandrill/Mandrill.php";
			try {
				$mandrill = new Mandrill('uMSSDfdxNAa7LHd47zMFAg');
				$name = $_GET['name'];
				$subject = $_GET['subject'];
				$message_text = $_GET['message'];
				$message = array(
					'html' => $message_text, //Put message text into an email template
					'text' => $message_text,
					'subject' => $subject,
					'from_email' => 'jrkolsby@mac.com', //Get logged in user's email address
					'from_name' => $name,
					'to' => array(
						array(
							'email' => 'recipient.email@example.com',
							'name' => 'Recipient Name',
							'type' => 'to'
						)
					),
					'headers' => array('Reply-To' => 'message.reply@example.com'), //Get logged in user's email address
					'important' => false,
					'track_opens' => null,
					'track_clicks' => null,
					'auto_text' => null,
					'auto_html' => null,
					'inline_css' => null,
					'url_strip_qs' => null,
					'preserve_recipients' => null,
					'view_content_link' => null,
					'bcc_address' => 'message.bcc_address@example.com',
					'tracking_domain' => null,
					'signing_domain' => null,
					'return_path_domain' => null,
					'merge' => true,
					'merge_language' => 'mailchimp',
					'global_merge_vars' => null,
					'merge_vars' => null, //Personalizes email with merge tags: http://bit.ly/1zjBhLl
					'tags' => array('password-resets'),
					'subaccount' => 'customer-123',
					'google_analytics_domains' => array('example.com'),
					'google_analytics_campaign' => 'message.from_email@example.com',
					'metadata' => array('website' => 'www.example.com'),
					'recipient_metadata' => array(
						array(
							'rcpt' => 'recipient.email@example.com',
							'values' => array('user_id' => 123456)
						)
					),
					'attachments' => array(
						array(
							'type' => 'text/plain',
							'name' => 'myfile.txt',
							'content' => 'ZXhhbXBsZSBmaWxl'
						)
					),
					'images' => array(
						array(
							'type' => 'image/png',
							'name' => 'IMAGECID',
							'content' => 'ZXhhbXBsZSBmaWxl'
						)
					)
				);
				$async = false;
				$ip_pool = 'Main Pool';
				$send_at = 'example send_at';
				$result = $mandrill->messages->send($message, $async, $ip_pool, $send_at);
				print_r($result);
			} catch(Mandrill_Error $e) {
				echo 'A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage();
				throw $e;
			}

			break;
	}
?>