require("./lib/social");
require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

var sound;
var audio;

var qsa = s => Array.prototype.slice.call(document.querySelectorAll(s));

// Event listeners
document.querySelector(".play.with-sound").addEventListener("click", function(e) {
  sound = true;
  begin();
});
document.querySelector(".play.without-sound").addEventListener("click", function(e) {
  sound = false;
  begin();
});

var index = 0;
var length = data.length - 1;

var begin = function() {
  document.querySelector(".gallery").innerHTML = require("./_slide.html");

  changeImage();

  if (!sound) document.querySelector(".audio-icon").classList.add("muted");

  var onClickIndex = function() {
    var newIndex = this.getAttribute("data-index");
    index = newIndex;
    changeImage();
  }

  qsa(".index i").forEach(function(dot) {
    dot.addEventListener("click", onClickIndex);
  });

  document.querySelector(".audio-icon").addEventListener("click", function(e) {
    if (sound) {
      audio.pause();
      audio.currentTime = 0;
      document.querySelector(".audio-icon").classList.add("muted");
      sound = false;
    } else {
      audio.play();
      document.querySelector(".audio-icon").classList.remove("muted");
      sound = true;
    }
  });
};

var changeImage = function() {
  qsa(".index i").forEach(function(dot) {
    var i = dot.getAttribute("data-index") * 1;
    if (i <= index) {
      dot.classList.add("darker");
    } else {
      dot.classList.remove("darker");
    }
  })
  document.querySelector(".title").innerHTML = `
    <div class="arrow-box"><i class="previous arrow fa fa-chevron-left"></i></div>
    <div class="featured">${data[index].featured}</div>
    <div class="arrow-box"><i class="fa hidden rewind fa-undo"></i><i class="next fa arrow fa-chevron-right"></i></div>
  `;
  document.querySelector(".caption").innerHTML = data[index].caption;
  var img = document.createElement("img");
  img.src = `./assets/${data[index].image}`;
  img.onload = function() {
    var frame = document.querySelector(".image");
    frame.innerHTML = "";
    frame.appendChild(img);
    img.removeAttribute("height");
  }

  if (index == length) { 
    document.querySelector(".next").classList.add("hidden");
    document.querySelector(".rewind").classList.remove("hidden");
    document.querySelector(".subscribe").classList.remove("hidden");
  } else {
    document.querySelector(".subscribe").classList.add("hidden");
    document.querySelector(".buttons").classList.remove("hidden");
    document.querySelector(".next").classList.remove("hidden");
    document.querySelector(".rewind").classList.add("hidden");
    qsa(".index").forEach(function(dot) {
      dot.classList.remove("hidden");
    });
    document.querySelector(".readmore").classList.remove("hidden");
  }
  if (index == 0) { 
    document.querySelector(".previous").classList.add("disabled");
  } else {
    document.querySelector(".previous").classList.remove("disabled");
  }

  if (audio) document.body.removeChild(audio);

  audio = document.createElement("audio");
  audio.src = `./assets/${data[index].audio}`;
  document.body.appendChild(audio);

  if (sound) audio.play();

  document.querySelector(".listen").addEventListener("click", function(e) {
    // if (audio) {
    //   if (audio.paused) {
    //     audio.play();
    //   } else {
    //     audio.pause();
    //     audio.currentTime = 0;
    //   }
    // }
    audio.play();
    document.querySelector(".audio-icon").classList.remove("muted");
    sound = true;
  });
  document.querySelector(".next").addEventListener("click", function(e) {
    if (index < length) index += 1;
    changeImage();
  });
  document.querySelector(".previous").addEventListener("click", function(e) {
    if (index > 0) {
      index -= 1;
      changeImage();
    }
  });
  document.querySelector(".rewind").addEventListener("click", function(e) {
    index = 0;
    changeImage();
  });
};

