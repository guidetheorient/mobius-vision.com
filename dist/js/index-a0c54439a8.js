"use strict";!function(t){t(function(){t(window).width()>=992&&(t("section.item").scrollex({mode:"middle",initialize:function(){if(this.$content=t(this).find(".content"),this.index=t(this).index(),1===this.index)this.$content.hide();else if(2===this.index){var i=this.$content.outerWidth(!0);this.$content.css("right",-i)}else if(3===this.index){var n=this.$content.outerWidth(!0);this.$content.css("left",-n)}else 4!==this.index&&5!==this.index||this.$content.css("opacity",0)},enter:function(){1===this.index?this.$content.slideDown(1e3):2===this.index?this.$content.animate({right:"0"},1e3):3===this.index?this.$content.animate({left:"0"},1e3):4!==this.index&&5!==this.index||this.$content.animate({opacity:1},1e3)}}),t(".parallax").each(function(){t(this).scrolly({bgParallax:!0})})),t(".down-btn").on("click",function(i){i.preventDefault();var n=t(this).parents("section[id]").last(),e=n.offset().top+n.outerHeight(!0);t("html,body").animate({scrollTop:e+"px"},2e3)}),t(".nav-btn-wrapper").on("click",function(i){i.preventDefault(),t(".container").add(".navbar, .nav-panel").toggleClass("nav-visible")})})}(jQuery);
//# sourceMappingURL=index-a0c54439a8.js.map