// ---------------- DOM ----------------
const dropzone = document.getElementById("dropzone");
const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const previewWrapper = document.getElementById("previewWrapper");
const previewImg = document.getElementById("previewImg");
const removeBtn = document.getElementById("removeBtn");
const analyzeBtn = document.getElementById("analyzeBtn");
const loader = document.getElementById("loader");
const resultsCard = document.getElementById("resultsCard");
const errorBanner = document.getElementById("errorBanner");
const errorMsg = document.getElementById("errorMsg");

// 🔑 THIS WAS MISSING
const dropzoneDefault = document.getElementById("dropzoneDefault");

let selectedFile = null;

// ---------------- FILE PICKER ----------------
uploadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fileInput.click();
});

// ---------------- FILE SELECT ----------------
fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    handleFile(fileInput.files[0]);
  }
});

// ---------------- DRAG & DROP ----------------
dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzone.classList.add("drag-over");
});

dropzone.addEventListener("dragleave", () => {
  dropzone.classList.remove("drag-over");
});

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzone.classList.remove("drag-over");

  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    handleFile(file);
  } else {
    showError("Please upload a valid image.");
  }
});

// ---------------- HANDLE FILE ----------------
function handleFile(file) {
  selectedFile = file;

  const reader = new FileReader();
  reader.onload = () => {
    previewImg.src = reader.result;

    // 🔥 FIX: hide upload UI, show preview UI
    dropzoneDefault.style.display = "none";
    previewWrapper.style.display = "block";
  };

  reader.readAsDataURL(file);
  analyzeBtn.disabled = false;
  hideError();
}

// ---------------- REMOVE IMAGE ----------------
removeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  resetAll();
});

function resetAll() {
  selectedFile = null;

  previewWrapper.style.display = "none";
  dropzoneDefault.style.display = "block";

  previewImg.src = "";
  fileInput.value = "";
  analyzeBtn.disabled = true;
  resultsCard.style.display = "none";
  hideError();
}

// ---------------- ANALYZE ----------------
analyzeBtn.addEventListener("click", async () => {
  if (!selectedFile) return;

  loader.style.display = "flex";
  analyzeBtn.style.display = "none";
  resultsCard.style.display = "none";

  try {
    const formData = new FormData();
    formData.append("image", selectedFile);

    const res = await fetch("/predict", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    if (!data.success) throw new Error("Prediction failed");

    showResults(data);
  } catch (err) {
    showError(err.message);
  } finally {
    loader.style.display = "none";
    analyzeBtn.style.display = "block";
  }
});

// ---------------- DISPLAY RESULTS ----------------
function showResults(data) {
  document.getElementById("resultFoodName").textContent = data.food_name;
  document.getElementById("resultConfidence").textContent =
    `Confidence: ${data.confidence}%`;

  document.getElementById("valCalories").textContent = data.nutrition.calories;
  document.getElementById("valProtein").textContent = data.nutrition.protein_g;
  document.getElementById("valFat").textContent = data.nutrition.fat_g;
  document.getElementById("valCarbs").textContent = data.nutrition.carbs_g;
  document.getElementById("valFiber").textContent = data.nutrition.fiber_g;

  const list = document.getElementById("otherPredictions");
  list.innerHTML = "";

  data.top_predictions.slice(1).forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${p.food}</span><span>${p.confidence}%</span>`;
    list.appendChild(li);
  });

  resultsCard.style.display = "block";
  resultsCard.scrollIntoView({ behavior: "smooth" });
}

// ---------------- ERROR ----------------
function showError(msg) {
  errorMsg.textContent = msg;
  errorBanner.style.display = "flex";
}

function hideError() {
  errorBanner.style.display = "none";
}

// ---------------- TRY AGAIN ----------------
document.getElementById("tryAgainBtn").addEventListener("click", () => {
  resetAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
});