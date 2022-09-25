import React from "react";
// import Sketch from "react-p5";
import dynamic from 'next/dynamic'
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

export default function infinitewill() {
	const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  //   p5.background(255);
    if(p5.mode === "CENTER") {
      p5.translate(width/2, height/2);
    }
    p5.angleMode('DEGREES');
	};

	const draw = (p5) => {
    p5.background(255, 153, 221, 50);
    let movingY = Math.sin(p5.frameCount/6)*2;
    
    function cloud(centerX, centerY, movingY) {
      p5.push();
      p5.ellipseMode('CENTER');
      p5.noStroke();
      for (let x of [-25, 0, 25]) {
        for (let y of [-18, 0, 18]) {
          topdownShake(centerX, centerY, movingY);
          p5.ellipse(centerX-x, centerY-y, 30, 30) 
        }
      }
      p5.pop();
    }
    
    function topdownShake(centerX, centerY, movingY) {
      const rangeXRight = centerX + 40;
      const rangeYRight = centerY + 40;
      const dropFigure = function dropFigure(centerX, centerY) {
          p5.push();
          p5.translate(centerX, centerY + Math.tan(p5.frameCount+1000))
          p5.ellipse(10, 10, 10, 10);
          p5.pop(); 
      }

      if ((p5.mouseY <= rangeYRight) && (rangeXRight >= p5.mouseX)) {
        if (p5.mouseX !== 0) {	
          p5.translate(0, movingY);
          let rx = p5.random(-50, p5.windowWidth);
          let ry = p5.random(-20, p5.windowHeight);
          for (let a of [rx, ry+25, rx+50]) {
            for (let b of [ry, rx+10, ry+15]) {
              dropFigure(centerX + a, centerY + b);
            }	
          }
        }
      }
    }
    for (let x=100; x < p5.windowWidth; x+=200) {
      for (let y=100; y < p5.windowHeight; y+=200) {
        cloud(x, y, movingY);
      }
    }

	};

	return <Sketch setup={setup} draw={draw}/>;
};