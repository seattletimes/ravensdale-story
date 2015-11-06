// require("./lib/social");
// require("./lib/ads");
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
document.querySelector(".playing.audio-icon").addEventListener("click", function(e) {
  sound = false;
  e.target.classList.add("hidden");
  document.querySelector(".muted.audio-icon").classList.remove("hidden");
  console.log(sound)
});
document.querySelector(".muted.audio-icon").addEventListener("click", function(e) {
  sound = true;
  e.target.classList.add("hidden");
  document.querySelector(".playing.audio-icon").classList.remove("hidden");
  console.log(sound)
});
document.querySelector(".next").addEventListener("click", function(e) {
  if (index < length) index += 1;
  changeImage();
  console.log(sound)
});
document.querySelector(".previous").addEventListener("click", function(e) {
  if (index > 0) index -= 1;
  changeImage();
  console.log(sound)
});

var index = 0;
var length = data.length - 1;

var begin = function() {
  changeImage();
  document.querySelector(".play.with-sound").classList.add("hidden");
  document.querySelector(".play.without-sound").classList.add("hidden");
  document.querySelector(".next").classList.remove("hidden");
  if (sound) {
    document.querySelector(".playing.audio-icon").classList.remove("hidden")
  } else {
    document.querySelector(".muted.audio-icon").classList.remove("hidden");
  }
};

var changeImage = function() {
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

  document.querySelector(".caption").innerHTML = `
    <div class="featured">${data[index].featured}</div>
    <div>${data[index].caption}</div>
    <div class="listen"><i class="fa fa-play"></i> LISTEN</div>
  `;
  var img = document.createElement("img");
  img.src = `./assets/${data[index].image}`;
  img.onload = function() {
    var frame = document.querySelector(".image");
    frame.innerHTML = "";
    frame.appendChild(img);
    img.removeAttribute("height");
  }

  var audio = document.querySelector("audio");
  if (audio) document.body.removeChild(audio);

  audio = document.createElement("audio");
  audio.src = `./assets/${data[index].audio}`;
  document.body.appendChild(audio);

  if (sound) { audio.play(); }

  document.querySelector(".listen").addEventListener("click", function(e) {
    document.querySelector("audio").play();
  });
};



