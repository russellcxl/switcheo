package main

import (
	"flag"
	"fmt"
)

/*
Provide 3 unique implementations of the following function.

**Input**: `n` - any integer

*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
 */

var (
	UserInput int
	Method int
)

func init() {
	flag.IntVar(&Method, "method", 1, "choose which of the 3 methods to use")
	flag.IntVar(&UserInput, "input", 0, "number for sum function")
	flag.Parse()
}

func main() {
	if UserInput < 0 {
		fmt.Println("please input a non-negative number")
		return
	}
	if Method != 1 && Method != 2 && Method != 3 {
		fmt.Println("invalid method")
		return
	}
	switch Method {
	case 1: fmt.Println(sum1(UserInput))
	case 2: fmt.Println(sum2(UserInput))
	case 3: fmt.Println(sum3(UserInput))
	}
}

func sum1(n int) int {
	var ans int
	for n > 0 {
		ans += n
		n--
	}
	return ans
}

func sum2(n int) int {
	// if n is even
	if n % 2 == 0 {
		return (n + 1) * (n / 2)
	}

	// if n is odd
	return (n * ((n - 1) / 2)) + n
}

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