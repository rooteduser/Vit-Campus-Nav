import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const FloorMap = ({ teacherLocation }) => {
    if (!teacherLocation || typeof teacherLocation.lat !== "number" || typeof teacherLocation.lng !== "number") {
        return <p>Loading map...</p>;
    }

    return (
        <MapContainer center={[teacherLocation.lat, teacherLocation.lng]} zoom={20} style={{ height: "500px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[teacherLocation.lat, teacherLocation.lng]}>
                <Popup>{teacherLocation.name}'s Cabin</Popup>
            </Marker>
        </MapContainer>
    );
};

export default FloorMap;
