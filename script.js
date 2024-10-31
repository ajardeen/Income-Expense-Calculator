const description = document.getElementById("description");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const addbtn = document.getElementById("add-btn");
let transactionData = JSON.parse(localStorage.getItem("transactionData")) || [];
const resetbtn = document.getElementById("reset-btn");

resetbtn.addEventListener("click", () => {
  description.value = "";
  amount.value = "";
  type.value = "expense";
});

//new transaction add function
let addTransaction = () => {
  let descriptionValue = description.value;
  let amountValue = amount.value;
  let typeValue = type.value;
  //validation for not to add empty fields
  if (!descriptionValue || !amountValue || !typeValue) {
    alert("Please fill all the fields");
    return;
  }
  
  transactionData.push({
    description: descriptionValue,
    amount: amountValue,
    type: typeValue,
  });
  localStorage.setItem("transactionData", JSON.stringify(transactionData));
  //clear input fields
  description.value = "";
  amount.value = "";
  type.value = "expense";
  transactionListUpdate("all");
  updateAllValues();
};

//add transaction button event listener
addbtn.addEventListener("click", addTransaction);

//filter function
const allbtn = document.querySelector(".all");
const expensebtn = document.querySelector(".expense");
const incomebtn = document.querySelector(".income");
const filterbtn = [allbtn, expensebtn, incomebtn];

filterbtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.checked) {
      transactionListUpdate(btn.className);
    }
  });
});
let ListCreatingCode = (transaction,index) => {
  const tr = document.createElement("tr");
  tr.className = "transaction-item";
  // create a td element for the option column
  const tdOption = document.createElement("td");
  tdOption.className = "option";
  //edit button creation
  const editButton = document.createElement("button");
  editButton.innerHTML =
    '<span class="material-symbols-outlined edit-btn"> edit_note </span>';
  editButton.addEventListener("click", () => editItem(index));
  //delete button creation
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML =
    '<span class="material-symbols-outlined delete-btn">delete</span>';
  deleteButton.addEventListener("click", () => deleteItem(index));
  //appending edit and delete buttons to tdOption
  tdOption.appendChild(editButton);
  tdOption.appendChild(deleteButton);
  tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${transaction.type}</td>
            <td>${transaction.description}</td>
            <td>${transaction.amount}</td>
      </td>
     `;
  tr.appendChild(tdOption);
  transactionList.appendChild(tr);
};
const transactionList = document.getElementById("transaction-list");
let transactionListUpdate = (filterName) => {
  transactionList.innerHTML = "";


  transactionData.filter((transaction, index) => {
    if (transaction.type === filterName) {
      
      ListCreatingCode(transaction,index);
    } else if (filterName === "all") {
      ListCreatingCode(transaction,index);
    }
  });
};
transactionListUpdate("all");

let deleteItem = (index) => {
  transactionData.splice(index, 1);
  localStorage.setItem("transactionData", JSON.stringify(transactionData));
  transactionListUpdate("all");
  updateAllValues();
};
let absoluteIndex ;
let updateItem = (index) => {
  
  if (addbtn.textContent === "Update") {
    transactionData[index]={
      description: description.value,
      amount: amount.value,
      type: type.value,
    };

    description.value = "";
    amount.value = "";
    type.value = "expense";
    localStorage.setItem("transactionData", JSON.stringify(transactionData));
    transactionListUpdate("all");
    updateAllValues();
    addbtn.textContent = "Add";
  }
  addbtn.removeEventListener("click", updateItem);
  addbtn.addEventListener("click", addTransaction);
};

const editItem = (index) => {
  absoluteIndex=index;
  
  description.value = transactionData[index].description;
  amount.value = transactionData[index].amount;
  type.value = transactionData[index].type;
  addbtn.textContent = "Update";
  addbtn.removeEventListener("click", addTransaction);
  addbtn.addEventListener("click", () => updateItem(absoluteIndex));
  updateAllValues();
  // mobile responsive display purpose only
  const mobileMediaQuery = window.matchMedia("(max-width: 600px)");
  if(mobileMediaQuery.matches) {
    
    financialstatus.style.display = "flex";
    addbtn.addEventListener("click", () => {
      financialstatus.style.display = "none";
    });
  }
};
// Represents the total income amount.
const totalincome = document.getElementById("total-income");
const totalexpense = document.getElementById("total-expense");
const netbalance = document.getElementById("net-balance");
let updateAllValues = () => {
  let totalIncome = transactionData.reduce((acc, item) => {
    if (item.type === "income") {
      return acc + Number(item.amount);
    }
    return acc;
  }, 0);

  let totalExpense = transactionData.reduce((acc, item) => {
    if (item.type === "expense") {
      return acc + Number(item.amount);
    }
    return acc;
  }, 0);

  totalincome.textContent = totalIncome;
  totalexpense.textContent = totalExpense;
  let Balance = totalIncome - totalExpense;
  netbalance.textContent = Balance;
};
updateAllValues();
//mobile responsive
const addcircle = document.querySelector("#addcircle");
const financialstatus = document.querySelector("#financialstatus");
const close = document.querySelector("#close");
addcircle.addEventListener("click", () => {
  financialstatus.style.display = "flex";
});
close.addEventListener("click", () => {
  financialstatus.style.display = "none";
});