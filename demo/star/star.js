{
    let canvas = document.querySelector("#starCanvas"),
         context = canvas.getContext("2d");
    let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
        function(callback) {
            setTimeout(callback, 1000 / 60);
        };
    let Stars = [],
        settings = {
            maxStar:300,
            Width:500,
            Height:500,
        };
    function getMinRandom (len) {
        let rand = Math.ceil(Math.random()*len);
        return rand;
    };
    function resizeCanvas() {
        canvas.width = 500;
        canvas.height = 500;
        redraw();
    }
    function redraw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "rgba(0,0,0,1)";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    function Star(){
        this.x = getMinRandom(settings.Width);
        this.y = getMinRandom(settings.Height);
        this.r = 0.5 + (Math.random() + 0.1 / 4);
        this.vx = Math.random() * 0.05 + 0.025;
        this.alpha = 0.0;
        this.maxAlpha = 0.2 + ((canvas.height-this.y)/canvas.height) * Math.random() * 0.8;
        this.alphaAction = 1;
        Stars.push(this);
    }
    Star.prototype.draw = function(){
        this.x += this.vx;
        if (this.alphaAction == 1) {
            if (this.alpha < this.maxAlpha ) {
                this.alpha += 0.005;
            } else {
                this.alphaAction = -1;
            }
        } else {
            if (this.alpha > 0.2 ) {
                this.alpha -= 0.002;
            } else {
                this.alphaAction = 1;
            }
        }
        if (this.x + (this.r*2) >= settings.Width ) {
            this.x = this.x - settings.Width;
        }
        context.beginPath();
        context.fillStyle="rgba(255,255,255," + this.alpha.toString() + ")";
        context.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        context.closePath();
        context.fill();
    }
    function render(){
        redraw();
        if(Stars.length <= settings.maxStar){
            new Star();
        }
        Stars.forEach(function(star){
            console.log(star);
            star.draw();
        })
        requestAnimationFrame(render)
    }
    resizeCanvas();
    render();
}