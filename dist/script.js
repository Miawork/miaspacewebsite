const moods = [
  {
    src: "assets/miao-ok.gif",
    alt: "Pixel-art avatar of Miao saying OK",
    caption: "system status: ready to build",
  },
  {
    src: "assets/miao-heart.gif",
    alt: "Pixel-art avatar of Miao with a heart",
    caption: "people first, always",
  },
  {
    src: "assets/miao-thinking.gif",
    alt: "Pixel-art avatar of Miao thinking",
    caption: "tracing the signal through the noise",
  },
  {
    src: "assets/miao-alert.gif",
    alt: "Pixel-art avatar of Miao reacting to an alert",
    caption: "incident detected — context loading",
  },
  {
    src: "assets/miao-focus.gif",
    alt: "Pixel-art avatar of Miao focusing",
    caption: "deep work mode: do not disturb",
  },
  {
    src: "assets/miao-question.gif",
    alt: "Pixel-art avatar of Miao asking a question",
    caption: "the best debugging tool: one good question",
  },
];

const moodImage = document.querySelector("#mood-image");
const moodCaption = document.querySelector("#mood-caption");
const moodButtons = [...document.querySelectorAll(".mood-button")];
const pauseButton = document.querySelector(".mood-pause");
const portraitStage = document.querySelector(".portrait-stage");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let currentMood = 0;
let isPaused = prefersReducedMotion.matches;
let moodTimer;

function showMood(index) {
  currentMood = index;
  const mood = moods[index];
  moodImage.src = mood.src;
  moodImage.alt = mood.alt;
  moodCaption.textContent = mood.caption;

  moodButtons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === index;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function updatePauseButton() {
  pauseButton.textContent = isPaused ? "Play" : "Pause";
  pauseButton.setAttribute("aria-pressed", String(isPaused));
}

function stopMoodTimer() {
  window.clearInterval(moodTimer);
}

function startMoodTimer() {
  stopMoodTimer();
  if (isPaused) return;
  moodTimer = window.setInterval(() => {
    showMood((currentMood + 1) % moods.length);
  }, 3600);
}

moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showMood(Number(button.dataset.mood));
    startMoodTimer();
  });
});

pauseButton.addEventListener("click", () => {
  isPaused = !isPaused;
  updatePauseButton();
  startMoodTimer();
});

portraitStage.addEventListener("mouseenter", stopMoodTimer);
portraitStage.addEventListener("mouseleave", startMoodTimer);
portraitStage.addEventListener("focusin", stopMoodTimer);
portraitStage.addEventListener("focusout", startMoodTimer);

prefersReducedMotion.addEventListener("change", (event) => {
  isPaused = event.matches;
  updatePauseButton();
  startMoodTimer();
});

const revealElements = document.querySelectorAll("[data-reveal]");

if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

const progressBar = document.querySelector(".scroll-progress span");

function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);

const copyButton = document.querySelector(".copy-email");

copyButton.addEventListener("click", async () => {
  const originalText = copyButton.textContent;
  try {
    await navigator.clipboard.writeText(copyButton.dataset.email);
    copyButton.textContent = "Copied ✓";
  } catch {
    copyButton.textContent = copyButton.dataset.email;
  }

  window.setTimeout(() => {
    copyButton.textContent = originalText;
  }, 2200);
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

window.addEventListener("load", () => {
  if (!window.location.hash) return;
  const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
  window.requestAnimationFrame(() => target?.scrollIntoView({ block: "start" }));
});

updatePauseButton();
startMoodTimer();
updateScrollProgress();
