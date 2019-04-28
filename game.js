
    var context = canvas.getContext("2d");
    var shape = new Object();
    var board;
    var score;
    var pac_color;
    var start_time;
    var time_elapsed;
    var interval;
    var right;
    var left;
    var up;
    var down;
    var food;
    var points5;
    var points15;
    var points25;
    var time;
    var monsters;


    function setAllForGame() {
        right = $("#contact_right_button").val();
        left = $("#contact_left_button").val();
        up = $("#contact_up_button").val();
        down = $("#contact_down_button").val();
        food = $("#contact_food").val();
        points5 = $("#contact_5_points").val();
        points15 = $("#contact_15_points").val();
        points25 = $("#contact_25_points").val();
        time = $("#contact_play_time").val();
        monsters = $("#contact_monsters").val();
    }

    function Start() {
        board = new Array();
        score = 0;
        pac_color = "yellow";
        var cnt = 100;
        var food_remain = food;
        var pacman_remain = 1;
        start_time = new Date();
        for (var i = 0; i < 12; i++) {
            board[i] = new Array();
            for (var j = 0; j < 12; j++) {
                var x = Math.random();
                if (i == 0 || j == 0 || i == 11 || j == 11 || x <= 0.10) {
                    board[i][j] = 4;
                } else {
                    var randomNum = Math.random();
                    if (randomNum <= 1.0 * food_remain / cnt) {
                        food_remain--;
                        board[i][j] = 1;
                    } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
                        shape.i = i;
                        shape.j = j;
                        pacman_remain--;
                        board[i][j] = 2;
                    } else {
                        board[i][j] = 0;
                    }
                    cnt--;
                }
            }
        }
        while (food_remain > 0) {
            var emptyCell = findRandomEmptyCell(board);
            board[emptyCell[0]][emptyCell[1]] = 1;
            food_remain--;
        }
        keysDown = {};
        addEventListener("keydown", function (e) {
            keysDown[e.code] = true;
        }, false);
        addEventListener("keyup", function (e) {
            keysDown[e.code] = false;
        }, false);
        interval = setInterval(UpdatePosition, 250);
    }


    function findRandomEmptyCell(board) {
        var i = Math.floor((Math.random() * 11) + 1);
        var j = Math.floor((Math.random() * 11) + 1);
        while (board[i][j] !== 0) {
            i = Math.floor((Math.random() * 11) + 1);
            j = Math.floor((Math.random() * 11) + 1);
        }
        return [i, j];
    }

    /**
     * @return {number}
     */
    function GetKeyPressed() {
        if (keysDown[up]) {
            return 1;
        }
        if (keysDown[down]) {
            return 2;
        }
        if (keysDown[left]) {
            return 3;
        }
        if (keysDown[right]) {
            return 4;
        }
    }

    function Draw() {
        context.clearRect(0, 0, canvas.width, canvas.height); //clean board
        lblScore.value = score;
        lblTime.value = time_elapsed;
        for (var i = 0; i < 12; i++) {
            for (var j = 0; j < 12; j++) {
                var center = new Object();
                center.x = i * 60 + 30;
                center.y = j * 60 + 30;
                if (board[i][j] === 2) {
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                } else if (board[i][j] === 1) {
                    context.beginPath();
                    context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                } else if (board[i][j] === 4) {
                    context.beginPath();
                    context.rect(center.x - 30, center.y - 30, 60, 60);
                    context.fillStyle = "grey"; //color
                    context.fill();
                }
            }
        }


    }

    function UpdatePosition() {
        board[shape.i][shape.j] = 0;
        var x = GetKeyPressed();
        if (x === 1) {
            if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
                shape.j--;
            }
        }
        if (x === 2) {
            if (shape.j < 11 && board[shape.i][shape.j + 1] !== 4) {
                shape.j++;
            }
        }
        if (x === 3) {
            if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
                shape.i--;
            }
        }
        if (x === 4) {
            if (shape.i < 11 && board[shape.i + 1][shape.j] !== 4) {
                shape.i++;
            }
        }
        if (board[shape.i][shape.j] === 1) {
            score++;
        }
        board[shape.i][shape.j] = 2;
        var currentTime = new Date();
        time_elapsed = (currentTime - start_time) / 1000;
        if (score >= 20 && time_elapsed <= 10) {
            pac_color = "green";
        }
        if (score === 50) {
            window.clearInterval(interval);
            window.alert("Game completed");
        } else {
            Draw();
        }
    }