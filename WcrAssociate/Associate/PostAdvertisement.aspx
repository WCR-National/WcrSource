<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="PostAdvertisement.aspx.cs" Inherits="WcrAssociate.Associate.PostAdvertisement" %>
<%@ Register Assembly="CKEditor.NET" Namespace="CKEditor.NET" TagPrefix="CKEditor" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link rel="stylesheet" href="../css/bootstrap.min.css" />
    <link href="css/loader.css" rel="stylesheet" />
    <link href="../css/layout.css" rel="stylesheet" />
    <script src="../js/jquery-2.1.1.min.js">
    </script>
    <script src="../js/bootstrap.min.js"></script>
    <script>
        $(function () {
            $(".sidebar-menu li ").removeClass("active");
            $("#postadtsclick").addClass("active");
        });
    </script>
    <div>
        <div class="modal fade small-model" id="success-message" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body form-horizontal no-padding">
                        <div class="alert alert-success no-radius alert-dismissible no-margin " role="alert">
                            <button type="button" class="close align-with-two-line" id="successClose" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <strong>
                                <label id="lblSuccess"></label>
                            </strong>
                            <br />
                            <label id="lbldetail" class="running-text"></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade small-model" id="fail_message" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body form-horizontal no-padding">
                        <div class="alert alert-danger no-radius alert-dismissible no-margin " role="alert">
                            <button type="button" class="close align-with-two-line" id="btncloseAds" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span></button>
                            <strong>
                                <label id="lblFailureTitle"></label>
                            </strong>
                            <br />
                            <label id="lblFailureDetail" class="running-text"></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 dashboard-block">
            <h1>Your Property Listings </h1>
            <h4>
                <strong>Use  this page to advertise property listings to potential clients. </strong>
            </h4>
            <p>
                To begin, click on the blue ‘Post A New Advertisement’ button below to expand and enter your property listing information.
            </p>
            <p>
                <strong>Listing your property is done in 3 steps </strong>
            </p>
            <ol>
                <li>Load images of your property in the ‘Primary Images’ section.  A maximum of 4 images per property listing is allowed. </li>
                <li>Enter the listing title, price, description and additional features in the ‘Overview & Additional Features’ section.</li>
                <li>Enter the property location by expanding the ‘Location’ section</li>
            </ol>
            <p>
                Once all the necessary information is entered, click <strong>‘SUBMIT’ </strong>to post your listing.
              That’s it!!!
            </p>
            <h3 class="page-subtitle">SALES CATEGORY DETAILS  </h3>
            <div class="row sumary-detail-colume space-5">
                <div class="col-sm-6">
                    <div class="full-row list-detail-block section-with-blue-border">
                        <h4>Your Current Sales Advertisement Segment Selections </h4>
                        <ul class="detail-listing">
                            <li>Total count of items Purchased <span class="badge">
                                <label id="lblPurchaseCategories"></label>
                            </span></li>
                            <li>Total amount due at the start of the next billing Cycle: <span class="badge">$<label id="lblTotalamount"></label>
                            </span></li>
                            <li>Next Billing Cycle Starts : <span class="badge">
                                <label id="lblBillingDate"></label>
                            </span></li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-6" style="display: none;">
                    <div class="full-row button-block ">
                        <button type="button" id="btnpurchasenew">
                            <i class="fa fa-plus"></i><span class="cancel">Cancel Your Selections </span>
                            <a href="#select-yourdesired" class="smooth-scroll"><span class="add">Purchase New Sales Category </span></a>
                        </button>
                    </div>
                </div>
            </div>
            <div class="full-row custome-block" style="display: none;">
                <h3 class='page-subtitle text-uppercase'>Your Purchased Categories  </h3>
                <div class="table-responsive grid-block data-table">
                    <div class="uk-overflow-container" style="visibility: hidden" id="ViewAllPurchasedRcd"></div>
                </div>
            </div>
            <hr />
            <div id="divpurchaseCategories" style="display: none">
                <div class="full-row your-search-result form-horizontal" style="background-color: #E4F1FA">
                    <h4>Select Your Sales Category / Subcategory For Purchase  </h4>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">Select a Category  </label>
                            <div class="col-sm-7">
                                <select class="form-control" id="aCategory"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">

                            <label class="col-sm-5 control-label">Subcategory </label>
                            <div class="col-sm-7">
                                <select class="form-control" id="aSubCategory"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="full-row your-search-result form-horizontal " id="divSelectedChce" style="background-color: #E4F1FA; display: none;">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <%--<h4>Your Selected Choices:  </h4>--%>
                            <div class="full-row your-selected-choice nobg-pd ">
                                <h4>Your Selected Choices For Purchase </h4>
                                <div id="ViewRcd"></div>
                            </div>
                        </div>
                        <div class="form-group" id="purchasebutton" style="display: none;">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="ViewPurchasedRcd">
                            </div>
                            <div class="col-sm-9  text-right" style="margin-bottom: 15px">
                                <span class="pull-left">
                                    <input type="button" class="btn btn-primary" id="btnreset1" value="Reset" style="visibility: hidden;" />
                                    <input type="button" class="btn btn-primary" id="btnCancel1" value="Cancel" style="visibility: hidden;" />
                                </span>
                                <input type="button" class="btn btn-primary" id="btncheckout" value="Submit" style="visibility: hidden;" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="alert alert-success">
                <i class="fa fa-exclamation-triangle"></i><span><%--Once a consumer segment(s) has been selected,then you can post up to a total of 15 sales advertisement(s).--%>
                    A maximum limit of 15 sales advertisement purchases is allowed
                <br />
                    <strong>A Sales Advertisement Posting fee of $10<label id="lblCatprice"></label>
                        is charged for each advertisement submitted at the time of the submission.<br />
                        A monthly $10
                        <label id="lblCatprice1"></label>
                        posting fee is charged at the beginning of each month afterwards for each advertisement that is still active.
                    </strong></span>
                <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
            <h3 class="page-subtitle">SALES ADVERTISEMENT DETAILS</h3>
            <div class="row sumary-detail-colume space-5">
                <div class="col-sm-6">
                    <div class="full-row list-detail-block ">
                        <h4>Your Current Sales Advertisement </h4>
                        <ul class="detail-listing">
                            <li>Total count of Post Advertisement  <span class="badge">
                                <label id="lblPurchaseCategories1"></label>
                            </span></li>
                            <li>Total amount due at the start of the next billing Cycle: <span class="badge">$<label id="lblTotalamount2">10</label>
                            </span></li>
                            <li>Next Billing Cycle Starts :  <span class="badge">
                                <label id="lblPurchaseCategoriesdd">10</label>
                            </span></li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="full-row button-block1">
                        <button type="button" id="btnNewadd">
                            <i class="fa fa-plus"></i>
                            <span class="add">Post A New  Advertisement 
                            </span>
                            <span class="cancel">Cancel Your Selection </span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="full-row sumary-detail-colume data-table">
                <div class="table-responsive grid-block">
                    <div class="uk-overflow-container" id="divAdvtDetail">
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <div id="divAdvertisements" style="display: none;">
                <div class="full-row custome-block" id="select-yourdesired">
                    <h3 class='page-subtitle text-uppercase'>SELECT YOUR DESIRED CONSUMER SEGMENT(S)  </h3>
                    <div class="col-sm-12">
                        <ul class="custom-nav">
                            <li><a class="home-custom" href="#" id="subCatHome"><i></i><span>HOME </span></a></li>
                            <li><a class="home-custom" href="#" id="subCatTownHome"><i></i><span>TOWNHOME  </span></a></li>
                            <li><a class="multi-custom" href="#" id="subCatMultiFamily"><i></i><span>MULTI-FAMILY </span></a></li>
                            <li><a class="land-custom" href="#" id="subCatLand"><i></i><span>LAND  </span></a></li>
                        </ul>
                    </div>
                </div>
                <div class="full-row" style="display: none;">
                    <div class="full-row your-search-result form-horizontal post-advertiment-tab " id="addForm" style="background: #E4F1FA; padding: 20px 25px 10px 25px;">
                        <div class="form-group">
                            <div class="col-sm-12">
                                <label class="hightlight-text" for="lblpTitle"></label>
                            </div>
                        </div>
                        <div class=" full-row form-horizontal ">
                            <div class="form-group">
                                <label class="col-sm-12" style="font-weight: normal">Select which consumer segment your wish to advertise in  </label>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-4">
                                    <select class="form-control" id="SubCategory">
                                        <%--<option value="0">Select Consumer Segment</option>--%>
                                    </select>
                                    <input type="hidden" class="form-control" id="lblsubcat" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="full-row primary-image-section form-horizontal m-t-15 tab-custome collapse-tab">
                    <div class="collapsable-heading">
                        <div class="collapse-with-me"><i class="fa fa-angle-up"></i></div>
                        <i class="number">1 </i><strong>Primary Images </strong>
                        <span>Upload up to 4 images</span>
                    </div>
                    <div class="collapsable-body full-row">
                        <div class="row">
                            <div class="col-sm-8">
                                <ul class="image-upload">
                                    <li>
                                        <div class="block-box full-row">
                                            <p>Upload Images  </p>
                                            <div id="image-holder">
                                                <img height="75" src="img/imagebox.jpg" />
                                            </div>
                                            <div class="custom-browse">
                                                <input type="file" class="form-control" id="FileUpload1" />
                                            </div>
                                        </div>
                                        <p>PRIMARY IMAGES</p>
                                    </li>
                                    <li>
                                        <div class="block-box full-row">
                                            <p>Upload Image </p>
                                            <div id="image-holder2">
                                                <img height="75" src="img/imagebox.jpg" />
                                            </div>
                                            <div class="custom-browse">
                                                <input type="file" class="form-control" id="FileUpload2" />
                                            </div>
                                        </div>
                                        <p>SECONDARY IMAGE </p>
                                    </li>
                                    <li>
                                        <div class="block-box full-row">
                                            <p>Upload Image  </p>
                                            <div id="image-holder3">
                                                <img height="75" src="img/imagebox.jpg" />
                                            </div>
                                            <div class="custom-browse">
                                                <input type="file" class="form-control" id="FileUpload3" />
                                            </div>
                                        </div>
                                        <p>ADDITIONAL IMAGE </p>
                                    </li>
                                    <li>
                                        <div class="block-box full-row">
                                            <p>Upload Image  </p>
                                            <div id="image-holder4">
                                                <img height="75" src="img/imagebox.jpg" />
                                            </div>
                                            <div class="custom-browse">
                                                <input type="file" class="form-control" id="FileUpload4" />
                                            </div>
                                        </div>
                                        <p>ADDITIONAL IMAGE </p>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-sm-4 text-right side-slider" style="display: none;">
                                <div id="myCarousel" class="carousel slide">
                                    <div class="carousel-inner">
                                        <div class="item active" id="divnewimg">
                                        </div>
                                        <div class="item" id="divfirst">
                                        </div>
                                        <div class="item" id="divSecond">
                                        </div>
                                        <div class="item" id="divThird">
                                        </div>
                                    </div>
                                    <ul class="nav nav-pills nav-justified slide-thumb">
                                        <li data-target="#myCarousel" data-slide-to="0" class="active" id="divfimg"></li>
                                        <li data-target="#myCarousel" data-slide-to="1" id="divsimg"></li>
                                        <li data-target="#myCarousel" data-slide-to="2" id="divtimg"></li>
                                        <li data-target="#myCarousel" data-slide-to="3" id="divfourthimg"></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="full-row overviewFeature-section new-form-section form-horizontal tab-custome tab-custome collapse-tab">
                    <div class="collapsable-heading">
                        <div class="collapse-with-me"><i class="fa fa-angle-up"></i></div>
                        <i class="number">2 </i><strong>Overview & Additional Features </strong>
                        <span>Add Overview and features </span>
                    </div>
                    <div class="collapsable-body full-row form-horizontal">
                        <div class="form-group">
                            <div class="col-sm-6">
                                <input type="text" id="txtName" class="form-control" placeholder="Title" />
                            </div>
                            <div class="col-sm-2 pos-rel">
                                <input id="txtPrice" class="form-control" placeholder="Price " type="text" onkeypress="return IsNumeric(event);" onpaste="return false;" ondrop="return false;" />
                                <span id="error" style="color: Red; display: none">* Input digits (0 - 9)</span>
                                <div class="helpertext"><span style="color: black;">$(Whole dollar amount)</span> </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-8">
                                <textarea class="form-control" id="txtdescription" cols="" rows="4" placeholder="Description"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-8">
                                <div id="divFeatures"></div>
                                <label style="display: none" for="lblRowId"></label>
                                <b>Additional Features</b>
                                <textarea id="txtFeatures" name="editor1" cols="80" rows="10">            
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="full-row location-section form-horizontal tab-custome tab-custome collapse-tab">
                    <div class="collapsable-heading">
                        <div class="collapse-with-me"><i class="fa fa-angle-up"></i></div>
                        <i class="number">3 </i><strong>Location </strong>
                        <span>Address & Location </span>
                    </div>
                    <div class="collapsable-body full-row  ">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <div class="col-sm-4">
                                        <input type="text" id="txtContact" class="form-control" placeholder="Contact No" onkeypress="return IsNumeric(event);" onpaste="return false;" ondrop="return false;" />
                                        <span id="error1" style="color: Red; display: none">* Input digits (0 - 9)</span>
                                    </div>
                                    <div class="col-sm-4">
                                        <input type="text" id="txtAddress" placeholder="Street Address" class="form-control" />
                                    </div>
                                    <div class="col-sm-4">
                                        <input type="text" id="city" class="form-control" placeholder="City" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-4">
                                        <select class="form-control" id="State">
                                            <option>Select State</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-4">
                                        <input type="text" id="Country" disabled="disabled" class="form-control" value="US" />
                                        <br />
                                       <%-- <label style="display: none; color: red" id="lblsegmentsMessage"></label>--%>
                                    </div>
                                    <div class="col-sm-4">
                                        <select class="form-control" id="zipcode">
                                            <option>Select ZipCode</option>
                                        </select><br />

                                        <label style="display: none;" id="lblzipCodeprice"></label>
                                    </div>
                                </div>
                                <!-- /.box-body -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="divDetail1" style="visibility: hidden">
                    <div id="divsave" style="display: none">
                        <div class="full-row m-t-15">
                            <div class="col-sm-12">
                                <input id="btnReset" style="display: none;" type="button" class="btn btn-primary" value="RESET" />
                                <input id="btnCancel" style="display: none;" type="button" class="btn btn-primary" value="CANCEL" />
                            </div>
                        </div>
                    </div>
                    <div role="alert" id="divSuccess" class="alert alert-success" style="display: none">
                    </div>
                </div>

                 <div class="form-group" style="margin-top: 15px;">
                    <div class="col-sm-9 col-sm-offset-3 padd-l30 ">
                        <label id="ErrorMsg"></label>
                    </div>
                </div>
                 <div class="form-group" style="margin-top: 15px;">
                    <div class="col-sm-9 col-sm-offset-3 padd-l30 ">
                         <label style="display: none; color: red" id="lblsegmentsMessage"></label>
                    </div>
                <div class="form-group" style="margin-top: 15px;">
                    <div class="col-sm-9 col-sm-offset-3 padd-l30 ">
                        <input id="btnUpdate" type="button" class="btn btn-default " value="UPDATE" style="display: none" />
                        <input id="btnSubmit" type="button" class="btn btn-primary" value="SUBMIT" />
                        <input id="btnCancelAll" type="button" class="btn btn-default" value="CANCEL" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="pageloader" class="pageloader" style="display: none">
        <div class="pageloader-inner">
            <div class="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="completeConsumerProfile" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h3 class="modal-title" id="myModalLabel"><strong>Please Verify/Update Your Credit Card Information </strong></h3>
                    <div class="btn btn-red btn-block cursor-default" style="margin-top: 20px;">
                        <label>There was an error processing this transaction. Please verify or update your card information to complete this transaction. </label>
                    </div>
                </div>
                <div class="modal-body form-horizontal">
                    <div class="row">
                        <div class="col-sm-6">
                            <h3 class="title-w-border">Card Account Information </h3>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Card Number </label>
                                    <div class="col-sm-9  ">
                                        <asp:HiddenField ID="CardID" runat="server" />
                                        <%--<asp:TextBox ID="hidCardID"  class="form-control"  runat="server"></asp:TextBox>--%>
                                        <asp:TextBox ID="txtCreditCard" MaxLength="19" class="form-control" placeholder="NEW CARD NUMBER" runat="server"></asp:TextBox>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Card Type </label>
                                    <div class="col-sm-9  ">

                                        <asp:CheckBox ID="CheckBox1" Style="pointer-events: none;" runat="server" />
                                        VISA  
                                               
                                        <asp:CheckBox ID="CheckBox2" Style="pointer-events: none;" runat="server" />MasterCard
                                               
                                        <asp:CheckBox ID="CheckBox3" Style="pointer-events: none;" runat="server" />
                                        AMEX 
                                               
                                        <asp:CheckBox ID="CheckBox4" Style="pointer-events: none;" runat="server" />
                                        Discover
                                             
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Exp Month </label>
                                    <div class="col-sm-9  ">
                                        <asp:DropDownList class="form-control" runat="server" ID="ddlMonth">
                                            <asp:ListItem Value="0">Month</asp:ListItem>
                                            <asp:ListItem Value="1">January</asp:ListItem>
                                            <asp:ListItem Value="2">February</asp:ListItem>
                                            <asp:ListItem Value="3">March</asp:ListItem>
                                            <asp:ListItem Value="4">April</asp:ListItem>
                                            <asp:ListItem Value="5">May</asp:ListItem>
                                            <asp:ListItem Value="6">June</asp:ListItem>
                                            <asp:ListItem Value="7">July</asp:ListItem>
                                            <asp:ListItem Value="8">August</asp:ListItem>
                                            <asp:ListItem Value="9">September</asp:ListItem>
                                            <asp:ListItem Value="10">October</asp:ListItem>
                                            <asp:ListItem Value="11">November</asp:ListItem>
                                            <asp:ListItem Value="12">December</asp:ListItem>
                                        </asp:DropDownList>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Exp Year </label>
                                    <div class="col-sm-9  ">
                                        <asp:DropDownList class="form-control" runat="server" ID="ddlYear">
                                            <asp:ListItem Value="0">Year</asp:ListItem>
                                            <asp:ListItem Value="2018">2018</asp:ListItem>
                                            <asp:ListItem Value="2019">2019</asp:ListItem>
                                            <asp:ListItem Value="2020">2020</asp:ListItem>
                                            <asp:ListItem Value="2021">2021</asp:ListItem>
                                            <asp:ListItem Value="2022">2022</asp:ListItem>
                                            <asp:ListItem Value="2023">2023</asp:ListItem>
                                            <asp:ListItem Value="2024">2024</asp:ListItem>
                                            <asp:ListItem Value="2025">2025</asp:ListItem>
                                            <asp:ListItem Value="2026">2026</asp:ListItem>
                                            <asp:ListItem Value="2027">2027</asp:ListItem>
                                            <asp:ListItem Value="2028">2028</asp:ListItem>
                                        </asp:DropDownList>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">CVV Code </label>
                                    <div class="col-sm-9  ">
                                        <asp:TextBox ID="txtCvv" class="form-control" placeholder="CV CODE" runat="server"></asp:TextBox>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <h3 class="title-w-border">Cardholder Billing Information </h3>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">First Name </label>
                                    <div class="col-sm-9  ">
                                        <asp:TextBox ID="cardFname" class="form-control" placeholder="FIRST NAME" runat="server"></asp:TextBox>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Last Name </label>
                                    <div class="col-sm-9  ">
                                        <asp:TextBox ID="cardLastname" class="form-control" placeholder="LAST NAME" runat="server"></asp:TextBox>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Street Address </label>
                                    <div class="col-sm-9  ">
                                        <asp:TextBox ID="Cardaddress" class="form-control" placeholder="STREET ADDRESS" runat="server"></asp:TextBox>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" style="display: none;">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Email Address </label>
                                    <div class="col-sm-9  ">
                                        <asp:TextBox ID="emailAddress" Visible="false" class="form-control" placeholder="Email Address" runat="server"></asp:TextBox>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">City </label>
                                    <div class="col-sm-9  ">
                                        <asp:TextBox ID="cardCity" class="form-control" placeholder="CITY" runat="server"></asp:TextBox>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">State </label>
                                    <div class="col-sm-9  ">
                                        <asp:DropDownList runat="server" class="form-control" ID="cardState">
                                        </asp:DropDownList>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Country </label>
                                    <div class="col-sm-9  ">
                                        <asp:TextBox runat="server" class="form-control" ReadOnly="true" Value="US" ID="cardCountry">
                                        </asp:TextBox>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Zip </label>
                                    <div class="col-sm-9  ">
                                        <asp:DropDownList runat="server" class="form-control" ID="cardzipcode">
                                        </asp:DropDownList>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="modal-footer">
                    <div class="form-group">
                        <div class="col-sm-12 text-center">
                            <input id="btnupdateCard" type="button" style="display: none;" class="btn btn-primary" value="UPDATE" />
                            <input id="btnCancelCard" type="button" class="btn btn-primary" value="CLEAR" />
                            <input id="btnAddCard" type="button" class="btn btn-primary" value="SUBMIT" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 dashboard-block">
            <div class=" customebox full-row">
                <div class="form-group">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div id="Shop">
                            <table class="table table-condensed">
                                <tr>
                                    <td colspan="2" style="display: none"><%--Membership Plan:---%>
                                        <select name="select" id="MemberShip" style="visibility: hidden"></select>
                                        <br />
                                        <label style="visibility: hidden" for="lblCatPrice"></label>
                                        <br />
                                        <label for="lblToalAmount"></label>
                                        <br />
                                        <input type="text" id="CouponCode" placeholder="Do you have Coupon Code" style="display: none; width: 200px;" />&nbsp;&nbsp;&nbsp;&nbsp;<%--<a id="coponApply" style="text-decoration: none;">Apply</a>--%>
                                        <br />
                                        <label style="visibility: hidden;" for="lblcode"></label>
                                        <br />
                                        <label style="visibility: hidden" for="lblprice"></label>
                                        <br />
                                        <label style="visibility: hidden" for="lbldur"></label>
                                        <br />
                                        <br />
                                        <label for="lblToalAmount1" style="visibility: hidden"></label>
                                        <br />
                                        <label id="insertOrEdit" style="visibility: hidden"></label>

                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="clearfix"></div>
    <script src="//cdn.ckeditor.com/4.11.4/standard/ckeditor.js"></script>
    <script src="js/PostAdvertisement.js"></script>
    <script>
        var editor;
        //CK editor code begin from here
        function createEditor(languageCode) {
            if (editor)
                editor.destroy();

            // Replace the <textarea id="editor1"> with an CKEditor
            // instance, using default configurations.
            editor = CKEDITOR.replace('editor1', {
                language: languageCode,

                on: {
                    instanceReady: function () {
                        // Wait for the editor to be ready to set
                        // the language combo.
                        var languages = document.getElementById('languages');
                        languages.value = this.langCode;
                        languages.disabled = false;
                    }
                }
            });
        }

        // At page startup, load the default language:
        createEditor('');
        //ckeditor code ends here


        var specialKeys = new Array();
        specialKeys.push(8); //Backspace
        function IsNumeric(e) {
            var keyCode = e.which ? e.which : e.keyCode
            var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
            document.getElementById("error").style.display = ret ? "none" : "inline";
            document.getElementById("error1").style.display = ret ? "none" : "inline";
            return ret;
        }
    </script>
    <script>
        $(document).ready(function () {
            $.ajax({
                type: "POST", url: "../ws/AssociateRegistration.asmx/ViewAssociateBasicDetails",
                data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAssociateBasicDetail");
                        $.each(docs, function (i, docs) {
                            if ($(docs).find("FullName").text() == '' || $(docs).find("MobileNo").text() == '' || $(docs).find("Photo").text() == '') {
                                window.location.href = "Dashboard.aspx";
                            }
                            else {
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
            
            $("#btncloseAds").click(function () {
                $('#btnSubmit').prop('disabled', false);
                $('#btnCancelAll').prop('disabled', false);
            });
            $("#successClose").click(function () {
                window.location.reload();
            });
            $("#bbbclose").click(function () {
                if (_Counter > 2) {
                    window.location.href = 'ZipCodePurchase.aspx';
                }
            });
            var _Counter = 0;
            $('#btnAddCard').css("background-color", "#808080");
            $('#btnAddCard').prop('disabled', true);
            //$('#btnSubmit').css("background-color", "#808080");
            //$('#btnSubmit').prop('disabled', true);
            //BindState();
            $('input[type="checkbox"]').on('change', function (e) {
                e.preventDefault();
                $(this).siblings('input[type="checkbox"]').prop('checked', false);
            });
            var sts = 0;
            $("#btnpurchasenew").click(function () {
                if (sts == 0) {
                    $(".button-block ").addClass("disable");
                    $("#divpurchaseCategories").css("display", "block");
                    //$("#divSelectedChce").css("display", "none");
                    //$("#ViewPurchasedRcd").css("display", "none");
                    RemoveCardSessions();
                    sts = 1;
                }
                else if (sts == 1) {
                    $("#divpurchaseCategories").css("display", "none");
                    $("#divSelectedChce").css("display", "none");
                    $("#ViewPurchasedRcd").css("display", "none");
                    $("#purchasebutton").css("display", "none");
                    $(".button-block ").removeClass("disable");
                    sts = 0;
                    BindAllCategory();
                }
            });
            var sts1 = 0;
            $("#btnNewadd").click(function () {
                $("#insertOrEdit").text("0");
                if (sts1 == 0) {
                    $('html, body').animate({
                        'scrollTop': $("#select-yourdesired").position().top
                    });
                    $(".button-block1").addClass("disable");
                    $("#addForm").css("display", "block");
                    sts1 = 1;
                    $("#divAdvertisements").css("display", "block");
                }
                else if (sts1 == 1) {
                    // window.location.href = "PostAdvertisement.aspx";
                    $("#addForm").css("display", "none");
                    $(".button-block1").removeClass("disable");
                    sts1 = 0;
                    $("#divAdvertisements").css("display", "none");
                    $("#SubCategory").html("");
                    $("#subCatHome").removeClass("active");
                    $("#subCatTownHome").removeClass("active");
                    $("#subCatMultiFamily").removeClass("active");
                    $("#subCatLand").removeClass("active");
                    $("#subCatHome").removeClass("diable-sidelink");
                    $("#subCatTownHome").removeClass("diable-sidelink");
                    $("#subCatMultiFamily").removeClass("diable-sidelink");
                    $("#subCatLand").removeClass("diable-sidelink");
                }
            });
            var now = new Date();
            var current;
            if (now.getMonth() == 11) {
                current = new Date(now.getFullYear() + 1, 0, 1).format('yyyy-MM-dd');
            } else {
                current = new Date(now.getFullYear(), now.getMonth() + 1, 1).format('yyyy-MM-dd');
            }
            $("#lblBillingDate").text(current);
            $("#lblPurchaseCategoriesdd").text(current);
            function RemoveCardSessions() {
                $.ajax({
                    type: "POST", url: "ws/CategoryPurchase.asmx/RemoveCardSessions",
                    data: "{}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json", async: true,
                    success: function (r) {
                    },
                    failure: function (response) {
                        alert(response.d + "Fail");
                    },
                    error: function (response) {
                        alert(response.d + "Error...");
                    }
                });
            }
            var countimg = 0;


            $("#FileUpload1").on('change', function () {
                if (typeof (FileReader) != "undefined") {
                    var image_holder = $("#image-holder");
                    image_holder.empty();
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $("<img />", {
                            "src": e.target.result,
                            "class": "thumb-image", "width": "75px", "height": "75px"
                        }).appendTo(image_holder);
                    }
                    image_holder.show();
                    reader.readAsDataURL($(this)[0].files[0]);
                    //$('#divsave').css("display", "block");
                    loadnewmainImg($("#divnewimg"), $("#FileUpload1"));
                    loadnewmainImg($("#divfimg"), $("#FileUpload1"));
                    var rowID = $("label[for='lblRowId']").text();
                    var forEdit = $("#insertOrEdit").text();
                    if (forEdit == 1) {
                        UpdateImages($("#FileUpload1"), rowID, "UpdateAdvertisementImges.ashx");
                    }
                } else {
                    alert("This browser does not support FileReader.");
                }
            });

            function UpdateImages(fileuploaderID, AdID, handUrl) {
                var fileUpload = fileuploaderID.get(0);
                var files = fileUpload.files;
                var test = new FormData();
                for (var i = 0; i < files.length; i++) {
                    if (fileuploaderID.val() == '') {
                    }
                    else {
                        test.append(files[i].name, files[i], AdID);
                    }
                }
                $.ajax({
                    url: handUrl,
                    type: "POST",
                    contentType: false,
                    processData: false,
                    data: test,
                    success: function (result) {
                    },
                    error: function (err) {
                        alert(err.statusText);
                    }
                });
            }
            function loadnewmainImg(divID, fileuploaderID) {
                var image_holder = divID;
                image_holder.empty();
                var reader = new FileReader();
                reader.onload = function (e) {
                    $("<img />", {
                        "src": e.target.result,
                        "class": "thumb-image", "width": "75px", "height": "75px"
                    }).appendTo(image_holder);
                }
                image_holder.show();
                reader.readAsDataURL(fileuploaderID[0].files[0]);
            }

            $("#FileUpload2").on('change', function () {
                if (typeof (FileReader) != "undefined") {
                    var image_holder = $("#image-holder2");
                    image_holder.empty();
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $("<img />", {
                            "src": e.target.result,
                            "class": "thumb-image", "width": "75px", "height": "75px"
                        }).appendTo(image_holder);

                    }
                    image_holder.show();
                    reader.readAsDataURL($(this)[0].files[0]);
                    // $('#AddMore2').css("display", "block");
                    // loadnewmainImg($("#divnewimg"), $("#FileUpload2"));
                    loadnewmainImg($("#divsimg"), $("#FileUpload2"));
                    var rowID = $("label[for='lblRowId']").text();
                    var forEdit = $("#insertOrEdit").text();
                    if (forEdit == 1) {
                        UpdateImages($("#FileUpload2"), rowID, "UpdateAdvertisementSecondImage.ashx");
                    }
                }
                else {
                    alert("This browser does not support FileReader.");
                }
            });
            $("#FileUpload3").on('change', function () {
                if (typeof (FileReader) != "undefined") {
                    var image_holder = $("#image-holder3");
                    image_holder.empty();
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $("<img />",
                            {
                                "src": e.target.result,
                                "class": "thumb-image", "width": "75px", "height": "75px"
                            }).appendTo(image_holder);

                    }
                    image_holder.show();
                    reader.readAsDataURL($(this)[0].files[0]);
                    // $('#AddMore3').css("display", "block");
                    loadnewmainImg($("#divtimg"), $("#FileUpload3"));

                    var rowID = $("label[for='lblRowId']").text();
                    var forEdit = $("#insertOrEdit").text();
                    if (forEdit == 1) {
                        UpdateImages($("#FileUpload3"), rowID, "UpdateThirdImg.ashx");
                    }
                } else {
                    alert("This browser does not support FileReader.");
                }
            });
            $("#FileUpload4").on('change', function () {
                if (typeof (FileReader) != "undefined") {
                    var image_holder = $("#image-holder4");
                    image_holder.empty();
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $("<img />", {
                            "src": e.target.result,
                            "class": "thumb-image", "width": "75px", "height": "75px"
                        }).appendTo(image_holder);
                    }
                    image_holder.show();
                    reader.readAsDataURL($(this)[0].files[0]);
                    // $('#AddMore4').css("display", "block");
                    loadnewmainImg($("#divfourthimg"), $("#FileUpload4"));
                    var rowID = $("label[for='lblRowId']").text();
                    var forEdit = $("#insertOrEdit").text();
                    if (forEdit == 1) {
                        UpdateImages($("#FileUpload4"), rowID, "UpdateFourthImg.ashx");
                    }

                } else {
                    alert("This browser does not support FileReader.");
                }
            });

            // var pageID = 1;// GetParameterValues('pid');
            function GetParameterValues(param) {
                var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                for (var i = 0; i < url.length; i++) {
                    var urlparam = url[i].split('=');
                    if (urlparam[0] == param) {
                        return urlparam[1];
                    }
                }
            }

            BindCountry();
            $('#Country').val('US');
            $("#btnAddNew").click(function () {
                $('#divDetail').css("visibility", "visible");
                $("#btnAddNew").attr("disabled", "disabled");
                $("#divDetail").show();
            });

            $(function () {
                GetMobileNo();
                function GetMobileNo() {
                    $.ajax({
                        type: "POST", url: "../../ws/AssociateRegistration.asmx/ViewAssociateBasicDetails",
                        data: "{}", contentType: "application/json; charset=utf-8", dataType: "json",
                        async: false,
                        success: function (r) {
                            if (r.d.length > 0) {
                                var xmlDoc = $.parseXML(r.d);
                                var xml = $(xmlDoc);
                                var docs = xml.find("ViewAssociateBasicDetail");
                                var cartd = [];
                                var sd = [];
                                $.each(docs, function (i, docs) {
                                    txtContact.value = $(docs).find("MobileNo").text();
                                    $("#txtContact").attr("disabled", "disabled");
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
                }
            });

            $(function () {
                $("#State").change(function () {
                    BindStateWiseZipcode();
                });
            });
            $(function () {
                $("#city").change(function () {
                    BindStateWiseZipcode();
                });
            });

            function showLoader() {
                setTimeout(function () {
                    $("#pageloader").css("display", "block");
                }, 5500);
            }
            function hideLoader() {
                setTimeout(function () {
                    $("#pageloader").css("display", "none");
                }, 1500);
            }
            $("#btnSubmit").click(function () {
                //$('#btnSubmit').prop('disabled', true);
                //$('#btnCancelAll').prop('disabled', true);
                $("#lblFailureDetail").text('');
                $("#select-yourdesired").css("color","black");
                var check = Valid1();
                if (check == 0) {
                    $("#pageloader").css("display", "block");
                    setTimeout(function () {
                        PostAds();
                    }, 500); 
                }
                else {
                    var strarray = check.split(',');
                    var ValidationMessage = [];
                    ValidationMessage.push("<ul>");
                    for (var i = 0; i < strarray.length; i++) {
                        if (strarray[i] == 1) {
                            ValidationMessage.push("<li>Please select city.</li>");
                        }
                        if (strarray[i] == 2) {
                            ValidationMessage.push("<li>Please select state.</li>");
                        }
                        if (strarray[i] == 3) {
                            ValidationMessage.push("<li>Please select country.</li>");
                        }
                        if (strarray[i] == 4) {
                            ValidationMessage.push("<li>Please enter title.</li>");
                        }
                        if (strarray[i] == 6) {
                            ValidationMessage.push("<li>Please enter contact no.</li>");
                        }
                        if (strarray[i] == 7) {
                            ValidationMessage.push("<li>Please enter address.</li>");
                        }
                        if (strarray[i] == 8) {
                            ValidationMessage.push("<li>Please select zipcode.</li>");
                        }
                        if (strarray[i] == 9) {
                            ValidationMessage.push("<li>Selling price not entered.</li>");
                           
                        }
                        if (strarray[i] == 10) {
                            ValidationMessage.push("<li>Select your desired consumer segment(s).</li>");                            
                        }
                        if (strarray[i] == 11) {
                            ValidationMessage.push("<li>Price must be greater than 0.</li>");
                        }
                        //ValidationMessage += "</ul>";
                      
                        ValidationMessage.push("</ul>");
                       
                        // $("#lblFailureTitle").text(ValidationMessage);
                       // $('#fail_message').modal('show');
                    }           
                    $("#ErrorMsg").css({ "color": "red", "text-transform": "uppercase" });
                    $("#ErrorMsg").html(ValidationMessage);
                }
            });
            function PostAds()
            {             
                    $.ajax({
                        type: "POST",
                        url: "ws/CategoryPurchase.asmx/AssociateCardExists",
                        data: "{}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (r) {
                            if (r.d.length > 0) {
                                var xmlDoc = $.parseXML(r.d);
                                var xml = $(xmlDoc);
                                var docs = xml.find("CheckAssoCard");
                                if ($(docs).find("id").text() >= 1) {
                                    insertPostAdvsData();
                                }
                                else {
                                    $('#completeConsumerProfile').modal('show');
                                }
                            }
                        },
                        failure: function (response) {
                            alert(response.d + "Fail");
                        },
                        error: function (response) {
                            alert(response.d + "Error...");
                        }
                    });
                    hideLoader();
                
            }
            function Valid1() {
                var returnValue = 0;
                if ($("#Country").val() == 0) {
                    returnValue += "," + 1 + ",";
                }
                if ($("#State").val() == 0) {
                    returnValue += "," + 2 + ",";
                }
                if ($("#city").val() == 0) {
                    returnValue += "," + 3 + ",";
                }
                if ($("#txtName").val() == "") {
                    returnValue += "," + 4 + ",";
                }
                if ($("#txtContact").val() == "") {
                    returnValue += "," + 6 + ",";
                }
                if ($("#txtAddress").val() == "") {
                    returnValue += "," + 7 + ",";
                }
                if ($("#zipcode").val() == 0) {
                    returnValue += "," + 8 + ",";
                }
                if ($("#txtPrice").val() == "") {
                    returnValue += "," + 9 + ",";
                }
                if ($("#SubCategory").val() == null) {
                    returnValue += "," + 10 + ",";
                }
                if ($("#txtPrice").val() <= 0) {
                    returnValue += "," + 11 + ",";
                }
                return returnValue;
            }

            $("#btnupdateCard").click(function () {
                var check = Valid();
                if (check == 0) {
                    //$("#pageloader").css("display", "block");
                    //setTimeout(function () {
                        UpdateCardInfo();
                    //}, 500);
                    //$("#pageloader").css("display", "block");
                }
                else {
                    alert(check);
                }
            });
            function UpdateCardInfo()
            {   var CardNumber = $("#ContentPlaceHolder1_txtCreditCard").val();
                var Cardholder_FirstName = $("#ContentPlaceHolder1_cardFname").val();
                var Cardholder_LastName = $("#ContentPlaceHolder1_cardLastname").val();
                var Cardholder_Address = $("#ContentPlaceHolder1_Cardaddress").val();
                var Cardholder_City = $("#ContentPlaceHolder1_cardCity").val();
                var Cardholder_State = $('#ContentPlaceHolder1_cardState :selected').text();
                var Cardholder_Country = $("#ContentPlaceHolder1_cardCountry").val();
                // var Cardholder_Country = $('#ContentPlaceHolder1_cardCountry :selected').text();
                var Cardholder_Zip = $("#ContentPlaceHolder1_cardzipcode").val();
                var cvv = $("#ContentPlaceHolder1_txtCvv").val();
                var ExpMonth = $("#ContentPlaceHolder1_ddlMonth").val();
                var ExpYear = $("#ContentPlaceHolder1_ddlYear").val();
                var CardType = "Credit";
                var TotalAmount = "0";// lblToalAmountV.value;
                //var cardid = ContentPlaceHolder1_hidCardID.value;
                var cardid = $("#ContentPlaceHolder1_CardID").val();
                //alert(cardid1);
                $.ajax({
                    url: "../ws/AssociateSignUp.ashx?action=Ucardata&CardNumber=" + CardNumber + "&Cardholder_FirstName=" + Cardholder_FirstName + "&Cardholder_LastName=" + Cardholder_LastName + "&Cardholder_Address=" + Cardholder_Address + "&Cardholder_City=" + Cardholder_City + "&Cardholder_State=" + Cardholder_State + "&Cardholder_Country=" + Cardholder_Country + "&Cardholder_Zip=" + Cardholder_Zip + "&cvv=" + cvv + "&ExpMonth=" + ExpMonth + "&ExpYear=" + ExpYear + "&CardType=" + CardType + "&totalamount=" + TotalAmount + "&cardDataID=" + cardid + "",
                    data: {},
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    async: false,
                    type: "POST",
                    cache: false,
                    success: function (response) {
                        $('#completeConsumerProfile').modal('hide');
                        if (response == 1) {
                            $("#lblFailureTitle").text("Unsuccess.");
                            $("#lblFailureDetail").text("Something goes wrong. Please Try again.");
                            $('#fail_message').modal('show');
                        }
                        else if (response == "0") {
                            //$("#lblSuccess").text("Successful!!!")
                            //$("#lbldetail").text("Your credit card info has been Updated Successfully.")
                            //$('#success-message').modal('show');
                            $('#completeConsumerProfile').modal('hide');
                            // _Counter++;
                            insertPostAdvsData();
                        }
                        else if (response == "-1") {
                            $("#lblFailureTitle").text("Unsuccess.");
                            $("#lblFailureDetail").text("Something goes wrong. Please Try again.");
                            $('#fail_message').modal('show');
                        }
                        else { }
                    },
                    failure: function (response) {
                        alert(response + "Fail");
                    },
                    error: function (response) {
                        alert(response + "Error...");
                    }
                });
            }
            $("#btnAddCard").click(function () {
                var check = Valid();
                if (check == 0) {
                    var CardNumber = $("#ContentPlaceHolder1_txtCreditCard").val();
                    var Cardholder_FirstName = $("#ContentPlaceHolder1_cardFname").val();
                    var Cardholder_LastName = $("#ContentPlaceHolder1_cardLastname").val();
                    var Cardholder_Address = $("#ContentPlaceHolder1_Cardaddress").val();
                    var Cardholder_City = $("#ContentPlaceHolder1_cardCity").val();
                    var Cardholder_State = $('#ContentPlaceHolder1_cardState :selected').text();
                    var Cardholder_Country = $("#ContentPlaceHolder1_cardCountry").val();// $('#ContentPlaceHolder1_cardCountry :selected').text();
                    var Cardholder_Zip = $('#ContentPlaceHolder1_cardzipcode :selected').text();
                    var cvv = $("#ContentPlaceHolder1_txtCvv").val();
                    var ExpMonth = $("#ContentPlaceHolder1_ddlMonth").val();
                    var ExpYear = $("#ContentPlaceHolder1_ddlYear").val();
                    var CardType = "Credit";
                    var TotalAmount = "0";// lblToalAmountV.value;
                    var msg = [];
                    $.ajax({
                        url: "../ws/AssociateSignUp.ashx?action=CardData&CardNumber=" + CardNumber + "&Cardholder_FirstName=" + Cardholder_FirstName + "&Cardholder_LastName=" + Cardholder_LastName + "&Cardholder_Address=" + Cardholder_Address + "&Cardholder_City=" + Cardholder_City + "&Cardholder_State=" + Cardholder_State + "&Cardholder_Country=" + Cardholder_Country + "&Cardholder_Zip=" + Cardholder_Zip + "&cvv=" + cvv + "&ExpMonth=" + ExpMonth + "&ExpYear=" + ExpYear + "&CardType=" + CardType + "&totalamount=" + TotalAmount + "",
                        data: {},
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        async: false,
                        type: "POST",
                        cache: false,
                        success: function (response) {
                            if (response == "1") {
                                jQuery.noConflict();
                                $('#choose-consumer').modal('hide');
                                $("#lblFailureTitle").text("Failure!!");
                                $("#lblFailureDetail").text("Something Goes Wrong Please Try again.");
                                $('#fail_message').modal('show');
                            }
                            else if (response == "0") {
                                $('#completeConsumerProfile').modal('hide');
                                _Counter++;
                                insertPostAdvsData();
                            }
                            else if (response == "-1") {
                                jQuery.noConflict();
                                $('#choose-consumer').modal('hide');
                                $("#lblFailureTitle").text("Failure!!");
                                $("#lblFailureDetail").text("Something Goes Wrong Please Try again.");
                                $('#fail_message').modal('show');
                            }
                            else { }
                        },
                        failure: function (response) {
                            alert(response + "Fail");
                        },
                        error: function (response) {
                            alert(response + "Error...");
                        }
                    });
                }
                else {
                    alert(check);
                }
            });
            $("#zipcode").change(function () {
                if ($("#SubCategory").val() == null) {
                    $("#lblsegmentsMessage").css("display", "block");
                    $("#lblsegmentsMessage").text("SELECT YOUR DESIRED CONSUMER SEGMENT(S)");
                }
                else {
                    $("#lblsegmentsMessage").text("");
                    $("#lblsegmentsMessage").css("display", "none");
                    $.ajax({
                        type: "POST",
                        url: "ws/CategoryPurchase.asmx/GetPostAdvertisementPrice",
                        data: "{'zip':'" + $("#zipcode").val() + "','subCategoryID':'" + $("#SubCategory").val() + "'}",
                        contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                        success: function (r) {
                            if (r.d.length > 0) {
                                var xmlDoc = $.parseXML(r.d);
                                var xml = $(xmlDoc);
                                var docs = xml.find("GetPricePostAdvts");
                                $.each(docs, function (i, docs) {
                                    ($("#lblzipCodeprice").text($(docs).find("price").text()));
                                    $('#btnSubmit').css("background-color", "rgb(33, 150, 243)");
                                    $('#btnSubmit').prop('disabled', false);
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
                }
            });
            $(function () {
                $("#ContentPlaceHolder1_cardState").change(function () {
                    BindStateWiseZipcodeForCreditCard();
                });
                $("#ContentPlaceHolder1_cardCity").change(function () {
                    BindCityWiseStates();
                });

            });
            function BindCityWiseStates() {
                $.ajax({
                    type: "POST", url: "ws/CategoryPurchase.asmx/CityWiseStates",
                    data: "{'CityID':'" + $("#ContentPlaceHolder1_cardCity").val() + "'}",
                    contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                    success: function (r) {
                        if (r.d.length > 0) {
                            var xmlDoc = $.parseXML(r.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("CityWiseStates");
                            var cartd = [];
                            cartd.push("<option value=0>Select State</option>")
                            $.each(docs, function (i, docs) {
                                cartd.push(" <option value='" + $(docs).find("stateid").text() + "'>" + $(docs).find("stateid").text() + "</option>");
                            });
                            $("#ContentPlaceHolder1_cardState").html(cartd.join(''));
                        }
                    },
                    failure: function (response) {
                        alert(response.d + "Fail");
                    },
                    error: function (response) {
                        alert(response.d + "Error...");
                    }
                });
            }
            function BindStateWiseZipcodeForCreditCard() {
                $.ajax({
                    type: "POST", url: "ws/CategoryPurchase.asmx/StateWiseZipCode",
                    data: "{'StateID':'" + $("#ContentPlaceHolder1_cardState option:selected").text() + "', 'CityID':'" + $("#ContentPlaceHolder1_cardCity").val() + "'}",
                    contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                    success: function (r) {
                        if (r.d.length > 0) {
                            var xmlDoc = $.parseXML(r.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("CityWiseZip");
                            var cartd = [];
                            cartd.push("<option value=0>Select ZipCode</option>")
                            $.each(docs, function (i, docs) {
                                cartd.push(" <option value='" + $(docs).find("zipcode").text() + "'>" + $(docs).find("zipcode").text() + "</option>");
                            });
                            $("#ContentPlaceHolder1_cardzipcode").html(cartd.join(''));
                        }
                    },
                    failure: function (response) {
                        alert(response.d + "Fail");
                    },
                    error: function (response) {
                        alert(response.d + "Error...");
                    }
                });
            }
            function Valid() {
                var returnValue;
                if ($("#ContentPlaceHolder1_txtCreditCard").val() == "") {
                    returnValue = "Card Number is  required";
                    $("#ContentPlaceHolder1_txtCreditCard").focus();
                }
                else if ($("#ContentPlaceHolder1_ddlMonth").val() == 0) {
                    returnValue = "Select Month";
                }
                else if ($("#ContentPlaceHolder1_ddlYear").val() == 0) {
                    returnValue = "Select Year";
                }
                else if ($("#ContentPlaceHolder1_txtCvv").val() == "") {
                    returnValue = "CVV code is  required";
                    $("#ContentPlaceHolder1_txtCvv").focus();
                }
                else if ($("#ContentPlaceHolder1_cardFname").val() == "") {
                    returnValue = "First Name required";
                }
                else if ($("#ContentPlaceHolder1_cardLastname").val() == "") {
                    returnValue = "Last Name  required";
                }
                else if ($("#ContentPlaceHolder1_Cardaddress").val() == "") {
                    returnValue = "Address required";
                }
                else if ($("#ContentPlaceHolder1_cardCity").val() == "") {
                    returnValue = "City required";
                }
                else if ($("#ContentPlaceHolder1_cardState").val() == 0) {
                    returnValue = "Select State";
                }
                else if ($("#ContentPlaceHolder1_cardCountry").val() == 0) {
                    returnValue = "Select Country";
                }
                else if ($("#ContentPlaceHolder1_cardzipcode").val() == 0) {
                    returnValue = "Select Zipcode";
                }
                else {
                    returnValue = "0";
                }
                return returnValue;
            }
            function BindState() {
                $.ajax({
                    type: "POST", url: "ws/State.asmx/CountryWiseState", data: "{'Status':'1','CountryID':'US'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                    success: function (r) {
                        if (r.d.length > 0) {
                            var xmlDoc = $.parseXML(r.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("States1");
                            var cartd = [];
                            cartd.push("<option value=0>Select State</option>")
                            $.each(docs, function (i, docs) {
                                cartd.push(" <option value='" + $(docs).find("stateid").text() + "'>" + $(docs).find("stateid").text() + "</option>");
                            });
                            $("#ddlState").html(cartd.join(''));
                            //$("#ContentPlaceHolder1_cardState").html(cartd.join(''));
                        }
                    },
                    failure: function (response) {
                        alert(response.d + "Fail");
                    },
                    error: function (response) {
                        alert(response.d + "Error...");
                    }
                });
            }
            $("#btnCancelCard").click(function () {
                $("#ContentPlaceHolder1_txtCreditCard").val('');
                $("#ContentPlaceHolder1_cardFname").val('');
                $("#ContentPlaceHolder1_cardLastname").val('');
                $("#ContentPlaceHolder1_Cardaddress").val('');
                $("#ContentPlaceHolder1_cardzipcode").val('');
                $("#ContentPlaceHolder1_txtCvv").val('');
                $("#ContentPlaceHolder1_txtcity").val('');
            });
            $("#ContentPlaceHolder1_cardzipcode").change(function () {
                $('#btnAddCard').css("background-color", "rgb(33, 150, 243)");
                $('#btnAddCard').prop('disabled', false);

            });
            $("#ContentPlaceHolder1_txtCreditCard").change(function () {
                var fid = $("#ContentPlaceHolder1_txtCreditCard").val();
                var itemId = fid.charAt(0);
                if (itemId == 4) {
                    $('#ContentPlaceHolder1_CheckBox1').prop('checked', true);
                    $('#ContentPlaceHolder1_CheckBox2').prop('checked', false);
                    $('#ContentPlaceHolder1_CheckBox4').prop('checked', false);
                    $('#ContentPlaceHolder1_CheckBox3').prop('checked', false);
                }
                else if (itemId == 5) {
                    $('#ContentPlaceHolder1_CheckBox2').prop('checked', true);
                    $('#ContentPlaceHolder1_CheckBox1').prop('checked', false);
                    $('#ContentPlaceHolder1_CheckBox4').prop('checked', false);
                    $('#ContentPlaceHolder1_CheckBox3').prop('checked', false);
                }
                else if (itemId == 6) {
                    $('#ContentPlaceHolder1_CheckBox4').prop('checked', true);
                    $('#ContentPlaceHolder1_CheckBox2').prop('checked', false);
                    $('#ContentPlaceHolder1_CheckBox1').prop('checked', false);
                    $('#ContentPlaceHolder1_CheckBox3').prop('checked', false);
                }
                else if (itemId == 3) {
                    $('#ContentPlaceHolder1_CheckBox3').prop('checked', true);
                    $('#ContentPlaceHolder1_CheckBox2').prop('checked', false);
                    $('#ContentPlaceHolder1_CheckBox4').prop('checked', false);
                    $('#ContentPlaceHolder1_CheckBox1').prop('checked', false);
                }
                else {

                }

            });


            function insertPostAdvsData() {
                var check = Valid1();
                if (check == 0) {
                    $.ajax({
                        type: "POST",
                        url: "ws/Sale.asmx/CountAssociateAdvertisements",
                        data: "{}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (r1) {
                            if (r1.d.length > 0) {
                                var xmlDoc1 = $.parseXML(r1.d);
                                var xml1 = $(xmlDoc1);
                                var docs1 = xml1.find("AssociateAdvertisements");
                                $.each(docs1, function (i, docs1) {
                                    if ($(docs1).find("totalAdts").text() < 15) {
                                        PayAmount();
                                    }
                                    else {
                                        $("#lblFailureTitle").text("Maximum Limit is expired.")
                                        $("#lblFailureDetail").text("YOU'VE REACHED THE MAXIMUM ALLOWED NUMBER OF SALES ADVERTISEMENT POSTS.")
                                        $('#fail_message').modal('show');
                                        return false;
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
                }
                else {
                    var strarray = check.split(',');
                    for (var i = 0; i < strarray.length; i++) {
                        //alert(strarray[i])
                        if (strarray[i] == 1) {
                            $('#defaultOpen').css("background-color", "red");
                        }
                        if (strarray[i] == 2) {
                            $('#defaultOpen1').css("background-color", "red");
                        }
                        if (strarray[i] == 3) {
                            $('#defaultOpen2').css("background-color", "red");
                        }
                        else if (strarray[i] == "zipcode Required!") {
                            alert("Select Zipcode");
                        }
                    }
                }
            }
            $("#btnUpdate").click(function () {
                $('#defaultOpen').css("background-color", "#367fa9");
                $('#defaultOpen1').css("background-color", "#367fa9");
                $('#defaultOpen2').css("background-color", "#367fa9");
                var check = Valid1();
                if (check == 0) {
                    UpdateD();
                }
                else {
                    var strarray = check.split(',');
                    for (var i = 0; i < strarray.length; i++) {
                        //alert(strarray[i])
                        if (strarray[i] == 1) {
                            $('#defaultOpen').css("background-color", "red");
                        }
                        if (strarray[i] == 2) {
                            $('#defaultOpen1').css("background-color", "red");
                        }
                        if (strarray[i] == 3) {
                            $('#defaultOpen2').css("background-color", "red");
                        }
                    }
                }
            });



            function PayAmount() {
                var msg = [];
                var totalAmount = $("#lblzipCodeprice").text();
                var AmountPaidForAdvertisement = PaidAmountForPurchaseAdvertisement(totalAmount, $("#txtName").val(), lblsubcat.value);
                if (AmountPaidForAdvertisement == 1) {
                var CategoryId = 1;
                var subCategoryId = $("#SubCategory").val();
                var title = $("#txtName").val();
                var featurs = CKEDITOR.instances.txtFeatures.getData();// $("#ContentPlaceHolder1_txtFeatures").val();                   
                var address = $("#txtAddress").val();
                var contactNo = $("#txtContact").val();
                var description = $("#txtdescription").val();
                var countryID = $("#Country").val();
                var stateID = $("#State").val();
                var cityId = $("#city").val();
                var zipcod = $("#zipcode").val();
                var isFeatured = 0;
                var jobtype = 1;
                var amount = 0;
                var adsPrice = $("#lblzipCodeprice").text();
                if ($("#txtPrice").val() == "") {
                    amount = 0;
                }
                else {
                    amount = $("#txtPrice").val();
                }
                var SaveRecordPostAdvts = SavePostAdvertisementsData(CategoryId, subCategoryId, title, featurs, address, contactNo, description, countryID, stateID, cityId, zipcod, isFeatured, jobtype, amount, adsPrice);
                if (SaveRecordPostAdvts >= 1) {
                    PurchasedCategorybyAssociate(1, subCategoryId, 1, 0, 0, 0, 0, 0);
                    $("#txtName").val('');
                    $("#txtFeatures").val('');
                    $("#txtAddress").val('');
                    $("#txtContact").val('');
                    $("#txtdescription").val('');
                    $("#txtAddress").val('');
                    $("#txtPrice").val('0');
                    advertisementImages(SaveRecordPostAdvts);
                }
                else {
                    $("#lblFailureTitle").text("We can not complete this sales Advertisement Purchase at this time!!");
                    $("#lblFailureDetail").text("Please validate the card information that we have on file.  If you still require additional assistance, please contact customer support at 866.456.7331.");
                    $('#fail_message').modal('show');
                }
                }
                else {
                    if (_Counter == 0) {
                        $('#btnSubmit').prop('disabled', false);
                        $('#btnCancelAll').prop('disabled', false);
                        $('#completeConsumerProfile').modal('show');
                        _Counter++;
                        $("#btnupdateCard").css("display", "inline-block");
                        $("#btnAddCard").css("display", "none");
                        $("#btnCancelCard").css("display", "inline-block");
                    }
                    else {
                        _Counter++;
                        $("#lblFailureTitle").text("We can not complete this sales Advertisement Purchase at this time!!")
                        $("#lblFailureDetail").text("Please validate the card information that we have on file.  If you still require additional assistance, please contact customer support at 866.456.7331.")
                        $('#fail_message').modal('show');
                    }
                }
            }
            function advertisementImages(rowID) {
                var fileUpload = $("#FileUpload1").get(0);
                var files = fileUpload.files;
                var test = new FormData();
                var secondupload = $("#FileUpload2").get(0);
                var files2 = secondupload.files;
                var thirdupload = $("#FileUpload3").get(0);
                var files3 = thirdupload.files;
                var fourthupload = $("#FileUpload4").get(0);
                var files4 = fourthupload.files;
                for (var i = 0; i < files.length; i++) {
                    test.append(files[i].name, files[i], rowID);
                    if ($("#FileUpload2").val() == '') {
                    }
                    else {
                        test.append(files2[i].name, files2[i], rowID);
                    }
                    if ($("#FileUpload3").val() == '') {
                    }
                    else {
                        test.append(files3[i].name, files3[i], rowID);
                    }
                    if ($("#FileUpload4").val() == '') {
                    }
                    else {
                        test.append(files4[i].name, files4[i], rowID);
                    }
                }
                $.ajax({
                    url: "UploadHandler.ashx",
                    type: "POST",
                    contentType: false,
                    processData: false,
                    data: test,
                    success: function (result) {
                        $("#FileUpload1").val("");
                        $("#FileUpload2").val("");
                        $("#FileUpload3").val("");
                        $("#FileUpload4").val("");
                        $("#image-holder").empty();
                        $("#image-holder2").empty();
                        $("#image-holder3").empty();
                        $("#image-holder4").empty();

                        $("#Allimage-holder").empty();
                        $("#Allimage-holder1").empty();
                        $("#Allimage-holder2").empty();
                        $("#Allimage-holder3").empty();
                        $("#btnAddNew").removeAttr('disabled');
                        ClearText();
                        BindData();
                        $("#lblSuccess").text("Successful Sales Advertisment Purchased.");
                        $("#lbldetail").text("Your credit card has been Successfully charged!!!.");
                        $('#success-message').modal('show');
                    },
                    error: function (err) {
                        alert(err.statusText);
                    }
                });
            }
            function UpdateD() {
                var CategoryId = 1;//Category.value;
                var subCategoryId = $("#SubCategory").val();
                var countryID = $("#Country").val();
                var StateID = $("#State").val();
                var cityID = $("#city").val();
                var address = $("#txtAddress").val();
                var featurs = CKEDITOR.instances.txtFeatures.getData();
                var teamlist = [];
                $("#divFeatures input[id*='chk']:checked").each(function () {
                    teamlist.push($(this).val());
                });
                var rowID = $("label[for='lblRowId']").text();
                var msg = [];
                $.ajax({
                    type: "POST",
                    url: "ws/Sale.asmx/UpdateSale",
                    data: "{'CategoryId':'" + CategoryId + "','SubCategoryId':'" + subCategoryId + "','title':'" + $("#txtName").val() + "','Features':'" + featurs + "','address':'" + address.trim() + "','contactNo':'" + $("#txtContact").val() + "','description':'" + $("#txtdescription").val().trim() + "','countryID':'" + countryID + "','StateID':'" + StateID + "','cityID':'" + cityID + "','address':'" + $("#txtAddress").val().trim() + "','zipcode':'" + $("#zipcode option:selected").text() + "','FeatureID':'" + teamlist + "','amount':'" + $("#txtPrice").val() + "','id':'" + rowID + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (r) {
                        if (r.d == "-1") {
                            $("#lblFailureTitle").text("This Record is Already Exists");
                            $("#lblFailureDetail").text("This Record is Already Exists");
                            $('#fail_message').modal('show');
                        }
                        if (r.d == "3") {
                            $("#lblFailureTitle").text("Unsucessfull!!!");
                            $("#lblFailureDetail").text("Try again....");
                            $('#fail_message').modal('show');
                        }
                        else if (r.d >= "1") {
                            $("#lblSuccess").text("Successfull.");
                            $("#lbldetail").text("Updated Successfully.");
                            $('#success-message').modal('show');
                            $('#divDetail').css("visibility", "hidden");
                            $('#divDetail1').css("visibility", "hidden");

                            $('#divImgbutton').css("display", "none");
                            $('#divMoreImages').css("visibility", "hidden");
                            $('#divsave').css("visibility", "hidden");
                            $('#divImage').css("display", "none");
                            $('#btnUpdate').css("visibility", "hidden");
                            $("#btnAddNew").attr("disabled", true);
                            BindData();

                        }
                        ClearText();
                        //BindData();
                    },
                    failure: function (response) {
                        alert(response.d + "Fail");
                    },
                    error: function (response) {
                        alert(response.d + "Error...");
                    }
                });
            }
            function ClearText() {
                $("#txtName").val('');
                $("#txtFeatures").val('');
                $("#txtAddress").val('');
                $("#txtContact").val('');
                $("#txtdescription").val('');
                $("#txtAddress").val('');
                $("#txtPrice").val('0');
                $('#divImgbutton').css("display", "none");
                $('#divImage').css("display", "none");
                $('#divMoreImages').css("visibility", "hidden");
                $('#divsave').css("visibility", "hidden");

            }
            $("#btnReset").click(function () {
                ClearText();
            });
            $("#btnCancelAll").click(function () {
                if (confirm("Are you sure want to delete?")) {
                    window.location.href = "PostAdvertisement.aspx";
                }

                //ClearText();
            });
            $("#btnCancel").click(function () {
                ClearText();
                window.location.href = "Dashboard.aspx";
            });
            BindState();
            BindData();

            $("#city").change(function () {
                BindStateWiseZipcode();
            });
            var arrayCategories = [];

            $("#subCatHome").click(function (e) {
                $("#SubCategory").empty();
                e.preventDefault();
                $("#lblsegmentsMessage").text("");
                $("#lblsegmentsMessage").css("display", "none");
                $("#subCatHome").addClass("active");
                $("#subCatTownHome").removeClass("active");
                $("#subCatMultiFamily").removeClass("active");
                $("#subCatLand").removeClass("active");
                //$("#subCatTownHome").addClass("diable-sidelink");
                //$("#subCatMultiFamily").addClass("diable-sidelink");
                //$("#subCatLand").addClass("diable-sidelink");
                lblsubcat.value = "Home";
                var flg = 0;
                $('#SubCategory option').each(function () {
                    if ($(this).val() == 1) {
                        flg = 1;
                        return false;
                    }
                    else {
                        flg = 0;
                    }
                });
                if (flg == 0) {
                    arrayCategories.push(1);
                    var _select = $('<select>');
                    _select.append($('<option></option>').val(1).html("Home"));
                    $('#SubCategory').append(_select.html());
                }

            });
            $("#subCatTownHome").click(function (e) {
                $("#SubCategory").empty();
                e.preventDefault();
                $("#lblsegmentsMessage").text("");
                $("#lblsegmentsMessage").css("display", "none");
                $("#subCatTownHome").addClass("active");
                $("#subCatHome").removeClass("active");
                $("#subCatMultiFamily").removeClass("active");
                $("#subCatLand").removeClass("active");
                //$("#subCatHome").addClass("diable-sidelink");
                //$("#subCatMultiFamily").addClass("diable-sidelink");
                //$("#subCatLand").addClass("diable-sidelink");
                lblsubcat.value = "TownHome";
                var flg = 0;
                $('#SubCategory option').each(function () {
                    if ($(this).val() == 2) {
                        flg = -1;
                        return false;
                    }
                    else {
                        flg = 0;
                    }


                });
                if (flg == 0) {
                    arrayCategories.push(2);
                    var _select = $('<select>');
                    _select.append($('<option></option>').val(2).html("TownHome"));
                    $('#SubCategory').append(_select.html());
                }

            });
            $("#subCatMultiFamily").click(function (e) {
                $("#SubCategory").empty();
                e.preventDefault();
                $("#lblsegmentsMessage").text("");
                $("#lblsegmentsMessage").css("display", "none");
                $("#subCatMultiFamily").addClass("active");
                $("#subCatTownHome").removeClass("active");
                $("#subCatHome").removeClass("active");
                $("#subCatLand").removeClass("active");
                //$("#subCatHome").addClass("diable-sidelink");
                //$("#subCatTownHome").addClass("diable-sidelink");
                //$("#subCatLand").addClass("diable-sidelink");
                lblsubcat.value = "MultiFamily";
                var flg = 0;
                $('#SubCategory option').each(function () {
                    if ($(this).val() == 3) {
                        flg = 1;
                        return false;
                    }
                    else {
                        flg = 0;
                    }
                });
                if (flg == 0) {
                    arrayCategories.push(3);
                    var _select = $('<select>');
                    _select.append($('<option></option>').val(3).html("MultiFamily"));
                    $('#SubCategory').append(_select.html());
                }
                // PurchasedCategorybyAssociate(1, 3, 1, 0, 0, 0, 0, 0);
            });
            $("#subCatLand").click(function (e) {
                $("#SubCategory").empty();
                e.preventDefault();
                $("#lblsegmentsMessage").text("");
                $("#lblsegmentsMessage").css("display", "none");
                $("#subCatLand").addClass("active");
                $("#subCatMultiFamily").removeClass("active");
                $("#subCatTownHome").removeClass("active");
                $("#subCatHome").removeClass("active");

                //$("#subCatHome").addClass("diable-sidelink");
                //$("#subCatTownHome").addClass("diable-sidelink");
                //$("#subCatMultiFamily").addClass("diable-sidelink");
                lblsubcat.value = "Land";
                var flg = 0;
                $('#SubCategory option').each(function () {
                    if ($(this).val() == 4) {
                        flg = 1;
                        return false;
                    }
                    else {
                        flg = 0;
                    }
                });
                if (flg == 0) {
                    arrayCategories.push(4);
                    var _select = $('<select>');
                    _select.append($('<option></option>').val(4).html("Land"));
                    $('#SubCategory').append(_select.html());
                }
                // PurchasedCategorybyAssociate(1, 4, 1, 0, 0, 0, 0, 0);
            });
            function PurchasedCategorybyAssociate(CatID, SubCatID, PlanID, Price, Zipcode, CouponCode, Discount, Duration) {
                var msg = [];
                $.ajax({
                    type: "POST",
                    url: "ws/CategoryPurchase.asmx/InsertCatgoryPostAds",
                    data: "{'categoryID':'" + CatID + "','SubcategoryID':'" + SubCatID + "','PlanID':'" + PlanID + "','pricevalues':'" + Price + "','zipcodeID':'" + Zipcode + "','Couponcode':'" + CouponCode + "','Discount':'" + Discount + "','Duration':'" + Duration + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (r) {

                    },
                    failure: function (response) {
                        alert(response.d + "Fail");
                    },
                    error: function (response) {
                        alert(response.d + "Error...");
                    }
                });
            }
            $("#btncheckout").click(function () {
                $.ajax({
                    type: "POST",
                    url: "ws/CategoryPurchase.asmx/AssociateCardExists",
                    data: "{}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (r) {
                        if (r.d.length > 0) {
                            var xmlDoc = $.parseXML(r.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("CheckAssoCard");
                            if ($(docs).find("id").text() >= 1) {
                                //if (CouponCode.value == 1) {
                                var a = 0;
                                var b = 0;
                                var c = 0;
                                ApplycoponCode(a, b, c);
                            }
                            else {
                                if (confirm("Are you sure you want to add Credit Card?")) {
                                    var totalAmount = $("label[for='lblToalAmount1']").text();
                                    window.location.href = 'CreditCard.aspx?amt=' + totalAmount;
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                    },
                    failure: function (response) {
                        alert(response.d + "Fail");
                    },
                    error: function (response) {
                        alert(response.d + "Error...");
                    }
                });
            });
        });
        function ApplycoponCode(ccode, disc, duration) {
            if ($("#MemberShip").val() == 0) {
                alert("Select Membership Plan");
            }
            else {
                var teamlist = [];
                var zipcodelist = [];
                var PriceValues = [];
                var CatIdValue = [];
                $.ajax({
                    type: "POST", url: "ws/CategoryPurchase.asmx/SelectAllPurchasedCartData",
                    data: "{}",
                    contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                    success: function (r) {
                        if (r.d.length > 0) {
                            var xmlDoc = $.parseXML(r.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("Table1");
                            $.each(docs, function (i, docs) {
                                teamlist.push($(docs).find("subCategoryID").text());
                                zipcodelist.push($(docs).find("Zipcode").text());
                                PriceValues.push($(docs).find("Price").text());
                                CatIdValue.push($(docs).find("CategoryID").text());
                            });
                        }
                    }
                });
                var msg = [];
                $.ajax({
                    type: "POST",
                    url: "ws/CategoryPurchase.asmx/InsertCategory",
                    data: "{'categoryID':'" + CatIdValue + "','SubcategoryID':'" + teamlist + "','PlanID':'" + $("#MemberShip").val() + "','pricevalues':'" + PriceValues + "','zipcodeID':'" + zipcodelist + "','Couponcode':'" + ccode + "','Discount':'" + disc + "','Duration':'" + duration + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (r) {
                        if (r.d == "1") {
                            var pvalue = $("label[for='lblCatPrice']").text();
                            if (pvalue == 0) {
                                $("#purchasebutton").css("display", "none");
                                $("#divSuccess").css({ "diplay": "block" });
                                msg.push("<strong>Well done ! </strong>Purchased Successfully");
                                setTimeout(function () {
                                    $('#divSuccess').fadeOut('fast');
                                }, 2000);
                                AssociatealreadyCategories();
                            }
                            else {
                                // This Web Services is used to send amount to be transaction, right now it is not in use because card data stuff is moved from db
                                var MonthValue = MemberShip.value;
                                var totalAmount = $("label[for='lblCatPrice']").text();
                                $.ajax({
                                    type: "POST",
                                    url: "ws/CategoryPurchase.asmx/InsertAmount",
                                    data: "{'amount':'" + MonthValue * totalAmount + "'}",
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    async: false,
                                    cache: false,
                                    success: function (r) {
                                        if (r.d == "1") {
                                            $("#purchasebutton").css({ "diplay": "none" });
                                            $("#divSelectedChce").css({ "diplay": "none" });
                                            AssociatealreadyCategories();
                                            alert("Purchased Successfully.");
                                            RemoveCardSessions();
                                        }
                                        else if (r.d == "0") {
                                            jQuery.noConflict();
                                            $('#choose-consumer').modal('hide');
                                            $("#lblFailureTitle").text("Failure!!");
                                            $("#lblFailureDetail").text("Already Exists.");
                                            $('#fail_message').modal('show');
                                        }
                                        else if (r.d == "3") {
                                            jQuery.noConflict();
                                            $('#choose-consumer').modal('hide');
                                            $("#lblFailureTitle").text("Failure!!");
                                            $("#lblFailureDetail").text("Something Goes Wrong Please Try again.");
                                            $('#fail_message').modal('show');
                                        }
                                        else { }
                                    },
                                    failure: function (response) {
                                        alert(response.d + "Fail");
                                    },
                                    error: function (response) {
                                        alert(response.d + "Error...");
                                    }
                                });
                                //end here
                            }
                        }
                        else if (r.d == "0") {
                            jQuery.noConflict();
                            $('#choose-consumer').modal('hide');
                            $("#lblFailureTitle").text("Failure!!");
                            $("#lblFailureDetail").text("Already Exists.");
                            $('#fail_message').modal('show');
                        }
                        if (r.d == "3") {
                            jQuery.noConflict();
                            $('#choose-consumer').modal('hide');
                            $("#lblFailureTitle").text("Failure!!");
                            $("#lblFailureDetail").text("Something Goes Wrong Please Try again.");
                            $('#fail_message').modal('show');
                        }
                    },
                    failure: function (response) {
                        alert(response.d + "Fail");
                    },
                    error: function (response) {
                        alert(response.d + "Error...");
                    }
                });
            }
        }
        function BindData() {
            var pageID = 1;// GetParameterValues('pid');            
            $('#divAdvtDetail').css("visibility", "visible");
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/SelectAdvertisement", data: "{'Jobtype':'" + pageID + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: true,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAdvertisment");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed'> <tbody>");
                        cartd.push("<tr><th>Adv ID </th><th>Primary Image</th><th>Category</th> <th>Sub-Category</th>   <th>Advertisement Title</th><th>Selling Price</th> <th>Cost</th> <th> Action </th> </tr>");
                        var count = 0;
                        var Totalamount = 0;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr id='dataall'>");
                            cartd.push("<td>" + $(docs).find("advertisementID").text() + " </td>");
                            cartd.push("<td><img  width='80px' height='80px'   src='Adv_img/" + ($(docs).find("advMainImage").text()) + "' alt='' class='img-responsive'> </td>");
                            cartd.push("<td class='hightlight-label'>" + $(docs).find("categoryname").text() + " </td>");
                            cartd.push("<td>" + $(docs).find("name").text() + " </td>");
                            cartd.push("<td>" + $(docs).find("title").text() + " </td>");
                            cartd.push("<td>$" + $(docs).find("cost").text() + " </td>");
                            cartd.push("<td>$" + $(docs).find("Amount").text() + " </td>");
                            cartd.push("<td class='action-label'><i class='fa fa-edit' onclick=EditRecords('" + ($(docs).find("advertisementID").text()) + "') > </i>   <i class='fa fa-trash' onclick=DeleteRecords('" + ($(docs).find("advertisementID").text()) + "') id='" + ($(docs).find("advertisementID").text()) + "'> </i></td>");
                            //  cartd.push("<td> <input type='button'  class='btn btn-primary' id='btnEdit' value='Edit'  onclick=ShowPopUp('" + ($(docs).find("advertisementID").text()) + "," + ($(docs).find("CategoryID").text()) + "," + ($(docs).find("subcategoryID").text()) + "," + newstrTitle + "," + newstrfeatures + "," + newstraddress + "," + contact + "," + newstrdescription + "," + newimage + "," + newcost + "," + newisFeatured + "," + ($(docs).find("CountryID").text()) + "," + ($(docs).find("StateID").text()) + "," + ($(docs).find("CityID").text()) + "," + newzipcode + "," + newimage1 + "," + newimage2 + "," + newimage3 + "')   id='" + ($(docs).find("advertisementID").text()) + "'     />  <input type='button' class='btn btn-primary' onclick=DeleteRecords('" + ($(docs).find("advertisementID").text()) + "') id='" + ($(docs).find("advertisementID").text()) + "' value='Delete'/><input type='button' class='btn btn-primary' onclick=EditRecords('" + ($(docs).find("advertisementID").text()) + "')  value='NEdit'/></td>");
                            cartd.push("</tr>");
                            var a = $(docs).find("Amount").text();
                            Totalamount = parseInt(Totalamount) + parseInt(a);
                            count++;
                        });
                        $("#lblPurchaseCategories1").text(count);
                        $("#lblTotalamount2").text(isNaN(parseInt(Totalamount)) ? 0 : parseInt(Totalamount));
                        $("#lblTotalamount").text(isNaN(parseInt(Totalamount)) ? 0 : parseInt(Totalamount));
                        cartd.push("</table>");
                        $("#divAdvtDetail").html(cartd.join(''));
                    }
                    else {
                        $('#divAdvtDetail').css("visibility", "hidden");
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
        function DeleteRecords(dynar) {
            if (confirm("Are you sure?")) {
                var msg = [];
                $.ajax({
                    type: "POST", url: "ws/Sale.asmx/DeleteDataFromadvertisement", data: "{'advtID':'" + dynar + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (r) {
                        if (r.d == "-1") {
                            jQuery.noConflict();
                            $("#lblFailureTitle").text("Failure!");
                            $("#lblFailureDetail").text("Already Exists.");
                            $('#fail_message').modal('show');
                        }
                        if (r.d == "3") {
                            jQuery.noConflict();
                            $("#lblFailureTitle").text("Failure!");
                            $("#lblFailureDetail").text("OOPS Error ! Please try again.");
                            $('#fail_message').modal('show');
                        }
                        else if (r.d = "1") {
                            jQuery.noConflict();
                            $("#lblSuccess").text("Success!!")
                            $("#lbldetail").text("Deleted Succesfully.")
                            $('#success-message').modal('show');
                            BindData();
                            $('#divDetail1').css("visibility", "hidden");
                            $('#divImgbutton').css("display", "none");
                            $('#divMoreImages').css("visibility", "hidden");
                            $('#divsave').css("visibility", "hidden");
                            $('#divImage').css("display", "none");
                            $('#btnUpdate').css("visibility", "hidden");
                        }
                    },
                    failure: function (response) {
                        alert(response.d + "Fail");
                    },
                    error: function (response) {
                        alert(response.d + "Error...");
                    }
                })
            }
        }
        function EditRecords(dynar) {
            $("#insertOrEdit").text("1");
            $("#divAdvertisements").css("display", "block");
            $("#addForm").css("display", "block");
            $('#divDetail').css("visibility", "visible");
            $("#btnAddNew").attr("disabled", "disabled");
            $('#divDetail1').css("visibility", "visible");
            $('#divImage').css("display", "none");
            $('#divsave').css("display", "block");
            $('#btnSubmit').css("display", "none");
            $('#btnUpdate').css("display", "inline-block");
            $('#divImgbutton').css("display", "block");
            $('#ViewAllImages').css("visibility", "visible");
            $('#divtabs').css("display", "block");
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/ViewAdvertisementDetails",
                data: "{'adID':'" + dynar + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json", async: true,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("FullDetailsAdvertisments");
                        $.each(docs, function (i, docs) {
                            $("label[for='lblRowId']").text($(docs).find("advertisementID").text());
                            var catValue = $(docs).find("subcategoryID").text();
                            if (catValue == 1) {
                                $("#subCatTownHome").removeClass("active");
                                //$("#subCatTownHome").addClass("diable-sidelink");
                                //   $("#subCatHome").removeClass("diable-sidelink");
                                $("#subCatHome").addClass("active");
                                $("#subCatMultiFamily").removeClass("active");
                                //$("#subCatMultiFamily").addClass("diable-sidelink");
                                $("#subCatLand").removeClass("active");
                                //$("#subCatLand").addClass("diable-sidelink");
                                var _select = $('<select>');
                                _select.append($('<option></option>').val(1).html("Home"));
                                $('#SubCategory').append(_select.html());
                            }
                            else if (catValue == 2) {
                                //$("#subCatTownHome").removeClass("diable-sidelink");
                                $("#subCatTownHome").addClass("active");
                                $("#subCatHome").removeClass("active");
                                //$("#subCatHome").addClass("diable-sidelink");
                                $("#subCatMultiFamily").removeClass("active");
                                //$("#subCatMultiFamily").addClass("diable-sidelink");
                                $("#subCatLand").removeClass("active");
                                //$("#subCatLand").addClass("diable-sidelink");
                                var _select = $('<select>');
                                _select.append($('<option></option>').val(2).html("TownHome"));
                                $('#SubCategory').append(_select.html());
                            }
                            else if (catValue == 3) {
                                $("#subCatMultiFamily").addClass("active");
                                $("#subCatTownHome").removeClass("active");
                                //$("#subCatTownHome").addClass("diable-sidelink");
                                $("#subCatHome").removeClass("active");
                                //$("#subCatHome").addClass("diable-sidelink");
                                $("#subCatLand").removeClass("active");
                                //$("#subCatLand").addClass("diable-sidelink");
                                var _select = $('<select>');
                                _select.append($('<option></option>').val(3).html("Multi-Family"));
                                $('#SubCategory').append(_select.html());
                            }
                            else if (catValue == 4) {
                                $("#subCatLand").addClass("active");
                                $("#subCatMultiFamily").removeClass("active");
                                //$("#subCatMultiFamily").addClass("diable-sidelink");
                                $("#subCatTownHome").removeClass("active");
                                //$("#subCatTownHome").addClass("diable-sidelink");
                                $("#subCatHome").removeClass("active");
                                //$("#subCatHome").addClass("diable-sidelink");
                                var _select = $('<select>');
                                _select.append($('<option></option>').val(4).html("Land"));
                                $('#SubCategory').append(_select.html());
                            }

                            $("#SubCategory").val($(docs).find("subcategoryID").text());
                            $("#txtName").val($(docs).find("title").text());
                            //$("#txtFeatures").val($(docs).find("features").text());
                            CKEDITOR.instances.txtFeatures.setData($(docs).find("features").text());
                            $("#txtAddress").val($(docs).find("address").text());
                            $("#txtContact").val($(docs).find("contactNo").text());
                            $("#txtdescription").val($(docs).find("description").text());
                            var sd = [];
                            sd.push("<img class='thumb-image' width='75px' height='75px' src='../Associate/Adv_img/" + $(docs).find("advMainImage").text() + "'/>");
                            $("#image-holder").html(sd.join(''));
                            txtPrice.value = $(docs).find("cost").text();
                            Country.value = $(docs).find("CountryID").text();
                            BindState();
                            $("#State").val($(docs).find("StateID").text());
                            //BindCity();
                            $("#city").val($(docs).find("CityID").text());
                            var sd1 = [];
                            sd1.push("<img class='thumb-image' width='75px' height='75px' src='../Associate/Adv_img/" + $(docs).find("advImage1").text() + "'/> ");
                            $("#image-holder2").html(sd1.join(''));
                            var sd2 = [];
                            sd2.push("<img class='thumb-image' width='75px' height='75px' src='../Associate/Adv_img/" + $(docs).find("advImage2").text() + "'/> ");
                            $("#image-holder3").html(sd2.join(''));
                            var sd3 = [];
                            sd3.push("<img class='thumb-image' width='75px' height='75px' src='../Associate/Adv_img/" + $(docs).find("advImage3").text() + "'/> ");
                            $("#image-holder4").html(sd3.join(''));
                            BindStateWiseZipcode();
                            $("#zipcode").val($(docs).find("ZipCode").text());
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
        }
        function RemoveOneImg(d) {
            if (d == 1) {
                $("#Allimage-holder").empty();
                $("#divImage").css("display", "block");
                $("#divsImage").css("display", "none");
                $("#divfourthImage").css("display", "none");
                $("#divthrdImage").css("display", "none");
            }
            else if (d == 2) {
                $("#divImage").css("display", "none");
                $("#Allimage-holder1").empty();
                $("#divsImage").css("display", "block");
                $("#divfourthImage").css("display", "none");
                $("#divthrdImage").css("display", "none");
            }
            else if (d == 3) {
                $("#divImage").css("display", "none");
                $("#Allimage-holder2").empty();
                $("#divsImage").css("display", "none");
                $("#divfourthImage").css("display", "none");
                $("#divthrdImage").css("display", "block");

            }
            else if (d == 4) {
                $("#divImage").css("display", "none");
                $("#Allimage-holder3").empty();
                $("#divsImage").css("display", "none");
                $("#divthrdImage").css("display", "none");
                $("#divfourthImage").css("display", "block");

            }
            else { }
        }
        function ShowPopUp(dynar) {
            $('#divDetail').css("visibility", "visible");
            $("#btnAddNew").attr("disabled", "disabled");
            $('#divDetail1').css("visibility", "visible");
            $('#divImage').css("display", "block");
            $('#divMoreImages').css("visibility", "visible");
            $('#divsave').css("visibility", "visible");
            $('#btnSubmit').css("visibility", "hidden");
            $('#btnUpdate').css("visibility", "visible");
            var array = dynar.split(",");
            for (var i in array) {
                if (i == 0) {
                    if (array[i] == '') {
                        lblRowId.value = "";
                    }
                    else {
                        $("label[for='lblRowId']").text(array[i]);
                    }
                }
                else if (i == 1) {
                    if (array[i] == '') {

                    }
                    else {
                        $("#Category").val(array[i]);
                    }
                }
                else if (i == 2) {
                    if (array[i] == '') {

                    }
                    else {
                        BindSubCategory();
                        $("#SubCategory").val(array[i]);
                    }
                }
                else if (i == 3) {
                    if (array[i] == '') {
                        $("#txtName").val('');
                    }
                    else {
                        var nm = array[i].toString();
                        var gh = nm.replace('-', ' ');
                        $("#txtName").val(gh);
                    }
                }
                else if (i == 4) {
                    if (array[i] == '') {
                        $("#txtFeatures").val('');
                    }
                    else {
                        var features = array[i].toString();
                        var features1 = features.replace('-', ' ');
                        $("#txtFeatures").val(features1);
                    }
                }
                else if (i == 5) {
                    if (array[i] == '') {
                        $("#txtAddress").val('');
                    }
                    else {
                        var address = array[i].toString();
                        var address1 = address.replace('-', ' ');
                        $("#txtAddress").val(address1);
                    }
                }
                else if (i == 6) {
                    if (array[i] == '') {
                        $("#txtContact").val('');
                    }
                    else {
                        var contact = array[i].toString();
                        $("#txtContact").val(contact);
                    }
                }
                else if (i == 7) {
                    if (array[i] == '') {
                        $("#txtdescription").val('');
                    }
                    else {
                        var description = array[i].toString();
                        $("#txtdescription").val(description);
                    }
                }
                else if (i == 8) {
                    if (array[i] == '') {

                    }
                    else {
                        var sd = [];
                        sd.push("<img class='thumb-image' src='../Associate/Adv_img/" + array[i].toString() + "'/> ");
                        $("#image-holder").html(sd.join(''));
                    }
                }
                else if (i == 9) {
                    if (array[i] == '') {
                        $("#txtPrice").val('');
                    }
                    else {
                        var cost = array[i].toString();
                        $("#txtPrice").val(cost);
                    }
                }
                else if (i == 10) {
                    if (array[i] == '') {
                    }
                    else {
                        var isfeature = array[i].toString();
                        if (isfeature == 1) {
                            $('#chkfeatured').prop('checked', true);
                        }
                        else { $('#chkfeatured').prop('checked', false); }
                    }
                }
                else if (i == 11) {
                    if (array[i] == '') {
                    }
                    else {
                        $("#Country").val(array[i]);
                    }
                }
                else if (i == 12) {
                    if (array[i] == '') {
                    }
                    else {
                        //BindState();
                        $("#State").val(array[i]);
                    }
                }
                else if (i == 13) {
                    if (array[i] == '') {
                    }
                    else {
                        //BindCity();
                        $("#city").val(array[i]);
                    }
                }
                else if (i == 14) {
                    if (array[i] == '') {
                        $("#zipcode").val('');
                    }
                    else {
                        //BindStateWiseZipcode();
                        var zipcode = array[i].toString();
                        $("#zipcode").val(zipcode);
                    }
                }
                else if (i == 15) {
                    if (array[i] == '') {

                    }
                    else {
                        var sd = [];
                        sd.push("<img class='thumb-image' src='../Associate/Adv_img/" + array[i].toString() + "'/> ");
                        $("#image-holder2").html(sd.join(''));
                    }
                }
                else if (i == 16) {
                    if (array[i] == '') {
                    }
                    else {
                        var sd = [];
                        sd.push("<img class='thumb-image' src='../Associate/Adv_img/" + array[i].toString() + "'/> ");
                        $("#image-holder3").html(sd.join(''));
                    }
                }
                else if (i == 17) {
                    if (array[i] == '') {
                    }
                    else {
                        var sd = [];
                        sd.push("<img class='thumb-image' src='../Associate/Adv_img/" + array[i].toString() + "'/> ");
                        $("#image-holder4").html(sd.join(''));
                    }
                }
            }
        }
        function BindStateWiseZipcode() {
            $.ajax({
                type: "POST", url: "ws/CategoryPurchase.asmx/StateWiseZipCode",
                data: "{'StateID':'" + $("#State option:selected").text() + "', 'CityID':'" + $("#city").val() + "'}",
                contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("CityWiseZip");
                        var cartd = [];
                        cartd.push("<option value=0>Select ZipCode</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("zipcode").text() + "'>" + $(docs).find("zipcode").text() + "</option>");
                        });
                        $("#zipcode").html(cartd.join(''));
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
        function BindCountry() {
            $.ajax({
                type: "POST", url: "ws/Country.asmx/SelectCountry",
                data: "{'flag':'1'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("Countries");
                        var cartd = [];
                        cartd.push("<option value=0>Select Country</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("countryid").text() + "'>" + $(docs).find("countryid").text() + "</option>");
                        });
                        $("#Country").html(cartd.join(''));
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
        function BindCategory(jobcate) {
            $.ajax({
                type: "POST", url: "ws/Category.asmx/AssociatePurchasedCategory", data: "{'jobtype':'" + jobcate + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AssociateCategories");
                        var cartd = [];
                        cartd.push("<option value=0>Select Category</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("ID").text() + "'>" + $(docs).find("CategoryName").text() + "</option>");
                        });
                        $("#Category").html(cartd.join(''));
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
        function BindState() {
            //$("#city").empty();
            var CountryId = $("#Country").val();
            $.ajax({
                type: "POST", url: "ws/State.asmx/CountryWiseState", data: "{'Status':'1','CountryID':'" + CountryId + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("States1");
                        var cartd = [];
                        cartd.push("<option value=0>Select State</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("stateid").text() + "'>" + $(docs).find("stateid").text() + "</option>");
                        });
                        $("#State").html(cartd.join(''));
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
        function BindCity() {
            var StateId = $("#State").val();
            $.ajax({
                type: "POST", url: "ws/City.asmx/StateWisecity", data: "{'Status':'1','StateID':'" + StateId + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("StateWiseCities");
                        var cartd = [];
                        cartd.push("<option value=0>Select City</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("ID").text() + "'>" + $(docs).find("City").text() + "</option>");
                        });
                        $("#city").html(cartd.join(''));
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }

    </script>
    <script>
        $(document).ready(function () {
            BindState();
            AssociatealreadyCategories();
            BindAllCategory();
            CountAssociateCategory();
            function BindassociateSubCategory() {
                var CategoryId = aCategory.value;
                $.ajax({
                    type: "POST", url: "ws/subCategory.asmx/AssociateSubCategory", data: "{'Categoryid':'" + CategoryId + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                    success: function (r) {
                        if (r.d.length > 0) {
                            var xmlDoc = $.parseXML(r.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("associateCategories");
                            var cartd = [];
                            cartd.push("<option value=0>Select SubCategory</option>")
                            $.each(docs, function (i, docs) {
                                cartd.push(" <option value='" + $(docs).find("id").text() + "'>" + $(docs).find("name").text() + "</option>");
                            });
                            $("#aSubCategory").html(cartd.join(''));
                        }
                    },
                    failure: function (response) {
                        alert(response.d + "Fail");
                    },
                    error: function (response) {
                        alert(response.d + "Error...");
                    }
                });
            }
            $(function () {
                $("#aCategory").change(function () {
                    BindassociateSubCategory();
                });
                $("#aSubCategory").change(function () {
                    $("#divSelectedChce").css("display", "block");
                    PurchaseSalesCategory();
                    $("#ViewAllPurchasedRcd").css("visibility", "visible");
                    $("#Shop").show();
                    BindMembership();
                    $('#MemberShip').val('1');
                });
            });
        });
        function GetAllRecords() {
            $.ajax({
                type: "POST", url: "ws/CategoryPurchase.asmx/SelectCartData", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("Table1");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed selected-table' style='width:100%'>");
                        cartd.push("<tr>");
                        cartd.push("<td  class='uk-width-2-10 uk-text-center'><strong>Category</strong></td>");
                        cartd.push("<td  class='uk-width-2-10 uk-text-center'><strong>SubCategory</strong></td>");
                        cartd.push("<td style='visibility:hidden' class='uk-width-2-10 uk-text-center'>  </td>");
                        cartd.push("<td  class='uk-width-2-10 uk-text-center'><strong> Price </strong> </td>");
                        cartd.push("<td  style='visibility:hidden' class='uk-width-2-10 uk-text-center'><strong></strong></td>");
                        cartd.push("<td > <strong> Action </strong> </td>");
                        cartd.push("</tr>");
                        var cc = 0;
                        var count = 1;
                        var Totalamount = 0;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("CategoryName").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("SubCategoryName").text()) + " </td>");
                            cartd.push("<td style='visibility:hidden' class='uk-text-center'> " + ($(docs).find("Zipcode").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'>$ " + ($(docs).find("Price").text()) + ".00 </td>");
                            cartd.push("<td class='uk-text-center' style='visibility:hidden'> " + ($(docs).find("subCategoryID").text()) + " </td>");
                            cartd.push("<td class='uk-width-2-10;' ><input class='btn btn-info' type='button' onclick=PurchaseRcd('" + ($(docs).find("CategoryID").text()) + "," + ($(docs).find("subCategoryID").text()) + "," + ($(docs).find("CategoryName").text()) + "," + ($(docs).find("SubCategoryName").text()) + "," + ($(docs).find("Price").text()) + "," + ($(docs).find("Zipcode").text()) + "," + cc + "')  id='btnPurchase' value='Purchase'/> &nbsp;&nbsp;<input class='btn btn-info'  type='button' onclick=RemoveRcd('" + cc + "," + ($(docs).find("subCategoryID").text()) + "," + ($(docs).find("SubCategoryName").text()) + "')  id='btncancel2' value='Cancel'/> </td>");
                            cartd.push("</tr>");
                            count++;
                            cc++;
                        });
                        cartd.push("</table>");
                        $("#ViewRcd").html(cartd.join(''));
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
        function RemoveRcd(rrr) {
            var array = rrr.split(",");
            var id, subid, subName;
            for (var i in array) {
                if (i == 0) {
                    if (array[i] == '') {

                    }
                    else {
                        id = array[i];
                    }
                }
                else if (i == 1) {
                    if (array[i] == '') {

                    }
                    else {
                        subid = array[i];
                    }
                }
                else if (i == 2) {
                    if (array[i] == '') {

                    }
                    else {
                        subName = array[i];
                    }
                }
            }
            $.ajax({
                type: "POST",
                url: "ws/CategoryPurchase.asmx/RemoveItem",
                data: "{'subCatID':" + id + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    GetAllRecords();
                }
            });
            $('#aSubCategory').append($('<option>', {
                value: subid,
                text: subName
            }));
        }
        function PurchaseRcd(dynar) {
            $(this).prop('disabled', false);
            var catID = 0, subCatID = 0, catName = 0, subCatName = 0, price = 0, zipCode = 0, rowID;
            var array = dynar.split(",");
            for (var i in array) {

                if (i == 0) {
                    if (array[i] == '') {
                    }
                    else {
                        catID = array[i];
                    }
                }
                else if (i == 1) {
                    if (array[i] == '') {
                    }
                    else {
                        subCatID = array[i];
                    }
                }
                else if (i == 2) {
                    if (array[i] == '') {
                    }
                    else {
                        catName = array[i];
                    }
                }
                else if (i == 3) {
                    if (array[i] == '') {
                    }
                    else {
                        subCatName = array[i];
                    }
                }
                else if (i == 4) {
                    if (array[i] == '') {
                    }
                    else {
                        price = array[i];
                        $("label[for='lblCatPrice']").text(price);

                    }
                }
                else if (i == 5) {
                    if (array[i] == '') {
                    }
                    else {
                        zipCode = array[i];
                    }
                }
                else if (i == 6) {
                    if (array[i] == '') {
                    }
                    else {
                        rowID = array[i];
                    }
                }
            }
            $.ajax({
                type: "POST",
                url: "ws/CategoryPurchase.asmx/PurchasedItems",
                data: "{'CatID':'" + catID + "','catName':'" + catName + "','subCatName':'" + subCatName + "','subCatID':'" + subCatID + "','zipcode':'" + zipCode + "','price':'" + price + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    $("#divSelectedChce").css("display", "none");
                    $("#aSubCategory option:selected").remove();
                    $("#btncheckout").css("visibility", "visible");
                    $("#btnreset1").css("visibility", "visible");
                    $("#btnCancel1").css("visibility", "visible");
                    RemoveFromPurchaseList(rowID);
                    GetPurchasedAllRecords();
                    var a = 0;
                    var b = 0;
                    var c = 0;
                    ApplycoponCode(a, b, c);
                }
            });
        }

        function RemoveFromPurchaseList(id) {
            $.ajax({
                type: "POST",
                url: "ws/CategoryPurchase.asmx/RemoveItem",
                data: "{'subCatID':" + id + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    GetAllRecords();
                }
            });
        }
        function GetPurchasedAllRecords() {
            $.ajax({
                type: "POST", url: "ws/CategoryPurchase.asmx/SelectAllPurchasedCartData", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("Table1");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed selected-table' style='width:70%'>");
                        cartd.push("<tr><th colspan='7'> <h4> Your Selected Choices For Purchase </h4> </th></tr>");
                        cartd.push("<tr>");
                        cartd.push("<td class='uk-width-2-10 uk-text-center'><strong>Category</strong></td>");
                        cartd.push("<td class='uk-width-2-10 uk-text-center'><strong>SubCategory</strong></td>");
                        cartd.push("<td  class='uk-width-2-10 uk-text-center'>  </td>");
                        cartd.push("<td  class='uk-width-2-10 uk-text-center'> Price </td>");
                        cartd.push("<td  class='uk-width-2-10 uk-text-center'><strong></strong></td>");
                        cartd.push("<td  class='uk-width-2-10 uk-text-center' style='margin-left:150px'> Action </td>");
                        cartd.push("</tr>");
                        var cc = 0;
                        var count = 1;
                        var Totalamount = 0;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("CategoryName").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("SubCategoryName").text()) + " </td>");
                            cartd.push("<td style='visibility:hidden' class='uk-text-center'> " + ($(docs).find("Zipcode").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("Price").text()) + "$ </td>");
                            cartd.push("<td class='uk-text-center' style='visibility:hidden'> " + ($(docs).find("subCategoryID").text()) + " </td>");
                            cartd.push("<td class='uk-text-center' ><input  type='button' class='btn btn-info' onclick=RemoveRcd1(" + cc + ")  id='btncancel' value='Cancel'/> </td>");
                            cartd.push("</tr>");
                            count++;
                            cc++;
                            var a = $(docs).find("Price").text();
                            Totalamount = parseInt(Totalamount) + parseInt(a);
                        });
                        cartd.push("<tr>  <td colspan='4' class='text-right'> <b class='pull-right'> Total Amount:- </b> </td>  <td colspan='3' align='left'  ><b>" + Totalamount + "</b></td></tr>");
                        $("label[for='lblCatPrice']").text(Totalamount);
                        cartd.push("</table>");
                        $("#purchasebutton").css("display", "none");
                        $("#ViewPurchasedRcd").css("display", "none");
                        $("#ViewPurchasedRcd").html(cartd.join(''));
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
        function RemoveRcd1(rrr) {
            $.ajax({
                type: "POST",
                url: "ws/CategoryPurchase.asmx/RemoveItem1",
                data: "{'subCatID':" + rrr + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    GetPurchasedAllRecords();
                }
            });
        }
        function BindMembership() {
            $.ajax({
                type: "POST", url: "ws/MemberShip.asmx/SelectMemberShip", data: "{'flag':'1'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("MemberShipPlan");
                        var cartd = [];
                        cartd.push("<option value=0>Select</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("mDuration").text() + "'>" + $(docs).find("PlanName").text() + "</option>");
                        });
                        $("#MemberShip").html(cartd.join(''));
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
        function PurchaseSalesCategory() {
            var SubCategoryPrice;
            $.ajax({
                type: "POST",
                url: "ws/SubCategory.asmx/AssociateCategoryExistsOrNot",
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r1) {
                    if (r1.d.length > 0) {
                        var xmlDoc1 = $.parseXML(r1.d);
                        var xml1 = $(xmlDoc1);
                        var docs1 = xml1.find("CatExists");
                        $.each(docs1, function (i, docs1) {
                            if ($(docs1).find("cnt").text() > 0) {
                                SubCategoryPrice = 0;
                            }
                            else {
                                SubCategoryPrice = 20;
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


            $.ajax({
                type: "POST",
                url: "ws/CategoryPurchase.asmx/InsertDNew",
                data: "{'CatID':'" + aCategory.value + "','catName':'" + $("#aCategory option:selected").text() + "','subCatName':'" + $("#aSubCategory option:selected").text() + "','zipcode':'0','subCatID':'" + $("#aSubCategory").val() + "','price':" + SubCategoryPrice + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                cache: false,
                success: function (r) {
                    if (r.d == "1") {
                        GetAllRecords();
                    }
                    if (r.d == "0") {
                        jQuery.noConflict();
                        $("#lblFailureTitle").text("Failure!");
                        $("#lblFailureDetail").text("Already Exists.");
                        $('#fail_message').modal('show');
                    }
                    if (r.d == "3") {
                        jQuery.noConflict();
                        $("#lblFailureTitle").text("Failure!");
                        $("#lblFailureDetail").text("OOPS Error ! Please try again.");
                        $('#fail_message').modal('show');
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }

        function BindAllCategory() {
            $.ajax({
                type: "POST",
                url: "ws/Category.asmx/JobtypeWiseCategory",
                data: "{'flag':'1','jobtype':'1'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("JobCategories");
                        var cartd = [];
                        cartd.push("<option value=0>Select Category</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("ID").text() + "'>" + $(docs).find("categoryName").text() + "</option>");
                        });
                        $("#aCategory").html(cartd.join(''));
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
        function PermananetlyRemoveCategory(rrr) {
            if (confirm("Are you sure? you want to Permanent Delete Record.")) {
                $.ajax({
                    type: "POST",
                    url: "ws/MyCategories.asmx/DeletePurchasedCategories",
                    data: "{'id':" + rrr + "}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (r) {
                        jQuery.noConflict();
                        $("#lblSuccess").text("Success!!")
                        $("#lbldetail").text("Deleted Succesfully.")
                        $('#success-message').modal('show');
                        AssociatealreadyCategories();
                    }
                });
            }
        }
        function CountAssociateCategory() {
            $.ajax({
                type: "POST", url: "ws/MyCategories.asmx/CountPurchasedCategories",
                data: "{'jobtype':1}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("TotalAds");
                        $.each(docs, function (i, docs) {
                            $("#lblPurchaseCategories").text($(docs).find("Total").text());
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
        }
        var chk = 0;
        function AssociatealreadyCategories() {
            $.ajax({
                type: "POST", url: "ws/MyCategories.asmx/MuPurchaseCategories", data: "{'JobType':'1'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        chk = 1;
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("PurCategories");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed selected-table' style='width:100%'>");
                        cartd.push("<tr>");
                        cartd.push("<th  ><strong>S.N</strong></th>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center'><strong>Category</strong></th>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center'><strong>SubCategory</strong></th>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center'> Cost </th>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center' style='margin-left:150px'> Cancel </th>");
                        cartd.push("<th visibility:hidden' class='uk-width-2-10 uk-text-center'>  </th>");
                        cartd.push("<th  visibility:hidden' class='uk-width-2-10 uk-text-center'><strong></strong></th>");
                        cartd.push("</tr>");
                        var cc = 0;
                        var count = 1;
                        var Totalamount = 0;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            cartd.push("<td class='uk-text-center'>" + count + "</td>");
                            cartd.push("<td class='uk-text-center hightlight-label'> " + ($(docs).find("categoryname").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("Name").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("amount").text()) + "$ </td>");
                            cartd.push("<td class='uk-text-center'> <input class='btn btn-info'  type='button' onclick=PermananetlyRemoveCategory(" + ($(docs).find("id").text()) + ")  id='btncancel' value='Cancel'/> </td>");
                            cartd.push("<td style='visibility:hidden' class='uk-text-center'> " + ($(docs).find("Zipcode").text()) + " </td>");
                            cartd.push("<td class='uk-text-center' style='visibility:hidden'> " + ($(docs).find("subCategoryID").text()) + " </td>");
                            cartd.push("</tr>");
                            count++;
                            cc++;
                            var a = $(docs).find("amount").text();
                            Totalamount = parseInt(Totalamount) + parseInt(a);
                        });
                        cartd.push("<tr>   <td colspan='3' >  <b class='pull-right'> Total Amount:- </b> </td> <td colspan='3' align='left'>" + Totalamount + "</b></td><td></td></tr>");
                        $("label[for='lblCatPrice']").text(Totalamount);
                        cartd.push("</table>");
                        $("#ViewAllPurchasedRcd").css("visibility", "visible");
                        $("#ViewAllPurchasedRcd").html(cartd.join(''));
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
    </script>
    <script>
        $(document).ready(function () {
            $(".collapse-with-me").click(function () {
                $(this).parent().next().addClass('collapsable-body').slideToggle();
                $(this).parents(".tab-custome").toggleClass('collapse-tab');
            });

        });
    </script>
</asp:Content>
