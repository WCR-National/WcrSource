
/*--------------------------------------------------*/
/*  Mobile Menu - mmenu.js
/*--------------------------------------------------*/

function myTest() {
    alert('Welcome to custom js');
}

//$(function () {
//    alert('Hello, custom js');
//});

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