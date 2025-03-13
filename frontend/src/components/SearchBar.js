import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        const trimmedQuery = query.trim();
        if (trimmedQuery) {
            onSearch(trimmedQuery);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div style={{ marginBottom: "15px", textAlign: "center" }}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for a teacher..."
                style={{ padding: "8px", width: "250px", marginRight: "10px" }}
            />
            <button onClick={handleSearch} style={{ padding: "8px 15px", cursor: "pointer" }}>
                Search
            </button>
        </div>
    );
};

export default SearchBar;
