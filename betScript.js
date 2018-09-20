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
//   let maxBet = 0
//   totalProfit.forEach((profit) => {
//     maxBet+=profit.payback
//   })
//   maxBet-=totalProfit.length
//   console.log('成功返回次数', totalProfit.length)
//   console.log('总利润：', maxBet)
// }, 1)


/*
* maxResetTime: 期望脚本最大重置游戏次数
* maxSingleLoopTime：期望游戏每轮最多调用次数
* maxMultiple：预计采用倍投策略，最多支持几
* betBaseNum: 预计初始 投注金额
*/ 

function getNum(n){
	if(n<=1){
		return n
	}else{
		let num = null;
		let m = n
		while(m >=1)
		{
			num += getNum(m-1)
			m--
		}
		return num+n
	}
}


/*
* maxResetTime：      脚本重置次数
* maxBet：            预存最大脚本金额
* maxSingleLoopTime： 单论循环最大次数
* maxMultiple:        最大倍数 策略范围，能接受最大倍数
* betBaseNum：        投注基准
* betBasePoint：      投注点数
*/

function script1(maxResetTime, maxBet, maxSingleLoopTime, maxMultiple, betBaseNum, betBasePoint ) {
  // counter
 
  // 总调用次数
  let betCounter = 0
  // 总利润
  // let maxBet = 0
  // 总成本
  let totalBet = 0
  // 当前最大轮数
  let maxResetCounter = 0
  // 100次循环的计数
  let maxSingleLoopTimeCounter = 0
  // 翻倍循环的计数
  let maxMultipleCounter = 0

  function loop(betNum, point) {
    if(maxResetCounter >= maxResetTime) {
      // console.log('done for '+maxResetTime)
      // console.log('totalProfit : '+(maxBet - totalBet))
      return
    }
    if(betNum> maxBet) {
      console.log('betNum,maxBet',betNum,maxBet)
      return
    }
    // if(totalBet >= maxBet*1.5) {
    //   // console.log('done for '+maxResetTime)
    //   // console.log('totalProfit : '+(maxBet - totalBet))
    //   console.log('*1.5')
    //   return
    // }

    totalBet+=betNum
    // 
    maxBet-=betNum
    let res = BetGameIns.challenge(betNum, point)
    betCounter++
    // 计算总利益
    maxBet+=res.payback
    console.log(betNum,'betNum', maxBet)

    // totalProfit.push(res)
    
    // 判断重置行为
    if(maxSingleLoopTimeCounter === maxSingleLoopTime || maxMultipleCounter === maxMultiple){
      maxResetCounter++
      if(maxSingleLoopTimeCounter === maxSingleLoopTime) {console.log('\u001b[31m 达到单论最大值 \u001b[39m')}
      if(maxMultipleCounter === maxMultiple) {console.log('\u001b[31m 最大倍数 \u001b[39m')}

      // console.log(maxSingleLoopTimeCounter, maxMultipleCounter)
      maxSingleLoopTimeCounter = 0
      maxMultipleCounter =0
      loop(betBaseNum, betBasePoint)
    } else {
      if (maxMultipleCounter > 0 && res.payback>0) {
        // console.log('\u001b[32m上次失败，本次成功 \u001b[36m')
        maxSingleLoopTimeCounter = 0
        maxMultipleCounter =0
        loop(betBaseNum, betBasePoint)
      } else {
        // console.log('\u001b[35m 一直赢 \u001b[36m')
        maxSingleLoopTimeCounter++
        let oldmaxMultipleCounter = maxMultipleCounter
        maxMultipleCounter++
        // maxMultipleCounter
        let newNumber = (getNum(oldmaxMultipleCounter+1)*betBaseNum)
        loop(newNumber, betBasePoint)
      }
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
for( let i=0; i<1; i++) {
 let a =  script1(8 ,2000, 100, 2, 1,80)
 totalProfit.push(a)
}
totalProfit.forEach((profit) => {
  totalBet+=profit.totalBet
  maxBet+=profit.maxBet
  betCounter+=profit.betCounter
})
console.log(totalProfit)
console.log(totalBet)
console.log(betCounter)
console.log(maxBet)
