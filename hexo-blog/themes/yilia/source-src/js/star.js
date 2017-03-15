let SkySetting = {
    width:window.innerWidth,
    height:180,
    splitHeight:200,
    stars:1000,
    maxStar:1.2,
    minStar:0.6,
    maxSpeed:0.1,
    minSpeed:0.02,
  },
  domCanvas = document.querySelector('#starCanvasWeb'),
  context = domCanvas.getContext('2d');
/*
 * 画布实例
 * */
let starSky = function(width,height,stars){
  this.width = width;
  this.height = height;
  this.stars = stars;
  this.aStars = [];
}
starSky.prototype = {
  /*
   * 入口
   * */
  start:function(){
    domCanvas.width = this.width;
    domCanvas.height = this.height;
    context.fillStyle = 'rgba(0,0,0,1)';
    context.fillRect(0,0,this.width,this.height);
    this.render();
  },
  /*
   * 重绘
   * */
  redraw:function(){
    context.clearRect(0,0,this.width,this.height);
    context.fillStyle = 'rgba(0,0,0,1)';
    context.fillRect(0,0,this.width,this.height);
  },
  /*
   * 新建星星实例
   * 绘制星星
   * window.requestAnimationFrame 动画函数
   * */
  render:function(){
    this.redraw();
    if(this.aStars.length <= this.stars){
      let star = new Star();
      this.aStars.push(star);
    }
    this.aStars.forEach(function(star){
      star.draw();
    })
    window.requestAnimationFrame(()=>{
      this.render();
    });
  },
}
/*
 * 星星构造器
 * */
let Star = function(){
  this.randomPoint();
}
Star.prototype = {
  /*
   * 随机星星数据
   * */
  randomPoint:function(){
    let _x = Math.random()*SkySetting.width,
      _r = SkySetting.minStar + Math.random()*(SkySetting.maxStar - SkySetting.minStar),
      _ran = Math.random()*10,
      _rx = Math.random()*(SkySetting.maxSpeed-SkySetting.minSpeed) + SkySetting.minSpeed,
      _y = _ran > 2 ? Math.random()*SkySetting.splitHeight: Math.random()*this.height,
      _alphaMax = Math.random()*0.8 + 0.2,
      _alphaMin = 0.2,
      _alpha = 0;
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.rx = _rx;
    this.alpha = _alpha;
    this.alphaMax = _alphaMax;
    this.alphaMin = _alphaMin;
    this.alphaAction = true;
  },
  /*
   * 绘制星星
   * 星星变化
   * */
  draw:function(){
    this.x += this.rx;
    if(this.x + this.r >= SkySetting.width){
      this.x = 0;
    }
    if(this.alphaAction){
      if(this.alpha < this.alphaMax){
        this.alpha += 0.05;
      }else{
        this.alphaAction = false
      }
    }
    if(!this.alphaAction){
      if(this.alpha > this.alphaMin){
        this.alpha -= 0.02;
      }
      else{
        this.alphaAction = true;
      }
    }
    context.beginPath();
    context.fillStyle = 'rgba(255,255,255,'+this.alpha.toString()+')';
    context.arc(this.x,this.y,this.r,0,Math.PI*2,true);
    context.closePath();
    context.fill();
  }
}
/*
 * 构造星空实例
 * */
const init = (height,stars)=>{
  let sky = new starSky(SkySetting.width,height,stars);
  sky.start();
}
module.exports = {
  init: init
}
