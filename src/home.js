const span = document.getElementById("details");

span.addEventListener("click", () => {
  if (span.textContent === "deets") {
    span.textContent = "details";
  } else if (span.textContent === "details") {
    span.textContent = "deets";
  }
});
