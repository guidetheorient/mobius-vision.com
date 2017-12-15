(function ($) {
  $(function () {
    if($(window).width() >= 992){
      // 滚动hook触发动效
      $('section.item').scrollex({
        mode: 'middle',
        initialize: function () {
          this.$content = $(this).find('.content');
          this.index = $(this).index();
          if (this.index === 1) {
            this.$content.hide();
          } else if (this.index === 2) {
            let width = this.$content.width();
            this.$content.css('right', -width)
          } else if (this.index === 3) {
            let width = this.$content.width();
            this.$content.css('left', -width)
          } else if (this.index === 4 || this.index === 5){
            this.$content.css('opacity',0);
          }
        },
  
        enter: function () {
          if (this.index === 1) {
            this.$content.slideDown(1000);
          } else if (this.index === 2) {
            this.$content.animate({
              right: '0'
            }, 1000)
          } else if (this.index === 3) {
            this.$content.animate({
              left: '0'
            },1000)
          } else if(this.index === 4 || this.index === 5){
            this.$content.animate({
              opacity: 1
            },1000);
          }
        },
      })
    
      // 视差滚动
      $('.parallax').each(function(){
        $(this).scrolly({bgParallax:true})
      })
    }
  });
})(jQuery);