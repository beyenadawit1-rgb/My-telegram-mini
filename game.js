
const $ = (id) => document.getElementById(id);

const tg = window.Telegram?.WebApp;
tg?.ready();
tg?.expand();

let coins = Number(localStorage.getItem("minex-coins") || 0);
let energy = 100;
let total = Number(localStorage.getItem("minex-total") || 0);

function render() {
  $("coins").textContent = coins;
  $("total").textContent = total;
  $("energyText").textContent = `${energy} / 100`;
  $("energyBar").style.width = `${energy}%`;

  localStorage.setItem("minex-coins", coins);
  localStorage.setItem("minex-total", total);
}

$("mine").addEventListener("click", () => {
  if (energy <= 0) {
    tg?.HapticFeedback?.notificationOccurred("warning");
    return;
  }

  coins++;
  total++;
  energy--;

  tg?.HapticFeedback?.impactOccurred("light");
  render();
});

$("daily").addEventListener("click", () => {
  const today = new Date().toISOString().slice(0, 10);
  const lastClaim = localStorage.getItem("minex-daily");

  if (lastClaim === today) {
    alert("You have already claimed today's reward!");
    return;
  }

  coins += 50;
  localStorage.setItem("minex-daily", today);
  render();
  alert("Congratulations! You earned 50 coins.");
});

setInterval(() => {
  if (energy < 100) {
    energy = Math.min(100, energy + 1);
    render();
  }
}, 3000);

render();
