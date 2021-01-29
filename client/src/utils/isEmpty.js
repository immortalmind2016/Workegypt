export default data => {
  if (typeof data === "string" && data.trim() === "") return true;
  if (data === "undefined" || data === null) return true;
  if (
    typeof data === "object" &&
    (Object.keys(data).length === 0 || data === [])
  )
    return true;
  else return false;
};
