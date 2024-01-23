import { multiplesService } from "./multiplesService";

describe('Unit test for mulitples Service', () => {
  it("For numbers multiple of 3 == 'Type 1'", () => {
    const multiplesOf3 = [3, 6, 9, 21, 18, 33]

    for (let i = 0; i < multiplesOf3.length; i++) {
      const number = multiplesOf3[i];

      expect(multiplesService.getNumbersType(number)).toEqual('Type 1')
    }
  })

  it("For numbers multiple of 5 == 'Type 2'", () => {
    const multiplesOf5 = [5, 10, 20, 25, 55]

    for (let i = 0; i < multiplesOf5.length; i++) {
      const number = multiplesOf5[i];

      expect(multiplesService.getNumbersType(number)).toEqual('Type 2')
    }
  })

  it("For numbers multiple of 3 and 5 == 'Type 3'", () => {
    const multiplesOf3And5 = [15, 30, 45, 60]

    for (let i = 0; i < multiplesOf3And5.length; i++) {
      const number = multiplesOf3And5[i];

      expect(multiplesService.getNumbersType(number)).toEqual('Type 3')
    }
  })

  it("For numbers not multiple of 3 or 5 == number", () => {
    const multiplesOf3And5 = [1, 2, 7, 13, 22, 28]

    for (let i = 0; i < multiplesOf3And5.length; i++) {
      const number = multiplesOf3And5[i];

      expect(multiplesService.getNumbersType(number)).toEqual(number.toString())
    }
  })

  it("Correctly identify a mix of numbers", () => {
    const multiplesOf3And5 = [1, 2, 3, 5, 9, 10, 13, 15, 22, 25, 28, 30]
    const expectedResults = [
      '1',
      '2',
      'Type 1',
      'Type 2',
      'Type 1',
      'Type 2',
      '13',
      'Type 3',
      '22',
      'Type 2',
      '28',
      'Type 3'
    ]
    let results: string[] = []

    for (let i = 0; i < multiplesOf3And5.length; i++) {
      const number = multiplesOf3And5[i];
      results.push(multiplesService.getNumbersType(number))
    }

    expect(expectedResults).toEqual(results)
  })
})