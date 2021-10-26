// https://sebhastian.com/list-comprehension-javascript/

let pets = ["cat", "bird", "fish", "dog"];
let petsWithD = pets.filter(function(eachPet) {
  return eachPet.includes("d");
});
console.log(petsWithD);

let morePets = petsWithD.map(function (eachPet) {
  return eachPet + "s";
});
console.log(morePets);


