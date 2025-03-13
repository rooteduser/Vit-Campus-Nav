import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import FloorMap from "./components/FloorMap";



function App() {
    const [teacherLocation, setTeacherLocation] = useState(null);

    const handleSearch = async (query) => {
        const response = await fetch(`http://localhost:5000/api/teachers/search?name=${query}`);
        const data = await response.json();
        if (data.length > 0) {
            setTeacherLocation(data[0]); // Assume first result is correct
        } else {
            alert("Teacher not found!");
        }
    };

    return (
        <div>
            <h1>Campus Navigation</h1>
            <SearchBar onSearch={handleSearch} />
            {teacherLocation && <FloorMap teacherLocation={teacherLocation} />}
        </div>
    );
}

export default App;
