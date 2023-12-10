const getEl = (id) => document.getElementById(id);
const form = getEl("form");
const titleInputEl = getEl("title");
const startInputEl = getEl("start");
const endInputEl = getEl("end");
const locationInputEl = getEl("location");
const descriptionInputEl = getEl("description");
const linkInputEl = getEl("link");
const emailInputEl = getEl("email");

function getOneWeekFromNow() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  date.setHours(19, 0, 0, 0);
  return `${date.toISOString().slice(0, 11)}19:00`;
}
function getMinDT() {
  const date = new Date();
  date.setHours(1, 1, 0, 0);
  return `${date.toISOString().slice(0, 11)}01:00`;
}
function getMaxDT() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  date.setFullYear(date.getFullYear() + 1);
  date.setMonth(date.getMonth() + 2);
  date.setHours(23, 0, 0, 0);
  return `${date.toISOString().slice(0, 11)}19:00`;
}
// "yyyy-MM-ddThh:mm"
startInputEl.value = getOneWeekFromNow();
startInputEl.setAttribute("min", getMinDT());
startInputEl.setAttribute("max", getMaxDT());
endInputEl.value = "20:00";

const urlPattern =
  /^(https?:\/\/)((?!-)(?!.*--)[a-zA-Z\-0-9]{1,63}(?<!-)\.)+[a-zA-Z]{2,63}(\/[^\s]*)?$/;
const emailPattern =
  /^([^<>()[\]\\.,;:\s@"]{1,63})@((((?!-)(?!.*--)[a-zA-Z\-0-9]{1,63}(?<!-))+\.)+([a-zA-Z]{2,63}))$/;
// "yyyy-MM-ddThh:mm"
const startPattern =
  /^(20[2-9]{1}[2-9]{1}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}T[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1})$/;
// "hh:mm"
const endPattern = /^([0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1})$/;

const getTimestamp = (dt) => new Date(dt).getTime();

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const titleInput = titleInputEl.value.trim();
  if (!titleInput || titleInput.length < 2 || titleInput.length > 80) {
    titleInputEl.focus();
    return false;
  }
  const startInput = startInputEl.value;
  if (!startInput || !startPattern.test(startInput)) {
    startInputEl.focus();
    return false;
  }
  const endInput = endInputEl.value;
  if (!endInput || !endPattern.test(endInput)) {
    endInputEl.focus();
    return false;
  }
  const locationInput = locationInputEl.value.trim();
  if (locationInput.length < 2 || locationInput.length > 140) {
    locationInputEl.focus();
    return false;
  }
  const descriptionInput = descriptionInputEl.value.trim();
  if (descriptionInput.length < 2 || descriptionInput.length > 800) {
    descriptionInputEl.focus();
    return false;
  }
  const linkInput = linkInputEl.value;
  if (
    linkInput &&
    linkInput.length > 0 &&
    (linkInput.length > 150 || !urlPattern.test(linkInput))
  ) {
    linkInputEl.focus();
    return false;
  }
  const emailInput = emailInputEl.value;
  if (
    emailInput &&
    emailInput.length > 0 &&
    (emailInput.length > 150 || !emailPattern.test(emailInput))
  ) {
    emailInput.focus();
    return false;
  }
  const start = getTimestamp(startInput);
  //
  // const startUTC = getUTC(startInput);
  let end = getTimestamp(`${startInput.slice(0, 11)}${endInput}`);
  const diff = end - start;
  if (diff < 0) {
    end += 86400000; // 24 hours in ms
  }
  // const endUTC = getUTC(end);
  // const datetime = getLocaleDateTime(start, end);
  const eventInfo = {
    title: titleInput,
    start,
    end,
    location: locationInput,
    description: descriptionInput,
  };
  if (linkInput) {
    eventInfo.link = linkInput;
  }
  if (emailInput) {
    eventInfo.email = emailInput;
  }
  console.log("eventInfo:", eventInfo);
  const res = await fetch("https://invite-info.web.app/api/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: { eventInfo },
  });
  const { info } = await res.json();
  console.log("info:", info);
  window.localStorage.setItem(info.id, JSON.stringify(info));
  window.location.href = `https://invite-info.web.app/event/?i=${info.id}`;
  return false;
});
