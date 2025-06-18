import { db } from "./firebaseConfig.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Elements
const tbody = document.getElementById("tbody1");

const PatName = document.getElementById("NamePt");
const PatAge = document.getElementById("AgePt");
const PatDname = document.getElementById("DnamePt");
const PatHname = document.getElementById("HnamePt");
const PatSym = document.getElementById("SymPt");
const PatTime = document.getElementById("TimePt");

const BTNpatDel = document.getElementById("DelPtBtn");

let ptno = 0;
let ptlist = [];
let docIds = [];

// Fill modal textboxes
function FillTboxes(index) {
  if (index == null) {
    PatName.value = "";
    PatAge.value = "";
    PatDname.value = "";
    PatHname.value = "";
    PatSym.value = "";
    PatTime.value = "";
  } else {
    --index;
    const [name, age, doc, hos, sym, time] = ptlist[index];
    PatName.value = name;
    PatAge.value = age;
    PatDname.value = doc;
    PatHname.value = hos;
    PatSym.value = sym;
    PatTime.value = time;

    // Save selected docId in button dataset for deletion
    BTNpatDel.dataset.id = docIds[index];
  }
}

// Delete appointment from Firestore
function DelPt() {
  const docId = BTNpatDel.dataset.id;
  if (!docId) return alert("No document selected.");

  deleteDoc(doc(db, "appointments", docId))
    .then(() => {
      alert("Appointment deleted.");
      GetAllAppointments();
    })
    .catch((err) => alert("Error deleting: " + err));
}

// Create table row
function AddItemToTable(name, age, docname, hosname, ill, time) {
  const trow = document.createElement("tr");

  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");

  td1.textContent = ++ptno;
  td2.textContent = name;
  td3.textContent = age;
  td4.textContent = docname;

  td2.classList.add("nameField");
  td3.classList.add("ageField");
  td4.classList.add("docnameField");

  trow.append(td1, td2, td3, td4);

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn btn-info my-2";
  btn.dataset.toggle = "modal";
  btn.dataset.target = "#exampleModalCenter";
  btn.textContent = "Details";
  btn.id = ptno;

  btn.onclick = () => FillTboxes(btn.id);

  const controlDiv = document.createElement("div");
  controlDiv.appendChild(btn);
  trow.appendChild(controlDiv);

  tbody.appendChild(trow);
  ptlist.push([name, age, docname, hosname, ill, time]);
}

// Render all items
function AddAllItemstoTable(appointments, ids) {
  ptno = 0;
  ptlist = [];
  docIds = [];
  tbody.innerHTML = "";

  appointments.forEach((a, i) => {
    AddItemToTable(a.name, a.age, a.docname, a.hosname, a.ill, a.time);
    docIds.push(ids[i]);
  });
}

// Fetch appointments once
async function GetAllAppointments() {
  const querySnapshot = await getDocs(collection(db, "appointments"));
  const appointments = [];
  const ids = [];

  querySnapshot.forEach((doc) => {
    appointments.push(doc.data());
    ids.push(doc.id);
  });

  if (appointments.length === 0) {
    tbody.innerHTML = "<tr><td colspan='4'>No records found.</td></tr>";
  } else {
    AddAllItemstoTable(appointments, ids);
  }
}

// Search Logic
const searchBar = document.getElementById("SearchBar");
const searchBtn = document.getElementById("SearchBtn");
const category = document.getElementById("CategorySelected");

function SearchTable(categoryClass) {
  const filter = searchBar.value.toUpperCase();
  const rows = tbody.getElementsByTagName("tr");

  Array.from(rows).forEach((row) => {
    const cells = row.getElementsByClassName(categoryClass);
    let found = false;
    for (let cell of cells) {
      if (cell.textContent.toUpperCase().includes(filter)) {
        found = true;
        break;
      }
    }
    row.style.display = found ? "" : "none";
  });
}

function SearchTableByExactValues(categoryClass) {
  const filter = searchBar.value.toUpperCase();
  const rows = tbody.getElementsByTagName("tr");

  Array.from(rows).forEach((row) => {
    const cells = row.getElementsByClassName(categoryClass);
    let found = false;
    for (let cell of cells) {
      if (cell.textContent.toUpperCase() === filter) {
        found = true;
        break;
      }
    }
    row.style.display = found ? "" : "none";
  });
}

searchBtn.onclick = function () {
  if (searchBar.value === "") {
    Array.from(tbody.getElementsByTagName("tr")).forEach(
      (row) => (row.style.display = "")
    );
  } else if (category.value == 1) {
    SearchTable("nameField");
  } else if (category.value == 2) {
    SearchTableByExactValues("ageField");
  } else if (category.value == 3) {
    SearchTable("docnameField");
  }
};

searchBar.onkeypress = function (event) {
  if (event.keyCode === 13) searchBtn.click();
};

// On page load
window.onload = () => {
  GetAllAppointments();
};
