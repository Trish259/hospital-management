const api = "http://localhost:5000/api";

function register(e) {
  e.preventDefault();
  const data = {
    username: username.value,
    email: email.value,
    password: password.value,
    role: role.value
  };
  fetch(`${api}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json()).then(alertUser);
}

function login(e) {
  e.preventDefault();
  const data = {
    email: email.value,
    password: password.value
  };
  fetch(`${api}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => {
      localStorage.setItem("token", data.token);
      const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
      window.location.href = tokenPayload.role === 'admin' ? 'admin.html' : 'dashboard.html';
    });
}

function bookAppointment(e) {
  e.preventDefault();
  const data = {
    doctorId: doctorId.value,
    appointmentDate: date.value,
    description: description.value
  };
  fetch(`${api}/user/appointment`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data)
  }).then(res => res.json()).then(alertUser);
}

function sendMessage(e) {
  e.preventDefault();
  const data = { messageText: messageText.value };
  fetch(`${api}/user/message`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data)
  }).then(res => res.json()).then(alertUser);
}

function addDoctor(e) {
  e.preventDefault();
  const data = {
    name: dname.value,
    specialty: specialty.value,
    availableSlots: slots.value.split(','),
    contactInfo: contact.value
  };
  fetch(`${api}/admin/doctor`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data)
  }).then(res => res.json()).then(alertUser);
}

function getAppointments() {
  fetch(`${api}/admin/appointments`, {
    headers: authHeaders()
  }).then(res => res.json())
    .then(data => {
      const list = document.getElementById("appointmentsList");
      list.innerHTML = "";
      data.forEach(a => {
        const li = document.createElement("li");
        li.textContent = `${a.userId.username} -> ${a.doctorId.name} on ${a.appointmentDate} [${a.status}]`;
        list.appendChild(li);
      });
    });
}

function getMessages() {
  fetch(`${api}/admin/messages`, {
    headers: authHeaders()
  }).then(res => res.json())
    .then(data => {
      const list = document.getElementById("messagesList");
      list.innerHTML = "";
      data.forEach(m => {
        const li = document.createElement("li");
        li.textContent = `${m.userId.username}: ${m.messageText}`;
        list.appendChild(li);
      });
    });
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem("token")
  };
}

function alertUser(res) {
  alert(res.msg || "Done");
}