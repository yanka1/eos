// import { BetGame } from './betModule'
const BetGame  = require('./betModule').BetGame

let BetGameIns = new BetGame()
// BetGameIns.challenge(0.1, 50).then((res)=> {
//   console.log(res)
// })


// let totalProfit = []
// for(let i=0; i<10000; i++) {
//   BetGameIns.challenge(0.1, 50).then((res)=> {
//     console.log(res)
//     if(res.code === 0){
//       totalProfit.push(res)
//     }
//   })
// }

// setTimeout(()=> {
//   let totalProfitNum = 0
//   totalProfit.forEach((profit) => {
//     totalProfitNum+=profit.payback
//   })
//   totalProfitNum-=totalProfit.length
//   console.log('成功返回次数', totalProfit.length)
//   console.log('总利润：', totalProfitNum)
// }, 1)




function script1(maxTime,bigLoopMax,doubleLoopMax  ) {
  // init state
  // let maxTime = maxTime||1000
  // let bigLoopMax = bigLoopMax||100
  // let doubleLoopMax = doubleLoopMax||5


  // counter
 
  // 总返回数据
  let totalProfit = []
  // 总利润
  let totalProfitNum = 0
  // 总成本
  let totalBet = 0
  // 当前最大轮数
  let maxCounter = 0
  // 100次循环的计数
  let bigCounter = 0
  // 翻倍循环的计数
  let doubleCounter = 0

  function loop(betNum, point) {
    if(maxCounter>= maxTime) {
      // console.log('done for '+maxTime)
      // console.log('totalProfit : '+(totalProfitNum - totalBet))
      return 
    }
    maxCounter++
    console.log(betNum)
    totalBet+=betNum
    let res = BetGameIns.challenge(betNum, point)
      // 计算总利益
    totalProfitNum+=res.payback
    totalProfit.push(res)
    // 判断重置行为
    if(bigCounter === bigLoopMax || doubleCounter === doubleLoopMax){
      console.log('1')
      bigCounter = 0
      doubleCounter =0
      loop(0.1, 50)
    } else {
      console.log('2')
        bigCounter ++
        loop(doubleCounter*2+1, 50)
        doubleCounter ++
      // 当翻倍数达到可承受上限 return
      // if(doubleCounter <doubleLoopMax) {
      //   console.log('2')
      //   bigCounter ++
      //   doubleCounter = 0
      //   loop(doubleCounter*2+1, 50)
      // }else {
      //   console.log('3')
      //   bigCounter ++
      //   loop(doubleCounter*2+1, 50)
      //   doubleCounter ++
      // }
    }
  }
  loop(0.1, 50)
  console.log(
    // 总利润
     totalProfitNum,
    // 总成本
    totalBet)
  return {
     totalProfit,
    // 总利润
     totalProfitNum,
    // 总成本
    totalBet,
  }
}

// 
let totalProfit = []
let totalBet = 0
let totalProfitNum = 0
for( let i=1; i<100; i++) {
 let a =  script1(1000, 100, 5)
 totalProfit.push(a)
}
totalProfit.forEach((profit) => {
  totalBet+=profit.totalBet
  totalProfitNum+=(profit.totalProfitNum-profit.totalBet)
})
console.log(totalBet)
console.log(totalProfitNum)
