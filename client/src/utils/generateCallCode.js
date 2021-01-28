const generateRandomCode = (maxLength = 9) => {
  const alphabet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let constructedToken = "";
  for (let i = 0; i < maxLength; i++) {
    const randomIndex = parseInt(Math.floor(Math.random() * alphabet.length));
    constructedToken += alphabet[randomIndex];
  }
  return constructedToken;
};

export default generateRandomCode;
