  const digits = {
    "0": ["2:0", "2:8", "0:2", "1:8", "3:8", "0:1", "1:0", "3:0", "4:1", "4:2", "4:3", "4:4", "4:5", "4:6", "4:7", "0:3", "0:4", "0:5", "0:6", "0:7"],
    "1": ["2:0", "2:1", "2:2", "2:3", "2:4", "2:5", "2:6", "2:7", "2:8", "0:2", "1:1", "0:8", "1:8", "3:8", "4:8"],
    "2": ["2:0", "2:8", "1:8", "3:8", "0:1", "1:0", "3:0", "4:1", "4:2", "4:3", "4:4", "0:8", "4:8", "1:7", "2:6", "3:5"],
    "3": ["2:0", "2:8", "1:8", "3:8", "1:0", "3:0", "0:0", "4:0", "0:7", "4:7", "4:5", "4:6", "0:4", "1:4", "2:4", "3:4", "3:1", "2:2", "1:3"],
    "4": ["4:7", "4:5", "4:6", "1:4", "2:4", "3:4", "0:4", "4:4", "4:8", "4:3", "4:2", "4:1", "4:0", "0:3", "0:2", "0:1", "0:0"],
    "5": ["4:7", "4:5", "4:6", "4:0", "0:3", "0:2", "0:1", "0:0", "1:0", "2:0", "3:0", "2:8", "3:8", "1:8", "0:7", "3:4", "2:4", "1:4", "0:4"],
    "6": ["4:7", "4:5", "4:6", "0:3", "0:2", "0:1", "1:0", "2:0", "3:0", "2:8", "3:8", "1:8", "0:7", "3:4", "2:4", "1:4", "0:4", "0:5", "0:6", "4:1"],
    "7": ["1:0", "2:0", "3:0", "4:1", "0:0", "4:0", "4:2", "3:3", "2:4", "1:5", "0:6", "0:7", "0:8"],
    "8": ["1:0", "2:0", "3:0", "4:1", "4:2", "0:6", "0:7", "1:8", "2:8", "3:8", "4:7", "4:6", "4:5", "3:4", "2:4", "1:4", "0:5", "0:3", "0:2", "0:1", "4:3"],
    "9": ["1:0", "2:0", "3:0", "4:1", "4:2", "0:7", "1:8", "2:8", "3:8", "4:7", "4:6", "4:5", "3:4", "2:4", "1:4", "0:3", "0:2", "0:1", "4:3", "4:4"],
  }

const selectorTimezone = document.querySelector("#selectorTimezone")
const addTimezone = document.querySelector("#plus")
const delTimezone = document.querySelector("#minus")
// Temporal.Now.zonedDateTimeISO(tz);
let addedTimezones = []
const timezones = Intl.supportedValuesOf("timeZone");
console.log(Temporal.Now.zonedDateTimeISO(timezones[0]))


timezones.forEach(item => {
  // console.log(item)
  const optionHTML = document.createElement("option")
  optionHTML.value = Temporal.Now.zonedDateTimeISO(item);
  optionHTML.textContent = item
  selectorTimezone.appendChild(optionHTML)
  // console.log(Temporal.Now.zonedDateTimeISO(item))
})


const timezoneContainer = document.querySelector("#timezoneContainer")

function createTable(a, b, number) {
  const cells = digits[number]
  let str = "<table>";
  for (let i = 0; i < a; i++){
    str = str + "<tr>"
    for (let j = 0; j < b; j++){
      if (cells.includes(`${j}:${i}`)) {
        str = str + `<td class="marked" data-i=${i} data-j=${j} ></td>`
      }else {
        str = str + `<td data-i=${i} data-j=${j} ></td>`
      }
    }
    str = str + '</tr>'
  }
  str = str + "</table>"

  return str

}

// console.log(createTable(3,4, 2))
addTimezone.addEventListener('click', () => {
  // console.log(Temporal.Now.zonedDateTimeISO(selectorTimezone.value).hour)
  if (addedTimezones.includes(selectorTimezone.value)){
    return
  }
  let str = createTable(9,5, Math.floor(Temporal.Now.zonedDateTimeISO(selectorTimezone.value).hour / 10))
  str += createTable(9,5, Temporal.Now.zonedDateTimeISO(selectorTimezone.value).hour %10)
  str += createTable(9,5, Math.floor(Temporal.Now.zonedDateTimeISO(selectorTimezone.value).minute / 10))
  str += createTable(9,5, Temporal.Now.zonedDateTimeISO(selectorTimezone.value).minute %10)
  str += createTable(9,5, Math.floor(Temporal.Now.zonedDateTimeISO(selectorTimezone.value).second / 10))
  str += createTable(9,5, Temporal.Now.zonedDateTimeISO(selectorTimezone.value).second %10)
  
  
  const smallContainer = document.createElement("section")
  smallContainer.id = `${selectorTimezone.value}`
  smallContainer.innerHTML = str
  timezoneContainer.appendChild(smallContainer)
  addedTimezones.push(selectorTimezone.value)
})

delTimezone.addEventListener('click', () => {
  if (!addedTimezones.includes(selectorTimezone.value)){
    return
  }
  document.getElementById(`${selectorTimezone.value}`)?.remove()
 addedTimezones = addedTimezones.filter(x => x !== selectorTimezone.value)
 console.log(addedTimezones)
})