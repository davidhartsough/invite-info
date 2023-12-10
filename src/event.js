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

// EXAMPLE

https://calendar.google.com/calendar/render?text=Inspection:+4/21+Querrin+Street,+Yeronga,+4104&dates=20231211T054500Z%2F20231211T060000Z&details=Property+Price:+$510+per+week%0ABedrooms:+2%0ABathrooms:+2%0AParking+Spaces:+1%0A%0AView+Details:+https://www.realestate.com.au/438200008%0A%0Arealestate.com.au+recommends+confirming+the+Open+for+Inspection+Times+with+the+Agent,+to+ensure+they+have+not+changed.%0A&location=4/21%20Querrin%20Street,%20Yeronga,%204104&action=TEMPLATE

`/r/n`

data:text/calendar;charset=utf-8,BEGIN%3AVCALENDAR%0D%0AVERSION%3A2.0%0D%0APRODID%3A%2F%2Frealestate.com.au%0D%0ABEGIN%3AVEVENT%0D%0AUID%3Affb50930-1b44-48e8-870a-e750876a5859%0D%0ADTSTAMP%3A20231207T233204Z%0D%0ASUMMARY%3AInspection%3A%204%2F21%20Querrin%20Street%5C%2C%20Yeronga%5C%2C%204104%0D%0ADESCRIPTION%3AProperty%20Price%3A%20%24510%20per%20week%5CnBedrooms%3A%202%5CnBathrooms%3A%202%5CnParki%0D%0A%20ng%20Spaces%3A%201%5Cn%5CnView%20Details%3A%20https%3A%2F%2Fwww.realestate.com.au%2F438200008%5Cn%5Cnr%0D%0A%20ealestate.com.au%20recommends%20confirming%20the%20Open%20for%20Inspection%20Times%20with%20%0D%0A%20the%20Agent%5C%2C%20to%20ensure%20they%20have%20not%20changed.%5Cn%0D%0ALOCATION%3A4%2F21%20Querrin%20Street%5C%2C%20Yeronga%5C%2C%204104%0D%0ADTSTART%3A20231211T054500Z%0D%0ADTEND%3A20231211T060000Z%0D%0AEND%3AVEVENT%0D%0AEND%3AVCALENDAR%0D%0A

BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTAMP:20231207T233204Z
SUMMARY:Inspection
DESCRIPTION:Property
LOCATION:Querrin Street
DTSTART:20231211T054500Z
DTEND:20231211T060000Z
END:VEVENT
END:VCALENDAR

// escape characters: \ ; , 
function icsEscape(str, newlines = false) {
  return str
    .replaceAll("\n", newlines ? "\n" : "")
    .replace(/[\\;:,"]/g, (c) => `\\${c}`);
}

function icsFileDataURL(title, location, description, startUTC, endUTC) {
  const icsData = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTAMP:${startUTC.slice(0, 8)}T000001Z
SUMMARY:${icsEscape(title)}
LOCATION:${icsEscape(location)}
DESCRIPTION:${icsEscape(description, true)}
DTSTART:${startUTC}
DTEND:${endUTC}
END:VEVENT
END:VCALENDAR`;
  return `data:text/calendar;charset=UTF-8,${encodeURIComponent(icsData)}`;
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

const baseURL = "https://invite-info.web.app/";
const getURL = (id) => `${baseURL}event/?i=${id}`;

function setDateTime(start, end) {
  const startDT = new Date(start).toLocaleString(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  });
  const endDT = new Date(end).toLocaleString(undefined, { timeStyle: "short" });
  datetimeP.textContent = `${startDT} - ${endDT}`;
}

function render({
  id,
  title,
  location,
  description,
  start,
  end,
  link,
  email,
  gCalLink,
  icsLink,
}) {
  const metaTitle = `"${title}" | Invite•Info`;
  const metaDescription = `"${title}": event information`;
  document.title = metaTitle;
  metaDescEl.setAttribute("content", metaDescription);
  ogTitleEl.setAttribute("content", metaTitle);
  ogDescEl.setAttribute("content", metaDescription);
  ogUrlEl.setAttribute("content", getURL(id));
  twitterDescEl.setAttribute("content", metaDescription);
  titleH1.textContent = title;
  setDateTime(start, end);
  locationP.textContent = location;
  descriptionP.textContent = description;
  if (link) {
    linkA.textContent = link;
    linkA.href = link;
  } else {
    websiteDiv.style.display = "none";
  }
  if (email) {
    emailA.textContent = email;
    emailA.href = `mailto:${email}`;
  } else {
    contactDiv.style.display = "none";
  }
  googleCalLink.href = gCalLink;
  appleCalLink.href = icsLink;
}

async function getInfo(id) {
  const res = await fetch(`${baseURL}api/info?id=${id}`);
  const { info } = await res.json();
  console.log("info:", info);
  window.localStorage.setItem(id, JSON.stringify(info));
  render(info);
}

const { searchParams } = new URL(window.location.href);
const id = searchParams.get("i");
if (id && id.length > 2) {
  const backup = window.localStorage.getItem(id);
  if (backup) {
    const info = JSON.parse(backup);
    render(info);
  } else {
    getInfo(id);
  }
} else {
  window.location.replace(baseURL);
}
