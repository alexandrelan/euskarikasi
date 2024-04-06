const { 
  sortuSuhaitza
} = window.euskarikasi;

if (typeof sortuSuhaitza("test") !== "object") console.error();
if (sortuSuhaitza("adio").emanAdarrak().length !== 1) console.error();
if (sortuSuhaitza("ni naiz").emanAdarrak().length !== 2) console.error();

document.body.innerHTML = "😍";
