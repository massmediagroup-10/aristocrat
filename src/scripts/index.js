'use strict';

function isMobile() {
    return ($(window).width() < 1025) ? true : false;
}

var detailMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.detail-slider-nav'
};
var detailNav = {
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
};

function initCarousel() {
    $('.product-list').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
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

    $('.detail-slider-main').slick(detailMain);
    $('.detail-slider-nav').slick(detailNav);
}

function initSlider() {
    $('.preview-slider').slick({
        dots: false,
        infinite: true,
        speed: 1000,
        fade: true,
        pauseOnHover: false
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
    var headerHeight = $('.header').outerHeight();
    var hintHeight = ($('.header-hint').length) ? $('.header-hint').outerHeight() : 0;
    if (!isMobile()) {
        $('.content').css({
            'margin-top': headerHeight + hintHeight
        });
        $('.header').css({
            top: hintHeight
        });
    } else {
        $('.header').css({
            top: hintHeight
        });
        $('.content').css({
            'margin-top': hintHeight
        });
    }
}

function contentSlide(subHeight) {
    var headerHeight = $('.header').outerHeight();
    $('.content').stop().animate({
        'margin-top': headerHeight
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
            $($wrap).on('click', '[data-tabId]', function(event) {
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
    });


}

function tabsResponsive() {
    if (isMobile()) {
        $('.tabs').each(function() {
            var panel = $(this);
            panel.find('.tabs-panel').each(function() {
                var tab = $(this).data('tab');
                var tabTitle = $('.tabs-title a[data-tabid="' + tab + '"]', panel);
                if (!tabTitle.siblings('.tabs-panel').length) {
                    var content = $(this).clone().addClass('responsive');
                    tabTitle.after(content);
                }
            });
        });
    } else {
        $('.tabs').each(function() {
            var panel = $(this);
            $('.tabs-title .tabs-panel', panel).remove();
        });
    }
}

function sideMenu() {
    $('.side-menu>li>a:not(.active)').siblings('ul').slideUp(0);
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
    $('.checkout-item').not('.active, .expanded').find('.checkout-body').slideUp(0);

    $(document).on('click', '.checkout-item:not(.expanded) .checkout-title a', function() {
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
    $(document).on('change', '.detail-size', function() {
        var select = $(this).val();
        $('.detail-color-row').removeClass('active');
        $('.detail-color-row[data-size="' + select + '"]').addClass('active');
        $('.detail-color-item').removeClass('active');
        $('#model_modelId').val(null);
        $('.js_add_to_cart').removeClass('allow_add_to_cart');
        $('.detail-color-row.active .detail-color-item').first().trigger('click');
    })
}

function detailColorSelect() {
    $(document).on('click', '.detail-color-item', function() {
        $('.detail-color-item').removeClass('active');
        $(this).addClass('active');
        $('#model_modelId').val($(this).data('model-id'));
        $('.detail-slider').addClass('slider-hidden');
        var currSlider = $('.detail-slider[data-model-id = "' + $(this).data('model-id') + '"]');
        var currSliderMain = currSlider.find('.detail-slider-main');
        var currSliderNav = currSlider.find('.detail-slider-nav');
        currSlider.removeClass('slider-hidden');
        if (currSliderMain.hasClass('slick-initialized')) {
            currSliderMain.slick("unslick");
            currSliderMain.slick(detailMain);
            currSliderNav.slick("unslick");
            currSliderNav.slick(detailNav);
        }

        $('.model-data').addClass('hide');
        $('.model-data[data-model-id = "' + $(this).data('model-id') + '"]').removeClass('hide');
        $('.model-description').addClass('hide');
        $('.model-description[data-model-id = "' + $(this).data('model-id') + '"]').removeClass('hide');
        $('.js_add_to_cart').addClass('allow_add_to_cart');
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
    var speed = ($('body').scrollTop() != 0) ? 0 : 400;
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
        }, speed);

        if (!isMobile()) {
            $('.content').animate({
                'margin-top': $('.header').outerHeight()
            }, speed);
        } else {
            $('.content').animate({
                'margin-top': 0
            }, speed);
        }
        $.ajax({
            url: confirmCookie,
            type: "GET",
        });
    });
}

function bagCheck() {
    $(document).on('click', '.shopping-bag', function(e) {
        if (Number($(this).find('.js_cart_items_count').text()) == 0) {
            e.preventDefault();
        }
    })
}

function pageNavigation() {
    var hash = window.location.hash;
    var target;
    if ($(hash).length > 0) {
        target = ($(hash).length > 0) ? $(hash).position().top : 0;
        $('body, html').animate({
            scrollTop: target
        }, 800, function() {
            $('body, html').stop();
            canHandling = true;
        });
    } else canHandling = true;
    $('.navigation .submenu a').click(function(e) {
        var hash = window.location.hash;
        if ($(hash).length > 0) {
            e.preventDefault();
            canHandling = false;
            $('body').removeClass('handling')
            target = ($(hash).length > 0) ? $(hash).position().top : 0;
            $('body, html').animate({
                scrollTop: target
            }, 800, function() {
                $('body, html').stop();
                canHandling = true;
            });
        }
    })
}

function accountShopping() {
    $('.account-shopping-list').slideUp(0);
    $('.account-shopping-link').each(function() {
        $(this).find('span:eq(1)').hide();
    });

    $('.account-shopping-link').on('click', function(e) {
        e.preventDefault();
        var parent = $(this).closest('.account-shopping-item');
        $(this).find('span').stop().toggle();
        parent.find('.account-shopping-list').stop().slideToggle();
    });
}

function simpleMenu() {
    $('.simple-menu li').each(function(e) {
        if ($(this).hasClass('active')) {
            var target = $(this).find('a').attr('href');
            $('.account-content').hide();
            $(target).show();
        }
    });

    $(document).on('click', '.simple-menu a', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('.simple-menu li').removeClass('active');
        $(this).closest('li').addClass('active');
        $('.account-content').hide();
        $(target).show();
    });
}

function mobileMenu() {
    if (isMobile()) {
        $('.submenu').slideUp(0);
        $('.navigation-collapse').slideUp(0);
    }

    $(document).on('click', '.menu-toggle', function(e) {
        $(this).toggleClass('active');
        $('.navigation-collapse').stop().slideToggle();
    });

    $(document).on('click', '.submenu-link', function(e) {
        if (isMobile()) {
            e.preventDefault();
            $(this).toggleClass('collapsed');
            $(this).siblings('.submenu').stop().slideToggle();
        }
    });

    $(window).resize(function() {
        if (!isMobile()) {
            $('.submenu').slideDown(0);
            $('.navigation-collapse').slideDown(0);
            $('.navigation-collapse').attr('style', '');
        } else {
            if ($('.navigation-collapse').is(':visible')) {
                $('.menu-toggle').addClass('active');
            } else {
                $('.menu-toggle').removeClass('active');
                $('.submenu-link').removeClass('collapsed');
            }
        }
    });
}

function filterToggle() {
    $(document).on('click', '.filter-toggle', function() {
        $('.filter').toggleClass('active');
    })
    if ($('.filter').length) {
        $('.filter').swipeleft(function(e) {
            $(this).removeClass('active');
        });
    }
}

function preloader() {
    if (preloaderDone) {
        $('.preloader').fadeOut(function() {
            $(this).hide();
        });
    } else {
        setTimeout(function() {
            $('.preloader').fadeOut(function() {
                $(this).hide();
            });
        }, 1000);
    }
}

var canHandling = false;

$(document).ready(function() {

    var dataId;
    var initHeaderHeight = $('.header').outerHeight();
    $(document).foundation();
    $('#datepicker').fdatepicker({});

    initCarousel();
    initSlider();
    tabs();
    tabsResponsive();
    sideMenu();
    productRate();
    checkoutItem();
    detailSizeChange();
    detailColorSelect();
    switcherInit();
    contentHeight();
    fixedResponsive();
    headerHint();
    bagCheck();
    pageNavigation();
    accountShopping();
    simpleMenu();
    mobileMenu();
    filterToggle();

    $('form').each(function() {
        $(this).validate();
    });

    $(window).on('scroll', function() {
        if (canHandling) scrollHandler(initHeaderHeight);
    });
    $(window).on('resize', function() {
        fixedResponsive();
        tabsResponsive();
    });
    $(window).on('load', function() {
        fixedResponsive();
        preloader();
    });

    $(document).on("click", ".deleteLink", function() {
        dataId = $(this).data('id');
    });

    $(document).on("click", ".remove_item_from_cart", function() {
        var row = $('.product-item[data-id = "' + dataId + '"]');
        $.ajax({
            url: removeUrl,
            data: {
                'productModelId': dataId,
                'quantity': ""
            },
            type: "POST",
            success: function(response) {
                row.fadeOut(function() {
                    row.remove();
                });
                $('.js-cartTotalPrice').text(response.cartTotalPrice);
                $('.js_cart_items_count').text(response.cartItemsCount);
                if (response.cartItemsCount == 0) {
                    $('.button-proceed').addClass('button-disable');
                }
            },
        });
        dataId = $(this).data('id');
        $('#removeModal').foundation('close');
    });
});

$(document).on('products.inserted', function() {
    sideMenu();
});