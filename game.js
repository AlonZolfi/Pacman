var context = canvas.getContext("2d");
var lost;
var shape = {};
var board;
var score=0;
var pac_color;
var time_pass;
var time_elapsed;
var intervalGame;
var intervalMonsters;
var intervalBonus;
var intervalClock;
var intervalMedicine;
var user_right;
var user_left;
var user_up;
var user_down;
var user_food;
var user_points5;
var user_points15;
var user_points25;
var user_time;
var user_monsters;
var enemy;
var enemyImg;
var boardLnt = 16;
var pacman_remain = 3;
var locations = [[1,1],[boardLnt,1],[1,boardLnt]];
var bonus;
var bonusImg;
var isBonus;
var clock;
var clockImg;
var isClock;
var medicine;
var medicineImg;
var isMedicine;
var degrees=0;
var ballsRemain;
var isOpen;
var lessThen60;
var returnMonsters;
var noMonsters;
var intervalDraw;
var a=1;
var b=1;
var wallImg = new Image();

function stopGame() {
    window.clearInterval(intervalGame);
    window.clearInterval(intervalMonsters);
    window.clearInterval(intervalBonus);
    window.clearInterval(intervalClock);
    window.clearInterval(intervalMedicine);
    window.clearInterval(intervalDraw);
    document.getElementById("music").pause();
}

function setAllForGame() {
    user_right = $("#contact_right_button").val();
    user_left = $("#contact_left_button").val();
    user_up = $("#contact_up_button").val();
    user_down = $("#contact_down_button").val();
    user_food = $("#contact_food").val();
    user_points5 = $("#contact_5_points").val();
    user_points15 = $("#contact_15_points").val();
    user_points25 = $("#contact_25_points").val();
    user_time = $("#contact_play_time").val();
    user_monsters = $("#contact_monsters").val();
}
function startNewGame(){
    stopGame();
    score=0;
    lost=false;
    lessThen60 = false;
    noMonsters=false;
    pacman_remain=3;
    isBonus=true;
    isClock=false;
    isMedicine=false;
    isOpen=true;
    time_pass=0;
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.code]=true;
    }, false);
    Start();
    wallImg.src = "wall.png"
}
function Start() {
    board = [];
    pac_color = "yellow";
    pac_color = "yellow";
    var cnt = boardLnt * boardLnt;
    ballsRemain = user_food;
    var food_remain = user_food;
    var food_remain_5 = Math.floor(user_food * 0.6);
    var food_remain_15 = Math.floor(user_food * 0.3);
    var food_remain_25 = user_food - food_remain_5 - food_remain_15;
    for (var i = 0; i < boardLnt + 2; i++) {
        board[i] = [];
        for (var j = 0; j < boardLnt + 2; j++) {
            if (i === 0 || j === 0 || i === boardLnt + 1 || j === boardLnt + 1 ||
                (i === 1 && (j === 3 ||  j === 14)) ||
                (i === 16 && (j === 3 ||  j === 14)) ||
                (i === 6 && (j === 6 ||  j === 11)) ||
                (i === 11 && (j === 6 ||  j === 11)) ||
                (i === 7 && (j === 3 ||  j === 14)) ||
                (i === 8 && (j === 3 ||  j === 14)) ||
                (i === 9 && (j === 3 ||  j === 14)) ||
                (i === 10 && (j === 3 ||  j === 14)) ||
                (i === 3 && (j === 1 ||  j === 7 || j === 8 || j === 9 || j === 10 || j === 16)) ||
                (i === 14 && (j === 1 ||  j === 7 || j === 8 || j === 9 || j === 10 || j === 16)))
                board[i][j] = 4;
            else {
                var randomNum = getRandomInt(100);
                if (randomNum > 70) {
                    if (randomNum > 90 && food_remain_25 > 0) {
                        board[i][j] = 25;
                        food_remain_25--;
                        food_remain--;
                    } else if (randomNum > 80 && food_remain_15 > 0) {
                        board[i][j] = 15;
                        food_remain_15--;
                        food_remain--;
                    } else if (randomNum > 70 && food_remain_5 > 0) {
                        board[i][j] = 5;
                        food_remain_5--;
                        food_remain--;
                    }
                } else {
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }
    while (food_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        if (food_remain_25 > 0) {
            board[emptyCell[0]][emptyCell[1]] = 25;
            food_remain_25--;
        } else if (food_remain_15 > 0) {
            board[emptyCell[0]][emptyCell[1]] = 15;
            food_remain_15--;
        } else {
            board[emptyCell[0]][emptyCell[1]] = 5;
            food_remain_5--;
        }
        food_remain--;
    }
    continueGame();
}
function continueGame() {
    document.getElementById("music").play();
    if (pacman_remain > 0) {
        lost=false;
        let cellForPacmen = findRandomEmptyCell(board);
        let xCell = cellForPacmen[0];
        let yCell = cellForPacmen[1];
        board[xCell][yCell] = 2;
        shape.i = xCell;
        shape.j = yCell;
        pacman_remain--;
        if(time_elapsed<60) {
            createClock();
            createMedicine();
        }
    } else{
        window.alert("You Lost!");
        stopGame();
        goTo("settings");
        return;
    }
    if(!noMonsters) {
        createMonsters();
    }
    //set bonus
    if(isBonus) {
        bonus = {};
        bonusImg = new Image();
        bonusImg.src = "bonus.png";
        bonus.x = boardLnt;
        bonus.y = boardLnt;
        intervalBonus = setInterval(updateBonus, 200);
    }

    intervalGame = setInterval(updatePosition, 50);
    intervalDraw = setInterval(Draw,20);
}
function Draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    lblLife.value = pacman_remain+1;
    let squareH = canvas.height / (boardLnt+2);
    let squareW = canvas.width / (boardLnt+2);
    let squareR = Math.min(squareW,squareH) / 2;
    for (var i = 0; i < boardLnt+2; i++) {
        for (var j = 0; j < boardLnt+2; j++) {
            var center = {};
            center.x = i * squareH + squareH/2;
            center.y = j * squareW + squareW/2;
            if (board[i][j] === 2) {
                context.beginPath();
                if (isOpen) {
                    context.arc(center.x, center.y, squareR, 0.125 * Math.PI + degrees, 1.875 * Math.PI + degrees); // half circle
                }else {
                    context.arc(center.x, center.y, squareR, 0, 2 * Math.PI);
                    isOpen = true;
                }
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + (squareW*0.25*a), center.y - (squareH*0.25*b), 2, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] === 25) {
                context.beginPath();
                context.arc(center.x, center.y, squareR*0.75 + 1, 0, 2 * Math.PI); // circle
                context.fillStyle = "#e6faff"; //color
                context.fill();
                context.beginPath();
                context.arc(center.x, center.y, squareR*0.75, 0, 2 * Math.PI); // circle
                context.fillStyle = user_points25; //color
                context.fill();
            } else if (board[i][j] === 15) {
                context.beginPath();
                context.arc(center.x, center.y, squareR*0.625 + 1, 0, 2 * Math.PI); // circle
                context.fillStyle = "#e6faff"; //color
                context.fill();
                context.beginPath();
                context.arc(center.x, center.y, squareR*0.625, 0, 2 * Math.PI); // circle
                context.fillStyle = user_points15; //color
                context.fill();
            } else if (board[i][j] === 5) {
                context.beginPath();
                context.arc(center.x, center.y, squareR*0.5 + 1, 0, 2 * Math.PI); // circle
                context.fillStyle = "#e6faff"; //color
                context.fill();
                context.beginPath();
                context.arc(center.x, center.y, squareR*0.5, 0, 2 * Math.PI); // circle
                context.fillStyle = user_points5; //color
                context.fill();
            } else if (board[i][j] === 4) {
                context.beginPath();
                context.rect(center.x - (squareW/2), center.y - (squareH/2), squareH, squareW);
                context.fillStyle = "blue"; //color
                context.fill();
                context.drawImage(wallImg, i * squareH, j * squareW, squareH, squareW);
            }
            for (let k = 0; k < user_monsters; k++) {
                var thaMonsterImg = enemyImg[k];
                var thaMonster = enemy[k];
                if (i === thaMonster.x && j === thaMonster.y)
                    context.drawImage(thaMonsterImg, i * squareH, j * squareW, squareH, squareW);
            }
            if (i === bonus.x && j === bonus.y) {
                if (isBonus)
                    context.drawImage(bonusImg, i * squareH, j * squareW, squareH, squareW);
            }
            if (isClock) {
                if (i === clock.x && j === clock.y) {
                    context.drawImage(clockImg, i * squareH, j * squareW, squareH, squareW);
                }
            }
            if (isMedicine) {
                if (i === medicine.x && j === medicine.y) {
                    context.drawImage(medicineImg, i * squareH, j * squareW, squareH, squareW);
                }
            }
        }
    }
}

function updateTime() {
    if (isClock && shape.i === clock.x && shape.j === clock.y) {
        window.alert("Great job! 30 more sec for you!");
        time_pass -= 30;
        isClock = false;
        clock.x = null;
        clock.y = null;
        window.clearInterval(intervalClock);
    }
}
function updatePosition() {
    time_pass+=0.05;
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x === 1)
        if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4)
            shape.j--;
    if (x === 2)
        if (shape.j < boardLnt + 1 && board[shape.i][shape.j + 1] !== 4)
            shape.j++;
    if (x === 3)
        if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4)
            shape.i--;
    if (x === 4)
        if (shape.i < boardLnt + 1 && board[shape.i + 1][shape.j] !== 4)
            shape.i++;
    if (board[shape.i][shape.j] === 5) {
        score += 5;
        ballsRemain--;
    }
    if (board[shape.i][shape.j] === 15) {
        score += 15;
        ballsRemain--;
    }
    if (board[shape.i][shape.j] === 25) {
        score += 25;
        ballsRemain--;
    }
    board[shape.i][shape.j] = 2;
    time_elapsed = (user_time - time_pass).toFixed(0);
    if (!lessThen60 && time_elapsed<=60){
        lessThen60 = true;
        isClock = true;
        isMedicine = true;
        createClock();
        createMedicine();
    }
    if (noMonsters && time_elapsed < returnMonsters) {
        noMonsters=false;
        createMonsters();
    }
    if (time_elapsed <= 0) {
        stopGame();
        if (score<150) {
            window.alert("You can do better\n Your score is: "+score);
        }
        else {
            window.alert("We have a Winner!!!\n Your score is: "+score);
        }
        goTo("settings");
    }
    if (ballsRemain===0) {
        stopGame();
        window.alert("We have a Winner!!!\n Great job!");
        goTo("settings");
    }
}

function getManhattanDistance(wantedX, wantedY) {
    return Math.sqrt(Math.pow(wantedX-shape.i,2)+Math.pow(wantedY-shape.j,2));

}

function updateMonsters() {
    for (let i = 0; i < user_monsters && !lost; i++) {
        var xMonster = enemy[i].x;
        var yMonster = enemy[i].y;
        var booleanUp = (yMonster > 0 && board[xMonster][yMonster - 1] !== 4);
        var booleanDown = (yMonster < boardLnt + 1 && board[xMonster][yMonster + 1] !== 4);
        var booleanLeft = (xMonster > 0 && board[xMonster - 1][yMonster] !== 4);
        var booleanRight = (xMonster < boardLnt + 1 && board[xMonster + 1][yMonster] !== 4);
        if (xMonster === shape.i && yMonster === shape.j) {
            lost = true;
            score -= 10;
            stopGame();
            if (isClock) {
                clock.x = null;
                clock.y = null;
            }
            if (isMedicine) {
                medicine.x = null;
                medicine.y = null;
            }
            board[shape.i][shape.j] = 0;
            //window.alert("You have " + pacman_remain + " more lives!");
            continueGame();
        } else {
            var rand = getRandomInt(10);
            if ( shape.i < xMonster && booleanLeft && anotherMonsterIsntThere(i,xMonster-1,yMonster))
                enemy[i].x = xMonster - 1;
            else if (shape.j < yMonster && booleanUp && anotherMonsterIsntThere(i,xMonster,yMonster-1))
                enemy[i].y = yMonster - 1;
            else if (shape.i > xMonster && booleanRight && anotherMonsterIsntThere(i,xMonster+1,yMonster))
                enemy[i].x = xMonster + 1;
            else if (shape.j > yMonster && booleanDown && anotherMonsterIsntThere(i,xMonster,yMonster+1))
                enemy[i].y = yMonster + 1;
            else {
                if ( booleanUp && anotherMonsterIsntThere(i,xMonster,yMonster-1))
                    enemy[i].y = yMonster - 1;
                else if ( booleanDown && anotherMonsterIsntThere(i,xMonster,yMonster+1))
                    enemy[i].y = yMonster + 1;
                else if (booleanLeft && anotherMonsterIsntThere(i,xMonster-1,yMonster))
                    enemy[i].x = xMonster - 1;
                else if (booleanRight && anotherMonsterIsntThere(i,xMonster+1,yMonster))
                    enemy[i].x = xMonster + 1;
            }
        }
    }
}
function updateBonus() {
    var xBonus = bonus.x;
    var yBonus = bonus.y;
    var booleanUp = (yBonus > 0 && board[xBonus][yBonus - 1] !== 4);
    var booleanDown = (yBonus < boardLnt + 1 && board[xBonus][yBonus + 1] !== 4);
    var booleanLeft = (xBonus > 0 && board[xBonus - 1][yBonus] !== 4);
    var booleanRight = (xBonus < boardLnt + 1 && board[xBonus + 1][yBonus] !== 4);
    if (isBonus && xBonus === shape.i && yBonus === shape.j) {
        bonus.x = null;
        bonus.y = null;
        score += 50;
        window.clearInterval(intervalBonus);
        isBonus=false;
        //window.alert("Great job! 50 point bonus for you!");
    } else {
        let rand = getRandomInt(3);
        if (rand === 1 && booleanUp) {
            bonus.y = yBonus - 1;
        } else if (rand === 2 && booleanDown)
            bonus.y = yBonus + 1;
        else if (rand === 3 && booleanLeft)
            bonus.x = xBonus - 1;
        else if (booleanRight)
            bonus.x = xBonus + 1;
    }
}
function updateMedicine() {
    let xmedicine = medicine.x;
    let ymedicine = medicine.y;
    let mbooleanRight = (xmedicine < boardLnt + 1 && board[xmedicine + 1][ymedicine] !== 4);
    let mbooleanUp = (ymedicine > 0 && board[xmedicine][ymedicine - 1] !== 4);
    let mbooleanDown = (ymedicine < boardLnt + 1 && board[xmedicine][ymedicine + 1] !== 4);
    let mbooleanLeft = (xmedicine > 0 && board[xmedicine - 1][ymedicine] !== 4);
    if (isMedicine && xmedicine === shape.i && ymedicine === shape.j) {
        medicine.x = null;
        medicine.y = null;
        isMedicine=false;
        noMonsters = true;
        returnMonsters = time_elapsed-10;
        clearMonsters();
        window.clearInterval(intervalMedicine);
        window.alert("You have 10 sec without monsters!!!");
    } else {
        let rand = getRandomInt(3);
        if (rand === 1 && mbooleanUp) {
            medicine.y = ymedicine - 1;
        } else if (rand === 2 && mbooleanDown)
            medicine.y = ymedicine + 1;
        else if (rand === 3 && mbooleanLeft)
            medicine.x = xmedicine - 1;
        else if (mbooleanRight)
            medicine.x = xmedicine + 1;
    }
}

function createClock() {
    clock = {};
    clockImg = new Image();
    clockImg.src = "clock.png";
    clock.x = boardLnt / 2;
    clock.y = boardLnt / 2;
    intervalClock = setInterval(updateTime, 200);
}
function createMedicine() {
    var emptyCell = findRandomEmptyCell(board);
    medicine = {};
    medicineImg = new Image();
    medicineImg.src = "medicine.png";
    medicine.x = emptyCell[0];
    medicine.y = emptyCell[1];
    intervalMedicine = setInterval(updateMedicine,200);
}
function createMonsters() {
    enemyImg = [];
    enemy =[];
    for (let i = 0; i < user_monsters; i++) {
        enemyImg[i] = new Image();
        enemyImg[i].src = "monster" + i + ".png";
        enemy[i] = {};
        let cellForMonster = locations[i];
        let xMonster = cellForMonster[0];
        let yMonster = cellForMonster[1];
        enemy[i].x = xMonster;
        enemy[i].y = yMonster;
    }
    intervalMonsters = setInterval(updateMonsters, 250);
}

function clearMonsters() {
    window.clearInterval(intervalMonsters);
    for (let i = 0; i < user_monsters; i++) {
        enemy[i].x = null;
        enemy[i].y = null;
    }
}

function anotherMonsterIsntThere(monsterNum, wantedX, wantedY) {
    for (let i = 0; i < user_monsters; i++) {
        if( monsterNum == i)
            continue;
        if (wantedX == enemy[i].x && wantedY == enemy[i].y)
            return false;
    }
    return true;
}
function findRandomEmptyCell(board) {
    var i = getRandomInt(boardLnt);
    var j = getRandomInt(boardLnt);
    while (board[i][j] !== 0) {
        i = getRandomInt(boardLnt);
        j = getRandomInt(boardLnt);
    }
    return [i, j];
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
/**
 * @return {number}
 */
function GetKeyPressed() {
    var x;
    if (keysDown[user_up]) {
        isOpen=false;
        x= 1;
        degrees = (Math.PI/2*3);
        a=-1;
        b=1;
        keysDown[user_up]=false;
    }
    else if (keysDown[user_down]) {
        isOpen=false;
        x= 2;
        degrees = (Math.PI/2);
        a=1;
        b=-1;
        keysDown[user_down] = false;
    }
    else if (keysDown[user_left]) {
        isOpen=false;
        x=3;
        degrees = Math.PI;
        a=-1;
        b=1;
        keysDown[user_left] = false;
    }
    else if (keysDown[user_right]) {
        isOpen=false;
        x= 4;
        degrees=0;
        a=1;
        b=1;
        keysDown[user_right] = false;
    }
    console.log(x);
    return x;
}
