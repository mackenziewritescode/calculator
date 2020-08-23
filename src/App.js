import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import buttonsArr from "./buttonsArr";

function Formula(props) {
  return <div id="formula">{props.displayFormula}</div>;
}

function Output(props) {
  return <div id="output">{props.output}</div>;
}

function Button(props) {
  const handleClick = (value, display) => {
    props.handleButton(value, display);
  };

  const button = props.button;
  return (
    <button
      className={button.class}
      onClick={() =>
        handleClick(button.value, button.display)
      }
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
  const [formula, setFormula] = useState("0");
  const [displayFormula, setDisplayFormula] = useState("");

  const handleButton = (value, display) => {
    const numArr = formula
      .toString()
      .replace(/[-/*+=]/g, " ")
      .split(" ");
    const currentNum = numArr[numArr.length - 1];
    const decimalRegex = /\./g;
    console.log(currentNum);

    switch (value) {
      case "C":
        setDisplayFormula("");
        setFormula("0");
        setOutput("0");
        break;
      case "Del":
        const displayString = displayFormula.slice(0, -1);
        const string = formula.slice(0, -1);
        setDisplayFormula(displayString);
        setFormula(string);
        break;
      case "=":
        setDisplayFormula(removeOpBeforeEquals(formula));
        setFormula(removeOpBeforeEquals(formula));
        break;
      // case "%":
      //     let percentage = eval(formula) / 100;
      //     setFormula(percentage);
      //     setOutput(percentage);
      //   break;
      case "+":
      case "-":
      case "*":
      case "/":
        if (testMultipleOps(formula)) {
          setDisplayFormula(formula);
          setFormula(formula);
        } else {
          setDisplayFormula(formula + display);
          setFormula(formula + value);
        }
        // setDisplayFormula(formula + display);
        // setFormula(formula + value);
        break;
      case ".":
        if (!decimalRegex.test(currentNum)) {
          setDisplayFormula(displayFormula + ".");
          setFormula(formula + ".");
        }
        break;
      default:
        if (formula === "0") {
          setDisplayFormula(display);
          setFormula(value);
          setOutput(parseFloat(value));
        } else {
          setDisplayFormula(displayFormula + display);
          setFormula(formula + value);
          setOutput(eval(formula + value));
        }
    }
  };

  function removeOpBeforeEquals(string) {
    if (
      string.slice(-1) === "+" ||
      string.slice(-1) === "-" ||
      string.slice(-1) === "*" ||
      string.slice(-1) === "/"
    ) {
      return eval(string.slice(0, -1));
    } else {
      return eval(string);
    }
  }

  function testMultipleOps(string) {
    let opRegex = /[-/*+=]/g;
    let lastChar = string.slice(-1);
    if (opRegex.test(lastChar)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div id="wrapper">
      <div id="calculator">
        <Formula displayFormula={displayFormula} />
        <Output output={output} />
        <Buttons handleButton={handleButton} />
        <div>{formula}</div>
      </div>
    </div>
  );
}

export default App;

// case "=":
//   let equalsTest = formula;
//   if (
//     equalsTest[equalsTest.length - 1] === "+" ||
//     "-" ||
//     "/" ||
//     "*"
//   ) {
//     equalsTest = equalsTest.slice(0, -1);
//   }
//   setDisplayFormula(eval(equalsTest)); // !!!!
//   setFormula(eval(equalsTest));
//   break;
