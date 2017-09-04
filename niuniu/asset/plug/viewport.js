
var phoneWidth = parseInt(window.screen.width);
var phoneScale = phoneWidth / 1280;
var ua = navigator.userAgent;
if (/Android (\d+\.\d+)/.test(ua)) {
	var version = parseFloat(RegExp.$1);
	if (version > 2.3) {
		document.write('<meta name="viewport" content="width=1280, minimum-scale = ' + phoneScale + ', maximum-scale = 1, target-densitydpi=device-dpi">');
	} else {
		document.write('<meta name="viewport" content="width=1280, target-densitydpi=device-dpi">');
	}
} else {
	document.write('<meta name="viewport" content="width=1280, user-scalable=no, target-densitydpi=device-dpi">');
}