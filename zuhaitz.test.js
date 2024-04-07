const { 
  sortuSuhaitza
} = window.euskarikasi;

function error() {
  window.euskarikasiError = true;
}

if (typeof sortuSuhaitza("test") !== "object") error();
if (sortuSuhaitza("adio").adarrak().length !== 1) error();
if (sortuSuhaitza("ni naiz").adarrak().length !== 2) error();
if ((() => {
  const suhaitza = sortuSuhaitza("ni etxe horretara noa");
  suhaitza.elkartu(suhaitza.adarra(1), suhaitza.adarra(2));
  return suhaitza.adarra(1).adarrak().length === 2;
})() === false) error();

document.addEventListener("DOMContentLoaded", () => {
  if (!window.euskarikasiError) document.body.innerHTML = "😍";
});
