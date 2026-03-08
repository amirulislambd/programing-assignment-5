const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
const cardContainer = document.getElementById("cardContainer");
const openCards = document.getElementById("openCards");
const closedCards = document.getElementById("closedCards");
const totalIssues = document.getElementById("totalIssues");
const issues_modal = document.getElementById("issues_modal");
const spinner = document.getElementById("spinner");

let countCard = [];
let countOpenCard = [];
let countClosed = [];

function showSpinner(status) {
  if (status === true) {
    spinner.classList.remove("hidden");
    cardContainer.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    cardContainer.classList.remove("hidden");
  }
}

function updateCount(status) {
  if (status === "all") {
    totalIssues.innerText = countCard.length;
  } else if (status === "open") {
    totalIssues.innerText = countOpenCard.length;
  } else if (status === "closed") {
    totalIssues.innerText = countClosed.length;
  }
}
document.getElementById("buttons").addEventListener("click", (e) => {
  const target = e.target;
  const selectedBtn = document.querySelectorAll("#buttons .btn");
  selectedBtn.forEach((btn) => {
    btn.classList.remove("btn-primary");
  });
  target.classList.add("btn-primary");
  if (target.classList.contains("btn")) {
    if (target.id === "allBtn") {
      cardContainer.classList.remove("hidden");
      openCards.classList.add("hidden");
      closedCards.classList.add("hidden");
      updateCount("all");
    }
    if (target.id === "openBtn") {
      cardContainer.classList.add("hidden");
      openCards.classList.remove("hidden");
      closedCards.classList.add("hidden");
      updateCount("open");
    }
    if (target.id === "closedBtn") {
      cardContainer.classList.add("hidden");
      openCards.classList.add("hidden");
      closedCards.classList.remove("hidden");
      updateCount("closed");
    }
  }
});

async function loadAllIssues() {
  showSpinner(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  displayAllIssues(data.data);
  showSpinner(false);
}
async function loadSingleIssues(id) {
  showSpinner(true);
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  modalIssues(data.data);
  showSpinner(false);
}

async function modalIssues(data) {
  const modal = document.getElementById("modal");
  modal.innerHTML = "";
  const createModal = document.createElement("div");
  createModal.innerHTML = `
  <div class="modal-box">
                <h3 class="text-xl font-bold">${data.title}</h3>
                <div class=" flex items-center gap-3 mb-3">
                <div><p class=" text-center text-white uppercase rounded-full px-3 py-1 ${data.status === "open" ? "bg-green-500" : "bg-purple-500"}"> ${data.status}</p></div>
                    <p class="py-4">Opened by <span>${data.author}.</span></p>
                    <p class="py-4"><span>${new Date(data.createdAt).toLocaleDateString("en-GB")}</span></p>
                </div>

                <div class="flex gap-2 my-3">
                <div>
              ${data.labels[0]?` <p class=" w-fit bg-red-100 rounded-full border border-red-500 text-red-500  p-1 font-bold uppercase ">
                <span><i class="fa-regular fa-life-ring"></i>${data.labels[0]}</span>
              </p>`:''}
              </div>
              <div>
              ${data.labels[1]?` <p class="w-fit  bg-yellow-100 rounded-full  border border-yellow-500 text-yellow-500 p-1  font-bold uppercase">
                <span><i class="fa-regular fa-life-ring"></i>${data.labels[1]}</span>
              </p>`:''}
              </div>
              </div>

                <p class="">${data.description}</p>
                <div class="flex justify-between my-3">
                    <div>
                    ${data.assignee ?`<p>assignee:</p>
                      <p class="text-xl font-bold">${data.assignee}</p>`:''}
                        
                    </div>
                    <div class="flex flex-col items-center ">
                        <p>priority</p>
                        <h1 class="${data.priority === "high" ? "bg-red-100 text-red-500" : data.priority === "medium" ? "bg-yellow-100 text-yellow-500" : "bg-gray-200 text-gray-500"}  px-2  rounded-full  font-bold uppercase">${data.priority}</h1>
                    </div>
                </div>
                <div class="modal-action">
                  <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                  </form>
                </div>
              </div>
              `;
  modal.append(createModal);
  issues_modal.showModal();
}
async function loadSearchIssue() {
  const searchInput = document.getElementById("search");
  const searchValue = searchInput.value;

  if (searchValue.trim() === "") {
    loadAllIssues();
    return;
  }
  showSpinner(true);
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`,
  );
  const data = await res.json();
  displayAllIssues(data.data);
  showSpinner(false);
}
document.getElementById("search").addEventListener("input", loadSearchIssue);

loadAllIssues();

async function displayAllIssues(cards) {
  cardContainer.innerHTML = "";
  openCards.innerHTML = "";
  closedCards.innerHTML = "";
  countCard = [];
  countOpenCard = [];
  countClosed = [];
  cards.forEach((card) => {
    countCard.push(card);
    function newCardFunc() {
      newCard = document.createElement("div");
      newCard.innerHTML = `
              <div onclick="loadSingleIssues(${card.id})" class="card card-body  shadow space-y-3 md:space-y-5 h-full border-t-4 ${card.status === "open" ? "border-green-500" : "border-purple-500"}">
              <div class="flex justify-between">
              ${card.status === "open" ? '<i class="fa-solid fa-circle-check text-green-500 text-2xl"></i>' : '<i class="fa-regular fa-circle-check text-purple-500 text-2xl md:text-3xl"></i>'}
              
                <h1 class="${card.priority === "high" ? "bg-red-100 text-red-500" : card.priority === "medium" ? "bg-yellow-100 text-yellow-500" : "bg-gray-200 text-gray-500"} py-1 px-5  rounded-full  font-bold uppercase">${card.priority}</h1>
              </div>
              <div class="space-y-2">
                <h1 class="text-2xl font-bold">
                  ${card.title}
                </h1>
                <p class="text-gray-400 line-clamp-2">
                  ${card.description}
                </p>
              </div>
              <div class="flex gap-2 ">
              <div>
              ${card.labels[0]?` <p class=" w-fit bg-red-100 rounded-full border border-red-500 text-red-500  p-1 font-bold uppercase ">
                <span><i class="fa-regular fa-life-ring"></i>${card.labels[0]}</span>
              </p>`:''}
              </div>
              <div>
              ${card.labels[1]?` <p class="w-fit  bg-yellow-100 rounded-full  border border-yellow-500 text-yellow-500 p-1  font-bold uppercase">
                <span><i class="fa-regular fa-life-ring"></i>${card.labels[1]}</span>
              </p>`:''}
              </div>
              </div>
              <div>
              </div>
              <div class="divider"></div>
              <div class="space-y-2">
                <p>#1 by ${card.author}</p>
                <p>${new Date(card.updatedAt).toLocaleDateString("en", "GB")}</p>
              </div>
            </div>
              `;

      return newCard;
    }

    if (card.status === "open") {
      countOpenCard.push(card);
      openCards.append(newCardFunc());
    } else if (card.status === "closed") {
      countClosed.push(card);
      closedCards.append(newCardFunc());
    }
    cardContainer.append(newCardFunc());
  });
  updateCount("all");
}
