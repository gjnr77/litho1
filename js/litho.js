;(function($){
    var litho = {
        btn: 0, //버튼 클릭을 기억하고 있는 변수 //전역 변수
                //헤더 영역에서 모바일버튼 클릭 시 변경
        
        init:function(){ //멤버 함수 == 메서드
            var that = this;
            that.scrollEventFn(); //여기서 btn 멤버 변수 가져다가 사용함
            that.headerFn();
            that.section1Fn();
            that.section2Fn();
            that.section3Fn();
            that.section4Fn();
            that.section5Fn();
            that.section6Fn();
            that.section7Fn();
            that.section8Fn();
            that.section9Fn();
            that.footerFn();
            that.smoothScrollFn();
            that.demoModalFn();

        },
        scrollEventFn:function(){
            var scrollOld = 0;
            var scrollNew = 0;
            var $win = $(window);
            var result = null;
            var $header = $('#header');
            var $bar = $('.bar');
            var $mobileBtn = $('#header .mobile-btn');
            var that = this;


            function scrollEventFn(){
                scrollNew = $win.scrollTop();
                var scr = function(){ 
                    if(scrollOld - scrollNew > 0 ){
                        result = 'UP'
                    }
                    else{
                        result = 'DOWN'
                    }
                }
 
                scr();

                scrollOld = scrollNew;

                if(scrollNew == 0){
                    $header.removeClass('addUp');
                    $header.removeClass('addDown');
                    $header.removeClass('addWhite');

                    

                }
                else{

                    if(result == 'UP'){
                        //모바일 햄버거 버튼이 클릭된 상태의 이벤트
                        if( that.btn == 1){
                            $header.removeClass('addUp');
                            $header.addClass('addDown');
                            $header.addClass('addWhite')
                        }
                        //버튼 클릭안됐을때 & PC
                        else{
                            $header.removeClass('addWhite');
                            $header.removeClass('addUp');
                            $header.addClass('addDown');
                        }

                    }
                    else if(result == 'DOWN'){
                        //모바일 햄버거 버튼이 클릭된 상태의 이벤트
                        if( that.btn == 1){
                            $header.removeClass('addDown');
                            $header.removeClass('addUp');
                            $header.addClass('addWhite')
                        }
                        //버튼 클릭안됐을때 & PC
                        else{
                            $header.removeClass('addDown');
                            $header.addClass('addUp');
                        }

                    }
                }              
            }



            $win.scroll(function(){

                    scrollEventFn();
                

            })

        },
        headerFn:function(){
           
           //네비게이션
           
           var $mainBtn = $('.main-btn');
           var $sub = $('.sub');
           var $navUlLi = $('#nav > ul > li');
        
           var $subBtn = $('.sub-btn');
           var $subSub = $('.sub-sub');

           var $subSubBtn = $('.sub-sub-btn');
           var $subSubSub = $('.sub-sub-sub');

           var $mobileBtn = $('#header .mobile-btn');
           var $bar = $('#header .bar');
           var $nav = $('#nav')

           var $window = $(window);
           var pc = 0;
           var mobile = 0;

           var $logoImg = $('#header #logo a img');
           var that = this; 


           function pcModeFn(){
           
            $nav.stop().show(0);  
            $nav.css({display:'inline-block'}); 
            $sub.stop().hide(); 
            $subSub.stop().hide();
            $subSubSub.stop().hide(); 

           //로고 이미지 바꾸기
           $logoImg.attr('src','./img/logo-white.png');

           //메인버튼(메뉴)
           $mainBtn.on({
               mouseenter:function(e){
                   e.preventDefault();
                $(this).next().stop().show();
               }
           });
           $navUlLi.on({
               mouseleave:function(e){
                e.preventDefault();
                $sub.stop().hide();
                $subSub.stop().hide();
               }
           });
           
           //서브-서브 메뉴
           $subBtn.on({
               mouseenter:function(e){
                e.preventDefault();
                   $subSub.stop().hide();
                   $(this).next().stop().show();
               }
           });

           //서브-서브-서브 메뉴
           $subSubBtn.on({
               mouseenter:function(e){
                e.preventDefault();
                   $subSubSub.stop().hide();
                   $(this).next().stop().show();
               }
           });
           $subSub.on({
               mouseleave:function(e){
                e.preventDefault();
                $subSubSub.stop().hide();
               }
           });
        } //pcModeFn()


           //모바일 메뉴 (980px 이하에서만) : 클릭이벤트

           function mobileModeFn(){
            $sub.stop().hide(); // == $sub.css({display:'none'})
            $subSub.stop().show();
            $subSubSub.stop().show(); 
            $bar.removeClass('addMobile');
            $nav.stop().slideUp(0);
            //초기화 설정 / pc로 갔다가 돌아왔을때 모두 다 초기화되어있어야함!

            //이벤트 삭제하기
            $mainBtn.off('mouseenter');
            $navUlLi.off('mouseleave');
            $subBtn.off('mouseenter');
            $subSubBtn.off('mouseenter');
            $subSub.off('mouseleave');
            $mainBtn.on('click')

            //로고 이미지 바꾸기
            $logoImg.attr('src','./img/logo-yellow-ochre-alt.png');
  



        } // mobileModeFn()

       

          //pc & mobile

        function pcMobileFn(){
            if($window.innerWidth() > 980 ){
                
                pc =1;
                mobile=0;
                that.btn = 0; 
                pcModeFn();
            }
            else {
                
                pc =0;
                mobile=1;
                mobileModeFn();
            }
        }

        pcMobileFn();
        setTimeout(pcMobileFn, 100); //로딩 시 

      
        $window.resize(function(){
            setTimeout(pcMobileFn, 100); //크기 변경될 시
        });

        window.addEventListener('orientationchange',function(){
            setTimeout(pcMobileFn, 100);
        })

        mobileModeFn();

        //메인버튼(메뉴)
        $mainBtn.on({
            click:function(e){
                e.preventDefault();
                if(mobile==1){
                    $sub.stop().slideUp();
                    $(this).next().stop().slideToggle(300);
                }
            }
        });
        //모바일에서만 동작
        //햄버거 
        $mobileBtn.on({
            click:function(e){
                e.preventDefault();
                $bar.toggleClass('addMobile'); 
                $nav.stop().slideToggle(300);

                return that.btn == 0 ? that.btn = 1 : that.btn = 0 ;

            },
        });
        

        },
        section1Fn:function(){
            //슬라이드 반응형 
            var $slide = $('#section1 .slide'); 
            var $window = $(window);            
 
            var $winW = $(window).width(); 
            var $winH = $(window).height(); 
            var $slideWrap = $('#section1 .slide-wrap');
            var $nextBtn = $('#section1 .next-btn');
            var $prevBtn = $('#section1 .prev-btn');
            var $pageBtn = $('#section1 .page-btn');
            var $slideView = $('#section1 .slide-view'); 
            var $section1 = $('#section1'); 
            var cnt=0;
            var n = $('#section1 .slide').length - 3; 
            var setId = null;
            var setId2 = null;
 
 
            function resizeFn(){
                
            $winW = $(window).width();
            $winH = $(window).height();
            $slide.css({width:$winW}); 
            
            //반응형
            
                 if(window.orientation==0 || window.orientation==180){ //세로 
                  $winH = $winH
                 }
                 else if(window.orientation==90 || window.orientation==-90){ //가로 
                 if($winW > 980){  
                  $winH = $winH
                 }
                 else{
                  $winH = 600;
                 }
            }
                
           
            $section1.css({width:$winW, height:$winH}); 
            mainSlideFn();
            }
 
            resizeFn();
 
            $window.resize(function(){
             setTimeout(resizeFn, 100);
            });
 
            window.addEventListener('orientationchange',function(){
             setTimeout(resizeFn, 100);
            })
 
 
 
            //메인슬라이드
 
            function mainSlideFn(){
               $slideWrap.stop().animate({left:-$winW*cnt}, 300,'easeInOutExpo',function(){
                   if(cnt>n){cnt=0}
                   if(cnt<0){cnt=n}
                   $slideWrap.stop().animate({left:-$winW*cnt}, 0); 
 
               }); 
               pageBtnColorEventFn(); 
 
            }
 
            function nextSlideCountFn(){
                cnt++;
                mainSlideFn();
            }
 
            function prevSlideCountFn(){
                cnt--;
                mainSlideFn();
            }
 
            $nextBtn.on({
                click:function(){
                    if(!$slideWrap.is(':animated')){
                     pauseFn();
                     nextSlideCountFn();
                    }
 
                }
            });
 
            $prevBtn.on({
                click:function(){
                    if(!$slideWrap.is(':animated')){
                     pauseFn();
                     prevSlideCountFn();
                    }
 
                }
            });
 
            //페이지 버튼 이벤트 
            function pageBtnColorEventFn(){
             var z = cnt; 
             if(z>2)      
             {z=0}        
             $pageBtn.removeClass('addPage');
             $pageBtn.eq(z).addClass('addPage'); 
 
            }
 
            pageBtnColorEventFn(); 
 
            //페이지 버튼 클릭 이벤트 (해당 버튼의 슬라이드로 이동)
            $pageBtn.each(function(idx){
             $(this).on({ 
                 click:function(){
                     pauseFn();
                     cnt = idx ; 
                     mainSlideFn(); 
                 }
              });
            });
 
            //터치 스와이프
            $slideView.swipe({
                swipeLeft:function(){  //오른쪽에서 왼쪽으로 = 다음슬라이드
                 if(!$slideWrap.is(':animated')){
                     pauseFn();
                     nextSlideCountFn();
                    }
                },
                swipeRight:function(){ //왼쪽에서 오른쪽으로 = 이전슬라이드
                 if(!$slideWrap.is(':animated')){
                     pauseFn();
                     prevSlideCountFn();
                    }
                }
            });
 
            //자동 타이머 실행
            function autoTimerFn(){
                setId = setInterval(nextSlideCountFn, 4000);
            }
 
            autoTimerFn();
 
 
            function pauseFn(){
                clearInterval(setId)
                clearInterval(setId2)
                setId2 = setInterval(function(){
                 clearInterval(setId)
                 clearInterval(setId2)
                 nextSlideCountFn();
                 autoTimerFn();
                }, 6000)
            }
 
         },
        section2Fn:function(){
            var $li = $('#section2 .container > ul> li');
            var t = 0;

            function scrollFn(){
                if($(window).scrollTop()>$('#section2').offset().top-400){
                    if(t==0){
                        t=1;
                        $li.each(function(idx){
                            setTimeout(function(){
                                $li.eq(idx).stop().animate({opacity:1},600)
                            },200*idx)
                        })
                    }
                }
                if($(window).scrollTop()<=100){
                    t=0;
                    $li.stop().animate({opacity:0})
                }
            }

            $(window).scroll(function(){
                scrollFn();
            })




        },
        section3Fn:function(){
            var $section3 = $('#section3');
            var $slideWrap = $('#section3 .slide-wrap');
            var $nextBtn = $('#section3 .next-btn');
            var $prevBtn = $('#section3 .prev-btn');
            var $slideView = $('#section3 .slide-view');
            var $slide = $('#section3 .slide');
            var $slideW = $('#section3 .slide').innerWidth(); 
            var $window = $(window);
            var cnt=0;
            var n = $slide.length - 9;
            var setId = null; 
            var t=0;

            function scrollFn(){
                if($(window).scrollTop()>$('#section3').offset().top-400){
                    if(t==0){
                        t=1;
                        $section3.addClass('addEvent');
                        }
                    }
               
                if($(window).scrollTop()<=100){
                    t=0;
                    $section3.removeClass('addEvent');
                }
            }

            $(window).scroll(function(){
                scrollFn();
            })


            //반응형 슬라이드
            function responseFn(){
                $slideW = $('#section3 .slide').innerWidth();
                $section3SlideFn();
            }

            setTimeout(responseFn, 100);

            $window.resize(function(){
                responseFn(); 
            });
            

            
             function $section3SlideFn(){
                 $slideWrap.stop().animate({left:-$slideW*cnt}, 400,'easeOutExpo', function(){
                     if(cnt>n){cnt=0}
                     if(cnt<0){cnt=n}
                     $slideWrap.stop().animate({left:-$slideW*cnt}, 0)

                 });
             }

             function nextCountFn(){
                 cnt++;
                 $section3SlideFn();

             }
 
             function prevCountFn(){
                 cnt--;
                 $section3SlideFn();
                //  console.log(cnt);
             }
 
             $nextBtn.on({
                 click:function(){
                    timerFn();
                     if(!$slideWrap.is(':animated')){
                     nextCountFn();
                    }
                 }
             });
 
             $prevBtn.on({
                 click:function(){
                    timerFn();
                     if(!$slideWrap.is(':animated')){
                     prevCountFn();
                    }
                 }
             });

             $slideView.swipe({
                 swipeLeft:function(){
                    timerFn();
                    if(!$slideWrap.is(':animated')){
                        nextCountFn();
                       } 
                 },
                 swipeRight:function(){
                    timerFn();
                    if(!$slideWrap.is(':animated')){
                        prevCountFn();
                       }
                 }
             });

             //자동 타이머
             function autoPlay(){
                setId = setInterval(nextCountFn, 4000); 
             }

             autoPlay();

     
             var t=0;
             var setId2 = null;

             function timerFn(){
                 t=0;
                 clearInterval(setId);
                 clearInterval(setId2); 
                 setId2 = setInterval(function(){
                     t++;
                     if(t>=4){
                         clearInterval(setId2);
                         clearInterval(setId);
                         t=0;

                         nextCountFn();
                         autoPlay();
                     }
                 }, 1000);
             }


        },
        section4Fn:function(){
            var $left = $('#section4 .left-wrap');
            var $right = $('#section4 .right-wrap');

            var $smallImg = $('#section4 .small-img'); 
            var $largeImg = $('#section4 .large-img'); 
            var $section4 = $('#section4'); 
            var bottom = 70;
            var left = 0;
            var t=0;
            var imgTop = -20;
            var oldScroll= 0;
            var newScroll= 0;

            function scrollFn(){
                if($(window).scrollTop()>$('#section4').offset().top-400){
                    if(t==0){
                        t=1;
                        setTimeout(function(){
                            $left.addClass('addEvent');

                        },200);
                        setTimeout(function(){
                            $right.addClass('addEvent');

                        },500);    
                       
                        }
                    }
               
                if($(window).scrollTop()<=100){
                    t=0;
                    $left.removeClass('addEvent');
                    $right.removeClass('addEvent');
                }

                if($(window).scrollTop()>= $('#section4').offset().top-400 && $(window).scrollTop()<$('#section5').offset().top){
                    
                    newScroll = $(window).scrollTop();
                    if(oldScroll-newScroll>0){

                    }
                    
                    
                    imgTop++;
                    imgTop--;
                }
            }

            $(window).scroll(function(){
                scrollFn();
            })


            $section4.on({ 
                mousemove:function(event){

                    left = event.screenX*.04;
                    bottom = event.screenY*.04;

                    left = (event.pageX-$smallImg.offset().left)*.04; 
                    bottom = (event.pageY-$smallImg.offset().top)*.04;

                    
                    $smallImg.css({bottom:bottom+70,left:left});
                    $largeImg.css({top:-bottom*1.2,left:-left*1.2}) 

                }
            });


        },
        section5Fn:function(){
          var $slideWrap = $('#section5 .slide-wrap');
          var $slide = $('#section5 .slide');
          var $slideW = 445; 
          var cnt = 0;
          var n = $slide.length -9;
          var a = 0;
          var setId = null;
          var setId2 = null;
          var $section5 = $('#section5');
          var t =0;  

          function scrollFn(){
            if($(window).scrollTop()>$('#section5').offset().top-400){
                if(t==0){
                    t=1;
                    $section5.addClass('addEvent');
                    }
                }
           
            if($(window).scrollTop()<=100){
                t=0;
                $section5.removeClass('addEvent');
            }
        }

        // scrollFn();
        $(window).scroll(function(){
            scrollFn();
        })


          function slide5Fn(){

            
            if(cnt>1){ 
                a=-235;
            }
            else{
                a=0;
            }
            $slideWrap.stop().animate({left:(-$slideW*cnt)+a}, 400, function(){
                if(cnt>n){
                    cnt=0;
                    a=0; }
                if(cnt<0){
                    cnt=n;
                    a=-235; 
                }
                $slideWrap.stop().animate({left:(-$slideW*cnt)+a}, 0)
            })

            
          }

          function nextSlideFn(){
              cnt++;
              slide5Fn();
          }
          function prevSlideFn(){
              cnt--;
              slide5Fn();
          }

        var start = 0;
        var end = 0;
          var mouseDown=0;
        $slideWrap.on({
            mousedown:function(e){
                e.preventDefault();
                mouseDown=1;
                start = e.pageX;
            },
            touchstart:function(e){
                e.preventDefault();
                mouseDown=1;
                start = e.originalEvent.changedTouches[0].pageX;
            },
            mouseup:function(e){
                e.preventDefault();
                mouseDown=0;
                end = e.pageX;
                swipeFn();
            },
            touchend:function(e){
                e.preventDefault();
                mouseDown=0;
                end = e.originalEvent.changedTouches[0].pageX;
                swipeFn();
            },
            mouseleave:function(e){
                if(mouseDown==1){
                    mouseDown=0;
                    end = e.pageX;
                    swipeFn();
                }
            }
        })

        function swipeFn(){
            if(start-end>0){
                pause();
                nextSlideFn();
            }
            if(start-end<0){
                pause();
                prevSlideFn();
            }
        }

          

          function autoPlay(){
              setId = setInterval(nextSlideFn, 4000);
          }

          autoPlay();

          function pause(){
            clearInterval(setId);
            clearInterval(setId2);

            setId2 = setInterval(function(){
                clearInterval(setId);
                clearInterval(setId2);
                nextSlideFn();
                autoPlay();
            },5000)
          }

          

        },
        section6Fn:function(){
            var $columnUl = $('#section6 .wrap .gap .container > ul > li ul');
            var $column0 = $('#section6 .wrap .gap .container > ul > li').eq(0);
            var $column1 = $('#section6 .wrap .gap .container > ul > li').eq(1);
            var $column2 = $('#section6 .wrap .gap .container > ul > li').eq(2);
            var $column3 = $('#section6 .wrap .gap .container > ul > li').eq(3);
            var cnt=0;
            var cnt2=0;
            var cnt3=0;
            var cnt4=0;
            var setId = null;
            var setId2 = null;
            var setId3 = null;
            var setId4 = null;

            //자동화
            var timer = 5;
            
            var cnt1 = [0,0,0,0];
            var cnt2 = [0,0,0,0];
            var cnt3 = [0,0,0,0];
            var cnt4 = [0,0,0,0];

            var setId1 = [null, null, null, null];
            var setId2 = [null, null, null, null];
            var setId3 = [null, null, null, null];
            var setId4 = [null, null, null, null];

            var num1 = [];
            var num2 = [];
            var num3 = [];
            var num4 = [];

            var t = 0;
            var st1 = null;
            var st2 = null;

            var $height = $('#section6 .wrap .gap .container > ul');

           

            $column0.find('.col').each(function(idx){
               num1[idx] = $(this).data('number'); 
            });

            $column1.find('.col').each(function(idx){
               num2[idx] = $(this).data('number'); 
            });

            $column2.find('.col').each(function(idx){
               num3[idx] = $(this).data('number'); 
            });

            $column3.find('.col').each(function(idx){
               num4[idx] = $(this).data('number'); 
            });


            //스크롤 이벤트 
            $(window).scroll(function(){
                
                if($(window).scrollTop() >= $('#section5').offset().top ){
                    if(t==0){
                         t=1; 
                         $('#section6 .wrap .gap .container > ul').addClass('addCount');

                        setTimeout(function(){
                            formatFn();
                            setTimeout(countFn,200);
                        },100)
                         
                    }
                }

                if($(window).scrollTop() == 0){ 
                   t = 0;
                   cnt1 = [0,0,0,0];
                   cnt2 = [0,0,0,0];
                   cnt3 = [0,0,0,0];
                   cnt4 = [0,0,0,0];
                   $('#section6 .wrap .gap .container > ul').removeClass('addCount');
                   
                }

                
            });

            
            //초기화 함수
            function formatFn(){
                $columnUl.css({top:0});     
            }
            
           st1 = setTimeout(formatFn,100);
           clearTimeout(st1);
                

            //카운트 함수
            st2 = setTimeout(countFn,200);
            clearTimeout(st2);


            function countFn(){

            setId1.forEach(function(el,idx){
                setId1[idx] = setInterval(function(){
                    cnt1[idx]++;
                    if(cnt1[idx]> 65*num1[idx]){
                        clearInterval(setId1[idx]);
    
                    }
                    else{
                        $column0.find('ul').eq(idx).css({ top:-cnt1[idx] }) 
                    }
                },5)

            });

            setId2.forEach(function(el,idx){
                setId2[idx] = setInterval(function(){
                    cnt2[idx]++;
                    if(cnt2[idx] > 65*num2[idx]){
                        clearInterval(setId2[idx]);
                    }
                    else{
                        $column1.find('ul').eq(idx).css({top:-cnt2[idx]})
                    }
                },5)
            });

            setId3.forEach(function(el,idx){
                setId3[idx] = setInterval(function(){
                    cnt3[idx]++;
                    if(cnt3[idx] > 65*num3[idx]){
                        clearInterval(setId3[idx]);
                    }
                    else{
                        $column2.find('ul').eq(idx).css({top:-cnt3[idx]})
                    }
                },5)
            });
                

            setId4.forEach(function(el,idx){
                setId4[idx] = setInterval(function(){
                    cnt4[idx]++;
                    if(cnt4[idx] > 65*num4[idx]){
                        clearInterval(setId4[idx]);
                    }
                    else{
                        $column3.find('ul').eq(idx).css({top:-cnt4[idx]})
                    }
                },5)
            });
        }

        },
        section7Fn:function(){
            var $Bg = $('#section7 .bg');
            var $li = $('#section7 li');
            var color = 'rgba('+(0,0,0, 1)+')';



            $li.each(function(idx){
                $(this).on({
                    mouseenter:function(){
                        $Bg.stop().animate({opacity:0},1000);
                        $Bg.eq(idx).stop().animate({opacity:1},600);
                    }
                })
            })
            
           
        },
        section8Fn:function(){
            var $section8 = $('#section8');
            var $slideView = $('#section8 .slide-view');
            var $slideWrap = $('#section8 .slide-wrap');
            var $slide = $('#section8 .slide');
            var $slideW = $('#section8 .slide').innerWidth();
            var n = $slide.length-1;
            var cnt = 0;
            var start = 0;
            var end = 0;
            var t =0;

            function scrollFn(){
                if($(window).scrollTop()>$('#section8').offset().top-400){
                    if(t==0){
                        t=1;
                        $section8.addClass('addEvent');
                        }
                    }
               
                if($(window).scrollTop()<=100){
                    t=0;
                    $section8.removeClass('addEvent');
                }
            }


            $(window).scroll(function(){
                scrollFn();
            })

            var next = [2,0,1]; 
            var prev = [0,2,1]; 


            //1.메인슬라이드함수 - 배열슬라이드
            function mainNextSlideFn(){
                for(var i=0;i<=cnt;i++){
                    next[i] = i; 
                    var tem =next.pop();
                    next.unshift(tem);
                }

                //팝핑 작업
                var tem =next.pop();
                next.unshift(tem);



                //배열 메서드
                next = [2,0,1]; 
                for(var i=0; i<cnt; i++){
                    var tem = next.shift();
                    next.push(tem); 
                   

                }

                for(var i=0;i<=n;i++){ 
                    $slide.eq(next[i]).stop().animate({left:(100*i)+'%'},0).animate({left:(100*(i-1))+'%'},1000,'linear');
                    console.log('i'+i)
                }

            }
            function mainPrevSlideFn(){
                var j = n; 
                for(var i=0;i<=n;i++){
                    j--;
                    prev[i]= j 
                }
                var tem = prev.pop();
                prev.unshift(tem); 

                prev = [0,2,1];  
                for(var i=2;i>cnt;i--){ 
                    var tem = prev.shift();
                    prev.push(tem);
                }
                for(var i=0;i<=n;i++){
                    $slide.eq(prev[i]).stop().animate({left:-(100*(i))+'%'},0).animate({left:-(100*(i-1))+'%'},1000,'linear');
                }

            }

            var mouseDown = 0; 

            //2.다음 슬라이드 카운드 함수
            function nextSlideCount(){
                cnt++;
                if(cnt>n){cnt=0}
                mainNextSlideFn();
            }
            //3.이전 슬라이드 카운드 함수
            function prevSlideCount(){
                cnt--;
                if(cnt<0){cnt=n}
                mainPrevSlideFn();
            }
            //4.터치 스와이프 이벤트
            $slideView.on({
                mousedown:function(e){ //pc용
                    mouseDown = 1; // 마우스 누른 상태
                    e.preventDefault();
                    start = e.pageX;
                },
                touchstart:function(e){ 
                    mouseDown = 1; 
                    e.preventDefault();
                    start = e.originalEvent.changedTouches[0].pageX;

                },
                mouseup:function(e){
                    mouseDown = 0; //마우스 안누른 상태
                    e.preventDefault();
                    end = e.pageX;
                    swipeFn();
                },
                touchend:function(e){
                    mouseDown = 0; 
                    e.preventDefault();
                    end = e.originalEvent.changedTouches[0].pageX;
                    swipeFn();
                },
                mouseleave:function(e){ 
                    if(mouseDown==1){ 
                        mouseDown=0;
                        end = e.pageX;
                       swipeFn();
                    }

                } 
            })

            function swipeFn(){
                if(start-end>0){
                    nextSlideCount();
                }
                if(start-end<0){
                    prevSlideCount();
                }
            }


        },
        section9Fn:function(){
            var $ul = $('#section9 .content-wrap > ul');
            var $left = $('#section9 .left');
            var leftW = $left.innerWidth();
            var leftH = leftW*1.385683076;

            var rateH3 = leftW*0.06947711;
            var rateP = leftW *0.05789111;
            var rateH6 = leftW *0.0463111;

            var $h3 = $('#section9 .right-wrap h3')
            var $p = $('#section9 .right-wrap p')
            var $h6 = $('#section9 .right-wrap h6')

            function resizeFn(){
                leftW = $left.innerWidth();
                leftH = leftW*1.385683076;
                rateH3 = leftW*0.07047711;
                rateP = leftW*0.05789111;
                rateH6 = leftW*0.0463111;

                $ul.css({height:leftH});

                $h3.css({fontSize:rateH3});
                $p.css({fontSize:rateP});
                $h6.css({fontSize:rateH6});



            }
            resizeFn();
            $(window).resize(function(){
                resizeFn();
            })
        },
        footerFn:function(){
            //AJAX
            var $submitBtn = $('#submitBtn');
            var $frmEmail = $('#frmEmail');
            var $frmCode = $('#frmCode');
            var $response = $('.response');
            var $responsemsg = $('.response h3');
            var $msgWrap = $('.msg-wrap');

            $submitBtn.on({
                click:function(e){
                    e.preventDefault(); 

                    var $frmEmail = $('#frmEmail').val(); 
                    var $frmCode = $('#frmCode').val(); 

                    // 유효성 검사
                    if($frmEmail==''){ 
                        $('.input-wrap').addClass('addAjax');
                        $('#frmEmail').focus(); 
                        return false;
                    }
                    else{
                        $.ajax({
                            url:'./response.php',
                            type:'POST',
                            data:{
                                email: $frmEmail,
                                code: $frmCode
                            },
                            success:function(result){
                                $response.css({display:'block'})
                                $responsemsg.html(result); 
                                $('.input-wrap').removeClass('addAjax');
                                setTimeout(function(){
                                    $msgWrap.stop().fadeIn(200);
                                },100)
                                setTimeout(function(){
                                    $msgWrap.stop().fadeOut(200);
                                },5000)
                                $responsemsg.empty();
                                $response.css({display:'none'});
                            },
                            error:function(msg){
                                alert('AJAX 전송 실패!');
                                console.log(msg);

                            }
                        });

                    }

                }
            })

        },
        smoothScrollFn:function(){
            var smoothBtn = $('.smoothBtn');
            var $modalDemo = $('#modalDemo');

            smoothBtn.on({
                click:function(e){
                    e.preventDefault();
                    var url = $(this).attr('href');
                    $('html,body').stop().animate({scrollTop:$(url).offset().top},600);
                }
            })

            //모달창 1200이상일때만 보이게하기
            function resizeFn(){
                if($(window).innerWidth()>1200){
                    $modalDemo.stop().fadeIn(200);
                    }
                    else{
                        $modalDemo.stop().fadeOut(0);
                    }
            }
            resizeFn();
            $(window).resize(function(){
                resizeFn();
            })

            $(window).scroll(function(){ 
                if($(window).scrollTop()<50){
                    $('.goTop-wrap').stop().fadeOut(100)
                    $modalDemo.stop().fadeOut(200)
                }
                else if($(window).scrollTop()>10){
                    $('.goTop-wrap').stop().fadeIn(100)
                    resizeFn();
                }
            })



    
        },
        demoModalFn:function(){
            var $modalBtn = $('.modal-btn');
            var $modalDemo = $('#modalDemo');
            var $btnWrap = $('.btn-wrap');
            var $header = $('#header');
            var $document = $(document);


            $modalBtn.on({
                click:function(e){
                    e.stopPropagation(); 



                    $('html').toggleClass('addModal')
                    $modalDemo.toggleClass('addModal');
                    $btnWrap.toggleClass('addModal');
                    $header.toggleClass('addUp');
                }
            })

            $modalDemo.on({
                click:function(e){
                    e.stopPropagation();
                    return false; 
                }
            })

            $document.on({
                click:function(e){
                    if(e.target !== e.currentTarget ){ 
                        $modalDemo.removeClass('addModal');
                        $btnWrap.addClass('addModal');
                        $header.removeClass('addUp');
                    }
                }
            })



        }
    }; //litho 객체 끝
    litho.init();
})(jQuery);