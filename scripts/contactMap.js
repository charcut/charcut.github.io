function contactMap_ready() {
	var mapcentre = new GLatLng(51.044921,-114.063202);
	if (GBrowserIsCompatible()) {
		var map = new GMap2(document.getElementById("mapContact"));
		map.setCenter(mapcentre, 15);
		map.addControl(new GSmallMapControl());
		map.addControl(new GMapTypeControl());

		var myIcon = new GIcon();
		myIcon.image = 'assets/images/markers/image.png';
		myIcon.printImage = 'assets/images/markers/printImage.gif';
		myIcon.mozPrintImage = 'assets/images/markers/mozPrintImage.gif';
		myIcon.iconSize = new GSize(106,48);
		myIcon.shadow = 'assets/images/markers/shadow.png';
		myIcon.transparent = 'assets/images/markers/transparent.png';
		myIcon.shadowSize = new GSize(130,48);
		myIcon.printShadow = 'assets/images/markers/printShadow.gif';
		myIcon.iconAnchor = new GPoint(53,48);
		myIcon.infoWindowAnchor = new GPoint(53,0);
		myIcon.imageMap = [105,0,105,1,105,2,105,3,105,4,105,5,105,6,105,7,105,8,105,9,105,10,105,11,105,12,105,13,105,14,105,15,105,16,105,17,105,18,105,19,105,20,105,21,105,22,105,23,105,24,105,25,105,26,105,27,105,28,105,29,105,30,105,31,105,32,105,33,105,34,105,35,58,38,58,39,58,40,57,41,56,42,55,43,55,44,54,45,53,46,53,47,52,47,51,46,51,45,50,44,49,43,49,42,48,41,47,40,47,39,47,38,0,35,0,34,0,33,0,32,0,31,0,30,0,29,0,28,0,27,0,26,0,25,0,24,0,23,0,22,0,21,0,20,0,19,0,18,0,17,0,16,0,15,0,14,0,13,0,12,0,11,0,10,0,9,0,8,0,7,0,6,0,5,0,4,0,3,0,2,0,1,0,0];



		var marker01 = new GMarker(mapcentre,myIcon);
		map.addOverlay(marker01);

	}
	window.onunload = GUnload;
 }