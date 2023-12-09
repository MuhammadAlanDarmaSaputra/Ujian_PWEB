let peminjamans = [];

function openForm() {
    document.getElementById("formContainer").style.display = "block";
}

function closeForm() {
    document.getElementById("formContainer").style.display = "none";
}

function submitForm(event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value;
    const mobil = document.getElementById("mobil").value;
    const tanggal = document.getElementById("tanggal").value;

    const peminjaman = { nama, mobil, tanggal };
    peminjamans.push(peminjaman);

    displayData();
    closeForm();
}

function displayData() {
    const dataContainer = document.getElementById("dataContainer");
    dataContainer.innerHTML = "";

    const table = document.createElement("table");
    const headerRow = table.insertRow(0);

    const headers = ["Nama Peminjam", "Mobil", "Tanggal Peminjaman", "Aksi"];
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    peminjamans.forEach((peminjaman, index) => {
        const row = table.insertRow();
        const values = Object.values(peminjaman);

        values.forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });

        const actionCell = row.insertCell();
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        deleteButton.addEventListener("click", () => deleteData(index));
        actionCell.appendChild(deleteButton);

        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.addEventListener("click", () => openUpdateForm(index));
        actionCell.appendChild(updateButton);
    });

    dataContainer.appendChild(table);
}

function openUpdateForm(index) {
    populateUpdateForm(index);
    document.getElementById("updateFormContainer").style.display = "block";
}

function closeUpdateForm() {
    document.getElementById("updateFormContainer").style.display = "none";
}

function populateUpdateForm(index) {
    const peminjaman = peminjamans[index];
    document.getElementById("updateIndex").value = index;
    document.getElementById("updateNama").value = peminjaman.nama;
    document.getElementById("updateMobil").value = peminjaman.mobil;
    document.getElementById("updateTanggal").value = peminjaman.tanggal;
}

function updateForm(event) {
    event.preventDefault();

    const index = document.getElementById("updateIndex").value;
    const nama = document.getElementById("updateNama").value;
    const mobil = document.getElementById("updateMobil").value;
    const tanggal = document.getElementById("updateTanggal").value;

    const updatedPeminjaman = { nama, mobil, tanggal };
    peminjamans[index] = updatedPeminjaman;

    displayData();
    closeUpdateForm();
}

function deleteData(index) {
    peminjamans.splice(index, 1);
    displayData();
}