//clip > 400 below signal clip ,clip < 
	let clip = 50;	
	//ideal clamp = 52 ,if clamp > 52 Signal Shifts down , if clamp < 52 upper signal gets clipped
    let clamp = 5

	//empty array drawArray[]
	let drawArray = []

	//max voltagePerDivisions : 41
	let VoltagePerDivisons = 20
	

	let SignalLength = 500

	for (var i = 0 ; i <SignalLength ; i++) {
		drawArray.push(i)
	}
	let time = 0
    //alert(c)
  	

function waveform() {

	//var c = document.getElementById("clamp").value;
  	//console.log(c);
  	//taking x converting to some value...
  	let points = drawArray.map(x => {
  	//let y =  c+50*Math.sin((x+time)/20)
  	
  	
  		//Without anything to add positive Signal gets Clipped !
  		let y  =   clamp + clip * Math.sin((x +time)/ VoltagePerDivisons)
    

    /*let y =  clamp + clip * Math.sin((x +time)/ VoltagePerDivisons)*/
    time +=1;
    
    //Draws Line
    return [x, y]
    
  })
  		//Converts points to 
		let outputVariable =  "M" + points.map(p =>{

			return p[0] + "," + p[1]
		}).join(" L")

		document.querySelector("path").setAttribute("d", outputVariable)

		/*let inputVariable =  "M" + points.map(p =>{

			return p[0] + "," + p[1]
		}).join(" L")
		
		document.querySelector("path").setAttribute("d", inputVariable)
		*///Looping the animation
		requestAnimationFrame(waveform);
	}
	waveform();