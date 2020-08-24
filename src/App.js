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
    const formulaWithPercentage = formula
      .toString()
      .slice(0, -currentNum.length)
      .concat(percentage);
    const decimalRegex = /\./g;

    switch (value) {
      case "C":
        setDisplayFormula("");
        setFormula("0");
        setOutput("0");
        break;
      case "Del":
        if (formula.length <= 1) {
          setDisplayFormula("0");
          setFormula("0");
          setOutput("0");
        } else if (
          formula.length <= 3 &&
          /[-/*+=]/.test(formula[1]) === true
        ) {
          setDisplayFormula("0");
          setFormula("0");
          setOutput("0");
        } else {
          const displayString = displayFormula
            .slice(0, -1)
            .toString();
          const string = formula.slice(0, -1).toString();
          setDisplayFormula(displayString);
          setFormula(string);
          setOutput(eval(string).toString());
        }
        break;
      case "=":
        setDisplayFormula(removeOpBeforeEquals(formula));
        setFormula(removeOpBeforeEquals(formula));
        break;
      case "%":
        if (testMultipleOps(formula)) {
          setDisplayFormula(displayFormula);
          setFormula(formula);
        } else {
          setDisplayFormula(displayFormula + "%");
          setFormula(formulaWithPercentage);
          setOutput(eval(formulaWithPercentage).toString());
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
          setOutput(parseFloat(value));
        } else {
          setDisplayFormula(displayFormula + display);
          setFormula(formula + value);
          setOutput(eval(formula + value).toString());
        }
    }
  };

  function removeOpBeforeEquals(string) {
    // if (
    //   string.slice(-1) === "+" ||
    //   string.slice(-1) === "-" ||
    //   string.slice(-1) === "*" ||
    //   string.slice(-1) === "/"
    // ) {
    if (testMultipleOps(string)) {
      return eval(string.slice(0, -1)).toString();
    } else {
      return eval(string).toString();
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
