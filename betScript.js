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
* maxBet：            预留位
* maxSingleLoopTime： 单论循环最大次数
* maxMultiple:        最大倍数 策略范围，能接受最大倍数
* betBaseNum：        投注基准
* betBasePoint：      投注点数
*/

function script1(maxResetTime, maxBet, maxSingleLoopTime, maxMultiple, betBaseNum, betBasePoint ) {
  // counter
 
  // 总返回数据
  let totalProfit = []
  // 总利润
  let totalProfitNum = 0
  // 总成本
  let totalBet = 0
  // 当前最大轮数
  let maxResetCounter = 0
  // 100次循环的计数
  let bigCounter = 0
  // 翻倍循环的计数
  let doubleCounter = 0

  function loop(betNum, point) {
    if(maxResetCounter+1 >= maxResetTime) {
      // console.log('done for '+maxResetTime)
      // console.log('totalProfit : '+(totalProfitNum - totalBet))
      return
    }
    // if(totalBet >= maxBet) {
    //   // console.log('done for '+maxResetTime)
    //   // console.log('totalProfit : '+(totalProfitNum - totalBet))
    //   return
    // }
    
    totalBet+=betNum
    console.log(betNum,'betNum')

    let res = BetGameIns.challenge(betNum, point)
      // 计算总利益
    totalProfitNum+=res.payback
    // totalProfit.push(res)
    
    // 判断重置行为
    if(bigCounter === maxSingleLoopTime || doubleCounter === maxMultiple){
      maxResetCounter++
      if(bigCounter === maxSingleLoopTime) {console.log('\u001b[31m 达到最大值，或者最大倍数 \u001b[39m')}
      if(doubleCounter === maxMultiple) {console.log('\u001b[31m 达到最大值，或者最大倍数 \u001b[39m')}

      // console.log(bigCounter, doubleCounter)
      bigCounter = 0
      doubleCounter =0
      loop(betBaseNum, betBasePoint)
    } else {
      if (doubleCounter > 0 && res.payback>0) {
        // console.log('\u001b[32m上次失败，本次成功 \u001b[36m')
        bigCounter = 0
        doubleCounter =0
        loop(betBaseNum, betBasePoint)
      } else {
        // console.log('\u001b[35m 一直赢 \u001b[36m')
        bigCounter++
        let olddoubleCounter = doubleCounter
        doubleCounter++
        // doubleCounter
        loop((getNum(olddoubleCounter+1)*betBaseNum), betBasePoint)
      }
    }
  }
  loop(betBaseNum, betBasePoint)
  return {
    //  totalProfit,
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
for( let i=0; i<1; i++) {
 let a =  script1(10 ,1000, 100, 10, 1, 50)
 totalProfit.push(a)
}
totalProfit.forEach((profit) => {
  totalBet+=profit.totalBet
  totalProfitNum+=(profit.totalProfitNum-profit.totalBet)
})
console.log(totalBet)
console.log(totalProfitNum)
