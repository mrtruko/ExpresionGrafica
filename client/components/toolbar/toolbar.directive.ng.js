'use strict'

angular.module('graficaExpresionApp')
.directive('toolbar', function() {
      var isCollapsed = false;
      var currentPage = ''; // current page
      var collapsed = false; //sidebar collapsed
      var is_mobile = false; //is screen mobile?
      var is_mini_menu = false; //is mini-menu activated
      var is_fixed_header = false; //is fixed header activated
      var responsiveFunctions = []; //responsive function holder
  $(document).ready(function(){
    checkLayout();	//Function to check if mini menu/fixed header is activated
    handleSidebar(); //Function to display the sidebar
    handleSidebarCollapse(); //Function to hide or show sidebar
    handleSidebarAndContentHeight();  //Function to hide sidebar and main content height
    responsiveSidebar();		//Function to handle sidebar responsively
    handleTeamView(); //Function to toggle team view
    handleBoxTools(); //Function to handle box tools
    handleSlimScrolls(); //Function to handle slim scrolls
   //handlePopovers(); //Function to handle popovers
    handleMessenger(); //Function to handle messenger
    handleCustomTabs(); //Function to handle min-height of custom tabs
    handleGoToTop(); 	//Funtion to handle goto top buttons
    handleNavbarFixedTop();		//Function to check & handle if navbar is fixed top
    handleThemeSkins();		//Function to handle theme skins
  })
      function handleThemeSkins() {
        // Handle theme colors
        var setSkin = function (color) {
          $('#skin-switcher').attr("href", "css/themes/" + color + ".css");
          $.cookie('skin_color', color);
        }
        $('ul.skins > li a').click(function () {
          var color = $(this).data("skin");
          setSkin(color);
        });

        //Check which theme skin is set
        if ($.cookie('skin_color')) {
          setSkin($.cookie('skin_color'));
        }
      }
      function handleNavbarFixedTop() {
        if(is_mobile && is_fixed_header) {
          //Manage margin top
          $('#main-content').addClass('margin-top-100');
        }
        if(!(is_mobile) && is_fixed_header){
          //Manage margin top
          $('#main-content').removeClass('margin-top-100').addClass('margin-top-50');
        }
      }
      function handleGoToTop() {
        $('.footer-tools').on('click', '.go-top', function (e) {
          //App.scrollTo();
          e.preventDefault();
        });
      }
      function handleCustomTabs() {
        function adjustMinHeight(y) {
          $(y).each(function () {
            var A = $($($(this).attr("href")));
            var z = $(this).parent().parent();
            if (z.height() > A.height()) {
              A.css("min-height", z.height())
            }
          })
        };
        $("body").on("click", '.nav.nav-tabs.tabs-left a[data-toggle="tab"], .nav.nav-tabs.tabs-right a[data-toggle="tab"]', function () {
          adjustMinHeight($(this))
        });
        adjustMinHeight('.nav.nav-tabs.tabs-left > li.active > a[data-toggle="tab"], .nav.nav-tabs.tabs-right > li.active > a[data-toggle="tab"]');
        if (location.hash) {
          var w = location.hash.substr(1);
          $('a[href="#' + w + '"]').click()
        }
      }
      function handleMessenger() {

        //Normal
        $("#normal").click(function(){
          var mytheme = $('input[name=theme]:checked').val();
          var mypos = $('input[name=position]:checked').val();
          //Set theme
          Messenger.options = {
            extraClasses: 'messenger-fixed '+mypos,
            theme: mytheme
          }
          //Call
          Messenger().post({
            message:"This is a normal notification!",
            showCloseButton: true
          });
        });
        //Interactive
        $("#interactive").click(function(){
          var mytheme = $('input[name=theme]:checked').val();
          var mypos = $('input[name=position]:checked').val();
          //Set theme
          Messenger.options = {
            extraClasses: 'messenger-fixed '+mypos,
            theme: mytheme
          }
          var msg;
          msg = Messenger().post({
            message: 'Launching thermonuclear war...',
            type: 'info',
            actions: {
              cancel: {
                label: 'cancel launch',
                action: function() {
                  return msg.update({
                    message: 'Thermonuclear war averted',
                    type: 'success',
                    showCloseButton: true,
                    actions: false
                  });
                }
              }
            }
          });
        });
        //Timer
        $("#timer").click(function(){
          var mytheme = $('input[name=theme]:checked').val();
          var mypos = $('input[name=position]:checked').val();
          //Set theme
          Messenger.options = {
            extraClasses: 'messenger-fixed '+mypos,
            theme: mytheme
          }
          var i;
          i = 0;
          Messenger().run({
            errorMessage: 'Error destroying alien planet',
            successMessage: 'Alien planet destroyed!',
            showCloseButton: true,
            action: function(opts) {
              if (++i < 3) {
                return opts.error({
                  status: 500,
                  readyState: 0,
                  responseText: 0
                });
              } else {
                return opts.success();
              }
            }
          });
        });
        //Prompts
        $("#prompts").click(function(){
          var mytheme = $('input[name=theme]:checked').val();
          var mypos = $('input[name=position]:checked').val();
          //Set theme
          Messenger.options = {
            extraClasses: 'messenger-fixed '+mypos,
            theme: mytheme
          }
          Messenger().run({
            successMessage: 'Data saved.',
            errorMessage: 'Error saving data',
            progressMessage: 'Saving data',
            showCloseButton: true,
          }, {
            url: 'http://www.example.com/data'
          });
        });
      }
      function handlePopovers() {
        //Default (Right)
        $('.pop').popover();
        //Bottom
        $('.pop-bottom').popover({
          placement : 'bottom'
        });
        //Left
        $('.pop-left').popover({
          placement : 'left'
        });
        //Top
        $('.pop-top').popover({
          placement : 'top'
        });
        //Trigger hover
        $('.pop-hover').popover({
          trigger: 'hover'
        });
      }
      function handleSlimScrolls() {
        if (!jQuery().slimScroll) {
          return;
        }

        $('.scroller').each(function () {
          $(this).slimScroll({
            size: '7px',
            color: '#a1b2bd',
            height: $(this).attr("data-height"),
            alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : false),
            railVisible: ($(this).attr("data-rail-visible") == "1" ? true : false),
            railOpacity: 0.1,
            disableFadeOut: true
          });
        });
      }
      function handleBoxTools() {
        //Collapse
        jQuery('.box .tools .collapse, .box .tools .expand').click(function () {
          var el = jQuery(this).parents(".box").children(".box-body");
          if (jQuery(this).hasClass("collapse")) {
            jQuery(this).removeClass("collapse").addClass("expand");
            var i = jQuery(this).children(".fa-chevron-up");
            i.removeClass("fa-chevron-up").addClass("fa-chevron-down");
            el.slideUp(200);
          } else {
            jQuery(this).removeClass("expand").addClass("collapse");
            var i = jQuery(this).children(".fa-chevron-down");
            i.removeClass("fa-chevron-down").addClass("fa-chevron-up");
            el.slideDown(200);
          }
        });

        /* Close */
        jQuery('.box .tools a.remove').click(function () {
          var removable = jQuery(this).parents(".box");
          if (removable.next().hasClass('box') || removable.prev().hasClass('box')) {
            jQuery(this).parents(".box").remove();
          } else {
            jQuery(this).parents(".box").parent().remove();
          }
        });

        /* Reload */
        jQuery('.box .tools a.reload').click(function () {
          var el = jQuery(this).parents(".box");
          App.blockUI(el);
          window.setTimeout(function () {
            App.unblockUI(el);
          }, 1000);
        });
      }
      function handleHomePageTooltips() {
        //On Hover
        //Default tooltip (Top)
        $('.tip').tooltip();
        //Bottom tooltip
        $('.tip-bottom').tooltip({
          placement : 'bottom'
        });
        //Left tooltip
        $('.tip-left').tooltip({
          placement : 'left'
        });
        //Right tooltip
        $('.tip-right').tooltip({
          placement : 'right'
        });
        //On Focus
        //Default tooltip (Top)
        $('.tip-focus').tooltip({
          trigger: 'focus'
        });
      }
      function getViewPort() {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
          a = 'client';
          e = document.documentElement || document.body;
        }
        return {
          width: e[a + 'Width'],
          height: e[a + 'Height']
        }
      }
      function handleTeamView() {
        c();
        $(".team-status-toggle").click(function (y) {
          y.preventDefault();
          w(this);
          $(this).parent().toggleClass("open");
          var z = x(this);
          $(z).slideToggle(200, function () {
            $(this).toggleClass("open")
          })
        });
        $("body").click(function (z) {
          var y = z.target.className.split(" ");
          if ($.inArray("team-status", y) == -1 && $.inArray("team-status-toggle", y) == -1 && $(z.target).parents().index($(".team-status")) == -1 && $(z.target).parents(".team-status-toggle").length == 0) {
            w()
          }
        });

        function w(y) {
          $(".team-status").each(function () {
            var z = $(this);
            if (z.is(":visible")) {
              var A = x(y);
              if (A != ("#" + z.attr("id"))) {
                $(this).slideUp(200, function () {
                  $(this).toggleClass("open");
                  $(".team-status-toggle").each(function () {
                    var B = x(this);
                    if (B == ("#" + z.attr("id"))) {
                      $(this).parent().removeClass("open")
                    }
                  })
                })
              }
            }
          })
        };
        function x(y) {
          var z = $(y).data("teamStatus");
          if (typeof z == "undefined") {
            z = "#team-status"
          }
          return z
        }
      }
      function c() {
        $(".team-status").each(function () {
          var x = $(this);
          x.css("position", "absolute").css("margin-top", "-1000px").show();
          var w = 0;
          $("ul li", this).each(function () {
            w += $(this).outerWidth(true) + 15
          });
          x.css("position", "relative").css("margin-top", "0").hide();
          $("ul", this).width(w)
        })
      };
      function responsiveSidebar() {
        var content = $('#content');
        var sidebar = $('#sidebar');
        var body = $('body');
        var height;

        if (body.hasClass('sidebar-fixed')) {
          height = $(window).height() - $('#header').height() + 1;
        } else {
          height = sidebar.height() + 20;
        }
        if (height >= content.height()) {
          content.attr('style', 'min-height:' + height + 'px !important');
        }
      }
      function handleSidebarAndContentHeight() {
        var content = $('#content');
        var sidebar = $('#sidebar');
        var body = $('body');
        var height;

        if (body.hasClass('sidebar-fixed')) {
          height = $(window).height() - $('#header').height() + 1;
        } else {
          height = sidebar.height() + 20;
        }
        if (height >= content.height()) {
          content.attr('style', 'min-height:' + height + 'px !important');
        }
      }
      function checkLayout() {
        //Check if sidebar has mini-menu
        is_mini_menu = $('#sidebar').hasClass('mini-menu');
        //Check if fixed header is activated
        is_fixed_header = $('#header').hasClass('navbar-fixed-top');

      }
      function handleSidebar() {
        jQuery('.sidebar-menu .has-sub > a').click(function () {
          var last = jQuery('.has-sub.open', $('.sidebar-menu'));
          last.removeClass("open");
          jQuery('.arrow', last).removeClass("open");
          jQuery('.sub', last).slideUp(200);

          var thisElement = $(this);
          var slideOffeset = -200;
          var slideSpeed = 200;

          var sub = jQuery(this).next();
          if (sub.is(":visible")) {
            jQuery('.arrow', jQuery(this)).removeClass("open");
            jQuery(this).parent().removeClass("open");
            sub.slideUp(slideSpeed, function () {
              if ($('#sidebar').hasClass('sidebar-fixed') == false) {
                //App.scrollTo(thisElement, slideOffeset);
              }
              handleSidebarAndContentHeight();
            });
          } else {
            jQuery('.arrow', jQuery(this)).addClass("open");
            jQuery(this).parent().addClass("open");
            sub.slideDown(slideSpeed, function () {
              if ($('#sidebar').hasClass('sidebar-fixed') == false) {
                //App.scrollTo(thisElement, slideOffeset);
              }
              handleSidebarAndContentHeight();
            });
          }
        });

        // Handle sub-sub menus
        jQuery('.sidebar-menu .has-sub .sub .has-sub-sub > a').click(function () {
          var last = jQuery('.has-sub-sub.open', $('.sidebar-menu'));
          last.removeClass("open");
          jQuery('.arrow', last).removeClass("open");
          jQuery('.sub', last).slideUp(200);

          var sub = jQuery(this).next();
          if (sub.is(":visible")) {
            jQuery('.arrow', jQuery(this)).removeClass("open");
            jQuery(this).parent().removeClass("open");
            sub.slideUp(200);
          } else {
            jQuery('.arrow', jQuery(this)).addClass("open");
            jQuery(this).parent().addClass("open");
            sub.slideDown(200);
          }
        });
      }
      function handleSidebarCollapse() {
        var viewport = getViewPort();
        if ($.cookie('mini_sidebar') === '1') {
          /* For Navbar */
          jQuery('.navbar-brand').addClass("mini-menu");
          /* For sidebar */
          jQuery('#sidebar').addClass("mini-menu");
          jQuery('#main-content').addClass("margin-left-50");
          collapsed = true;
        }
        //Handle sidebar collapse on user interaction
        jQuery('.sidebar-collapse').click(function () {
          //Handle mobile sidebar toggle
          if(is_mobile && !(is_mini_menu)){
            //If sidebar is collapsed
            if(collapsed){
              jQuery('body').removeClass("slidebar");
              jQuery('.sidebar').removeClass("sidebar-fixed");
              //Add fixed top nav if exists
              if(is_fixed_header) {
                jQuery('#header').addClass("navbar-fixed-top");
                jQuery('#main-content').addClass("margin-top-100");
              }
              collapsed = false;
              $.cookie('mini_sidebar', '0');
            }
            else {
              jQuery('body').addClass("slidebar");
              jQuery('.sidebar').addClass("sidebar-fixed");
              //Remove fixed top nav if exists
              if(is_fixed_header) {
                jQuery('#header').removeClass("navbar-fixed-top");
                jQuery('#main-content').removeClass("margin-top-100");
              }
              collapsed = true;
              $.cookie('mini_sidebar', '1');
              handleMobileSidebar();
            }
          }
          else { //Handle regular sidebar toggle
            var iconElem = document.getElementById("sidebar-collapse").querySelector('[class*="fa-"]');
            var iconLeft = iconElem.getAttribute("data-icon1");
            var iconRight = iconElem.getAttribute("data-icon2");
            //If sidebar is collapsed
            if(collapsed){
              /* For Navbar */
              jQuery('.navbar-brand').removeClass("mini-menu");
              /* For sidebar */
              jQuery('#sidebar').removeClass("mini-menu");
              jQuery('#main-content').removeClass("margin-left-50");
              jQuery('.sidebar-collapse i').removeClass(iconRight);
              jQuery('.sidebar-collapse i').addClass(iconLeft);
              /* Add placeholder from Search Bar */
              jQuery('.search').attr('placeholder', "Search");
              collapsed = false;
              $.cookie('mini_sidebar', '0');
            }
            else {
              /* For Navbar */
              jQuery('.navbar-brand').addClass("mini-menu");
              /* For sidebar */
              jQuery('#sidebar').addClass("mini-menu");
              jQuery('#main-content').addClass("margin-left-50");
              jQuery('.sidebar-collapse i').removeClass(iconLeft);
              jQuery('.sidebar-collapse i').addClass(iconRight);
              /* Remove placeholder from Search Bar */
              jQuery('.search').attr('placeholder', '');
              collapsed = true;
              $.cookie('mini_sidebar', '1');
            }
            $("#main-content").on('resize', function (e) {
              e.stopPropagation();
            });
          }
        });
      }

  return {
    restrict: 'AE',
    templateUrl: 'client/components/toolbar/toolbar.view.ng.html',
    replace: true
  };
});