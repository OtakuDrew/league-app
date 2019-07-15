summonerValidator = name => {
  const lowercase = name.toLowerCase();
  const check = /^[a-zA-Z1-9]+$/;
  if (lowercase.match(check) || lowercase.length === 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  summonerValidator
};
