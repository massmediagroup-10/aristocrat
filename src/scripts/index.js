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
    if ((srollTop) > ofcontent) {
        $('.header').addClass('fixed');
        setInterval(function() {
            fixedResponsive();
        }, 0);
    } else {
        $('.header').removeClass('fixed');
        setInterval(function() {
            fixedResponsive();
        }, 0);
    }

}

function fixedResponsive() {
    //if ($('.innerpage').length == 0) {
    var previewHeight = ($('.preview').length > 0) ? $('.preview').outerHeight() : 0;
    var submenuHeight = ($('.submenu.active').length > 0) ? $('.submenu.active').outerHeight() : 0;
    var headerHeight = $('.header').outerHeight();
    var documentTop = $(document).scrollTop();
    if (documentTop == 0) {
        $('.content').css({
            'margin-top': headerHeight + previewHeight + submenuHeight
        });
        $('.navigation .submenu').css({
            'top': headerHeight
        });
    } else {
        $('.content').css({
            'margin-top': headerHeight + previewHeight
        });
        $('.navigation .submenu').css({
            'top': headerHeight
        });
    }
    // }
}

function initSubmenu() {
    $('.navigation .menu li').each(function() {
        if ($(this).find('.submenu').length) {
            $(this).addClass('has-submenu');
        }
    });

    var previewTop = ($('.preview').length) ? $('.preview').offset().top : 0;
    var submenuHeight = $('.submenu').height();
    var contentTop = $('.content').offset().top;

    $('.navigation li.has-submenu .submenu').stop().slideUp();

    $('.navigation li.has-submenu>a').click(function() {

        var that = $(this);
        var documentTop = $(document).scrollTop();

        if (that.siblings('.submenu').hasClass('active')) {
            $('.navigation li.has-submenu>a').removeClass('active');
            $('.submenu').stop().slideUp(function() {
                $('.submenu').removeClass('active');
            });
            if (documentTop == 0) {
                $('.content').stop().animate({
                    'margin-top': contentTop
                });
                $('.preview').stop().animate({
                    'top': previewTop
                });
            }
        } else {
            $('.navigation li.has-submenu>a').removeClass('active');
            $('.submenu').stop().slideUp(function() {
                $('.submenu').removeClass('active');
                that.addClass('active');
                that.siblings('.submenu').addClass('active');
            });
            if (documentTop == 0) {
                $('.content').stop().animate({
                    'margin-top': contentTop
                });
                $('.preview').stop().animate({
                    'top': previewTop
                }, function() {
                    that.siblings('.submenu').stop().slideDown();
                    $('.preview').stop().animate({
                        'top': previewTop + submenuHeight
                    });
                    $('.content').stop().animate({
                        'margin-top': contentTop + submenuHeight
                    });
                });
            } else {
                that.siblings('.submenu').stop().slideDown();
            }
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
                $('[data-tabId]', $wrap).removeClass('active');
                $('[data-tabId="' + tabid + '"]', $wrap).addClass('active');
                $('[data-tab]', $wrap).removeClass('active').addClass('hidden');
                $('[data-tab="' + tabid + '"]', $wrap).addClass('active').removeClass('hidden');
            });
            if ($('.active[data-tabId]', $wrap).length > 0)
                $('.active[data-tabId]', $wrap).click();
            else
                $('[data-tabId]:eq(0)', $wrap).click();
        }
    })
}

function sideMenu() {
    $('.side-menu>li>a').siblings('ul').slideUp(0);
    $(document).on('click', '.side-menu>li>a', function() {
        if ($(this).siblings('ul').length) {
            $(this).stop().toggleClass('active');
            $(this).siblings('ul').stop().slideToggle();
        }
    });
}

function productRate() {
    $(document).on('click', '.product-rate', function() {
        $(this).stop().toggleClass('active');
    });
}

function checkoutItem() {
    $('.checkout-item').not('.active').find('.checkout-body').slideUp(0);

    $(document).on('click', '.checkout-title a', function() {
        var checkout = $(this).parent();
        var item = $(this).closest('.checkout-item');

        $('.checkout-body').stop().slideUp();
        $('.checkout-item').not(item).stop().removeClass('active');

        if (item.hasClass('active')) {
            item.stop().removeClass('active');
            checkout.siblings('.checkout-body').stop().slideUp();
        } else {
            item.stop().addClass('active');
            checkout.siblings('.checkout-body').stop().slideDown();
        }
    });
}

function detailSizeChange() {
    $(document).on('change', '.detail-size select', function() {
        var select = $(this).val();
        $('.detail-color-row').removeClass('active');
        $('.detail-color-row[data-size="' + select + '"]').addClass('active');
    })
}

function detailColorSelect() {
    $(document).on('click', '.detail-color-item', function() {
        var $row = $(this).closest('.detail-color-row');
        $('.detail-color-item', $row).removeClass('active');
        $(this).addClass('active');
    });
}

function isotopeInit() {
    $('.submenu').isotope({
        itemSelector: '.submenu-item',
        layoutMode: 'fitRows'
    });
}

$(document).ready(function() {

    $(document).foundation();

    initCarousel();
    initSubmenu();
    initSlider();
    tabs();
    sideMenu();
    productRate();
    fixedResponsive();
    checkoutItem();
    detailSizeChange();
    detailColorSelect();

    $('form').each(function() {
        $(this).validate();
    });

    var initHeaderHeight = $('.header').height();
    $(window).on('scroll', function() {
        scrollHandler(initHeaderHeight);
    });
    $(window).on('resize', function() {
        fixedResponsive()
    });
});