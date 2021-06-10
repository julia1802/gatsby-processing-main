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

  
function apparence(interieur, exterieur, epaisseur){
  p5.fill(interieur);
  p5.stroke(exterieur);
  p5.strokeWeight(epaisseur);
}

function batement (x, y, tx, ty, interieur, exterieur, epaisseur){
  apparence(interieur, exterieur, epaisseur);
  let coeur_x = p5.sin(p5.frameCount/60) *tx;
  let coeur_y = p5.sin(p5.frameCount/60)*ty;
  p5.ellipse(x, y, coeur_x, coeur_y);
}

  p5.draw = function () {
    p5.background("lightgreen");
    p5.rectMode(p5.CENTER);
    batement(p5.mouseX, p5.mouseY, 50, 50, "lightblue", "white", 5);
    batement(p5.mouseY, p5.mouseX, 50, 50, "white", "lightblue", 5);
  };
};


 
