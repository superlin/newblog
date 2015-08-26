$(document).ready(function () {
    // 添加文章目录
    function appendLists(allh3h4) {
        var sidebar = $(".sidebar");
        var html = '';
        var i, ele, len;
        for (i = 0, len = allh3h4.length; i < len; i++) {
            ele = allh3h4[i];
            html += "<li><a href='#" + (ele.id = "h3-" + i) + "''>" + $(ele).html() + "</a></li>";
            if (ele.tagName === 'H3' && (i + 1) < len && allh3h4[i + 1].tagName === 'H4') {
                i++;
                html += "<ul>";
                while (i < len) {
                    ele = allh3h4[i];
                    if (ele.tagName === 'H3') {
                        i--;
                        break;
                    }

                    html += "<li><a href='#" + (ele.id = "h4-" + i) + "''>" + $(ele).html() + "</a></li>";
                    i++;
                }
                html += "</ul>";
            }
        }
        html = '<div class="widget catalog-brief">' +
        '<h4 class="title">内容</h4>' +
        "<ul>" + html + "</ul>" +
        '</div>';
        sidebar.append(html);
    }

    // 添加fixed
    var $footer = $(".main-footer");
    var footerH = $footer[0].getBoundingClientRect().height;
    var $document = $(document);
    var $window = $(window);
    var $catalog;
    var sideTop;
    var catalogH;
    var timeid;
    function addFixed() {
        $catalog = $catalog || $(".catalog-brief");
        sideTop = sideTop || $catalog.offset().top;
        catalogH = catalogH || $catalog[0].getBoundingClientRect().height;
        var stop = $document.scrollTop();
        var over = (sideTop < stop) &&
            (($document.scroll().height() - stop)
            > (footerH + catalogH + 100));
        if (over) {
            if (!$catalog.hasClass('catalog-fixed')) $catalog.addClass("catalog-fixed");
        } else {
            if ($catalog.hasClass('catalog-fixed')) $catalog.removeClass("catalog-fixed");
        }
    }

    // 监听scorll事件（使用函数节流，10帧）
    function catlogFixed() {
        addFixed();
        $window.scroll(function () {
            if (timeid) {
                return;
            }
            timeid = setTimeout(function () {
                addFixed();
                timeid = null;
            }, 100);
        });
    }

    //添加音乐播放器
    function addMusic() {
        $(".music-panel iframe").attr("src", "http://music.163.com/outchain/player?type=0&id=67251026&auto=0&height=430");
        $(".music-wrap a").click(function () {
            $(this).toggleClass('on');
            $(".music-panel").toggle();
        });
    }

    // 初始化
    var allh3h4 = $(".main-content").find("h3,h4");
    if (allh3h4.length > 0) {
        appendLists(allh3h4);
        catlogFixed();
    }
    addMusic();
});
