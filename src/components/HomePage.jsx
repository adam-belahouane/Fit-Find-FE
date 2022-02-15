import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import "../styles/homepage.css";
import MarkerDiv from "./markerDiv";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "92.5vh",
};

// { lat: 51.49844507, lng: -0.0774065 },
//     { lat: 51.4895625, lng: -0.07645 },
//     { lat: 51.5020668, lng: -0.12152762 },

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const HomePage = () => {
  const url = process.env.REACT_APP_BE_URL;
  const [markers, setMarkers] = useState([]);

  const [center, setCenter] = useState({
    lat: 51.509865,
    lng: -0.118092,
  });

  const getAllProUsers = async () => {
    try {
      let response = await fetch(url + "/proUser/getAll");
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setMarkers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function success(pos) {
    let crd = pos.coords;

    setCenter({
      lat: crd.latitude,
      lng: crd.longitude,
    });
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
    getAllProUsers();
  }, []);

  if (markers.length === 0) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div style={mapContainerStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={center}
          center={center}
          defaultZoom={14}
          onChildClick={""}
        >
          {markers.map((marker) => (
            <MarkerDiv
              lat={marker.lat}
              lng={marker.lng}
              First={marker.firstName}
              Last={marker.lastname}
              Job={marker.jobrole}
              bio={marker.bio}
              RatingNum={marker.overallreview}
              profilePic={marker.avatar}
              userId={marker._id}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
};

export default HomePage;

{
  /* <GoogleMap 
            mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={center}>
                {markers.map(marker => <Marker position={{ lat: marker.lat, lng: marker.lng}} icon={{ url: "./markerDiv"}}/>)}
            </GoogleMap> */
}
// </div>

// <div className="con">
{
  /* <input className="search"></input> */
}
