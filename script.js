const themeToggle = document.getElementById("themeToggle");
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    themeToggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    themeToggle.setAttribute("title", dark ? "Switch to light theme" : "Switch to dark theme");
    const icon = themeToggle.querySelector(".theme-icon") || themeToggle;
    icon.textContent = dark ? "☼" : "◐";
  });
}

// macOS Dock Magnification Wave Effect
const macDock = document.getElementById("macDock");
if (macDock) {
  const dockItems = macDock.querySelectorAll(".dock-item");
  const maxScale = 1.25;
  const baseScale = 1;
  const maxDistance = 42; // Pixels of influence radius

  function handleDockMouseMove(e) {
    const isVertical = window.innerWidth > 1100;
    const cursorCoord = isVertical ? e.clientY : e.clientX;

    dockItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = isVertical
        ? rect.top + rect.height / 2
        : rect.left + rect.width / 2;
      const distance = Math.abs(cursorCoord - itemCenter);

      if (distance < maxDistance) {
        // Authentic Apple cosine curve falloff
        const cosine = Math.cos((distance / maxDistance) * (Math.PI / 2));
        const scale = baseScale + (maxScale - baseScale) * cosine;
        item.style.transform = `scale(${scale.toFixed(3)})`;
      } else {
        item.style.transform = `scale(${baseScale})`;
      }
    });
  }

  function resetDock() {
    dockItems.forEach((item) => {
      item.style.transform = `scale(${baseScale})`;
    });
  }

  macDock.addEventListener("mousemove", handleDockMouseMove);
  macDock.addEventListener("mouseleave", resetDock);
  window.addEventListener("scroll", resetDock, { passive: true });
}

// Ensure external project links open in a new tab
document.querySelectorAll(".project-card a").forEach((link) => {
  if (link.hostname && link.hostname !== window.location.hostname) {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noreferrer");
  }
});

