import React, { useState } from "react";
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
    const percentage = (currentNum / 100).toString();
    const reversePercentage = (currentNum * 100).toString();
    const formulaWithPercentage = formula
      .toString()
      .slice(0, -currentNum.length)
      .concat(percentage);
    const formulaReversePercentage = formula
      .toString()
      .slice(0, -currentNum.length)
      .concat(reversePercentage);
    const decimalRegex = /\./g;
    const displayDelString = displayFormula
      .slice(0, -1)
      .toString();
    const delString = formula.toString().slice(0, -1);

    switch (value) {
      case "C":
        setDisplayFormula("");
        setFormula("0");
        setOutput("0");
        break;
      case "Del":
        if (displayFormula.length <= 1) {
          //------------------------- if there's only 1 char, set to 0
          setDisplayFormula("0");
          setFormula("0");
          setOutput("0");
        } else if (
          // ----------------------- if the only char is an operator, set to 0
          formula.length <= 3 &&
          /[-/*+=]/.test(formula[1]) === true &&
          formula[0] === 0
        ) {
          setDisplayFormula("0");
          setFormula("0");
          setOutput("0");
        } else if (
          // ----------------- if the last char is %, multiply last char by 100
          displayFormula.toString().slice(-1) === "%"
        ) {
          setDisplayFormula(displayDelString);
          setFormula(formulaReversePercentage);
          handleOutput(formulaReversePercentage);
        } else {
          setDisplayFormula(displayDelString);
          setFormula(delString);
          handleOutput(delString);
        }
        break;
      case "=":
        setDisplayFormula(removeOpBeforeEquals(formula));
        setFormula(removeOpBeforeEquals(formula));
        break;
      case "%":
        if (
          testMultipleOps(formula) ||
          displayFormula.toString().slice(-1) === "%" ||
          formula.toString() === "0"
        ) {
          setDisplayFormula(displayFormula);
          setFormula(formula);
        } else {
          setDisplayFormula(displayFormula + "%");
          setFormula(formulaWithPercentage);
          handleOutput(formulaWithPercentage);
        }
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        if (testMultipleOps(formula)) {
          setDisplayFormula(displayFormula);
          setFormula(formula);
        } else {
          setDisplayFormula(displayFormula + display);
          setFormula(formula + value);
        }
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
          handleOutput(parseFloat(value));
        } else {
          setDisplayFormula(displayFormula + display);
          setFormula(formula + value);
          handleOutput(formula + value);
        }
    }
  };

  function removeOpBeforeEquals(string) {
    if (testMultipleOps(string)) {
      return (
        Math.round(
          1000000000000 * eval(string.slice(0, -1))
        ) / 1000000000000
      ).toString();

      //return eval(string.slice(0, -1)).toString();
    } else {
      return (
        Math.round(1000000000000 * eval(string)) /
        1000000000000
      ).toString();
      //return eval(string).toString();
    }
  }

  function testMultipleOps(string) {
    let opRegex = /[-/*+=]/g;
    let lastChar = string.toString().slice(-1);
    if (opRegex.test(lastChar)) {
      return true;
    } else {
      return false;
    }
  }

  function handleOutput(string) {
    let answer;
    if (testMultipleOps(string)) {
      answer = (
        Math.round(
          10000000000 * eval(string.slice(0, -1))
        ) / 10000000000
      ).toString();
    } else {
      answer = (
        Math.round(10000000000 * eval(string)) / 10000000000
      ).toString();
    }
    setOutput(answer);
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
