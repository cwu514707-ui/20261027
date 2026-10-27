let characterSprite; // 儲存角色的橫向精靈圖。
let characterX; // 儲存角色中心點的水平位置。
let characterY; // 儲存角色中心點的垂直位置。
let facingDirection = 1; // 設定角色初始面向右方。
const spriteFrameCount = 12; // 設定精靈圖實際包含的 12 個動畫姿勢。
const spriteFrameWidth = 1920 / spriteFrameCount; // 依照圖片實際寬度計算每格 160 像素。
const spriteFrameHeight = 134; // 設定每格精靈圖的高度。
const movementSpeed = 4; // 設定角色每影格的移動速度。

function preload() { // 在畫布建立前載入角色精靈圖。
  characterSprite = loadImage('1/fall.png'); // 載入 1 資料夾內的 fall.png 圖片。
} // 結束圖片載入函式。

function setup() { // 設定畫布與角色初始狀態。
  createCanvas(windowWidth, windowHeight); // 建立符合視窗尺寸的畫布。
  characterX = width / 2; // 將角色水平位置設在畫面中央。
  characterY = height / 2; // 將角色垂直位置設在畫面中央。
  imageMode(CENTER); // 讓繪圖座標代表圖片中心點。
  frameRate(60); // 將動畫更新速率設定為每秒 60 格。
} // 結束畫布設定函式。

function draw() { // 每一影格更新角色並繪製畫面。
  background('#caf0f8'); // 使用指定的淺藍色清除畫布。

  if (keyIsDown(RIGHT_ARROW)) { // 檢查右方向鍵是否正被按住。
    characterX += movementSpeed; // 持續將角色向右移動。
    facingDirection = 1; // 將角色朝向右方。
  } // 結束右方向鍵判斷。

  if (keyIsDown(LEFT_ARROW)) { // 檢查左方向鍵是否正被按住。
    characterX -= movementSpeed; // 持續將角色向左移動。
    facingDirection = -1; // 將角色朝向左方。
  } // 結束左方向鍵判斷。

  characterX = constrain(characterX, spriteFrameWidth / 2, width - spriteFrameWidth / 2); // 限制角色不會移出畫布左右邊界。

  const currentFrame = floor(frameCount / 8) % spriteFrameCount; // 每 8 個影格切換一次精靈動畫格。
  const sourceX = currentFrame * spriteFrameWidth; // 計算目前動畫格在精靈圖上的水平起點。

  push(); // 暫存目前的繪圖狀態。
  translate(characterX, characterY); // 將繪圖原點移至角色中心。
  scale(facingDirection, 1); // 依角色面向決定是否水平翻轉。
  image(characterSprite, 0, 0, spriteFrameWidth, spriteFrameHeight, sourceX, 0, spriteFrameWidth, spriteFrameHeight); // 繪製目前的精靈動畫格。
  pop(); // 還原繪圖狀態以免影響後續繪圖。
} // 結束畫面更新函式。

function windowResized() { // 在瀏覽器視窗尺寸改變時更新畫布。
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為新的視窗尺寸。
  characterX = constrain(characterX, spriteFrameWidth / 2, width - spriteFrameWidth / 2); // 保持角色在調整後畫布的左右範圍內。
  characterY = constrain(characterY, spriteFrameHeight / 2, height - spriteFrameHeight / 2); // 保持角色在調整後畫布的上下範圍內。
} // 結束視窗尺寸更新函式。
