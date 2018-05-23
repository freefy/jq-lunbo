var timer = null;
var nowIndex = 0;
var len = 4;
var oWidth = 600;
var flag = true;
function init(){
    blinkEvent();
    autoSlide();
}
init();
function blinkEvent(){
    $('.leftBtn').add('.rightBtn').add('.sliderList li').on('click',function(){
        if($(this).attr('class')=='leftBtn'){
            move('left');
        }else if($(this).attr('class')=='rightBtn'){
            move('right');
        }else{
            var index = $(this).index();
            move(index);
        }
        changeIndex();
    })
    $('.wrapper').on('mouseenter',function(){
        clearTimeout(timer);
        $('.btn').show();
    })
    .on('mouseleave',function(){
        $('.btn').hide();
        autoSlide();
    })
}
function changeIndex(){
    $('.active').removeClass('active');
    $('.sliderList li').eq(nowIndex).addClass('active');
}
function move(direction){
    if(flag){
        flag = false;
        var a =1;
        if(direction == 'left'||direction == 'right'){
            if(direction == 'left'){
                if(nowIndex == 0){
                    $('.sliderPage').css({left:-len*oWidth});
                    nowIndex = len-1;
                }else{
                    nowIndex --;
                }
            }else{//=='right'
                if(nowIndex == 3){
                    a=0;
                    $('.sliderPage').animate({left:-len * oWidth},function(){
                        $(this).css({left:0});
                        autoSlide();
                        flag = true;
                    })
                    nowIndex = 0;
                }else{
                    nowIndex++;
                }
            }
        }else{
            nowIndex = direction;
        }
    } 
    if(a){
        slider();
    }
}
function slider(){
    $('.sliderPage').animate({left:-nowIndex*oWidth},function(){
        autoSlide();
        flag = true;
    })
}
function autoSlide(){
    clearTimeout(timer);
    timer = setTimeout(function(){
        move('right');
        changeIndex();
    },1000)
}