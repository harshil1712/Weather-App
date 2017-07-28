function skycons() {
	var i,
			icons = new Skycons({
				"color" : "#FFFFFF",
				"resizeClear": true // nasty android hack
			}),
			list  = [ // listing of all possible icons
				"clear-day",
				"clear-night",
				"partly-cloudy-day",
				"partly-cloudy-night",
				"cloudy",
				"rain",
				"sleet",
				"snow",
				"wind",
				"fog"
			];

	// loop thru icon list array
	for(i = list.length; i--;) {
		var weatherType = list[i], // select each icon from list array
				// icons will have the name in the array above attached to the
				// canvas element as a class so let's hook into them.
				elements    = document.getElementsByClassName( weatherType );

		// loop thru the elements now and set them up
		for (e = elements.length; e--;) {
			icons.set(elements[e], weatherType);
		}
	}

	// animate the icons
	icons.play();
};
$(document).ready(function(){  
	var lat,lon,city,country,tempC,imgURL,iconId,len;
	navigator.geolocation.getCurrentPosition(success);
	function success(position){
		lat =position.coords.latitude;
		lon =position.coords.longitude;
		$.ajax({
      type:"POST",
      dataType:"jsonp",
      url:"https://api.darksky.net/forecast/d67f09229fb065e555e3e0ac15339a33/"+lat+","+lon,
      success:function(data){
        //console.log(data);
        tempF=Math.round(data.currently.apparentTemperature);
        tempC=Math.round((tempF-32)*(5/9));
        iconId=data.currently.icon;
        //console.log(tempF,tempC,iconId); 
        document.getElementById('someBox').innerHTML='<canvas class="'+iconId+'" width="64" height="64"></canvas>';
        skycons();
        
        $('#img').html("<img src='"+imgURL+"'>");
        $('.temp').html(Math.round(tempC)+"&deg;C");
        $('button').click(function(){
              if($(this).text() == 'CONVERT TO °F'){
                $(this).text('CONVERT TO °C');
                $('.temp').html(tempF +'&deg;F');
              }
                else{
                $(this).text('CONVERT TO °F');
                  $('.temp').html(Math.round(tempC) +'&deg;C');
                }
          });
        
      }
		});
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&key=AIzaSyBsDbqVAzqngLBcSzVZatTRbM8qU3OWth8",function(location){
      len=location.results[0].address_components.length;
      city=location.results[0].address_components[len-5].long_name;
      country=location.results[0].address_components[len-2].short_name;
	  $('.location').html(city+","+country);
	  console.log(location);
  	})
  }
})