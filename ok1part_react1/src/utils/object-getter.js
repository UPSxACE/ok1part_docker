export default function objectGetter() {
  var current = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    if (current[arguments[i]]) {
      current = current[arguments[i]];
    } else {
      return null;
    }
  }
  return current;
}

// Example of usage:
// const obj = {
// 	"ai": {
//   	"ui": {
//     	"ei": {
//       	"name": "Eduardo"
//       }
//     }
//   }
// }

// const test = "ai.ui.ei.name";
// const arr = test.split('.');

// console.log(getter(obj, ...arr))
