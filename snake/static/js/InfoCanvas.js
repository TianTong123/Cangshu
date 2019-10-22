var innerWidth, innerHeight, //屏幕的宽高
    pxWidth, pxHeight, //像素块的宽高
    canvas, canvasBg, //两个canvas对象
    cxt, cxtBg, //对应上面两个的contex
    wrap;//info的内容
function init(){
  //获取窗口的宽高
  //innerWidth = window.innerWidth;
  //innerHeight = (window.innerHeight+40);
  innerWidth = 1000;
  innerHeight = 500;
  pxWidth = innerWidth / 10;
  pxHeight = innerHeight / 10;
  canvas = document.getElementById('canvas');
  canvasBg = document.getElementById('canvasBg');
  wrap = document.getElementById('wrap');
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  canvasBg.width = innerWidth;
  canvasBg.height = innerHeight;
  cxt = canvas.getContext('2d');
  cxtBg = canvasBg.getContext('2d');
  //隐藏
  wrap.style.display = "none";
  //wrap.style.width = 6 * pxWidth + "px";
  
  //新建一个图片对象
  const img = new Image();
  //图片路径
  img.src = '../../../static/images/bg.jpg';
  img.onload = function(){
    cxt.drawImage(img,0, -20, innerWidth, innerHeight+20);	
  }; 
 // cxt.fillStyle='#fff';
 // cxt.fill();
  
  //像素块对象
  function px(x, y, dx, dy, ox, oy, radius, imageData){
    this.x = x;
    this.y = y;
    this.dx = dx;//x轴移动方向
    this.dy = dy;//y轴移动方向
    this.ox = ox;//原来的x位置
    this.oy = oy;//原来的y位置
    this.k = (oy-250)/(ox-1150);
    this.radius = radius;//半径
    this.imageData = imageData;
    //绘制
    this.draw = function(){
      cxt.putImageData(imageData,ox,oy);
    };
    //刷新
    this.update = function () {	
      //这里处理 x y 就可以移动了
      //每刷新一次重新绘图
      this.draw();
    };
  }

  //像素块对象数组
  var x = 0,y = 0,i=0;
  var imglist = [];
  function initList(){
    for(i = 0; i < 100; i ++ ){
      //获得像素的方块			
      var imgData = cxtBg.getImageData(x,y,pxWidth,pxHeight);
      imglist.push(new px(1150, 250, 1, 1, x, y, 100, imgData));
      x += pxWidth;
      if(x>=pxWidth*10){
        y += pxHeight;
        x = 0;
      }
    }
  } 

  var ani = null, index = 99;
  function animate(){
    ani = requestAnimationFrame(animate);//帧刷新		
    imglist[index].draw();
    index --;
    //加载完后停止动画
    if(index == -1){
      window.cancelAnimationFrame(ani);//停止动画
      canvas.style.zIndex = -1;
    }
  }
  
    initList();
    imglist.sort(function(){ return 0.5 - Math.random() }) 
    animate();
    //解决闪屏问题
    var time = setTimeout(function(){   
      wrap.style.display = "block";
    }, 50)
    
}


function initBg(){
  var c = document.getElementById('canvas');
  var ct = c.getContext('2d');
  //新建一个图片对象
  const img1 = new Image();
  //图片路径
  img1.src = '../../../static/images/bg.jpg';
  img1.onload = function(){
    ct.drawImage(img1, 0, -20, window.innerWidth, window.innerHeight+40);	
  }; 
}
export{
  init, initBg
}
		