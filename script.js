function SqEquation(){
    this.g = function(){
        this.parse();
        this.D = this.Discriminant();
        this.findRoots();
        this.A =  this.getA();
        this.drawCurve();
        document.getElementById("output").innerHTML = this.OX;
    }


    this.equation;

    this.a = 0;
    this.b = 0;
    this.c = 0;

    this.D;

    this.OX = [];

    this.OY = [];

    this.Error = false;

    this.A = [];
 
    this.CreateEquation = function(text){
        this.equation = text;
        this.a = 0;
        this.b = 0;
        this.c = 0;
        this.D = 0;
        this.roots = [];
        this.Error = false;
        this.g();
    }

    this.parse = function(){
        var chars = [];
        var counter = 0;
        var counter2 = 0;

        var i = 0;
        while(this.equation[i] != undefined){
            chars[i] = [];
            if(this.equation[i] != "x"){
                chars[counter][counter2] = this.equation[i];
                counter2++;
            }
            else{
                counter++;
                counter2 = 0;
            }
            i++;
        }


        var t;
        for(var i = 0; i < chars.length; i++){
            if(chars[i][0] == undefined)
                delete chars[i];
        }
        chars.length = 3;

        for(i = 0; i < 3; i++){
            var temp = "";
            var q = chars[i].length - 1;
            for(var j = 0 ; j < q; j++){
                temp += chars[i][j+1]
            }
            temp = parseInt(temp, 10);
        
            if(chars[i][0] == "-")
                temp *= -1;
            
            switch(i){
                case 0: this.a = temp;
                break;
                case 1: this.b = temp;
                break;
                case 2: this.c = temp;
                break;
            }
        } 
    }

    this.Discriminant = function(){
        return Math.sqrt(Math.pow(this.b, 2) - 4 * this.a * this.c);
    }

    this.findRoots = function(){

        this.OY = [0, this.c];

        
        var nr;
        var t;
        if(this.D == 0){
            nr = 1; t = 1;}
        else if(this.D > 0){
            nr = 2; t = -1;}
        else
            this.Error = true;
        
        var i = 0;
        while(i<nr){
            this.OX[i] = (-1 * this.b + (this.D * t)) / 2 * this.a;
            t *= -1;
            i++;
        }
    }

    this.getA = function(){
        var x;
        var y;

        x = this.b * -1 / 2 * this.a;
        y = this.a * x*x + this.b * x + this.c;

        return [x, y]
    }

    this.getReady = function(){

    }


    this.drawCurve = function (){
        ctx.beginPath()
        for(var i = -150; i < canvas.width; i++){
            i-=1;
            var yt = i*i*this.a + i*this.b + this.c;
            ctx.moveTo(150+i,150-yt)

            i+=1;
            var y = i*i*this.a + i*this.b + this.c;
            drawLine(i, y);
        }
        ctx.closePath();
        ctx.stroke();
    }
}
var eq1
function go(){
    var text = document.getElementById("input").value;
    eq1 = new SqEquation();
    eq1.CreateEquation(text);
    eq1.g();
}


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

drawAxes();

function drawAxes(){
    for(var i = 0; i < canvas.width; i++){
        draw(i-150, 0);
    }

    for(var i = 0; i < canvas.height; i++){
        draw(0, 150-i);
    }
}

function drawLine(x, y){

    ctx.lineTo(x+150, 150-y);
}

function draw(x, y){

    ctx.fillRect(x+150, 150-y, 1, 1);
}