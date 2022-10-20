// export const convertDateToInputValue = (date) => {
//   date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
//   return date.toJSON().slice(0, 10);
// };

// const camelToSnake = (str) => {
//   if (str === str.toLowerCase()) return str;
//   else return str.replace(/[A-Z]/g, (m) => "_" + m.toLowerCase());
// };

// const snakeToCamel = (str) => {
//   if (!str.includes("_")) return str;
//   else return str.replace(/_./g, (x) => x[1].toUpperCase());
// };


// export const camelToSnakeObj = (obj) => {
//   const newObj = {};
//   for (let key in obj) {
//     newObj[camelToSnake(key)] = obj[key];
//   }
//   return newObj;
// };

// export const snakeToCamelObj = (obj) => {
//   const newObj = {};
//   for (let key in obj) {
//     newObj[snakeToCamel(key)] = obj[key];
//   }
//   return newObj;
// };
