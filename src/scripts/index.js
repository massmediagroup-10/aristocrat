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

    $('.detail-slider-main').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.detail-slider-nav'
    });
    $('.detail-slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.detail-slider-main',
        focusOnSelect: true,
        arrows: false,
        vertical: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 6,
                vertical: false
            }
        }, {
            breakpoint: 780,
            settings: {
                slidesToShow: 4,
                vertical: false
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                vertical: false
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                vertical: false
            }
        }]
    });
}

function initSlider() {
    $('.preview-slider').slick({
        dots: false,
        infinite: true,
        speed: 1000,
        fade: true
    });
}

function scrollHandler(initHeaderHeight) {
    var contentPadding = $('.content').outerHeight() - $('.content').height();
    var ofcontent = $('.header-line').offset().top - initHeaderHeight + contentPadding;
    var srollTop = $(document).scrollTop();

    console.log(ofcontent);

    if ((srollTop) > ofcontent) {
        $('.header').addClass('fixed');
    } else {
        $('.header').removeClass('fixed');
    }
}

function initSubmenu() {
    $('.navigation .menu li').each(function() {
        if ($(this).find('.submenu').length) {
            $(this).addClass('has-submenu');
        }
    });

    var submenuHeight = $('.submenu').height();
    var previewTop = ($('.preview').length) ? $('.preview').offset().top : 0;
    var contentTop = $('.content').offset().top;

    $('.navigation li.has-submenu .submenu').stop().slideUp();

    $('.navigation li.has-submenu>a').click(function() {
        if ($(this).find('.submenu').hasClass('active')) {
            var that = $(this);
            that.find('.submenu').stop().slideUp(function() {
                that.find('.submenu').stop().removeClass('active');
            });
            $('.preview').stop().animate({
                'top': previewTop + 0
            });
            $('.content').stop().animate({
                'margin-top': contentTop + 0
            });
        } else {
            $(this).find('.submenu').stop().addClass('active');
            $(this).find('.submenu').stop().slideDown();
            $('.preview').stop().animate({
                'top': previewTop + submenuHeight
            });
            $('.content').stop().animate({
                'margin-top': contentTop + submenuHeight
            });

        }
    });
}

function tabs(block) {
    if (typeof(block) === 'undefined') block = $('.tabs');
    block.each(function() {
        var $wrap = $(this);
        if (!$wrap.is('.tabs-done')) {
            $wrap.addClass('tabs-done');
            $('[data-tabId]', $wrap).click(function(event) {
                event.preventDefault();
                var tabid = $(this).data('tabid');
                console.log(tabid);
                $('[data-tabId]', $wrap).removeClass('active');
                $('[data-tabId="' + tabid + '"]', $wrap).addClass('active');
                $('[data-tab]', $wrap).removeClass('active').addClass('hidden');
                $('[data-tab="' + tabid + '"]', $wrap).addClass('active').removeClass('hidden');
            })
            if ($('.active[data-tabId]', $wrap).length > 0)
                $('.active[data-tabId]', $wrap).click();
            else
                $('[data-tabId]:eq(0)', $wrap).click();
        }
    })
}

function foundation() {
    $(document).foundation({
        tab: {
            callback: function(tab) {
                console.log(tab);
            }
        }
    });
}

function sideMenu() {
    $('.side-menu>li>a').siblings('ul').slideUp(0);
    $(document).on('click', '.side-menu>li>a', function() {
        if ($(this).siblings('ul').length) {
            $(this).toggleClass('active');
            $(this).siblings('ul').slideToggle();
        }
    });
}

function productRate() {
    $(document).on('click', '.product-rate', function() {
        $(this).toggleClass('active');
    });
}

$(document).ready(function() {
    initCarousel();
    initSubmenu();
    initSlider();
    tabs();
    sideMenu();
    productRate();

    var initHeaderHeight = $('.header').height();
    $(window).on('scroll', function() {
        scrollHandler(initHeaderHeight);
    });
});