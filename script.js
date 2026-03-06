/**
 * Battle Arena Web - Clash Royale Style Logic
 */

const characters = [
    {
        id: 1,
        nome: "Guerreiro",
        hp: 1500, maxHp: 1500, def: 50, img: "assets/warrior.png",
        skills: [
            { key: 'Q', nome: 'Espada Ametista', atkMin: 180, atkMax: 240, cost: 3, color: '#9b59b6', shield: 0.1, img: "https://images.unsplash.com/photo-1594911776101-509be04e9545?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'W', nome: 'Corte Roxo', atkMin: 220, atkMax: 300, cost: 4, color: '#8e44ad', shield: 0, img: "https://images.unsplash.com/photo-1552086115-99d75086d421?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'E', nome: 'Fúria Violeta', atkMin: 400, atkMax: 550, cost: 7, color: '#663399', shield: 0, img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'R', nome: 'Escudo Lazul', atkMin: 50, atkMax: 100, cost: 3, color: '#3498db', shield: 0.7, img: "https://images.unsplash.com/photo-1454160869408-59b4b88d7499?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'T', nome: 'Baluarte Azul', atkMin: 20, atkMax: 50, cost: 5, color: '#2980b9', shield: 0.9, img: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=150&h=150&auto=format&fit=crop" }
        ]
    },
    {
        id: 2,
        nome: "Mago",
        hp: 900, maxHp: 900, def: 20, img: "assets/mage.png",
        skills: [
            { key: 'Q', nome: 'Seta Púrpura', atkMin: 250, atkMax: 350, cost: 3, color: '#9b59b6', shield: 0, img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'W', nome: 'Explosão Astral', atkMin: 450, atkMax: 600, cost: 6, color: '#8e44ad', shield: 0, img: "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'E', nome: 'Relâmpago Roxo', atkMin: 700, atkMax: 900, cost: 9, color: '#663399', shield: 0, img: "https://images.unsplash.com/photo-1534938665420-4193effeabb4?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'R', nome: 'Mana Shield', atkMin: 20, atkMax: 80, cost: 4, color: '#3498db', shield: 0.8, img: "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'T', nome: 'Cristal Azul', atkMin: 50, atkMax: 120, cost: 5, color: '#2980b9', shield: 0.95, img: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?q=80&w=150&h=150&auto=format&fit=crop" }
        ]
    },
    {
        id: 3,
        nome: "Arqueiro",
        hp: 1100, maxHp: 1100, def: 30, img: "assets/archer.png",
        skills: [
            { key: 'Q', nome: 'Tiro de Plasma', atkMin: 140, atkMax: 200, cost: 2, color: '#9b59b6', shield: 0.1, img: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'W', nome: 'Dardo Roxo', atkMin: 280, atkMax: 380, cost: 5, color: '#8e44ad', shield: 0, img: "https://images.unsplash.com/photo-1500477846903-f36fc33923fc?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'E', nome: 'Chuva de Neon', atkMin: 550, atkMax: 750, cost: 8, color: '#663399', shield: 0.1, img: "https://images.unsplash.com/photo-1534796633331-85532cb81002?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'R', nome: 'Vento Azul', atkMin: 60, atkMax: 120, cost: 3, color: '#3498db', shield: 0.6, img: "https://images.unsplash.com/photo-1513224502586-d1e602410265?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'T', nome: 'Manto Glacial', atkMin: 30, atkMax: 60, cost: 5, color: '#2980b9', shield: 0.85, img: "https://images.unsplash.com/photo-1502481851512-e9e2529bbbf9?q=80&w=150&h=150&auto=format&fit=crop" }
        ]
    },
    {
        id: 4,
        nome: "Bárbaro",
        hp: 1300, maxHp: 1300, def: 35, img: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=200&h=200&auto=format&fit=crop",
        skills: [
            { key: 'Q', nome: 'Machado Roxo', atkMin: 200, atkMax: 280, cost: 3, color: '#9b59b6', shield: 0, img: "https://images.unsplash.com/photo-1582234373443-4dc68a8f1541?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'W', nome: 'Gancho Violeta', atkMin: 300, atkMax: 420, cost: 5, color: '#8e44ad', shield: 0, img: "https://images.unsplash.com/photo-1510511459019-5dee995ad3ff?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'E', nome: 'Golpe Brutal', atkMin: 600, atkMax: 850, cost: 9, color: '#663399', shield: 0.2, img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'R', nome: 'Couro Azul', atkMin: 40, atkMax: 80, cost: 3, color: '#3498db', shield: 0.5, img: "https://images.unsplash.com/photo-1550418290-a8d86ad674a6?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'T', nome: 'Grito de Gelo', atkMin: 100, atkMax: 180, cost: 6, color: '#2980b9', shield: 0.8, img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=150&h=150&auto=format&fit=crop" }
        ]
    },
    {
        id: 5,
        nome: "Paladino",
        hp: 1800, maxHp: 1800, def: 70, img: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=200&h=200&auto=format&fit=crop",
        skills: [
            { key: 'Q', nome: 'Martelo Roxo', atkMin: 120, atkMax: 180, cost: 3, color: '#9b59b6', shield: 0.2, img: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'W', nome: 'Selo Violeta', atkMin: 250, atkMax: 350, cost: 5, color: '#8e44ad', shield: 0.3, img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'E', nome: 'Julgamento Roxo', atkMin: 400, atkMax: 600, cost: 8, color: '#663399', shield: 0, img: "https://images.unsplash.com/photo-1550684847-75bdda21cc95?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'R', nome: 'Fé Azul', atkMin: 50, atkMax: 100, cost: 4, color: '#3498db', shield: 0.85, img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'T', nome: 'Aura Celeste', atkMin: 0, atkMax: 50, cost: 6, color: '#2980b9', shield: 0.98, img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=150&h=150&auto=format&fit=crop" }
        ]
    },
    {
        id: 6,
        nome: "Ninja",
        hp: 850, maxHp: 850, def: 15, img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=200&h=200&auto=format&fit=crop",
        skills: [
            { key: 'Q', nome: 'Kunai Roxa', atkMin: 180, atkMax: 250, cost: 2, color: '#9b59b6', shield: 0, img: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'W', nome: 'Lâmina Violeta', atkMin: 350, atkMax: 500, cost: 5, color: '#8e44ad', shield: 0, img: "https://images.unsplash.com/photo-1582234373443-4dc68a8f1541?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'E', nome: 'Dragão Púrpura', atkMin: 750, atkMax: 1000, cost: 10, color: '#663399', shield: 0, img: "https://images.unsplash.com/photo-1504333638930-c8787321eba0?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'R', nome: 'Ilusão Azul', atkMin: 10, atkMax: 50, cost: 4, color: '#3498db', shield: 0.8, img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=150&h=150&auto=format&fit=crop" },
            { key: 'T', nome: 'Fuga Ártica', atkMin: 50, atkMax: 100, cost: 6, color: '#2980b9', shield: 0.9, img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=150&h=150&auto=format&fit=crop" }
        ]
    }
];

// Game State
let player = null;
let cpu = null;
let isBattleOver = false;
let playerElixir = 5;
let cpuElixir = 5;
let playerShield = 0;
let cpuShield = 0;
const MAX_ELIXIR = 10;

// DOM Elements
const selectionScreen = document.getElementById('selection-screen');
const battleScreen = document.getElementById('battle-screen');
const characterGrid = document.getElementById('character-grid');
const skillsContainer = document.getElementById('skills-container');
const pElixirBar = document.getElementById('elixir-bar');
const cElixirBar = document.getElementById('cpu-elixir-bar');
const resetBtn = document.getElementById('reset-btn');
const overlayResetBtn = document.getElementById('overlay-reset-btn');
const resultOverlay = document.getElementById('result-overlay');
const resultText = document.getElementById('result-text');
const combatLog = document.getElementById('combat-log');
const bgMusic = document.getElementById('bg-music');

/**
 * Initialize Character Selection
 */
function initSelection() {
    characterGrid.innerHTML = '';
    characters.forEach(char => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${char.img}" alt="${char.nome}">
            </div>
            <div class="card-info">
                <h3>${char.nome}</h3>
                <div class="char-stats">
                    <span>HP: ${char.maxHp}</span> | <span>DEF: ${char.def}</span>
                </div>
            </div>
        `;
        card.onclick = () => selectCharacter(char.id);
        characterGrid.appendChild(card);
    });
}

/**
 * Handle Player Selection
 */
function selectCharacter(id) {
    const selected = characters.find(c => c.id === id);
    player = { ...selected, currentHp: selected.hp };

    const otherChars = characters.filter(c => c.id !== id);
    const cpuSelected = otherChars[Math.floor(Math.random() * otherChars.length)];
    cpu = { ...cpuSelected, currentHp: cpuSelected.hp };

    startBattle();
}

/**
 * Start Battle Interface
 */
function startBattle() {
    selectionScreen.classList.remove('active');
    selectionScreen.classList.add('hidden');
    battleScreen.classList.remove('hidden');
    isBattleOver = false;
    playerElixir = 5;
    cpuElixir = 5;
    playerShield = 0;
    cpuShield = 0;

    document.getElementById('p-name').textContent = player.nome;
    document.getElementById('p-portrait').src = player.img;
    document.getElementById('c-name').textContent = cpu.nome;
    document.getElementById('c-portrait').src = cpu.img;

    renderSkills();
    updateHpBars();
    startCombatLoops();

    // Start background music
    if (bgMusic) {
        bgMusic.volume = 0.3;
        bgMusic.play().catch(e => console.log("Erro ao tocar música:", e));
    }
}

function startCombatLoops() {
    // Elixir Regeneration Loop
    const regen = setInterval(() => {
        if (isBattleOver) {
            clearInterval(regen);
            return;
        }

        if (playerElixir < MAX_ELIXIR) playerElixir = Math.min(MAX_ELIXIR, playerElixir + 0.15);
        if (cpuElixir < MAX_ELIXIR) cpuElixir = Math.min(MAX_ELIXIR, cpuElixir + 0.15);

        updateElixirUI();
    }, 100);

    // CPU AI Loop
    const cpuAction = setInterval(() => {
        if (isBattleOver) {
            clearInterval(cpuAction);
            return;
        }

        // Logical choice: use most expensive skill available
        const possibleSkills = cpu.skills.filter(s => cpuElixir >= s.cost);
        if (possibleSkills.length > 0) {
            const skill = possibleSkills.reduce((prev, current) => (prev.cost > current.cost) ? prev : current);
            handleCpuAction(skill);
        }
    }, 1500); // CPU checks for attacks every 1.5s
}

function updateElixirUI() {
    pElixirBar.style.width = (playerElixir / MAX_ELIXIR) * 100 + '%';
    cElixirBar.style.width = (cpuElixir / MAX_ELIXIR) * 100 + '%';

    // Check which cards are playable
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach((card, index) => {
        const skill = player.skills[index];
        card.disabled = playerElixir < skill.cost;
    });
}

/**
 * Render Skill Cards
 */
function renderSkills() {
    skillsContainer.innerHTML = '';
    player.skills.forEach(skill => {
        const card = document.createElement('button');
        card.className = 'skill-card';
        card.innerHTML = `
            <div class="elixir-cost">${skill.cost}</div>
            <div class="skill-icon" style="background-image: url('${skill.img}')"></div>
            <span class="skill-card-name">${skill.nome}</span>
        `;
        card.onclick = () => handlePlayerAction(skill);
        skillsContainer.appendChild(card);
    });
}

/**
 * Keyboard Listeners
 */
window.addEventListener('keydown', (e) => {
    if (isBattleOver) return;
    const key = e.key.toUpperCase();
    const skill = player.skills.find(s => s.key === key);
    if (skill && playerElixir >= skill.cost) {
        e.preventDefault();
        handlePlayerAction(skill);
    }
}, true);

function handlePlayerAction(skill) {
    if (isBattleOver || playerElixir < skill.cost) return;

    playerElixir -= skill.cost;
    updateElixirUI();

    // Apply Shield momentarily with dynamic color (Blue for defenses)
    playerShield = skill.shield;
    toggleShieldVisual('player', true, skill.color);
    setTimeout(() => {
        playerShield = 0;
        toggleShieldVisual('player', false);
    }, 1000);

    executeAttack(player, cpu, skill);
    checkWin();
}

function handleCpuAction(skill) {
    if (isBattleOver || cpuElixir < skill.cost) return;

    cpuElixir -= skill.cost;
    updateElixirUI();

    cpuShield = skill.shield;
    toggleShieldVisual('cpu', true, skill.color);
    setTimeout(() => {
        cpuShield = 0;
        toggleShieldVisual('cpu', false);
    }, 1000);

    executeAttack(cpu, player, skill);
    checkWin();
}

function toggleShieldVisual(type, show, color) {
    const el = document.querySelector(`.${type} .shield-vfx`);
    if (el) {
        if (show) {
            el.style.borderColor = color;
            el.style.boxShadow = `0 0 30px ${color}, inset 0 0 20px ${color}`;
            el.style.background = `radial-gradient(circle, transparent 40%, ${color}33 100%)`; // 33 is hex for 20% opacity
            el.classList.add('shield-active');
        } else {
            el.classList.remove('shield-active');
        }
    }
}

function setTurn(playerTurn) {
    isPlayerTurn = playerTurn;
    updateElixirUI();
}

function executeAttack(attacker, defender, skill) {
    const rawAtk = Math.floor(Math.random() * (skill.atkMax - skill.atkMin + 1)) + skill.atkMin;

    // Attack and Defend calculation (reduced by defender shield)
    const activeShield = (defender === player) ? playerShield : cpuShield;
    const damage = Math.max(20, (rawAtk * (1 - activeShield)) - defender.def);

    defender.currentHp = Math.max(0, defender.currentHp - damage);

    updateHpBars();

    const defenderEl = defender === player ? document.getElementById('player-fighter') : document.getElementById('cpu-fighter');
    createImpactFX(defenderEl, skill.color);
    triggerScreenEffects(defenderEl);
}

function createImpactFX(target, color) {
    const portraitContainer = target.querySelector('.fighter-img');

    // Flash white effect
    portraitContainer.classList.add('flash-white');
    setTimeout(() => portraitContainer.classList.remove('flash-white'), 300);

    // Particles
    const rect = portraitContainer.getBoundingClientRect();
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.backgroundColor = color;
        particle.style.width = Math.random() * 8 + 4 + 'px';
        particle.style.height = particle.style.width;

        const tx = (Math.random() - 0.5) * 200 + 'px';
        const ty = (Math.random() - 0.5) * 200 + 'px';
        particle.style.setProperty('--tx', tx);
        particle.style.setProperty('--ty', ty);

        particle.style.left = '50%';
        particle.style.top = '50%';

        portraitContainer.parentElement.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
}

function triggerScreenEffects(target) {
    target.classList.add('shake');
    document.body.classList.add('flash-white');
    setTimeout(() => {
        target.classList.remove('shake');
        document.body.classList.remove('flash-white');
    }, 500);
}

function updateHpBars() {
    const pPercent = (player.currentHp / player.maxHp) * 100;
    const cPercent = (cpu.currentHp / cpu.maxHp) * 100;

    document.getElementById('p-hp-bar').style.width = pPercent + '%';
    document.getElementById('c-hp-bar').style.width = cPercent + '%';
}

function checkWin() {
    if (cpu.currentHp <= 0) {
        victory("VITÓRIA!", true);
        return true;
    }
    if (player.currentHp <= 0) {
        victory("DERROTA!", false);
        return true;
    }
    return false;
}

function victory(msg, isWin) {
    isBattleOver = true;
    resultOverlay.classList.remove('hidden');
    resultText.textContent = isWin ? "VITÓRIA!" : "DERROTA!";
    resultText.className = isWin ? "victory-text" : "defeat-text";

    // Stop background music
    if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }
}

function resetGame() {
    isBattleOver = false;
    player = null;
    cpu = null;
    battleScreen.classList.add('hidden');
    resultOverlay.classList.add('hidden');
    selectionScreen.classList.remove('hidden');
    selectionScreen.classList.add('active');
}

resetBtn.onclick = resetGame;
overlayResetBtn.onclick = resetGame;

window.onload = initSelection;
