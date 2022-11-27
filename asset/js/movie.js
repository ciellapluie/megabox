(function($){

  /* 트레일러 영상 플레이어를 활성화 */
  /* YouTube iframe API : https://developers.google.com/youtube/player_parameters */

  (function handleTrailer(){

    // 셀렉터 캐시
    var $selector = {
      body: $("body"),
      overlay: $("#blackout"),
      modal: $("#trailerModal"),
      showButton: $("#showTrailer"),
      hideButton: $("#hideTrailer"),
    }; // 객체

    // 플레이어
    var player = {
      obj: null, // 플레이어 오브젝트
      query: {
        theme: "dark",
        color: "white", // 시청자가 동영상에서 이미 시청한 부분을 강조표시하기 위해 플레이어의 동영상 진행률 표시줄에서 사용할 색상을 지정, 기본값 : red
        controls: 1, // 동영상 플레이어 컨트롤을 표시할지 여부, 기본값 : 1(표시)
        autoplay: 1, // 플레이어가 로드될 때 동영상을 자동으로 재생할지 여부 지정, 기본값 : 0
        enablejsapi: 1, // 매개변수의 값을 1로 설정하면 IFrame 또는 JavaScript Player API 호출을 통해 플레이어가 제어, 기본값 : 0
        modestbranding: 0, // YouTube 로고 감춤
        rel: 0, // 관련 동영상 표시
        showinfo: 0, // 제목, 업로더 감춤
        iv_load_policy: 3, // 특수효과 감춤, 기본값 : 1(특수효과 표시)
        playsinline: 0
      },
      visible: false
    };

    // 보이기, 숨기기 버튼 활성화
    $selector.showButton.on("click", showPlayer);
    $selector.hideButton.on("click", hidePlayer);

    // YouTube API를 이용해 iframe을 생성
    function setPlayer(id){
      player.obj = new YT.Player('trailer', {
        height: 270,
        width: 480,
        videoId: id,
        playerVars: player.query
      });

      // 처음 플레이어 크기 설정
      resizePlayer();

      // 리사이즈 화면 회전시 플레이어 크기 다시 설정
      $(window).on("resize orientationchange", function(){
        resizePlayer();
      });
    };

    function resizePlayer(){
      var viewport = {}, frame = {}, modal = {};

      viewport.width = $(window).width();
      viewport.height = $(window).height();

      frame.width = viewport.width;
      frame.height = frame.width / 1.6; // 16 : 10

      modal.top = ((viewport.height - frame.height) / 2) + "px";
      modal.left = "0px";

      $selector.modal.css(modal); // modal의 modal.top, modal.left값을 넣어줌

      player.obj.setSize(frame.width, frame.height);
    };

    // iframe 보이기
    function showPlayer(){
      if(!player.obj) {
        setPlayer($selector.showButton.data("youtube"));
      }
      $selector.body.addClass("modal_on");
      $selector.overlay.show();
      player.visible = true;
    };

    // iframe 감추기
    function hidePlayer(){
      $selector.overlay.hide();
      $selector.body.removeClass("modal_on");
      player.visible = false;
      player.obj.stopVideo();
    };

  })(); // 시작과 동시에 함수 실행

})(jQuery); // 시작과 동시에 실행할 수 있도록 제이쿼리 설정