import React from "react";
import { useState, useContext } from "react";
// app
// p5
import { Menu } from "../components/menu";
import P5Wrapper from "../components/P5Wrapper";
import P5Manager from "../components/P5Manager";
import { P5DispatchContext, P5StateContext } from "../components/P5Manager";
import { MenuButton } from "../components/menuButton";
import p5 from "p5";

const Artwork_wrapper = P5Wrapper("my artwork");
const Button_refresh = P5Wrapper("refresh");

const ArtWork = () => (
  <>
    <P5Manager>
      <div style={{ position: "absolute" }}>
        <ComponentBuffer comp={Artwork_wrapper} />
      </div>
      <div style={{ position: "absolute" }}>
        <Menu></Menu>
        <MenuButton comp={Button_refresh} label="REFRESH" what="add_x" />
      </div>
    </P5Manager>
  </>
);

export default ArtWork;

let buf = {
  value: 0,
};

function ComponentBuffer(props) {
  const { x } = useContext(P5StateContext);
  const [state_data, set_data] = useState(buf);
  if (x !== state_data.value) {
    buf.value = x;
    set_data(buf);
  }

  return <props.comp sketch={goban} data={state_data}></props.comp>;
}

/**
 *
 * P5JS / PROCESSING SKETCH
 *
 */
function goban(p5) {
  // VARIABLE GLOBAL

  // PROCESSING FUNCTION
  p5.setup = function () {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };
  };

  let arriereplan_rouge = 10 ; 
  let arriereplan_vert = 10 ;
  let arriereplan_bleu = 63 ;
  let arriereplan_alpha = 225;

  p5.draw = function(){
    p5.background(arriereplan_rouge,arriereplan_vert, arriereplan_bleu, arriereplan_alpha);
    let step = 100;
    let offset = step/2;
    let inc = 0;

    for(let i = 0; i < p5.width ; i = i + step){
      for(let j = 0; j < p5.height ; j = j + step){
        let x = i + offset;
        let y = j + offset; 
        let size = p5.random(10, 50);
        let rot = p5.frameCount * 0.00003;
        if(p5.mouseIsPressed){
          rot = rot * -2;
        }
        pierre2(x, y, 15, rot)
        pierre1(x, y, 400, rot);
      }
    }
  }
  let rot_is = false; 
  p5.mousePressed = function(){
    if(rot_is) rot_is = false; else rot_is = true;
    arriereplan_rouge = p5.random(255);
    arriereplan_vert = p5.random(255);
    arriereplan_bleu = p5.random(255);
    arriereplan_alpha = p5.random(255);
    p5.strokeWeight(1);
  }
  
  function pierre1(x, y, taille, rotation) {
    let alpha = 255;
    p5.stroke(135,y, taille, alpha);
    p5.noFill (0);
    // if(inc%5 === 0);
    p5.rotate(rotation);
    p5.square(400,400, taille);
  }
  
  function pierre2(x,y,size, rotation){
    let alpha = 255;
    p5.fill(221, 210, 0, alpha);
    p5.stroke(221, 210, 0, alpha);
    let offset = size / 2;
    p5.push();
    p5.translate(x, y)
    p5.push();
    p5.rotate(rotation);
    p5.translate(+ offset, + offset);
    p5.circle(0,0, size);
    p5.pop();
    p5.pop();
  }
}
 