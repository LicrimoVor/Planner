document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const addButton = document.querySelector(
    ".w-12.h-12.bg-blue-500.rounded-l-lg"
  );
  const closeButton = document.querySelector(".modal-close");
  const saveButton = document.getElementById("saveTaskButton");
  const taskTitleInput = document.getElementById("taskTitle");
  const taskDatesInput = document.getElementById("taskDates");
  const taskDescriptionInput = document.getElementById("taskDescription");

  addButton.addEventListener("click", function () {
    modal.classList.remove("hidden");
  });

  closeButton.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  saveButton.addEventListener("click", function () {
    if (
      taskTitleInput.value &&
      taskDatesInput.value &&
      taskDescriptionInput.value
    ) {
      const selectedParticipants = Array.from(
        document.querySelectorAll('input[name="participants"]:checked'),
        (checkbox) => checkbox.value
      );

      if (selectedParticipants.length === 0) {
        alert("Выберите хотя бы одного участника");
        return;
      }

      const task = {
        title: taskTitleInput.value,
        participants: selectedParticipants,
        dates: taskDatesInput.value,
        description: taskDescriptionInput.value,
      };

      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      updateTable();

      modal.classList.add("hidden");

      taskTitleInput.value = "";
      taskDatesInput.value = "";
      taskDescriptionInput.value = "";
    } else {
      alert("Пожалуйста, заполните все поля");
    }
  });

  const allUserData = JSON.parse(localStorage.getItem("allUserData")) || {};
  const participantsList = document.getElementById("participantsList");

  Object.keys(allUserData).forEach((username) => {
    const participantDiv = document.createElement("div");
    participantDiv.classList.add("flex", "items-center");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "participants";
    checkbox.value = username;

    const label = document.createElement("label");
    label.textContent = username;

    participantDiv.appendChild(checkbox);
    participantDiv.appendChild(label);

    participantsList.appendChild(participantDiv);
  });

  function updateTable() {
    const tasksTable = document.querySelector(".tasks-table");
    tasksTable.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task, index) => {
      const row = document.createElement("div");
      row.classList.add(
        "grid",
        "grid-cols-5",
        "bg-white",
        "border-b",
        "border-gray-300",
        "text-center",
        "items-center",
        "text-lg"
      );

      const idCell = document.createElement("div");
      idCell.classList.add("p-2");
      idCell.textContent = index + 1;
      row.appendChild(idCell);

      const titleCell = document.createElement("div");
      titleCell.classList.add("p-2");
      titleCell.textContent = task.title;
      row.appendChild(titleCell);

      const participantsCell = document.createElement("div");
      participantsCell.classList.add("p-2");
      participantsCell.textContent = task.participants.join(", ");
      row.appendChild(participantsCell);

      const datesCell = document.createElement("div");
      datesCell.classList.add("p-2");
      datesCell.textContent = task.dates;
      row.appendChild(datesCell);

      const descriptionCell = document.createElement("div");
      descriptionCell.classList.add("p-2");
      const detailsLink = document.createElement("a");
      detailsLink.href = "#";
      detailsLink.textContent = "Подробнее";
      detailsLink.addEventListener("click", function (event) {
        event.preventDefault();
        showModalWithDetails(task);
      });
      descriptionCell.appendChild(detailsLink);
      row.appendChild(descriptionCell);

      tasksTable.appendChild(row);
    });
  }

  function showModalWithDetails(task) {
    const modalDetails = document.getElementById("modalDetails");
    const modalContent = modalDetails.querySelector(".bg-white");
    modalContent.innerHTML = "";

    const title = document.createElement("div");
    title.classList.add("text-2xl", "font-semibold", "mb-4");
    title.textContent = task.title;

    const participants = document.createElement("div");
    participants.classList.add("mb-4");
    participants.innerHTML = `<span class="text-lg font-semibold">Участники:</span> ${task.participants.join(
      ", "
    )}`;

    const dates = document.createElement("div");
    dates.classList.add("mb-4");
    dates.innerHTML = `<span class="text-lg font-semibold">Дедлайн:</span> ${task.dates}`;

    const description = document.createElement("div");
    description.classList.add("mb-4");
    description.innerHTML = `<span class="text-lg font-semibold">Описание:</span><br>${task.description}`;

    modalContent.appendChild(title);
    modalContent.appendChild(participants);
    modalContent.appendChild(dates);
    modalContent.appendChild(description);

    const buttonsContainer = createButtonsContainer(task);
    modalContent.appendChild(buttonsContainer);

    modalDetails.classList.remove("hidden");
  }

  function createButtonsContainer(task) {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("flex", "justify-end", "mt-4");

    const editButton = document.createElement("button");
    editButton.classList.add(
      "bg-blue-500",
      "hover:bg-blue-600",
      "text-white",
      "px-4",
      "py-2",
      "rounded",
      "mr-2"
    );
    editButton.textContent = "Редактировать";
    editButton.addEventListener("click", function () {
      modalDetails.classList.add("hidden");
      showModalForEdit(task);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add(
      "bg-red-500",
      "hover:bg-red-600",
      "text-white",
      "px-4",
      "py-2",
      "rounded",
      "mr-2"
    );
    deleteButton.textContent = "Удалить";
    deleteButton.addEventListener("click", function () {
      const confirmed = confirm("Вы уверены, что хотите удалить эту задачу?");
      if (confirmed) {
        deleteTaskFromDatabase(task);
        modalDetails.classList.add("hidden");
        updateTable();
      }
    });

    const closeButton = document.createElement("button");
    closeButton.classList.add(
      "bg-gray-300",
      "hover:bg-gray-400",
      "text-white",
      "px-4",
      "py-2",
      "rounded"
    );
    closeButton.textContent = "Закрыть";
    closeButton.addEventListener("click", function () {
      modalDetails.classList.add("hidden");
    });

    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(closeButton);

    return buttonsContainer;
  }

  function showModalForEdit(task) {
    const modalEdit = document.getElementById("modalEdit");
    const editForm = modalEdit.querySelector("form");
    const taskTitleEditInput = editForm.querySelector("#taskTitleEdit");
    const taskDatesEditInput = editForm.querySelector("#taskDatesEdit");
    const taskDescriptionEditInput = editForm.querySelector(
      "#taskDescriptionEdit"
    );

    taskTitleEditInput.value = task.title;
    taskDatesEditInput.value = task.dates;
    taskDescriptionEditInput.value = task.description;

    const saveEditButton = modalEdit.querySelector("#saveEditButton");
    saveEditButton.addEventListener("click", function () {
      if (
        taskTitleEditInput.value &&
        taskDatesEditInput.value &&
        taskDescriptionEditInput.value
      ) {
        updateTaskInDatabase(task, {
          title: taskTitleEditInput.value,
          dates: taskDatesEditInput.value,
          description: taskDescriptionEditInput.value,
        });

        modalEdit.classList.add("hidden");
        updateTable();
      } else {
        alert("Пожалуйста, заполните все поля");
      }
    });

    modalEdit.classList.remove("hidden");
  }

  const editModalCloseButton = document.getElementById("editModalClose");
  editModalCloseButton.addEventListener("click", function () {
    modalEdit.classList.add("hidden");
  });

  function updateTaskInDatabase(task, updatedData) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex((t) => t.title === task.title);
    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...task, ...updatedData };
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  function deleteTaskFromDatabase(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex((t) => t.title === task.title);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  updateTable();
});
