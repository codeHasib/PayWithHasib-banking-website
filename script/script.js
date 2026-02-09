let appState = {
  userName: "",
  userPin: "",
  userAmount: 0,
  transactions: [],
};
const userInfoInterface = document.querySelector("#user-info");
const userNameInput = document.querySelector(".user-name");
const userNameWarning = document.querySelector(".name-msg");
const userPinInput = document.querySelector(".user-pin");
const userPinWarning = document.querySelector(".pin-msg");
const userAmountInput = document.querySelector(".user-amount");
const userAmountWarning = document.querySelector(".amount-msg");
const appDisplay = document.querySelectorAll(".app");
const userInfoSubmitBtn = document.querySelector(".user-info-submit");
const userNameDisplay = document.querySelector(".userNameDisplay");
const userAmountDisplay = document.querySelectorAll(".userAmountDisplay");
userPinInput.addEventListener("keydown", (e) => {
  if (e.key === "-" || e.key === "+") {
    e.preventDefault();
  }
});
userPinInput.addEventListener("input", () => {
  const maxValue = 4;
  let currentInputLength = userPinInput.value.length;
  if (currentInputLength > maxValue) {
    userPinInput.value = userPinInput.value.slice(0, maxValue);
  }
});
function render() {
  userNameDisplay.textContent = `Hi, ${appState.userName}`;
  userAmountDisplay.forEach((display) => {
    display.textContent = `$${appState.userAmount}`;
  });
}
function showApp() {
  appDisplay.forEach((section) => {
    section.style.display = "block";
  });
}
function hideApp() {
  appDisplay.forEach((section) => {
    section.style.display = "none";
  });
}
function userAuthentication() {
  const userNameInputValue = userNameInput.value.trim();
  const userAmountLength = userAmountInput.value.length;
  const userAmountInputValue = Number(userAmountInput.value);
  const userPinInputValue = userPinInput.value;
  if (
    userNameInputValue.length === 0 ||
    userAmountLength === 0 ||
    userPinInputValue.length === 0
  ) {
    userNameWarning.textContent = "Please provide all the information";
    return;
  } else {
    userNameWarning.textContent = "";
  }

  if (userNameInputValue.length < 3) {
    userNameWarning.textContent = "Please provide a valid name";
    return;
  } else {
    userNameWarning.textContent = "";
  }
  if (userPinInputValue.length < 4) {
    userPinWarning.textContent = "Please provide 4-digit pin";
    return;
  } else {
    userPinWarning.textContent = "";
  }
  if (userAmountInputValue <= 0) {
    userAmountWarning.textContent = "Please provide a valid amount";
    return;
  } else {
    userAmountWarning.textContent = "";
  }
  appState.userName = userNameInputValue;
  appState.userPin = userPinInput.value;
  appState.userAmount = userAmountInputValue;
  checkHistory(appState);
  userInfoInterface.style.display = "none";
  showApp();
  render();
}
userNameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    userAuthentication();
  }
});
userPinInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    userAuthentication();
  }
});
userAmountInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    userAuthentication();
  }
});
userInfoSubmitBtn.addEventListener("click", () => {
  userAuthentication();
});
const transSuccessPopUp = document.querySelector("#successfulTransPopUp");
const popUpMethodType = document.querySelectorAll(".methodType");
const popUpMoney = document.querySelector(".remainingMoney");
const popUpHomeBtn = document.querySelector(".popUp-homeBtn");
const popUpAgainBtn = document.querySelector(".popUp-againBtn");
const closePopUpBtn = document.querySelector(".close-popup");
const popUpDiv = document.querySelector(".popUp-div");
function transactionSuccessPopUp(methodType) {
  transSuccessPopUp.style.display = "flex";
  popUpDiv.classList.add("animate-popup-start");
  popUpMethodType.forEach((type) => (type.textContent = methodType));
  popUpMoney.textContent = appState.userAmount;
  function hidePopUp() {
    popUpDiv.classList.remove("animate-popup-start");
    transSuccessPopUp.style.display = "none";
  }
  popUpHomeBtn.addEventListener("click", () => {
    showApp();
    hideTransactionPages();
    hidePopUp();
  });
  popUpAgainBtn.addEventListener("click", () => {
    hidePopUp();
  });
  closePopUpBtn.addEventListener("click", () => {
    hidePopUp();
  });
}

const depoUserPin = document.querySelector(".depoPinInput");
const deposit = document.querySelector(".deposit");
const depositPage = document.querySelector("#depositPage");
const depositBtn = document.querySelector(".depositBtn");
const depositInput = document.querySelector(".depositInput");
const depoWarnMsg = document.querySelector(".depoWarnMsg");
const depoMethod = document.querySelector("#depositMethod");
deposit.addEventListener("click", () => {
  depositPage.style.display = "block";
  render();
  hideApp();
});
function depositRun() {
  const amount = Number(depositInput.value);
  let depoMethodValue = depoMethod.value;
  let depoPinValue = depoUserPin.value;
  if (amount > 0 && depoMethodValue && depoPinValue.length > 0) {
    if (depoPinValue === appState.userPin) {
      depoUserPin.value = "";
      depoMethod.value = "default";
      depoWarnMsg.textContent = "";
      appState.userAmount += amount;
      render();
      appState.transactions.push({
        type: "Deposit",
        method: depoMethodValue,
        amount: amount,
        time: new Date().toLocaleString(),
      });
      checkHistory(appState);
      transactionSuccessPopUp("Deposit");
      depositInput.value = "";
    } else {
      depoWarnMsg.textContent = " Incorrect User Pin (Please enter the pin you used for login!) ";
    }
  } else {
    depoWarnMsg.style.color = "red";
    depoWarnMsg.textContent = "Invalid input";
  }
}
depositInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    depositRun();
  }
});
depositBtn.addEventListener("click", () => {
  depositRun();
});

const sendUserPin = document.querySelector(".sendPinInput");
const sendUserAccNum = document.querySelector(".sendAccNum");
const send = document.querySelector(".send");
const sendInput = document.querySelector(".sendMoneyInput");
const sendBtn = document.querySelector(".sendMoneyBtn");
const sendMoneyPage = document.querySelector("#sendMoneyPage");
const sendWarnMsg = document.querySelector(".sendWarnMsg");
send.addEventListener("click", () => {
  sendMoneyPage.style.display = "block";
  hideApp();
});
function sendMoneyRun() {
  const amount = Number(sendInput.value);
  const sendNumValue = sendUserAccNum.value;
  const sendPinValue = sendUserPin.value;
  if (
    amount <= appState.userAmount &&
    amount > 0 &&
    sendNumValue.length > 0 &&
    sendPinValue.length > 0
  ) {
    if (sendPinValue === appState.userPin) {
      sendUserAccNum.value = "";
      sendUserPin.value = "";
      sendWarnMsg.textContent = "";
      appState.userAmount -= amount;
      render();
      appState.transactions.push({
        type: "Send Money",
        accNum: sendNumValue,
        amount: amount,
        time: new Date().toLocaleString(),
      });
      checkHistory(appState);
      transactionSuccessPopUp("Send Money");
      sendInput.value = "";
    } else {
      sendWarnMsg.textContent = " Incorrect User Pin (Please enter the pin you used for login!) ";
    }
  } else {
    sendWarnMsg.style.color = "red";
    sendWarnMsg.textContent = "Insufficient Balance or Invalid Input";
  }
}
sendInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMoneyRun();
  }
});
sendBtn.addEventListener("click", () => {
  sendMoneyRun();
});

const withUserPin = document.querySelector(".withPinInput");
const withdraw = document.querySelector(".withdraw");
const withdrawBtn = document.querySelector(".withdrawBtn");
const withdrawInput = document.querySelector(".withdrawInput");
const withdrawPage = document.querySelector("#withdrawPage");
const withWarnMsg = document.querySelector(".withWarnMsg");
withdraw.addEventListener("click", () => {
  withdrawPage.style.display = "block";
  hideApp();
});
function withdrawRun() {
  const amount = Number(withdrawInput.value);
  const withPinValue = withUserPin.value;
  if (amount <= appState.userAmount && amount > 0 && withPinValue.length > 0) {
    if (withPinValue === appState.userPin) {
      withUserPin.value = "";
      withWarnMsg.textContent = "";
      appState.userAmount -= amount;
      render();
      transactionSuccessPopUp("Withdraw Money");
      appState.transactions.push({
        type: "Withdraw",
        amount: amount,
        time: new Date().toLocaleString(),
      });
      checkHistory(appState);
      withdrawInput.value = "";
    } else {
      withWarnMsg.textContent = " Incorrect User Pin (Please enter the pin you used for login!) ";
    }
  } else {
    withWarnMsg.style.color = "red";
    withWarnMsg.textContent = "Insufficient Balance or Invalid Input";
  }
}
withdrawInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    withdrawRun();
  }
});
withdrawBtn.addEventListener("click", () => {
  withdrawRun();
});
const backBtn = document.querySelectorAll(".back-btn");
const transactionPages = document.querySelectorAll(".transaction-pages");
function showTransactionPages() {
  transactionPages.forEach((section) => (section.style.display = "block"));
}
function hideTransactionPages() {
  transactionPages.forEach((section) => (section.style.display = "none"));
}
backBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    transactionPages.forEach((section) => {
      section.style.display = "none";
    });
    showApp();
  });
});

const historyDiv = document.querySelector(".historyDiv");
const searchHistory = document.querySelector("#searchInput");
searchHistory.addEventListener("input", ()=> {
  const searchQuery = searchHistory.value.toLowerCase();
  const filteredHistory = appState.transactions.filter(trans=> {
    return trans.type.toLowerCase().includes(searchQuery);
  });
  const filteredObj = {
    transactions: filteredHistory
  };
  checkHistory(filteredObj);
  console.log(filteredObj.transactions);
});
function checkHistory(obj) {
  historyDiv.innerHTML = "";
  const deposits = [];
  const sendMoneys = [];
  const withdraws = [];
  if (obj.transactions.length > 0) {
    obj.transactions.forEach((trans) => {
      if (trans.type === "Deposit") {
        deposits.push(trans);
      } else if (trans.type === "Send Money") {
        sendMoneys.push(trans);
      } else {
        withdraws.push(trans);
      }
    });
    if (deposits.length > 0) {
      deposits.forEach((deposit) => {
        let div = document.createElement("div");
        let h2 = document.createElement("h2");
        h2.textContent = deposit.type;
        div.append(h2);
        let h3 = document.createElement("h3");
        h3.textContent = `$${deposit.amount}`;
        div.append(h3);
        let methodH3 = document.createElement("h3");
        methodH3.textContent = `Method : ${deposit.method}`;
        div.append(methodH3);
        let h4 = document.createElement("h4");
        h4.textContent = deposit.time;
        div.append(h4);
        historyDiv.append(div);
      });
    }
    if (sendMoneys.length > 0) {
      sendMoneys.forEach((sendMoney) => {
        let div = document.createElement("div");
        let h2 = document.createElement("h2");
        h2.textContent = sendMoney.type;
        div.append(h2);
        let h3 = document.createElement("h3");
        h3.textContent = `$${sendMoney.amount}`;
        div.append(h3);
        let accNumH3 = document.createElement("h3");
        accNumH3.textContent = `Account Number : ${sendMoney.accNum}`;
        div.append(accNumH3);
        let h4 = document.createElement("h4");
        h4.textContent = sendMoney.time;
        div.append(h4);
        historyDiv.append(div);
      });
    }
    if (withdraws.length > 0) {
      withdraws.forEach((withdraw) => {
        let div = document.createElement("div");
        let h2 = document.createElement("h2");
        h2.textContent = withdraw.type;
        div.append(h2);
        let h3 = document.createElement("h3");
        h3.textContent = `$${withdraw.amount}`;
        div.append(h3);
        let h4 = document.createElement("h4");
        h4.textContent = withdraw.time;
        div.append(h4);
        historyDiv.append(div);
      });
    }
  } else {
    let h2 = document.createElement("h2");
    h2.textContent = "No history";
    historyDiv.append(h2);
  }
}