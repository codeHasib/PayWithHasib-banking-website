const userInfoInterface = document.querySelector("#user-info");
const userNameInput = document.querySelector(".user-name");
const userNameWarning = document.querySelector(".name-msg");
const userAmountInput = document.querySelector(".user-amount");
const userAmountWarning = document.querySelector(".amount-msg");
const userInfoSubmitBtn = document.querySelector(".user-info-submit");
userInfoSubmitBtn.addEventListener("click",()=> {
    if(userNameInput.value.length < 3) {
        userNameWarning.textContent = "Name Is Too Short";
    } else if(userAmountInput.value < 0) {
        userAmountWarning.textContent = "Amount Must Be Greater then 0"
    } else {
        userInfoInterface.style.display = "none";
    }
});