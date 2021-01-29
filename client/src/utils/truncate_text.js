export default (text, maxSize = 30) => {
  if (text.length > maxSize) {
    let truncated_text = text;
    truncated_text = truncated_text.substr(0, maxSize);
    truncated_text = truncated_text + "...";
    return truncated_text;
  }

  return text;
};
