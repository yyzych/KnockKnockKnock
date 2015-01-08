function lesr() {

    var $_next_page = $("#next_page");
    var $_previous_page = $("#previous_page");

    $_next_page.click(next_page);
    $_previous_page.click(previous_page);

    function bind_hove() {
        $("#photos").find("div").hover(function() {
                $(this).children(".hover_box").toggle();
            },
            function() {
                $(this).children(".hover_box").toggle();
            });
        $(".share_box").hover(function() {
                $(this).children(".qzone").toggle();
                $(this).children(".douban").toggle();
                $(this).children(".renren").toggle();
                $(this).children(".weibo").toggle();
            },
            function() {
                $(this).children(".qzone").toggle();
                $(this).children(".douban").toggle();
                $(this).children(".renren").toggle();
                $(this).children(".weibo").toggle();
            });
    }

    bind_hove();
    $('#search_text').bind('input propertychange', function() {
        if ($(this).val() == "") {
            $(".search_dropdown").addClass("hide");

        } else {
            $(".search_dropdown").removeClass("hide");
        }
    });

    function next_page() {
        var _page_no = $("#pageno").html();
        var _has_next = $("#hasnext").html();
        if (_has_next == 1) {
            $.ajax({
                async: false,
                type: "GET",
                url: "/a/getpage",
                dataType: 'json',
                data: {
                    pageno: parseInt(_page_no) + parseInt(1)
                },
                success: function(data) {
                    $_photos = $("#photos");
                    htms = '<o style="display:none" id="pageno">' + data.pageno + '</o><o style="display:none" id="hasnext">' + data.hasnext + '</o>';
                    data.imagelist.forEach(
                        function(one_image) {
                            htms += '<div><a class="photo" href=""><img src="http://image.paiwo.co/' + one_image + '_280x280"></a><span class="hover_box" style="display:none;">' +
                                '<span class="share_box"><span class="qzone" style="display:none;"><img src="/static/images/icon/share_qzone.png"></span>' +
                                '<span class="douban" style="display:none;"><img src="/static/images/icon/share_douban.png"></span>' +
                                '<span class="renren" style="display:none;"><img src="/static/images/icon/share_renren.png"></span>' +
                                '<span class="weibo" style="display:none;"><img src="/static/images/icon/share_weibo.png"></span>' +
                                '<span class="share_button"><img src="/static/images/icon/share16.png"></span>' +
                                '</span><span class="comment_box"><img src="/static/images/icon/comment16.png"></span>' +
                                '</span>' +
                                '<span class="fix_box">' +
                                '<a href="">橙三爷</a><img class="like" src="/static/images/icon/like20.png"><img class="collect" src="/static/images/icon/collect20.png"></span>' +
                                '</div>'
                        }
                    )
                    $_photos.html(htms);
                    bind_hove();
                    $("body,html").animate({
                        scrollTop: $("body").offset().top
                    });
                },
                error: function(data) {
                    alert("加载出错了，请稍后尝试");
                }
            });
        } else {
            alert("没有下一页了!");
        }
    }

    function previous_page() {
        var _page_no = $("#pageno").html();
        var _has_next = $("#hasnext").html();
        if (_page_no != 1) {
            $.ajax({
                async: false,
                type: "GET",
                url: "/a/getpage",
                dataType: 'json',
                data: {
                    pageno: parseInt(_page_no) - parseInt(1)
                },
                success: function(data) {
                    $_photos = $("#photos");
                    htms = '<o style="display:none" id="pageno">' + data.pageno + '</o><o style="display:none" id="hasnext">' + data.hasnext + '</o>';
                    data.imagelist.forEach(
                        function(one_image) {
                            htms += '<div><a class="photo" href=""><img src="http://image.paiwo.co/' + one_image + '_280x280"></a><span class="hover_box" style="display:none;">' +
                                '<span class="share_box"><span class="qzone" style="display:none;"><img src="/static/images/icon/share_qzone.png"></span>' +
                                '<span class="douban" style="display:none;"><img src="/static/images/icon/share_douban.png"></span>' +
                                '<span class="renren" style="display:none;"><img src="/static/images/icon/share_renren.png"></span>' +
                                '<span class="weibo" style="display:none;"><img src="/static/images/icon/share_weibo.png"></span>' +
                                '<span class="share_button"><img src="/static/images/icon/share16.png"></span>' +
                                '</span><span class="comment_box"><img src="/static/images/icon/comment16.png"></span>' +
                                '</span>' +
                                '<span class="fix_box">' +
                                '<a href="">橙三爷</a><img class="like" src="/static/images/icon/like20.png"><img class="collect" src="/static/images/icon/collect20.png"></span>' +
                                '</div>'
                        }
                    )
                    bind_hove();
                    $_photos.html(htms);
                    $("body,html").animate({
                        scrollTop: $("body").offset().top
                    });
                },
                error: function(data) {
                    alert("加载出错了，请稍后尝试");
                }
            });
        } else {
            alert("已经是第一页了!");
        }

    }
}
lesr();