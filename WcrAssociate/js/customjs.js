

var ca = GetParameterValues('ca');
function GetParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}




function CheckUserLogin() {
    var a = 0;
    $.ajax({
        type: "POST", url: "ws/ConsumerRegistration.asmx/ConsumerIsLogin",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            if (r.d > 0) {
                if (ca == "0") {
                    a = 1;
                }
                else {
                    a = 0;
                }
            }
            else {
                a = 0;
            }
        }
    });
    return a;
}

function CheckUserLogininHome() {
    var a = 0;
    $.ajax({
        type: "POST", url: "ws/ConsumerRegistration.asmx/ConsumerIsLogin", data: "{}", contentType: "application/json; charset=utf-8",
        dataType: "json", async: false,
        success: function (r) {
            ca = "0";//Because in index page we can not set parameters in url
            if (r.d > 0) {
                if (ca == "0") {
                    a = 1;
                }
                else {
                    a = 0;
                }
            }
            else {
                a = 0;
            }
        }
    });
    return a;
}


function BindSalesCategory(zipc) {
    var cartd = [];
    $.ajax({
        type: "POST", url: "Associate/ws/subCategory.asmx/SubCategories",
        data: "{'Categoryid':1}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            if (r.d.length > 0) {
                var xmlDoc = $.parseXML(r.d);
                var xml = $(xmlDoc);
                var docs = xml.find("subCategories");
                $.each(docs, function (i, docs) {
                    var flag = 0;
                    cartd.push(" <div class='col-sm-3 text-center block'>");
                    cartd.push(" <div class='fullrow innerblock'>");
                    //cartd.push("<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate'><i>");
                    cartd.push(" <h3>" + ($(docs).find("name").text()) + " </h3>");
                    $.ajax({
                        type: "POST", url: "ws/TopSearch.asmx/ViewAdvanceSearch1", data: "{'zipcode':" + zipc + ",'SubCategory':" + ($(docs).find("id").text()) + "}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                        success: function (r1) {
                            if (r1.d.length > 0) {
                                var xmlDoc1 = $.parseXML(r1.d);
                                var xml1 = $(xmlDoc1);
                                var docs1 = xml1.find("GetCategoriesinfo1");
                                $.each(docs1, function (i, docs1) {
                                    if ($(docs).find("id").text() == $(docs1).find("Subcategoryid").text()) {
                                        cartd.push("<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + $(docs1).find("Zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate'>");
                                        cartd.push("<span><i><img src='Associate/Adv_img/" + ($(docs1).find("advMainImage").text()) + "'  alt=''/></i></span></a></div></div>");
                                        flag = 1;
                                    }
                                    else { }
                                });
                            }
                        }
                    });
                    if (flag == 1)
                    { }
                    else {
                        cartd.push("<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate'>");
                        cartd.push("<span><i><img src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(docs).find("id").text()) + "'/></i></span></a></div></div>");
                    }
                });
            }
        },
        failure: function (response) {
            alert(response.d + "Fail");
        },
        error: function (response) {
            alert(response.d + "Error...");
        }
    });
    return cartd;
}
////function BindServiesCategory(zipc) {
////    var cartd = [];
////    $.ajax({
////        type: "POST", url: "Associate/ws/Category.asmx/JobtypeWiseCategory", data: "{'flag':'1','jobtype':'2'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
////        success: function (r) {
////            if (r.d.length > 0) {
////                var xmlDoc = $.parseXML(r.d);
////                var xml = $(xmlDoc);
////                var docs = xml.find("JobCategories");
////                $.each(docs, function (i, docs) {
////                    var flag = 0;
////                    cartd.push(" <div class='col-sm-3 text-center block'>");
////                    cartd.push(" <div class='fullrow innerblock'>");
////                    //cartd.push("<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("categoryName").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "'><i>");
////                    cartd.push(" <h3>" + ($(docs).find("categoryName").text()) + " </h3>");
////                    $.ajax({
////                        type: "POST", url: "ws/TopSearch.asmx/ViewAdvanceSearchForServices", data: "{'zipcode':" + zipc + ",'Category':" + ($(docs).find("ID").text()) + "}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
////                        success: function (r1) {
////                            if (r1.d.length > 0) {
////                                var xmlDoc1 = $.parseXML(r1.d);
////                                var xml1 = $(xmlDoc1);
////                                var docs1 = xml1.find("GetCategoriesinfoservices");
////                                $.each(docs1, function (i, docs1) {
////                                    if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
////                                        cartd.push("<a href='ServiceProfileList.html'>");
////                                        // cartd.push("<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + $(docs1).find("Zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate'>");
////                                        cartd.push("<span><i><img src='Associate/Adv_img/" + ($(docs1).find("advMainImage").text()) + "'  alt=''/></i></span></a></div></div>");
////                                        flag = 1;
////                                    }
////                                    else { }
////                                });
////                            }
////                        }
////                    });
////                    if (flag == 1)
////                    { }
////                    else {
////                        cartd.push("<a href='ServiceProfileList.html'>");
////                        //cartd.push("<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate'>");
////                        cartd.push("<span><i><img src='images/icons/" + ($(docs).find("catImages").text()) + "'  alt=''/></i></span></a></div></div>");
////                    }

////                });
////                // $("#Services").html(cartd.join(''));

////            }
////        },
////        failure: function (response) {
////            alert(response.d + "Fail");
////        },
////        error: function (response) {
////            alert(response.d + "Error...");
////        }
////    });
////    return cartd;
////}
function BindSalesCategory1(zipc) {
    var cartd = [];
    $.ajax({
        type: "POST", url: "Associate/ws/subCategory.asmx/SubCategories", data: "{'Categoryid':1}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            if (r.d.length > 0) {
                var xmlDoc = $.parseXML(r.d);
                var xml = $(xmlDoc);
                var docs = xml.find("subCategories");
                $.each(docs, function (i, docs) {
                    var flag = 0;
                    //cartd.push("<div class='panel panel-default list'>");
                    //cartd.push("<div class='panel-body'>");
                    //cartd.push("<div class='row'>");
                    //cartd.push("<div class='col-sm-12'>");
                    // cartd.push("<h3> " + ($(docs).find("name").text()) + " </h3>");

                    $.ajax({
                        type: "POST", url: "ws/TopSearch.asmx/ViewAdvanceSearch1", data: "{'zipcode':" + zipc + ",'SubCategory':" + ($(docs).find("id").text()) + "}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                        success: function (r1) {
                            if (r1.d.length > 0) {
                                var xmlDoc1 = $.parseXML(r1.d);
                                var xml1 = $(xmlDoc1);
                                var docs1 = xml1.find("GetCategoriesinfo1");
                                $.each(docs1, function (i, docs1) {
                                    if ($(docs).find("id").text() == $(docs1).find("Subcategoryid").text()) {
                                        cartd.push("<div class='panel panel-default list'>");
                                        cartd.push("<div class='panel-body'>");
                                        cartd.push("<div class='row'>");
                                        cartd.push("<div class='col-sm-12'>");
                                        cartd.push("<h3> " + ($(docs).find("name").text()) + " </h3>");
                                        cartd.push("<p>" + ($(docs).find("detail").text()) + "  </p>");
                                        cartd.push("<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + $(docs1).find("Zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate' class='btn btn-primary'> View " + ($(docs).find("name").text()) + " </a>");
                                        cartd.push("</div>");
                                        cartd.push("</div>");
                                        cartd.push("</div>");
                                        cartd.push("</div>");
                                        flag = 1;
                                    }
                                    else { }
                                });
                            }
                        }
                    });
                    //cartd.push("</div>");
                    //cartd.push("</div>");
                    //cartd.push("</div>");
                    //cartd.push("</div>");
                    if (flag == 1)
                    { }
                    else {
                        cartd.push("<div class='panel panel-default list'>");
                        cartd.push("<div class='panel-body'>");
                        cartd.push("<div class='row'>");
                        cartd.push("<div class='col-sm-12'>");
                        cartd.push("<h3>" + ($(docs).find("name").text()) + " </h3>");
                        cartd.push("<p>" + ($(docs).find("detail").text()) + "  </p>");
                        //cartd.push("<p> Luxury accommodation for up to 8 guests with the Owner's Stateroom spanning the full width of the boat and being equipped with flat screen TV, vanity area, ensuite shower room. The VIP Cabin is also full width with ensuite facilities. </p>");
                        cartd.push("<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate' class='btn btn-primary'> View " + ($(docs).find("categoryName").text()) + " Services </a>");
                        cartd.push("</div>");
                        cartd.push("</div>");
                        cartd.push("</div>");
                        cartd.push("</div>");
                    }
                });
            }
        },
        failure: function (response) {
            alert(response.d + "Fail");
        },
        error: function (response) {
            alert(response.d + "Error...");
        }
    });
    return cartd;
}
function BindServiesCategory1(zipc) {
    var cartd = [];
    $.ajax({
        type: "POST", url: "Associate/ws/Category.asmx/JobtypeWiseCategory", data: "{'flag':'1','jobtype':'2'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
        success: function (r) {
            if (r.d.length > 0) {
                var xmlDoc = $.parseXML(r.d);
                var xml = $(xmlDoc);
                var docs = xml.find("JobCategories");
                $.each(docs, function (i, docs) {
                    var flag = 0;
                    $.ajax({
                        type: "POST", url: "ws/TopSearch.asmx/ViewAdvanceSearchForServices", data: "{'zipcode':" + zipc + ",'Category':" + ($(docs).find("ID").text()) + "}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                        success: function (r1) {
                            if (r1.d.length > 0) {
                                var xmlDoc1 = $.parseXML(r1.d);
                                var xml1 = $(xmlDoc1);
                                var docs1 = xml1.find("GetCategoriesinfoservices");
                                $.each(docs1, function (i, docs1) {
                                    if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
                                        cartd.push("<div class='panel panel-default list'>");
                                        cartd.push("<div class='panel-body'>");
                                        cartd.push("<div class='row'>");
                                        cartd.push("<div class='col-sm-12'>");
                                        cartd.push("<h3>" + ($(docs).find("categoryName").text()) + " </h3>");
                                        cartd.push("<p>" + ($(docs).find("Detail").text()) + "  </p>");
                                        cartd.push("<a href='ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + $(docs1).find("zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "' class='btn btn-primary'>View " + ($(docs).find("categoryName").text()) + " Services </a>");
                                        cartd.push("</div>");
                                        cartd.push("</div>");
                                        cartd.push("</div>");
                                        cartd.push("</div>");
                                        flag = 1;
                                    }
                                    else {
                                    }
                                });
                            }
                        }
                    });

                    if (flag == 1)
                    { }
                    else {
                        cartd.push("<div class='panel panel-default list'>");
                        cartd.push("<div class='panel-body'>");
                        cartd.push("<div class='row'>");
                        cartd.push("<div class='col-sm-12'>");
                        cartd.push("<h3>" + ($(docs).find("categoryName").text()) + " </h3>");
                        cartd.push("<p>" + ($(docs).find("Detail").text()) + "  </p>");
                        cartd.push("<a href='ServiceProfileList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "' class='btn btn-primary'>View " + ($(docs).find("categoryName").text()) + " Services </a>");
                        cartd.push("</div>");
                        cartd.push("</div>");
                        cartd.push("</div>");
                        cartd.push("</div>");
                    }
                });


            }
        },
        failure: function (response) {
            alert(response.d + "Fail");
        },
        error: function (response) {
            alert(response.d + "Error...");
        }
    });
    return cartd;
}
function ContactAssociate(dynar) {
    var _returnValue;
    var adverID;
    var associateID;
    var jobtypeID;
    var zipcode;
    var array = dynar.split(",");
    for (var i in array) {
        if (i == 0) {
            if (array[i] == '') {
            }
            else {
                adverID = array[i];
            }
        }
        else if (i == 1) {
            if (array[i] == '') {
            }
            else {
                associateID = array[i];
            }
        }
        else if (i == 2) {
            if (array[i] == '') {
            }
            else {
                jobtypeID = array[i];
            }
        }
        else if (i == 3) {
            if (array[i] == '') {
            }
            else {
                zipcode = array[i];
            }
        }
    }
    $.ajax({
        type: "POST",
        url: "ws/ConsumerComments.asmx/InsertConsumerInterest",
        data: "{'AdvertisementID':" + adverID + ",'AssociateID':" + associateID + ",'jobType':" + jobtypeID + ",'zipcode':" + zipcode + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        cache: false,
        success: function (r) {
            $.ajax({
                type: "POST",
                url: "ws/ConsumerComments.asmx/SendConsumerDetail",
                data: "{'associateID':" + associateID + ",'advertisementID':" + adverID + ",'jobtype':" + jobtypeID + ",'zipcode':" + zipcode + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                cache: false,
                success: function (response) {
                    _returnValue = r.d;
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        },
        failure: function (response) {
            alert(response.d + "Fail");
        },
        error: function (response) {
            alert(response.d + "Error...");
        }
    });
    return _returnValue;
}


function UpdateConsumerCompulsoryData(fieldValue) {
    $.ajax({
        type: "POST", url: "ws/ConsumerRegistration.asmx/UpdateCompulsoryData",
        data: "{'Name':'" + fieldValue + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            return r.data;
        },
        failure: function (response) {
            alert(response + "Fail");
        },
        error: function (response) {
            alert(response + "Error...");
        }
    });


}

function CheckConsumerEmailAndMobileExists() {
    var ReturnValue;
    $.ajax({
        type: "POST",
        url: "ws/ConsumerRegistration.asmx/CheckConsumerMobANDEmailExists",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            ReturnValue = response.d;
        },
        failure: function (response) {
            ReturnValue = "Fail";
        },
        error: function (response) {
            ReturnValue = "Error...";
        }
    });
    return ReturnValue;
}



function BindServiesCategory(zipc) {
    var cartd = [];
    $.ajax({
        type: "POST", url: "Associate/ws/Category.asmx/JobtypeWiseCategory",
        data: "{'flag':'1','jobtype':'2'}",
        contentType: "application/json; charset=utf-8", dataType: "json",
        async: false,
        success: function (r) {
            if (r.d.length > 0) {
                var xmlDoc = $.parseXML(r.d);
                var xml = $(xmlDoc);
                var docs = xml.find("JobCategories");
                $.each(docs, function (i, docs) {
                    var flag = 0;
                    cartd.push(" <div class='col-sm-3 text-center block'>");
                    cartd.push(" <div class='fullrow innerblock'>");
                    //cartd.push("<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("categoryName").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "'><i>");
                    cartd.push(" <h3>" + ($(docs).find("categoryName").text()) + " </h3>");
                    $.ajax({
                        type: "POST",
                        url: "ws/TopSearch.asmx/ViewAdvanceSearchForServices",
                        data: "{'zipcode':" + zipc + ",'Category':" + ($(docs).find("ID").text()) + "}",
                        contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                        success: function (r1) {
                            if (r1.d.length > 0) {
                                var xmlDoc1 = $.parseXML(r1.d);
                                var xml1 = $(xmlDoc1);
                                var docs1 = xml1.find("GetCategoriesinfoservices"); 
                                $.each(docs1, function (i, docs1) {
                                    if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
                                        cartd.push("<a href='ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + $(docs1).find("zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "'>");
                                        cartd.push("<span><i><img src='AssociatePhoto/" + ($(docs1).find("photo").text()) + "'  alt=''/></i></span></a></div></div>");
                                        flag = 1;
                                    }
                                    else { }
                                });
                            }
                        }
                    });
                    if (flag == 1)
                    { }
                    else {
                        cartd.push("<a href='ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=RealEstate'>");
                        cartd.push("<span><i><img src='images/icons/" + ($(docs).find("catImages").text()) + "'  alt=''/></i></span></a></div></div>");
                    }

                });
                // $("#Services").html(cartd.join(''));

            }
        },
        failure: function (response) {
            alert(response.d + "Fail");
        },
        error: function (response) {
            alert(response.d + "Error...");
        }
    });
    return cartd;
} 
function BindSalesCategoryCityWisennn(State, City) {
    var cartd = [];
    $.ajax({
        type: "POST", url: "Associate/ws/subCategory.asmx/SubCategories",
        data: "{'Categoryid':1}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            if (r.d.length > 0) {
                var xmlDoc = $.parseXML(r.d);
                var xml = $(xmlDoc);
                var docs = xml.find("subCategories");
                $.each(docs, function (i, docs) {
                    var flag = 0;
                    cartd.push(" <div class='col-sm-3 text-center block'>");
                    cartd.push(" <div class='fullrow innerblock'>");
                    cartd.push(" <h3>" + ($(docs).find("name").text()) + " </h3>");
                    $.ajax({
                        type: "POST", url: "ws/TopSearch.asmx/ViewAdvanceSearchCityStateWise", data: "{'State':'" + State + "','City':'" + City + "','SubCategory':" + ($(docs).find("id").text()) + "}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                        success: function (r1) {
                            if (r1.d.length > 0) {
                                var xmlDoc1 = $.parseXML(r1.d);
                                var xml1 = $(xmlDoc1);
                                var docs1 = xml1.find("GetCategoriesinfoCity");
                                $.each(docs1, function (i, docs1) {
                                    if ($(docs).find("id").text() == $(docs1).find("Subcategoryid").text()) {
                                        cartd.push("<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + $(docs1).find("Zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate'>");
                                        cartd.push("<span><i><img src='Associate/Adv_img/" + ($(docs1).find("advMainImage").text()) + "'  alt=''/></i></span></a></div></div>");
                                        flag = 1;
                                    }
                                    else { }
                                });
                            }
                        }
                    });
                    if (flag == 1)
                    { }
                    else {
                        cartd.push("<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate'>");
                        cartd.push("<span><i><img src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(docs).find("id").text()) + "'/></i></span></a></div></div>");
                    }
                });
            }
        },
        failure: function (response) {
            alert(response.d + "Fail");
        },
        error: function (response) {
            alert(response.d + "Error...");
        }
    });
    return cartd;
}

function BindSalesCategoryCityWise(State, City) {
    var cartd = [];
    $.ajax({
        type: "POST",
        url: "Associate/ws/subCategory.asmx/SubCategories",
        data: "{'Categoryid':1}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            if (r.d.length > 0) {
                var xmlDoc = $.parseXML(r.d);
                var xml = $(xmlDoc);
                var docs = xml.find("subCategories");
                $.each(docs, function (i, docs) {                   
                    var flag = 0;
                    cartd.push(" <div class='col-sm-3 text-center block'>");
                    cartd.push(" <div class='fullrow innerblock'>");
                    cartd.push(" <h3>" + ($(docs).find("name").text()) + " </h3>");
                    $.ajax({
                        type: "POST",
                        url: "ws/TopSearch.asmx/ViewAdvanceSearchCityStateWise",
                        data: "{'State':'" + State + "','City':'" + City + "','SubCategory':" + ($(docs).find("id").text()) + "}",
                        contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                        success: function (r1) {
                            if (r1.d.length > 0) {
                                var xmlDoc1 = $.parseXML(r1.d);
                                var xml1 = $(xmlDoc1);
                                var docs1 = xml1.find("GetCategoriesinfoCity");
                                $.each(docs1, function (i, docs1) {
                                    if ($(docs).find("id").text() == $(docs1).find("Subcategoryid").text()) {
                                        cartd.push("<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + $(docs1).find("Zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate'>");
                                        cartd.push("<span><i><img src='Associate/Adv_img/" + ($(docs1).find("advMainImage").text()) + "'  alt=''/></i></span></a></div></div>");
                                        flag = 1;
                                    }
                                    else { }
                                });
                            }
                        }
                    });
                    if (flag == 1)
                    { }
                    else {
                        cartd.push("<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate'>");
                        cartd.push("<span><i><img src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(docs).find("id").text()) + "'/></i></span></a></div></div>");
                    }
                });
            }
        },
        failure: function (response) {
            alert(response.d + "Fail");
        },
        error: function (response) {
            alert(response.d + "Error...");
        }
    });
    return cartd;
}

function BindServiesCategoryCityWise(State, City) {
    var cartd = [];
    $.ajax({
        type: "POST",
        url: "Associate/ws/Category.asmx/JobtypeWiseCategory",
        data: "{'flag':'1','jobtype':'2'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json", async: false,
        success: function (r) {
            if (r.d.length > 0) {
                var xmlDoc = $.parseXML(r.d);
                var xml = $(xmlDoc);
                var docs = xml.find("JobCategories");
                $.each(docs, function (i, docs) {
                    var flag = 0;
                    cartd.push("<div class='col-sm-3 text-center block'>");
                    cartd.push("<div class='fullrow innerblock'>");
                    cartd.push("<h3>" + ($(docs).find("categoryName").text()) + " </h3>");
                    $.ajax({
                        type: "POST", url: "ws/TopSearch.asmx/ViewAdvanceSearchServicesCityStateWise", data: "{'State':'" + State + "','City':'" + City + "','Category':" + ($(docs).find("ID").text()) + "}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                        success: function (r1) {
                            if (r1.d.length > 0) {
                                var xmlDoc1 = $.parseXML(r1.d);
                                var xml1 = $(xmlDoc1);
                                var docs1 = xml1.find("GetsubCategoriesinfoservices");
                                $.each(docs1, function (i, docs1) {
                                    if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
                                        //cartd.push("<a href='ServiceProfileList.html'>");                                       
                                        cartd.push("<a href='ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + $(docs1).find("zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "'>");
                                        cartd.push("<span><i><img src='AssociatePhoto/" + ($(docs1).find("photo").text()) + "'  alt=''/></i></span></a></div></div>");
                                        flag = 1;
                                    }
                                    else { }
                                });
                            }
                        }
                    });
                    if (flag == 1)
                    { }
                    else {
                        cartd.push("<a href='ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=0&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=RealEstate'>");
                        cartd.push("<span><i><img src='images/icons/" + ($(docs).find("catImages").text()) + "'  alt=''/></i></span></a></div></div>");
                    }
                });
                // $("#Services").html(cartd.join(''));
            }
        },
        failure: function (response) {
            alert(response.d + "Fail");
        },
        error: function (response) {
            alert(response.d + "Error...");
        }
    });

    return cartd;
}
