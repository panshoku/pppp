jQuery(function() {
  jQuery('a[href^="#"]').click(function() {
    //スクロールのスピード
    var speed = 500;
    //リンク元を取得
    var href = jQuery(this).attr("href");
    //リンク先を取得
    var target = jQuery(href == "#" || href == "" ? "html" : href);
    //リンク先までの距離を取得
    var position = target.offset().top;
    //スムーススクロール
    jQuery("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
});

jQuery(function() {
  jQuery('a[href^="#"]').click(function() {
    //スクロールのスピード
    var speed = 500;
    //リンク元を取得
    var href = jQuery(this).attr("href");
    //リンク先を取得
    var target = jQuery(href == "#" || href == "" ? "html" : href);
    //リンク先までの距離を取得
    var position = target.offset().top;
    //スムーススクロール
    jQuery("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
});
