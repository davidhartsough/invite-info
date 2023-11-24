import generateId from "../utils/id";

export default function create() {
  const eventInfo = {
    title: "",
    datetime: "",
    start: 1,
    end: 1,
    startUTC: "",
    endUTC: "",
    location: "",
    description: "",
    link: "",
    email: "",
  };
  const title = "Wooo! Some event!";
  const id = generateId(title);
}
