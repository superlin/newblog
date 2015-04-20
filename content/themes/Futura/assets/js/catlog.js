window.onload = function(){
    // 添加sidebar
    var sidebar = document.querySelector(".sidebar");
    var allh3 = document.querySelectorAll(".main-content h3");
    var html = '';
    Array.prototype.slice.call(allh3, 0).forEach(function(h3,i){
        var id = "h3-"+(i+1);
        var txt = h3.innerHTML.trim();
        h3.id = id;
        html += "<li><a href='#"+id+"''>"+txt+"</a></li>";
    });
    html = '<div class="widget catalog-brief">'+
              '<h4 class="title">Content</h4>' +
              "<ul>"+html+"</ul>"+
            '</div>';
    sidebar.innerHTML += html;

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

    // 初始化与监听
    var $catalog = $(".catalog-brief");
    var sideTop = $catalog.offset().top;
    addFixed(sideTop);
    $(window).scroll(function(){
        addFixed(sideTop);
    })
};
