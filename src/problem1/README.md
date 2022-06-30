### how to run
`./problem1 --method {1/2/3} --input {ANY NUMBER}`
See below for explanations of each of the 3 methods

### sum1()
Most straightforward solution
```
func sum1(n int) int {
	var ans int
	for n > 0 {
		ans += n
		n--
	}
	return ans
}
```

### sum2()
Gaussian method
```
func sum2(n int) int {
	// if n is even
	if n % 2 == 0 {
		return (n + 1) * (n / 2)
	}

	// if n is odd
	return (n + 2) * (n / 2) + 1
}
```

### sum3()
Using the binary representation of the integers
```
func sum3(n int) int {
	var ans int
	for n > 0 {
		ans = binaryAdd(ans, n)
		n--
	}
	return ans
}

func binaryAdd(a, b int) int {
	var carry int
	for b > 0 {
		// if both bits are 1, return 1; else return 0
		carry = a & b
		// sum bits using XOR
		a = a ^ b
		// leftshift carry and assign to b
		b = carry << 1
	}
	return a
}
```