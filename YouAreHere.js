/******************************************************************************
 * 
 * DESCRIPTION:
 * ' YouAreHere ' java script shows your current loaction and shows ten nearest
 *   places according to the search. 
 *   
 * REQUIRES:
 *   index.html
 *   YouAreHere.css
 *   TermsOfUseAndPrivacyPolicy.html
 *	 TermsOfUseAndPrivacyPolicy.css
 *   
 *  LIBRARIES:
 *   "http://maps.googleapis.com/maps/api/js?libraries=places"
 *   "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"
 *   
 *   REVISION INFORMATION:
 *   	Revision: 	ver 1.0 
 *   	Date:    	2014-11-16
 *   	Author:   	Ismo Paukamainen
 *   
 *******************************************************************************/



//********************* DECLARATION ***************************************
 var map;
 var service;
 var currentPosition;
 var position;
 var types;
 var n;
 var dataCollected;
 
 
 //--Timeout in millisecondesfor getCurrentPosion, uses GPS by default, set by enableHighAccuracy: true 
 var geoOptions = {
	     timeout: 60 * 1000, enableHighAccuracy: true 
	  };
 
 // An array for google maps markers
 var markersArray = [];
 
 
//Arrays for search result 'placeId', 'name' and 'vicinity'
 var placeId=[];
 var placeName=[];
 var placeVicinity=[];
 var placeWebsite=[];
 var placeList=[];
 
 
 
 
 
 //-----------------------------------------------------------
//   button definitions
 //-----------------------------------------------------------

 //--title strings--
 var search_title  = new Array (
		 "Restaurant",
		 "Bar",
		 "Cafe",
		 "Gas Station",
		 "Pharmacy"		 
 );
 
//--types strings--
 var search_type  = new Array (
		 "restaurant",
		 "bar",
		 "cafe",
		 "gas_station",
		 "pharmacy"
 );
 
 
 
 //-----------------------------------------------------------
 // icon images shown on the map
 //-----------------------------------------------------------
 var icon_png = new Array (	
		    "images/number_1.png",
		    "images/number_2.png",
		    "images/number_3.png",
		    "images/number_4.png",
		    "images/number_5.png",
		    "images/number_6.png",
		    "images/number_7.png",
		    "images/number_8.png",
		    "images/number_9.png",
		    "images/number_10.png"
		   
		);
 
 // Marker for the current location. Default used instead at the moment. 
 // See function success.
 // var YouAreHere =  "images/YouAreHere.png";
 
 //*********************END OF DECLARATION *********************************
 
 
 

//----------------Initiation---------------------------------------------------------------------
//----------------When the document is fully loaded the map may be initialized------------------
$(document).ready(function()
{
	navigator.geologation.getCurrentPosition(initialize);	
	
});
 
 function initialize(position)
{	 
	    if( navigator.geolocation )
	    {
	    	// GPS prioritized. It might take some time to serch satellite, or if GPS not available then use cell data.
	    	 var table = document.getElementById("results");
	 	    // row(-1) adds a row in the last position of the table
	 	    var row = table.insertRow(-1);
	 	    	var cell0 = row.insertCell(0);
	 	    	var cell1 = row.insertCell(1);
	 	    	
	 	       cell1.innerHTML = "Searching for your location....... ";
	    	
	      // http://www.w3.org/TR/2012/PR-geolocation-API-20120510/
	      // Call getCurrentPosition with success and failure callbacks with timeout
	     // In a case of ERROR the function positionError is called.
	         navigator.geolocation.getCurrentPosition( success, positionError, geoOptions);
		}
		else
		{
	      // Location detection not supported
	      positionError(-1);
		}
}
 
 
// Fetching the current location from the service is ok. Not e.g. DENIED because of the browser settings.
function success(position)
{
	//Location found, clear the 'serach satellite' text
	if (document.getElementById("results").rows.length>0){	
		clearTable();		
	} 
	
	
	currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	var mapOptions={
					zoom:12,
					center:currentPosition,	
					 mapTypeControl: false,
                     navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                     mapTypeId: google.maps.MapTypeId.ROADMAP
					};
	
	// Create the map, and place it in the map_canvas div
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    
    
    //This keeps your location in the center when the size of the page is changed.
    window.addEventListener("resize",function() {
        map.setCenter(currentPosition);
      });
    
    
    // Place the initial marker
    var marker = new google.maps.Marker({
             position: currentPosition,
              map: map,
            /**  icon: YouAreHere,  default icon is used **/
              title: "Your are here!"
    });  
      
}

function setMenu(n){
	 // Mark the 'button' which was pressed with grey background color, set the rest as they originally were
	 switch (n) {
	    case 0:
	    	document.getElementById("cell1").style.backgroundColor = "grey";
	    	document.getElementById("cell2").style.backgroundColor = '#ddedf4';
	    	document.getElementById("cell3").style.backgroundColor = '#ddedf4';
	    	document.getElementById("cell4").style.backgroundColor = '#ddedf4';
	    	document.getElementById("cell5").style.backgroundColor = '#ddedf4';
	        break;
	        
	    case 1:
	    	document.getElementById("cell1").style.backgroundColor = '#ddedf4';
	    	document.getElementById("cell2").style.backgroundColor = "grey";
	    	document.getElementById("cell3").style.backgroundColor = '#ddedf4';
	    	document.getElementById("cell4").style.backgroundColor = '#ddedf4';
	    	document.getElementById("cell5").style.backgroundColor = '#ddedf4';
	        break;
	        
	    case 2:
	    	
	    	document.getElementById("cell1").style.backgroundColor = '#ddedf4';
	    	document.getElementById("cell2").style.backgroundColor = '#ddedf4';
	    	document.getElementById("cell3").style.backgroundColor = "grey";
	    	document.getElementById("cell4").style.backgroundColor = '#ddedf4';
	    	document.getElementById("cell5").style.backgroundColor = '#ddedf4';
	        break;
	        
	    case 3:
	    	
	    	document.getElementById("cell1").style.backgroundColor = '#ddedf4';
	    	document.getElementById("cell2").style.backgroundColor = '#ddedf4';
	    	document.getElementById("cell3").style.backgroundColor = '#ddedf4';
	    	document.getElementById("cell4").style.backgroundColor = "grey";
	    	document.getElementById("cell5").style.backgroundColor = '#ddedf4';
	        break;
	        
	    case 4:
	    	
	    	document.getElementById("cell1").style.backgroundColor = '#ddedf4';
	    	document.getElementById("cell2").style.backgroundColor = '#ddedf4';
	    	document.getElementById("cell3").style.backgroundColor = '#ddedf4';
	    	document.getElementById("cell4").style.backgroundColor = '#ddedf4';
	    	document.getElementById("cell5").style.backgroundColor = "grey";
	        break;
	        
	    default:
	    	// Sets back the original background color in menu
	    	document.getElementById("cell1").style.backgroundColor = '#ddedf4';
			document.getElementById("cell2").style.backgroundColor = '#ddedf4';
			document.getElementById("cell3").style.backgroundColor = '#ddedf4';
			document.getElementById("cell4").style.backgroundColor = '#ddedf4';
			document.getElementById("cell5").style.backgroundColor = '#ddedf4';
			
	    	break;
	}
	
	
}


//----------------------- Menu clicked ---------------------------- 

function search(n)
{
	// Mark the 'button' which was pressed with grey background color, set the rest as they originally were
	setMenu(n);
	 
	//--- Delete rows in the results -table
	// Deletes all markers in the array by removing references to them
	clearSearch(n);
	
	//search for what is defined in 'search_type' string nearby your current location. 
	placesRequest(search_title[n],currentPosition,[search_type[n]]);
}


//Adds the search title in the 'result' -table.
function insertHeader(n){
	    var table = document.getElementById("results");
	    
	    // row(-1) adds a row in the last position of the table
	    var row = table.insertRow(-1);
	    	var cell0 = row.insertCell(0);
	    	var cell1 = row.insertCell(1);
	    	var cell2 = row.insertCell(2);
	    	
	    	// If everything is to be cleared ('clear' button has been presset) also title and the address need to be cleared 
	    	if (n == 99){
	    		cell1.innerHTML = " ";
	    		cell2.innerHTML = " ";
	    	}
	    	else{
	    		cell1.innerHTML = search_title[n];
		    	cell2.innerHTML = "Address";
	    	 };
	    	
}


//---------------------------------------------------------------------
//          THE MAIN FUNCTION
//-----------------------------------------------------------------------



//Request places from Google
function placesRequest(title,latlng,types)
{	
	
	//Parameters for our places request
	// Sort by distance.
	// 
	dataCollected=0;
	
	var request = {
		location: latlng,
		types: types,
		rankBy: google.maps.places.RankBy.DISTANCE
	};
	
	
	//Make the service call to google
	//--------------------AJAX-------------------------------------
	var callPlaces = new google.maps.places.PlacesService(map);
	callPlaces.search(request, function(results,status){
	
		//Result of the request. The max amount of places is 20, 
		// Due to limited room to show everything
		// the list is limited here max ten items.
		// The result is returned in JASON format.
		//--------------------------------------------------------
		
		$.each(results, function(item,place){	
			 // Ten closest places are marked. i.e. item goes from 0 to 9
			
			if (item < 10 ){
				
			    var thisplace = new google.maps.Marker({
					 map: map,
					 position: place.geometry.location,
 					 icon: icon_png[item],
					 title: place.name					
				 });
			    //Add the marker in the array, so that it can be removed later when needed.
			    markersArray.push(thisplace);
			   
			   //Store data for later use
			   placeList[item] = item;
		  	   placeName[item] = place.name;
		  	   placeVicinity[item]= place.vicinity;
	  	       placeId[item]= place.place_id;
			  
			    // Web address needs to be added. detailRequest is used for that
			   detailsRequest(item, place.place_id);
			
			}
			else{
				// exits 'each' -loop when the amount of itemns is 10
				return false;
			}
			
		})
		
		
	});	
	
	
	
}




//Request details from Google
function detailsRequest(index, placeid)
{	
	
	// Get also detals of the place. This is needed e.g. for website information 
	
	//Make the service call to google
	//--------------------AJAX-------------------------------------
	var service = new google.maps.places.PlacesService(map);
	
    // Place id for the place that was found 
	
    	var requestDetails = {
    			placeId:placeid
        };
    	
    	//Fail counter
    	var i=0;
    	
         service.getDetails(requestDetails, function(details,status){	
        	 if (status=="OK"){
      	     
        		// Insert all the collected data to the table
                insertData(index, details.website);
  
        	 }
        	
        	 else{
        		 // Re- try max 5 times, if getDetails failed
        		 i++;
        		 if (i<6)
        		    {
        			     detailsRequest(index, placeid);
        		     }
        			 else {
        				 return false;
                     }
        
        	 }
            
        });
       
         
  
}
    

//------------------------ Clearing fucntions block ----------------------------------------------
//------------------------------------------------------------------------------------------------

function clearSearch(n){
	//--- Delete rows in the results -table
	if (document.getElementById("results").rows.length>0){	
		clearTable();		
	}
	insertHeader(n);
	
	//Clear the data stores
  	while(placeList.length>0){
  		
  		placeList.pop();
  		placeName.pop();
  		placeVicinity.pop();
  		placeWebsite.pop();
  		placeId.pop();
  	}
	

	// Deletes all markers in the array by removing references to them
	deleteOverlays();
	
	if(n==99){
		setMenu(n);
	};
	
	
}

//Removes items in the 'result' -table before a new search.
//Removes the last row until all rows have been removed.
function clearTable(){		
	do{	
		document.getElementById("results").deleteRow(-1);		
	}
	
	// Let's leave the heading row in the table
	while (document.getElementById("results").rows.length>0);		
}




//--------Marker handling--------------------------------------------------------------------------

// Deletes all markers in the array by removing references to them
function deleteOverlays() {
  if (markersArray) {
	  for (var i=0; i<markersArray.length; i++) {
		  markersArray[i].setMap(null);
		}
    markersArray.length = 0;
  }
}

//--------End of Marker handling--------------------------------------------------------------------------
//--------End of clearing functions block ----------------------------------------------------------------


//-------- New Data to be inserted in the table ---------------------------------------------------------
//-------------------------------------------------------------------------------------------------------


// This function orders items based on the index. Thst is, in the order of the distance
// the nearest first etc.and Adds them then the in thethe 'result' -table.
function insertData(ind,website){
	     var link;
	     var table = document.getElementById("results");
	  
	     // One more item collected.
		 dataCollected++;
		
		 // Store website, the rest is already stored.
		 placeWebsite[ind]=website;
	
		// Data colleted for all places 
       if (dataCollected==placeList.length){
       
		  // Put data in the table in order based on the index.
		  for (i=0;i<placeList.length;i++){
	        // row(-1) adds a row in the last position of the table2
	        var row = table.insertRow(-1);
	    	var cell0 = row.insertCell(0);
	    	var cell1 = row.insertCell(1);
	    	var cell2 = row.insertCell(2);
	    	

	     	cell0.innerHTML = placeList[i]+1; // index
	    	if (placeWebsite[i]!=undefined){	
				link = "<a href=" + placeWebsite[i] +">"+ placeName[i]+"</a>";
				
			}
			else{
				// no web site available, put only place name on th elist
				link = placeName[i];
			};
			cell1.innerHTML = link;
	        cell2.innerHTML = placeVicinity[i];
		  }
	    
	  	
		  // Vibrate couple of times when ready
		//navigator.vibrate([50,10,50]);

	      
	      
		}
    

      
		
		
}
//----------------End Data Inserting section -------------------------------------------------

//-----ERROR HANDLING -------------------------------------------------------------------------
// Fetching the position has failed with error code. Show the error reason in 'results' -table.
function positionError(err)
{
	var msg="";
	switch(err.code){
	case err.UNKNOWN_ERROR: //0
		msg="Unable to find your location.";
		break;
	case err.PERMISSION_DENIED://1
		msg="Permission denied when trying to find your location."
		break;
	case err.POSITION_UNAVAILABLE://2
		msg="Your location is currently unknown";
		break;
	case err.TIMEOUT: //3	
		msg="Timeout when trying to find your location.";
	default:
		msg="Location detection not supported in your browser.";
	
	}
	//-- in a case of error, alert the user about the reason  --
	alert(msg);
}
	




	

