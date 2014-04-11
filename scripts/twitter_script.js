$(document).ready(function() {
				$("#twitter").getTwitter({
					userName: "CHARCUT",
					numTweets: 1,
					loaderText: "Loading tweets... Please wait",
					slideIn: true,
					slideDuration: 750,
					showHeading: false,
					showProfileLink: false,
					showTimestamp: true
				});
			});