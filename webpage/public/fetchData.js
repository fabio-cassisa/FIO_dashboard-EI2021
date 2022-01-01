var socket = io();
let dataArr = [];

let temp = document.getElementById("temp");
let humi = document.getElementById("humi");
let hormo = document.getElementById("hormo");
let quest = document.getElementById("quest");
let alertText = document.getElementById("alertText");
let alertBox = document.getElementById("alertBox");

socket.on('data', function(data) {
  dataArr = data.split(",");
  console.log(dataArr, dataArr.length);

  temp.innerHTML = dataArr[0];
  humi.innerHTML = dataArr[1];

  if ((dataArr[2] >= 30) && (dataArr[2] < 70)) {
    hormo.innerHTML = "BALANCED";
    hormo.classList.remove("attention");
    quest.style.animationName="";
    } else {
      hormo.innerHTML = "UNBALANCED";
      hormo.classList.add("attention");
      quest.style.animationName="blinking2";
    };

  if ((dataArr[2] >= 30) && (dataArr[2] < 70)) {
      gsap.to("#cirStr", {x: dataArr[0], fill: "#2afafa"});
      gsap.to("#alertBox", {opacity: 0, duration: 1, delay: 3});
      gsap.to("#str1",{opacity: 0, duration: 1, delay: 3});
      gsap.to("#str2",{opacity: 0, duration: 1, delay: 3});
      gsap.to("#str1",{display: "none", delay: 3.5});
      gsap.to("#str2",{display: "none", delay: 3.5});
    } if ((dataArr[2] >= 70)) {
      gsap.to("#cirStr", {x: (dataArr[2]), fill: "#ba1b1b"});
      alertText.innerHTML = "Cortisol level is high!"
      gsap.to("#alertBox", {opacity: 1, duration: 1, delay: 3});
      gsap.to("#str1",{display: "block", delay: 3});
      gsap.to("#str2",{display: "block", delay: 3});
      gsap.to("#str1",{opacity: 1, duration: 1, delay: 3.5});
      gsap.to("#str2",{opacity: 1, duration: 1, delay: 3.5});
    } else {
      gsap.to("#cirStr", {x: 0, fill: "#2afafa"});
      gsap.to("#alertBox", {opacity: 0, duration: 1, delay: 3});
      gsap.to("#str1",{opacity: 0, duration: 1, delay: 3});
      gsap.to("#str2",{opacity: 0, duration: 1, delay: 3});
      gsap.to("#str1",{display: "none", delay: 3.5});
      gsap.to("#str2",{display: "none", delay: 3.5});
    };
});

