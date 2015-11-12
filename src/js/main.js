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
      <div class="title"></div>

      <div class="buttons">
        <div class="listen"><i class="fa fa-volume-up"></i> LISTEN</div>

        <div class="audio-icons">
          <div class="hidden playing audio-icon"><i class="fa fa-microphone"></i> MUTE</div>
          <div class="hidden muted audio-icon"><i class="fa fa-microphone-slash"></i> MUTE</div>
        </div>
      </div>

      <div class="caption"></div>
      <div class="readmore"><a href="#" target="_blank">Read the full story <i class="fa fa-long-arrow-right"></i></a></div>
      <div class="index">
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

  document.querySelector(".playing.audio-icon").addEventListener("click", function(e) {
    sound = false;
    e.target.classList.add("hidden");
    document.querySelector(".muted.audio-icon").classList.remove("hidden");
  });
  document.querySelector(".muted.audio-icon").addEventListener("click", function(e) {
    sound = true;
    e.target.classList.add("hidden");
    document.querySelector(".playing.audio-icon").classList.remove("hidden");
  });

  if (sound) {
    document.querySelector(".playing.audio-icon").classList.remove("hidden")
  } else {
    document.querySelector(".muted.audio-icon").classList.remove("hidden");
  }
};

var changeImage = function() {
  document.querySelector(".index .dot-" + (index + 1)).classList.add("darker");
  document.querySelector(".title").innerHTML = `<i class="previous arrow fa fa-chevron-left"></i><div class="featured">${data[index].featured}</div><i class="fa hidden rewind fa-undo"></i><i class="next fa arrow fa-chevron-right"></i>`;
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
    document.querySelector(".index .dot-" + (index + 2)).classList.remove("darker");
  }
  if (index == 0) { 
    Array.prototype.slice.call(document.querySelectorAll(".index .fa")).forEach(function(dot) {
      dot.classList.remove("darker");
    });
    document.querySelector(".index .dot-" + (index + 1)).classList.add("darker");
    document.querySelector(".previous").classList.add("hidden");
  } else {
    document.querySelector(".previous").classList.remove("hidden");
  }

  var audio = document.querySelector("audio");
  if (audio) document.body.removeChild(audio);

  audio = document.createElement("audio");
  audio.src = `./assets/${data[index].audio}`;
  document.body.appendChild(audio);

  if (sound) { audio.play(); }

  document.querySelector(".listen").addEventListener("click", function(e) {
    document.querySelector("audio").play();
    document.querySelector(".playing.audio-icon").classList.remove("hidden");
    document.querySelector(".muted.audio-icon").classList.add("hidden");
    sound = true;
  });
  document.querySelector(".next").addEventListener("click", function(e) {
    if (index < length) index += 1;
    changeImage();
  });
  document.querySelector(".previous").addEventListener("click", function(e) {
    if (index > 0) index -= 1;
    changeImage();
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
    document.querySelector(".previous").classList.add("hidden");
  } else {
    document.querySelector(".previous").classList.remove("hidden");
  }
};

