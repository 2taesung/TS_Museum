import React from "react";
// import Sketch from "react-p5";
import dynamic from 'next/dynamic'
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})
  let x = 50;
	let y = 50;
  let frameCount = 0;

export default function restriction() {
	const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.background(255);
    if(p5.mode === "CENTER") {
      p5.translate(width/2, height/2);
    }
    p5.angleMode('DEGREES');
	};

	const draw = (p5) => {
    p5.background(255, 255, 255);
    let movingAngle = Math.sin(5*p5.frameCount) * 100; // -100 ~ 100
	
    for (let x of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]) {
      for (let y of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]) {
        pattern1(p5, x, y, movingAngle);
      }
    }
	};

  function pattern1(p5, x, y, angle) {
    p5.push();
    const xCenter = x*100 + 50;
    const yCenter = y*100 + 50;
    const rangeXRight = x*100 + 100;
    const rangeXLeft = x*100 - 100;
    const rangeYRight = y*100 + 100;
    const rangeYLeft = y*100 - 100;
    // console.log(rangeXRight, rangeXLeft);
    
    let isRotate = false;
    if ((rangeXRight > p5.mouseX) && (p5.mouseX > rangeXLeft)) {
      if ((rangeYRight > p5.mouseY) && (p5.mouseY > rangeYLeft)) {
        if (p5.mouseX !== 0) {
          isRotate = true;		
        }
      }
    }
    p5.noFill();
    p5.ellipseMode('CENTER');
    p5.translate(xCenter, yCenter);
    p5.rotate(isRotate? angle : null);
    p5.ellipse(0, 0, 50, 100);
    p5.ellipse(0, 0, 100, 50);
    p5.pop()
  }

	// return <Sketch draw={draw}/>;
	return <Sketch setup={setup} draw={draw} />;
};