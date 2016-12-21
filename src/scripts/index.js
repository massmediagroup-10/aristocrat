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
    if ($('.submenu').hasClass('active')) {
        $('.header').css('z-index', '5');
    } else {
        $('.header').css('z-index', '2');
    }
    if ((srollTop) > ofcontent) {
        $('.header').addClass('fixed');
        fixedResponsive();
    } else {
        $('.header').removeClass('fixed');
        fixedResponsive();
    }

}

function fixedResponsive() {
    var previewHeight = ($('.preview').length > 0) ? $('.preview').outerHeight() : 0;
    var submenuHeight = ($('.submenu.active').length > 0) ? $('.submenu.active').outerHeight() : 0;
    var headerHeight = $('.header').outerHeight();
    var documentTop = $(document).scrollTop();
    if ($('.submenu').hasClass('active')) {
        $('.content').css({
            'margin-top': headerHeight + previewHeight + submenuHeight
        });
    } else {
        $('.content').css({
            'margin-top': headerHeight + previewHeight
        });
    }
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

    $('.navigation li.has-submenu>a').click(function() {

        var that = $(this);
        var documentTop = $(document).scrollTop();

        packeryInit(that.siblings('.submenu'));

        if (that.siblings('.submenu').hasClass('active')) {
            if (documentTop == 0) {
                $('.content').stop().animate({
                    'margin-top': contentTop
                }, 500);
                if ($('.preview').length > 0) {
                    $('.preview').stop().animate({
                        'top': previewTop
                    }, 500);
                }
                setTimeout(function() {
                    $('.navigation li.has-submenu>a').removeClass('active');
                    $('.submenu').removeClass('active');
                }, 500);
            }
        } else {
            /*
             if document position on top of body
             */
            if (documentTop == 0) {
                $('.content').stop().animate({
                    'margin-top': contentTop
                });
                /*
                 if page has preview block
                 */
                if ($('.preview').length > 0) {
                    $('.preview').stop().animate({
                        'top': previewTop
                    }, function() {
                        $('.preview').stop().animate({
                            'top': previewTop + submenuHeight
                        }, 500);
                        $('.content').stop().animate({
                            'margin-top': contentTop + submenuHeight
                        }, 500);
                        setTimeout(function() {
                            $('.navigation li.has-submenu>a').removeClass('active');
                            $('.submenu').removeClass('active');
                            setTimeout(function() {
                                that.addClass('active');
                                that.siblings('.submenu').addClass('active');
                            }, 0);
                        });
                    });
                } else {
                    $('.content').stop().animate({
                        'margin-top': $('.breadcrumbs').offset().top
                    }, 500, function() {
                        $('.content').stop().animate({
                            'margin-top': contentTop + submenuHeight
                        }, 500)
                    });
                    setTimeout(function() {
                        $('.navigation li.has-submenu>a').removeClass('active');
                        $('.submenu').removeClass('active');
                        setTimeout(function() {
                            that.addClass('active');
                            that.siblings('.submenu').addClass('active');
                        }, 0);
                    });
                }
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

function packeryInit(submenu) {
    submenu.packery({
        "itemSelector": ".submenu-item",
        gutter: 4,
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

$(document).ready(function() {

    $(document).foundation();

    initCarousel();
    initSlider();
    tabs();
    sideMenu();
    productRate();
    fixedResponsive();
    checkoutItem();
    detailSizeChange();
    detailColorSelect();
    switcherInit();
    initSubmenu();

    $('form').each(function() {
        $(this).validate();
    });

    var initHeaderHeight = $('.header').outerHeight();
    console.log(initHeaderHeight);
    $(window).on('scroll', function() {
        scrollHandler(initHeaderHeight);
    });
    $(window).on('resize', function() {
        fixedResponsive()
    });
});