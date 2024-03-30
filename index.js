console.info("running");

function parseEsaldia(esaldia) {
  return esaldia
    .trim()
    .split(" ")
    .map((testua) => ({ testua }));
}

const ADITZ_MOTAK = [
  ["nor"],
  ["nor", "nori"],
  ["nor", "nork"],
  ["nor", "nori", "nork"]
];
const OSAGARRIAK = [
  "non",
  "nongo",
  "nongoa",
  "nondik",
  "nora",
  "norantz",
  "noraino",
  //
  "noiz",
  "noiztik",
  "noiz arte",
  //
  "noren",
  "norengandik",
  "norengan",
  "norengana",
  "norentzat",
  //
  "zertarako",
  "zergatik",
  //
  "nola",
  "nolakoa"
];

const STEPS = {
  ESALDIA: "esaldia",
  ADITZA: "aditza",
  NOR: "nor",
  NORI: "nori",
  NORK: "nork",
  OSAGARRIAK: "osagarriak",
  BUKATUA: "bukatua"
};
function isFuntzioaOsatua(argudioa) {
  return state.hitzak.some(({ funtzioa }) => funtzioa === argudioa);
}
function getStep() {
  if (!state.esaldia) return STEPS.ESALDIA;
  if (!isFuntzioaOsatua("aditza")) return STEPS.ADITZA;
  const requiredArgumendioak = ADITZ_MOTAK[state.aditzMota];
  const hurrengoArgumendioa = requiredArgumendioak.find(
    (argumendioa) => !isFuntzioaOsatua(argumendioa)
  );
  if (hurrengoArgumendioa !== undefined) {
    return STEPS[hurrengoArgumendioa.toUpperCase()];
  } else if (state.hitzak.some(({ funtzioa }) => funtzioa === undefined)) {
    return STEPS.OSAGARRIAK;
  } else {
    return STEPS.BUKATUA;
  }
}

init();
refresh();

function init() {
  state = {
    esaldia: null,
    hitzak: [],
    selectedHitzak: []
  };
  initAditzBarra();
  initOsagarriak();
}

function initAditzBarra() {
  const labels = ADITZ_MOTAK.map((argumendioak) => {
    return argumendioak.join("-").toUpperCase();
  });
  const buttons = labels.map((label, index) => {
    const button = document.createElement("button");
    button.innerText = label;
    button.addEventListener("click", () => setAditzMota(index));
    return button;
  });
  buttons.forEach((button) =>
    document.getElementById("ekintzak-aditza").appendChild(button)
  );
}
function setFuntzioa(hitza, funtzioa) {
  hitza.funtzioa = funtzioa;
}

function isAukeratua(hitza) {
  return hitza.aukeratua === true;
}
function initOsagarriak() {
  const buttons = OSAGARRIAK.map((label) => {
    const button = document.createElement("button");
    button.innerText = label;
    button.addEventListener("click", () => baieztatuFuntzioa(label));
    return button;
  });
  const parent = document.getElementById("ekintzak-osagarriak");
  buttons.forEach((button) => parent.appendChild(button));
}

// actions
function selectHitza(hitza) {
  hitza.aukeratua = true;
  refresh();
}
function unselectHitza(hitza) {
  hitza.aukeratua = false;
  refresh();
}
function toggleHitza(hitza) {
  if (hitza.funtzioa) return;
  if (isAukeratua(hitza)) {
    unselectHitza(hitza);
  } else {
    selectHitza(hitza);
  }
}
function baieztatuFuntzioa(funtzioa) {
  state.hitzak.filter(isAukeratua).forEach((hitza) => {
    setFuntzioa(hitza, funtzioa);
    unselectHitza(hitza);
  });
  refresh();
}
function setAditzMota(mota) {
  state.aditzMota = mota;
  baieztatuFuntzioa("aditza");
}

//

refresh();

function getMultzo(hitza) {
  return {
    funtzioa: hitza.funtzioa,
    aukeratua: hitza.aukeratua,
    hitzak: [hitza]
  };
}

function getMultzoak() {
  return (
    state.hitzak &&
    state.hitzak.reduce((multzoak, hitza) => {
      if (multzoak.length === 0) {
        multzoak.push(getMultzo(hitza));
      } else {
        const azkena = multzoak.pop();
        if (
          (azkena.funtzioa && hitza.funtzioa === azkena.funtzioa) ||
          (hitza.aukeratua === true && azkena.aukeratua === true)
        ) {
          azkena.hitzak.push(hitza);
          multzoak.push(azkena);
        } else {
          multzoak.push(azkena);
          multzoak.push(getMultzo(hitza));
        }
      }
      return multzoak;
    }, [])
  );
}
function areAuzoak(hitzaA, hitzaB) {
  const indexA = state.hitzak.indexOf(hitzaA);
  const indexB = state.hitzak.indexOf(hitzaB);
  const diff = indexA - indexB;
  return diff === 1 || diff === -1;
}
function onHitzDown(hitza) {
  if (!isAukeratua(hitza)) {
    state.selectionAction = "selecting";
  } else {
    state.selectionAction = "unselecting";
  }
  state.selectingHitzak = [hitza];
}
function onHitzMove(hitza) {
  if (!state.selectionAction) return;
  if (state.selectingHitzak.indexOf(hitza) >= 0) return;
  if (
    state.selectingHitzak.some((besteHitza) => areAuzoak(hitza, besteHitza))
  ) {
    state.selectingHitzak.push(hitza);
  }
}
function onPointerUp() {
  if (state.selectionAction === "selecting") {
    state.selectingHitzak.forEach(selectHitza);
  } else if (state.selectionAction === "unselecting") {
    state.selectingHitzak.forEach(unselectHitza);
  }
  state.selectionAction = null;
}
document.addEventListener("pointerup", onPointerUp);
function getHitzaElement(hitza) {
  const element = document.createElement("span");
  element.classList.add("Hitz");
  element.innerText = hitza.testua;
  //element.addEventListener("click", () => toggleHitza(hitza));
  element.addEventListener("pointerdown", () => onHitzDown(hitza));
  element.addEventListener("mousemove", () => onHitzMove(hitza));
  return element;
}

function baieztatuEsaldia() {
  state.esaldia = document.getElementById("input").value;
  state.hitzak = parseEsaldia(state.esaldia);
  state.hitzak.forEach((hitza) => (hitza.element = getHitzaElement(hitza)));
  refresh();
}

function getMultzoarenElement(multzo) {
  const elm = document.createElement("span");
  elm.classList.add("Multzo");
  if (multzo.aukeratua) {
    elm.classList.add("Multzo--selected");
  } else if (multzo.funtzioa) {
    elm.classList.add("Multzo--hasFuntzioa", `Multzo--${multzo.funtzioa}`);
    if (["aditza", "nor", "nori", "nork"].indexOf(multzo.funtzioa) === -1) {
      elm.classList.add("Multzo--osagarria");
    }
    const label = document.createElement("span");
    label.classList.add("Multzo-label");
    label.innerText = `(${multzo.funtzioa})`;
    elm.appendChild(label);
  }
  const hitzakElements = multzo.hitzak.map(({ element }) => element);
  hitzakElements.forEach((hitzaElement, index) => {
    elm.append(hitzaElement);
    if (index < multzo.hitzak.length - 1) {
      elm.append(" ");
    }
  });
  return elm;
}
function refreshEsaldia() {
  if (!state.esaldia) return;
  const multzoak = getMultzoak();
  const multzoakElements = multzoak.map(getMultzoarenElement);
  const esaldiElm = document.getElementById("hautaGailua");
  esaldiElm.innerHTML = "";
  multzoakElements.forEach((multzoElement, index) => {
    esaldiElm.appendChild(multzoElement);
    if (index < multzoak.length - 1) {
      esaldiElm.append(" ");
    }
  });
}
function refreshAgintera() {
  for (const child of document.getElementById("argibideak").children) {
    child.style.display = "none";
  }
  document.getElementById(`argibideak-${getStep()}`).style.display = "";
}
function refreshEkintzenBarra() {
  for (const child of document.getElementById("ekintzak").children) {
    child.style.display = "none";
  }
  document.getElementById(`ekintzak-${getStep()}`).style.display = "";
}
function refreshMainSection() {
  const esaldiSartzeko = getStep() === STEPS.ESALDIA;
  document.getElementById("inputContainer").style.display = esaldiSartzeko
    ? ""
    : "none";
  document.getElementById("hautaGailua").style.display = esaldiSartzeko
    ? "none"
    : "";
}
function refresh() {
  refreshEsaldia();
  refreshAgintera();
  refreshEkintzenBarra();
  refreshMainSection();
}