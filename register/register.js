let price = 19.5;
let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];

// start ************************
const btn = document.querySelector("#purchase-btn");
const changeDue = document.querySelector("#change-due");
document.querySelector("#div2").innerHTML = `Total: $${price}`;
const changeInDrawer = document.querySelector("#div16");
let changeArr = {
  pennies: 0,
  nickels: 0,
  dimes: 0,
  quarters: 0,
  ones: 0,
  fives: 0,
  tens: 0,
  twenties: 0,
  hundreds: 0
}
let status = "";
let changeStat = 0;
let cashInDrawer = 0;
updateDrawer();

// update *************************
btn.addEventListener("click", () => {
 changeArr = {
  pennies: 0,
  nickels: 0,
  dimes: 0,
  quarters: 0,
  ones: 0,
  fives: 0,
  tens: 0,
  twenties: 0,
  hundreds: 0
}
 status = "";
 changeStat = 0;
cashInDrawer = 0;

  var cash = parseFloat(document.querySelector('#cash').value);
  document.querySelector('#cash').value = "";
  if(cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if(cash == price) {
    changeDue.innerHTML = "No change due - customer paid with exact cash";
  } else {
    getCashInDrawer();
    getChange(cash, price);
    displayChange();
    updateDrawer();
  }
});

function keyDown(e) {
 changeArr = {
  pennies: 0,
  nickels: 0,
  dimes: 0,
  quarters: 0,
  ones: 0,
  fives: 0,
  tens: 0,
  twenties: 0,
  hundreds: 0
}
 status = "";
 changeStat = 0;
 cashInDrawer = 0;

  switch(e.key) {
    case "Enter":
      var cash = parseFloat(document.querySelector('#cash').value);
      document.querySelector('#cash').value = "";
      if(cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
      } else if(cash == price) {
        changeDue.innerHTML = "No change due - customer paid with exact cash";
      } else {
        getCashInDrawer();
        getChange(cash, price);
        displayChange();
        updateDrawer();
      }
      break;
  }
}
document.addEventListener("keydown", keyDown);

function updateDrawer() {
  changeInDrawer.innerHTML = `
  <h2>Change in drawer:</h2>
  <p>Pennies: $${cid[0][1]}</p>
  <p>Nickels: $${cid[1][1]}</p>
  <p>Dimes: $${cid[2][1]}</p>
  <p>Quarters: $${cid[3][1]}</p>
  <p>Ones: $${cid[4][1]}</p>
  <p>Fives: $${cid[5][1]}</p>
  <p>Tens: $${cid[6][1]}</p>
  <p>Twenties: $${cid[7][1]}</p>
  <p>Hundreds: $${cid[8][1]}</p>
  `;
}

function displayChange() {
  if(status !== "INSUFFICIENT_FUNDS") {
    if(cashInDrawer == changeStat) {
      status = "CLOSED";
      changeDue.innerHTML = `Status: ${status}<br>`;
    } else {
      status = "OPEN";
      changeDue.innerHTML = `Status: ${status}<br>`;
    }
    for(let i = 8; i >= 0; i--) {
        if(i === 8 && changeArr.hundreds > 0) {
          changeDue.innerHTML += `HUNDRED: $${(changeArr.hundreds * 100)}<br>`;
        } else if(i === 7 && changeArr.twenties > 0) {
          changeDue.innerHTML += `TWENTY: $${(changeArr.twenties * 20)}<br>`;
        } else if(i === 6 && changeArr.tens > 0) {
          changeDue.innerHTML += `TEN: $${(changeArr.tens * 10)}<br>`;
        } else if(i === 5 && changeArr.fives > 0) {
          changeDue.innerHTML += `FIVE: $${(changeArr.fives * 5)}<br>`;
        } else if(i === 4 && changeArr.ones > 0) {
          changeDue.innerHTML += `ONE: $${changeArr.ones}<br>`;
        } else if(i === 3 && changeArr.quarters > 0) {
          changeDue.innerHTML += `QUARTER: $${(changeArr.quarters * 0.25)}<br>`;
        } else if(i === 2 && changeArr.dimes > 0) {
          changeDue.innerHTML += `DIME: $${(changeArr.dimes * 0.1)}<br>`;
        } else if(i === 1 && changeArr.nickels > 0) {
          changeDue.innerHTML += `NICKEL: $${(changeArr.nickels * 0.05)}<br>`;
        } else if(i === 0 && changeArr.pennies > 0) {
          changeDue.innerHTML += `PENNY: $${(changeArr.pennies * 0.01)}<br>`;
        }
      }
  }
  if(status === "INSUFFICIENT_FUNDS") {
    changeDue.innerHTML = `Status: ${status}<br>`;
  }
}

function getChange(cash1, price1) {
  changeStat = (cash1 - price1).toFixed(2);
  let change = changeStat;
  while(change > 0) {
    let t = 0;
    for(let i = 8; i >= 0; i--) {
      if(cid[i][1] > 0) {
        if(i === 8) {
          if(change >= 100) {
            cid[i][1] = (cid[i][1] - 100).toFixed(2);
            change = (change - 100).toFixed(2);
            changeArr.hundreds++;
            t = 1;
            break;
          }
        } else if(i === 7) {
          if(change >= 20) {
            cid[i][1] = (cid[i][1] - 20).toFixed(2);
            change = (change - 20).toFixed(2);
            changeArr.twenties++;
            t = 1;
            break;
          }
        } else if(i === 6) {
          if(change >= 10) {
            cid[i][1] = (cid[i][1] - 10).toFixed(2);
            change = (change - 10).toFixed(2);
            changeArr.tens++;
            t = 1;
            break;
          }
        } else if(i === 5) {
          if(change >= 5) {
            cid[i][1] = (cid[i][1] - 5).toFixed(2);
            change = (change - 5).toFixed(2);
            changeArr.fives++;
            t = 1;
            break;
          }
        } else if(i === 4) {
          if(change >= 1) {
            cid[i][1] = (cid[i][1] - 1).toFixed(2);
            change = (change - 1).toFixed(2);
            changeArr.ones++;
            t = 1;
            break;
          }
        } else if(i === 3) {
          if(change >= 0.25) {
            cid[i][1] = (cid[i][1] - 0.25).toFixed(2);
            change = (change - 0.25).toFixed(2);
            changeArr.quarters++;
            t = 1;
            break;
          }
        } else if(i === 2) {
          if(change >= 0.1) {
            cid[i][1] = (cid[i][1] - 0.1).toFixed(2);
            change = (change - 0.1).toFixed(2);
            changeArr.dimes++;
            t = 1;
            break;
          }
        } else if(i === 1) {
          if(change >= 0.05) {
            cid[i][1] = (cid[i][1] - 0.05).toFixed(2);
            change = (change - 0.05).toFixed(2);
            changeArr.nickels++;
            t = 1;
            break;
          }
        } else if(i === 0) {
          if(change >= 0.01) {
            cid[i][1] = (cid[i][1] - 0.01).toFixed(2);
            change = (change - 0.01).toFixed(2);
            changeArr.pennies++;
            t = 1;
            break;
          }
        }
      }
    }
    if(t === 0) {
      status = "INSUFFICIENT_FUNDS";
      change = 0;
    }
  }
}

function getCashInDrawer() {
  cashInDrawer = 0;
  for(let i = 0; i < 9; i++) {
    cashInDrawer = (cashInDrawer + cid[i][1]);
  }
}