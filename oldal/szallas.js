// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  html.setAttribute("data-theme", newTheme);
  const icon = themeToggle.querySelector("i");
  icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
  localStorage.setItem("theme", newTheme);
});

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", savedTheme);
const icon = themeToggle.querySelector("i");
icon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";

// Tab functionality
const tabButtons = document.querySelectorAll(".tab-btn");
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    document.querySelectorAll(".recommendation-content").forEach((content) => {
      content.classList.remove("active");
    });
    button.classList.add("active");
    const tabId = button.getAttribute("data-tab");
    document.getElementById(tabId).classList.add("active");
  });
});

// Initialize Chart
const ctx = document.getElementById("travelStatsChart").getContext("2d");
const travelStatsChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Kulturális",
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 9, 80, 11, 18, 21, 22, 23, 24, 25, 26, 27, 28,
          29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
        ],
        backgroundColor: "#6366F1",
        borderRadius: 4,
      },
      {
        label: "Kikapcsolódás",
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 5, 70, 10, 15, 18, 20, 22, 24, 25, 26, 27, 28,
          29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
        ],
        backgroundColor: "#10B981",
        borderRadius: 4,
      },
      {
        label: "Üzleti",
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 3, 60, 8, 12, 15, 18, 20, 22, 24, 26, 28, 30,
          32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52,
        ],
        backgroundColor: "#F59E0B",
        borderRadius: 4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: { callback: (value) => value + "%" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => context.dataset.label + ": " + context.raw + "%",
        },
      },
    },
  },
});

// Wishlist functionality
document.querySelectorAll(".wishlist-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.stopPropagation();
    const icon = this.querySelector("i");
    if (icon.classList.contains("far")) {
      icon.className = "fas fa-heart";
      icon.style.color = "#EF4444";
      const feedback = document.createElement("span");
      feedback.className = "wishlist-feedback";
      feedback.textContent = "Added!";
      this.appendChild(feedback);
      setTimeout(() => feedback.remove(), 1000);
    } else {
      icon.className = "far fa-heart";
      icon.style.color = "";
    }
  });
});

// Search card interactions
document.querySelectorAll(".search-card").forEach((card) => {
  card.addEventListener("click", function () {
    console.log(`Navigating to ${this.getAttribute("data-category")} category`);
    this.style.transform = "scale(0.95)";
    setTimeout(() => (this.style.transform = ""), 200);
  });

  card.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  });
});

// AI Assistant functionality
const assistantInput = document.querySelector(".assistant-input input");
const assistantMessages = document.querySelector(".assistant-messages");

function addMessage(content, isAI = false) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isAI ? "ai-message" : ""}`;
  messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas ${isAI ? "fa-robot" : "fa-user"}"></i>
        </div>
        <div class="message-content">
            <p>${content}</p>
        </div>
    `;
  assistantMessages.appendChild(messageDiv);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

document
  .querySelector(".assistant-input .btn")
  .addEventListener("click", () => {
    const message = assistantInput.value.trim();
    if (message) {
      addMessage(message);
      assistantInput.value = "";
      setTimeout(() => {
        const responses = [
          "Érdekes kérdés! A Balaton most nagyon népszerű, 35% kedvezmény van a héten.",
          "A keresésem alapján ezek a legjobb ajánlatok most: Dubai 300.000HUF, Maldív-szigetek 450.000HUF.",
          "Gergő, az előző utazásaid alapján ezeket ajánlom neked...",
          "Kaptam 12 ajánlatot a kritériumaid alapján. Mutassam őket?",
        ];
        addMessage(
          responses[Math.floor(Math.random() * responses.length)],
          true
        );
      }, 1000);
    }
  });

assistantInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter")
    document.querySelector(".assistant-input .btn").click();
});

// Quick question buttons
document.querySelectorAll(".quick-question-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const question = this.textContent;
    addMessage(question);
    setTimeout(() => {
      if (question.includes("kedvezményes")) {
        addMessage(
          "Most ezek a legjobb akciók: Kerala 15% kedvezmény, Balaton 35% kedvezmény, Párizs 20% kedvezmény. Szeretnél részleteket bármelyikről?",
          true
        );
      } else if (question.includes("illik")) {
        addMessage(
          "Az utazási előzményeid alapján a kulturális és kikapcsolódási utazások illenek hozzád a legjobban. Jelenleg ezeket ajánlom:",
          true
        );
      } else {
        addMessage(
          "A korábbi foglalásaid alapján ezek a célpontok lennének ideálisak számodra: Bali, Olaszország, vagy Japán. Szeretnél konkrét ajánlatot?",
          true
        );
      }
    }, 1500);
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Initialize animations
function animateOnScroll() {
  const elements = document.querySelectorAll(".xyz-in");
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.75) {
      el.classList.add("xyz-in");
    }
  });
}

window.addEventListener("scroll", animateOnScroll);
animateOnScroll(); // Run once on load
