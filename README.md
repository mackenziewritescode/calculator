# A Better Calculator App.

Check it out [here](https://mackenziewritescode.github.io/calculator/). It's written using React.js.

As hinted in the project itself, this isn't your average calculator app. What makes this one different? First, let's consider how your average calculator works, like the one found on any iPhone.

After you've entered your first number, you follow it up with an operator (+, - ,* , /, =, etc.). That number is then stored as the first argument `Arg1`, and the operator `Op` is stored as well. For this example, let's say the operator is "+". Up until this point, the display only shows `Arg1`.

Once you input a second number, the display clears to show you the second number `Arg2` as you input it. At this point you enter another operator and a calculation happens: 
```
Arg1 + Arg2 = Answer
```
`Arg1` is set to Answer, and it's displayed on the screen. If another number is entered, that new number becomes `Arg2`. This way, the calculator only needs to remember three values: `Arg1`, `Arg2`, and `Op`. Each time a new `Op` is added, `Arg1` and `Arg2` are computed before setting the new `Op` and the sequence continues. Pretty simple!

So, how does this calculator work? In a word, differently.

Instead of storing two numbers and an operator, it stores two strings of formulas and an output. There's one formula for computing, in my code written simply as `formula`, but for clarity's sake we'll call it `compFormula`, and the formula that gets printed out to the formula display, `displayFormula`. `displayFormula` uses characters like "×" and "÷", and percentages look like "10%". This corresponds directly with the input of the user. `compFormula` on the other hand uses typical operators used for computing in coding like "\*" and "/". It also replaces percentages with the actual value divided by 100, so "0.1" instead of "10%". This means that 


Let's look at the unique case of percentages for a moment, because I think they're **SUPER** interesting. If we were using the traditional method of writting a caluculator described above, all we would need to do is divide `Arg2` by 100.


It might also be worth mentioning that this project is optomized for mobile use. Have a look for yourself!
