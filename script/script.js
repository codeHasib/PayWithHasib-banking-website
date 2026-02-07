let appState = {
  userName: "",
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
  appState.userAmount = userAmountInputValue;
  checkHistory();
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
const popUpMethodType = document.querySelector(".methodType");
const popUpMoney = document.querySelector(".remainingMoney");
const popUpHomeBtn = document.querySelector(".popUp-homeBtn");
const popUpAgainBtn = document.querySelector(".popUp-againBtn");
const closePopUpBtn = document.querySelector(".close-popup");
function transactionSuccessPopUp(methodType) {
  transSuccessPopUp.classList.add("animate-popup-start");
  transSuccessPopUp.style.display = "flex";
  popUpMethodType.textContent = methodType;
  popUpMoney.textContent = appState.userAmount;
  popUpHomeBtn.addEventListener("click", () => {
    showApp();
    hideTransactionPages();
    transSuccessPopUp.classList.add("animate-popup-close");
    transSuccessPopUp.style.display = "none";
  });
  popUpAgainBtn.addEventListener("click", () => {
    transSuccessPopUp.classList.add("animate-popup-close");
    transSuccessPopUp.style.display = "none";
  });
  closePopUpBtn.addEventListener("click", () => {
    transSuccessPopUp.classList.add("animate-popup-close");
    transSuccessPopUp.style.display = "none";
  });
}

const deposit = document.querySelector(".deposit");
const depositPage = document.querySelector("#depositPage");
const depositBtn = document.querySelector(".depositBtn");
const depositInput = document.querySelector(".depositInput");
const depoWarnMsg = document.querySelector(".depoWarnMsg");
deposit.addEventListener("click", () => {
  depositPage.style.display = "block";
  render();
  hideApp();
});
function depositRun() {
  const amount = Number(depositInput.value);
  if (amount > 0) {
    depoWarnMsg.textContent = "";
    appState.userAmount += amount;
    render();
    appState.transactions.push({
      type: "Deposit",
      amount: amount,
      time: new Date().toLocaleString(),
    });
    checkHistory();
    transactionSuccessPopUp("Deposit");
    depositInput.value = "";
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
  if (amount <= appState.userAmount && amount > 0) {
    sendWarnMsg.textContent = "";
    appState.userAmount -= amount;
    render();
    appState.transactions.push({
      type: "Send Money",
      amount: amount,
      time: new Date().toLocaleString(),
    });
    checkHistory();
    transactionSuccessPopUp("Send Money");
    sendInput.value = "";
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
  if (amount <= appState.userAmount && amount > 0) {
    withWarnMsg.textContent = "";
    appState.userAmount -= amount;
    render();
    transactionSuccessPopUp("Withdraw Money");
    appState.transactions.push({
      type: "Withdraw",
      amount: amount,
      time: new Date().toLocaleString(),
    });
    checkHistory();
    withdrawInput.value = "";
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
function checkHistory() {
  if (appState.transactions.length > 0) {
    historyDiv.innerHTML = "";
    appState.transactions.forEach((trans) => {
      let div = document.createElement("div");
      let h2 = document.createElement("h2");
      h2.textContent = trans.type;
      div.append(h2);
      let h3 = document.createElement("h3");
      h3.textContent = trans.amount;
      div.append(h3);
      let h4 = document.createElement("h4");
      h4.textContent = trans.time;
      div.append(h4);
      historyDiv.append(div);
    });
  } else {
    let h2 = document.createElement("h2");
    h2.style.textAlign = "center";
    h2.textContent = "No History";
    historyDiv.append(h2);
  }
}
