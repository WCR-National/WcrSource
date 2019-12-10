<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="associatefooter.ascx.cs" Inherits="WcrAssociate.Associate.UControls.associatefooter" %>
<script>
    WebFontConfig = {
        google: {
            families: [
                'Source+Code+Pro:400,700:latin',
                'Roboto:400,300,500,700,400italic:latin'
            ]
        }
    };
    (function () {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();
</script>

<script src="../../assets/js/common.min.js"></script>
<script src="../../assets/js/uikit_custom.min.js"></script>
<script src="../../assets/js/altair_admin_common.min.js"></script>
<script src="../../bower_components/d3/d3.min.js"></script>
<script src="../../bower_components/metrics-graphics/dist/metricsgraphics.min.js"></script>
<script src="../../bower_components/chartist/dist/chartist.min.js"></script>
<script src="http://maps.google.com/maps/api/js?sensor=true"></script>
<%--<script src="../../bower_components/maplace.js/src/maplace-0.1.3.js"></script>--%>
<script src="../../bower_components/peity/jquery.peity.min.js"></script>
<%--<script src="../../bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js"></script>
<script src="../../bower_components/countUp.js/countUp.min.js"></script>--%>
<script src="../../bower_components/handlebars/handlebars.min.js"></script>
<script src="../../assets/js/custom/handlebars_helpers.min.js"></script>
<script src="../../bower_components/clndr/src/clndr.js"></script>
<script src="../../bower_components/fitvids/jquery.fitvids.js"></script>
<script src="../../assets/js/pages/dashboard.min.js"></script>
<script>
    $(function () {
        altair_helpers.retina_images();
        if (Modernizr.touch) {
            FastClick.attach(document.body);
        }
    });
</script>

<%--<script>
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '../www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-65191727-1', 'auto');
    ga('send', 'pageview');
</script>--%>
<div id="style_switcher">
    <div id="style_switcher_toggle"><i class="material-icons">&#xE8B8;</i></div>
    <div class="uk-margin-medium-bottom">
        <h4 class="heading_c uk-margin-bottom">Colors</h4>
        <ul class="switcher_app_themes" id="theme_switcher">
            <li class="app_style_default active_theme" data-app-theme="">
                <span class="app_color_main"></span>
                <span class="app_color_accent"></span>
            </li>
            <li class="switcher_theme_a" data-app-theme="app_theme_a">
                <span class="app_color_main"></span>
                <span class="app_color_accent"></span>
            </li>
            <li class="switcher_theme_b" data-app-theme="app_theme_b">
                <span class="app_color_main"></span>
                <span class="app_color_accent"></span>
            </li>
            <li class="switcher_theme_c" data-app-theme="app_theme_c">
                <span class="app_color_main"></span>
                <span class="app_color_accent"></span>
            </li>
            <li class="switcher_theme_d" data-app-theme="app_theme_d">
                <span class="app_color_main"></span>
                <span class="app_color_accent"></span>
            </li>
            <li class="switcher_theme_e" data-app-theme="app_theme_e">
                <span class="app_color_main"></span>
                <span class="app_color_accent"></span>
            </li>
            <li class="switcher_theme_f" data-app-theme="app_theme_f">
                <span class="app_color_main"></span>
                <span class="app_color_accent"></span>
            </li>
            <li class="switcher_theme_g" data-app-theme="app_theme_g">
                <span class="app_color_main"></span>
                <span class="app_color_accent"></span>
            </li>
        </ul>
    </div>
    <div class="uk-visible-large">
        <h4 class="heading_c">Sidebar</h4>
        <p>
            <input type="checkbox" name="style_sidebar_mini" id="style_sidebar_mini" data-md-icheck />
            <label for="style_sidebar_mini" class="inline-label">Mini Sidebar</label>
        </p>
    </div>
</div>

