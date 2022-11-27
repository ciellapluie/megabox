(function($){
  // 배너 이미지 슬라이드
  const swiper = new Swiper('.swiper', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    autoplay: {
      delay: 5000,
    },
  });

  // 영화 차트 이미지 슬라이드
  const movie_swiper = new Swiper('.movie_swiper', {
    slidesPerView: 4,
    spaceBetween: 24,
    mousewheel: {
      invert: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    autoplay: {
      delay: 6000,
    },
    breakpoints: {
      0: {
        slidesPerView: 1.4,
        spaceBetween: 24
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 24
      },
      768: {
        slidesPerView: 3,
        spacebetween: 24
      },
      900: {
        slidesPerView: 4,
        spacebetween: 24
      },
    }
  });

  // 영화 차트 탭 메뉴
  var movBtn = $(".movie_title > ul > li");
  var movCont = $(".movie_chart > div");

  movCont.hide().eq(0).show();

  movBtn.click(function(e){
    e.preventDefault();

    var target = $(this);
    var index = target.index();

    movBtn.removeClass("active");
    target.addClass("active");

    movCont.css("display", "none");
    movCont.eq(index).css("display", "block");
  });

  // 공지사항 탭 메뉴
  var tabMenu = $(".notice");

  // 컨텐츠 내용 숨기기
  tabMenu.find("ul > li > ul").hide();
  tabMenu.find("li.active > ul").show();

  function tabList(e) {
    e.preventDefault(); // # 기능 차단
    
    var target = $(this);
    target.next().show().parent("li").addClass("active")
    .siblings().removeClass("active").find("ul").hide();
    // 버튼을 클릭하면 (li > a)형제 ul을 보여주고
    // 부모의 li태그에 active 클래스 추가
    // 추가한 li태그의 형제 li태그에 active 클래스 제거
    // 제거한 li태그의 자식 ul 태그 숨김
  }

  tabMenu.find("ul > li > a").click(tabList).focus(tabList);

})(jQuery);