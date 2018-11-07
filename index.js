

	//clip > 400 below signal clip ,clip < 
	let clip = 50;	
	//ideal clamp = 52 ,if clamp > 52 Signal Shifts down , if clamp < 52 upper signal gets clipped
    //let clamp =52

	//empty array drawArray[]
	let drawArray = []

	//max voltagePerDivisions : 41
	let VoltagePerDivisons = 20
	
	let c
	let SignalLength = 1500

	for (var i = 0 ; i <SignalLength ; i++) {
		drawArray.push(i)
	}
	let time = 0

function waveform(c) {

  //taking x converting to some value...
  let points = drawArray.map(x => {
  	let y =  52+50*Math.sin((x+time)/20)
    /*let y = clamp + clip * Math.sin((x +time)/ VoltagePerDivisons)*/
    time +=1;
    //Draws Line
    return [x, y+c]
  })
  		//Converts points to 
		let path =  "M" + points.map(p =>{

			return p[0] + "," + p[1]
		}).join(" L")

		document.querySelector("path").setAttribute("d", path)
		//Looping the animation
		requestAnimationFrame(waveform);
	}
	