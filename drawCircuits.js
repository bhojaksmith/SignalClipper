    /*


Then create a new <script type="text/javascript">....</script> 
tag and put between the tags your drawing code. Drawing code works like this:
    
You start by calling the function beginCircuit(x,y). 
Inside the parenthesis, put the x and y coordinates you want to start your circuit at,
like so: beginCircuit(200,100). This will draw a wire, 
and a battery at the coordinates you specified (in pixels).
The battery and wire together take up 100 pixels of space on the screen.

Then, you can call any of the following functions:

drawWire(length)
Draws a wire of the length you specify at the end of the circuit. 
Takes up length amount of space.

turnClockwise(length)
Turns the direction in which your next command will draw 90° clockwise. 
Takes up no space.

turnCounterClockwise(length)
Turns the direction in which your next command will draw 90° counter-clockwise.
 Takes up no space.

drawCapacitor(length)
Draws a capacitor at the end of the circuit. 
Takes up 50px.

drawInductor(length)
Draws an inductor at the end of the circuit. 
Takes up 50px.

drawResistor(length)
Draws a resistor at the end of the circuit.
 Takes up 50px.


drawTrimmer(length)
Draws a resistor at the end of the circuit.
 Takes up 50px.

When you're done drawing circuitry, use the function endCircuit() to close and then draw the circuit. It will automatically draw a wire from the point where you stopped to the beginning of the circuit.

*/
        "use strict"

        //var wW=window.innerWidth;
        //var wH=
        var canvasHTML=document.getElementById("canvas");
        canvasHTML.width=window.innerWidth;
        canvasHTML.height=window.innerHeight;
        var ctx=canvasHTML.getContext("2d");
        var ix;
        var iy;
        var x;
        var y;
        var d;
        var dx;
        var dy;

        function beginCircuit(a,b)
        {
            ctx.lineWidth=1.5;
            ctx.strokeStyle="#000";
            ctx.beginPath();
            x=a;
            y=b;
            d=0;
            dx=1;
            dy=0;
            ix=x;
            iy=y;
            ctx.moveTo(x,y);
            drawWire(50);
            drawPower();
        }

        function endCircuit()
        {
            ctx.lineTo(ix,iy);
            ctx.stroke();
        }

        function drawWire(l)
        {
            x+=dx*l;
            y+=dy*l;
            ctx.lineTo(x,y);
        }       

        function drawPower()
        {
            var n;
            drawWire(10);
            n=3;
            ctx.moveTo(x+10*dy,y+10*dx);
            ctx.lineTo(x-10*dy,y-10*dx);
            x+=dx*5;
            y+=dy*5;
            while(n--)
            {
                ctx.moveTo(x+15*dy,y+15*dx);
                ctx.lineTo(x-15*dy,y-15*dx);
                x+=dx*5;
                y+=dy*5;
                ctx.moveTo(x+10*dy,y+10*dx);
                ctx.lineTo(x-10*dy,y-10*dx);
                if(n!=0)
                {
                    x+=dx*5;
                    y+=dy*5;
                }
            }
            ctx.moveTo(x,y);
            drawWire(10);
        }

        function drawCapacitor()
        {
            drawWire(22.5);
            ctx.moveTo(x+10*dy,y+10*dx);
            ctx.lineTo(x-10*dy,y-10*dx);
            x+=dx*5;
            y+=dy*5;
            ctx.moveTo(x+10*dy,y+10*dx);
            ctx.lineTo(x-10*dy,y-10*dx);
            ctx.moveTo(x,y);
            drawWire(22.5);
        }

        function drawInductor()
        {
            var n,xs,ys;
            drawWire(9);
            n=4;
            xs=1+Math.abs(dy);
            ys=1+Math.abs(dx);
            x+=dx*6;
            y+=dy*6;
            ctx.scale(xs,ys);
            while(n--)
            {
                ctx.moveTo(x/xs+5*Math.abs(dx),y/ys+5*dy);
                ctx.arc(x/xs,y/ys,5,Math.PI/2*dy,Math.PI+Math.PI/2*dy,1);
                x+=6.5*dx;
                y+=6.5*dy;
                if(n!=0)
                {
                    if(dx>=0)
                    {
                        ctx.moveTo(x/xs-5*dx,y/ys-5*dy);
                    }

                    ctx.moveTo(x/xs-5*dx,y/ys-5*dy);
                    ctx.arc(x/xs-6.5/2*dx,y/ys-6.5/2*dy,1.5,Math.PI+Math.PI/2*dy,Math.PI/2*dy,1);
                }
            }
            ctx.moveTo(x/xs-1.75*dx,y/ys-1.75*dy);
            ctx.scale(1/xs,1/ys);
            ctx.lineTo(x,y);
            drawWire(9);
        }

        function drawTrimmer()
        {
            ctx.moveTo(x+35*dx-7*dy,y+35*dy-7*dx);
            ctx.lineTo(x+15*dx+7*dy,y+15*dy+7*dx);
            ctx.moveTo(x+13*dx+4*dy,y+13*dy+4*dx);
            ctx.lineTo(x+17*dx+10*dy,y+17*dy+10*dx);
            ctx.moveTo(x,y);
            drawCapacitor();
        }

        function drawResistor()
        {
            var n;
            drawWire(10);
            n=5;
            x+=dx*5;
            y+=dy*5;
            while(n--)
            {
                ctx.lineTo(x-5*dy,y-5*dx);
                ctx.lineTo(x+5*dy,y+5*dx);
                x+=5*dx;
                y+=5*dy;
            }
            ctx.lineTo(x,y);
            drawWire(10);
        }

        function turnClockwise()
        {
            d++;
            dx=Math.cos(1.570796*d);
            dy=Math.sin(1.570796*d);
        }

        function turnCounterClockwise()
        {
            d--;
            dx=Math.cos(1.570796*d);
            dy=Math.sin(1.570796*d);
        }