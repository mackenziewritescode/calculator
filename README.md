# Clever Calculator

Check it out [here](https://mackenziewritescode.github.io/calculator/). It's written using React.js.

As hinted in the project itself, this isn't your average calculator app. What makes this one different? First, let's consider how your average calculator works, like the one found on any iPhone.

After you've entered your first number, you follow it up with an operator (+, - ,* , /, =, etc.). That number is then stored as the first argument `Arg1`, and the operator `Op` is stored as well. For this example, let's say the operator is "+". Up until this point, the display only shows `Arg1`.

Once you input a second number, the display clears to show you the second number `Arg2` as you input it. At this point you enter another operator and a calculation happens: 
```
Arg1 = Arg1 + Arg2
```
The result `Arg1` is then displayed on the screen. If another number is entered, that new number becomes `Arg2`. This way, the calculator only needs to remember three values: `Arg1`, `Arg2`, and `Op`. Each time a new `Op` is added, `Arg1` and `Arg2` are computed before setting the new `Op` and the sequence continues. Pretty simple!

So, how does this calculator work? In a word, differently.

Instead of storing two numbers and an operator, it stores two strings of formulas and an output. There's one formula for computing, which for simplicity's sake we'll call `formula`, and the formula that gets printed out to the formula display, `displayFormula`. `displayFormula` uses characters like "×" and "÷", and percentages look like "10%". This corresponds directly with the input of the user. `formula` on the other hand uses the typical operators used for computing in code like "\*" and "/". It also replaces percentages with the actual value divided by 100, so "0.1" instead of "10%". This means that `formula` can be computed using JavaScript's `eval()` function every time a button is pressed, and this number is the result you see in the display. So if you enter
```
55×15%÷9
```
the result is computed as
```
eval('55*0.15/9')
```
That's the basic principle, but of course there are many exceptions that need to be considered, like what to do if two operators are entered subsequently and how to handle the delete button (which itself is almost as complex as the rest of the code combined). For now I'd like to look at one particular operation that I find particularly interesting, the percentage (thrilling, I know).

If we were using the traditional method of writting a caluculator described above to calculate a percentage, all we would need to do is divide `Arg2` by 100. But because we're working with a potentially long string with multiple numbers and operators, we need to extract the last number from `formula` and replace it with `Num/100`. This takes a few steps. First we convert the formula to an array of numbers split wherever there are operators, called `numArr`: 
```
const numArr = formula
      .replace(/[-/*+=]/g, " ")
      .split(" ");
```
Then we set the last number in this array, the number we want to get the percentage of, to `currentNum`:
```
const currentNum = numArr[numArr.length - 1];
```
Now we create `percentage` as `currentNum` divided by 100:
```
const percentage = (currentNum / 100).toString();
```
And then finally we can use Array.prototype.slice() to remove the last number from the `formula` (which we can find now with `currentNum.length` and concatenate the new percentage to it:
```
const formulaWithPercentage = formula
      .slice(0, -currentNum.length)
      .concat(percentage);
```
Meanwhile, the only thing we need to do to the `displayFormula` is add "%".

So now the `formula` will look something like `55\*0.15` while the `displayFormula` looks simply like `55×15%`, and `formula` can be computed using `eval()`.

I won't get into the details here, but if you use the delete button to remove the `%` from `displayFormula`, that conversion we just did to `formula` needs to be reversed. All that for a simple percentage!

***

I hope this gives you some insight into how one might go about writting a calculator from scratch. If you want to see all of the code for yourself, head on over to `src/App.js` and `src/App.scss`.

It might also be worth mentioning that this project is optomized for mobile use. Have a look for yourself!
