if (!sessionStorage.getItem("jwt")) {
    alert('JWT cannot be fetched');
}


function getNastavniPlan() {
    fetch("https://www.fulek.com/data/api/supit/curriculum-list/hr", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
    })
    .then((response) => response.json())
    .then((result) => showNastavniPlan(result.data))
    .catch((error) => console.error(error));
}

//display the courses in the dropdown
function showNastavniPlan(data) {
    const searchBar = document.querySelector("#searchBar");
    const autocompleteList = document.querySelector("#autocomplete");

    // Clear previous results
    autocompleteList.innerHTML = '';

    const selectedCoursesSet = new Set();

    searchBar.addEventListener("input", () => {
        const searchTerm = searchBar.value;

        autocompleteList.innerHTML = '';

        const matchingCourses = data.filter(course =>
            course.kolegij.includes(searchTerm) && !selectedCoursesSet.has(course.kolegij)
        );

        matchingCourses.forEach((course) => {
            const liElement = document.createElement("li");
            liElement.textContent = course.kolegij;

            liElement.addEventListener("click", () => {
                showSelectedCourse(course, selectedCoursesSet);
            });

            autocompleteList.appendChild(liElement);
        });
    });

    document.addEventListener("click", (event) => {
        if (!autocompleteList.contains(event.target) && event.target !== searchBar) {
            autocompleteList.innerHTML = ''; 
        } //when a click occurs anywhere on the document, clear the autocomplete list
    });
}

function showSelectedCourse(course, selectedCoursesSet) {
    const headers = ["Kolegij", "ECTS", "Sati", "Predavanja", "Vježbe", "Tip"];
    const propertyMapping = {
        "Kolegij": "kolegij",
        "ECTS": "ects",
        "Sati": "sati",
        "Predavanja": "predavanja",
        "Vježbe": "vjezbe",
        "Tip": "tip",
    };

    if (!selectedCoursesSet.has(course.kolegij)) {
        selectedCoursesSet.add(course.kolegij);

        let table = document.getElementById("dataTable");

        if (!table.querySelector("th")) {
            const headerRow = document.createElement("tr");
            headers.forEach(header => {
                const th = document.createElement("th");
                th.textContent = header;
                headerRow.appendChild(th);
            });
            table.appendChild(headerRow);
        }

        const row = document.createElement("tr");
        headers.forEach(header => {
            const td = document.createElement("td");
            td.textContent = course[propertyMapping[header]];
            td.setAttribute("data-column", header);
            row.appendChild(td);
        });
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.backgroundColor = "red";
        deleteButton.style.color = "white";
        deleteButton.addEventListener("click", () => {
            selectedCoursesSet.delete(course.kolegij);
            table.removeChild(row);
        });

        const tdDelete = document.createElement("td");
        tdDelete.appendChild(deleteButton);
        row.appendChild(tdDelete);

        table.appendChild(row);
        setTimeout(updateSumRow, 0);
    }
}
function updateSumRow() {
    const table = document.getElementById("dataTable");
    const sumRow = document.getElementById("sumRow");

    if (sumRow) {
        table.removeChild(sumRow);
    }

    const newSumRow = document.createElement("tr");
    const boldStyle = "font-weight: bold; color: black;";

    const tdLabel = document.createElement("td");
    tdLabel.textContent = "Ukupno";
    tdLabel.setAttribute("style", `${boldStyle} text-align: right;`); // Updated style
    newSumRow.appendChild(tdLabel);

    const numericColumns = ["ECTS", "Sati", "Predavanja", "Vježbe"];
    numericColumns.forEach(column => {
        const sum = Array.from(table.querySelectorAll(`td[data-column="${column}"]`))
            .map(cell => parseFloat(cell.textContent) || 0)
            .reduce((acc, value) => acc + value, 0);

        const td = document.createElement("td");
        td.textContent = sum;
        td.setAttribute("style", boldStyle);
        newSumRow.appendChild(td);
    });

    newSumRow.appendChild(document.createElement("td"));

    newSumRow.id = "sumRow";
    table.appendChild(newSumRow);
}
getNastavniPlan();