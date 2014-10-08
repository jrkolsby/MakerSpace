<!DOCTYPE html>
<?php
	include "credentials.php";
	$link = mysql_connect('localhost', $credentials['user'], $credentials['pass']); 
	if (!$link) { 
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db($credentials['db_name']);
?>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="description" content="">
		<meta name="keywords" content="">
		<meta name="author" content="">
		<title>Mail</title>
		<link rel="stylesheet" type="text/css" href="css/html5.css">
		<link rel="stylesheet" type="text/css" href="css/main.css">
		<script type='text/javascript' src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
		<script src="js/main.js" type="text/javascript"></script>
	</head>
	<body>
		<header>
			<div id="logo"></div>
		</header>
		<section id="container">
			<section id="members">
				<h1>Members</h1>
				<div id="people">
					<?php
						$query = "SELECT * from members";
						$result = mysql_query($query) or die(mysql_error());	
						while($row = mysql_fetch_array($result)){
							$email = $row['email'];
							print "<input class='person' value='$email'>";
						}
					?>
					<div id="add">+ Add Member</div>
					<div id="delete"></div>
				</div>
			</section>
			<section id="compose">
				<h1>Compose Mail</h1>
				<textarea></textarea>
				<button>Send</button>
			</section>
		<br><div id="messagevalue" style="position: absolute; bottom: 100px;">.</div>
		</section>
	</body>
</html>