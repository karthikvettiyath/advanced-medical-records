const form = document.getElementById("patientForm");
const list = document.getElementById("patientList");
const searchInput = document.getElementById("searchInput");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(form));
  await fetch("/api/patients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });
  form.reset();
  loadPatients();
});

searchInput.addEventListener("input", loadPatients);

async function loadPatients() {
  const res = await fetch("/api/patients");
  const data = await res.json();
  const search = searchInput.value.toLowerCase();
  list.innerHTML = "";
  data.filter(p => p.name.toLowerCase().includes(search)).forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${p.name}</strong> | ${p.age} yrs | ${p.gender} | ${p.blood_group} <br>
      📞 ${p.phone} | 🗓️ ${p.visit_date} | 👨‍⚕️ ${p.doctor} <br>
      📝 ${p.history} <br>
      <button onclick="deletePatient(${p.patient_id})">❌ Delete</button>
    `;
    list.appendChild(li);
  });
}

async function deletePatient(id) {
  if (confirm("Are you sure you want to delete this patient?")) {
    await fetch("/api/patients/" + id, { method: "DELETE" });
    loadPatients();
  }
}

loadPatients();
