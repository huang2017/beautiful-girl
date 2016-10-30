/*瀑布流动画*/
$(window).resize(function(){
    var container = $('#images .items');//确定瀑布流的小容器
    var masonryContainer = $('#images');//确定瀑布流的大容器
    container.imagesLoaded(function(){
        container.fadeIn();//图片加载完成之后小容器展开
        masonryContainer.masonry({
            itemSelector : '.items',
            /*确定每个内容块容器共同类是什么*/
            isAnimated: true,//这个选项是打开动画选项，当改变窗口宽度
           // 的时候，每行显示的内容块的数量有变化，这种变化会使用一种
           // 动画效果。
            gutterWidth:20, //每个内容块之间距离是20px
        });
    });
})

//masonry
/*
$(document).ready(
    function() {
        var container = $('#images .items');
        var masonryContainer = $('#images');
        container.imagesLoaded(function(){
            container.fadeIn();
            masonryContainer.masonry({
                itemSelector : '.items',
                isAnimated: true
            });
        });
    }
);
*/
    
/////////////////////////////////////////////////////////////////////////////////////////////////////


/*没有懂这段是怎么实现的。*/
$(function() {
    var loadurl = '@c=mobile-pic&a=load', loaded = false, sTimer, onloading = false;
    var jWindow = $(window), container = $("#images .items"), masonryContainer = $('#images');
    var jLoading = $('#loading');
    function loadMore() {
        if (loaded == 1) return;
        onloading = true;
        jLoading.show();
        $.getJSON(loadurl, {'tag' : tagId, 'offset': offset, math: Math.random() }, function(json){
            if('undefined' == json || json.enabled ==0){
                loaded = 1;
            }else{
                var options = masonryContainer.data("masonry").options, bakAnimated = options.isAnimated;
                options.isAnimated = false;
                masonryContainer.append(json.html).masonry("reload");
                offset = json.offset;
                options.isAnimated = bakAnimated;
            }
            tagShow();
            jLoading.hide();

            onloading = false;
        });
    }

    function tagShow() {
        $("#images .items").imagesLoaded(function(){
            $("#images .items:hidden").fadeIn();
            masonryContainer.masonry({
                itemSelector : '.items',
                isAnimated: true
            });
        });
    }

    tagShow();
    $(window).scroll(function scrollHandler(){
        if (onloading) {
            return;
        }
        clearTimeout(sTimer);
        sTimer = setTimeout(function() {
            if(loaded == 1){$(window).unbind("scroll", scrollHandler);}
            var c=document.documentElement.clientHeight || document.body.clientHeight, t=$(document).scrollTop();
            if(t+c >= masonryContainer.offset().top+masonryContainer.height()){loadMore();}
        }, 100);
    });
});
