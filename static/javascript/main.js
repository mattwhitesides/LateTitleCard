(function() {
  var backgroundResize, fullscreenFix, parallaxPosition, printJson;

  printJson = function(data) {
    var movies;
    movies = data.movies;
    $.each(movies.slice(0, 5), function(index, movie) {
      $("#jsonHolder tbody").append("<tr class='child'><td><img src=\"" + movie.posters.thumbnail + "\" /></td>" + "<td><h4>" + movie.title + "</h4></td><td>" + movie.release_dates.theater + "</td></tr>");
      console.log("iteration: " + index);
    });
  };

  $(document).ready(function() {
    $.ajax({
      url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?apikey=k5xhfmsbbapb8pjj5bpfwvh4",
      dataType: "jsonp",
      success: printJson
    });
  });

  fullscreenFix = function() {
    var h;
    h = $("body").height();
    $(".content-b").each(function(i) {
      if ($(this).innerHeight() <= h) {
        $(this).closest(".fullscreen").addClass("not-overflow");
      }
    });
  };

  backgroundResize = function() {
    var windowH;
    windowH = $(window).height();
    $(".background").each(function(i) {
      var contH, contW, diff, imgH, imgW, maxH, path, ratio, remainingH;
      path = $(this);
      contW = path.width();
      contH = path.height();
      imgW = path.attr("data-img-width");
      imgH = path.attr("data-img-height");
      ratio = imgW / imgH;
      diff = parseFloat(path.attr("data-diff"));
      diff = (diff ? diff : 0);
      remainingH = 0;
      if (path.hasClass("parallax") && !$("html").hasClass("touch")) {
        maxH = (contH > windowH ? contH : windowH);
        remainingH = windowH - contH;
      }
      imgH = contH + remainingH + diff;
      imgW = imgH * ratio;
      if (contW > imgW) {
        imgW = contW;
        imgH = imgW / ratio;
      }
      path.data("resized-imgW", imgW);
      path.data("resized-imgH", imgH);
      path.css("background-size", imgW + "px " + imgH + "px");
    });
  };

  parallaxPosition = function(e) {
    var bottomWindow, currentWindow, heightWindow, topWindow;
    heightWindow = $(window).height();
    topWindow = $(window).scrollTop();
    bottomWindow = topWindow + heightWindow;
    currentWindow = (topWindow + bottomWindow) / 2;
    $(".parallax").each(function(i) {
      var bottom, height, imgH, imgW, max, min, orizontalPosition, overflowH, path, top, value;
      path = $(this);
      height = path.height();
      top = path.offset().top;
      bottom = top + height;
      if (bottomWindow > top && topWindow < bottom) {
        imgW = path.data("resized-imgW");
        imgH = path.data("resized-imgH");
        min = 0;
        max = -imgH + heightWindow;
        overflowH = (height < heightWindow ? imgH - height : imgH - heightWindow);
        top = top - overflowH;
        bottom = bottom + overflowH;
        value = min + (max - min) * (currentWindow - top) / (bottom - top);
        orizontalPosition = path.attr("data-oriz-pos");
        orizontalPosition = (orizontalPosition ? orizontalPosition : "50%");
        $(this).css("background-position", orizontalPosition + " " + value + "px");
      }
    });
  };

  if ("ontouchstart" in window) {
    document.documentElement.className = document.documentElement.className + " touch";
  }

  if (!$("html").hasClass("touch")) {
    $(".parallax").css("background-attachment", "fixed");
  }

  $(window).resize(fullscreenFix);

  fullscreenFix();

  $(window).resize(backgroundResize);

  $(window).focus(backgroundResize);

  backgroundResize();

  if (!$("html").hasClass("touch")) {
    $(window).resize(parallaxPosition);
    $(window).scroll(parallaxPosition);
    parallaxPosition();
  }

}).call(this);
