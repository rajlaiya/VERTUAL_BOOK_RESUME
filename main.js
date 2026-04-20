const book = document.getElementById("book");
const openNode = document.getElementById("openNode");
const leftPage = document.getElementById("leftPage");
const rightPage = document.getElementById("rightPage");
const indexList = document.getElementById("indexList");

const pages = [
  {
    id: "intro",
    label: "Cover Page",
    template: () => `
      <article class="resume-title">
        <div>
          <h2>Raj Laiya</h2>
          <p>Front-End and MERN Stack Developer</p>
          <p class="page-no">Page 1</p>
        </div>
      </article>
    `,
  },
  {
    id: "about",
    label: "About Me",
    template: () => `
      <article class="resume-section">
        <h3>About Me</h3>
        <p>
          Detail-oriented developer with internship experience building responsive
          interfaces and user-focused web applications.
        </p>
        <p>
          I enjoy turning ideas into polished products with clean code and clear UX.
        </p>
        <p class="page-no">Page 2</p>
      </article>
    `,
  },
  {
    id: "skills",
    label: "Skills",
    template: () => `
      <article class="resume-section">
        <h3>Skills</h3>
        <ul>
          <li>HTML5, CSS3, JavaScript, TypeScript</li>
          <li>React, Vue.js, Node.js, Express</li>
          <li>MongoDB, REST APIs, Responsive UI</li>
          <li>Git, GitHub, Debugging, Deployment</li>
        </ul>
        <p class="page-no">Page 3</p>
      </article>
    `,
  },
  {
    id: "experience",
    label: "Experience",
    template: () => `
      <article class="resume-section">
        <h3>Experience</h3>
        <p><strong>Front-End Intern</strong> - Code Alpha (2024)</p>
        <ul>
          <li>Built utility and mini-app projects with modern UI patterns.</li>
          <li>Improved mobile responsiveness and component structure.</li>
        </ul>
        <p><strong>Vue.js Intern</strong> - Kombee Solutions (2024)</p>
        <ul>
          <li>Created interactive screens and reusable UI blocks.</li>
          <li>Collaborated on live web modules and bug fixing.</li>
        </ul>
        <p class="page-no">Page 4</p>
      </article>
    `,
  },
  {
    id: "projects",
    label: "Projects",
    template: () => `
      <article class="resume-section">
        <h3>Projects</h3>
        <ul>
          <li>Intern Form Portal with filtering and search tools</li>
          <li>Food Website (Vue + UI component libraries)</li>
          <li>Age Calculator and Basic Calculator apps</li>
          <li>Personal Portfolio and eCommerce clone UI</li>
        </ul>
        <p class="page-no">Page 5</p>
      </article>
    `,
  },
  {
    id: "education",
    label: "Education",
    template: () => `
      <article class="resume-section">
        <h3>Education</h3>
        <ul>
          <li>B.E. in ECE - Government Engineering College, Bharuch</li>
          <li>Diploma in ECE - Government Polytechnic, Rajkot</li>
          <li>SSC - Aastha School, Jasdan</li>
        </ul>
        <p class="page-no">Page 6</p>
      </article>
    `,
  },
  {
    id: "contact",
    label: "Contact",
    template: () => `
      <article class="resume-section">
        <h3>Contact</h3>
        <p>Email: yourmail@example.com</p>
        <p>Phone: +91 00000 00000</p>
        <p>Location: Gujarat, India</p>
        <p>Portfolio: https://your-portfolio-link.com</p>
        <p class="page-no">Page 7</p>
      </article>
    `,
  },
];

let currentPage = 0;
let isAnimating = false;

function renderIndex() {
  indexList.innerHTML = pages
    .map(
      (page, index) => `
        <li>
          <button type="button" data-index="${index}" class="${index === currentPage ? "active" : ""}">
            ${index + 1}. ${page.label}
          </button>
        </li>
      `
    )
    .join("");
}

function renderRightPage() {
  rightPage.innerHTML = pages[currentPage].template();
  renderIndex();
}

function animateTurn(direction, onDone) {
  if (isAnimating) {
    return;
  }

  isAnimating = true;
  const animationClass = direction === "next" ? "turn-next" : "turn-prev";

  rightPage.classList.remove("turn-next", "turn-prev");
  // Force reflow so the animation can replay reliably.
  void rightPage.offsetWidth;
  rightPage.classList.add(animationClass);

  rightPage.addEventListener(
    "animationend",
    () => {
      rightPage.classList.remove(animationClass);
      onDone();
      isAnimating = false;
    },
    { once: true }
  );
}

function goNext() {
  if (currentPage >= pages.length - 1 || isAnimating) {
    return;
  }

  animateTurn("next", () => {
    currentPage += 1;
    renderRightPage();
  });
}

function goPrev() {
  if (currentPage <= 0 || isAnimating) {
    return;
  }

  animateTurn("prev", () => {
    currentPage -= 1;
    renderRightPage();
  });
}

openNode.addEventListener("click", () => {
  book.classList.remove("closed");
  book.classList.add("open");
});

rightPage.addEventListener("click", () => {
  if (!book.classList.contains("open")) {
    return;
  }
  goNext();
});

leftPage.addEventListener("click", (event) => {
  if (!book.classList.contains("open")) {
    return;
  }

  const indexButton = event.target.closest("button[data-index]");
  if (indexButton) {
    const selected = Number(indexButton.dataset.index);

    if (selected === currentPage) {
      return;
    }

    const direction = selected > currentPage ? "next" : "prev";
    animateTurn(direction, () => {
      currentPage = selected;
      renderRightPage();
    });
    return;
  }

  goPrev();
});

renderRightPage();
