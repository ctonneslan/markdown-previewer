const input = document.getElementById("markdown-input");
const preview = document.getElementById("preview");

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
