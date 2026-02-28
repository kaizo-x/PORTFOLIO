lucide.createIcons();

// Data Architecture
const projectData = [
    { name: "Kaizo Blocks", cat: "web", tag: "WIDGETS", live: true, desc: "> Initializing Dashboard...\n> Status: ACTIVE\n> Custom React widget system for workspace personalization.", link: "https://github.com/kaizo-x" },
    { name: "Weather Pred", cat: "web", tag: "API", live: true, desc: "> Fetching Meteor_Data...\n> Status: ONLINE\n> ML-based weather prediction tool integrating real-time APIs.", link: "https://github.com/kaizo-x" },
    { name: "Habit Tracker", cat: "web", tag: "SaaS", live: false, desc: "> Streak_Engine starting...\n> Status: STABLE\n> Productivity tracker with data persistence.", link: "https://github.com/kaizo-x" },
    { name: "Akinator AI", cat: "logic", tag: "ALGO", live: true, desc: "> Binary_Tree_Loading...\n> Status: RUNNING\n> High-logic guessing game built on optimized decision trees.", link: "https://github.com/kaizo-x" },
    { name: "Neon Snake", cat: "logic", tag: "CANVAS", live: true, desc: "> Render_Engine: 60FPS\n> Status: ACTIVE\n> Cyberpunk aesthetic snake game built with HTML5 Canvas.", link: "https://github.com/kaizo-x" },
    { name: "Photobooth", cat: "logic", tag: "FILTER", live: false, desc: "> Accessing_Media_Buffer...\n> Status: TESTING\n> React-based image filter app for real-time processing.", link: "https://github.com/kaizo-x" },
    { name: "Templify", cat: "design", tag: "STORE", live: true, desc: "> Asset_Marketplace: Loaded\n> Status: LIVE\n> Premium portfolio for showcasing Notion and Canva templates.", link: "https://github.com/kaizo-x" },
    { name: "Tic Tac Toe", cat: "design", tag: "UI/UX", live: false, desc: "> Game_Logic_Check...\n> Status: STABLE\n> Minimalist glassmorphic board game with smart logic.", link: "https://github.com/kaizo-x" }
];

// Project Injection
projectData.forEach(p => {
    const container = document.getElementById(`grid-${p.cat}`);
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    const badge = p.live ? `<div class="live-badge"><span class="pulse-dot"></span> LIVE</div>` : '';
    card.innerHTML = `<div class="mb-8">${badge}</div><h4 class="text-2xl font-bold font-['Clash_Display'] uppercase leading-none">${p.name}</h4><div class="mt-8 flex justify-between items-center opacity-30"><span class="text-[9px] font-bold tracking-[0.2em] font-mono">${p.tag}</span><i data-lucide="arrow-up-right" class="w-4 h-4"></i></div>`;
    card.onclick = () => openModal(p);
    container.appendChild(card);
});

// Modal Logic
function openModal(project) {
    document.getElementById('modal-title').innerText = project.name;
    document.getElementById('modal-tag').innerText = project.tag;
    document.getElementById('modal-desc').innerText = project.desc;
    document.getElementById('modal-link').href = project.link;
    document.getElementById('project-modal').classList.replace('hidden', 'flex');
}
function closeModal() { document.getElementById('project-modal').classList.replace('flex', 'hidden'); }

// Intro Logic
window.addEventListener('load', () => setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('main-content').classList.replace('opacity-0', 'opacity-100');
}, 1000));

// Reveal Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

lucide.createIcons();

const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("game-score");
const gameOverEl = document.getElementById("game-over");

const box = 20; // Size of one square
let score = 0;
let gameInterval;

let snake = [{ x: 10 * box, y: 10 * box }];
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};
let d;

// Control logic
document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if (event.keyCode == 38 && d != "DOWN") d = "UP";
    else if (event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if (event.keyCode == 40 && d != "UP") d = "DOWN";
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) return true;
    }
    return false;
}

function draw() {
    ctx.fillStyle = "#0d0d0f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Mana Snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#e2b857" : "rgba(226, 184, 87, 0.4)";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#e2b857";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.shadowBlur = 0; // Reset blur
    }

    // Draw Grimoire Food
    ctx.fillStyle = "#ffffff";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ffffff";
    ctx.beginPath();
    ctx.arc(food.x + box/2, food.y + box/2, box/4, 0, Math.PI * 2);
    ctx.fill();

    // Movement logic
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // Eating Grimoire
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        scoreEl.innerText = score < 10 ? "0" + score : score;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    // Game Over Conditions
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(gameInterval);
        gameOverEl.classList.remove("hidden");
    }

    snake.unshift(newHead);
}

function resetGame() {
    score = 0;
    scoreEl.innerText = "00";
    snake = [{ x: 10 * box, y: 10 * box }];
    d = undefined;
    gameOverEl.classList.add("hidden");
    gameInterval = setInterval(draw, 100);
}

// Start the game loop
gameInterval = setInterval(draw, 100);