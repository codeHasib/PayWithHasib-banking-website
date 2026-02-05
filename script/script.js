let appState = {
  userName: "",
  userAmount: 0,
  transactions: [],
};
const userInfoInterface = document.querySelector("#user-info");
const userNameInput = document.querySelector(".user-name");
const userNameWarning = document.querySelector(".name-msg");
const userAmountInput = document.querySelector(".user-amount");
const userAmountWarning = document.querySelector(".amount-msg");
const appDisplay = document.querySelectorAll(".app");
const userInfoSubmitBtn = document.querySelector(".user-info-submit");
const userNameDisplay = document.querySelector(".userNameDisplay");
const userAmountDisplay = document.querySelectorAll(".userAmountDisplay");
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
userInfoSubmitBtn.addEventListener("click", () => {
  const userNameInputValue = userNameInput.value.trim();
  const userAmountInputValue = Number(userAmountInput.value);
  if (userNameInputValue.length === 0 && userAmountInputValue === 0) {
    userNameWarning.textContent = "Please Provide Your Name";
    userAmountWarning.textContent = "Please Provide Your Amount";
  } else if (userNameInputValue.length < 3) {
    userNameWarning.textContent = "Name Is Too Short";
  } else if (userAmountInputValue < 0) {
    userAmountWarning.textContent = "Amount Must Be Greater then 0";
  } else {
    appState.userName = userNameInputValue;
    appState.userAmount = userAmountInputValue;
    showApp();
    render();
    checkHistory();
    userInfoInterface.style.display = "none";
  }
});

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
depositBtn.addEventListener("click", () => {
  const amount = Number(depositInput.value);
  if (amount > 0) {
    appState.userAmount += amount;
    render();
    appState.transactions.push({
      type: "Deposit",
      amount: amount,
      time: new Date().toLocaleString(),
    });
    checkHistory();
    depositInput.value = "";
  } else {
    depoWarnMsg.textContent = "Invalid input";
  }
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
sendBtn.addEventListener("click", () => {
  const amount = Number(sendInput.value);
  if (amount <= appState.userAmount && amount > 0) {
    appState.userAmount -= amount;
    render();
    appState.transactions.push({
      type: "Send Money",
      amount: amount,
      time: new Date().toLocaleString(),
    });
    checkHistory();
    sendInput.value = "";
  } else {
    sendWarnMsg.textContent = "Insufficient Balance or Invalid Input";
  }
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
withdrawBtn.addEventListener("click", () => {
  const amount = Number(sendInput.value);
  if (amount <= appState.userAmount && amount > 0) {
    appState.userAmount -= amount;
    render();
    appState.transactions.push({
      type: "Withdraw",
      amount: amount,
      time: new Date().toLocaleString(),
    });
    checkHistory();
    withdrawInput.value = "";
  } else {
    withWarnMsg.textContent = "Insufficient Balance or Invalid Input";
  }
});
const backBtn = document.querySelectorAll(".back-btn");
const transactionPages = document.querySelectorAll(".transaction-pages");
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
