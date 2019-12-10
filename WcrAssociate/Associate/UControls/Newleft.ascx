<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Newleft.ascx.cs" Inherits="WcrAssociate.Associate.UControls.Newleft" %>
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/font-awesome.min.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="plugins/fullcalendar/fullcalendar.min.css">
<link rel="stylesheet" href="plugins/fullcalendar/fullcalendar.print.css" media="print">
<link rel="stylesheet" href="dist/css/AdminLTE.min.css">
<link rel="stylesheet" href="css/layout.css">
<aside class="main-sidebar">
    <section class="sidebar">
       <%-- <div class="user-panel">
            <div class="pull-left image">
                <img src="img/user2-160x160.jpg" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
                <p>Mr.User</p>
                <a href="#"><i class="fa fa-circle text-success"></i>Online</a>
            </div>
        </div>--%>
        <ul class="sidebar-menu">
            <li class="active"><a href="index.html"><i class="fa fa-dashboard"></i><span>Dashboard</span> </a></li>
            <li class="treeview"><a href="#"><i class="fa fa-pie-chart"></i><span>Manage</span> <i class="fa fa-angle-left pull-right"></i></a>
                <ul class="treeview-menu" style="display: none;">
                    <li><a href="verifymobile.html"><i class="fa fa-circle-o"></i>Verify Mobile</a></li>
                    <li><a href="verifyemail.html"><i class="fa fa-circle-o"></i>Verify Email</a></li>
                </ul>
            </li>
            <li class="treeview"><a href="#"><i class="fa fa-pie-chart"></i><span>Post Advertisement </span><i class="fa fa-angle-left pull-right"></i></a>
                <ul class="treeview-menu" style="display: none;">
                    <li class="treeview"><a href="#"><i class="fa fa-circle-o"></i><span>Sales </span><i class="fa fa-angle-left pull-right"></i></a>
                        <ul class="treeview-menu" style="display: none;">
                            <li><a href="SalesCategory.aspx">Purchase category </a></li>
                            <li><a href="post-addvertise.html">Post Advertisement  on Sales </a></li>
                        </ul>
                    </li>

                    <li class="treeview"><a href="#"><i class="fa fa-circle-o"></i><span>Services </span><i class="fa fa-angle-left pull-right"></i></a>
                        <ul class="treeview-menu" style="display: none;">
                            <li><a href="purchasezip.html">Purchase Zip code</a></li>
                            <li><a href="post-advert-service.html">Post Advertisements on services</a></li>
                        </ul>

                    </li>
                    <li><a href="viewmy-post-=add.html"><i class="fa fa-circle-o"></i>View My Posting Advertisements </a>
                    </li>
                </ul>
            </li>
            <li><a href="invite.html"><i class="fa fa-pie-chart"></i>Invite</a>
            <li class="treeview"><a href="#"><i class="fa fa-pie-chart"></i><span>My Account</span> <i class="fa fa-angle-left pull-right"></i></a>
                <ul class="treeview-menu" style="display: none;">
                    <li><a href="verifymobile.html"><i class="fa fa-circle-o"></i>Update Card</a></li>
                    <li><a href="verifyemail.html"><i class="fa fa-circle-o"></i>Add New Card Info</a></li>
                    <li><a href="verifyemail.html"><i class="fa fa-circle-o"></i>Billing History</a></li>

                </ul>
            </li>
            <li><a href="#"><i class="fa fa-pie-chart"></i>Promotional Code</a>
            <li class="treeview"><a href="needhelp.aspx"><i class="fa fa-pie-chart"></i><span>Need Help</span> <i class="fa fa-angle-left pull-right"></i></a>

            </li>
        </ul>
    </section>
</aside>
<script src="js/jQuery-2.1.4.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<script src="js/app.min.js"></script>
<script src="../dist/js/demo.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>
<script src="plugins/fullcalendar/fullcalendar.min.js"></script>
<script>
    $( document ).ready(function() {
    BindClickEvent();
    });
    function BindClickEvent() {
        var selector = '.sidebar-menu li';
        //Removes click event of each li
        $(selector).unbind('click');
        //Add click event
        $(selector).bind('click', function () {
            $(selector).removeClass('active');
            $(this).addClass('active');
        });

    }
    $(function () {
        function ini_events(ele) {
            ele.each(function () {
                var eventObject = {
                    title: $.trim($(this).text()) // use the element's text as the event title
                };
                // store the Event Object in the DOM element so we can get to it later
                $(this).data('eventObject', eventObject);
                $(this).draggable({
                    zIndex: 1070,
                    revert: true, // will cause the event to go back to its
                    revertDuration: 0  //  original position after the drag
                });
            });
        }
        ini_events($('#external-events div.external-event'));
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
