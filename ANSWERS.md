# CodeCraftHub — Final Project Answers for Mark (learner/3622) — RETAKE

Updated 2026-11-06 to match Mark grading feedback from the first attempt (10/20).
First attempt used title "Personalized Learning for Developers", #2563eb, #16a34a, Delete/deleteCourse.
Mark requires: title "CodeCraftHub: Your Learning Management Platform", .btn-primary #8B5CF6, .btn-success #F59E0B, delete button labelled "Remove" calling handleDelete.
App files and GitHub repo were updated to match before the retake.

## 1. Updated title tag
<title>CodeCraftHub: Your Learning Management Platform</title>

## 2. Updated .btn-primary styling code
.btn-primary {
  background-color: #8B5CF6;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px 22px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

## 3. Updated .btn-success styling code
.btn-success {
  background-color: #F59E0B;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px 22px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

## 4. Updated delete button code
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn-danger";
    deleteButton.textContent = "Remove";
    deleteButton.setAttribute("aria-label", "Remove " + course.title);
    deleteButton.addEventListener("click", () => handleDelete(course.id));

function handleDelete(id) {
  myLearning = myLearning.filter((entry) => entry.id !== id);
  saveMyLearning();
  renderMyLearning();
}
