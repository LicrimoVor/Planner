document.getElementById("submitButton").addEventListener("click", function () {
  loginUser();
});

function loginUser() {
  const usernameInput = document.getElementById("usernameInput").value;
  const passwordInput = document.getElementById("passwordInput").value;

  const allUserData = JSON.parse(localStorage.getItem("allUserData")) || {};

  if (allUserData.hasOwnProperty(usernameInput)) {
    const userData = allUserData[usernameInput];
    if (userData.password === passwordInput) {
      showNotification(`Добро пожаловать, ${userData.username}!`);
      setTimeout(() => {
        window.location.href = "/src/table.html";
      }, 3000);
    } else {
      showErrorMessage("Неверные данные. Пожалуйста, попробуйте снова.");
    }
  } else {
    showErrorMessage("Пользователь с таким логином не найден.");
  }
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.className = "notification";
  document.body.appendChild(notification);
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}

function showErrorMessage(message) {
  const errorDiv = document.createElement("div");
  errorDiv.textContent = message;
  errorDiv.className = "text-red-500 text-sm font-normal mt-2";
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = "";
  messagesDiv.appendChild(errorDiv);
}
