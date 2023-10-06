function toggleButtonState() {
  const passwordInput = document.getElementById("passwordInput");
  const submitButton = document.getElementById("submitButton");

  if (passwordInput.value.length >= 8) {
    submitButton.classList.remove("bg-gray-300", "cursor-not-allowed");
    submitButton.classList.add(
      "bg-blue-500",
      "hover:bg-blue-600",
      "cursor-pointer"
    );
    submitButton.disabled = false;
  } else {
    submitButton.classList.remove(
      "bg-blue-500",
      "hover:bg-blue-600",
      "cursor-pointer"
    );
    submitButton.classList.add("bg-gray-300", "cursor-not-allowed");
    submitButton.disabled = true;
  }
}

function toggleUsernameError() {
  const usernameInput = document.getElementById("usernameInput");
  const usernameError = document.getElementById("usernameError");

  if (/[^a-zA-Z0-9]/.test(usernameInput.value)) {
    usernameError.classList.remove("hidden");
  } else {
    usernameError.classList.add("hidden");
  }
}

function saveUserData() {
  const usernameInput = document.getElementById("usernameInput").value;
  const emailInput = document.querySelector('input[type="email"]').value;
  const passwordInput = document.getElementById("passwordInput").value;

  // Получаем данные из localStorage (если они есть)
  const allUserData = JSON.parse(localStorage.getItem("allUserData")) || {};

  // Проверяем, есть ли такой логин в сохраненных данных
  if (allUserData.hasOwnProperty(usernameInput)) {
    alert("Логин уже занят!");
    return;
  }

  // Если логин свободен и введены корректные данные, сохраняем данные в allUserData
  if (/^[a-zA-Z0-9]+$/.test(usernameInput) && passwordInput.length >= 8) {
    const userData = {
      username: usernameInput,
      email: emailInput,
      password: passwordInput,
    };

    allUserData[usernameInput] = userData;

    localStorage.setItem("allUserData", JSON.stringify(allUserData));
    alert("Данные успешно сохранены!");
    window.location.href = "/src/sign-in.html";

    // Добавляем нового участника в список выбора в модальном окне
    const option = document.createElement("option");
    option.value = usernameInput;
    option.textContent = usernameInput;
    taskParticipantsSelect.appendChild(option);
  } else {
    alert("Пожалуйста, введите корректные данные.");
  }
}
