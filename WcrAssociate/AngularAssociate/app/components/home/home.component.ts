import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

import * as $ from 'jquery';

import { SearchService, MessageService } from '../../services/search';
import { debug } from 'util';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
    isSearchingStart: boolean = false;
    isSearchingStartMatIcon: boolean = false;
    isSearching: boolean = false;
    searchForm: FormGroup;
    resultContent: boolean = false;
    errorMessage: string = "";
    show_check: boolean = false;
    @ViewChild('salesServicesFocus') divSalesServices: ElementRef;

    innerHtmlSales: string = '';
    innerHtmlServices: string = '';
    errorExist = false;
    routedZipcode = '';
    //'required': 'Please enter City, State OR Zip Code.',
    //'invalidData': 'Invalid data entered.  Please enter City, State OR Zip Code.',
    //'zipCode': 'Maximum length of zip code is 5 digit',
    //'invalidZipCode': 'Please enter valid zip code (digits Only for zip Code)',
    //'statePattern': 'Please enter 2 Characters for State like "TX".',
    //'cityStatePattern': 'Please enter valid city state like "Dallas, TX" OR "Dallas, Texas"'

    validationMessages = {
        'required': 'Please enter City, State OR Zip Code.',
        'invalidData': 'Invalid data entered.  Please enter city, state OR zip code.',
        'zipCode': 'Please enter 5 digit zip code',
        'invalidZipCode': 'Please enter valid zip code (digits only for zip code)',
        'statePattern': 'Please enter 2 characters for state like "TX".',
        'cityStatePattern': 'Please enter valid format like "Dallas, TX" OR "Dallas, Texas"'
    }
    formErrors = {
        'txtSearch': ''
    };

    constructor(private fb: FormBuilder, private renderer: Renderer2, private searchService: SearchService, @Inject(PLATFORM_ID) private platformId: Object, private _messageService: MessageService, private router: Router, ) {
        this._messageService.listen().subscribe((m: any) => {
            debugger;
            console.log(m);
            if (m == 'showAds') {
                this.GetSalesAdts();
            }
        })
    }

    ngOnInit() {
        debugger;
        //this.show_check = true;
        $('html, body').animate({ scrollTop: $('#header-container').offset().top }, 'slow');

        $('#divLandingPage').focus();
        //this.parallaxBG();
        this.routedZipcode = this._messageService.messageHidden.value;
        if (this.routedZipcode !== undefined && this.routedZipcode != "") {

            var thisStatus = this;
            setTimeout(function () {
                thisStatus.isSearchingStart = true;
                thisStatus.isSearchingStartMatIcon = true;
                thisStatus.searchForm.get('txtSearch').setValue(thisStatus.routedZipcode);
                thisStatus.bindSalesCategory(thisStatus.routedZipcode);
                thisStatus.bindServiesCategory(thisStatus.routedZipcode);
            }, 1000);

        }
        else {
            this.GetSalesAdts();
        }
        this.initializeFormsAndEvents();
    }

    ngOnDestroy() {
        this._messageService.messageHidden.value = "";
    }

    initializeFormsAndEvents() {

        this.searchForm = this.fb.group({
            txtSearch: ['', [Validators.required, validateSearchZipCode(this)]],
        });

        this.searchForm.get('txtSearch').valueChanges.subscribe((data) => {
            this.errorMessage = "";
        });

        this.searchForm.valueChanges.subscribe((data) => {
            this.logValidationErrors(this.searchForm);
        });
    }

    logValidationErrors(group: FormGroup = this.searchForm): void {

        this.errorExist = false;

        Object.keys(group.controls).forEach((key: string) => {
            const abstractControl = group.get(key);
            this.formErrors[key] = '';

            if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
                this.formErrors[key] = "";
                const messages = this.validationMessages;
                if (abstractControl.errors != null) {
                    for (const errorKey in abstractControl.errors) {
                        if (errorKey) {
                            if (messages[errorKey] !== undefined) {
                                this.formErrors[key] += messages[errorKey] + ' ';
                                this.errorExist = true;
                            }
                        }
                    }
                }
            }

            if (abstractControl instanceof FormGroup) {
                this.logValidationErrors(abstractControl);
            }
        });
    }

    onPressEnterSearchData() {
        if (!this.errorExist) {

            this.searching();
        }
        //if (txtSearch.value == "") {
        //    $("#lblfai").css("display", "block");
        //    $("#lblfai").text("Please enter City, State OR Zip Code.");
        //}
        //else {
        //$("#pageloader").css("display", "block");
        //$("#homeicon").css("display", "inline-block");
        //setTimeout(function () {
        // }, 500);
        //}
    }

    onClickSearch() {
        this.isSearchingStart = true;
        this.isSearchingStartMatIcon = true;

        if (!this.errorExist) {
            this.searching();
        }
    }

    searching() {

        this.resultContent = false;
        this.isSearchingStart = true;
        this.isSearchingStartMatIcon = true;

        //if (isPlatformBrowser(this.platformId)) {
        //    this.divSalesServices.nativeElement.focus();

        //    //this.myInput.nativeElement.focus();
        //}
        $//('#salesServicesDivId').focusin();
        $('html, body').animate({ scrollTop: $('#salesServicesDivId').offset().top }, 'slow');


        //focus the div which will show the result
        //show the loading icon

        let searchValue: string = this.searchForm.get('txtSearch').value;
        if ($.isNumeric(searchValue)) {
            let salesHtml;
            let servicesHtml;
            salesHtml = this.bindSalesCategory(searchValue);
            servicesHtml = this.bindServiesCategory(searchValue);
            //this.innerHtmlSales = salesHtml;
            //this.innerHtmlServices = servicesHtml;

        }
        else {
            if (searchValue.indexOf(',') != -1) {
                let State;
                let City;
                let salesHtml;
                let servicesHtml;
                let strSearchValue = searchValue.split(',');
                for (var i = 0; i < strSearchValue.length; i++) {
                    if (i == 0) {
                        City = strSearchValue[i];
                    }
                    else if (i == 1) {
                        State = $.trim(strSearchValue[i]);
                    }
                }

                //if (State.length == 2) {

                salesHtml = this.bindSalesCategoryCityWise(State, City);
                servicesHtml = this.bindServiesCategoryCityWise(State, City);

                //this.innerHtmlSales = salesHtml;
                //this.innerHtmlServices = servicesHtml;
                //console.log(this.innerHtmlSales);
                //console.log(this.innerHtmlServices);
                //}
                //else if (State.length >= 2) {
                //    $('html, body').animate({ scrollTop: $('#divLandingPage').offset().top }, 'slow');

                //    this.errorMessage = "Please enter 2 Characters for State.";
                //    this.isSearchingStart = false;

                //}
            }
            else {
                this.errorMessage = "Invalid data entered.  Please enter City, State OR Zip Code.";
                this.isSearchingStart = false;
                this.isSearchingStartMatIcon = false;


            }
        }
    }

    // Init
    parallaxBG() {

        $('.parallax').prepend('<div class="parallax-overlay"></div>');

        $(".parallax").each(function () {
            var attrImage = $(this).attr('data-background');
            var attrColor = $(this).attr('data-color');
            var attrOpacity = $(this).attr('data-color-opacity');

            if (attrImage !== undefined) {
                $(this).find(".parallax-overlay").css('background-image', 'url(' + attrImage + ')');
            }

            if (attrColor !== undefined) {
                $(this).find(".parallax-overlay").css('background-color', '' + attrColor + '');
            }


        });

    }


    //managed both in these both functions: By IPAddrss zipCode and user entered zipCode in search
    async bindSalesCategory(zipc, searchByIpOrtxtSearch = "txtSearch") {
        $('#innerHtmlSales').html("");
        this.innerHtmlSales = "";

        var innerHtmlSales = "";
        let thisHomePage = this;

        console.log('executed');

        thisHomePage.searchService
            .subCategoriesByZipcode(zipc)
            .subscribe(
                async data => {

                    if (data.d.length > 1) {
                        //var json = this.xml2json(xmlDoc,"");
                        //var docsJson = JSON.parse(json).NewDataSet.subCategories;

                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        const docs = xml.find("subCategories");
                        const results = await Promise.all(docs.map(t => thisHomePage.searchService.viewAdvanceSearchByZipcode(zipc, $(docs[t]).find("id").text())).ajaxSuccess(success => {
                            console.log("download : " + success);
                        }));

                        console.log(results);
                        $.each(docs, function (i, doc) {
                            var flag = 0;

                            //for (const doc in docs) {
                            $.each(results, function (i, data) {

                                if (data.d.length > 0 && data.d.includes('GetCategoriesinfo1')) {

                                    var xmlDoc1 = $.parseXML(data.d);
                                    var xml1 = $(xmlDoc1);
                                    var docs1 = xml1.find("GetCategoriesinfo1");
                                    console.log('executed');
                                    if ($(doc).find("id").text() == $(docs1[0]).find("Subcategoryid").text()) {


                                        innerHtmlSales += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center mg-t-30 pd-sm-r-0'>";
                                        innerHtmlSales += "   <div class='card-main white darken-1' >";

                                        $.each(docs1, function (i, doc1)
                                        //for (const doc1 in docs1)
                                        {
                                            console.log($(doc).find("id").text() + ',' + $(doc1).find("Subcategoryid").text())
                                            if ($(doc).find("id").text() == $(doc1).find("Subcategoryid").text()) {
                                                let l_id = ($(doc).find("id").text());
                                                let l_zipcode = zipc; //($(doc).find("Zipcode").text());
                                                let l_name = ($(doc).find("name").text());
                                                debugger;
                                                let queryToSalesAdvertisementList = { 'ca': '0', 'id': l_id, 'zipcode': l_zipcode, 'name': l_name, 'jtype': 'Sales', 'catName': 'RealEstate' };
                                                ////innerHtmlSales += "<a href='" + urlToSalesAdvertisementList + "'>";
                                                //innerHtmlSales += "<span><i><img src='../../../Associate/Adv_img/" + ($(doc1).find("advMainImage").text()) + "'  alt=''/></i></span></a>";
                                                //innerHtmlSales += "<h3 class='theme-text-color text-center'>" + ($(doc).find("name").text()) + "</h3>";

                                                //innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(doc).find("detail").text()) + "  </p>";
                                                //innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisementList + "'>View More</a></div></div>";

                                                innerHtmlSales += "     <div class='card-main-content pd-0-f card-main-image-section card-main-image-section' >";
                                                innerHtmlSales += "         <a class='salesLink' data-id='sales-advertisements'  data-qparam ='" + JSON.stringify(queryToSalesAdvertisementList) + "'><img class='card-main-image-size' src='../../../Associate/Adv_img/" + ($(doc1).find("advMainImage").text()) + "'  alt=''/></a>";
                                                innerHtmlSales += "     </div>";
                                                innerHtmlSales += '      <div class="card-main-content black-text pd-b-0-f">';
                                                innerHtmlSales += '         <span class="card-main-title">' + ($(doc).find("name").text()) + '</span>';
                                                innerHtmlSales += "         <p class='grey-text elipsis-text'>" + ($(doc).find("detail").text()) + "</p>";
                                                innerHtmlSales += "     </div>";
                                                innerHtmlSales += '       <div class="card-main-action text-center">';
                                                innerHtmlSales += "           <a class='waves-effect waves-light btn salesLink' data-id='sales-advertisements'  data-qparam ='" + JSON.stringify(queryToSalesAdvertisementList) + "'  >View More</a>";
                                                innerHtmlSales += '      </div>';
                                                flag = 1;
                                            }
                                        });
                                        innerHtmlSales += '   </div>';
                                        innerHtmlSales += "</div>";
                                    }
                                }
                                else {
                                }

                            });
                            if (!data.d.includes("GetCategoriesinfo1")) {
                                if (flag == 1) { }
                                else {
                                    debugger;
                                    let queryToSalesAdvertisementList = { 'ca': '0', 'id': ($(doc).find("id").text()), 'zipcode': zipc, 'name': ($(doc).find("name").text()), 'jtype': 'Sales', 'catName': 'RealEstate' };
                                    innerHtmlSales += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center mg-t-30 pd-sm-r-0'>";
                                    innerHtmlSales += "   <div class='card-main white darken-1' >";

                                    innerHtmlSales += "     <div class='card-main-content pd-0-f card-main-image-section' >";
                                    innerHtmlSales += "         <a class='salesLink'  data-id='sales-advertisements'  data-qparam ='" + JSON.stringify(queryToSalesAdvertisementList) + "'><img  class='image-size-icons-without-ip' src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(doc).find("id").text()) + "'  alt=''/></a>";
                                    innerHtmlSales += "     </div>";
                                    innerHtmlSales += '      <div class="card-main-content black-text pd-b-0-f">';
                                    innerHtmlSales += '         <span class="card-main-title">' + ($(doc).find("name").text()) + '</span>';
                                    innerHtmlSales += "         <p class='grey-text elipsis-text'>" + ($(doc).find('detail').text()) + "</p>";
                                    innerHtmlSales += "     </div>";
                                    innerHtmlSales += '       <div class="card-main-action text-center">';
                                    innerHtmlSales += "           <a class='waves-effect waves-light btn salesLink' data-id='sales-advertisements'  data-qparam ='" + JSON.stringify(queryToSalesAdvertisementList) + "'>View More</a>";
                                    innerHtmlSales += '      </div>';

                                    innerHtmlSales += '   </div>';
                                    innerHtmlSales += "</div>";

                                }
                            }

                        });
                        $('#innerHtmlSales').html(innerHtmlSales);
                        //thisHomePage.innerHtmlSales = innerHtmlSales;
                        //thisHomePage.innerHtmlSales = innerHtmlSales;
                        this.InitializeEvetsClick();
                        thisHomePage.resultContent = true;
                    }
                    else { }
                    thisHomePage.isSearchingStart = false;
                    thisHomePage.isSearchingStartMatIcon = false;

                },
                err => {
                thisHomePage.isSearchingStart = false;
                    thisHomePage.isSearchingStartMatIcon = false;
}
            );

    }

    async bindServiesCategory(zipc, searchByIpOrtxtSearch = "txtSearch") {
        //$('#innerHtmlServices').html("");
        this.innerHtmlServices = "";

        var innerHtmlServices = "";
        let thisHomePage = this;

        thisHomePage.searchService
            .getJobtypeWiseCategoryByZipcode()
            .subscribe(
                async data => {
                    if (data.d.length > 1) {

                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("JobCategories");

                        const results: any = await Promise.all(docs.map(t => thisHomePage.searchService.getViewAdvanceSearchForServices($(docs[t]).find("ID").text(), zipc)).ajaxSuccess(success => {
                            console.log("download : " + success);
                        }));
                        console.log(results);
                        $.each(docs, function (i, docs) {

                            var flag = 0;
                            var categoryId = $(docs).find("ID").text();
                            $.each(results, function (i, data) {

                                if (data.d.length > 0 && data.d.includes('GetCategoriesinfoservices')) {

                                    var xmlDoc1 = $.parseXML(data.d);
                                    var xml1 = $(xmlDoc1);
                                    var docs1 = xml1.find("GetCategoriesinfoservices");
                                    if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
                                        innerHtmlServices += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center mg-t-30 pd-sm-r-0'>";
                                        innerHtmlServices += "  <div class='card-main white darken-1' >";
                                        $.each(docs1, function (i, docs1) {
                                            if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {

                                                console.log('entered in ' + searchByIpOrtxtSearch);
                                                let qParamsToServiceProfileList = { ca: 0, id: ($(docs).find("ID").text()), zipcode: zipc, name: ($(docs).find("name").text()), jtype: 'Services', catName: ($(docs).find("categoryName").text()) };

                                                ////innerHtmlServices += "<a href='" + urlToServiceProfileList + "'>";
                                                //innerHtmlServices += "<span><i><img src='../../../AssociatePhoto/" + ($(docs1).find("photo").text()) + "'  alt=''/></i></span>";
                                                //innerHtmlServices += " <h3 class='theme-text-color'>" + ($(docs).find("categoryName").text()) + " </h3>";
                                                //innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("Detail").text()) + "  </p>";
                                                //innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToServiceProfileList + "'>View More</a></div></div>";

                                                innerHtmlServices += "     <div class='card-main-content pd-0-f card-main-image-section' >";
                                                innerHtmlServices += "         <a class='servicesLink' data-id='service-profile' data-qparam='" + JSON.stringify(qParamsToServiceProfileList) + "'><img class='card-main-image-size' src='../../../AssociatePhoto/" + ($(docs1).find("photo").text()) + "'  alt=''/></a>";
                                                innerHtmlServices += "     </div>";
                                                innerHtmlServices += '      <div class="card-main-content black-text pd-b-0-f">';
                                                innerHtmlServices += '         <span class="card-main-title">' + ($(docs).find("categoryName").text()) + '</span>';
                                                innerHtmlServices += "         <p class='grey-text elipsis-text'>" + ($(docs).find("Detail").text()) + "</p>";
                                                innerHtmlServices += "     </div>";
                                                innerHtmlServices += '       <div class="card-main-action text-center">';
                                                innerHtmlServices += "           <a class='waves-effect waves-light btn servicesLink' data-id='service-profile' data-qparam='" + JSON.stringify(qParamsToServiceProfileList) + "'>View More</a>";
                                                innerHtmlServices += '      </div>';

                                                flag = 1;
                                            }
                                            else { }
                                        });
                                        innerHtmlServices += '   </div>';
                                        innerHtmlServices += "</div>";
                                    }
                                    else { }
                                }
                                else {


                                }
                            });

                            if (!data.d.includes("GetCategoriesinfoservices")) {
                                if (flag == 1) { }
                                else {

                                    let qParamsToServiceProfileList = { ca: 0, id: ($(docs).find("ID").text()), zipcode: zipc, name: ($(docs).find("name").text()), jtype: 'Services', catName: 'RealEstate' };
                                    //innerHtmlServices += " <div class='col-sm-3 text-center block '>";
                                    //innerHtmlServices += " <div class='fullrow innerblock card-main pd-20 mg-b-30'>";
                                    //innerHtmlServices += "<span><i><img src='images/icons/" + ($(docs).find("catImages").text()) + "'  alt=''/></i></span>";
                                    //innerHtmlServices += " <h3 class='theme-text-color'>" + ($(docs).find("categoryName").text()) + " </h3>";
                                    //innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("Detail").text()) + "</p>";
                                    //innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToServiceProfileList + "'>View More</a></div></div>";

                                    innerHtmlServices += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center mg-t-30 pd-sm-r-0'>";
                                    innerHtmlServices += "  <div class='card-main white darken-1' >";

                                    innerHtmlServices += "     <div class='card-main-content pd-0-f card-main-image-section' >";
                                    innerHtmlServices += "         <a class='servicesLink'  data-id='service-profile' data-qparam='" + JSON.stringify(qParamsToServiceProfileList) + "'><img class='image-size-icons-without-ip' src='images/icons/" + ($(docs).find("catImages").text()) + "'  alt=''/></a>";
                                    innerHtmlServices += "     </div>";
                                    innerHtmlServices += '      <div class="card-main-content black-text pd-b-0-f">';
                                    innerHtmlServices += '         <span class="card-main-title">' + ($(docs).find("categoryName").text()) + '</span>';
                                    innerHtmlServices += "         <p class='grey-text elipsis-text'>" + ($(docs).find("Detail").text()) + "</p>";
                                    innerHtmlServices += "     </div>";
                                    innerHtmlServices += '       <div class="card-main-action text-center">';
                                    innerHtmlServices += "           <a class='waves-effect waves-light btn servicesLink' data-id='service-profile' data-qparam='" + JSON.stringify(qParamsToServiceProfileList) + "'>View More</a>";
                                    innerHtmlServices += '      </div>';
                                    innerHtmlServices += '   </div>';
                                    innerHtmlServices += "</div>";

                                }
                            }



                        });
                        //thisHomePage.innerHtmlServices = innerHtmlServices;

                        $('#innerHtmlServices').html(innerHtmlServices);
                        this.InitializeEventsClickServices();
                        //thisHomePage. = innerHtmlServices;
                        thisHomePage.resultContent = true;
                    }
                    else { }
                    thisHomePage.isSearchingStart = false;
                    thisHomePage.isSearchingStartMatIcon = false;


                },
                err => {
                thisHomePage.isSearchingStart = false;
                    thisHomePage.isSearchingStartMatIcon = false;
}
            );
    }


    async bindSalesCategoryCityWise(state, city) {
        var innerHtmlSales = "";
        this.innerHtmlSales = "";

        let thisHomePage = this;

        thisHomePage.searchService
            .getSalesCategoryCityWise(state, city)
            .subscribe(
                async data => {
                    if (data.d.length > 1) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("subCategories");
                        var subCategoryId = $(docs).find("id").text();

                        const results: any = await Promise.all(docs.map(t => thisHomePage.searchService.getAdvanceSearchCityStateWise(state, city, $(docs[t]).find("id").text())).ajaxSuccess(success => {
                            console.log("download : " + success);
                        }));
                        console.log(results);
                        $.each(docs, function (i, docs) {

                            var flag = 0;
                            var subCategoryId = $(docs).find("id").text();
                            $.each(results, function (i, data) {

                                //thisHomePage.searchService
                                //    .getAdvanceSearchCityStateWise(state, city, subCategoryId)
                                //    .then(
                                //        (data: any) => {

                                if (data.d.length > 0 && data.d.includes('GetCategoriesinfoCity')) {

                                    var xmlDoc1 = $.parseXML(data.d);
                                    var xml1 = $(xmlDoc1);
                                    var docs1 = xml1.find("GetCategoriesinfoCity");

                                    if ($(docs).find("id").text() == $(docs1).find("Subcategoryid").text()) {

                                        innerHtmlSales += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center mg-t-30 pd-sm-r-0'>";
                                        innerHtmlSales += "  <div class='card-main white darken-1' >";

                                        $.each(docs1, function (i, docs1) {
                                            if ($(docs).find("id").text() == $(docs1).find("Subcategoryid").text()) {

                                                let queryToSalesAdvertisementList = { 'ca': '0', 'id': ($(docs).find("id").text()), 'zipcode': $(docs1).find("Zipcode").text(), 'name': ($(docs).find("name").text()), 'jtype': 'Sales', 'catName': 'RealEstate' };

                                                //innerHtmlSales += "<a href='" + urlToSalesAdvertisement + "'>";

                                                //innerHtmlSales += "<span><i><img src='../../../Associate/Adv_img/" + ($(docs1).find("advMainImage").text()) + "'  alt=''/></i></span>";
                                                //innerHtmlSales += " <h3 class='theme-text-color'>" + ($(docs).find("name").text()) + " </h3>";

                                                //innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("detail").text()) + "</p>";
                                                //innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a></div></div>";


                                                innerHtmlSales += "     <div class='card-main-content pd-0-f card-main-image-section' >";
                                                innerHtmlSales += "         <a class='salesLink'  data-id='sales-advertisements'  data-qparam ='" + JSON.stringify(queryToSalesAdvertisementList) + "'><img class='card-main-image-size' src='../../../Associate/Adv_img/" + ($(docs1).find("advMainImage").text()) + "'  alt=''/></a>";
                                                innerHtmlSales += "     </div>";
                                                innerHtmlSales += '      <div class="card-main-content black-text pd-b-0-f">';
                                                innerHtmlSales += '         <span class="card-main-title">' + ($(docs).find("name").text()) + '</span>';
                                                innerHtmlSales += "         <p class='grey-text elipsis-text'>" + ($(docs).find("detail").text()) + "</p>";
                                                innerHtmlSales += "     </div>";
                                                innerHtmlSales += '       <div class="card-main-action text-center">';
                                                innerHtmlSales += "           <a class='waves-effect waves-light btn salesLink' data-id='sales-advertisements'  data-qparam ='" + JSON.stringify(queryToSalesAdvertisementList) + "'>View More</a>";
                                                innerHtmlSales += '      </div>';



                                                flag = 1;
                                            }
                                            else { }
                                        });
                                        innerHtmlSales += '   </div>';
                                        innerHtmlSales += '   </div>';
                                    }

                                }
                                else {


                                }


                            }
                                //,
                                //err => {
                                //    thisHomePage.isSearchingStart = false;
                                //}
                            );
                            if (!data.d.includes('GetCategoriesinfoCity')) {
                                if (flag == 1) { }
                                else {
                                    //innerHtmlSales += " <div class='col-sm-3 text-center block '>";
                                    //innerHtmlSales += " <div class='fullrow innerblock card-main pd-20 mg-b-30'>";

                                    let queryToSalesAdvertisementList = { 'ca': '0', 'id': ($(docs).find("id").text()), 'name': ($(docs).find("name").text()), 'jtype': 'Sales', 'catName': 'RealEstate' };
                                    //innerHtmlSales += "<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate'>";
                                    //innerHtmlSales += "<span><i><img src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(docs).find("id").text()) + "'/></i></span>";
                                    //innerHtmlSales += " <h3 class='theme-text-color'>" + ($(docs).find("name").text()) + " </h3>";

                                    //innerHtmlSales += "</a><p class='grey-text elipsis-text' style = 'text-align:left;' > " + ($(docs).find("detail").text()) + " </p>";
                                    //innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a></div></div>";



                                    innerHtmlSales += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center mg-t-30 pd-sm-r-0'>";
                                    innerHtmlSales += "  <div class='card-main white darken-1' >";

                                    innerHtmlSales += "     <div class='card-main-content pd-0-f card-main-image-section' >";
                                    innerHtmlSales += "         <a class='salesLink'  data-id='sales-advertisements'  data-qparam ='" + JSON.stringify(queryToSalesAdvertisementList) + "'><img  class='image-size-icons-without-ip' src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(docs).find("id").text()) + "'  alt=''/></a>";
                                    innerHtmlSales += "     </div>";
                                    innerHtmlSales += '      <div class="card-main-content black-text pd-b-0-f">';
                                    innerHtmlSales += '         <span class="card-main-title">' + ($(docs).find("name").text()) + '</span>';
                                    innerHtmlSales += "         <p class='grey-text elipsis-text'>" + ($(docs).find("detail").text()) + "</p>";
                                    innerHtmlSales += "     </div>";
                                    innerHtmlSales += '       <div class="card-main-action text-center">';
                                    innerHtmlSales += "           <a class='waves-effect waves-light btn salesLink' data-id='sales-advertisements'  data-qparam ='" + JSON.stringify(queryToSalesAdvertisementList) + "'>View More</a>";
                                    innerHtmlSales += '      </div>';

                                    innerHtmlSales += '   </div>';
                                    innerHtmlSales += "</div>";


                                }
                            }


                        });

                        $('#innerHtmlSales').html(innerHtmlSales);
                        //thisHomePage.innerHtmlSales = innerHtmlSales;
                        thisHomePage.InitializeEvetsClick();

                        thisHomePage.resultContent = true;
                    }
                    else { }
                    thisHomePage.isSearchingStart = false;
                    thisHomePage.isSearchingStartMatIcon = false;


                },
                err => {
                    thisHomePage.isSearchingStart = false;
                    thisHomePage.isSearchingStartMatIcon = false;

                }
            );
    }

    async bindServiesCategoryCityWise(state, city) {
        var innerHtmlServices = "";
        this.innerHtmlServices = "";

        let thisHomePage = this;

        thisHomePage.searchService
            .getServicesCategoryCityWise(state, city)
            .subscribe(
                async data => {
                    if (data.d.length > 1) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("JobCategories");

                        const results: any = await Promise.all(docs.map(t => thisHomePage.searchService.getAdvanceSearchServicesCityStateWise(state, city, $(docs[t]).find("ID").text())).ajaxSuccess(success => {
                            console.log("download : " + success);
                        }));

                        $.each(docs, function (i, docs) {
                            var flag = 0;
                            var subCategoryId = $(docs).find("ID").text();

                            $.each(results, function (i, data) {

                                //thisHomePage.searchService
                                //    .getAdvanceSearchServicesCityStateWise(state, city, subCategoryId)
                                //    .then(
                                //        (data: any) => {

                                if (data.d.length > 0 && data.d.includes('GetsubCategoriesinfoservices')) {

                                    var xmlDoc1 = $.parseXML(data.d);
                                    var xml1 = $(xmlDoc1);
                                    var docs1 = xml1.find("GetsubCategoriesinfoservices");
                                    if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {

                                        innerHtmlServices += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center pd-sm-r-0'>";
                                        innerHtmlServices += "  <div class='card-main white darken-1' >";

                                        $.each(docs1, function (i, docs1) {
                                            if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
                                                let qParamsToServiceProfileList = { ca: 0, id: ($(docs).find("ID").text()), zipcode: $(docs1).find("zipcode").text(), name: ($(docs).find("name").text()), jtype: 'Services', catName: ($(docs).find("categoryName").text()) };

                                                //innerHtmlServices += "<a href='" + urlToSalesAdvertisement + "'>";
                                                //innerHtmlServices += "<span><i><img src='../../../AssociatePhoto/" + ($(docs1).find("photo").text()) + "'  alt=''/></i></span></a>";
                                                //innerHtmlServices += " <h3 class='theme-text-color'>" + ($(docs).find("categoryName").text()) + " </h3>";

                                                //innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("detail").text()) + "</p>";
                                                //innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a></div></div>";




                                                innerHtmlServices += "     <div class='card-main-content pd-0-f card-main-image-section' >";
                                                innerHtmlServices += "         <a  class='servicesLink' data-id='service-profile' data-qparam='" + JSON.stringify(qParamsToServiceProfileList) + "'><img class='card-main-image-size' src='../../../AssociatePhoto/" + ($(docs1).find("photo").text()) + "'  alt=''/></a>";
                                                innerHtmlServices += "     </div>";
                                                innerHtmlServices += '      <div class="card-main-content black-text pd-b-0-f">';
                                                innerHtmlServices += '         <span class="card-main-title">' + ($(docs).find("categoryName").text()) + '</span>';
                                                innerHtmlServices += "         <p class='grey-text elipsis-text'>" + ($(docs).find("Detail").text()) + "</p>";
                                                innerHtmlServices += "     </div>";
                                                innerHtmlServices += '       <div class="card-main-action text-center">';
                                                innerHtmlServices += "           <a class='waves-effect waves-light btn servicesLink' data-id='service-profile' data-qparam='" + JSON.stringify(qParamsToServiceProfileList) + "'>View More</a>";
                                                innerHtmlServices += '      </div>';



                                                flag = 1;
                                            }
                                            else { }
                                        });
                                        innerHtmlServices += '   </div>';
                                        innerHtmlServices += "</div>";
                                    }
                                    else {

                                    }
                                }
                                else {
                                    if (flag == 1) { }
                                    else {


                                    }
                                }
                            }
                                //,
                                //    err => {
                                //        thisHomePage.isSearchingStart = false;
                                //    }
                            );
                            if (!data.d.includes('GetsubCategoriesinfoservices')) {
                                if (flag == 1) { }
                                else {

                                    innerHtmlServices += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center pd-sm-r-0'>";
                                    innerHtmlServices += "  <div class='card-main white darken-1' >";

                                    let qParamsToServiceProfileList = { ca: 0, id: ($(docs).find("ID").text()), zipcode: 0, name: ($(docs).find("name").text()), jtype: 'Services', catName: 'RealEstate' };

                                    //innerHtmlSales += "<a href=''>";
                                    //innerHtmlServices += "<span><i><img src='images/icons/" + ($(docs).find("catImages").text()) + "'/></i></span>";
                                    ////innerHtmlServices += "</a>";
                                    //innerHtmlServices += " <h3 class='theme-text-color'>" + ($(docs).find("categoryName").text()) + " </h3>";

                                    //innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("detail").text()) + "</p>";
                                    //innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a></div></div>";



                                    innerHtmlServices
                                    innerHtmlServices += "     <div class='card-main-content pd-0-f card-main-image-section' >";
                                    innerHtmlServices += "         <a class='servicesLink'  data-id='service-profile' data-qparam='" + JSON.stringify(qParamsToServiceProfileList) + "'><img class='image-size-icons-without-ip' src='images/icons/" + ($(docs).find("catImages").text()) + "'/></a>";
                                    innerHtmlServices += "     </div>";
                                    innerHtmlServices += '      <div class="card-main-content black-text pd-b-0-f">';
                                    innerHtmlServices += '         <span class="card-main-title">' + ($(docs).find("categoryName").text()) + '</span>';
                                    innerHtmlServices += "         <p class='grey-text elipsis-text'>" + ($(docs).find("Detail").text()) + "</p>";
                                    innerHtmlServices += "     </div>";
                                    innerHtmlServices += '       <div class="card-main-action text-center">';
                                    innerHtmlServices += "           <a class='waves-effect waves-light btn servicesLink' data-id='service-profile' data-qparam='" + JSON.stringify(qParamsToServiceProfileList) + "'>View More</a>";
                                    innerHtmlServices += '      </div>';
                                    innerHtmlServices
                                    innerHtmlServices += '   </div>';
                                    innerHtmlServices += "</div>";
                                }
                            }

                        });
                        $('#innerHtmlServices').html(innerHtmlServices);
                        this.InitializeEventsClickServices();                        //thisHomePage.innerHtmlServices = innerHtmlServices;
                        thisHomePage.resultContent = true;
                    }
                    else { }
                    thisHomePage.isSearchingStart = false;
                    thisHomePage.isSearchingStartMatIcon = false;
                },
                err => {
                    thisHomePage.isSearchingStart = false;
                    thisHomePage.isSearchingStartMatIcon = false;
                }
            );
    }


    public async GetSalesAdts() {
        debugger;
        this.resultContent = false;
        this.isSearchingStartMatIcon = false;
        this.isSearchingStart = true;
        if ($('#salesServicesDivId') == null) {
            this.router.navigateByUrl('/');
        }
        // $('html, body').animate({ scrollTop: $('#salesServicesDivId').offset().top }, 'slow');

        const globalThis = this;
        $.getJSON("https://jsonip.com?callback=?", function (data) {
            var _IPAddress = data.ip;

            if (_IPAddress.length > 0) {
                globalThis.searchService.
                    attemptGetZipCodeByIPAddress(_IPAddress)
                    .then(
                        (data: any) => {
                            if (data.d.length > 0) {
                                globalThis.searchForm.get('txtSearch').setValue(data.d);
                                globalThis.bindSalesCategory(data.d, "ip");
                                globalThis.bindServiesCategory(data.d, "ip");
                            }
                        }
                    )
            }
            else {
                return null;
            }
            this.isSearchingStart = false;
            this.resultContent = true;

            console.log(_IPAddress);
        });

        //await this.searchService
        //    .attemptGetSalesAdts()
        //    .then(
        //        (data: any) => {


        //        },
        //        err => {
        //            this.isSearchingStart = false;

        //            return null;
        //        }
        //    );
    }

    async bindSalesCategoryByIP(zipc, searchByIpOrtxtSearch = "txtSearch")
    {
        $('#innerHtmlSales').html("");
        this.innerHtmlSales = "";

        var innerHtmlSales = "";
        let thisHomePage = this;

        console.log('executed');

        thisHomePage.searchService
            .subCategoriesByZipcode(zipc)
            .subscribe(
                async data => {
                    if (data.d.length > 1) {
                        //var json = this.xml2json(xmlDoc,"");
                        //var docsJson = JSON.parse(json).NewDataSet.subCategories;

                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        const docs = xml.find("subCategories");
                        const results = await Promise.all(docs.map(t => thisHomePage.searchService.viewAdvanceSearchByZipcode(zipc, $(docs[t]).find("id").text())).ajaxSuccess(success => {
                            console.log("download : " + success);
                        }));

                        console.log(results);
                        $.each(docs, function (i, doc) {
                            debugger;
                            innerHtmlSales += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center pd-sm-r-0'>";
                            innerHtmlSales += " <div class='fullrow innerblock card-main pd-20 mg-b-30' >";

                            //innerHtmlSales = "<p>" + ($(doc).find("name").text()) + "  </p>";
                            let queryToSalesAdvertisementList = { 'ca': '0', 'id': ($(doc).find("id").text()), 'zipcode': zipc, 'name': ($(doc).find("name").text()), 'jtype': 'Sales', 'catName': 'RealEstate' };
                            innerHtmlSales += "<a class='salesLink'  data-id='sales-advertisements'  data-qparam ='" + JSON.stringify(queryToSalesAdvertisementList) + "'><span><i><img class='image-size-icons' src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(doc).find("id").text()) + "'  alt=''/></i></span></a>";
                            innerHtmlSales += "<h3 class='theme-text-color' >" + ($(doc).find("name").text()) + "</h3>";
                            innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(doc).find("detail").text()) + "  </p>";
                            innerHtmlSales += "<a class='waves-effect waves-light btn salesLink' data-id='sales-advertisements'  data-qparam ='" + JSON.stringify(queryToSalesAdvertisementList) + "'>View More</a></div></div>";

                        });
                        $('#innerHtmlSales').html(innerHtmlSales);
                        //thisHomePage.innerHtmlSales = innerHtmlSales;
                        //thisHomePage.innerHtmlSales = innerHtmlSales;
                        thisHomePage.InitializeEvetsClick();
                        thisHomePage.resultContent = true;
                    }
                    else { }
                    thisHomePage.isSearchingStart = false;
                },
                err => { thisHomePage.isSearchingStart = false; }
            );

    }

    async bindServiesCategoryByIP(zipc, searchByIpOrtxtSearch = "txtSearch") {
        //$('#innerHtmlServices').html("");
        this.innerHtmlServices = "";

        var innerHtmlServices = "";
        let thisHomePage = this;

        thisHomePage.searchService
            .getJobtypeWiseCategoryByZipcode()
            .subscribe(
                async data => {
                    if (data.d.length > 1) {

                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("JobCategories");

                        const results: any = await Promise.all(docs.map(t => thisHomePage.searchService.getViewAdvanceSearchForServices($(docs[t]).find("ID").text(), zipc)).ajaxSuccess(success => {
                            console.log("download : " + success);
                        }));
                        console.log(results);
                        debugger;
                        $.each(docs, function (i, docs) {

                            var flag = 0;
                            var categoryId = $(docs).find("ID").text();

                            innerHtmlServices += " <div class='col-sm-3 text-center block '>";
                            innerHtmlServices += " <div class='fullrow innerblock card-main pd-20 mg-b-30 pd-t-35'>";
                            let qParamsToServiceProfileList = { ca: 0, id: ($(docs).find("ID").text()), zipcod: zipc, name: ($(docs).find("name").text()), jtype: 'Services', catName: ($(docs).find("categoryName").text()) };
                            innerHtmlServices += "<a class='servicesLink'  data-id='service-profile' data-qparam='" + JSON.stringify(qParamsToServiceProfileList) + "'><span><i><img class='image-size-icons' src='images/icons/" + ($(docs).find("catImages").text()) + "'  alt=''/></i></span></a>";
                            innerHtmlServices += " <h3 class='theme-text-color' >" + ($(docs).find("categoryName").text()) + " </h3>";
                            innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("Detail").text()) + "  </p>";
                            innerHtmlServices += "<a class='waves-effect waves-light btn  servicesLink' data-id='service-profile' data-qparam='" + JSON.stringify(qParamsToServiceProfileList) + "'>View More</a></div></div>";

                        });
                        //thisHomePage.innerHtmlServices = innerHtmlServices;

                        $('#innerHtmlServices').html(innerHtmlServices);
                        this.InitializeEventsClickServices();
                        //thisHomePage. = innerHtmlServices;
                        thisHomePage.resultContent = true;
                    }
                    else { }
                    thisHomePage.isSearchingStart = false;

                },
                err => { thisHomePage.isSearchingStart = false; }
            );
    }

    xml2json(xml, tab) {
        var X = {
            toObj: function (xml) {
                var o = {};
                if (xml.nodeType == 1) {   // element node ..
                    if (xml.attributes.length)   // element with attributes  ..
                        for (var i = 0; i < xml.attributes.length; i++)
                            o["@" + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
                    if (xml.firstChild) { // element has child nodes ..
                        var textChild = 0, cdataChild = 0, hasElementChild = false;
                        for (var n = xml.firstChild; n; n = n.nextSibling) {
                            if (n.nodeType == 1) hasElementChild = true;
                            else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                            else if (n.nodeType == 4) cdataChild++; // cdata section node
                        }
                        if (hasElementChild) {
                            if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                                X.removeWhite(xml);
                                for (var n = xml.firstChild; n; n = n.nextSibling) {
                                    if (n.nodeType == 3)  // text node
                                        o["#text"] = X.escape(n.nodeValue);
                                    else if (n.nodeType == 4)  // cdata node
                                        o["#cdata"] = X.escape(n.nodeValue);
                                    else if (o[n.nodeName]) {  // multiple occurence of element ..
                                        if (o[n.nodeName] instanceof Array)
                                            o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                        else
                                            o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                                    }
                                    else  // first occurence of element..
                                        o[n.nodeName] = X.toObj(n);
                                }
                            }
                            else { // mixed content
                                if (!xml.attributes.length)
                                    o = X.escape(X.innerXml(xml));
                                else
                                    o["#text"] = X.escape(X.innerXml(xml));
                            }
                        }
                        else if (textChild) { // pure text
                            if (!xml.attributes.length)
                                o = X.escape(X.innerXml(xml));
                            else
                                o["#text"] = X.escape(X.innerXml(xml));
                        }
                        else if (cdataChild) { // cdata
                            if (cdataChild > 1)
                                o = X.escape(X.innerXml(xml));
                            else
                                for (var n = xml.firstChild; n; n = n.nextSibling)
                                    o["#cdata"] = X.escape(n.nodeValue);
                        }
                    }
                    if (!xml.attributes.length && !xml.firstChild) o = null;
                }
                else if (xml.nodeType == 9) { // document.node
                    o = X.toObj(xml.documentElement);
                }
                else
                    alert("unhandled node type: " + xml.nodeType);
                return o;
            },
            toJson: function (o, name, ind) {
                var json = name ? ("\"" + name + "\"") : "";
                if (o instanceof Array) {
                    for (var i = 0, n = o.length; i < n; i++)
                        o[i] = X.toJson(o[i], "", ind + "\t");
                    json += (name ? ":[" : "[") + (o.length > 1 ? ("\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind) : o.join("")) + "]";
                }
                else if (o == null)
                    json += (name && ":") + "null";
                else if (typeof (o) == "object") {
                    var arr = [];
                    for (var m in o)
                        arr[arr.length] = X.toJson(o[m], m, ind + "\t");
                    json += (name ? ":{" : "{") + (arr.length > 1 ? ("\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind) : arr.join("")) + "}";
                }
                else if (typeof (o) == "string")
                    json += (name && ":") + "\"" + o.toString() + "\"";
                else
                    json += (name && ":") + o.toString();
                return json;
            },
            innerXml: function (node) {
                var s = ""
                if ("innerHTML" in node)
                    s = node.innerHTML;
                else {
                    var asXml = function (n) {
                        var s = "";
                        if (n.nodeType == 1) {
                            s += "<" + n.nodeName;
                            for (var i = 0; i < n.attributes.length; i++)
                                s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
                            if (n.firstChild) {
                                s += ">";
                                for (var c = n.firstChild; c; c = c.nextSibling)
                                    s += asXml(c);
                                s += "</" + n.nodeName + ">";
                            }
                            else
                                s += "/>";
                        }
                        else if (n.nodeType == 3)
                            s += n.nodeValue;
                        else if (n.nodeType == 4)
                            s += "<![CDATA[" + n.nodeValue + "]]>";
                        return s;
                    };
                    for (var c = node.firstChild; c; c = c.nextSibling)
                        s += asXml(c);
                }
                return s;
            },
            escape: function (txt) {
                return txt.replace(/[\\]/g, "\\\\")
                    .replace(/[\"]/g, '\\"')
                    .replace(/[\n]/g, '\\n')
                    .replace(/[\r]/g, '\\r');
            },
            removeWhite: function (e) {
                e.normalize();
                for (var n = e.firstChild; n;) {
                    if (n.nodeType == 3) {  // text node
                        if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                            var nxt = n.nextSibling;
                            e.removeChild(n);
                            n = nxt;
                        }
                        else
                            n = n.nextSibling;
                    }
                    else if (n.nodeType == 1) {  // element node
                        X.removeWhite(n);
                        n = n.nextSibling;
                    }
                    else                      // any other node
                        n = n.nextSibling;
                }
                return e;
            }
        };
        if (xml.nodeType == 9) // document node
            xml = xml.documentElement;
        var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
        return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
    }

    sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }

    InitializeEvetsClick() {
        debugger;
        var thisStatus = this;
        setTimeout(function () {
            $('.salesLink').click(function () {
                debugger;

                let link = $(this).attr('data-id');
                let params = JSON.parse($(this).attr('data-qparam'));
                thisStatus.router.navigate([link], {
                    queryParams: params
                });
            });
        }, 1500);

    }

    InitializeEventsClickServices() {
        debugger;
        var thisStatus = this;
        setTimeout(function () {
            $('.servicesLink').click(function () {
                let link = $(this).attr('data-id');
                let params = JSON.parse($(this).attr('data-qparam'));
                thisStatus.router.navigate([link], {
                    queryParams: params
                });
            });


        }, 1500);

    }
}

function validateSearchZipCode(thisStatus) {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value: string = control.value;
        var regFirstDigits = new RegExp('^[0-9]{2}$');
        var regFirstLetters = new RegExp('^[a-zA-Z]{2}$');
        var regLetters = new RegExp('^[a-zA-Z]$');

        if (/^[0-9]{2}/.test(value)) {
            var reg = /\b\d\b/g;
            var regFiveDig = /\b\d{5}\b/g;

            if (/^[0-9]/.test(value)) {
                if (value.match(regFiveDig) && value.length <= 5) {
                    thisStatus.show_check = true;
                    return null;
                }
                else {
                    thisStatus.show_check = false;
                    return { 'zipCode': true };
                }
            }
            else {
                thisStatus.show_check = false;
                return { 'invalidZipCode': true };
            }
        }
        else if (/^[a-zA-Z]{2}/.test(value) || /^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(value)) {

            if (/^([a-zA-Z]+\s)*[a-zA-Z]+\,+\s[a-zA-Z\s]+$/.test(value)) {


                if (/\s/.test(value)) {


                    // It has any kind of whitespace
                    var listOfValues = value.split(',');
                    if (listOfValues.length > 2) {
                        thisStatus.show_check = false;
                        return { 'cityStatePattern': true }; //Please follow the pattern: City, State (Dallas, TX)
                    }
                    else {

                        if (listOfValues[1] !== undefined) {
                            if (listOfValues[1][0] != " ") {
                                thisStatus.show_check = false;

                                return { 'cityStatePattern': true }; //Please follow the pattern: City, State (Dallas, TX)
                            }
                            if (listOfValues[1].length >= 2) {
                                thisStatus.show_check = true;
                                return null;
                            }
                            else {
                                thisStatus.show_check = true;
                            }
                        }
                        else {
                            if (value.length >= 5) {
                                thisStatus.show_check = false;
                                return { 'cityStatePattern': true }; //Please follow the pattern: City, State (Dallas, TX)
                            }
                        }
                    }
                }
            }
            else {
                if (!(/^[a-zA-Z]*$/.test(value))) {
                    thisStatus.show_check = false;

                    return { 'cityStatePattern': true };
                }
                if (value.length >= 5) {
                    thisStatus.show_check = false;
                    return { 'cityStatePattern': true };
                }
            }
        }
        else {
            if (value.match(regFirstDigits)) {
                thisStatus.show_check = false;
                return { 'invalidZipCode': true };
            }
            else {
                thisStatus.show_check = false;
                //return { 'invalidData': true };
            }
        }
    }
} 