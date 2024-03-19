const checkLength = (charset = ' ', maxLength = 1) => charset.length <= maxLength;

checkLength ();


// const isPalindrome = (string) => {

//   string = string.replaceAll(' ', '').toLowerCase();

//   let reversed = '';

//   for(let i = string.length - 1; i >= 0; i--) {
//     reversed += string[i];
//   }

//   return string === reversed;
// };

// isPalindrome ();
