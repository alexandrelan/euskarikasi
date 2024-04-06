const { 
  sortuSuhaitza
} = window.euskarikasi;

if (typeof sortuSuhaitza("test") !== "object") console.error();
if (sortuSuhaitza("test").emanAdarrak().length !== 1) console.error();
