$(document).ready(function(){
    // 添加文章目录
    var sidebar = $(".sidebar");
    var allh3 = $(".main-content h3");
    var html = '';
    Array.prototype.slice.call(allh3, 0).forEach(function(h3,i){
        var id = "h3-"+(i+1);
        var txt = $(h3).html().trim();
        h3.id = id;
        html += "<li><a href='#"+id+"''>"+txt+"</a></li>";
    });
    html = '<div class="widget catalog-brief">'+
              '<h4 class="title">Content</h4>' +
              "<ul>"+html+"</ul>"+
            '</div>';
    sidebar.append(html);

    // scrollTop大小
    var scTop = function() {
        if( typeof window.pageYOffset != 'undefined') {
            return window.pageYOffset;
        } else if( typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
            return document.documentElement.scrollTop
        } else if( typeof document.body != 'undefined') {
            return document.body.scrollTop;
        }
    }

    // 添加fixed
    var addFixed = function(sideTop) {
        if(sideTop < scTop()){
            if(!$catalog.hasClass('catalog-fixed')) $catalog.addClass("catalog-fixed");
        } else {
            if($catalog.hasClass('catalog-fixed')) $catalog.removeClass("catalog-fixed");
        }
    }

    // 监听scorll事件
    var $catalog = $(".catalog-brief");
    var sideTop = $catalog.offset().top;
    addFixed(sideTop);
    $(window).scroll(function(){
        addFixed(sideTop);
    });

    //添加音乐播放器
    $(".music-panel iframe").attr("src", "http://music.163.com/outchain/player?type=0&id=67251026&auto=0&height=430");
    $(".music-wrap a").click(function() {
      $(this).toggleClass('on');
      $(".music-panel").toggle();
    });
});
