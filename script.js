/**
 * Battle Arena Web - Game Logic
 */

const characters = [
    { 
        id: 1, 
        nome: "Guerreiro", 
        hp: 120, 
        maxHp: 120, 
        atkMin: 12, 
        atkMax: 18, 
        def: 10,
        img: "assets/warrior.png",
        description: "Mestre em armas pesadas e defesa impenetrável."
    },
    { 
        id: 2, 
        nome: "Mago", 
        hp: 80, 
        maxHp: 80, 
        atkMin: 18, 
        atkMax: 28, 
        def: 5,
        img: "assets/mage.png",
        description: "Poder elemental devastador, mas frágil em combate."
    },
    { 
        id: 3, 
        nome: "Arqueiro", 
        hp: 100, 
        maxHp: 100, 
        atkMin: 15, 
        atkMax: 22, 
        def: 7,
        img: "assets/archer.png",
        description: "Precisão mortal com ataques críticos frequentes."
    }
];

// Game State
let player = null;
let cpu = null;
let isBattleOver = false;

// DOM Elements
const selectionScreen = document.getElementById('selection-screen');
const battleScreen = document.getElementById('battle-screen');
const characterGrid = document.getElementById('character-grid');
const attackBtn = document.getElementById('attack-btn');
const resetBtn = document.getElementById('reset-btn');
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

    // UI Updates
    document.getElementById('p-name').textContent = player.nome;
    document.getElementById('p-portrait').src = player.img;
    document.getElementById('c-name').textContent = cpu.nome;
    document.getElementById('c-portrait').src = cpu.img;

    updateHpBars();
    addLog(`A batalha começou! **${player.nome}** vs **${cpu.nome}**`);
}

/**
 * Combat Round Logic
 */
attackBtn.onclick = () => {
    if (isBattleOver) return;

    // Player Turn
    executeAttack(player, cpu);
    
    if (checkWin()) return;

    // CPU Turn after 1s
    attackBtn.disabled = true;
    setTimeout(() => {
        if (!isBattleOver) {
            executeAttack(cpu, player);
            checkWin();
            attackBtn.disabled = false;
        }
    }, 1000);
};

function executeAttack(attacker, defender) {
    const rawAtk = Math.floor(Math.random() * (attacker.atkMax - attacker.atkMin + 1)) + attacker.atkMin;
    const damage = Math.max(2, rawAtk - defender.def);
    
    defender.currentHp = Math.max(0, defender.currentHp - damage);
    
    updateHpBars();
    addLog(`**${attacker.nome}** causou **${damage}** de dano em ${defender.nome}!`);

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
        victory("PARABÉNS! VOCÊ VENCEU!");
        return true;
    }
    if (player.currentHp <= 0) {
        victory("GAME OVER! A CPU VENCEU!");
        return true;
    }
    return false;
}

function victory(msg) {
    isBattleOver = true;
    addLog(`### ${msg} ###`);
    attackBtn.classList.add('hidden');
    resetBtn.classList.remove('hidden');
}

resetBtn.onclick = () => {
    isBattleOver = false;
    player = null;
    cpu = null;
    battleScreen.classList.add('hidden');
    selectionScreen.classList.remove('hidden');
    selectionScreen.classList.add('active');
    attackBtn.classList.remove('hidden');
    resetBtn.classList.add('hidden');
    combatLog.innerHTML = '<p>A batalha começou!</p>';
    attackBtn.disabled = false;
};

// Initial Load
window.onload = initSelection;
