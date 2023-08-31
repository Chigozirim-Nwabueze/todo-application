const addForm = document.querySelector(".add");
const tasks = document.querySelector(".task");
const clearAll = document.querySelector(".clear");
const messageBox = document.querySelector(".message-box span");
const searchBox = document.querySelector(".search");

window.addEventListener("DOMContentLoaded", (e) => {
  function updateMessage() {
    const update = tasks.children.length;
    messageBox.textContent = `you have ${update} pending tasks`;
  }

  updateMessage();

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = addForm.task.value.trim();

    if (value.length) {
      console.log(value);
      tasks.innerHTML += `<li>
                             <span>${value}</span>
                             <i class="bi bi-trash-fill delete"></i>
                        </li>`;
      addForm.reset();
      updateMessage();
    }
  });

  tasks.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
      event.target.parentElement.remove();
      updateMessage();
    }
  });

  clearAll.addEventListener("click", (e) => {
    const taskItems = tasks.querySelectorAll("li");

    taskItems.forEach((item) => {
      item.remove();
    });
    updateMessage();
  });

  function filterTask(term) {
    Array.from(tasks.children)
      .filter((task) => {
        return !task.textContent.toLowerCase().includes(term);
      })
      .forEach((task) => {
        task.classList.add("hide");
      });

    Array.from(tasks.children)
      .filter((task) => {
        return task.textContent.toLowerCase().includes(term);
      })
      .forEach((task) => {
        task.classList.remove("hide");
      });
  }

  searchBox.addEventListener("keyup", (e) => {
    const term = searchBox.task.value.trim().toLowerCase();
    filterTask(term);
  });

  searchBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("reset")) {
      searchBox.reset();
      const term = searchBox.task.value.trim();
      filterTask(term);
    }
  });
});
