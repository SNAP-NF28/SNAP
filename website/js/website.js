/** website.js **/

$(document).ready(function () {
  toggle(false);
});

/** Toggle en/fr **/
function toggle(bool) {
	if (bool) { /* English */
		console.log("english spoken here");
		$(".fra").hide();
		$(".eng").show();
	} else { /* Francais */
		console.log("on parle francais ici");
		$(".eng").hide();
		$(".fra").show();
	}

}

