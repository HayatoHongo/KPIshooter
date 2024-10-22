const gameArea = document.getElementById('gameArea');
const scoreElement = document.getElementById('score');
let score = 0;

// 文字ごとの点数設定
const characters = [
    { char: 'A', points: 10 },
    { char: 'B', points: 20 },
    { char: 'C', points: 30 },
    { char: 'D', points: 40 },
    { char: 'E', points: 50 },
];

// ランダムな位置を生成
function getRandomPosition() {
    const x = Math.floor(Math.random() * (gameArea.offsetWidth - 50));
    const y = Math.floor(Math.random() * (gameArea.offsetHeight - 50));
    return { x, y };
}

// 文字を生成して動かす
function createMovingCharacter(character) {
    const charElement = document.createElement('div');
    charElement.textContent = character.char;
    charElement.className = 'movingCharacter';
    
    const { x, y } = getRandomPosition();
    charElement.style.left = `${x}px`;
    charElement.style.top = `${y}px`;
    
    charElement.addEventListener('click', () => {
        // クリックされたらスコアを追加
        score += character.points;
        scoreElement.textContent = score;
        
        // クリックされた文字を消す
        gameArea.removeChild(charElement);
    });
    
    gameArea.appendChild(charElement);
    
    // 一定時間後に文字を消す
    setTimeout(() => {
        if (gameArea.contains(charElement)) {
            gameArea.removeChild(charElement);
        }
    }, 3000);  // 3秒後に消える
}

// ゲームの開始
function startGame() {
    setInterval(() => {
        const randomChar = characters[Math.floor(Math.random() * characters.length)];
        createMovingCharacter(randomChar);
    }, 1000);  // 毎秒新しい文字を生成
}

startGame();
