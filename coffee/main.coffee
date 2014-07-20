
# send off the query
printJson = (data) ->
  movies = data.movies
  $.each movies.slice(0,5), (index, movie) ->
    $("#jsonHolder tbody").append "<tr class='child'><td><img src=\"" + movie.posters.thumbnail + "\" /></td>" + "<td><h4>" + movie.title + "</h4></td><td>" + movie.release_dates.theater + "</td></tr>" 
    return
  return

printJson2 = (data) ->
  movies = data.movies
  $.each movies.slice(0,5), (index, movie) ->
    $("#jsonHolder2 tbody").append "<tr class='child'><td><img src=\"" + movie.posters.thumbnail + "\" /></td>" + "<td><h4>" + movie.title + "</h4></td><td>" + movie.release_dates.theater + "</td></tr>" 
    return
  return

$(document).ready ->
  $.ajax
    url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?apikey=k5xhfmsbbapb8pjj5bpfwvh4"
    dataType: "jsonp"
    success: printJson
  $.ajax
    url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=k5xhfmsbbapb8pjj5bpfwvh4&limit=3"
    dataType: "jsonp"
    success: printJson2    
  return


# detect touch 

# background fix 

# fix vertical when not overflow
#call fullscreenFix() if .fullscreen content changes 
fullscreenFix = ->
  h = $("body").height()
  # set .fullscreen height
  $(".content-b").each (i) ->
    $(this).closest(".fullscreen").addClass "not-overflow"  if $(this).innerHeight() <= h
    return
  return

# resize background images 
backgroundResize = ->
  windowH = $(window).height()
  $(".background").each (i) ->
    path = $(this)
    
    # variables
    contW = path.width()
    contH = path.height()
    imgW = path.attr("data-img-width")
    imgH = path.attr("data-img-height")
    ratio = imgW / imgH
    
    # overflowing difference
    diff = parseFloat(path.attr("data-diff"))
    diff = (if diff then diff else 0)
    
    # remaining height to have fullscreen image only on parallax
    remainingH = 0
    if path.hasClass("parallax") and not $("html").hasClass("touch")
      maxH = (if contH > windowH then contH else windowH)
      remainingH = windowH - contH
    
    # set img values depending on cont
    imgH = contH + remainingH + diff
    imgW = imgH * ratio
    
    # fix when too large
    if contW > imgW
      imgW = contW
      imgH = imgW / ratio
    
    #
    path.data "resized-imgW", imgW
    path.data "resized-imgH", imgH
    path.css "background-size", imgW + "px " + imgH + "px"
    return

  return

# set parallax background-position 
parallaxPosition = (e) ->
  heightWindow = $(window).height()
  topWindow = $(window).scrollTop()
  bottomWindow = topWindow + heightWindow
  currentWindow = (topWindow + bottomWindow) / 2
  $(".parallax").each (i) ->
    path = $(this)
    height = path.height()
    top = path.offset().top
    bottom = top + height
    
    # only when in range
    if bottomWindow > top and topWindow < bottom
      imgW = path.data("resized-imgW")
      imgH = path.data("resized-imgH")
      
      # min when image touch top of window
      min = 0
      
      # max when image touch bottom of window
      max = -imgH + heightWindow
      
      # overflow changes parallax
      overflowH = (if height < heightWindow then imgH - height else imgH - heightWindow) # fix height on overflow
      top = top - overflowH
      bottom = bottom + overflowH
      
      # value with linear interpolation
      value = min + (max - min) * (currentWindow - top) / (bottom - top)
      
      # set background-position
      orizontalPosition = path.attr("data-oriz-pos")
      orizontalPosition = (if orizontalPosition then orizontalPosition else "50%")
      $(this).css "background-position", orizontalPosition + " " + value + "px"
    return

  return
document.documentElement.className = document.documentElement.className + " touch"  if "ontouchstart" of window
$(".parallax").css "background-attachment", "fixed"  unless $("html").hasClass("touch")
$(window).resize fullscreenFix
fullscreenFix()
$(window).resize backgroundResize
$(window).focus backgroundResize
backgroundResize()
unless $("html").hasClass("touch")
  $(window).resize parallaxPosition
  
  #$(window).focus(parallaxPosition);
  $(window).scroll parallaxPosition
  parallaxPosition()