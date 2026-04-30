// let array = [1, 2, 3, 4, 5, 6];
// let [first, second, third, fourth, fiftth ] = array;
// console.log(fourth);

// let obj = {
//     name: "priyanka",
//     course: "BCA",
//     rollno: 30
// }
// let {name, course, rollno} = obj
// console.log(course)

// let arr = [1, [4, 2]];
// let [first,[second, third]] = arr
// console.log(second);


// let student = {
//   name: "Priyanka",
//   address: {
//     city: "Shimla",
//     state: "HP"
//   }
// };

// let {
//  name, address: { city, state }
// } = student;

// console.log(name);  // Shimla
// console.log(state); // HP


// let str = [1]
// console.log(str)


// let arr = [2, 3, 4, 5];
// let p = arr.map((n)=> n*n)
// console.log(p)

// let str = ["priyanka", "rahul", "simran"];
// let p = str.map((n) => n.toUpperCase())
// console.log(p)

// let a = [1000, 2000, 3000];
// let p = a.map((n) => n+100)
// console.log(p)

// // Convert array of numbers into strings:
// let a = [1, 2, 3, 4];
// let p = a.map((n) => n = n.toString())
// console.log(p)

// let a = [
//   { name: "priya", age: 20 },
//   { name: "Bhumi", age: 21 }
// ]



async function generate() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");
  const feature = document.getElementById("feature");

 
  const inputText = input.value.trim();

  if (!inputText) {
    output.innerText = "Please enter something...";
    return;
  }

  output.innerText = "Generating... 🤖";

 
  let prompt = "";

  if (feature.value === "ask") {
    prompt = `Answer this question simply: ${inputText}`;
  } 
  else if (feature.value === "summarize") {
    prompt = `Summarize this text in simple words: ${inputText}`;
  } 
  else if (feature.value === "idea") {
    prompt = `Give creative ideas for: ${inputText}`;
  } 
  else if (feature.value === "define") {
    prompt = `Define this in simple language: ${inputText}`;
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=your api key " ,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    output.innerText = text || "No response from AI 😢";

  } catch (error) {
    output.innerText = "Error: " + error.message;
  }
}
