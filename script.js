const wait = ms => new Promise(r => setTimeout(r, ms));
document.body.classList.add("typing");

const heads = el => el.tagName === "H1" || el.tagName === "H2";

async function popLetters(el) {
  const t = el.dataset.t;
  el.textContent = "";
  let i = 0;
  t.split(" ").forEach((w, wi, arr) => {
    const word = document.createElement("span");
    word.className = "word";
    [...w].forEach(c => {
      const s = document.createElement("span");
      s.className = "ch";
      s.textContent = c;
      s.style.animationDelay = (i++ * 0.05) + "s";
      word.appendChild(s);
    });
    el.appendChild(word);
    if (wi < arr.length - 1) el.appendChild(document.createTextNode(" "));
  });
  await wait(i * 50 + 500);
}

async function typeText(el, speed = 45) {
  const t = el.dataset.t;
  el.textContent = "";
  el.classList.add("cursor");
  for (const ch of t) {
    el.textContent += ch;
    await wait(speed);
  }
  el.classList.remove("cursor");
}

async function run() {
  const els = [...document.querySelectorAll("h1, h2, .small, .card p:not(#replyText)")];
  els.forEach(el => {
    el.dataset.t = el.textContent;
    el.style.minHeight = el.offsetHeight + "px";
    el.textContent = "";
  });
  for (const el of els) {
    if (heads(el)) await popLetters(el);
    else await typeText(el);
    await wait(250);
  }
  document.body.classList.remove("typing");
}
run();

/* page 5 reply */
const reply = document.getElementById("reply");
const text = document.getElementById("replyText");

async function showReply(msg) {
  reply.classList.remove("hidden");
  text.dataset.t = msg;
  reply.scrollIntoView({ behavior: "smooth", block: "center" });
  await typeText(text);
}

const yes = document.getElementById("yes");
const time = document.getElementById("time");
if (yes) yes.onclick = () => showReply("Thank you Chinni. I won't waste this chance.");
if (time) time.onclick = () => showReply("It's okay, take your time. I'll be here waiting for you.");
