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
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true
    });
}

function scrollHandler(initHeaderHeight) {
    var contentPadding = $('.content').outerHeight() - $('.content').height();
    var ofcontent = $('.header-line').offset().top - initHeaderHeight + contentPadding;
    var srollTop = $(document).scrollTop();

    if ((srollTop) > ofcontent) {
        $('.header').addClass('fixed');
    } else {
        $('.header').removeClass('fixed');
    }

}

function fixedResponsive() {
    var previewHeight = ($('.preview').length > 0) ? $('.preview').outerHeight() : 0;
    var submenuHeight = ($('.submenu.active').length > 0) ? $('.submenu.active').outerHeight() : 0;
    var headerHeight = $('.header').outerHeight();
    var documentTop = $(document).scrollTop();
    var hint = $('.header-hint');
    var hintHeight = (hint.length) ? hint.outerHeight() : 0;
    $('.content').css({
        'margin-top': headerHeight + previewHeight + submenuHeight
    });
    $('.header').css({
        top: hintHeight
    });

    $('.preview').css({
        'top': headerHeight + hintHeight
    });
    $('.content').css({
        'margin-top': headerHeight + previewHeight + hintHeight
    });
}

function contentSlide(subHeight) {
    var submenuHeight = (typeof subHeight === 'undefined') ? $('.submenu.active').outerHeight() : subHeight;
    var previewHeight = ($('.preview').length > 0) ? $('.preview').outerHeight() : 0;
    var headerHeight = $('.header').outerHeight();
    $('.content').stop().animate({
        'margin-top': headerHeight + previewHeight + submenuHeight
    });
    $('.preview').stop().animate({
        'top': headerHeight + submenuHeight
    });
}

function submenuHandler() {
    var isLaunch = false;

    return {
        init: function() {
            $('.navigation .menu li').each(function() {
                if ($(this).find('.submenu').length) {
                    $(this).addClass('has-submenu');
                }
            });

            $('.submenu').stop().slideUp(0);

            $('.navigation li.has-submenu>a').click(function() {
                var that = $(this);
                var submenu = that.siblings('.submenu');

                if ($('.submenu.active').length > 0) {
                    if (submenu.hasClass('active')) {
                        submenu.stop().slideUp(function() {
                            submenu.removeClass('active');
                            that.removeClass('active');
                        });
                        contentSlide(0);
                    } else {
                        isLaunch = true;
                        $('.submenu.active').stop().slideUp(function() {
                            $('.submenu.active').removeClass('active');
                            submenu.addClass('active');
                            submenu.slideDown();
                            $('.navigation li.has-submenu>a').removeClass('active');
                            that.addClass('active');
                        });
                    }
                } else {
                    isLaunch = true;
                    submenu.addClass('active');
                    contentSlide();
                    submenu.stop().slideDown();
                    that.addClass('active');
                }
            });
        },
        scroll: function() {
            if (isLaunch) {
                isLaunch = false;
                var submenu = $('.submenu.active');
                submenu.stop().slideUp(300, function() {
                    submenu.removeClass('active');
                    submenu.siblings('a').removeClass('active');
                });
                contentSlide(0);
            }
        }
    }

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

function packeryInit(submenu) {
    submenu.packery({
        "itemSelector": ".submenu-item",
        gutter: '.gutter-sizer',
        "isHorizontal": true
    });
}

function switcherInit() {
    $(document).on('click', '.switcher', function(e) {
        e.preventDefault();
        var switcher = $(this);
        switcher.toggleClass('active');
        setTimeout(function() {
            switcher.toggleClass('active');
        }, 2000);
    });
}

function footerplaceholder() {
    $('.footer_placeholder')
        .height($('.footer')
            .outerHeight());
}

function contentHeight() {
    var minHeight = $(window).height() - ($('.header').outerHeight() + $('.footer').outerHeight());
    $('.content').css({
        'min-height': minHeight
    })
}

function headerHint() {
    var hint = $('.header-hint');
    if (hint.length) {
        $('body').addClass('hintOpen');
    }
    $(document).on('click', '.header-hint-close', function() {
        $('body').removeClass('hintOpen');
        hint.slideUp(function() {
            $(this).remove();
        });

        $('.header').animate({
            top: 0
        });
        $('.preview').animate({
            'top': $('.header').outerHeight()
        });
        $('.content').animate({
            'margin-top': $('.header').outerHeight() + $('.preview').outerHeight()
        });
    });
}

var openedOnEither = false;

$(document).ready(function() {

    $(document).foundation();

    var submenu = submenuHandler();

    initCarousel();
    initSlider();
    tabs();
    sideMenu();
    productRate();
    checkoutItem();
    detailSizeChange();
    detailColorSelect();
    switcherInit();
    contentHeight();
    submenu.init();
    fixedResponsive();
    headerHint();

    $('form').each(function() {
        $(this).validate();
    });


    var initHeaderHeight = $('.header').outerHeight();
    $(window).on('scroll', function() {
        scrollHandler(initHeaderHeight);
        submenu.scroll();
        $('.header-hint-close').trigger('click');
    });
    $(window).on('resize', function() {
        fixedResponsive();
    });
    $(window).on('load', function() {
        fixedResponsive();
    });
});