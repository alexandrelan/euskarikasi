(() => {
  function zatitu(esaldia) {
    return esaldia.trim().split(" ");
  }
  
  function sortuSuhaitza(esaldia) {
    const adarrak = zatitu(esaldia);
    function emanAdarrak() {
      return adarrak;
    }
    return {
      emanAdarrak
    };
  }
  
  function adieraziBerAdarreanDira(suhaitza, adabegia, besteadabegia) {
  
  }
  
  window.euskarikasi = {
    sortuSuhaitza
  };  
})();
