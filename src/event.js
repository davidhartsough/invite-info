const getEl = (id) => document.getElementById(id);
const googleCalLink = getEl("add-to-google-cal");
const appleCalLink = getEl("add-to-apple-cal");
const addToCalBtn = getEl("add-to-cal");
const modal = getEl("modal");
addToCalBtn.addEventListener("click", () => {
  modal.className = "show";
});
function unstickModal() {
  modal.className = "";
}
googleCalLink.addEventListener("click", () => unstickModal());
appleCalLink.addEventListener("click", () => unstickModal());

const startEl = getEl("start");
const start = Number(startEl.getAttribute("data-dtms"));
const startDT = new Date(start).toLocaleString(undefined, {
  dateStyle: "full",
  timeStyle: "short",
});
startEl.textContent = startDT;

const endEl = getEl("end");
const end = Number(endEl.getAttribute("data-dtms"));
const endDT = new Date(end).toLocaleString(undefined, { timeStyle: "short" });
endEl.textContent = endDT;
