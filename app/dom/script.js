// =======================
// 1. Dynamic List dengan fitur lengkap
// =======================
const addItemBtn = document.getElementById("addItemBtn");
const itemInput = document.getElementById("itemInput");
const itemList = document.getElementById("itemList");

// Tambahkan item saat Enter ditekan
itemInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addItem();
    }
});

addItemBtn.onclick = addItem;

function addItem() {
    const text = itemInput.value.trim();
    if (text === "") {
        showAlert("Masukkan item terlebih dahulu!", "warning");
        itemInput.focus();
        return;
    }

    // Hapus placeholder jika ada
    const placeholder = itemList.querySelector("li:first-child");
    if (placeholder && placeholder.textContent.includes("Belum ada item")) {
        placeholder.remove();
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <span>${text}</span>
        <div class="flex">
            <button class="editBtn" title="Edit item">
                <i class="fas fa-edit"></i>
            </button>
            <button class="deleteBtn" title="Hapus item">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    // Animasi masuk
    li.style.animation = "slideIn 0.3s ease";

    // Edit functionality
    const editBtn = li.querySelector(".editBtn");
    editBtn.onclick = function () {
        const span = li.querySelector("span");
        const newText = prompt("Edit item:", span.textContent);
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
            showAlert("Item berhasil diedit!", "success");
        }
    };

    // Delete functionality
    const deleteBtn = li.querySelector(".deleteBtn");
    deleteBtn.onclick = function () {
        li.style.animation = "slideIn 0.3s ease reverse";
        setTimeout(() => {
            li.remove();
            showAlert("Item dihapus!", "danger");
            
            // Tampilkan placeholder jika list kosong
            if (itemList.children.length === 0) {
                const emptyLi = document.createElement("li");
                emptyLi.style.color = "var(--gray)";
                emptyLi.style.textAlign = "center";
                emptyLi.style.padding = "20px";
                emptyLi.textContent = "Belum ada item. Tambahkan item pertama Anda!";
                itemList.appendChild(emptyLi);
            }
        }, 300);
    };

    itemList.appendChild(li);
    itemInput.value = "";
    itemInput.focus();
    showAlert("Item berhasil ditambahkan!", "success");
}

// =======================
// 2. Background Color dengan lebih banyak pilihan
// =======================
document.querySelectorAll(".bgBtn").forEach(btn => {
    btn.onclick = () => {
        const color = btn.dataset.color;
        
        // Smooth transition untuk background
        document.body.style.transition = "background 0.5s ease";
        document.body.style.background = color === "#f5f7fa" 
            ? "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
            : color;
        
        // Feedback visual
        btn.style.transform = "scale(0.95)";
        setTimeout(() => {
            btn.style.transform = "";
        }, 200);
        
        // Tampilkan notifikasi
        if (color === "#f5f7fa") {
            showAlert("Background direset ke default!", "info");
        } else {
            showAlert(`Background berubah menjadi ${btn.textContent.trim()}!`, "success");
        }
    };
});

// =======================
// 3. Counter dengan animasi dan limit
// =======================
let count = 0;
const counterDisplay = document.getElementById("counter");
const maxCount = 999;
const minCount = -999;

function updateCounter() {
    counterDisplay.textContent = count;
    counterDisplay.classList.add("counter-animation");
    
    // Ubah warna berdasarkan nilai
    if (count > 0) {
        counterDisplay.style.color = "#2f9e44";
    } else if (count < 0) {
        counterDisplay.style.color = "#ff4757";
    } else {
        counterDisplay.style.color = "var(--primary)";
    }
    
    setTimeout(() => {
        counterDisplay.classList.remove("counter-animation");
    }, 300);
}

document.getElementById("plusBtn").onclick = () => {
    if (count < maxCount) {
        count++;
        updateCounter();
        showAlert("Ditambah 1", "success");
    } else {
        showAlert("Sudah mencapai batas maksimum!", "warning");
    }
};

document.getElementById("minusBtn").onclick = () => {
    if (count > minCount) {
        count--;
        updateCounter();
        showAlert("Dikurangi 1", "danger");
    } else {
        showAlert("Sudah mencapai batas minimum!", "warning");
    }
};

document.getElementById("resetBtn").onclick = () => {
    count = 0;
    updateCounter();
    showAlert("Counter direset ke 0!", "info");
};

// =======================
// 4. Toggle dengan animasi smooth
// =======================
const toggleBtn = document.getElementById("toggleBtn");
const toggleText = document.getElementById("toggleText");
let isVisible = true;

toggleBtn.onclick = () => {
    if (isVisible) {
        toggleText.style.opacity = "0";
        toggleText.style.transform = "translateY(-10px)";
        setTimeout(() => {
            toggleText.style.display = "none";
        }, 300);
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i> Tampilkan Teks';
    } else {
        toggleText.style.display = "block";
        setTimeout(() => {
            toggleText.style.opacity = "1";
            toggleText.style.transform = "translateY(0)";
        }, 10);
        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Sembunyikan Teks';
    }
    isVisible = !isVisible;
    
    // Atur transisi untuk animasi
    toggleText.style.transition = "opacity 0.3s ease, transform 0.3s ease";
};

// =======================
// UTILITY: Alert System
// =======================
function showAlert(message, type) {
    // Hapus alert sebelumnya jika ada
    const existingAlert = document.querySelector(".custom-alert");
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement("div");
    alert.className = `custom-alert ${type}`;
    alert.innerHTML = `
        <span>${message}</span>
        <button class="close-alert"><i class="fas fa-times"></i></button>
    `;
    
    // Styling alert
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: var(--border-radius);
        color: white;
        font-weight: 600;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
        box-shadow: var(--box-shadow);
    `;
    
    // Warna berdasarkan type
    const colors = {
        success: "linear-gradient(135deg, #51cf66, #2f9e44)",
        warning: "linear-gradient(135deg, #ffd43b, #f08c00)",
        danger: "linear-gradient(135deg, #ff6b6b, #ff4757)",
        info: "linear-gradient(135deg, #4dabf7, #1c7ed6)"
    };
    
    alert.style.background = colors[type] || colors.info;
    
    // Tombol close
    const closeBtn = alert.querySelector(".close-alert");
    closeBtn.style.cssText = `
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: 15px;
        padding: 0;
        font-size: 1.2rem;
    `;
    
    closeBtn.onclick = () => alert.remove();
    
    document.body.appendChild(alert);
    
    // Auto remove setelah 3 detik
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.opacity = "0";
            alert.style.transform = "translateX(100%)";
            setTimeout(() => {
                if (alert.parentNode) alert.remove();
            }, 300);
        }
    }, 3000);
}

// =======================
// INITIALIZATION
// =======================
document.addEventListener("DOMContentLoaded", function() {
    // Fokus ke input pertama
    itemInput.focus();
    
    // Tampilkan welcome message
    setTimeout(() => {
        showAlert("Selamat datang! Silakan coba semua fitur interaktif.", "success");
    }, 1000);
    
    // Tambahkan style untuk alert
    const style = document.createElement("style");
    style.textContent = `
        .custom-alert {
            transition: opacity 0.3s ease, transform 0.3s ease !important;
        }
    `;
    document.head.appendChild(style);
});