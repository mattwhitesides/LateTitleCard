(function(){var a,b,c,d,e;d=function(a){var b;b=a.movies,$.each(b.slice(0,5),function(a,b){$("#jsonHolder tbody").append("<tr class='child'><td><img src=\""+b.posters.thumbnail+'" /></td><td><h4>'+b.title+"</h4></td><td>"+b.release_dates.theater+"</td></tr>")})},e=function(a){var b;b=a.movies,$.each(b.slice(0,5),function(a,b){$("#jsonHolder2 tbody").append("<tr class='child'><td><img src=\""+b.posters.thumbnail+'" /></td><td><h4>'+b.title+"</h4></td><td>"+b.release_dates.theater+"</td></tr>"),console.log("iteration: "+a)})},$(document).ready(function(){$.ajax({url:"http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?apikey=k5xhfmsbbapb8pjj5bpfwvh4",dataType:"jsonp",success:d}),$.ajax({url:"http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=k5xhfmsbbapb8pjj5bpfwvh4&limit=3",dataType:"jsonp",success:e})}),b=function(){var a;a=$("body").height(),$(".content-b").each(function(){$(this).innerHeight()<=a&&$(this).closest(".fullscreen").addClass("not-overflow")})},a=function(){var a;a=$(window).height(),$(".background").each(function(){var b,c,d,e,f,g,h,i,j;h=$(this),c=h.width(),b=h.height(),f=h.attr("data-img-width"),e=h.attr("data-img-height"),i=f/e,d=parseFloat(h.attr("data-diff")),d=d?d:0,j=0,h.hasClass("parallax")&&!$("html").hasClass("touch")&&(g=b>a?b:a,j=a-b),e=b+j+d,f=e*i,c>f&&(f=c,e=f/i),h.data("resized-imgW",f),h.data("resized-imgH",e),h.css("background-size",f+"px "+e+"px")})},c=function(){var a,b,c,d;c=$(window).height(),d=$(window).scrollTop(),a=d+c,b=(d+a)/2,$(".parallax").each(function(){var e,f,g,h,i,j,k,l,m,n,o;m=$(this),f=m.height(),n=m.offset().top,e=n+f,a>n&&e>d&&(h=m.data("resized-imgW"),g=m.data("resized-imgH"),j=0,i=-g+c,l=c>f?g-f:g-c,n-=l,e+=l,o=j+(i-j)*(b-n)/(e-n),k=m.attr("data-oriz-pos"),k=k?k:"50%",$(this).css("background-position",k+" "+o+"px"))})},"ontouchstart"in window&&(document.documentElement.className=document.documentElement.className+" touch"),$("html").hasClass("touch")||$(".parallax").css("background-attachment","fixed"),$(window).resize(b),b(),$(window).resize(a),$(window).focus(a),a(),$("html").hasClass("touch")||($(window).resize(c),$(window).scroll(c),c())}).call(this);