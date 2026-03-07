const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
const cardContainer = document.getElementById("cardContainer");
const openCards = document.getElementById("openCards");
const closedCards = document.getElementById("closedCards");
const totalIssues = document.getElementById("totalIssues");
let countCard = [];
let countOpenCard = [];
let countClosed = [];
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
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  displayAllIssues(data.data);
}
async function loadSingleIssues(id) {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}",
  );
  const data = await res.json();
  displaySingleIssues(data);
}
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
              <div onclick="loadSingleIssues(${card.id})" class="card card-body shadow space-y-3 md:space-y-5 h-full border-t-4 ${card.status === "open" ? "border-green-500" : "border-purple-500"}">
              <div class="flex justify-between">
                <img class="w-10 h-10 " src="./assets/Open-Status.png" alt="" />
                <h1 class="text-red-500 py-2 px-5 md:px-8 bg-red-100 rounded-full md:text-xl font-bold">${card.priority}</h1>
              </div>
              <div class="space-y-2">
                <h1 class="text-2xl font-bold">
                  ${card.title}
                </h1>
                <p class="text-gray-400 line-clamp-2">
                  ${card.description}
                </p>
              </div>
              <div class="flex gap-2">
                <p class=" bg-red-100 rounded-full border border-red-500 text-red-500 text-center py-2 font-bold">
                  <span><i class="fa-solid fa-bug"></i></span> ${card.labels[0]}
                </p>
                <p class=" bg-yellow-100 rounded-full  border border-yellow-500 text-yellow-500 text-center py-2  font-bold">
                  <span><i class="fa-regular fa-life-ring"></i></span> ${card.labels[1]}
                </p>
              </div>
              <div class="divider"></div>
              <div class="space-y-2">
                <p>${card.createdAt}</p>
                <p>${card.updatedAt}</p>
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
