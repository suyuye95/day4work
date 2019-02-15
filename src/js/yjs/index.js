var mySwiper = new Swiper('.swiper-container', {
    autoplay: true
})
var list = document.querySelector('.list');
$.ajax({
    url: "/data",
    dataType: "json",
    success: function(msg) {
        //console.log(data.msg);
        var data = msg.msg.list;
        //console.log(data);
        if (msg.code == 1) {
            var str = '';
            data.forEach(function(v, i) {
                str += '<dl><dt><img src="' + v.imgs + '" alt=""></dt><dd><h4>' + v.title + '</h4><span>' + v.price + '</span></dd></dl>'
            })
            list.innerHTML = str;
        }
    }
})
var myBScroll = new BScroll('.section');