const { 
  sortuSuhaitza
} = window.euskarikasi;

function error() {
  window.euskarikasiError = true;
}

if (typeof sortuSuhaitza("test") !== "object") error();
if (sortuSuhaitza("adio").emanAdarrak().length !== 1) error();
if (sortuSuhaitza("ni naiz").emanAdarrak().length !== 2) error();

document.addEventListener("DOMContentLoaded", () => {
  if (!window.euskarikasiError) document.body.innerHTML = "😍";
});
