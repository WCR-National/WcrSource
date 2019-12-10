function CountAssociateCategory() {
    var cartd = [];
    $.ajax({
        type: "POST", url: "ws/Sale.asmx/CountAssociateCategories", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
        success: function (r) {
            if (r.d.length > 0) {
                var xmlDoc = $.parseXML(r.d);
                var xml = $(xmlDoc);
                var docs = xml.find("AssocateCategories");                
                $.each(docs, function (i, docs) {
                    cartd.push("<h3>" + ($(docs).find("Total").text()) + " </h3>");
                    // cartd.push("<p><a style='color:white' href='PurchaseCategory.aspx'>Purchased Categories </a>   </p>");
                    cartd.push("<p><a style='color:white' href='PostAdvertisement.aspx?pid=1'>Purchased Categories </a>   </p>");
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