exports.isEmpty = (value) => {
  const val = value === undefined
        || value === null
        || (typeof value === 'object' && Object.keys(value).length === 0)
        || (typeof value === 'string' && value.trim().length === 0);

  return val;
};

exports.compareNumbers = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

exports.uniqueArray = (array, key) => {
  const uniqueItems = array.filter((obj, pos, arr) => {
    const items = arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos;
    return items;
  });
  return uniqueItems;
};
