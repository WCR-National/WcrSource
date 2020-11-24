import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as $ from 'jquery';
import { MessageService } from '../../services/search';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesAdvertisementsService } from 'AngularAssociate/app/services/sales-advertisements/sales-advertisements.service';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { Toaster } from 'ngx-toast-notifications';
var SalesAdvertisementsComponent = /** @class */ (function () {
    function SalesAdvertisementsComponent(_messageService, router, salesAdvertisements, xmlToJson, route, modalService, toaster) {
        this._messageService = _messageService;
        this.router = router;
        this.salesAdvertisements = salesAdvertisements;
        this.xmlToJson = xmlToJson;
        this.route = route;
        this.modalService = modalService;
        this.toaster = toaster;
        this.isloadingIconVisible = true;
        this.count = 0;
        this.validationMessages = {
            'required': 'Please enter City, State OR Zip Code.',
            'invalidData': 'Invalid data entered.  Please enter city, state OR zip code.',
            'zipCode': 'Please enter 5 digit zip code',
            'invalidZipCode': 'Please enter valid zip code (digits only for zip code)',
            'statePattern': 'Please enter 2 characters for state like "TX".',
            'cityStatePattern': 'Please enter valid format like "Dallas, TX" OR "Dallas, Texas"'
        };
        this.formErrors = {
            'txtSearch': ''
        };
    }
    SalesAdvertisementsComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.show_check = true;
        //$('html, body').animate({ scrollTop: $('#header-container').offset().top }, 'slow');
        var tabPanes = document.getElementsByClassName("tab-headerr")[0].getElementsByTagName("div");
        var _loop_1 = function (i) {
            debugger;
            $(tabPanes[i]).on("click", function () {
                document.getElementsByClassName("tab-headerr")[0].getElementsByClassName("active")[0].classList.remove("active");
                tabPanes[i].classList.add("active");
                $(".tab-indicatorr").first().css("top", "calc(80px + " + i * 50 + "px)");
            });
        };
        for (var i = 0; i < tabPanes.length; i++) {
            _loop_1(i);
        }
        this.route.url.subscribe(function (data) {
            if (data.length <= 6) {
                // Get the last piece of the URL (it's either 'login' or 'register')
            }
            else {
                //page  not found
                // this.isSubmitting = false;
                return false;
            }
        });
        this.route.queryParams
            .subscribe(function (params) {
            // Defaults to 0 if no query param provided.
            //this.page = +params['page'] || 0;
            _this.category = params['ca'];
            _this.catName = params['catName'];
            _this.id = params['id'];
            _this.zipcode = params['zipcode'];
            _this.name = params['name'];
            _this.jtype = params['jtype'];
            _this.GetSalesAdvListings(_this.id, _this.zipcode, _this.name, _this.jtype, _this.catName);
        });
        this.checkUserIsLogin();
    };
    SalesAdvertisementsComponent.prototype.checkUserIsLogin = function () {
        var _this = this;
        this.salesAdvertisements
            .ConsumerIsLogin()
            .subscribe(function (data) {
            if (data.d == 0) {
                _this.isLoggedInValue = "0";
            }
            else {
                _this.isLoggedInValue = "1";
            }
        });
    };
    SalesAdvertisementsComponent.prototype.GetSalesAdvFromTabs = function (id) {
        this.isloadingIconVisible = true;
        this.ViewAdvertisements(id, this.zipcode, this.name, this.jtype, this.catName);
        //if (id == 1) {
        //    $('#homeId').addClass('active');
        //    $('#THId').removeClass('active');
        //    $('#MFId').removeClass('active');
        //    $('#landId').removeClass('active');
        //}
        //else if (id == 2) {
        //    $('#homeId').removeClass('active');
        //    $('#THId').addClass('active');
        //    $('#MFId').removeClass('active');
        //    $('#landId').removeClass('active');
        //}
        //else if (id == 3) {
        //    $('#homeId').removeClass('active');
        //    $('#THId').removeClass('active');
        //    $('#MFId').addClass('active');
        //    $('#landId').removeClass('active');
        //}
        //else if (id == 4) {
        //    $('#homeId').removeClass('active');
        //    $('#THId').removeClass('active');
        //    $('#MFId').removeClass('active');
        //    $('#landId').addClass('active');
        //}
    };
    SalesAdvertisementsComponent.prototype.GetSalesAdvListings = function (id, zipcode, name, jtype, catName) {
        this.isloadingIconVisible = true;
        this.ViewAdvertisements(id, zipcode, name, jtype, catName);
    };
    SalesAdvertisementsComponent.prototype.ViewAdvertisements = function (id, zipcode, name, jtype, catName) {
        var _this = this;
        if (jtype == 'Services') {
            $.ajax({
                type: "POST", url: "Associate/ws/SubCategory.asmx/SelectCatSubCategory",
                data: "{'flag':1,'Categoryid':" + id + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("CatSubCategories");
                        $.each(docs, function (i, docs) {
                            id = ($(docs).find("id").text());
                        });
                    }
                },
                error: function (response) {
                    //alert(response.d + "Error...");
                }
            });
        }
        this.salesAdvertisements
            .ViewHomeAdvertisementsWithParam(id, zipcode)
            .subscribe(function (data) {
            debugger;
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var json = _this.xmlToJson.xml2json(xmlDoc, "");
                var dataJson = JSON.parse(json);
                if (dataJson.NewDataSet != undefined && dataJson.NewDataSet != null && dataJson.NewDataSet != '') {
                    _this.dataServicesList = [];
                    if (dataJson.NewDataSet.HViewAdvertismentsWithParam != undefined && dataJson.NewDataSet.HViewAdvertismentsWithParam != null && dataJson.NewDataSet.HViewAdvertismentsWithParam != '') {
                        if (typeof (dataJson.NewDataSet.GetServicesList) == "object") { // Returns: "object"
                            _this.dataServicesList.push(dataJson.NewDataSet.HViewAdvertismentsWithParam);
                            _this.AddListOfSales(_this.dataServicesList);
                        }
                        else {
                            $.each(dataJson.NewDataSet.HViewAdvertismentsWithParam, function (index, item) {
                                this.dataServicesList.push(item);
                            });
                            _this.AddListOfSales(_this.dataServicesList);
                        }
                    }
                    _this.IsDataFound = true;
                }
                else {
                    _this.IsDataFound = false;
                }
                setTimeout(function () {
                    this.isloadingIconVisible = false;
                }, 1000);
            }
            else {
                _this.isloadingIconVisible = false;
            }
        });
    };
    SalesAdvertisementsComponent.prototype.AddListOfSales = function (dataSalesList) {
        $('#innerHtmlListServicesId').html('');
        var count = 0;
        var html = '';
        var thisStatus = this;
        $.each(dataSalesList, function (index, item) {
            html += '<div class="listing-item"  >';
            html += '<a href="javascript:void(0)" class="listing-img-container">';
            //<!--< div class="listing-badges" >
            //    <span>For Rent < /span>
            //        < /div>-->
            html += '<div class="listing-img-content" >';
            //html += '<span class="listing-price" > $ ' + item.cost + ' <i></i></span >';
            //<!--< span class="like-icon with-tip" data - tip - content="Add to Bookmarks" > </span>
            //    < span class="compare-button with-tip" data - tip - content="Add to Compare" > </span>-->
            html += '</div>';
            html += '<div class="listing-carousel" >';
            if (item.photo != undefined && item.photo != null && item.photo != "")
                html += '<div><img class="imageServices" src="../../../../Associate/Adv_img/"' + item.photo + ' alt=""></div>';
            //if (item.advImage1 == undefined && item.advImage1 != null && item.advImage1 != "")
            //    html += '<div><img src="../../../../Associate/Adv_img/"' + item.advMainImage + ' alt=""></div>';
            //if (item.advImage2 == undefined && item.advImage2 != null && item.advImage2 != "")
            //    html += '<div><img src="../../../../Associate/Adv_img/"' + item.advImage2 + ' alt=""></div>';
            //if (item.advImage3 == undefined && item.advImage3 != null && item.advImage3 != "")
            //    html += '<div><img src="../../../../Associate/Adv_img/"' + item.advImage3 + ' alt=""></div>';
            html += '</div>';
            html += '</a>';
            html += '<div class="listing-content">';
            html += '<div class="listing-title" >';
            html += '<h4><a href="javascript:void(0)" > ' + item.Name;
            html += '</a></h4>';
            //https://maps.google.com/maps?q=221B+Baker+Street,+London,+United+Kingdom&hl=en&t=v&hnear=221B+Baker+St,+London+NW1+6XE,+United+Kingdom
            html += '<a href="javascript:void(0);" class="listing-address popup-gmaps" >';
            html += '<i class="fa fa-map-marker" > </i>';
            html += item.cityID + ". " + item.StateID + ", " + item.zipcode;
            html += '</a>';
            if (thisStatus.isLoggedInValue == "0") {
                var params = thisStatus.id + "," + item.associateid + ",2," + item.zipcode + "," + count + ",1";
                html += '<a href = "javascript:void(0)" class="details button border" (click)="showInterestBookMark(' + params + ')" > Bookmark </a>';
            }
            else {
                html += '<a href = "javascript:void(0)" class="details button border" (click) = "SaveBookmark(' + thisStatus.id + ')" > Bookmark </a>';
            }
            //if (item.description.length > 150)
            //    html += '<div> ' + item.description.substring(0, 150) + "..." + '</div>';
            //else if (item.description.length < 150)
            //    html += '<div>' + item.description + '</div>';
            html += '</div>';
            html += '<ul class="listing-details" >';
            html += '<li><b>License #</b>: ' + item.LicenseId + '</li>';
            html += '<li><b> Associate ID </b>:' + item.associateid + '</li>';
            html += '<li><b> Category Name </b>: ' + thisStatus.catName + ' </li>';
            //if (item.subcategoryID == '1')
            //    html += '<li> Category Name: Home </li>';
            //if (item.subcategoryID == '2')
            //    html += '<li> Category Name: Town Home </li>';
            //if (item.subcategoryID == '3')
            //    html += '<li> Category Name: Multi Family </li>';
            //if (item.subcategoryID == '4')
            //    html += '<li> Category Name: Land </li>';
            html += '</ul>';
            html += '<div class="listing-footer" >';
            //{{  }}
            var strParamContactAssociateShowInterest = thisStatus.id + "," + item.associateid + ",2," + item.zipcode + "," + count + ",1";
            var strParamContactAssociate = thisStatus.id + "," + item.associateid + ",2," + item.zipcode + "," + count;
            if (thisStatus.isLoggedInValue == "0") {
                html += '<a href="javascript:void(0)" class="btn button border" (click) ="showInterestContactAssociates(' + strParamContactAssociateShowInterest + ')" > Contact Associates < /a>';
            }
            else {
                html += '<a href="javascript:void(0)" class="btn button border" (click) ="ContactAssociate(' + strParamContactAssociate + ')" > Contact Associates </a>';
            }
            html += '<span> Zip Code: ' + item.zipcode + '</span>';
            html += '</div>';
            html += '</div>';
            //{ { count + 1 } }
            html += '</div>';
            count++;
        });
        $('#innerHtmlListServicesId').html(html);
        //gridLayoutSwitcher();
    };
    SalesAdvertisementsComponent.prototype.ContactAssociate = function (advIdAndAssociateId, pnlID) {
        var _this = this;
        if (pnlID === void 0) { pnlID = 0; }
        this.salesAdvertisements
            .ConsumerIsLogin()
            .subscribe(function (data) {
            if (data.d > 0) {
                _this.salesAdvertisements
                    .CheckEmailAndPhNo()
                    .subscribe(function (data) {
                    if (_this.isLoggedInValue == "0") {
                    }
                    else if (_this.isLoggedInValue == "1") {
                        _this.ContactAssociates(advIdAndAssociateId);
                    }
                    else {
                        _this.showToast("danger", "You cannot contact this Associate at this time.");
                        _this.showToast("danger", "Your phone number and email address are required to contact an Associate.Please update your profile and enter your phone number.");
                    }
                }, function (err) {
                    return false;
                });
            }
            else {
                _this.showToast("danger", "You need to sign in");
                _this.onOpenModalClickAssociate(advIdAndAssociateId);
            }
        });
    };
    SalesAdvertisementsComponent.prototype.ContactAssociates = function (advIdAndAssociateId) {
        var _this = this;
        var _returnValue;
        var adverID;
        var associateID;
        var jobtypeID;
        var zipcode;
        var array = advIdAndAssociateId.split(",");
        for (var i in array) {
            if (parseInt(i) == 0) {
                if (array[parseInt(i)] == '') {
                }
                else {
                    adverID = array[parseInt(i)];
                }
            }
            else if (parseInt(i) == 1) {
                if (array[parseInt(i)] == '') {
                }
                else {
                    associateID = array[parseInt(i)];
                }
            }
            else if (parseInt(i) == 2) {
                if (array[parseInt(i)] == '') {
                }
                else {
                    jobtypeID = array[i];
                }
            }
            else if (parseInt(i) == 3) {
                if (array[parseInt(i)] == '') {
                }
                else {
                    zipcode = array[parseInt(i)];
                }
            }
        }
        this.salesAdvertisements
            .InsertConsumerInterest(adverID, associateID, jobtypeID, zipcode)
            .subscribe(function (data) {
            _this.salesAdvertisements
                .SendConsumerDetail(associateID, adverID, jobtypeID, zipcode)
                .subscribe(function (data1) {
                if (data.d == "1") {
                    //$("#msg" + pnlID).css("display", "block");
                    //setTimeout(function () {
                    //    window.location.reload();
                    //    //$('#msg' + pnlID).fadeOut('fast');
                    //}, 2000);
                }
                else if (data.d == "0") {
                    _this.showToast("danger", "Already exist");
                }
                else if (data.d == "3") {
                    _this.showToast("danger", "OOPS Error ! Please try again.");
                }
            });
        }, function (err) {
        });
    };
    SalesAdvertisementsComponent.prototype.SaveBookmark = function (advId) {
        var _this = this;
        this.salesAdvertisements
            .ConsumerIsLogin()
            .subscribe(function (data) {
            if (data.d == 0) {
                _this.salesAdvertisements
                    .UpdateSavedBookmarks(advId)
                    .subscribe(function (data) {
                    if (data.d == "0") {
                        $("#bookmarkId" + advId).prop("disabled", true);
                        _this.showToast('warning', "You have already saved this advertisement.");
                    }
                    else {
                        $("#bookmarkId" + advId).prop("disabled", true);
                        _this.showToast('success', "Advertisement bookmarked successfully.");
                    }
                }, function (err) {
                });
            }
            else {
                _this.showToast("danger", "You need to sign in");
                _this.onOpenModalClickSaveBookMark("saveBookmark", advId);
            }
        });
    };
    SalesAdvertisementsComponent.prototype.onOpenModalClickSaveBookMark = function (isSaveBookMarksOrContactAssociate, advId) {
        var _this = this;
        var modal = this.modalService.open(AuthModalComponent, { size: 'lg', backdrop: "static" });
        var modalComponent = modal.componentInstance;
        modal.componentInstance.dismissParentCall.subscribe(function (data) {
            console.log(data);
            if (isSaveBookMarksOrContactAssociate == "saveBookmark") {
                if (data == "update") {
                    _this.isLoggedInValue = "1";
                    _this.SaveBookmark(advId);
                }
                else {
                    _this.isLoggedInValue = "0";
                    _this.showToast('danger', "Something went wrong. Please try again. Refresh page");
                }
            }
        });
        modal.componentInstance.updateParentCall.subscribe(function (data) {
            debugger;
            _this.showToast('success', 'Purchasing is in process');
        });
    };
    SalesAdvertisementsComponent.prototype.onOpenModalClickAssociate = function (advIdnAndAssociateId) {
        var _this = this;
        var modal = this.modalService.open(AuthModalComponent, { size: 'lg', backdrop: "static" });
        var modalComponent = modal.componentInstance;
        modal.componentInstance.dismissParentCall.subscribe(function (data) {
            console.log(data);
            if (data == "update") {
                //book
                _this.isLoggedInValue = "1";
                _this.ContactAssociate(advIdnAndAssociateId);
            }
            else {
                _this.isLoggedInValue = "0";
                _this.showToast('danger', "Something went wrong. Please try again.");
            }
        });
        modal.componentInstance.updateParentCall.subscribe(function (data) {
            debugger;
            _this.showToast('success', 'Purchasing is in process');
        });
    };
    SalesAdvertisementsComponent.prototype.showToast = function (toastrType, text) {
        var type = toastrType;
        this.toaster.open({
            text: text,
            caption: type + ' notification',
            type: type,
            duration: 8000
        });
    };
    SalesAdvertisementsComponent = tslib_1.__decorate([
        Component({
            selector: 'sales-advertisement',
            templateUrl: './sales-advertisements.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [MessageService, Router, SalesAdvertisementsService, XMLToJSON,
            ActivatedRoute, NgbModal, Toaster])
    ], SalesAdvertisementsComponent);
    return SalesAdvertisementsComponent;
}());
export { SalesAdvertisementsComponent };
//# sourceMappingURL=sales-advertisements.component.js.map