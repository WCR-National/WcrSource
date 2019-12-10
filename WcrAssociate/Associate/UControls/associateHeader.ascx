<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="associateHeader.ascx.cs" Inherits="WcrAssociate.Associate.UControls.associateHeader" %>
<meta charset="UTF-8">
<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="msapplication-tap-highlight" content="no" />
<link rel="icon" type="image/png" href="../../assets/img/favicon-16x16.png" sizes="16x16">
<link rel="icon" type="image/png" href="../../assets/img/favicon-32x32.png" sizes="32x32">
<link rel="stylesheet" href="../../bower_components/weather-icons/css/weather-icons.css" media="all">
<link rel="stylesheet" href="../../bower_components/metrics-graphics/dist/metricsgraphics.css">
<link rel="stylesheet" href="../../bower_components/chartist/dist/chartist.min.css">
<link rel="stylesheet" href="../../bower_components/uikit/css/uikit.almost-flat.min.css" media="all">
<link rel="stylesheet" href="../../assets/icons/flags/flags.min.css" media="all">
<link rel="stylesheet" href="../../assets/css/main.min.css" media="all">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
<script src="../../js/jquery-2.1.1.min.js"></script>


<header id="header_main">
    <script type="text/javascript">
        $(document).ready(function () {

            $("#btnLogout").click(function () {
                $.ajax({
                    type: "POST",
                    url: "../../ws/AssociateSignUp.ashx?action=AssociateLogout",
                    data: "{}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (response) {
                       
                        if (response == "0") {
                            window.location.href = '../../index.html';
                        }
                        else {
                            alert("OOPS Something goes wrong !");
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
    </script>

    <div class="header_main_content">
        <nav class="uk-navbar">

            <a href="#" id="sidebar_main_toggle" class="sSwitch sSwitch_left">
                <span class="sSwitchIcon"></span>
            </a>

            <a href="#" id="sidebar_secondary_toggle" class="sSwitch sSwitch_right sidebar_secondary_check">
                <span class="sSwitchIcon"></span>
            </a>
            <div id="menu_top" class="uk-float-left uk-hidden-small">
                <div class="uk-button-dropdown" data-uk-dropdown="{mode:'click'}">
                    <a href="#" class="top_menu_toggle"><i class="material-icons md-24">&#xE8F0;</i></a>
                    <div class="uk-dropdown uk-dropdown-width-3">
                        <div class="uk-grid uk-dropdown-grid">
                            <div class="uk-width-2-3">
                                <div class="uk-grid uk-grid-width-medium-1-3 uk-margin-top uk-margin-bottom uk-text-center">
                                    <a href="#">
                                        <i class="material-icons md-36">&#xE158;</i>
                                        <span class="uk-text-muted uk-display-block">Mailbox</span>
                                    </a>
                                    <a href="#">
                                        <i class="material-icons md-36">&#xE53E;</i>
                                        <span class="uk-text-muted uk-display-block">Invoices</span>
                                    </a>
                                    <a href="#">
                                        <i class="material-icons md-36 md-color-red-600">&#xE0B9;</i>
                                        <span class="uk-text-muted uk-display-block">Chat</span>
                                    </a>

                                </div>
                            </div>
                            <div class="uk-width-1-3">
                                <ul class="uk-nav uk-nav-dropdown uk-panel">
                                    <li class="uk-nav-header">Components</li>
                                    <li><a href="buyCategory.aspx">Buy Category</a></li>
                                    <li><a href="sale.aspx">Sale</a></li>
                                    <li><a href="Service.aspx">Service</a></li>
                                    <li><a href="MemberShipPlan.aspx">Share</a></li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <span style="color: white; margin-left: 185px; text-transform: uppercase;">WCR National Associate Portal</span>
            </div>

            <div class="uk-navbar-flip">
                <ul class="uk-navbar-nav user_actions">

                    <li data-uk-dropdown="{mode:'click'}">
                        <a href="#" class="user_action_image">
                            <img class="md-user-image" src="../../assets/img/avatars/avatar_11_tn.png" alt="" /></a>
                        <div class="uk-dropdown uk-dropdown-small uk-dropdown-flip">
                            <ul class="uk-nav js-uk-prevent">

                                <li>
                                    <input id="btnLogout" type="submit" value="LogOut" /></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    <div class="header_main_search_form">
        <i class="md-icon header_main_search_close material-icons">&#xE5CD;</i>
        <form class="uk-form">
            <input type="text" class="header_main_search_input" />
            <button class="header_main_search_btn uk-button-link"><i class="md-icon material-icons">&#xE8B6;</i></button>
        </form>
    </div>
</header>
<script src="js/jQuery-2.1.4.min.js"></script>


<!-- Bootstrap 3.3.5 -->
<script src="js/bootstrap.min.js"></script>
<!-- daterangepicker -->
<!-- Bootstrap WYSIHTML5 -->
<script src="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<!-- Slimscroll -->
<!-- FastClick -->
<!-- AdminLTE App -->
<script src="js/app.min.js"></script>
    <script src="../dist/js/demo.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>
    <script src="plugins/fullcalendar/fullcalendar.min.js"></script>

<script>
    $(function () {

        /* initialize the external events
         -----------------------------------------------------------------*/
        function ini_events(ele) {
            ele.each(function () {

                // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                // it doesn't need to have a start or end
                var eventObject = {
                    title: $.trim($(this).text()) // use the element's text as the event title
                };

                // store the Event Object in the DOM element so we can get to it later
                $(this).data('eventObject', eventObject);

                // make the event draggable using jQuery UI
                $(this).draggable({
                    zIndex: 1070,
                    revert: true, // will cause the event to go back to its
                    revertDuration: 0  //  original position after the drag
                });

            });
        }
        ini_events($('#external-events div.external-event'));

        /* initialize the calendar
         -----------------------------------------------------------------*/
        //Date for the calendar events (dummy data)
        var date = new Date();
        var d = date.getDate(),
                m = date.getMonth(),
                y = date.getFullYear();
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            buttonText: {
                today: 'today',
                month: 'month',
                week: 'week',
                day: 'day'
            },
            //Random default events
            events: [
              {
                  title: 'All Day Event',
                  start: new Date(y, m, 1),
                  backgroundColor: "#f56954", //red
                  borderColor: "#f56954" //red
              },
              {
                  title: 'Long Event',
                  start: new Date(y, m, d - 5),
                  end: new Date(y, m, d - 2),
                  backgroundColor: "#f39c12", //yellow
                  borderColor: "#f39c12" //yellow
              },
              {
                  title: 'Meeting',
                  start: new Date(y, m, d, 10, 30),
                  allDay: false,
                  backgroundColor: "#0073b7", //Blue
                  borderColor: "#0073b7" //Blue
              },
              {
                  title: 'Lunch',
                  start: new Date(y, m, d, 12, 0),
                  end: new Date(y, m, d, 14, 0),
                  allDay: false,
                  backgroundColor: "#00c0ef", //Info (aqua)
                  borderColor: "#00c0ef" //Info (aqua)
              },
              {
                  title: 'Birthday Party',
                  start: new Date(y, m, d + 1, 19, 0),
                  end: new Date(y, m, d + 1, 22, 30),
                  allDay: false,
                  backgroundColor: "#00a65a", //Success (green)
                  borderColor: "#00a65a" //Success (green)
              },
              {
                  title: 'Click for Google',
                  start: new Date(y, m, 28),
                  end: new Date(y, m, 29),
                  url: 'http://google.com/',
                  backgroundColor: "#3c8dbc", //Primary (light-blue)
                  borderColor: "#3c8dbc" //Primary (light-blue)
              }
            ],
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar !!!
            drop: function (date, allDay) { // this function is called when something is dropped

                // retrieve the dropped element's stored Event Object
                var originalEventObject = $(this).data('eventObject');

                // we need to copy it, so that multiple events don't have a reference to the same object
                var copiedEventObject = $.extend({}, originalEventObject);

                // assign it the date that was reported
                copiedEventObject.start = date;
                copiedEventObject.allDay = allDay;
                copiedEventObject.backgroundColor = $(this).css("background-color");
                copiedEventObject.borderColor = $(this).css("border-color");

                // render the event on the calendar
                // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }

            }
        });

        /* ADDING EVENTS */
        var currColor = "#3c8dbc"; //Red by default
        //Color chooser button
        var colorChooser = $("#color-chooser-btn");
        $("#color-chooser > li > a").click(function (e) {
            e.preventDefault();
            //Save color
            currColor = $(this).css("color");
            //Add color effect to button
            $('#add-new-event').css({ "background-color": currColor, "border-color": currColor });
        });
        $("#add-new-event").click(function (e) {
            e.preventDefault();
            //Get value and make sure it is not null
            var val = $("#new-event").val();
            if (val.length == 0) {
                return;
            }

            //Create events
            var event = $("<div />");
            event.css({ "background-color": currColor, "border-color": currColor, "color": "#fff" }).addClass("external-event");
            event.html(val);
            $('#external-events').prepend(event);

            //Add draggable funtionality
            ini_events(event);

            //Remove event from text input
            $("#new-event").val("");
        });
    });
    </script>