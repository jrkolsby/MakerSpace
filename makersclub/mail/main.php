<?
	include "credentials.php";
	$link = mysql_connect('localhost', $credentials['user'], $credentials['pass']);
	if (!$link) {
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db($credentials['db_name']);

	switch ($_GET['protocol']) {
		case "removePerson":
			$id = $_GET['id'];
			$query = "DELETE from members WHERE id = '$id'";
			$result = mysql_query($query) or die(mysql_error());
			break;
		case "addPerson":
			$email = $_GET['email'];
			$query = "INSERT INTO members (email) VALUES('$email')";
			$result = mysql_query($query) or die(mysql_error());
			break;
		case "updatePerson":
			$id = $_GET['id'];
			$email = $_GET['email'];
			$query = "UPDATE members SET email='$email' WHERE id='$id'";
			$result = mysql_query($query) or die(mysql_error());
		case "getPeople":
			$query = "SELECT * from members ORDER BY name";
			$result = mysql_query($query) or die(mysql_error());
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
	}
?>