import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import buttonsArr from "./buttonsArr";

function Formula(props) {
  return <div id="formula">{props.formula}</div>;
}

function Output(props) {
  return <div id="output">{props.output}</div>;
}

function Button(props) {
  const handleClick = (value) => {
    props.handleButton(value);
  };

  const button = props.button;
  return (
    <button
      className={button.class}
      onClick={() => handleClick(button.value)}
    >
      {button.display}
    </button>
  );
}

function Buttons(props) {
  const buttons = buttonsArr.map((button) => (
    <Button
      button={button}
      key={button.value}
      value={button.value}
      display={button.display}
      type={button.type}
      className={button.class}
      handleButton={props.handleButton}
    />
  ));
  return <div id="buttonWrap">{buttons}</div>;
}

function App() {
  const [output, setOutput] = useState("0");
  const [formula, setFormula] = useState("");

  const handleButton = (value) => {
    switch (value) {
      case "C":
        setFormula("");
        setOutput("0");
        break;
      case "Del":
        let string = formula;
        string = string.slice(0, -1);
        setFormula(string);
        break;
      case "=":
        setFormula(eval(formula));
        break;
      case "%":
        let percentage = eval(formula) / 100;
        setFormula(percentage);
        setOutput(percentage);
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        setFormula((formula + value).toString());
        break;
      case ".":
        //regex
        break;
      default:
        if (formula === "0") {
          setFormula(value);
          setOutput(parseFloat(value));
        } else {
          setFormula(formula + value);
          setOutput(eval(formula + value));
        }
    }
  };

  return (
    <div id="wrapper">
      <div id="calculator">
        <Formula formula={formula} />
        <Output output={output} />
        <Buttons handleButton={handleButton} />
      </div>
    </div>
  );
}

export default App;
