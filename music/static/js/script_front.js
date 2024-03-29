$(function() {
    "use strict";
    if ($('.header-slider').length) {
        $('.header-slider').on('init', function(event, slick) {
            $(this).css('height', 'auto');
        });
        $('.header-slider').slick({
            infinite: true,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            dots: true
        });
        $('.header-slider').slick('refresh');
    }
    if ($('.testimonial-slider').length) {
        $('.testimonial-slider').on('init', function(event, slick) {
            $(this).css('height', 'auto');
        });
        $('.testimonial-slider').slick({
            cssEase: 'linear',
            autoplay: true,
            dots: true
        });
    }
    if ($('.slider').length) {
        $(".slider").flexslider({
            selector: ".tabs > .tab",
            controlNav: true,
            directionNav: true,
            start: function() {
                $('.slider .tabs').css('height', 'auto');
            }
        });
    }
    $('#page-loader').on('click', function() {
        $(this).fadeOut();
        $("body").removeClass("preload");
    });
    setTimeout(function() {
        $('#page-loader').fadeOut();
        $("body").removeClass("preload");
    }, 10000);
    $('.toggle-menu').addClass('menu-open');
    $('.toggle-menu > li').addClass('animated');
    $('.menu-trigger a').on('click', function(e) {
        e.preventDefault();
        var container = $('.toggle-menu');
        var elements = container.children('li');
        elements.each(function() {
            var index = $(this).index();
            var reversedIndex = (elements.length - elements.index(this)) + 1;
            var delay = index * 0.08 / 2;
            var reverseDelay = reversedIndex * 0.08 / 2;
            if (container.hasClass('menu-open')) {
                $(this).css("-webkit-transition-delay", delay + 's').css("-o-transition-delay", delay + 's').css("transition-delay", delay + 's').removeClass('animated');
            } else {
                $(this).css("-webkit-transition-delay", reverseDelay + 's').css("-o-transition-delay", reverseDelay + 's').css("transition-delay", reverseDelay + 's').addClass('animated');
            }
        });
        container.toggleClass('menu-open');
    });
    var query = Modernizr.mq('(min-width: 900px)');
    if (query) {
        if ($('.has-parallax').length && jQuery().parallax) {
            $('.has-parallax').parallax({
                speed: 0.30
            });
        }
    }
    if ($('.particle').length) {
        var rellax = new Rellax('.particle', {
            center: true
        });
    }
    if ($('.atvImg').length && $.isFunction(atvImg)) {
        atvImg();
    }
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $('.js-on-scroll').addClass('menu-is-scrolling');
        } else {
            $('.js-on-scroll').removeClass('menu-is-scrolling');
        }
    });
    $(window).scroll(function() {
        if ($(window).scrollTop() > 1000) {
            $('.back_to_top').fadeIn('slow');
        } else {
            $('.back_to_top').fadeOut('slow');
        }
    });
    $('.navbar-nav a[href*="#"], .back_to_top').on('click', function(e) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 50
        }, 1000);
        e.preventDefault();
    });
    $('.team-slider').each(function() {
        $(this).magnificPopup({
            delegate: 'a',
            removalDelay: 500,
            fixedContentPos: false,
            gallery: {
                enabled: false
            },
            callbacks: {
                beforeOpen: function() {
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            }
        });
    });
    if ($('.team-slick').length) {
        $('.team-slick').on('init', function(event, slick) {
            $(this).css('height', 'auto');
        });
        $('.team-slick').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 768,
                settings: {
                    dots: false,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
    }
    if ($('.image-link').length) {
        $('.image-link').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }
    if ($('.mfp-youtube').length) {
        $('.mfp-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 0,
            preloader: false,
            fixedContentPos: false,
        });
    }
    if ($('.twitter-feed').length) {
        $('.twitter-feed').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    arrows: false,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    dots: true,
                    arrows: false,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    dots: true,
                    slidesToScroll: 1
                }
            }]
        });
    }
    if (!Modernizr.objectfit) {
        $('.object-fit-container', '.img-wrap-right').each(function() {
            var $container = $(this),
                imgUrl = $container.find('img').prop('src');
            if (imgUrl) {
                $container.css('backgroundImage', 'url(' + imgUrl + ')').addClass('compat-object-fit');
            }
        });
    }
    var get_date = $('#countdown').data('event-date');
    if (get_date) {
        $("#countdown").countdown({
            date: get_date,
            format: "on"
        });
    }
});
$(window).load(function() {
    $('#page-loader').fadeOut();
    $("body").removeClass("preload");
});
if (window.google) {
    google.maps.event.addDomListener(window, 'load', init);
}

function init() {
    var latitude = '40.6700';
    var longitude = '-73.9400';
    var mapOptions = {
        zoom: 11,
        scrollwheel: false,
        center: new google.maps.LatLng(latitude, longitude),
        styles: [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e9e9e9"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 29
            }, {
                "weight": 0.2
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 18
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
            }, {
                "lightness": 21
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dedede"
            }, {
                "lightness": 21
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#ffffff"
            }, {
                "lightness": 16
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
            }, {
                "color": "#333333"
            }, {
                "lightness": 40
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f2f2f2"
            }, {
                "lightness": 19
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#fefefe"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#fefefe"
            }, {
                "lightness": 17
            }, {
                "weight": 1.2
            }]
        }]
    };
    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        title: 'We are here!'
    });
}
window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];
    t.ready = function(f) {
        t._e.push(f);
    };
    return t;
}(document, "script", "twitter-wjs"));