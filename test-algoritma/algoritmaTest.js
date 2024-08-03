// soal ke 1
// Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan
// angka tetap diakhir kata Hasil = "EIGEN1"

function ReverseAlphabet(str) {
  let letters = "";
  let digits = "";

  for (const char of str) {
    if (isNaN(char)) {
      letters += char;
    } else {
      digits += char;
    }
  }

  let reversedLetters = letters.split("").reverse().join("");
  return reversedLetters + digits;
}
const result = ReverseAlphabet("NEGIE1");
console.log(result); // Output: "EIGEN1"

// soal ke 2
// Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang
// dari kalimat tersebut,
// jika ada kata dengan panjang yang sama silahkan ambil salah satu
function LongestWords(str) {
  const words = str.split(" ");
  let longestWord = words[0];

  for (const word of words) {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  }

  return longestWord;
}

const words = "Saya sangat senang mengerjakan soal algoritma";
const longestWord = LongestWords(words);
console.log(
  `kata terpanjang adalah: "${longestWord}", panjang dari kata tsb: ${longestWord.length} karakter`
);

// soal ke 3
// Terdapat dua buah array yaitu array INPUT dan array QUERY,
// silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT

function countArrOfStr(input, query) {
  return query.map((q) => input.filter((i) => i === q).length);
}

const INPUT = ["xc", "dz", "bbb", "dzzzz"];
const QUERY = ["bbb", "ac", "dz"];

const output = countArrOfStr(INPUT, QUERY);
console.log(output);
