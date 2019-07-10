$(function () {
  loadCategorie();
  //loadStati();
  loadTipologieProcedura();
  $('body').on('click', '#loadMore', function () {
    apos.ui.globalLock();
  })
  $("#applicaFiltri").click(function () {
    applicaFiltri();
  })
  $("#azzeraFiltri").click(function () {
    document.location.href = document.location.origin + document.location.pathname
  })

  apos.on('ajax', function (e) {
    apos.ui.globalUnlock();
  })
})

$(window).load(function () {
  //controllo qui i filtri sono gia stati caricati
  //i dati per la creazione delle checkbox
  //senza inserire una chiamata sincrona
  checkFilters()
})

function loadStati() {
  $.ajaxSetup({
    async: false
  });
  $.get("/api/v1/statoApertura", function (data) {
    var arrStati = data.results;
    _.each(arrStati, function (v, i) {
      var html = '<div><div class="text-left form-check">' +
        '<input name="checkboxStati" to="' + v._id + '" id="' + v._id + '" type="checkbox">' +
        '<label for="' + v._id + '">' + v.title + '</label></div></div>';
      $("#stati").append(html);
    })
  })
  $.ajaxSetup({
    async: true
  });
}

function loadTipologieProcedura() {
  $.ajaxSetup({
    async: false
  });
  $.get("/api/v1/tipologiaProcedura", function (data) {
    var arrTipologiaProcedura = data.results;
    _.each(arrTipologiaProcedura, function (v, i) {
      var html = '<div><div class="text-left form-check">' +
        '<input name="checkboxTipoProcedura" to="' + v._id + '" id="' + v._id + '" type="checkbox">' +
        '<label for="' + v._id + '">' + v.title + '</label></div></div>';
      $("#tipologiaProcedura").append(html);
    })
  })
  $.ajaxSetup({
    async: true
  });
}

function loadCategorie() {
  $.ajaxSetup({
    async: false
  });
  $.get("/api/v1/categoriaAmministrazione", function (data) {
    var arrCategorie = data.results;
    _.each(arrCategorie, function (v, i) {
      var html = '<div><div class="text-left form-check">'
                  +'<input name="checkboxStati" to="'+v._id+'" id="'+v._id+'" type="checkbox">'
                  +'<label for="'+v._id+'">'+v.title+'</label></div></div>';
      $("#categorie").append(html);
    })
  })
  $.ajaxSetup({
    async: true
  });
}

function applicaFiltri() {
  debugger
  var categorieUrl = $("#categorie").find(":checked").length > 0 ? updateQCategorie(document.location.origin + document.location.pathname) : document.location.origin + document.location.pathname;
  var fasiUrl = $("#fasi").find(":checked").length > 0 ? updateQFasi(categorieUrl) : categorieUrl;
  var tipoPrpoceduraUrl = $("#tipologiaProcedura").find(":checked").length > 0 ? updateQTipologiaProcedura(fasiUrl) : fasiUrl;
  var statiUrl = $("#stati").find(":checked").length > 0 ? updateQStati(tipoPrpoceduraUrl) : tipoPrpoceduraUrl;
  document.location.href = statiUrl;
}

function updateQCategorie(url) {
  var arrayChecked = $("#categorie").find(":checked");
  var partialQ = ""
  _.each(arrayChecked, function (v, i) {
    partialQ += $(v).attr("to") + '+';
  })
  var query = partialQ.substring(0, partialQ.length - 1);
  return updateQueryStringParameter(url, "c", query);
}

function updateQFasi(url) {
  var arrayChecked = $("#fasi").find(":checked");
  var partialQ = ""
  _.each(arrayChecked, function (v, i) {
    partialQ += $(v).attr("to") + '+';
  })
  var query = partialQ.substring(0, partialQ.length - 1);
  return updateQueryStringParameter(url, "f", query);
}

function updateQTipologiaProcedura(url) {
  var arrayChecked = $("#tipologiaProcedura").find(":checked");
  var partialQ = ""
  _.each(arrayChecked, function (v, i) {
    partialQ += $(v).attr("to") + '+';
  })
  var query = partialQ.substring(0, partialQ.length - 1);
  return updateQueryStringParameter(url, "t", query);
}

function updateQStati(url) {
  var arrayChecked = $("#stati").find(":checked");
  var partialQ = "";
  _.each(arrayChecked, function (v, i) {
    partialQ += $(v).attr("to") + '+';
  })
  var query = partialQ.substring(0, partialQ.length - 1);
  return updateQueryStringParameter(url, "s", query);
}

function checkFilters() {
  var existC = checkCategorie();
  var existF = checkFasi();
  var existS = checkStati();
  var existT = checkTipoProcedura();
  if (existC || existF || existS || existT)
    $("#accordionFilters").trigger("click")
}

function checkCategorie() {
  var arrayQuery = getArrayQuery("c");
  if (arrayQuery.length > 0) {
    _.each(arrayQuery, function (v, i) {
      $('#categorie :checkbox[to=' + v + ']').prop('checked', true);
    })
    return true
  } else
    return false
}

function checkFasi() {
  var arrayQuery = getArrayQuery("f");
  if (arrayQuery.length > 0) {
    _.each(arrayQuery, function (v, i) {
      $('#fasi :checkbox[to=' + v + ']').prop('checked', true);
    })
    return true
  } else
    return false
}

function checkStati() {
  var arrayQuery = getArrayQuery("s");
  if (arrayQuery.length > 0) {
    _.each(arrayQuery, function (v, i) {
      $('#stati :checkbox[to=' + v + ']').prop('checked', true);
    })
    return true
  } else
    return false
}

function checkTipoProcedura() {
  var arrayQuery = getArrayQuery("t");
  if (arrayQuery.length > 0) {
    _.each(arrayQuery, function (v, i) {
      $('#tipologiaProcedura :checkbox[to=' + v + ']').prop('checked', true);
    })
    return true
  } else
    return false
}

function getArrayQuery(param) {
  var q = getUrlParameter(param)
  if (q)
    return q.split("+")
  else return []
}