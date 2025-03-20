document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const suggestionsList = document.getElementById("suggestions");
    const resultsDiv = document.getElementById("results");
    const floorMapContainer = document.getElementById("floorMapContainer");
    const marker = document.getElementById("marker");

    // Hide floor map initially
    floorMapContainer.style.display = "none";

    // Fetch search suggestions
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim();

        if (query.length === 0) {
            resultsDiv.innerHTML = ""; // Clear displayed data
            suggestionsList.innerHTML = ""; // Clear suggestions
            floorMapContainer.style.display = "none"; // Hide floor map
            return;
        }

        if (query.length < 2) {
            suggestionsList.innerHTML = "";
            return;
        }

        fetch(`/api/teacher/suggestions?name=${query}`)
            .then(response => response.json())
            .then(data => {
                suggestionsList.innerHTML = "";
                data.forEach(name => {
                    const li = document.createElement("li");
                    li.textContent = name;
                    li.addEventListener("click", () => {
                        searchInput.value = name;
                        suggestionsList.innerHTML = "";
                    });
                    suggestionsList.appendChild(li);
                });
            })
            .catch(err => console.error("Error fetching suggestions:", err));
    });

    // Fetch teacher details when search button is clicked
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (!query) {
            resultsDiv.innerHTML = ""; // Clear results if input is empty
            floorMapContainer.style.display = "none"; // Hide floor map
            return;
        }

        fetch(`/api/teacher?name=${query}`)
            .then(response => response.json())
            .then(data => {
                resultsDiv.innerHTML = "";
                floorMapContainer.style.display = "none"; // Hide by default

                if (data.length === 0) {
                    resultsDiv.innerHTML = "<p>No results found</p>";
                    return;
                }

                data.forEach(teacher => {
                    const div = document.createElement("div");
                    div.classList.add("teacher-card");

                    // Check if room_and_wing exists and is not "Not Assigned"
                    const roomInfo = teacher.room_and_wing && teacher.room_and_wing !== "Not Assigned"
                        ? `<p>Room & Wing: ${teacher.room_and_wing}</p>`
                        : "";

                    div.innerHTML = `<h3>${teacher.name}</h3>
                                     ${roomInfo} <!-- Conditionally show room_and_wing -->
                                     <p>Cabin: ${teacher.cabin_no}</p>
                                     <p>Floor: ${teacher.floor}</p>`;

                    resultsDiv.appendChild(div);

                    // Show floor map only if floor information exists
                    if (teacher.floor) {
                        floorMapContainer.style.display = "block";
                        positionMarker(teacher.floor);
                    }
                });
            })
            .catch(err => console.error("Error fetching teacher details:", err));
    });

    // Function to position marker based on floor
    function positionMarker(floor) {
        // Example logic (Modify as per your floor map layout)
        const floorPositions = {
            "1": { top: "10%", left: "50%" },
            "2": { top: "30%", left: "50%" },
            "3": { top: "50%", left: "50%" },
            "4": { top: "70%", left: "50%" }
        };

        if (floorPositions[floor]) {
            marker.style.top = floorPositions[floor].top;
            marker.style.left = floorPositions[floor].left;
        }
    }

    // Clear results when input is manually cleared
    searchInput.addEventListener("input", () => {
        if (searchInput.value.trim() === "") {
            resultsDiv.innerHTML = "";
            floorMapContainer.style.display = "none"; // Hide map
        }
    });
});
