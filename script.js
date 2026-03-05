/**
 * Battle Arena Web - Game Logic
 */

const characters = [
    {
        id: 1,
        nome: "Guerreiro",
        hp: 120,
        maxHp: 120,
        def: 10,
        img: "assets/warrior.png",
        description: "Mestre em armas pesadas e defesa impenetrável.",
        skills: [
            { key: 'Q', nome: 'Corte Pesado', atkMin: 15, atkMax: 22, color: '#ff4d4d' },
            { key: 'W', nome: 'Escudo Justiceiro', atkMin: 8, atkMax: 12, color: '#ffd700' },
            { key: 'E', nome: 'Fúria Dracônica', atkMin: 25, atkMax: 35, color: '#ff8c00' }
        ]
    },
    {
        id: 2,
        nome: "Mago",
        hp: 80,
        maxHp: 80,
        def: 5,
        img: "assets/mage.png",
        description: "Poder elemental devastador, mas frágil em combate.",
        skills: [
            { key: 'Q', nome: 'Seta de Gelo', atkMin: 18, atkMax: 25, color: '#4d94ff' },
            { key: 'W', nome: 'Bola de Fogo', atkMin: 25, atkMax: 35, color: '#ff4b2b' },
            { key: 'E', nome: 'Tempestade Arcana', atkMin: 40, atkMax: 55, color: '#8a2be2' }
        ]
    },
    {
        id: 3,
        nome: "Arqueiro",
        hp: 100,
        maxHp: 100,
        def: 7,
        img: "assets/archer.png",
        description: "Precisão mortal com ataques críticos frequentes.",
        skills: [
            { key: 'Q', nome: 'Tiro Rápido', atkMin: 12, atkMax: 18, color: '#32cd32' },
            { key: 'W', nome: 'Flecha Venenosa', atkMin: 20, atkMax: 28, color: '#9932cc' },
            { key: 'E', nome: 'Chuva de Flechas', atkMin: 30, atkMax: 45, color: '#ffd700' }
        ]
    }
];

// Game State
let player = null;
let cpu = null;
let isBattleOver = false;
let isPlayerTurn = true;

// DOM Elements
const selectionScreen = document.getElementById('selection-screen');
const battleScreen = document.getElementById('battle-screen');
const characterGrid = document.getElementById('character-grid');
const skillsContainer = document.getElementById('skills-container');
const resetBtn = document.getElementById('reset-btn');
const overlayResetBtn = document.getElementById('overlay-reset-btn');
const resultOverlay = document.getElementById('result-overlay');
const resultText = document.getElementById('result-text');
const combatLog = document.getElementById('combat-log');

/**
 * Initialize Character Selection
 */
function initSelection() {
    characterGrid.innerHTML = '';
    characters.forEach(char => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.innerHTML = `
            <img src="${char.img}" alt="${char.nome}">
            <h3>${char.nome}</h3>
            <p style="margin-bottom: 1rem; font-size: 0.85rem;">${char.description}</p>
            <div class="char-stats">
                <div class="stat-item">HP: <span>${char.maxHp}</span></div>
                <div class="stat-item">ATK: <span>${char.atkMin}-${char.atkMax}</span></div>
                <div class="stat-item" style="grid-column: span 2">DEFESA: <span>${char.def}</span></div>
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

    // CPU Selection (Random different from player)
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
    isPlayerTurn = true;
    isBattleOver = false;

    // UI Updates
    document.getElementById('p-name').textContent = player.nome;
    document.getElementById('p-portrait').src = player.img;
    document.getElementById('c-name').textContent = cpu.nome;
    document.getElementById('c-portrait').src = cpu.img;

    renderSkills();
    updateHpBars();
    addLog(`A batalha começou! **${player.nome}** vs **${cpu.nome}**`);
}

/**
 * Render Skill Buttons
 */
function renderSkills() {
    skillsContainer.innerHTML = '';
    player.skills.forEach(skill => {
        const btn = document.createElement('button');
        btn.className = 'skill-btn';
        btn.id = `skill-${skill.key}`;
        btn.innerHTML = `
            <span class="hotkey">${skill.key}</span>
            <span class="skill-name">${skill.nome}</span>
            <span class="skill-atk">${skill.atkMin}-${skill.atkMax} ATK</span>
        `;
        btn.onclick = () => handlePlayerAction(skill);
        skillsContainer.appendChild(btn);
    });
}

/**
 * Keyboard Listeners
 */
window.addEventListener('keydown', (e) => {
    if (!isPlayerTurn || isBattleOver) return;

    const key = e.key.toUpperCase();
    const skill = player.skills.find(s => s.key === key);

    if (skill) {
        handlePlayerAction(skill);
    }
});

function handlePlayerAction(skill) {
    if (!isPlayerTurn || isBattleOver) return;

    // Visual feedback for click/key
    const btn = document.getElementById(`skill-${skill.key}`);
    if (btn) {
        btn.style.borderColor = skill.color;
        setTimeout(() => btn.style.borderColor = '', 200);
    }

    executeAttack(player, cpu, skill);

    if (checkWin()) return;

    // CPU Turn
    setTurn(false);
    setTimeout(() => {
        if (!isBattleOver) {
            const cpuSkill = cpu.skills[Math.floor(Math.random() * cpu.skills.length)];
            executeAttack(cpu, player, cpuSkill);
            if (!checkWin()) setTurn(true);
        }
    }, 1200);
}

function setTurn(playerTurn) {
    isPlayerTurn = playerTurn;
    const btns = document.querySelectorAll('.skill-btn');
    btns.forEach(b => b.disabled = !playerTurn);
}

function executeAttack(attacker, defender, skill) {
    const rawAtk = Math.floor(Math.random() * (skill.atkMax - skill.atkMin + 1)) + skill.atkMin;
    const damage = Math.max(2, rawAtk - defender.def);

    defender.currentHp = Math.max(0, defender.currentHp - damage);

    updateHpBars();
    addLog(`**${attacker.nome}** usou **${skill.nome}** e causou **${damage}** de dano!`);

    // Visual feedback
    const defenderEl = defender === player ? document.getElementById('player-fighter') : document.getElementById('cpu-fighter');
    defenderEl.classList.add('shake');
    setTimeout(() => defenderEl.classList.remove('shake'), 500);
}

function updateHpBars() {
    const pPercent = (player.currentHp / player.maxHp) * 100;
    const cPercent = (cpu.currentHp / cpu.maxHp) * 100;

    document.getElementById('p-hp-bar').style.width = pPercent + '%';
    document.getElementById('p-hp-text').textContent = `${Math.ceil(player.currentHp)}/${player.maxHp}`;

    document.getElementById('c-hp-bar').style.width = cPercent + '%';
    document.getElementById('c-hp-text').textContent = `${Math.ceil(cpu.currentHp)}/${cpu.maxHp}`;
}

function addLog(msg) {
    const p = document.createElement('p');
    p.innerHTML = msg.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    combatLog.prepend(p);
}

/**
 * Check Win Condition
 */
function checkWin() {
    if (cpu.currentHp <= 0) {
        victory("PARABÉNS! VOCÊ VENCEU!", true);
        return true;
    }
    if (player.currentHp <= 0) {
        victory("GAME OVER! A CPU VENCEU!", false);
        return true;
    }
    return false;
}

function victory(msg, isWin) {
    isBattleOver = true;
    addLog(`### ${msg} ###`);

    // Show Overlay
    resultOverlay.classList.remove('hidden');
    resultText.textContent = isWin ? "VITÓRIA!" : "DERROTA!";
    resultText.className = isWin ? "victory-text" : "defeat-text";

    skillsContainer.classList.add('hidden');
    resetBtn.classList.remove('hidden');
}

function resetGame() {
    isBattleOver = false;
    player = null;
    cpu = null;
    battleScreen.classList.add('hidden');
    resultOverlay.classList.add('hidden');
    selectionScreen.classList.remove('hidden');
    selectionScreen.classList.add('active');
    skillsContainer.classList.remove('hidden');
    resetBtn.classList.add('hidden');
    combatLog.innerHTML = '<p>A batalha começou!</p>';
}

resetBtn.onclick = resetGame;
overlayResetBtn.onclick = resetGame;

// Initial Load
window.onload = initSelection;
