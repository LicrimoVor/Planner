// Получаем ссылки на поля ввода и кнопку
const organInput = document.getElementById("organInput");
const emailInput = document.getElementById("emailInput");
const submitButton = document.getElementById("submitButton");

// Функция для сохранения данных в localStorage
function saveOrganData() {
  const organization = organInput.value;
  const email = emailInput.value;

  if (organization && email) {
    const data = {
      organization: organization,
      email: email,
    };

    // Сохраняем данные в localStorage
    localStorage.setItem("organizationData", JSON.stringify(data));

    // Перенаправляем на страницу после успешной регистрации
    window.location.href = "/src/table-org.html";
  }
}

// Обработчик изменений в полях ввода
function handleInputChange() {
  const organization = organInput.value;
  const email = emailInput.value;

  // Активируем кнопку "Создать организацию" только если оба поля заполнены
  if (organization && email) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

// Привязываем обработчик к полям ввода
organInput.addEventListener("input", handleInputChange);
emailInput.addEventListener("input", handleInputChange);
