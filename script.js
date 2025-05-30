const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");

let score = 0;
let playerX = 175;

// Movimentação
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && playerX > 0) {
    playerX -= 20;
  } else if (e.key === "ArrowRight" && playerX < 350) {
    playerX += 20;
  }
  player.style.left = playerX + "px";
});

// Itens (campo 🌽, cidade 🛍️, obstáculo ❌)
const items = ["🌽", "🛍️", "❌"];

function createItem() {
  const item = document.createElement("div");
  item.classList.add("item");
  const type = items[Math.floor(Math.random() * items.length)];
  item.innerText = type;
  item.dataset.type = type;
  item.style.left = Math.floor(Math.random() * 370) + "px";
  gameArea.appendChild(item);

  let posY = 0;
  const dropInterval = setInterval(() => {
    posY += 5;
    item.style.top = posY + "px";

    // Verificar colisão
    const itemRect = item.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      itemRect.bottom >= playerRect.top &&
      itemRect.left < playerRect.right &&
      itemRect.right > playerRect.left
    ) {
      clearInterval(dropInterval);
      item.remove();

      if (type === "❌") {
        alert("Você bateu em um obstáculo! Fim de jogo.");
        location.reload();
      } else {
        score += 10;
        scoreDisplay.innerText = "Pontuação: " + score;
      }
    }

    if (posY > 600) {
      clearInterval(dropInterval);
      item.remove();
    }
  }, 30);
}

// Criar itens periodicamente
setInterval(createItem, 1500);
