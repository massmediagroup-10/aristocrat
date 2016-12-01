'use strict';

function initCarousel() {
    $('.product-list').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
}

function scrollHandler(initHeaderHeight) {
    var contentPadding = $('.content').outerHeight() - $('.content').height();
    var ofcontent = $('.header-line').offset().top - initHeaderHeight + contentPadding;
    var srollTop = $(document).scrollTop();
    if ((srollTop) > ofcontent) {
        $('.header ').addClass('fixed');
        $('.navigation .menu li.has-submenu .submenu').removeClass('active');
    } else {
        $('.header ').removeClass('fixed');
    }
}

function initSubmenu() {
    $('.navigation .menu li').each(function() {
        if ($(this).find('.submenu').length) {
            $(this).addClass('has-submenu');
        }
    });

    var submenuHeight = $('.submenu').height();
    var previewTop = $('.preview-slider').offset().top;
    var contentTop = $('.content').offset().top;

    $('.navigation .menu li.has-submenu>a').stop().hover(function() {
        $(this).find('.submenu').stop().addClass('active');
        $('.preview-slider').stop().animate({
            'top': previewTop + submenuHeight
        });
        $('.content').stop().animate({
            'margin-top': contentTop + submenuHeight
        });
    }, function() {
        $(this).find('.submenu').stop().removeClass('active');
        $('.preview-slider').stop().animate({
            'top': previewTop + 0
        });
        $('.content').stop().animate({
            'margin-top': contentTop + 0
        });
    });


}

$(document).ready(function() {
    initCarousel();
    initSubmenu();

    var initHeaderHeight = $('.header').height();
    $(window).on('scroll', function() {
        scrollHandler(initHeaderHeight);
    });
});