 function BetGame() {

}

// 产生随机数
BetGame.prototype.random = function () {
  this.randomNum = parseInt(Math.random()*100)+1
}

// 判断赔率
// BetGame.prototype.judge = function () {
//   return parseInt(Math.random()*100)+1
// }

// 挑战
BetGame.prototype.challenge = function(betNum, point) {
  this.betNum = betNum
  this.point = point
  this.random()
  return this.payback()
}
// 回馈数据
BetGame.prototype.payback = function() {
  let rate = (this.point-1)/100
  if(this.randomNum >= this.point) {
    return({
      code: 0,
      payback: 0
    })
  }else {
    return({
      code: 0,
      payback: this.betNum/rate
    })
  }
}

module.exports = {
  BetGame
}