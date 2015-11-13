// require("./lib/social");
require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

var sound;

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
  document.querySelector(".gallery").innerHTML = `
    <div class="image">
      <img src="./assets/slide1.gif">
    </div>

    <div class="column">
      <div class="index mobile-index">
        <i class="fa fa-circle dot-1"></i>
        <i class="fa fa-circle dot-2"></i>
        <i class="fa fa-circle dot-3"></i>
        <i class="fa fa-circle dot-4"></i>
        <i class="fa fa-circle dot-5"></i>
        <i class="fa fa-circle dot-6"></i>
        <i class="fa fa-circle dot-7"></i>
        <i class="fa fa-circle dot-8"></i>
      </div>

      <div class="title"></div>

      <div class="buttons">
        <div class="listen"><i class="fa fa-volume-up"></i> LISTEN</div>

        <div class="audio-icons">
          <div class="audio-icon"><i class="playing fa fa-microphone"></i><i class="silenced fa fa-microphone-slash"></i> MUTE</div>
        </div>
      </div>

      <div class="caption"></div>
      <div class="readmore"><a href="#" target="_blank">Read the full story <i class="fa fa-long-arrow-right"></i></a></div>
      <div class="index desktop-index">
        <i class="fa fa-circle dot-1"></i>
        <i class="fa fa-circle dot-2"></i>
        <i class="fa fa-circle dot-3"></i>
        <i class="fa fa-circle dot-4"></i>
        <i class="fa fa-circle dot-5"></i>
        <i class="fa fa-circle dot-6"></i>
        <i class="fa fa-circle dot-7"></i>
        <i class="fa fa-circle dot-8"></i>
      </div>


    </div>
  `;

  changeImage();

  document.querySelector(".audio-icon").addEventListener("click", function(e) {
    if (sound) {
      document.querySelector(".audio-icon").classList.add("muted");
      sound = false;
    } else {
      document.querySelector(".audio-icon").classList.remove("muted");
      sound = true;
    }
  });
};

var changeImage = function() {
  document.querySelector(".desktop-index .dot-" + (index + 1)).classList.add("darker");
  document.querySelector(".mobile-index .dot-" + (index + 1)).classList.add("darker");
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
    document.querySelector(".buttons").classList.add("hidden");
    document.querySelector(".next").classList.add("hidden");
    document.querySelector(".rewind").classList.remove("hidden");
  } else {
    document.querySelector(".buttons").classList.remove("hidden");
    document.querySelector(".next").classList.remove("hidden");
    document.querySelector(".rewind").classList.add("hidden");
    document.querySelector(".mobile-index .dot-" + (index + 2)).classList.remove("darker");
    document.querySelector(".desktop-index .dot-" + (index + 2)).classList.remove("darker");
  }
  if (index == 0) { 
    Array.prototype.slice.call(document.querySelectorAll(".index .fa")).forEach(function(dot) {
      dot.classList.remove("darker");
    });
    document.querySelector(".mobile-index .dot-" + (index + 1)).classList.add("darker");
    document.querySelector(".desktop-index .dot-" + (index + 1)).classList.add("darker");
    document.querySelector(".previous").classList.add("disabled");
  } else {
    document.querySelector(".previous").classList.remove("disabled");
  }

  var audio = document.querySelector("audio");
  if (audio) document.body.removeChild(audio);

  audio = document.createElement("audio");
  audio.src = `./assets/${data[index].audio}`;
  document.body.appendChild(audio);

  if (sound) { audio.play(); }

  document.querySelector(".listen").addEventListener("click", function(e) {
    document.querySelector("audio").play();
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

  if (index == length) { 
    document.querySelector(".next").classList.add("hidden");
  } else {
    document.querySelector(".next").classList.remove("hidden");
  }
  if (index == 0) { 
    document.querySelector(".previous").classList.add("disabled");
  } else {
    document.querySelector(".previous").classList.remove("disabled");
  }
};

