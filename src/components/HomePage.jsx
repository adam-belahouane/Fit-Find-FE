import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import "../styles/homepage.css";
import MarkerDiv from "./markerDiv";
import PuffLoader from "react-spinners/PuffLoader";

const mapContainerStyle = {
  width: "100vw",
  height: "91.5vh",
};

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
    const getAllProUsers = async () => {
      try {
        let response = await fetch(url + "/proUser/getAll/");
        if (response.ok) {
          let data = await response.json();
          setMarkers(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
    getAllProUsers();
  }, []);

  if (markers.length === 0) {
    return (
      <div className="loader">
        <PuffLoader color="blue" loading={true} size={150} />
      </div>
    );
  } else {
    return (
      <div style={mapContainerStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={center}
          center={center}
          defaultZoom={14}
          onChildClick={() => {}}
        >
          {markers.map((marker) => (
            <MarkerDiv
              key={marker._id}
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
