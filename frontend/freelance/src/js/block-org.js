document.addEventListener("DOMContentLoaded", function () {
  const tasksBlocks = document.querySelector(".tasks-blocks");

  interact(".draggable-block")
    .draggable({
      inertia: true,
      restrict: {
        restriction: tasksBlocks,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
      },
      autoScroll: true,
    })
    .on("dragmove", function (event) {
      const target = event.target;
      const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      target.style.transform = `translate(${x}px, ${y}px)`;

      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    });

  const addButton = document.querySelector(
    ".w-12.h-12.bg-blue-500.rounded-l-lg"
  );
  const closeButton = document.querySelector(".modal-close");
  const saveButton = document.getElementById("saveTaskButton");
  const taskTitleInput = document.getElementById("taskTitle");
  const taskDatesInput = document.getElementById("taskDates");
  const taskDescriptionInput = document.getElementById("taskDescription");

  const draggableBlocks = document.querySelectorAll(".draggable-block");

  draggableBlocks.forEach((block) => {
    makeBlockDraggable(block);
  });

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

      updateBlocks();

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

  function updateBlocks() {
    const tasksBlocks = document.querySelector(".tasks-blocks");
    tasksBlocks.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task, index) => {
      const block = document.createElement("div");
      block.classList.add(
        "bg-white",
        "border",
        "border-gray-300",
        "p-4",
        "rounded",
        "shadow-md",
        "draggable-block"
      );

      const title = document.createElement("div");
      title.classList.add("font-semibold", "text-lg", "mb-2");
      title.textContent = task.title;
      block.appendChild(title);

      const participants = document.createElement("div");
      participants.classList.add("mb-1");
      participants.innerHTML = `<span class="font-semibold">Участники:</span> ${task.participants.join(
        ", "
      )}`;
      block.appendChild(participants);

      const dates = document.createElement("div");
      dates.classList.add("mb-1");
      dates.innerHTML = `<span class="font-semibold">Дедлайн:</span> ${task.dates}`;
      block.appendChild(dates);

      const detailsLink = document.createElement("a");
      detailsLink.href = "#";
      detailsLink.textContent = "Подробнее";
      detailsLink.addEventListener("click", function (event) {
        event.preventDefault();
        showModalWithDetails(task);
      });
      block.appendChild(detailsLink);

      tasksBlocks.appendChild(block);

      makeBlockDraggable(block);
    });
  }

  function makeBlockDraggable(block) {
    block.setAttribute("draggable", true);

    block.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("text/plain", block.id);
    });

    block.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    block.addEventListener("drop", function (event) {
      event.preventDefault();
      const draggedBlockId = event.dataTransfer.getData("text/plain");
      const draggedBlock = document.getElementById(draggedBlockId);

      if (draggedBlock && draggedBlock !== block) {
        const container = block.parentElement;
        container.insertBefore(draggedBlock, block.nextSibling);
      }
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
        updateBlocks();
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
        updateBlocks();
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

  updateBlocks();
});
