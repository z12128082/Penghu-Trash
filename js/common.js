$(function(){
    //var
        var $w = $(window);
        var $header = $('#header');
        var ua = navigator.userAgent;
    
    //function
        /*.hoverを追加する関数*/
        function addHover(element) {
            element.on('touchstart mouseenter', function(){
              $(this).addClass( 'hover' );
            }).on('touchend mouseleave click', function(){
              $(this).removeClass( 'hover' );
            });
        }
    
    
        /*
            hoverArr = [] の [] に.hoverをつけたい要素を$('.aaa')の形でいれてください
        */
        var hoverArr = [ $('a'),$('button') ]
        for ( var i=0; i < hoverArr.length; i++ ) {
            addHover(hoverArr[i]);
        }
        function setAas($aas,$aslla,aasLength) {
            var WC = $w.scrollTop(); 
            $aas.each(function(i){
                var $this = $(this);
                var $target = $('.all_side_link ._list a[href="#' + $this.attr('id') + '"]');
                var thisFire = $this.offset().top - $w.height()/2;
                function addAnchorClass() {
                    $aslla.removeClass('on')
                    $target.addClass('on')
                }
                //最初でありかつ最後ではない
                if ( i == 0 && !( i == (aasLength - 1) ) ) {
                    var thisFireNext = $aas.eq(i+1).offset().top - $w.height();
                    if ( WC < thisFireNext ) {
                        addAnchorClass();
                    }
                }
                //最初ではなく、かつ最後である
                if ( i != 0 && i == (aasLength - 1 ) ) {
                    if ( WC >= thisFire ) {
                        addAnchorClass();
                    }
                }
                //最初でもなく、最後でもない
                if ( i != 0 && i != (aasLength - 1 ) ) {
                    var thisFireNext = $aas.eq(i+1).offset().top - $w.height();
                    if ( WC >= thisFire && WC < thisFireNext ) {
                        addAnchorClass();
                    }
                }
            });
        }
    //effects
        //固定ヘッダーがある場合のページ内アンカー
        //a[href^="#"]:not(".bbb")と書けば.bbbのクラスを持つものは除外されます。
        $(document).on('click', 'a[href^="#"]:not(".all_tab a")',function(){
            var $this = $(this);
            var target = $($this.attr('href')).offset().top;
            if ( window.innerWidth <= 1100 ) {
                $('html,body').animate({ scrollTop:target - 90 },400);
            } else {
                $('html,body').animate({ scrollTop:target },400);
            }
            return false;
        });
        //固定ヘッダーがある場合のページ内アンカー（ロード時）
        $(window).on('load',function(){
            if ( location.hash ) {
                var hashTarget = location.hash;
                var target = $(hashTarget).offset().top;
                if ( window.innerWidth <= 768 ) {
                    $('html,body').animate({ scrollTop: target - 60 },100);
                } else {
                    $('html,body').animate({ scrollTop: target },100);
                }
            }
            return false;
        });
    
        window.onpageshow = function(event) {
            if (event.persisted) {
                 // window.location.reload();
                $("html").css({"opacity":1,"transition":"all .4s"});
            }
        };
        $('a:not([href^="#"]):not([href^="tel:"]):not([target])').on('click',function(e){
            e.preventDefault();
            var $this = $(this);
            var $checko = $this.attr("href").charAt(0);
    
            if ( $checko != "#") {
                var target = $this.attr('href');
                $("html").css({"opacity":0,"transition":"all .4s"});
                // $('html').addClass('white_bg');
                setTimeout(function(){
                    window.location.href = target;
                    return false;
                },500);
            }
        });
        $(window).on("load", function(){
            $("html").css({"opacity":1,"transition":"all .4s"});
        });
        
        // header
        var $headerNav = $('.header_nav_button');
        var $headerCon = $('.header_content');
        $headerNav.on('click',function(){
            if ( $header.hasClass('on') ) {
                $header.removeClass('anime');
                setTimeout(function() {
                    $header.removeClass('on');
                }, 600);
                if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 || ua.indexOf('iPad') > 0) {
                    $header.css('height','');
                }
                $('html').css('overflow','').off('.noScroll');
            } else {
                $header.addClass('on');
                setTimeout(function() {
                    $header.addClass('anime');
                }, 100);
                if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 || ua.indexOf('iPad') > 0) {
                    $header.css('height',window.innerHeight);
                }
                $('html').css('overflow','hidden').on('touchmove.noScroll', function(e) {
                    e.preventDefault();
                });
            }
        });
        // header_scroll
        const $scBar = $('.header_scroll_bar');
        $w.on('load scroll resize', function(){
            var winSc = $w.scrollTop();
            var wH = $w.innerHeight();
            var scH = $('#wrapper').innerHeight() - wH;
            var scrollRatio = (winSc / scH) * 100;
            $scBar.css('top', scrollRatio + '%')
        });
        // all_slideup_item
        if ( $('.all_slideup_item').length ) {
            $slideItem = $('.all_slideup_item');
            $w.on('load scroll', function(){
                var winSc = $w.scrollTop();
                var wH = $w.height();
                $slideItem.each(function(){
                    var $this = $(this);
                    if ( winSc > $this.offset().top - wH - 40) {
                        $this.addClass('anime');
                    }
                });
            });
        }
        /*all_tab*/
        if ( $('.all_tab').length ) {
            $tabA = $('.all_tab a');
            $tabBg = $('.all_tab ._bg');
            $tabTarget = $('.all_tab_target');
            $tabA.on('click',function(){
                $this = $(this);
                if ( !($tabA.closest('._anime_none').length) ) {
                    move = $this.parent().position().left;
                    $target = $($this.attr('href'));
                    $tabA.removeClass('on');
                    $this.addClass('on');
                    $tabBg.css({'width':$this.outerWidth(),'transform':'translateX(' + move + 'px)'});
                    $tabTarget.hide().removeClass('appear');
                    $target.fadeIn().addClass('appear');
                    return false;
                }
            })
        }
        /*all_anchor_sec*/
        if ( $('.all_anchor_sec').length && $('.choice').length == 0 ) {
            var $aas = $('.all_anchor_sec');
            var $aslla = $('.all_side_link ._list a');
            var aasLength = $aas.length;
            $w.on('load scroll',function(){
                setAas($aas,$aslla,aasLength)
            });
        }
        // all_parallax
        if ( $('.all_parallax').length ) {
            $w.on('load scroll resize', function(){
                var winSc = $w.scrollTop();
                var wH = $w.innerHeight();
                $('.all_parallax').each(function(){
                    var $this = $(this);
                    if ( $this.find('._parallax_bg').length ) {
                        var $thisImg = $this.find('._parallax_bg');
                    } else {
                        var $thisImg = $this.find('img');
                    }
                    var targetHeight = $thisImg.innerHeight()  - $this.innerHeight();
                    var targetSc = winSc + wH - $this.offset().top;
                    var progress = targetSc / ( $this.innerHeight() + wH );
                    var targetTop = targetHeight * progress * (-1);
                    $thisImg.css('top', targetTop);
                });
            });
        }
        // top
        if ( $('.top').length ) {
            var webStorage = function () {
                if (sessionStorage.getItem('access')) {
                    //2回目以降アクセス時の処理
                    $(".loading").addClass('hide');
                $('.top').addClass('anime');
                } else {
                    //初回アクセス時の処理
                    sessionStorage.setItem('access', 'true'); // sessionStorageにデータを保存
                    $(".loading_animation").addClass('anime'); // loadingアニメーションを表示
                    setTimeout(function () {
                        // ローディングを数秒後に非表示にする
                        $(".loading").addClass('active');
                        $(".loading_animation").removeClass('anime');
                        setTimeout(function(){
                            $('.loading').addClass('hide');
                $('.top').addClass('anime');
                         },1200);
                    }, 2000); // ローディングを表示する時間
                }
            }
            webStorage();
            const $mv = $('.top_mv, .loading');
            $w.on('load', function(){
                 $('body, html').animate({scrollTop: 0}, 10, 'linear');
                if ( window.innerWidth <= 768 ) {
                    $mv.css('height',$(window).height() );
                }
                if ( window.innerWidth > 768 )  {
                    $mv.css('height','');
                }
            });
            // スマホ英文字
            $w.on('load', function(){
                var $target = $('.top_intro_copy');
                var $targetL = $('.top_intro_copy ._left');
                var $targetR = $('.top_intro_copy ._right');
                if ( window.innerWidth <= 480 ) {
                    $w.on('scroll',function(){
                        var winSc = $w.scrollTop();
                        var wH = $w.innerHeight();
                        var targetSc = winSc + (wH*0.9) - $target.offset().top;
                        $targetL.css({'transform':'translateX(-' + targetSc/5 + 'px)'})
                        $targetR.css({'transform':'translateX(' + targetSc/10 + 'px)'})
                    })
                }
            });
        }
        //pro
        if ( $('.professional').length ) {
            thumbSwiper = new Swiper('.professional_what ._img:nth-of-type(2)', {
                loop: true,
                slidesPerView: 'auto',
                spaceBetween:0,
                speed:500,
                navigation: {
                    nextEl: '.professional_what ._next'
                  },
            });
            swiper = new Swiper('.professional_what ._img:nth-of-type(1)', {
                loop: true,
                slidesPerView: 'auto',
                spaceBetween:0,
                speed:500,
                navigation: {
                    nextEl: '.professional_what ._next'
                  }
            });
        }
        //choice
        if ( $('.choice').length ) {
            var parallaxPx = 0;
            $w.on('load',function(){
                $w.on('scroll.choiceAn',function(){
                    var $aas = $('.appear').find('.all_anchor_sec');
                    var $aslla = $('.choice_sec.appear').find('.all_side_link ._list a');
                    var aasLength = $aas.length;
                    parallaxPx = parseInt($('.appear').find('._parallax_bg').css('top'));
                    setAas($aas,$aslla,aasLength)
                });
                $('.choice_tab_sec a').on('click',function(){
                    var $aas = $('.appear').find('.all_anchor_sec');
                    var $aslla = $('.choice_sec.appear').find('.all_side_link ._list a');
                    var aasLength = $aas.length;
    
                    $('.choice_sec ._full_img ._parallax_bg').css('top',parallaxPx)
                    $w.off('.choiceAn');
                    $w.on('scroll.choiceAn',function(){
                        setAas($aas,$aslla,aasLength);
                        parallaxPx = parseInt($('.appear').find('._parallax_bg').css('top'));
                    });
    
                    $('.all_slideup_item').removeClass('anime');
                })
            });
        }
    });
    