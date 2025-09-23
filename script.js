function showNotification(message, type = "info", autoHide = false) {
  const panel = document.getElementById("notificationPanel");
  const note = document.createElement("div");
  note.className = `notification ${type}`;
  note.innerText = message;
  panel.appendChild(note);

  if (autoHide) {
    setTimeout(() => note.remove(), 3000);
  }
}

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "12345") {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("dashboardPage").style.display = "block";
    showNotification("Login successful!", "info", true);
  } else {
    document.getElementById("loginError").style.display = "block";
  }
}

function logout() {
  document.getElementById("dashboardPage").style.display = "none";
  document.getElementById("loginPage").style.display = "flex";
  showNotification("Logged out successfully!", "warning", true);
}

function addProduct() {
  const name = document.getElementById("name").value;
  const qty = document.getElementById("quantity").value;
  const expiry = document.getElementById("expiry").value;

  if (!name || !qty || !expiry) {
    showNotification("Please fill all fields!", "danger", true);
    return;
  }

  const today = new Date();
  const expiryDate = new Date(expiry);
  const diffTime = expiryDate - today;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let statusClass = "";
  let statusText = "";

  if (daysLeft > 15) {
    statusClass = "safe";
    statusText = "Safe";
  } else if (daysLeft > 3) {
    statusClass = "warning-row";
    statusText = "Expiring Soon";
    showNotification(`${name} is expiring in ${daysLeft} days!`, "warning");
  } else {
    statusClass = "danger-row";
    statusText = "Donate / Urgent";
    showNotification(`${name} expires in ${daysLeft} days! Donate it!`, "danger");
  }

  const table = document.getElementById("productTable");
  const row = table.insertRow();
  row.className = statusClass;
  row.innerHTML = `
    <td>${name}</td>
    <td>${qty}</td>
    <td>${expiryDate.toDateString()}</td>
    <td>${statusText} (${daysLeft} days)</td>
  `;

  document.getElementById("name").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("expiry").value = "";
}
