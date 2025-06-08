let order = [];
let userOrder = [];
let shuffled = false;
let timerInterval;
let secondsElapsed = 0;

const imageUrls = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/960px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
    "https://lh3.googleusercontent.com/gps-cs-s/AC9h4no3ANyEoLIythN2e1wUdsFiCT8ydEJQaZpOeZEsiGstvmcKZOJM0kZC_wDuz8Ra9BIaBLShPgwA_ZavTPXNI1lEk7jHVqzH9t3lgGrmId5MrG7HJ68mS1oxgcC_lTROujZ0x3Ev=s1360-w1360-h1020-rw",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/960px-Taj_Mahal_%28Edited%29.jpeg",
    "https://th-thumbnailer.cdn-si-edu.com/pl7tMO37jADJMfZ8T1DuIRDaBbc=/fit-in/1600x0/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/db/d6/dbd616d4-f52c-43cb-a9c2-4f77a5dcb2d3/eiffel-tower-night.jpg",
    "https://i.natgeofe.com/n/535f3cba-f8bb-4df2-b0c5-aaca16e9ff31/giza-plateau-pyramids.jpg",
    "https://cdn.britannica.com/43/189743-050-25B19F71/Great-Sphinx-Pyramid-of-Khafre-Egypt-Giza.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
    "https://www.wanderlustmagazine.com/wp-content/uploads/2023/11/5-1-scaled.jpg",
    "https://www.historyhit.com/app/uploads/bis-images/5150130/Statue-of-Liberty-e1632495792514-788x537.jpg?x92500",
    "https://media.cntraveler.com/photos/5d3863de379c7a0009a8d6c9/master/pass/Statue-of-Liberty_GettyImages-942459846.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYeCXCBOf4KwHpKar9YZ5Um5lZ9i4WeIuYIA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi1cw4sk5JoXWDV3PO4uRxyiKOPmIzN3N5XA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQRJwTdkZnA7JUH1rqdZxi5thDobk4f6K29Q&s",
    "https://media.cntraveler.com/photos/59d3a805ddaded4e04772233/16:9/w_3791,h_2132,c_limit/Rome_GettyImages-841851056.jpg",
    "https://news.yale.edu/sites/default/files/styles/full/public/ynews-machu_picchu_peru-wiki.jpg?itok=2UrS7Hw8",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6mSQuwueLovRHy-t1YS1CMbGN7aDUAwxpMA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNQnA1o_CO3uxMmupNeCeKN5-HdqOH4PrgdA&s",
    "https://cdn.sanity.io/images/atvntylo/production/c5444922a0cd9ffe8c1f8b4ccefa12867c899823-1200x720.webp?w=3840&q=65&fit=clip&auto=format",
    "https://defendersofwildlife-360365372.imgix.net/sites/default/files/2019-04/Ocean%20Pixabay%20header.jpg?fit=max&ixlib=php-4.1.0&w=1110",
    "https://cdn.mos.cms.futurecdn.net/K6WmxeWt9gT5CcQQRKUuQM.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRPPXVa30t7lYCnZ2pJS249d6sVuKAe6-OlA&s",
    "https://i.pinimg.com/originals/d3/45/11/d3451114ab4e1d55ead624930bcff60c.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT1PCiOgOw9Rj6g0CMAWwl5hKteMcUPl2Mxg&s",
    "https://t4.ftcdn.net/jpg/02/78/52/07/360_F_278520748_G9sRQdSValj67Hihmt4r3ji6SLRT3ViA.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvqfgmTgE6Tw__HaBeMnktJANW_8SjKyOcyg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGK0aa_KvwdiGZWcnXpnlSB4sFIeTTTKF1dg&s",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Reinbukken_p%C3%A5_frisk_gr%C3%B8nt_beite._-_panoramio.jpg/1200px-Reinbukken_p%C3%A5_frisk_gr%C3%B8nt_beite._-_panoramio.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSuuaDC1Yxag8hdROQQeKDkoWXINvjbsngTw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG96uZNceaPtBvfNHtnZPtUyWJd8NUXVyIAQ&s"
  ];

function startGame() {
  const size = parseInt(document.getElementById("grid-size").value);
  const mode = document.getElementById("mode").value;
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  order = [];
  userOrder = [];
  shuffled = false;

  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  const total = size * size;

  if (mode === "photo") {
    const shuffledImages = [...imageUrls].sort(() => Math.random() - 0.5);
    const images = shuffledImages.slice(0, total);
    for (let i = 0; i < total; i++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.dataset.index = i;
      const img = document.createElement("img");
      img.src = images[i];
      tile.appendChild(img);
      tile.onclick = () => handleTileClick(tile);
      grid.appendChild(tile);
    }
  } else {
    for (let i = 0; i < total; i++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.dataset.index = i;
      const num = Math.floor(1000 + Math.random() * 9000);
      tile.textContent = num;
      tile.onclick = () => handleTileClick(tile);
      grid.appendChild(tile);
    }
  }

  startTimer();
  loadBestScore();

}

function shuffleTiles() {
  const grid = document.getElementById("grid");
  const tiles = Array.from(grid.children);
  for (let tile of tiles) tile.classList.remove("disabled");

  const shuffledTiles = tiles.sort(() => Math.random() - 0.5);
  grid.innerHTML = "";
  shuffledTiles.forEach(tile => grid.appendChild(tile));
  shuffled = true;
}

function handleTileClick(tile) {
  const index = parseInt(tile.dataset.index);

  if (!shuffled) {
    order.push(index);
    tile.classList.add("disabled");

    if (order.length === document.querySelectorAll(".tile").length) {
      setTimeout(shuffleTiles, 500);
    }
  } else {
    const expectedIndex = order[userOrder.length];
    const mode = document.getElementById("mode").value;

    if (index !== expectedIndex) {
      userOrder.push(index);
      stopTimer();
      showSequencesAndLose(mode);
      return;
    }

    userOrder.push(index);
    tile.classList.add("disabled");

    if (userOrder.length === order.length) {
        stopTimer();
        updateBestScore(secondsElapsed); // ✅ Update best time in localStorage
        setTimeout(() => {
          alert(`🎉 You Win!\nTime: ${formatTime(secondsElapsed)}`);
        }, 300);
      }
      
  }
}

function getKeyForBestScore() {
    const size = document.getElementById("grid-size").value;
    const mode = document.getElementById("mode").value;
    return `best-${size}x${size}-${mode}`;
  }

  function loadBestScore() {
    const key = getKeyForBestScore();
    const bestTime = localStorage.getItem(key);
    document.getElementById("best-score").textContent =
      bestTime ? `🏆 Best Time: ${formatTime(parseInt(bestTime))}` : `🏆 Best Time: --:--`;
  }
  
  function updateBestScore(currentTime) {
    const key = getKeyForBestScore();
    const bestTime = localStorage.getItem(key);
    if (!bestTime || currentTime < parseInt(bestTime)) {
      localStorage.setItem(key, currentTime);
      loadBestScore();
    }
  }

  function loadOverallBest() {
  const best = localStorage.getItem("overall-best");
  document.getElementById("overall-best").textContent =
    best ? `🌟 Overall Best: ${formatTime(parseInt(best))}` : `🌟 Overall Best: --:--`;
}

function updateOverallBest(currentTime) {
  const best = localStorage.getItem("overall-best");
  if (!best || currentTime < parseInt(best)) {
    localStorage.setItem("overall-best", currentTime);
    loadOverallBest();
  }
}

  

function showSequencesAndLose(mode) {
  const tiles = Array.from(document.querySelectorAll(".tile"));

  const getContent = (idx) => {
    const tile = tiles[idx];
    if (mode === "photo") {
      return tile.querySelector("img")?.src || "🖼️";
    } else {
      return tile.textContent;
    }
  };

  const correctSeq = order.map(i => getContent(i));
  const userSeq = userOrder.map(i => getContent(i));

  let html = `<h3>❌ You Lost!</h3><p><b>Time:</b> ${formatTime(secondsElapsed)}</p>`;
  html += `<b>✅ Correct Sequence:</b><br>`;
  html += renderSequence(correctSeq, mode);
  html += `<br><b>❌ Your Sequence:</b><br>`;
  html += renderSequence(userSeq, mode);

  const win = window.open("", "", "width=600,height=600");
  win.document.write(`<html><head><title>Result</title></head><body style="font-family:Arial;text-align:center;">${html}</body></html>`);
  win.document.close();

  document.querySelectorAll(".tile").forEach(t => t.classList.add("disabled"));
}

function renderSequence(seq, mode) {
  if (mode === "photo") {
    return seq.map(src => `<img src="${src}" width="60" height="60" style="margin:3px;border:1px solid #ccc;">`).join("");
  } else {
    return seq.map(num => `<span style="display:inline-block;width:60px;height:60px;line-height:60px;margin:3px;background:#eee;border:1px solid #ccc;">${num}</span>`).join("");
  }
}

function startTimer() {
  clearInterval(timerInterval);
  secondsElapsed = 0;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    secondsElapsed++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimerDisplay() {
  document.getElementById("timer").textContent =
    `⏱️ Time: ${formatTime(secondsElapsed)}`;
}

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
