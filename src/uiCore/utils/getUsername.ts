const getUsername = (str: string) => {
  return str
    .split(" ")
    .map((item) => item.toLowerCase())
    .join("");
};

export { getUsername };
