var $box = (function(){
  var box = $("#box");
  var $html = $(''
    +'<div class="slider" id="slider">'
      +'<div class="slide"><img src="img/b5.png" alt=""></div>'
      +'<div class="slide"><img src="img/b1.png" alt=""></div>'
      +'<div class="slide"><img src="img/b2.png" alt=""></div>'
      +'<div class="slide"><img src="img/b3.png" alt=""></div>'
      +'<div class="slide"><img src="img/b4.png" alt=""></div>'
      +'<div class="slide"><img src="img/b5.png" alt=""></div>'
      +'<div class="slide"><img src="img/b1.png" alt=""></div>'
    +'</div>'
    +'<span id="left"><</span>'
    +'<span id="right">></span>'
    +'<ul class="nav" id="navs">'
      +'<li>1</li>'
      +'<li>2</li>'
      +'<li>3</li>'
      +'<li>4</li>'
      +'<li>5</li>'
    +'</ul>');

    
    var li = $html.find('li');
    var index = 1; //打开页面生效的图片的下标为1
    var timer;
    var isMoving = false;
    function next() {
      console.log("1234")
      if (isMoving) {
        return;
      }
      isMoving = true;
      index++;
      navmove();
      animate(slider, {
        left: -1200 * index
      }, function () {
        if (index == 5) {
          slider.style.left = '-1200px';
          index = 1;
        }
        isMoving = false;
      });
    }

    function prev() {
      if (isMoving) {
        return;
      }
      isMoving = true;
      index--;
      navmove();
      animate(slider, {
        left: -1200* index
      }, function () {
        if (index == 0) {
          slider.style.left = '-7200px';
          index = 5;
        }
        isMoving = false;
      });
    }
    function animate(obj, json, callback) {
      clearInterval(obj.timer);
      obj.timer = setInterval(function () {
        var flag = true;
        for (var attr in json) {
          (function (attr) {
            if (attr == "opacity") {
              var now = parseInt(getStyle(obj, attr) * 100);
              var dest = json[attr] * 100;
            } else {
              var now = parseInt(getStyle(obj, attr));
              var dest = json[attr];
            }
            var speed = (dest - now) / 5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (now != dest) {
              flag = false;
              if (attr == "opacity") {
                obj.style[attr] = (now + speed) / 100;
              } else {
                obj.style[attr] = now + speed + "px";
              }
            }
          })(attr);
        }
        if (flag) {
          clearInterval(obj.timer);
          callback && callback(); //如果回调函数存在，就调用回调函数
        }
      }, 30);
    }
    function getStyle(obj, attr) {
      if (obj.currentStyle) {
        return obj.currentStyle[attr];
      }
      else {
        return getComputedStyle(obj, null)[attr];
      }
    }
    //图片切换时按钮样式跟着切换
    function navmove() {
      for (var i = 0; i < li.length; i++) {
        li[i].className = "";
      }
      if (index > 5) {
        li[0].className = "active";
      } else if (index <= 0) {
        li[4].className = "active";
      } else {
        li[index - 1].className = "active";
      }
    }
    
    function show(){
      box.append($html);
      var lefta = document.getElementById('left');
      var righta = document.getElementById('right');
      console.log(lefta);
      box.mouseover (function () {
        animate(lefta, {
          opacity: 0.6
        })
        animate(righta, {
          opacity: 0.6
        })
        clearInterval(timer); //图片停止滚动
      })
      box.mouseout( function () {
        animate(lefta, {
          opacity: 0
        })
        animate(righta, {
          opacity: 0
        })
        timer = setInterval(next, 3000); //图片开始接着滚动
      })
      righta.onclick = next;
      lefta.onclick = prev ;

      //按钮点击切换事件
      for (var i = 0; i < li.length; i++) {
        li[i].index = i;
        li[i].onclick = function () {
          index = this.index + 1;
          navmove();
          animate(slider, {
            left: -1200 * index
          });
        }

      }
      //页面打开时自动滚动切换
      timer = setInterval(next, 2000);

      
    }
    return{
      show:show
    }
}());

