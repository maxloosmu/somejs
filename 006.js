let myList = [[1,2], [3,4]];
myList.a = "c";
myList.b = "d";
for (let [x,y] of myList) {
  console.log(x, y);
}
for (let j=0; j<myList.length; j++) {
  console.log(myList[j]);
}
for (let x in myList) {
 console.log(x, myList[x]);
}

let i=2;
while (i > 0) {
  console.log(i);
  i--;
}
i=2;
do {
  console.log(i);
  i--;
} while (i > 0);
