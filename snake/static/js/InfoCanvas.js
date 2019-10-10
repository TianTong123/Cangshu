//var canvas, canvasBg, cxt, cxtBg;

function init(){
  var canvasBg = document.getElementById('canvasBg');
  var canvas = document.getElementById('canvas');
  var cxt = canvas.getContext('2d');
  var cxtBg = canvasBg.getContext('2d');
  //新建一个图片对象
  const img = new Image();
  //图片路径
  img.src = '../../../static/images/bbg.jpg';
  img.onload = function(){
    cxtBg.drawImage(img,0,0);	
  }; 
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
    for(i = 0; i < 144; i ++ ){
      //获得一个大小为50*50像素的方块			
      var imgData = cxtBg.getImageData(x,y,50,50);

      imglist.push(new px(1150, 250, 1, 1, x, y, 70, imgData));
      x += 50;
      if(x>1150){
        y += 50;
        x = 0;
      }
    }
  }

  var ani = null, index = 143;
  function animate(){
    ani = requestAnimationFrame(animate);//帧刷新		
    //获得一个大小为30*30像素的方块
    imglist[index].draw();
    index --;
    if(index == -1){
      window.cancelAnimationFrame(ani)
    }
  }
  var time = setTimeout(function(){
    initList();
    imglist.sort(function(){ return 0.5 - Math.random() }) 
    animate();
    
  },100);
}
		
export{
  init
}
		