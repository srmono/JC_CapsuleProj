// // //crud operations

// // console.log("hello")
// // let divEl = document.createElement("div");

// // document.body.appendChild(divEl);

// // divEl.setAttribute("id", "box")

// // let textNode = document.createTextNode("content");

// // divEl.appendChild(textNode)

// // let skills = ["html", "css"]

// // divEl.innerHTML = "<ul><li>"+ skills[0] +"</li> <li>"+ skills[1] +"</li></ul>"

// // //divEl.remove()


// // Events dom+js


// // let btn = document.getElementById("btn");

// // btn.onclick = function(){
// //     alert("hello")
// // }

// ///event binding 

// var pEl = document.getElementById("parent")
// var cel = document.getElementById("child")
// var anc = document.getElementById("inc")

// anc.addEventListener('click', function(e){
//     e.preventDefault()
//     console.log("i am an anchor element")
// })

// //event handlers
// function pevent(e){
//     //console.log(e.target)// where event 
//     console.log(e.currentTarget) //where event attached 
//     console.log("parent event")
// }

// function cevent(e){
//     console.log("child event")
//     e.stopPropagation();
// }

// function childEvent(e){
//     if(true){
//         e.stopImmediatePropagation()
//     }
//     console.log("second event")
// }

// function childEvent2(){
//     console.log("third event")
// }

// //default one is bubbling phase

// pEl.addEventListener('click', pevent)

// // cel.addEventListener('click', cevent)
// // cel.addEventListener('click', childEvent)
// // cel.addEventListener('click', childEvent2)



function myfunction(){
    //console.log("function info")
    return 100;
}

var myfunction1 = (x,y) =>  x*2

myfunction1(10)

const person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue"
  };
  
  // Destructuring Assignment
  let { firstName, age } = person;
  

