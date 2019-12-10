function PaidAmountForPurchaseAdvertisement(totalAmount, title, subcategory) {
    var returnvalue;
    $.ajax({
        type: "POST",
        url: "ws/CategoryPurchase.asmx/InsertAmount",
        data: "{'amount':'" + totalAmount + "','Description':'Property Listing purchase for  " + title + " of " + subcategory + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        cache: false,
        success: function (r) {
            returnvalue = r.d;
        }
    });
    return returnvalue;
}

function SavePostAdvertisementsData(CategoryId, subCategoryId, title, features, address, contactNo, description, countryID, stateID, cityId, zipcod, isFeatured, jobtype, amount, adsPrice) {
    var returnvalue;
    $.ajax({
        type: "POST", url: "ws/Sale.asmx/InsertSale",
        data: "{'CategoryId':'" + CategoryId + "','SubCategoryId':'" + subCategoryId + "','title':'" + title + "','Features':'" + features + "','address':'" + address.trim() + "','contactNo':'" + contactNo + "','description':'" + description.trim() + "','countryID':'" + countryID + "','StateID':'" + stateID + "','cityID':'" + cityId + "','zipcode':'" + zipcod + "','isFeatured':'" + isFeatured + "','jobtype':'" + jobtype + "','amount':'" + amount + "','advertisementPrice':'" + adsPrice + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            returnvalue = r.d;
        }
    });
    return returnvalue;
}





