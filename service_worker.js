// Set the default redirect preference to true
let redirect = true;

const icons = {
	enabled: {
		"8":"icons/icon-on_8.png",
		"16":"icons/icon-on_16.png",
		"32":"icons/icon-on_32.png",
		"64":"icons/icon-on_64.png",
		"128":"icons/icon-on_128.png"
	},
	disabled: {
		"8":"icons/icon-off_8.png",
		"16":"icons/icon-off_16.png",
		"32":"icons/icon-off_32.png",
		"64":"icons/icon-off_64.png",
		"128":"icons/icon-off_128.png"
	}
}

// Listen for the "commands" event and toggle the redirect preference when the user executes the "toggle-redirect" command
chrome.commands.onCommand.addListener(function(command) {
  if (command === "toggle-redirect") {
    toggleRedirect();
  }
});

// Toggle the redirect preference and update the browser icon
function toggleRedirect() {
  redirect = !redirect;
  console.log("Redirect preference toggled. Redirect is now " + redirect);
  if (redirect)
	chrome.declarativeNetRequest.updateEnabledRulesets({enableRulesetIds:["star_citizen_redirect"]}, () => {});
  else 
	chrome.declarativeNetRequest.updateEnabledRulesets({disableRulesetIds:["star_citizen_redirect"]}, () => {});
  
  let path = redirect ? icons.enabled: icons.disabled;
  chrome.action.setIcon({path: path});
}
