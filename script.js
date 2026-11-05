// CodeCraftHub — Personalized Learning for Developers
// Final Project: plain HTML/CSS/JS. Course data, personalized
// recommendations, My Learning list (add / complete / delete),
// search + filters, progress stats. My Learning persists in localStorage.

const COURSES = [
  { id: 1, title: "Python for Beginners", category: "Python", level: "Beginner", description: "Variables, loops, functions and your first real programs.", duration: "6 weeks" },
  { id: 2, title: "Python for Data Science and AI", category: "Python", level: "Intermediate", description: "Pandas, NumPy and an introduction to machine learning with Python.", duration: "8 weeks" },
  { id: 3, title: "JavaScript Essentials", category: "JavaScript", level: "Beginner", description: "The language of the web: DOM, events and modern ES6+ syntax.", duration: "5 weeks" },
  { id: 4, title: "Front-End Apps with JavaScript and React", category: "JavaScript", level: "Intermediate", description: "Components, state and hooks — build interactive front-end apps.", duration: "8 weeks" },
  { id: 5, title: "Java Programming Fundamentals", category: "Java", level: "Beginner", description: "Classes, objects and object-oriented thinking in Java.", duration: "6 weeks" },
  { id: 6, title: "Spring Boot Microservices with Java", category: "Java", level: "Advanced", description: "REST APIs, Spring Boot and deploying Java microservices.", duration: "8 weeks" },
  { id: 7, title: "Generative AI for Developers", category: "Generative AI", level: "Intermediate", description: "Prompt engineering, LLMs and building with tools like ChatGPT and Copilot.", duration: "4 weeks" },
  { id: 8, title: "Building AI Agents with RAG", category: "Generative AI", level: "Advanced", description: "Retrieval-augmented generation, agents and real AI-powered apps.", duration: "6 weeks" },
  { id: 9, title: "Full-Stack Web Development", category: "Web Development", level: "Intermediate", description: "HTML, CSS, JavaScript, Node.js and databases — end to end.", duration: "10 weeks" },
  { id: 10, title: "Responsive Web Design with HTML and CSS", category: "Web Development", level: "Beginner", description: "Layouts, Flexbox, Grid and sites that work on every screen.", duration: "4 weeks" },
  { id: 11, title: "Docker and Kubernetes for Developers", category: "DevOps", level: "Intermediate", description: "Containers, images and orchestrating apps with Kubernetes.", duration: "6 weeks" },
  { id: 12, title: "CI/CD Pipelines and DevSecOps", category: "DevOps", level: "Advanced", description: "Automated testing, delivery pipelines and secure releases.", duration: "5 weeks" }
];

const STORAGE_KEY = "codecrafthub-my-learning-v1";

let myLearning = loadMyLearning();

function loadMyLearning() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveMyLearning() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(myLearning));
}

function $(id) { return document.getElementById(id); }

// ---------- Catalog rendering ----------
function renderCourses() {
  const query = $("search").value.trim().toLowerCase();
  const category = $("filter-category").value;
  const level = $("filter-level").value;
  const list = $("course-list");
  list.innerHTML = "";

  const visible = COURSES.filter((course) => {
    const matchesQuery = !query || course.title.toLowerCase().includes(query) || course.description.toLowerCase().includes(query);
    const matchesCategory = category === "All" || course.category === category;
    const matchesLevel = level === "All" || course.level === level;
    return matchesQuery && matchesCategory && matchesLevel;
  });

  if (visible.length === 0) {
    list.innerHTML = "<p class=\"muted\">No courses match your search. Try a different keyword or filter.</p>";
    return;
  }

  visible.forEach((course) => {
    const card = document.createElement("article");
    card.className = "course-card";

    const title = document.createElement("h3");
    title.textContent = course.title;

    const badges = document.createElement("p");
    const categoryBadge = document.createElement("span");
    categoryBadge.className = "badge";
    categoryBadge.textContent = course.category;
    const levelBadge = document.createElement("span");
    levelBadge.className = "badge level";
    levelBadge.textContent = course.level;
    badges.append(categoryBadge, " ", levelBadge);

    const description = document.createElement("p");
    description.textContent = course.description + " (" + course.duration + ")";

    const actions = document.createElement("div");
    actions.className = "card-actions";
    const addButton = document.createElement("button");
    addButton.className = "btn-primary";
    addButton.textContent = "Add to My Learning";
    addButton.addEventListener("click", () => addCourse(course));
    actions.appendChild(addButton);

    card.append(title, badges, description, actions);
    list.appendChild(card);
  });
}

// ---------- My Learning: add / complete / delete ----------
function addCourse(course) {
  if (myLearning.some((item) => item.id === course.id)) {
    alert(course.title + " is already in My Learning.");
    return;
  }
  myLearning.push({ id: course.id, title: course.title, category: course.category, level: course.level, description: course.description, duration: course.duration, completed: false, progress: 0 });
  saveMyLearning();
  renderMyLearning();
}

function addCustomGoal(title, category, level) {
  const goal = { id: Date.now(), title, category, level, description: "Your own learning goal.", duration: "Self-paced", completed: false, progress: 0 };
  myLearning.push(goal);
  saveMyLearning();
  renderMyLearning();
}

function markComplete(id) {
  const item = myLearning.find((entry) => entry.id === id);
  if (!item) return;
  item.completed = !item.completed;
  item.progress = item.completed ? 100 : 0;
  saveMyLearning();
  renderMyLearning();
}

function deleteCourse(id) {
  myLearning = myLearning.filter((entry) => entry.id !== id);
  saveMyLearning();
  renderMyLearning();
}

function renderMyLearning() {
  const list = $("my-list");
  list.innerHTML = "";
  $("my-empty").style.display = myLearning.length === 0 ? "block" : "none";

  myLearning.forEach((course) => {
    const card = document.createElement("article");
    card.className = "course-card";

    const title = document.createElement("h3");
    title.textContent = course.title;

    const badges = document.createElement("p");
    const categoryBadge = document.createElement("span");
    categoryBadge.className = "badge";
    categoryBadge.textContent = course.category;
    const levelBadge = document.createElement("span");
    levelBadge.className = "badge level";
    levelBadge.textContent = course.level;
    badges.append(categoryBadge, " ", levelBadge);

    const description = document.createElement("p");
    description.textContent = course.description + " (" + course.duration + ")";

    const track = document.createElement("div");
    track.className = "progress-track";
    const fill = document.createElement("div");
    fill.className = "progress-fill";
    fill.style.width = course.progress + "%";
    track.appendChild(fill);

    const status = document.createElement("p");
    status.className = course.completed ? "completed-label" : "muted";
    status.textContent = course.completed ? "Completed ✓" : "In progress — " + course.progress + "%";

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const completeButton = document.createElement("button");
    completeButton.className = "btn-success";
    completeButton.textContent = course.completed ? "Mark as Not Completed" : "Mark as Completed";
    completeButton.addEventListener("click", () => markComplete(course.id));

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn-danger";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", "Delete " + course.title);
    deleteButton.addEventListener("click", () => deleteCourse(course.id));

    actions.append(completeButton, deleteButton);
    card.append(title, badges, description, track, status, actions);
    list.appendChild(card);
  });

  updateStats();
}

function updateStats() {
  const total = myLearning.length;
  const completed = myLearning.filter((item) => item.completed).length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
  $("stat-total").textContent = total;
  $("stat-completed").textContent = completed;
  $("stat-progress").textContent = progress + "%";
}

// ---------- Personalized recommendation ----------
function recommendPath(interest, level, hours) {
  const matches = COURSES.filter((course) => course.category === interest && course.level === level);
  const picks = matches.length > 0 ? matches : COURSES.filter((course) => course.category === interest);
  const names = picks.map((course) => course.title).join(", ");
  const weeks = Math.max(1, Math.round(6 / Math.max(1, hours / 5)));
  return "Your " + level + " " + interest + " path (" + hours + " hrs/week): " + names + ". At this pace, aim to finish your first course in about " + weeks + " weeks.";
}

// ---------- Wire up events ----------
document.addEventListener("DOMContentLoaded", () => {
  renderCourses();
  renderMyLearning();

  $("search").addEventListener("input", renderCourses);
  $("filter-category").addEventListener("change", renderCourses);
  $("filter-level").addEventListener("change", renderCourses);

  $("profile-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const message = recommendPath($("interest").value, $("level").value, Number($("hours").value) || 5);
    $("recommendation").textContent = message;
    $("filter-category").value = $("interest").value;
    $("filter-level").value = $("level").value;
    renderCourses();
    document.getElementById("paths").scrollIntoView({ behavior: "smooth" });
  });

  $("goal-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const title = $("goal-title").value.trim();
    if (!title) return;
    addCustomGoal(title, $("goal-category").value, $("goal-level").value);
    $("goal-form").reset();
    document.getElementById("my-learning").scrollIntoView({ behavior: "smooth" });
  });
});
