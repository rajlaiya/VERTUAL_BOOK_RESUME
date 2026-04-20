// --- JavaScript for Animations and Interactions ---
const elementsToFadeIn = document.querySelectorAll(".fade-in");
const projectItems = document.querySelectorAll("#projects .project-item");
const experienceItems = document.querySelectorAll(
  "#experience .experience-item"
);
const typingElement = document.querySelector(".typing-animation");
const aboutTypingElement = document.querySelector(".about-typing");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

elementsToFadeIn.forEach((element) => {
  observer.observe(element);
});

// --- Smooth Scrolling ---
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// --- Animate Project Items with Delay ---
projectItems.forEach((item, index) => {
  observer.observe(item);
  item.style.animationDelay = `${index * 0.15}s`; // Add a slight delay to each project item
});

// --- Animate Experience Items with Delay ---
experienceItems.forEach((item, index) => {
  observer.observe(item);
  item.style.transitionDelay = `${index * 0.2}s`; // Add a slight delay to each experience item
});
