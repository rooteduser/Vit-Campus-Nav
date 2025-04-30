document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const suggestionsList = document.getElementById("suggestions");
    const resultsDiv = document.getElementById("results");
    const floorMapContainer = document.getElementById("floorMapContainer");
    const marker = document.getElementById("marker");
    const floorMapImage = document.getElementById("floorMapImage"); // New: image inside container

    floorMapContainer.style.display = "none";

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim();

        if (query.length === 0) {
            resultsDiv.innerHTML = "";
            suggestionsList.innerHTML = "";
            floorMapContainer.style.display = "none";
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

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (!query) {
            resultsDiv.innerHTML = "";
            floorMapContainer.style.display = "none";
            return;
        }

        fetch(`/api/teacher?name=${query}`)
            .then(response => response.json())
            .then(data => {
                resultsDiv.innerHTML = "";
                if (data.length === 0) {
                    floorMapContainer.style.display = "none";
                    resultsDiv.innerHTML = "<p>No results found</p>";
                    return;
                }

                data.forEach(teacher => {
                    const div = document.createElement("div");
                    div.classList.add("teacher-card");

                    const roomInfo = teacher.room_and_wing && teacher.room_and_wing !== "Not Assigned"
                        ? `<p>Room & Wing: ${teacher.room_and_wing}</p>`
                        : "<p>No room assigned</p>";

                    div.innerHTML = `<h3>${teacher.name}</h3>
                                     ${roomInfo}
                                     <p>Cabin: ${teacher.cabin_no}</p>
                                     <p>Floor: ${teacher.floor}</p>`;

                    resultsDiv.appendChild(div);

                    // Load appropriate floor map
                    loadFloorMap(teacher.floor);

                    // Position marker
                    positionMarker(teacher.room_and_wing);
                });
            })
            .catch(err => console.error("Error fetching teacher details:", err));
    });

    function loadFloorMap(floorNumber) {
        floorMapContainer.style.display = "block";

        // Example logic — adjust based on your file names or setup
        const floorMapPaths = {
            "1": "../assets/first-floormap.jpg",
            "2": "../assets/second-floormap.jpg",
            "3": "../assets/third-floormap.jpg",
            "4": "../assets/fourth-floormap.jpg",
            "5": "../assets/fifth-floormap.jpg"
        };

        const imageSrc = floorMapPaths[floorNumber] || floorMapPaths["1"];
        floorMapImage.src = imageSrc;
    }

    function positionMarker(roomAndWing) {
        console.log("Positioning marker for:", roomAndWing);

        const roomPositions = {
            "AB504": { top: "90%", left: "21%" },
            "AB516": { top: "10%", left: "21%" },
            "C Wing": { top: "50%", left: "48%" },
            "AB528": { top: "90%", left: "76%" },

            "AB404": { top: "90%", left: "21%" },
            "AB412": { top: "10%", left: "21%" },
            "C Wing": { top: "50%", left: "48%" },
            "AB428": { top: "90%", left: "76%" },

            "AB304": { top: "90%", left: "21%" },
            "AB316": { top: "10%", left: "21%" },
            "PAT Office": { top: "50%", left: "48%" },
            "AB328": { top: "90%", left: "76%" },

            "AB202(A)": { top: "90%", left: "35%" },
            "AB202(B)": { top: "90%", left: "29%" },
            "AB203": { top: "90%", left: "21%" },
            "AB227": { top: "90%", left: "76%" }
        };

        let position = roomPositions[roomAndWing] || { top: "50px", left: "60px" };

        marker.style.top = position.top;
        marker.style.left = position.left;
        marker.style.display = "block";
    }
});
