// GET request by default
//export const UserData = await fetch('https://healthtrackerwebappserver20231215171355.azurewebsites.net/api/food').catch(error => console.error('Error (Data.js: GET Request):', error.message))

export const UserData = [
    {
      id: 1,
      category: "Fat",
      count: 100
    },
    {
      id: 2,
      category: "Carbs",
      count: 600
    },
    {
      id: 3,
      category: "Protein",
      count: 100
    },
    {
      id: 4,
      category: "Calories",
      count: 2300
    },
];