<div class="container">
    <div class="options-box">
      <h1>Clothing Stores in Cleveland, OH</h1>
      <div>
        <input id="show-listings" type="button" value="Show Listings">
        <input id="hide-listings" type="button" value="Hide Listings">
        <hr>
        <span class="text"> Draw a shape to search within it for stores</span>
        <input id="toggle-drawing" type="button" value="Drawing Tools">
      </div>
      <hr>
      <div>
        <input id="zoom-to-area-text" type="text" placeholder="Enter an area">
        <input id="zoom-to-area" type="button" value="Zoom">
      </div>
      <hr>
      <div>
        <span class="text"> Within </span>
        <select id="max-duration">
            <option value="10">10 min</option>
            <option value="15">15 min</option>
            <option value="30">30 min</option>
            <option value="60">1 hour</option>
          </select>
        <select id="mode">
            <option value="DRIVING">drive</option>
            <option value="WALKING">walk</option>
            <option value="BICYCLING">bike</option>
            <option value="TRANSIT">transit ride</option>
          </select>
        <span class="text">of</span>
        <input id="search-within-time-text" type="text" placeholder="Ex: Tower City or 230 West Huron Road, Cleveland Ohio">
        <input id="search-within-time" type="button" value="Go">
      </div>
    </div>
    <div id="map"></div>
  </div>
  <script>
    var map;
    var markers = [];
    var polygon = null;

    function initMap() {
      var styles = [{
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#C5E3BF"
          }]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
              "lightness": 100
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#D1D1B8"
          }]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
              "visibility": "on"
            },
            {
              "color": "#C6E2FF"
            }
          ]
        }
      ]
      map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 41.4971659,
          lng: -81.6940644
        },
        zoom: 12,
        styles: styles,
        mapTypeControl: false
      });
      var locations = [{
          title: 'XHIBITION',
          location: {
            lat: 41.4832899,
            lng: -81.7029819
          }
        },
        {
          title: 'Krush',
          location: {
            lat: 41.4984484,
            lng: -81.70052249999999
          }
        },
        {
          title: 'Wild Cactus Botique',
          location: {
            lat: 41.4824947,
            lng: -81.70213369
          }
        },
        {
          title: 'Girl Next Door',
          location: {
            lat: 41.4832726,
            lng: -81.83338879
          }
        },
        {
          title: 'CLE Clothing Company',
          location: {
            lat: 41.4995145,
            lng: -81.69042750000001
          }
        },
        {
          title: 'Turnstyle Botique',
          location: {
            lat: 41.4836669,
            lng: -81.73058
          }
        },
        {
          title: 'Rainbow Shops',
          location: {
            lat: 41.4504607,
            lng: -81.8159015
          }
        },
        {
          title: 'Evie Lou',
          location: {
            lat: 41.4780139,
            lng: -81.6822763
          }
        },
        {
          title: 'Geigers Downtown Cleveland',
          location: {
            lat: 41.5002646,
            lng: -81.68546540000001
          }
        },
        {
          title: 'Banyan Tree',
          location: {
            lat: 41.4813669,
            lng: -81.6867716
          }
        },
        {
          title: 'Brooks Brothers',
          location: {
            lat: 41.4971659,
            lng: -81.6940644
          }
        },
        {
          title: 'Fresh Brewed Tees',
          location: {
            lat: 41.486125,
            lng: -81.7058468
          }
        },
        {
          title: 'Citi Trends',
          location: {
            lat: 41.4677337,
            lng: -81.6515826
          }
        },
        {
          title: 'K & G Fashion Superstore',
          location: {
            lat: 41.4607493,
            lng: -81.6883835
          }
        },
        {
          title: 'Work Smart Clothing Factory',
          location: {
            lat: 41.46174970000001,
            lng: -81.76866179999999
          }
        },
        {
          title: 'Future No Future Vintage Clothing',
          location: {
            lat: 41.4854414,
            lng: -81.8095952
          }
        },
        {
          title: 'LOFT',
          location: {
            lat: 41.48189139999999,
            lng: -81.8374608
          }
        },
        {
          title: 'Underground by Journeys',
          location: {
            lat: 41.4971659,
            lng: -81.6940644
          }
        },
        {
          title: 'GV Art and Design',
          location: {
            lat: 41.485585,
            lng: -81.81651800000002
          }
        },
        {
          title: 'Only In Clev',
          location: {
            lat: 41.449895,
            lng: -81.81619999999999
          }
        },
        {
          title: 'We Bleed Cle',
          location: {
            lat: 41.500142,
            lng: -81.6897226
          }
        }
      ];
      var timeAutocomplete = new google.maps.places.Autocomplete(
            document.getElementById('search-within-time-text'));
        
        var zoomAutocomplete = new google.maps.places.Autocomplete(
            document.getElementById('zoom-to-area-text'));
        
        zoomAutocomplete.bindTo('bounds', map);
        
        var searchBox = new google.maps.places.SearchBox(
            document.getElementById('places-search'));
        
        searchBox.setBounds(map.getBounds());
      var largeInfowindow = new google.maps.InfoWindow();
      var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_LEFT,
          drawingModes: [
            google.maps.drawing.OverlayType.POLYGON
          ]
        }
      });
      var defaultIcon = makeMarkerIcon('0091ff');
      var highlightedIcon = makeMarkerIcon('FFFF24');
      for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        var marker = new google.maps.Marker({
          position: position,
          title: title,
          animation: google.maps.Animation.DROP,
          icon: defaultIcon,
          id: i
        });
        markers.push(marker);
        marker.addListener('click', function() {
          populateInfoWindow(this, largeInfowindow);
        });
        marker.addListener('mouseover', function() {
          this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
          this.setIcon(defaultIcon);
        });
      }
      document.getElementById('show-listings').addEventListener('click', showListings);
      document.getElementById('hide-listings').addEventListener('click', hideListings);
      document.getElementById('toggle-drawing').addEventListener('click', function() {
        toggleDrawing(drawingManager);
      });
      document.getElementById('zoom-to-area').addEventListener('click', function() {
        zoomToArea();
      });
      document.getElementById('search-within-time').addEventListener('click', function() {
        searchWithinTime();
      });
      drawingManager.addListener('overlaycomplete', function(event) {
        if (polygon) {
          polygon.setMap(null);
          hideListings();
        }
        drawingManager.setDrawingMode(null);
        polygon = event.overlay;
        polygon.setEditable(true);
        searchWithinPolygon();
        polygon.getPath().addListener('set_at', searchWithinPolygon);
        polygon.getPath().addListener('insert_at', searchWithinPolygon);
      });
    }

    function populateInfoWindow(marker, infowindow) {
      if (infowindow.marker != marker) {
        infowindow.setContent('');
        infowindow.marker = marker;
        infowindow.addListener('closeclick', function() {
          infowindow.marker = null;
        });
        var streetViewService = new google.maps.StreetViewService();
        var radius = 50;

        function getStreetView(data, status) {
          if (status == google.maps.StreetViewStatus.OK) {
            var nearStreetViewLocation = data.location.latLng;
            var heading = google.maps.geometry.spherical.computeHeading(
              nearStreetViewLocation, marker.position);
            infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
            var panoramaOptions = {
              position: nearStreetViewLocation,
              pov: {
                heading: heading,
                pitch: 30
              }
            };
            var panorama = new google.maps.StreetViewPanorama(
              document.getElementById('pano'), panoramaOptions);
          } else {
            infowindow.setContent('<div>' + marker.title + '</div>' +
              '<div>No Street View Found</div>');
          }
        }
        streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
        infowindow.open(map, marker);
      }
    }

    function showListings() {
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
      }
      map.fitBounds(bounds);
    }

    function hideListings() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
    }

    function makeMarkerIcon(markerColor) {
      var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
      return markerImage;
    }

    function toggleDrawing(drawingManager) {
      if (drawingManager.map) {
        drawingManager.setMap(null);
        if (polygon !== null) {
          polygon.setMap(null);
        }
      } else {
        drawingManager.setMap(map);
      }
    }

    function searchWithinPolygon() {
      for (var i = 0; i < markers.length; i++) {
        if (google.maps.geometry.poly.containsLocation(markers[i].position, polygon)) {
          markers[i].setMap(map);
        } else {
          markers[i].setMap(null);
        }
      }
    }

    function zoomToArea() {
      var geocoder = new google.maps.Geocoder();
      var address = document.getElementById('zoom-to-area-text').value;
      if (address == '') {
        window.alert('You must enter an area or address.');
      } else {
        geocoder.geocode({
          address: address,
          componentRestrictions: {
            locality: 'Ohio'
          }
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(15);
          } else {
            window.alert('Location not found - enter a more' + 'specific place.');
          }
        });
      }
    }

    function searchWithinTime() {
      var distanceMatrixService = new google.maps.DistanceMatrixService;
      var address = document.getElementById('search-within-time-text').value;
      if (address == '') {
        window.alert('You must enter an address.');
      } else {
        hideListings();
        var origins = [];
        for (var i = 0; i < markers.length; i++) {
          origins[i] = markers[i].position;
        }
        var destination = address;
        var mode = document.getElementById('mode').value;
        distanceMatrixService.getDistanceMatrix({
          origins: origins,
          destinations: [destination],
          travelMode: google.maps.TravelMode[mode],
          unitSystem: google.maps.UnitSystem.IMPERIAL,
        }, function(response, status) {
          if (status !== google.maps.DistanceMatrixStatus.OK) {
            window.alert('Error was: ' + status);
          } else {
            displayMarkersWithinTime(response);
          }
        });
      }
    }

    function displayMarkersWithinTime(response) {
      var maxDuration = document.getElementById('max-duration').value;
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
      var atLeastOne = false;
      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          if (element.status === "OK") {
            var distanceText = element.distance.text;
            var duration = element.duration.value / 60;
            var durationText = element.duration.text;
            if (duration <= maxDuration) {
              markers[i].setMap(map);
              atLeastOne = true;
              var infowindow = new google.maps.InfoWindow({
                content: durationText + ' away, ' + distanceText
              });
              infowindow.open(map, markers[i]);
              markers[i].infowindow = infowindow;
              google.maps.event.addListener(markers[i], 'click', function() {
                this.infowindow.close();
              });
            }
          }
        }
      }
      if (!atLeastOne) {
        window.alert('We could not find any locations within that distance!');
      }
    }