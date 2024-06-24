#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

// Initialize user balance and pin code 
let myBalance = 50000;
let myPin = 1234;

//Print Welcome message
console.log(chalk.blue("\n\t\tWELCOME TO MY - ATM MACHINE\n"));

let PinAnswer = await inquirer.prompt ([
    {
      name: "pin",
      type: "number",
      message: chalk.green("Enter your pin code : \n"),
    }
]);
if (PinAnswer.pin !== myPin){
    console.log(chalk.red("Pin is Incorrect"));
}
else if (PinAnswer.pin === myPin) {
    console.log(chalk.yellowBright("Pin is Correct , Login Successfully"));
    
    let operationAns = await inquirer.prompt ([
        {
          name: "operation",
          type: "list",
          message: "What would you like to do?\n",
          choices: ["Withdraw Amount","Check Balance",]
        }
    ]);
    
if (operationAns.operation === "Withdraw Amount"){
    let withdrawAns =await inquirer.prompt ([
        {
            name: "withdrawMethod",
            type: "list",
            message: "Choose the method of withdrawal :",
            choices: ["Fast Cash","Enter Amount"]
        }
    ]);
    if (withdrawAns.withdrawMethod === "Fast Cash"){
       let fastCashAns = await inquirer.prompt ([
        {
            name: "fastCash",
            type: "list",
            message: "Choose the amount you want to withdraw :",
            choices: [ "1000", "5000" , "10000", "20000"]
        }
       ]);
        if (fastCashAns.fastCash > myBalance){
        console.log(chalk.red("Insufficient Balance"));
         }
        else {
            myBalance -= fastCashAns.fastCash;
            console.log(`${fastCashAns.fastCash} Withdraw Successfully`);
            console.log(`Your Remaining Balance is ${myBalance}`);
             }
        }
    else if(withdrawAns.withdrawMethod === "Enter Amount"){

    let withdrawAmount = await inquirer.prompt ([
        {
          name: "amount",
          type: "number",
          message: "Enter the amount you want to withdraw :",
        }
    ]);
if (withdrawAmount.amount > myBalance) {
    console.log(chalk.red("Insufficient Balance"));
    }
else {
    myBalance -= withdrawAmount.amount;
    console.log(`${withdrawAmount.amount} Withdraw Successfully`);
    console.log(`Your Remaining Balance is : ${myBalance}`);
    }
    }} 
else if (operationAns.operation === "Check Balance") {
    console.log(`Your current account balance is ${myBalance} `);
}

}