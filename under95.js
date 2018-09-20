function betModule() {
  let suc = true
let count = 0

// neilv counter
let docubleSuc = false
let docubleCounter = 0

let preA50 = null
let durCount = 0
let totalA50 = []
let totalInc = []
let lastTimeOnInc = 1

// 
let diceCountU50 = 0
let totalDice = 0

for ( let i = 0;i<100;i++) {
  let dice = parseInt(Math.random()*101)
  // 判断小于96的次数
  if ( dice<96) {
    count++
  }
  // 判断次数每次大于10的次数
  if(dice>49) {
    if(preA50 === null) {
      preA50 = true
    }
    if(preA50 ===true) {
      durCount++
    }
  }else {
    diceCountU50++
    if (durCount) {
    if(durCount===totalInc[totalInc.length-1]+1) {
      totalInc.pop()
    }
      totalInc.push(durCount)
    }
    if(durCount>11) {
      totalA50.push(durCount)
    }
    durCount = 0
  }
  //
  if (i === 99) {
    console.log('最后一次当前循环次数',durCount )
  } 
}

// console.log('连续100次测试')
// console.log(diceCountU50, '低于50的出现次数')
// console.log(count, '低于96的出现次数')
// console.log(totalA50.length, '连续11次大于49的数组')

// let newtotalInc = totalInc.filter((item) => item<3)
// console.log(totalInc.filter((item) => item===1).length, '倍增小于2的次数')
// console.log(totalInc.filter((item) => item===2).length, '倍增小于3的次数')
// console.log(totalInc.filter((item) => item===3).length, '倍增小于4的次数')
// console.log(totalInc.filter((item) => item===4).length, '倍增小于5的次数')
// console.log(totalInc.filter((item) => item===5).length, '倍增小于6的次数')
// console.log(totalInc.filter((item) => item===6).length, '倍增小于7的次数')
console.log(totalInc.filter((item) => item===7).length, '倍增小于8的次数')
// console.log(totalInc.filter((item) => item===8).length, '倍增小于9的次数')
// console.log(totalInc.filter((item) => item===9).length, '倍增小于10的次数')
// console.log(totalInc.filter((item) => item===10).length, '倍增小于11的次数')
// console.log(totalInc.filter((item) => item===11).length, '倍增小于12的次数')
// console.log(totalInc.filter((item) => item===12).length, '倍增小于13的次数')
// console.log(totalInc.filter((item) => item===13).length, '倍增小于14的次数')
}

for ( let i = 0;i<100;i++) {
  betModule()
}