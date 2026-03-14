
let whispers = [];

let algorithmStats = {
  blur: 0,
  shuffle: 0,
  symbol: 0
};

let totalWhispers = 0;

let originalText = "";

function blurText(text, level) {
  const words = text.split(" ");
  return words
    .map(word => (Math.random() < level / 10 ? "..." : word))
    .join(" ");
}

function shuffleText(text, level) {
  let arr = text.split('');
  for (let i = 0; i < level; i++) {
    const a = Math.floor(Math.random() * arr.length);
    const b = Math.floor(Math.random() * arr.length);
    [arr[a], arr[b]] = [arr[b], arr[a]];
  }
  return arr.join('');
}

function symbolText(text, level) {
  const symbols = ['@', '#', '$', '%', '&', '*', '?', '!'];
  let arr = text.split('');
  for (let i = 0; i < level && arr.length > 0; i++) {
    const index = Math.floor(Math.random() * arr.length);
    arr[index] = symbols[Math.floor(Math.random() * symbols.length)];
  }
  return arr.join('');
}

function applyDistortion() {
  const input = document.getElementById("inputText");
  const result = document.getElementById("resultText");
  const stats = document.getElementById("stats");
  const level = parseInt(document.getElementById("level").value);
  const algo = document.getElementById("algo").value;

  if (!originalText) originalText = input.value;

  if (!input.value.trim()) {
    alert("Please enter a whisper before distorting!");
    return;
  }

  let distorted = "";

  switch (algo) {
    case "blur":
      distorted = blurText(input.value, level);
      algorithmStats.blur++;
      break;
    case "shuffle":
      distorted = shuffleText(input.value, level);
      algorithmStats.shuffle++;
      break;
    case "symbol":
      distorted = symbolText(input.value, level);
      algorithmStats.symbol++;
      break;
  }

  input.value = distorted;
  result.textContent = distorted;
  result.className = algo;

  totalWhispers++;
  stats.textContent = `Whispers submitted: ${totalWhispers} | Blur: ${algorithmStats.blur} | Shuffle: ${algorithmStats.shuffle} | Symbol: ${algorithmStats.symbol}`;


  whispers.push(distorted);

  if (whispers.length >= 6) showTimeline();
}

function resetText() {
  const input = document.getElementById("inputText");
  const result = document.getElementById("resultText");
  const stats = document.getElementById("stats");

  input.value = originalText;
  result.textContent = "";
  result.className = "";
  totalWhispers = 0;
  algorithmStats = { blur: 0, shuffle: 0, symbol: 0 };
  stats.textContent = `Whispers submitted: 0 | Blur: 0 | Shuffle: 0 | Symbol: 0`;

  
  whispers = [];
  document.getElementById("timeline").style.display = "none";
  document.getElementById("entries").innerHTML = "";
}


function showTimeline() {
  document.getElementById("timeline").style.display = "block";
  const entries = document.getElementById("entries");

  entries.innerHTML = whispers
    .map((w, i) => `<div class='entry'><strong>Step ${i + 1}:</strong> ${w}</div>`)
    .join("");
}