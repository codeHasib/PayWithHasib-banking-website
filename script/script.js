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
const userAmountDisplay = document.querySelector(".userAmountDisplay");
userInfoSubmitBtn.addEventListener("click", () => {
  const userNameInputValue = userNameInput.value.trim();
  if (userNameInputValue.length === 0 && userAmountInput.value.length === 0) {
    userNameWarning.textContent = "Please Provide Your Name";
    userAmountWarning.textContent = "Please Provide Your Amount";
  } else if (userNameInputValue.length < 3) {
    userNameWarning.textContent = "Name Is Too Short";
  } else if (userAmountInput.value < 0) {
    userAmountWarning.textContent = "Amount Must Be Greater then 0";
  } else {
    appState.userName = userNameInputValue;
    appState.userAmount = userAmountInput.value;
    userNameDisplay.textContent = `Hi, ${appState.userName}`;
    userAmountDisplay.textContent = `$${appState.userAmount}`;
    userInfoInterface.style.display = "none";
    appDisplay.forEach((section) => {
      section.style.display = "block";
    });
  }
});
const deposit = document.querySelector(".deposit");
const depositPage = document.querySelector("#depositPage");
const depositBtn = document.querySelector(".depositBtn");
const depositInput = document.querySelector(".depositInput");
deposit.addEventListener("click", () => {
    depositPage.style.display = "block";
    appDisplay.forEach((section) => {
        section.style.display = "none";
    });
});
depositBtn.addEventListener("click", ()=> {
    depositInput.value = "";
    appState.userAmount+=depositInput.value;
    userAmountDisplay.textContent = appState.userAmount;
});
const send = document.querySelector(".send");
const sendMoneyPage = document.querySelector("#sendMoneyPage");
send.addEventListener("click", () => {
    sendMoneyPage.style.display = "block";
    appDisplay.forEach((section) => {
        section.style.display = "none";
    });
});
const withdraw = document.querySelector(".withdraw");
const withdrawPage = document.querySelector("#withdrawPage");
withdraw.addEventListener("click", () => {
    withdrawPage.style.display = "block";
    appDisplay.forEach((section) => {
        section.style.display = "none";
    });
});
const backBtn = document.querySelectorAll(".back-btn");
const transactionPages = document.querySelectorAll(".transaction-pages");
backBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        transactionPages.forEach((section) => {
            section.style.display = "none";
        });
        appDisplay.forEach((section) => {
            section.style.display = "block";
        });
    });
});