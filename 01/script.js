const table = document.querySelector(".main")
const firstHours = document.querySelector(".first-hours")
const secondHours = document.querySelector(".second-hours")
const firstMin = document.querySelector(".first-min")
const secondMin = document.querySelector(".second-min")
const now = new Date()
const tables = [firstHours, secondHours, firstMin, secondMin];


const numbers = {
  0: [["8","1"],["8","3"],["8","2"],["7","4"],["6","4"],["5","4"],["4","4"],["2","4"],["3","4"],["1","4"],["0","3"],["0","2"],["0","1"],["1","0"],["2","0"],["3","0"],["4","0"],["5","0"],["6","0"],["7","0"]],
  1: [["2","0"] ,["1","1"],["0","2"],["1","2"],["2","2"],["3","2"],["4","2"],["5","2"],["6","2"],["7","2"],["8","0"],["8","1"],["8","2"],["8","3"], ["8","4"]],
  2: [["1","4"],["0","4"],["0","3"],["0","2"],["0","1"],["0","0"],["8","0"],["8","1"],["8","2"],["8","3"],["8","4"],["7","0"],["6","0"],["5","0"],["4","0"],["4","1"],["4","2"],["4","3"],["4","4"],["3","4"],["2","4"]],
  3: [["7","4"],["6","4"],["8","0"],["8","1"],["8","2"],["8","3"],["8","4"],["0","4"],["0","3"],["0","2"],["0","1"],["0","0"],["1","4"],["2","4"],["3","4"],["4","4"],["5","4"],["4","3"],["4","2"],["4","1"],["4","0"]],
  4: [["1","0"],["2","0"],["3","0"],["4","0"],["4","1"],["4","3"],["4","2"],["3","4"],["2","4"],["1","4"],["0","4"],["5","4"],["6","4"],["7","4"],["8","4"],["0","0"],["4","4"]],
  5: [["0","4"],["0","3"],["0","1"],["0","2"],["0","0"],["1","0"],["2","0"],["3","0"],["4","0"],["4","1"],["4","2"],["4","3"],["4","4"],["5","4"],["7","4"],["6","4"],["8","4"],["8","3"],["8","2"],["8","1"],["8","0"]],
  6: [["0","4"],["0","3"],["0","1"],["0","2"],["0","0"],["1","0"],["2","0"],["3","0"],["4","0"],["4","1"],["4","2"],["4","3"],["5","4"],["7","4"],["6","4"],["8","4"],["8","3"],["8","2"],["8","1"],["8","0"],["4","4"],["5","0"],["6","0"],["7","0"]],
  7: [["0","3"],["0","1"],["0","2"],["0","0"],["0","4"],["1","4"],["2","4"],["4","3"],["5","2"],["3","4"],["3","3"],["6","2"],["7","1"],["8","1"]],
  8: [["0","3"],["0","1"],["0","2"],["0","0"],["0","4"],["1","4"],["2","4"],["3","4"],["8","1"],["6","0"],["5","0"],["4","0"],["3","0"],["2","0"],["1","0"],["8","0"],["7","0"],["8","2"],["8","3"],["8","4"],["7","4"],["6","4"],["5","4"],["4","4"],["4","3"],["4","2"],["4","1"]],
  9: [["0","3"],["0","1"],["0","2"],["0","0"],["0","4"],["1","4"],["2","4"],["3","4"],["8","1"],["4","0"],["3","0"],["2","0"],["1","0"],["8","0"],["8","2"],["8","3"],["8","4"],["7","4"],["6","4"],["5","4"],["4","4"],["4","3"],["4","2"],["4","1"]]
}

function createTable(a, b) {
  let str = "<table>";
  for (let i = 0; i < a; i++){
    // <table><tr><td></td></tr></table>
    str = str + "<tr>"
    for (let j = 0; j < b; j++){
      str = str + `<td data-i=${i} data-j=${j} ></td>`
    }
    str = str + '</tr>'
  }
  str = str + "</table>"
  
  return str
  
}
function createClickableTable(el, width, height) {
  let array = [];
  let object = {};
  
  
  el.innerHTML = createTable(width, height)
  el.innerHTML += "<button>SAVE</button><input>"
  
  
  const btn = el.querySelector("button")
  const input = el.querySelector("input")
  btn.addEventListener("click", function (e) {
    object[input.value] = JSON.stringify(array)
    console.log(object)
  })
  el.addEventListener("click", function (e) {
    if (e.target.tagName.toLowerCase() != "td") {
      return
    }
    let q = e.target.dataset;
    let i = q.i;
    let j = q.j;
    if (!array.find(function (item) {
      return item[0] == i && item[1] == j
    })) {
      array.push([i, j])
      e.target.className = "marked"
    } else {
      e.target.className = "";
      array = array.filter(function (item) {
        return item[0] != i || item[1] != j
      })
    }
    console.log(JSON.stringify(array))
    
  }
)
}

function drawNumber(table, number) {
  const coords = numbers[number];
  if (!coords) {
    console.warn(`Нет данных для цифры ${number}`);
    return;
  }
  
  // проходим по всем координатам и подсвечиваем нужные ячейки
  coords.forEach(([i, j]) => {
    const td = table.querySelector(`td[data-i="${i}"][data-j="${j}"]`);
    if (td) {
      td.classList.add("marked");
    }
  });
}

function showTime() {
  if (now.getHours() < 10){
    drawNumber(firstHours, 0)
  }else {
    drawNumber(firstHours, Math.trunc(now.getHours() / 10))
  }
  drawNumber(secondHours, now.getHours()%10)
  if (now.getMinutes() < 10){
    drawNumber(firstMin, 0)
  }else {
    drawNumber(firstMin, Math.trunc(now.getMinutes() / 10))
  }
  drawNumber(secondMin, now.getMinutes()%10) 
}
for (const el of tables){
  createClickableTable(el, 9, 5)
}
showTime()