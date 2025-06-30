const input = document.getElementById("markdown-input");
const preview = document.getElementById("preview");

const themeToggle = document.getElementById("theme-toggle");
const root = document.body;

function setTheme(isDark) {
  if (isDark) {
    root.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    root.classList.remove("dark");
    themeToggle.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
}

themeToggle.addEventListener("click", () => {
  const isDark = !root.classList.contains("dark");
  setTheme(isDark);
});

// On load
setTheme(localStorage.getItem("theme") === "dark");

// Configure marked (optional: sanitize HTML)
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: false,
  mangle: false,
  sanitize: false, // marked v5+ removed built-in sanitizer
});

// Render initial markdown
updatePreview(input.value);

// Listen for typing in textarea
input.addEventListener("input", () => {
  updatePreview(input.value);
});

function updatePreview(markdown) {
  // Sanitize output using DOMPurify if needed
  preview.innerHTML = marked.parse(markdown);
}

document.getElementById("copy-html").addEventListener("click", () => {
  const html = preview.innerHTML;
  navigator.clipboard
    .writeText(html)
    .then(() => {
      alert("HTML copied to clipboard!");
    })
    .catch(() => {
      alert("Failed to copy HTML.");
    });
});

document.getElementById("download-html").addEventListener("click", () => {
  const blob = new Blob([preview.innerHTML], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "markdown-preview.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

const fileInput = document.getElementById("file-upload");

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    input.value = e.target.result;
    updatePreview(input.value);
  };

  reader.onerror = function () {
    alert("Error reading file.");
  };

  reader.readAsText(file);
});
