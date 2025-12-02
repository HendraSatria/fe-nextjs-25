// =======================
// 1. Dynamic List
// =======================
const addItemBtn = document.getElementById("addItemBtn");
const itemInput = document.getElementById("itemInput");
const itemList = document.getElementById("itemList");

addItemBtn.onclick = function () {
    const text = itemInput.value.trim();
    if (text === "") return alert("Isi dulu!");

    const li = document.createElement("li");
    li.innerText = text;

    const delBtn = document.createElement("button");
    delBtn.innerText = "Hapus";
    delBtn.style.marginLeft = "10px";

    delBtn.onclick = function () {
        li.remove();
    };

    li.appendChild(delBtn);
    itemList.appendChild(li);

    itemInput.value = "";
};


// =======================
// 2. Background Color
// =======================
document.querySelectorAll(".bgBtn").forEach(btn => {
    btn.onclick = () => {
        document.body.style.backgroundColor = btn.dataset.color;
    };
});


// =======================
// 3. Counter
// =======================
let count = 0;
const counterDisplay = document.getElementById("counter");

document.getElementById("plusBtn").onclick = () => {
    count++;
    counterDisplay.textContent = count;
};

document.getElementById("minusBtn").onclick = () => {
    count--;
    counterDisplay.textContent = count;
};

document.getElementById("resetBtn").onclick = () => {
    count = 0;
    counterDisplay.textContent = count;
};


// =======================
// 4. Toggle Show / Hide
// =======================
const toggleBtn = document.getElementById("toggleBtn");
const toggleText = document.getElementById("toggleText");

toggleBtn.onclick = () => {
    toggleText.style.display =
        toggleText.style.display === "none" ? "block" : "none";
};
