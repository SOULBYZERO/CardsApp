import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import useCards from "../hooks/useCards";
import { Box } from "@mui/material";

const containerStyle = {
  width: "320px",
  height: "320px",
};

export default function MapComponent({ cardData }) {
  const { addressForMap, mapCenter } = useCards();
  const [center, setCenter] = useState({ lat: 31.77838, lng: 35.17582 });

  useEffect(() => {
    if (cardData?.address) {
      addressForMap(cardData.address);
    }
  }, [addressForMap, cardData]);

  useEffect(() => {
    if (mapCenter && !isNaN(mapCenter.lat) && !isNaN(mapCenter.lng)) {
      setCenter(mapCenter);
    }
  }, [mapCenter]);

  return (
    <Box sx={{ width: "" }}>
      <LoadScript googleMapsApiKey="AIzaSyAoMZaKDM1b52gc-j9aMUvngp_Flo48G6s">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={center === mapCenter ? 10 : 6.5}
        >
          {center === mapCenter && <Marker position={center} />}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
}

//AIzaSyAoMZaKDM1b52gc-j9aMUvngp_Flo48G6s
