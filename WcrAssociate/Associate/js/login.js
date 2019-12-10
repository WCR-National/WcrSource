/// <reference path="../ws/ConsumerRegistration.asmx" />
function chklogin() {
    var rett = "0";
    $.ajax({
        type: "POST", url: "auctionService.asmx/checkLogin", data: "{email:'" + email.value + "',pass:'" + password.value + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
        success: function (r) {
            if (r.d.toString() == "1") {
                rett = "1";
            }
            else {
                alert('Uauthorized access');
            }
        }
    });
    return rett;
}