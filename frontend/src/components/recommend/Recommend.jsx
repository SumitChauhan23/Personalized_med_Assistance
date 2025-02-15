import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Recommend() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    // Request location permission when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          initializeMap(latitude, longitude);
        },
        (error) => {
          setError("Please enable location access to see nearby hospitals and medical stores.");
          console.error("Error getting location:", error);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  const initializeMap = (latitude, longitude) => {
    const googleMap = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: latitude, lng: longitude },
      zoom: 14
    });

    // Add user's location marker
    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: googleMap,
      title: 'Your Location',
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      }
    });

    setMap(googleMap);
  };

  const searchNearbyPlaces = (location) => {
    if (!map || !location) return;
    setLoading(true);

    const service = new window.google.maps.places.PlacesService(map);
    const searchTypes = ['hospital', 'pharmacy'];
    let allPlaces = [];

    const searchPromises = searchTypes.map(type => {
      return new Promise((resolve) => {
        service.nearbySearch(
          {
            location: location,
            radius: 5000, // 5km radius
            type: type
          },
          (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              resolve(results);
            } else {
              resolve([]);
            }
          }
        );
      });
    });

    Promise.all(searchPromises)
      .then(results => {
        allPlaces = results.flat();
        
        // Clear existing markers
        places.forEach(place => place.marker.setMap(null));
        
        // Create new markers and info windows
        const newPlaces = allPlaces.map(place => {
          const marker = new window.google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name,
            icon: {
              url: place.types.includes('hospital') 
                ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            }
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div>
                <h3 style="font-weight: bold;">${place.name}</h3>
                <p>${place.vicinity}</p>
                <p>Rating: ${place.rating ? `${place.rating}/5` : 'N/A'}</p>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          return {
            ...place,
            marker,
            infoWindow
          };
        });

        setPlaces(newPlaces);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error searching nearby places:', error);
        setError('Error finding nearby places. Please try again.');
        setLoading(false);
      });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/disease', { params: { disease: searchQuery } });
      setDiseaseInfo(response.data);
      setError(null);
    } catch (err) {
      setError("Disease not found.");
      setDiseaseInfo(null);
    }
  };

  const handleLocationSearch = (e) => {
    e.preventDefault();

    if (!locationQuery.trim()) return; // Avoid empty searches

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: locationQuery }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const location = results[0].geometry.location;
        const latitude = location.lat();
        const longitude = location.lng();

        // Update the userLocation with the new location
        setUserLocation({ lat: latitude, lng: longitude });

        // Re-center the map on the new location
        if (map) {
          map.setCenter(location);
          map.setZoom(14);
        }

        // Add a new marker for the searched location
        new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map,
          title: 'Searched Location',
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }
        });

        // Fetch nearby places based on the new location
        searchNearbyPlaces({ lat: latitude, lng: longitude });
      } else {
        setError("Location not found.");
      }
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow p-4 bg-gray-100 rounded-lg shadow-inner overflow-y-auto">
        <form onSubmit={handleSearch} className="mb-4 flex items-center mx-auto max-w-7xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a disease..."
            className="w-3/4 p-2 border border-gray-300 rounded-md"
          />
          <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Search
          </button>
        </form>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {diseaseInfo && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <h3 className="text-lg font-bold text-blue-600">How to Prevent</h3>
              <ul className="mt-2">
                {diseaseInfo.prevention.map((item, index) => (
                  <li key={index} className="ml-4 list-disc">{item}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <h3 className="text-lg font-bold text-blue-600">Popular Medicines</h3>
              <ul className="mt-2">
                {diseaseInfo.medicines.map((item, index) => (
                  <li key={index} className="ml-4 list-disc">{item}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <h3 className="text-lg font-bold text-blue-600">Home Remedies</h3>
              <ul className="mt-2">
                {diseaseInfo.homeRemedies.map((item, index) => (
                  <li key={index} className="ml-4 list-disc">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-blue-600 mb-4">Nearby Hospitals and Medical Stores</h3>
          
          {/* Location search bar */}
          <form onSubmit={handleLocationSearch} className="mb-4 flex items-center">
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="Enter a location..."
              className="w-1/2 p-2 border border-gray-300 rounded-md"
            />
            <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Search Location
            </button>
            <button
              onClick={() => searchNearbyPlaces(userLocation)}
              disabled={!userLocation || loading}
              className={`ml-2 p-2 text-white rounded-md ${
                !userLocation || loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {loading ? 'Searching...' : 'Get List of Nearby Hospitals and Medical Stores'}
            </button>
          </form>

          <div 
            id="map" 
            className="w-full h-[400px] mb-4 rounded-lg"
          ></div>
          
          {places.length > 0 && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Found Places:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {places.map((place, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-gray-50">
                    <h5 className="font-bold">{place.name}</h5>
                    <p className="text-sm text-gray-600">{place.vicinity}</p>
                    <p className="text-sm">
                      Rating: {place.rating ? `${place.rating}/5` : 'N/A'}
                    </p>
                    <p className="text-sm text-blue-600">
                      {place.types.includes('hospital') ? 'Hospital' : 'Medical Store'}
                    </p>
                    {place.types.includes('hospital') && (
                      <button 
                        onClick={() => navigate(`/book-appointment/${place.name}`)}
                        className="mt-2 p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Book Appointment
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recommend;