
/*--------------------------------------------------*/
/*  Mobile Menu - mmenu.js
/*--------------------------------------------------*/

function myTest() {
    alert('Welcome to custom js');
}

function mmenuInit() {

    var wi = $(window).width();
    if (wi <= '992') {

        $('#footer').removeClass("sticky-footer");

        $(".mmenu-init").remove();
        $("#navigation").clone().addClass("mmenu-init").insertBefore("#navigation").removeAttr('id').removeClass('style-1 style-2').find('ul').removeAttr('id');
        $(".mmenu-init").find(".container").removeClass("container");

        $(".mmenu-init").mmenu({
            "counters": true
        }, {
                // configuration
                offCanvas: {
                    pageNodetype: "#wrapper"
                }
            });

        var mmenuAPI = $(".mmenu-init").data("mmenu");
        var $icon = $(".hamburger");

        $(".mmenu-trigger").click(function () {
            mmenuAPI.open();
        });

        mmenuAPI.bind("open:finish", function () {
            setTimeout(function () {
                $icon.addClass("is-active");
            });
        });
        mmenuAPI.bind("close:finish", function () {
            setTimeout(function () {
                $icon.removeClass("is-active");
            });
        });

        $(".mmenu-init").css({ "display": "none" });
    }
    $(".mm-next").addClass("mm-fullsubopen");
}


function InitializeFullWidthSlider() {

    /*----------------------------------------------------*/
    /*  Inline CSS replacement for backgrounds etc.
    /*----------------------------------------------------*/
    function inlineCSS() {

        // Common Inline CSS
        $(".some-classes, section.fullwidth, .img-box-background, .flip-banner, .property-slider .item, .fullwidth-property-slider .item, .fullwidth-home-slider .item, .address-container").each(function () {
            var attrImageBG = $(this).attr('data-background-image');
            var attrColorBG = $(this).attr('data-background-color');

            if (attrImageBG !== undefined) {
                $(this).css('background-image', 'url(' + attrImageBG + ')');
            }

            if (attrColorBG !== undefined) {
                $(this).css('background', '' + attrColorBG + '');
            }
        });

    }
    // Init
    inlineCSS();


    /*----------------------------------------------------*/
    /*  Mortgage Calculator
    /*----------------------------------------------------*/

    //// Gets property price
    //var propertyPricing = parseFloat($('.property-price').text().replace(/[^0-9\.]+/g, ""));
    //if (propertyPricing > 0) {
    //    $('.pick-price').on('click', function () {
    //        $('#amount').val(parseInt(propertyPricing));
    //    });
    //}

    //// replacing comma with dot
    //$(document).on('change', function () {
    //    $("#interest").val($("#interest").val().replace(/,/g, '.'));
    //});

    //// Calculator
    //function mortgageCalc() {

    //    var amount = parseFloat($("#amount").val().replace(/[^0-9\.]+/g, "")),
    //        months = parseFloat($("#years").val().replace(/[^0-9\.]+/g, "") * 12),
    //        down = parseFloat($("#downpayment").val().replace(/[^0-9\.]+/g, "")),
    //        annInterest = parseFloat($("#interest").val().replace(/[^0-9\.]+/g, "")),
    //        monInt = annInterest / 1200,
    //        calculation = ((monInt + monInt / (Math.pow(1 + monInt, months) - 1)) * (amount - (down || 0))).toFixed(2);

    //    if (calculation > 0) {
    //        $(".calc-output-container").css({ 'opacity': '1', 'max-height': '200px' });
    //        $(".calc-output").hide().html(calculation + ' ' + $('.mortgageCalc').attr("data-calc-currency")).fadeIn(300);
    //    }
    //}

    //// Calculate
    //$('.calc-button').on('click', function () {
    //    mortgageCalc();
    //});


    /*----------------------------------------------------*/
    /*  Show More Button
    /*----------------------------------------------------*/
    $('.show-more-button').on('click', function (e) {
        e.preventDefault();
        $('.show-more').toggleClass('visible');
    });

    /*----------------------------------------------------*/
    /*  Slick Carousel
    /*----------------------------------------------------*/
    //$('.property-slider').slick({
    //    slidesToShow: 1,
    //    slidesToScroll: 1,
    //    arrows: true,
    //    fade: true,
    //    asNavFor: '.property-slider-nav',
    //    centerMode: true,
    //    slide: ".item",
    //    adaptiveHeight: true
    //});
    $('.fullwidth-property-slider').slick({
        centerMode: true,
        centerPadding: '20%',
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        centerMode: true,
        asNavFor: '.property-slider-nav',
        slide: ".item",

        responsive: [
            {
                breakpoint: 1367,
                settings: {
                    centerPadding: '15%'
                }
            },
            {
                breakpoint: 993,
                settings: {
                    centerPadding: '0'
                }
            }
        ]
    });

    $('.property-slider-nav').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.property-slider',
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                }
            }
        ]
    });

    

    /*----------------------------------------------------*/
    /*  Magnific Popup
    /*----------------------------------------------------*/
    $('body').magnificPopup({
        type: 'image',
        delegate: 'a.mfp-gallery',

        fixedContentPos: true,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: false,
        preloader: true,

        removalDelay: 0,
        mainClass: 'mfp-fade',

        gallery: { enabled: true }
    });

    $('.popup-with-zoom-anim').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });

    $('.mfp-image').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-fade',
        image: {
            verticalFit: true
        }
    });

    // ------------------ End Document ------------------ //
}



/*----------------------------------------------------*/
/*  Listing Layout Switcher
/*----------------------------------------------------*/
//function gridLayoutSwitcher() {
//    debugger;
//    var listingsContainer = $('.listings-container');

//    // switcher buttons / anchors
//    if ($(listingsContainer).is(".list-layout")) {
//        owlReload();
//        $('.layout-switcher a.grid, .layout-switcher a.grid-three').removeClass("active");
//        $('.layout-switcher a.list').addClass("active");
//    }

//    if ($(listingsContainer).is(".grid-layout")) {
//        owlReload();
//        $('.layout-switcher a.grid').addClass("active");
//        $('.layout-switcher a.grid-three, .layout-switcher a.list').removeClass("active");
//        gridClear(2);
//    }

//    if ($(listingsContainer).is(".grid-layout-three")) {
//        owlReload();
//        $('.layout-switcher a.grid, .layout-switcher a.list').removeClass("active");
//        $('.layout-switcher a.grid-three').addClass("active");
//        gridClear(3);
//    }


//    // grid cleaning
//    function gridClear(gridColumns) {
//        $(listingsContainer).find(".clearfix").remove();
//        $(".listings-container > .listing-item:nth-child(" + gridColumns + "n)").after("<div class='clearfix'></div>");
//    }


//    // objects that need to resized
//    var resizeObjects = $('.listings-container .listing-img-container img, .listings-container .listing-img-container');

//    // if list layout is active
//    function listLayout() {
//        if ($('.layout-switcher a').is(".list.active")) {

//            $(listingsContainer).each(function () {
//                $(this).removeClass("grid-layout grid-layout-three");
//                $(this).addClass("list-layout");
//            });

//            $('.listing-item').each(function () {
//                var listingContent = $(this).find('.listing-content').height();
//                $(this).find(resizeObjects).css('height', '' + listingContent + '');
//            });
//        }
//    } listLayout();

//    $(window).on('load resize', function () {
//        listLayout();
//    });


//    // if grid layout is active
//    $('.layout-switcher a.grid').on('click', function (e) { gridClear(2); });

//    function gridLayout() {
//        if ($('.layout-switcher a').is(".grid.active")) {

//            $(listingsContainer).each(function () {
//                $(this).removeClass("list-layout grid-layout-three");
//                $(this).addClass("grid-layout");
//            });

//            $('.listing-item').each(function () {
//                $(this).find(resizeObjects).css('height', 'auto');
//            });

//        }
//    } gridLayout();


//    // if grid layout is active
//    $('.layout-switcher a.grid-three').on('click', function (e) { gridClear(3); });

//    function gridThreeLayout() {
//        if ($('.layout-switcher a').is(".grid-three.active")) {

//            $(listingsContainer).each(function () {
//                $(this).removeClass("list-layout grid-layout");
//                $(this).addClass("grid-layout-three");
//            });

//            $('.listing-item').each(function () {
//                $(this).find(resizeObjects).css('height', 'auto');
//            });

//        }
//    } gridThreeLayout();


//    // Mobile fixes
//    $(window).on('resize', function () {
//        $(resizeObjects).css('height', '0');
//        listLayout();
//        gridLayout();
//        gridThreeLayout();
//    });

//    $(window).on('load resize', function () {
//        var winWidth = $(window).width();

//        if (winWidth < 992) {
//            owlReload();

//            // reset to two columns grid
//            gridClear(2);
//        }

//        if (winWidth > 992) {
//            if ($(listingsContainer).is(".grid-layout-three")) {
//                gridClear(3);
//            }
//            if ($(listingsContainer).is(".grid-layout")) {
//                gridClear(2);
//            }
//        }

//        if (winWidth < 768) {
//            if ($(listingsContainer).is(".list-layout")) {
//                $('.listing-item').each(function () {
//                    $(this).find(resizeObjects).css('height', 'auto');
//                });
//            }
//        }

//        if (winWidth < 1366) {
//            if ($(".fs-listings").is(".list-layout")) {
//                $('.listing-item').each(function () {
//                    $(this).find(resizeObjects).css('height', 'auto');
//                });
//            }
//        }
//    });


//    // owlCarousel reload
//    function owlReload() {
//        $('.listing-carousel').each(function () {
//            $(this).data('owlCarousel').reload();
//        });
//    }


//    // switcher buttons
//    $('.layout-switcher a').on('click', function (e) {
//        e.preventDefault();

//        var switcherButton = $(this);
//        switcherButton.addClass("active").siblings().removeClass('active');

//        // reset images height
//        $(resizeObjects).css('height', '0');

//        // carousel reload
//        owlReload();

//        // if grid layout is active
//        gridLayout();

//        // if three columns grid layout is active
//        gridThreeLayout();

//        // if list layout is active
//        listLayout();

//    });

//} //gridLayoutSwitcher();