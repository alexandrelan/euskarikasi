function zatitu(esaldia) {
  return esaldia.trim().split(" ");
}

function sortuSuhaitza(esaldia) {
    const suhaitza = {};
    suhaitza.children = zatitu(esaldia);
    return suhaitza;
}

function adieraziBerAdarreanDira(suhaitza, adabegia, besteadabegia) {

}

export {
    sortuSuhaitza
};
