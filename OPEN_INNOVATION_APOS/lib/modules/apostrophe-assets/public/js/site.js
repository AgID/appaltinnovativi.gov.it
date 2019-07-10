$(function () {
  // if (!sessionStorage.getItem('dimissAlertContent'))
  //   appendAlertContent();

  $("div").on('click', '#dimissAlertContent', function () {
    sessionStorage.setItem('dimissAlertContent', true)
  })

  if (!sessionStorage.getItem('dimissCookieBar'))
    appendCookiebar()

  $("div").on('click', '#btnCookieBar', function () {
    $(".cookiebar").hide()
    sessionStorage.setItem('dimissCookieBar', true)
  })


  $(document).on('click', '#anhorSection1', function () {
    var element = $("#section1")[0];
    if (element)
      element.scrollIntoView({
        behavior: 'smooth'
      })
  })
  $(document).on('click', '#anhorSection2', function () {
    var element = $("#section2")[0];
    if (element)
      element.scrollIntoView({
        behavior: 'smooth'
      })
  })

  if ($("#linkSocial").length) {
    popolateHrefForShare(this)
  }

});

function btnCookieBar() {
  // $(".cookiebar").hide()
  $(".cookiebar").attr('style','display:none !important');
  sessionStorage.setItem('dimissCookieBar', true)
}

function popolateHrefForShare(elm) {
  popolateFacebook($(elm).find("#facebook"))
  popolateTwitter($(elm).find("#twitter"))
  popolateLinkedin($(elm).find("#linkedin"))
}
// text=Simple%20Share%20Buttons
function popolateFacebook(elm) {
  var hrefElm = $(elm).attr('href')
  var newHref = hrefElm + window.location.href
  $(elm).attr('href', newHref)
}

function popolateTwitter(elm) {
  var hrefElm = $(elm).attr('href')
  var newHref = hrefElm + window.location.href + '&text=' + $("#title").html()
  $(elm).attr('href', newHref)
}

function popolateLinkedin(elm) {
  var hrefElm = $(elm).attr('href')
  var newHref = hrefElm + window.location.href + '&summary=' + $("#title").html() + '&title=' + $("#title").html()
  $(elm).attr('href', newHref)
}

function appendAlertContent() {
  var html = '<div id="alertContent" class="alert alert-warning-home alert-dismissible fade show" role="alert">' +
    'I contenuti del presente sito hanno carattere informativo. La pubblicazione delle informazioni ufficiali è nella responsabilità della stazione appaltante.' +
    '<button id="dimissAlertContent" type="button" class="close" data-dismiss="alert" aria-label="Close">' +
    '<span aria-hidden="true">×</span></button></div>'
  $("#containerAlertContent").append(html)
}

function appendCookiebar() {
  var link = $("#textLinkPrivacy").html()
  var html = '<div class="cookiebar hide">' +
    '<p class="text-white pr-5 mb-0">Questo sito utilizza cookie tecnici, analytics e di terze parti.' +
    '<br>Proseguendo nella navigazione accetti l’utilizzo dei cookie.<br></p>' +
    '<div class="cookiebar-buttons">' +
    '<a href="' + link + '" class="cookiebar-btn">Privacy<span class="sr-only">cookies</span></a>' +
    '<a href="javascript:btnCookieBar()" class="cookiebar-btn cookiebar-confirm">Accetto<span class="sr-only"> i cookies</span></a></div></div>'
  $("#containerCookiebar").append(html)
}

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ?
    "&" :
    "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  } else {
    return uri + separator + key + "=" + value;
  }
}

function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ?
        true :
        sParameterName[1];
    }
  }
};

function removeURLParameter(url, parameter) {
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split('?');
  if (urlparts.length >= 2) {

    var prefix = encodeURIComponent(parameter) + '=';
    var pars = urlparts[1].split(/[&;]/g);

    //reverse iteration as may be destructive
    for (var i = pars.length; i-- > 0;) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    url = urlparts[0] + (
      pars.length > 0 ?
      '?' + pars.join('&') :
      "");
    return url;
  } else {
    return url;
  }
}