const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");

document.getElementById("buttons").addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("btn")) {
    const allButtons = document.querySelectorAll("#buttons .btn");
    allButtons.forEach((btn) => btn.classList.remove("btn-primary"));
    target.classList.add("btn-primary");
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
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}')
    const data = await res.json()
    displaySingleIssues(data)
}
loadAllIssues();
async function displayAllIssues(cards) {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";
  cards.forEach((card) => {
    const newCard = document.createElement("div");

    newCard.innerHTML = `
        <div onclick="loadSingleIssues(${card.id})" class="card card-body shadow space-y-3 md:space-y-5 h-full border-t-4 ${card.status==='open'?'border-green-500':'border-purple-500'}">
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
        cardContainer.append(newCard)
  });
}
