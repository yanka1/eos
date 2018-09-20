function getMon(n){
	if(n<=1){
		return n
	}else{
		let num = null;
		for(let i=n;i>=1;i--){
			num += getNum(i-1)
		}
		return num+n
	}
}

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
console.log(getNum(1))
console.log(getNum(2))
console.log(getNum(3))
console.log(getNum(4))
console.log(getNum(5))
console.log(getNum(6))
console.log(getNum(7))
console.log(getNum(8))
console.log(getNum(9))
console.log(getNum(10))
console.log(getNum(11))
console.log(getNum(12))
console.log(getNum(13))
console.log(getNum(14))
console.log(getNum(15))
