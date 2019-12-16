import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CategoryService } from '../category.service';
import { PurchaseEntry } from '../category';
var CategoryComponent = /** @class */ (function () {
    function CategoryComponent(formbulider, categoryService) {
        this.formbulider = formbulider;
        this.categoryService = categoryService;
        this.dataSaved = false;
        this.massage = null;
        this.categoryid = null;
    }
    CategoryComponent.prototype.ngOnInit = function () {
        this.purchaseForm = new FormGroup({
            CategoryID: new FormControl(),
            CategoryName: new FormControl(),
            Location: new FormControl(),
            ZipCode: new FormControl()
        });
        this.loadAllCategories();
        this.loadAllCityStateZip();
        this.loadAllPurchase();
    };
    CategoryComponent.prototype.loadAllCategories = function () {
        var filtered = [];
        var letsContinue = false;
        this.allCategoriesObservable = this.categoryService.getAllCategories();
        //this.allCategoriesObservable = this.allCategoriesObservable.pipe(
        //    map(result => result.
        //        filter(cat => cat.CategoryName != "Mortgage")
        //    )
        //);
        //this.categoryService.getAllPurchase().subscribe(
        //    function (x) {
        //        this.purchaseArray = x;
        //    },
        //    function (err) {
        //        debugger;
        //        console.log('Error: %s', err);
        //    },
        //    function () {
        //        debugger;
        //        for (var j = 0; j < this.purchaseArray.length; j++)
        //        {
        //            this.allCategoriesObservable = this.allCategoriesObservable.pipe(
        //                map(result => result.
        //                    filter(cat => cat.CategoryName != this.purchaseArray.CategoryName)
        //                )
        //            );
        //        }
        //    }
        //);
    };
    CategoryComponent.prototype.loadAllCityStateZip = function () {
        this.allCityStateZipCodeData = this.categoryService.getAllCityStateZipCodeData();
        var filtered = [];
        var letsContinue = false;
        this.allCategoriesObservable = this.categoryService.getAllCategories();
    };
    CategoryComponent.prototype.loadAllPurchase = function () {
        debugger;
        this.allPurchases = this.categoryService.getAllPurchase();
        this.globalAllPurchases = this.allPurchases;
    };
    CategoryComponent.prototype.onFormSubmit = function () {
        debugger;
        console.log(this.purchaseForm.value);
        if (this.purchaseForm !== undefined) {
            var notFound = true;
            var localthis = this;
            var localPurchaseForm = this.purchaseForm;
            this.categoryService.getAllPurchase().subscribe(function (x) {
                this.purchaseArray = x;
            }, function (err) {
                console.log('Error: %s', err);
            }, function () {
                this.purchaseArray.forEach(function (purchase) {
                    if (purchase.CategoryID.toString() == localPurchaseForm.value.CategoryID.split(',')[0] &&
                        (purchase.City == localPurchaseForm.value.Location.split(',')[0] || purchase.State == localPurchaseForm.value.Location.split(',')[1]) && (purchase.ZipCode == localPurchaseForm.value.ZipCode)) {
                        localthis.dataSaved = true;
                        localthis.massage = 'This combination is already purchased. No more available.';
                        localthis.purchaseForm.reset();
                        notFound = false;
                    }
                });
                if (notFound) {
                    this.purchaseEntry = new PurchaseEntry();
                    this.purchaseEntry.CategoryID = localPurchaseForm.value.CategoryID.split(',')[0];
                    this.purchaseEntry.CategoryName = localPurchaseForm.value.CategoryID.split(',')[1];
                    this.purchaseEntry.ChargeAmount = localPurchaseForm.value.CategoryID.split(',')[2];
                    this.purchaseEntry.City = localPurchaseForm.value.Location.split(',')[0];
                    this.purchaseEntry.State = localPurchaseForm.value.Location.split(',')[1];
                    this.purchaseEntry.ZipCode = localPurchaseForm.value.ZipCode;
                    localthis.dataSaved = false;
                    localthis.CreatePurchase(this.purchaseEntry);
                    localPurchaseForm.reset();
                }
            });
        }
    };
    CategoryComponent.prototype.CreatePurchase = function (purchase) {
        var _this = this;
        this.categoryService.createPurchase(purchase).subscribe(function () {
            _this.dataSaved = true;
            _this.massage = 'Record saved Successfully';
            _this.loadAllPurchase();
            _this.purchaseForm.reset();
        });
    };
    CategoryComponent.prototype.resetForm = function () {
        this.purchaseForm.reset();
        this.massage = null;
        this.dataSaved = false;
    };
    CategoryComponent = tslib_1.__decorate([
        Component({
            selector: 'app-category',
            templateUrl: './category.component.html',
            styleUrls: ['./category.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, CategoryService])
    ], CategoryComponent);
    return CategoryComponent;
}());
export { CategoryComponent };
//# sourceMappingURL=category.component.js.map