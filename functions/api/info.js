/*
function sanitizeStr(str) {
  return encodeURIComponent(str).replace(
    /[^a-z0-9-]/gi,
    (c) => `%${c.charCodeAt(0).toString(16)}`,
  );
}

function icsEscape(str) {
  return str.replace(/[\\;:,"]/g, (c) => `\\${c}`).replaceAll("\n", "\\n");
}

function getGCalLink() {
  const searchParams = new URLSearchParams({
    action: "TEMPLATE",
    dates: "20231120T030000Z/20231120T040000Z",
    text: "", // title
    location: "",
    details: "", // description
  });
  return `https://calendar.google.com/calendar/event?${searchParams.toString()}`;
}

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
*/

export default function event() {
  return {
    title: "",
    datetime: "",
    location: "",
    description: "",
    link: "",
    email: "",
    icsData: "",
    gCalLink: "",
  };
}
