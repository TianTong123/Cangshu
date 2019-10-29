//伪常量
var BLOCK_SIZE = 20;        //格子大小
var COLS = 40;              //列数
var ROWS = 40;              //行数
//变量
var snakes = [];            //保存蛇坐标
var c = null;               //绘图对象
var toGo = 3;               //行进方向
var snakecount = 4;         //蛇身数量
var snakeSpeed = 100;       //蛇的初速度
var speed = 100;            //蛇的速度
var interval = null;        //计时器
var foodX = 0;              //食物X轴坐标
var foodY = 0;              //食物Y轴坐标
var box2;                   //屏障
var yard;                   //画布父级
var gameover;               //游戏结束
var overmsg;                //再来一次
// var continuemsg;            //继续游戏
var startbtn;               //开始游戏
var pausebtn;               //暂停游戏
var oMark = null;           //分数显示框
var oSpeed = null;          //速度显示框
var oNext = null;           //下一关分数显示框
var isPause = false;        //是否暂停
var eatAudio;               //吃到食物音效
var overAudio;              //游戏结束音效
var snakeAudio;             //游戏开始音效
var bgmusic;                //游戏音效
var notice2;                //告示板
var snakecolor;             //蛇的颜色
var exteriorWall = 1;       //外墙设置
var fruitImage = new Image()//画布图片
var wall=[];                //内墙数组
var wall_length = 0;        //内墙数组长度
var wallonbtn;              //开墙按钮
var walloffbtn;             //关墙按钮
var closewall = 1;          //自动关墙
// 绘图函数
function draw(){
    c.clearRect(0,0,BLOCK_SIZE * COLS, BLOCK_SIZE * ROWS);
    //画出横线
    for( var i = 1; i <= ROWS; i++ ) {
        c.beginPath();
        c.moveTo(0, i * BLOCK_SIZE);
        c.lineTo(BLOCK_SIZE * COLS, i * BLOCK_SIZE);
        c.strokeStyle = "gray";
        c.stroke();
    }
    //画出竖线
    for(var i = 1; i <= COLS; i++){
        c.beginPath();
        c.moveTo(i * BLOCK_SIZE, 0);
        c.lineTo(i * BLOCK_SIZE, BLOCK_SIZE * ROWS);
        c.stroke();
    }
    //画出蛇
    for (var i = 0; i < snakes.length; i++){
        c.beginPath();
        setSnakeColor();
        c.fillRect(snakes[i].x, snakes[i].y, BLOCK_SIZE, BLOCK_SIZE);
        c.moveTo(snakes[i].x, snakes[i].y);
        c.lineTo(snakes[i].x + BLOCK_SIZE, snakes[i].y);
        c.lineTo(snakes[i].x + BLOCK_SIZE, snakes[i].y + BLOCK_SIZE);
        c.lineTo(snakes[i].x, snakes[i].y + BLOCK_SIZE);
        c.closePath();
        c.strokeStyle = "#FFFFFF";
        c.stroke();
    }
    //画出食物
    c.beginPath();
    c.fillStyle = "yellow";
    fruitImage.onload = function() {
        c.drawImage(fruitImage, 10, 10)
    }
    c.fillRect(foodX, foodY, BLOCK_SIZE, BLOCK_SIZE);
    c.moveTo(foodX, foodY);
    c.lineTo(foodX + BLOCK_SIZE, foodY);
    c.lineTo(foodX + BLOCK_SIZE, foodY + BLOCK_SIZE);
    c.lineTo(foodX, foodY + BLOCK_SIZE);
    c.closePath();
    c.strokeStyle = "#F56C6C";
    c.stroke();
}
//绘制墙
function drawwall(x,y) {
    c.clearRect(0,0,BLOCK_SIZE * COLS, BLOCK_SIZE * ROWS);
    wall.push({x:x, y:y, color:"#FFFF00"});
    wall_length++;
    c.beginPath();
    c.fillRect(BLOCK_SIZE *x,BLOCK_SIZE *y,BLOCK_SIZE,BLOCK_SIZE);
    c.fillStyle = "yellow";
    c.strokeStyle = "#484848";
    c.lineWidth = 2;
    c.stroke();
    c.closePath();
    c.fill();
}
//墙的位置
function wall_location() {
    var i,j;
    for( i= 2,j= 5;i<15;i++)
    {drawwall(i,j);}
    for( i=25,j=5;i<38;i++)
    {drawwall(i,j);}
    for( j= 6,i=14;j<15;j++)
    {drawwall(i,j);}
    for( j= 6,i=25;j<15;j++)
    {drawwall(i,j);}
    for( i= 9,j=17;j<26;j++)
    {drawwall(i,j);}
    for(i=29,j=17;j<26;j++)
    {drawwall(i,j);}
    for(i=10,j=25;i<29;i++)
    {drawwall(i,j);}
}
//游戏初始化
function start(){
    snakes = [];
    snakecount = 4;
    snakecolor = "#4ebb17";
    for( var i = 0; i < snakecount; i++){
        snakes[i] = {x: i * BLOCK_SIZE, y: 0};
    }
    addFood();
    draw();
    drawwall();
    wall_location();
    setWall(1);
    closewall = 1;
    oMark.innerHTML = 0;
    oNext.innerHTML = 100;
    oSpeed.innerHTML = "Level One";
    oSpeed.style.color = "#fff";
    interval = setInterval(move,snakeSpeed);
    sound();
}
//移动函数
function move(){
    switch(toGo){
        case 1: //左边
            snakes.push({x: snakes[snakecount - 1].x - BLOCK_SIZE, y: snakes[snakecount - 1].y});
        break;
        case 2: //上边
            snakes.push({x: snakes[snakecount - 1].x, y: snakes[snakecount - 1].y - BLOCK_SIZE});
        break;
        case 3: //右边
            snakes.push({x: snakes[snakecount - 1].x + BLOCK_SIZE, y: snakes[snakecount - 1].y});
        break;
        case 4: //下边
            snakes.push({x: snakes[snakecount - 1].x, y: snakes[snakecount - 1].y + BLOCK_SIZE});
        break;
        default:;
    }
    snakes.shift();
    isEat();
    isDie();
    draw();
}
//吃到食物判断
function isEat(){
    if (snakes[snakecount - 1].x == foodX && snakes[snakecount - 1].y == foodY) {
        oMark.innerHTML = (parseInt(oMark.innerHTML) + 10).toString();
        addFood();
        addSnake();
        eatAudio.play();
        setSnakeSpeed();
    }
}
//添加蛇身
function addSnake(){
    snakecount++;
    snakes.unshift({x:BLOCK_SIZE * COLS, y:BLOCK_SIZE * ROWS});
}
//蛇的皮肤
function setSnakeColor() {
    c.fillStyle = snakecolor;
}
//交互响应函数
function keydown(keyCode){
    switch(keyCode){
        case 37: //左边
                if(toGo != 1 && toGo != 3)        toGo = 1;break;
        case 38: //上边
                if(toGo != 2 && toGo != 4)        toGo = 2;break;
        case 39: //右边
                if(toGo != 3 && toGo != 1)        toGo = 3;break;
        case 40: //下的
                if(toGo != 4 && toGo != 2)        toGo = 4;break;
    }
}
//暂停
function pause(){
    if(isPause){
        interval = setInterval(move,speed);
        // continuemsg.style.display = "none";
        notice2.style.top = "-614px";
        pausemsg();
        startmusic();
        isPause = false;
    }else{
        snakeAudio.pause();
        clearInterval(interval);
        startbtn.style.display = "block";
        pausebtn.style.display = "none";
        // continuemsg.style.display = "block";
        box2.style.cssText = "z-index: 3";
        notice2.style.top = "0px";
        isPause = true;
    }
}
//速度
function setSnakeSpeed() {
    if (oMark.innerHTML >= 100 && oMark.innerHTML < 200) {
        snakeSpeed = 80;
        speed = snakeSpeed;
        oNext.innerHTML = 200;
        snakecolor = "#409EFF";
        oSpeed.innerHTML = "Level Two";
        oSpeed.style.color = "#ffc4c4";
        clearInterval(interval);
        interval = setInterval(move,speed);
    }
    else if (oMark.innerHTML >= 200 && oMark.innerHTML < 400) {
        snakeSpeed = 70;
        speed = snakeSpeed;
        oNext.innerHTML = 400;
        snakecolor = "#F56C6C";
        oSpeed.innerHTML = "Level Three";
        oSpeed.style.color = "#ff7c7c";
        clearInterval(interval);
        interval = setInterval(move,speed);
    }
    else if (oMark.innerHTML >= 400) {
        snakeSpeed = 60;
        speed = snakeSpeed;
        oNext.innerHTML = "∞";
        snakecolor = "#303133";
        oSpeed.innerHTML = "Level Four";
        oSpeed.style.color = "#ff5a5a";
        clearInterval(interval);
        interval = setInterval(move,speed);
        if (closewall == 1) {
            setWall(0);
            closewall = 0;
        }
    }
}
//制造食物
function addFood(){
        foodX = Math.floor(Math.random() * (COLS - 1)) * BLOCK_SIZE;
        foodY = Math.floor(Math.random() * (ROWS - 1)) * BLOCK_SIZE;
        // console.log(foodX + " -- " + foodY);
}
//暂停信息
function pausemsg() {
    startbtn.style.display = "none";
    pausebtn.style.display = "block";
    box2.style.cssText = "z-index: 0";
}
//暂停音效
function pausemusic() {
    if (bgmusic.style.animationPlayState == "running") {
        snakeAudio.pause();
        bgmusic.style.animationPlayState = "paused";
    }else {
        snakeAudio.play();
        bgmusic.style.animationPlayState = "running";
    }
}
//判断游戏暂停时音效
function startmusic() {
    if (bgmusic.style.animationPlayState == "paused") {
        snakeAudio.pause();
        bgmusic.style.animationPlayState = "paused";
    }else {
        snakeAudio.play();
        bgmusic.style.animationPlayState = "running";
    }
}
//重新开始音效判断
function sound() {
    if (bgmusic.style.animationPlayState == "running") {
        snakeAudio.play();
    }else {
        snakeAudio.pause();
    }
}
//死亡信息
function diemsg() {
    gameover.style.display = "block";
    overmsg.style.display = "block";
    startbtn.style.display = "block";
    pausebtn.style.display = "none";
    startbtn.classList.add("disabled");
    box2.style.cssText = "z-index: 3";
}
//死亡判断
function isDie() {
    if(exteriorWall == 1) {
        // Wall On
        if(snakes[snakecount - 1].x == -20 || snakes[snakecount - 1].x == BLOCK_SIZE * COLS 
                || snakes[snakecount - 1].y == -20 || snakes[snakecount - 1].y == BLOCK_SIZE * ROWS){
                diemsg();
                snakeAudio.pause();
                overAudio.play();
                snakecolor = "red";
                clearInterval(interval);
                snakeSpeed = 100;
                speed = 100;
        }
    }else {
        // Wall Off
        for (var i = 0, x = snakecount - 1; i < x; i++) {
            if (snakes[snakecount - 1].x < 0) {
                snakes[snakecount - 1].x = snakes[snakecount - 1].x + (BLOCK_SIZE * COLS);
            }
            if (snakes[snakecount - 1].x == BLOCK_SIZE * COLS) {
                snakes[snakecount - 1].x = snakes[snakecount - 1].x - (BLOCK_SIZE * COLS);
            }
            if (snakes[snakecount - 1].y < 0) {
                snakes[snakecount - 1].y = snakes[snakecount - 1].y + (BLOCK_SIZE * ROWS);
            }
            if (snakes[snakecount - 1].y == BLOCK_SIZE * ROWS) {
                snakes[snakecount - 1].y = snakes[snakecount - 1].y - (BLOCK_SIZE * ROWS);
            }
        }
    }
    for(var i = 0; i < snakecount - 1; i++){
        if(snakes[snakecount - 1].x == snakes[i].x && snakes[snakecount - 1].y == snakes[i].y){
            diemsg();
            snakeAudio.pause();
            overAudio.play();
            snakecolor = "red";
            clearInterval(interval);
            snakeSpeed = 100;
            speed = 100;
        }
    }
}
//设置墙
function setWall(msg) {
    if (msg == 1) {
        exteriorWall = 1;
        wallonbtn.style.left = "5%";
        walloffbtn.style.left = "-2%";
    }
    else if (msg == 0) {
        exteriorWall = 0;
        wallonbtn.style.left = "-2%";
        walloffbtn.style.left = "5%";
    }
    if (exteriorWall == 1) {
        yard.style.border = "10px solid #ffffff9c";
    }
    else if (exteriorWall == 0) {
        yard.style.border = "10px solid #ffffff00";
    }
}
//返回首页清除定时器
function clearTime() {
    clearInterval(interval);
}
//时间
function displayTime() {
    //获取div元素
    var time = document.getElementById('time');
    //获取系统当前的年、月、日、小时、分钟、毫秒
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var second = date.getSeconds();
    if (minutes < 10 && hour < 10) {
        var mytime = "0" + hour + " : 0" + minutes;
    }
    else if (minutes < 10 && hour >= 10) {
        var mytime = hour + " : 0" + minutes;
    }
    else if (minutes >= 10 && hour < 10) {
        var mytime = "0" + hour + " : " + minutes;
    }
    else {
        var mytime = hour + " : " + minutes;
    }

    // var timestr = year + "年" + month + "月" + day + "日  " + check(hour) + ":" + check(minutes) + ":" + check(second);
    //将系统时间设置到div元素中
    time.innerHTML = mytime;
}
//每隔1秒调用一次displayTime函数
function time(){
    setInterval(displayTime,1000)//单位是毫秒
}
//启动函数
function init(){
    c = document.getElementById('canvas').getContext('2d');
    oMark = document.getElementById('mark_con');
    oSpeed = document.getElementById('speed_con');
    oNext = document.getElementById('next_con');
    box2 = document.getElementById('box_2');
    yard = document.getElementById('yard');
    gameover = document.getElementById('over');
    overmsg = document.getElementById('overmsg');
    wallonbtn = document.getElementById('wallon-btn');
    walloffbtn = document.getElementById('walloff-btn');
    // continuemsg = document.getElementById('continuemsg');
    startbtn = document.getElementById('start-btn');
    pausebtn = document.getElementById('pause-btn');
    notice2 = document.querySelector('.notice_2');
    eatAudio = document.querySelector('.eat-audio');
    overAudio = document.querySelector('.over-audio');
    snakeAudio = document.querySelector('.snake-audio');
    bgmusic = document.querySelector('.bg-music');
    fruitImage.src = '../images/fruit.png';
    bgmusic.style.animationPlayState = "running";
    start();
    document.onkeydown = function(event){
        var event = event || window.event;
        keydown(event.keyCode);
        if (gameover.style.display == "block") {
            if (event.keyCode == 32) {
                start();
                toGo = 3;
                gameover.style.display = "none";
                overmsg.style.display = "none";
                startbtn.classList.remove("disabled");
                pausemsg();
                snakeAudio.currentTime = 0;
            }
        }else {
            if (event.keyCode == 13) {
                pause();
            }
        }
    }
}

export{
    init, pause, pausemusic, time, displayTime, setWall, clearTime
}