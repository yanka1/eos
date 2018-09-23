// import { BetGame } from './betModule'
const BetGame  = require('./betModule').BetGame

let BetGameIns = new BetGame()



/*
* maxResetTime：      脚本执行次数
* maxBet：            预存最大脚本金额
* maxSingleLoopTime： 单论循环最大次数
* maxMultiple:        目标最大倍数
* betBaseNum：        投注基准
* betBasePoint：      投注点数
*/

function winChaseLoseLose(maxResetTime, maxBet, maxMultiple, betBaseNum, betBasePoint ) {
  // counter
  let originMaxBet = maxBet
  // 总调用次数
  let betCounter = 0
  // 总利润
  // let maxBet = 0
  // 总成本
  let totalBet = 0
  // 当前最大轮数
  let maxResetCounter = 0
  // 100次循环的计数
  // 翻倍循环的计数
  let maxMultipleCounter = 0

  function loop(betNum, point) {
    // 达到最大次数停止
    if(maxResetCounter >= maxResetTime) {
      console.log('this.isEnd, where meet 最大次数!')
      return
    }
    // 最大达到最大倍数停止
    if(maxMultipleCounter > maxMultiple){
      console.log(betNum)
      console.log('this.isEnd, where meet 最大倍数!')
      return
    }
    // betNum大于现有额度停止
    if(betNum> maxBet) {
      console.log('betNum,maxBet',betNum,maxBet)
      return
    }
    if(maxBet> originMaxBet*1.5) {
      console.log('this.isEnd, where meet 预期收益!')
      return
    }
    // 总投入
    totalBet+=betNum
    // 现有资产减去bet
    maxBet-=betNum
    // challenge
    let res = BetGameIns.challenge(betNum, point)
    // bet次数
    betCounter++
    // 最大次数基数器
    maxResetCounter++
    // 计算总利益
    maxBet+=res.payback
    console.log(betNum,'betNum', maxBet)

    // 判断重置行为
    if (res.payback>0) {
      maxMultipleCounter++
      loop(betNum*2, betBasePoint)
    } else {
      maxMultipleCounter = 0
      loop(betBaseNum, betBasePoint)
    }
  }
  loop(betBaseNum, betBasePoint)
  return {
    //  totalProfit,
    // 总利润
     maxBet,
    // 总成本
    totalBet,
    betCounter
  }
}

// 
let totalProfit = []
let totalBet = 0
let maxBet = 0
let betCounter = 0
for( let i=0; i<10; i++) {
  if(i ===0) {
    let a =  winChaseLoseLose(100 ,2000, 8, 1,50)
    totalProfit.push(a)
  }else {
    let b =  winChaseLoseLose( 100,totalProfit[totalProfit.length-1].maxBet, 8, 1,50)
    totalProfit.push(b)
  }
}
totalProfit.forEach((profit) => {
  totalBet+=profit.totalBet
  // maxBet+=profit.maxBet
  betCounter+=profit.betCounter
})
console.log(totalProfit)
console.log(totalBet)
console.log(betCounter)
console.log(totalProfit[totalProfit.length-1].maxBet-2000,'本次收益')
