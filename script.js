/* =========================================================
   ARONEE HOUSEBOAT ENQUIRY MANAGEMENT SYSTEM
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let enquiries = [];
let selectedEnquiryId = null;


/* =========================================================
   INITIAL LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadEnquiries();

    setDefaultDate();

    generateEnquiryId();

    updateDashboard();

    displayEnquiries();

    setupEvents();

});


/* =========================================================
   SET DEFAULT ENQUIRY DATE
========================================================= */

function setDefaultDate() {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    document.getElementById("enquiryDate").value =
        `${year}-${month}-${day}`;

}


/* =========================================================
   GENERATE ENQUIRY ID
========================================================= */

function generateEnquiryId() {

    if (selectedEnquiryId) {
        document.getElementById("enquiryId").value =
            selectedEnquiryId;
        return;
    }

    let lastNumber =
        parseInt(localStorage.getItem("houseboatEnquiryNumber")) || 0;

    lastNumber++;

    localStorage.setItem(
        "houseboatEnquiryNumber",
        lastNumber
    );

    const year =
        new Date().getFullYear().toString().slice(-2);

    const enquiryId =
        "ENQ" +
        year +
        String(lastNumber).padStart(4, "0");

    document.getElementById("enquiryId").value =
        enquiryId;

}


/* =========================================================
   SAVE ENQUIRY
========================================================= */

function saveEnquiry() {

    const enquiryId =
        document.getElementById("enquiryId").value;

    const enquiry = {

        id: enquiryId,

        enquiryDate:
            document.getElementById("enquiryDate").value,

        customerName:
            document.getElementById("customerName").value.trim(),

        phone:
            document.getElementById("phone").value.trim(),

        email:
            document.getElementById("email").value.trim(),

        country:
            document.getElementById("country").value.trim(),


        houseboatName:
            document.getElementById("houseboatName").value,

        cruiseDate:
            document.getElementById("cruiseDate").value,

        checkInTime:
            document.getElementById("checkInTime").value,

        checkOutTime:
            document.getElementById("checkOutTime").value,

        boardingPoint:
            document.getElementById("boardingPoint").value,

        packageName:
            document.getElementById("packageName").value,


        totalPax:
            document.getElementById("totalPax").value,

        foodRequirement:
            document.getElementById("foodRequirement").value.trim(),

        specialRequirements:
            document.getElementById("specialRequirements").value.trim(),


        packageAmount:
            document.getElementById("packageAmount").value,

        advanceRequest:
            document.getElementById("advanceRequest").value,

        discount:
            document.getElementById("discount").value,


        status:
            document.getElementById("enquiryStatus").value

    };


    enquiries.push(enquiry);

    saveToLocalStorage();

    alert("Enquiry saved successfully.");

    clearForm();

    updateDashboard();

    displayEnquiries();

}


/* =========================================================
   UPDATE ENQUIRY
========================================================= */

function updateEnquiry() {

    if (!selectedEnquiryId) {

        alert("Please select an enquiry to update.");

        return;
    }


    const index = enquiries.findIndex(
        enquiry => enquiry.id === selectedEnquiryId
    );


    if (index === -1) {

        alert("Enquiry not found.");

        return;
    }


    enquiries[index] = {

        id: selectedEnquiryId,

        enquiryDate:
            document.getElementById("enquiryDate").value,

        customerName:
            document.getElementById("customerName").value.trim(),

        phone:
            document.getElementById("phone").value.trim(),

        email:
            document.getElementById("email").value.trim(),

        country:
            document.getElementById("country").value.trim(),


        houseboatName:
            document.getElementById("houseboatName").value,

        cruiseDate:
            document.getElementById("cruiseDate").value,

        checkInTime:
            document.getElementById("checkInTime").value,

        checkOutTime:
            document.getElementById("checkOutTime").value,

        boardingPoint:
            document.getElementById("boardingPoint").value,

        packageName:
            document.getElementById("packageName").value,

        totalPax:
            document.getElementById("totalPax").value,

        foodRequirement:
            document.getElementById("foodRequirement").value.trim(),

        specialRequirements:
            document.getElementById("specialRequirements").value.trim(),


        packageAmount:
            document.getElementById("packageAmount").value,

        advanceRequest:
            document.getElementById("advanceRequest").value,

        discount:
            document.getElementById("discount").value,


        status:
            document.getElementById("enquiryStatus").value

    };


    saveToLocalStorage();

    alert("Enquiry updated successfully.");

    clearForm();

    updateDashboard();

    displayEnquiries();

}


/* =========================================================
   DELETE ENQUIRY
========================================================= */

function deleteEnquiry(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this enquiry?");


    if (!confirmDelete) {
        return;
    }


    enquiries =
        enquiries.filter(enquiry => enquiry.id !== id);


    saveToLocalStorage();

    updateDashboard();

    displayEnquiries();

}


/* =========================================================
   EDIT ENQUIRY
========================================================= */

function editEnquiry(id) {

    const enquiry =
        enquiries.find(item => item.id === id);


    if (!enquiry) {
        return;
    }


    selectedEnquiryId = id;


    document.getElementById("enquiryId").value =
        enquiry.id;

    document.getElementById("enquiryDate").value =
        enquiry.enquiryDate || "";

    document.getElementById("customerName").value =
        enquiry.customerName || "";

    document.getElementById("phone").value =
        enquiry.phone || "";

    document.getElementById("email").value =
        enquiry.email || "";

    document.getElementById("country").value =
        enquiry.country || "";


    document.getElementById("houseboatName").value =
        enquiry.houseboatName || "";

    document.getElementById("cruiseDate").value =
        enquiry.cruiseDate || "";

    document.getElementById("checkInTime").value =
        enquiry.checkInTime || "";

    document.getElementById("checkOutTime").value =
        enquiry.checkOutTime || "";

    document.getElementById("boardingPoint").value =
        enquiry.boardingPoint || "";

    document.getElementById("packageName").value =
        enquiry.packageName || "";

    document.getElementById("totalPax").value =
        enquiry.totalPax || "";

    document.getElementById("foodRequirement").value =
        enquiry.foodRequirement || "";

    document.getElementById("specialRequirements").value =
        enquiry.specialRequirements || "";


    document.getElementById("packageAmount").value =
        enquiry.packageAmount || "";

    document.getElementById("advanceRequest").value =
        enquiry.advanceRequest || "";

    document.getElementById("discount").value =
        enquiry.discount || "";


    document.getElementById("enquiryStatus").value =
        enquiry.status || "New";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   CLEAR FORM
========================================================= */

function clearForm() {

    document.getElementById("enquiryForm").reset();

    selectedEnquiryId = null;

    setDefaultDate();

    generateEnquiryId();

}


/* =========================================================
   DISPLAY ENQUIRIES
========================================================= */

function displayEnquiries(searchText = "") {

    const tableBody =
        document.getElementById("enquiryTableBody");


    tableBody.innerHTML = "";


    const search =
        searchText.toLowerCase().trim();


    const filtered =
        enquiries.filter(enquiry => {

            return (

                (enquiry.id || "")
                    .toLowerCase()
                    .includes(search)

                ||

                (enquiry.customerName || "")
                    .toLowerCase()
                    .includes(search)

                ||

                (enquiry.phone || "")
                    .toLowerCase()
                    .includes(search)

                ||

                (enquiry.packageName || "")
                    .toLowerCase()
                    .includes(search)

            );

        });


    filtered.forEach(enquiry => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${enquiry.id || ""}</td>

            <td>${formatDate(enquiry.enquiryDate)}</td>

            <td>${enquiry.customerName || ""}</td>

            <td>${formatDate(enquiry.cruiseDate)}</td>

           <td>${enquiry.totalPax || ""}</td>

            <td>${enquiry.packageName || ""}</td>

            <td>${formatAmount(enquiry.packageAmount)}</td>

            <td>
                <span class="status ${getStatusClass(enquiry.status)}">
                    ${enquiry.status || "New"}
                </span>
            </td>

            <td>

                <button
                    class="action-btn edit-btn"
                    onclick="editEnquiry('${enquiry.id}')">
                    Edit
                </button>

                <button
                    class="action-btn delete-btn"
                    onclick="deleteEnquiry('${enquiry.id}')">
                    Delete
                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


/* =========================================================
   STATUS CLASS
========================================================= */

function getStatusClass(status) {

    switch (status) {

        case "Confirmed":
            return "status-confirmed";

        case "Cancelled":
            return "status-cancelled";

        case "Waiting for Customer":
            return "status-waiting";

        case "Not Interested":
            return "status-not-interested";

        default:
            return "status-new";

    }

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateString) {

    if (!dateString) {
        return "";
    }


    const parts =
        dateString.split("-");


    if (parts.length !== 3) {
        return dateString;
    }


    return `${parts[2]}-${parts[1]}-${parts[0]}`;

}


/* =========================================================
   FORMAT PACKAGE TARIFF
========================================================= */

function formatAmount(amount) {

    if (!amount) {
        return "";
    }

    return amount;

}


/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {

    document.getElementById("totalEnquiries").textContent =
        enquiries.length;


    document.getElementById("newEnquiries").textContent =
        enquiries.filter(
            enquiry => enquiry.status === "New"
        ).length;


    document.getElementById("confirmedEnquiries").textContent =
        enquiries.filter(
            enquiry => enquiry.status === "Confirmed"
        ).length;


    document.getElementById("cancelledEnquiries").textContent =
        enquiries.filter(
            enquiry => enquiry.status === "Cancelled"
        ).length;

}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveToLocalStorage() {

    localStorage.setItem(
        "houseboatEnquiries",
        JSON.stringify(enquiries)
    );

}


function loadEnquiries() {

    const saved =
        localStorage.getItem("houseboatEnquiries");


    if (saved) {

        try {

            enquiries =
                JSON.parse(saved);

        } catch (error) {

            enquiries = [];

        }

    }

}


/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {

    document.getElementById("saveBtn")
        .addEventListener(
            "click",
            saveEnquiry
        );


    document.getElementById("updateBtn")
        .addEventListener(
            "click",
            updateEnquiry
        );


    document.getElementById("clearBtn")
        .addEventListener(
            "click",
            clearForm
        );


    document.getElementById("searchInput")
        .addEventListener(
            "input",
            function () {

                displayEnquiries(
                    this.value
                );

            }
        );

}


/* =========================================================
   MAKE FUNCTIONS AVAILABLE TO HTML
========================================================= */

window.editEnquiry = editEnquiry;

window.deleteEnquiry = deleteEnquiry;
