/*
const eventInfo = {
  title: "My Event Title",
  datetime: new Date().toLocaleString(),
  end: "6:00pm",
  location: "18 N Rainbow Rd, Princeton, IL 61356",
  description:
    "This is an event where you can wear hats. I will wear the best hat. Thank you. Please bring a hat and wear it.",
  link: "https://google.com/",
  email: "contact@gmail.com",
};

// google link
// isoDate.replace(/[^\w\s]/gi, '');

function getGCalLink() {
  // const url = new URL("https://calendar.google.com/calendar/event");
  // url.searchParams.set()
  // to use UTC timezone, convert datetime to UTC, then use Z suffix: 20201231T193000Z/20201231T223000Z
  const searchParams = new URLSearchParams({
    action: "TEMPLATE",
    dates: "20231120T030000Z/20231120T040000Z",
    text: "", // title
    location: "",
    details: "", // description
  });
  return `https://calendar.google.com/calendar/event?${searchParams.toString()}`;
}

// https://calendar.google.com/calendar/event?action=TEMPLATE&dates=20231119T030000Z%2F20231119T040000Z&text=Birthday&location=Northend&details=yeeeeaaahhhh

// https://calendar.google.com/calendar/render?action=TEMPLATE
// https://google.com/calendar/render?action=TEMPLATE&text=
// https://google.com/calendar/render?action=TEMPLATE&dates=20231119T030000Z%2F20231119T040000Z&text=[]&location=[]&details=[]

// https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20231119T030000Z%2F20231119T040000Z&text=Birthday&location=Northend&details=yeeeeaaahhhh

// https://calendar.google.com/calendar/r/eventedit?action=TEMPLATE&dates=20231119T030000Z%2F20231119T040000Z&text=Birthday&location=Northend&details=yeeeeaaahhhh

// apple ics data link to download
// `data:text/calendar;charset=UTF-8,
// encodeURIComponent()
// BEGIN:VCALENDAR ...

// BEGIN:VCALENDAR
// VERSION:2.0
// BEGIN:VEVENT
// SUMMARY:
// DESCRIPTION:
// LOCATION:
// DTSTART:
// DTEND:
// END:VEVENT
// END:VCALENDAR

function icsEscape(str) {
  return str.replace(/[\\;:,"]/g, (c) => `\\${c}`).replaceAll("\n", "\\n");
}

function icsFileDataURL(title, description, location, start, end) {
  const icsData = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTAMP:${start.slice(0, 8)}T000000Z
SUMMARY:${icsEscape(title)}
DESCRIPTION:${icsEscape(description)}
LOCATION:${icsEscape(location)}
DTSTART:${start}
DTEND:${end}
END:VEVENT
END:VCALENDAR`;
  return `data:text/calendar;charset=UTF-8,${encodeURIComponent(icsData)}`;
}

function getUTC(dt) {
  return `${new Date(dt)
    .toISOString()
    .slice(0, 16)
    .replaceAll("-", "")
    .replace(":", "")}00Z`;
}

todo
function getRecentTimestamp(dtStartNum) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = today.getTime() - dtStartNum;
  let dtms = dtStartNum;
  if (today.getTime() < dtStartNum) {
    // return new Date()
  }
}
*/

const getMetaEl = (q) => document.head.querySelector(`meta[${q}]`);
const metaDescEl = getMetaEl(`name="description"`);
const ogTitleEl = getMetaEl(`property="og:title"`);
const ogDescEl = getMetaEl(`property="og:description"`);
const ogUrlEl = getMetaEl(`property="og:url"`);
const twitterDescEl = getMetaEl(`name="twitter:description"`);

const getEl = (id) => document.getElementById(id);
const websiteDiv = getEl("website");
const contactDiv = getEl("contact");
const titleH1 = getEl("title");
const datetimeP = getEl("date-time");
const locationP = getEl("location");
const descriptionP = getEl("description");
const linkA = getEl("link");
const emailA = getEl("email");
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

googleCalLink.addEventListener("click", () => {
  unstickModal();
});

appleCalLink.addEventListener("click", () => {
  unstickModal();
});

const getURL = (id) => `https://invite-info.web.app/i/?event=${id}`;

function render(info) {
  const metaTitle = `"${info.title}" | Invite•Info`;
  const metaDescription = `"${info.title}": event information`;
  document.title = metaTitle;
  metaDescEl.setAttribute("content", metaDescription);
  ogTitleEl.setAttribute("content", metaTitle);
  ogDescEl.setAttribute("content", metaDescription);
  ogUrlEl.setAttribute("content", getURL(info.id));
  twitterDescEl.setAttribute("content", metaDescription);
  titleH1.textContent = info.title;
  datetimeP.textContent = info.datetime;
  locationP.textContent = info.location;
  descriptionP.textContent = info.description;
  if (info.link) {
    linkA.textContent = info.link;
    linkA.href = info.link;
  } else {
    websiteDiv.style.display = "none";
  }
  if (info.email) {
    emailA.textContent = info.email;
    emailA.href = `mailto:${info.email}`;
  } else {
    contactDiv.style.display = "none";
  }
  googleCalLink.href = info.gCalLink;
  const ics = encodeURIComponent(info.icsData);
  appleCalLink.href = `data:text/calendar;charset=UTF-8,${ics}`;
}

const { searchParams } = new URL(window.location.href);
const id = searchParams.get("event");
const backup = window.localStorage.getItem(id);
if (backup) {
  const info = JSON.parse(backup);
  render(info);
} else {
  fetch(`https://invite-info.web.app/api/info?event=${id}`).then((info) => {
    window.localStorage.setItem(id, JSON.stringify(info));
    render(info);
  });
}
