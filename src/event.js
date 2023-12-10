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
