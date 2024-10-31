describe("Calculator.js", function () {
  describe("Calculator", function () {
    let cal = null;
    let cal2 = null;

    // do something before each spec (it)
    // in this case, create 2 instances of Calculator: cal and cal2 before each spec it
    beforeEach(function () {
      cal = new Calculator();
      cal2 = new Calculator();
    });

    // do something after each spec finishes.
    // 10 specs => called 10 times
    // clean up after spec execution
    afterEach(function () {});
    //ToBe Matcher(=== expect values with same type)
    it("Should initialize the total", function () {
      // const cal = new Calculator();
      expect(cal.total).toBe(0);
      expect(cal.total).toBeFalsy();
    });

    // compare properties using toEqual
    it("should initialize the constructor", function () {
      expect(cal).toBeTruthy();
      expect(cal2).toBeTruthy();
      expect(cal).toEqual(cal2);
    });

    // check if two objects point to same memory location with toBe
    it("should have unique calculator object", function () {
      expect(cal).not.toBe(cal2);
    });

    it("should have common methods", function () {
      expect(cal.add).not.toBeUndefined();
      expect(cal.subtract).not.toBeUndefined();
      expect(cal.divide).not.toBeUndefined();
      expect(cal.multiply).not.toBeUndefined();
    });

    // toBeNull check if object value is null
    it("can override total value", function () {
      cal.total = null;
      expect(cal.total).toBeNull();
    });

    // check if object contains a specific value
    it("should have the calculator constructor", function () {
      expect(cal.constructor.name).toContain("Calc");
    });

    // any matcher
    // check type of object with toEqual, toBeInstanceOf
    it("should be an instance ", function () {
      // add custom matcher to jasmine.
      // used when we want to write our own comparison logic
      jasmine.addMatchers(customMatcher);
      cal.total = 10;
      expect(cal).toBeCalculator();

      // check if type of total is Number
      expect(cal.total).toEqual(jasmine.any(Number));
    });

    // object containing
    it("should contain total as key", function () {
      cal.total = 10;

      // expect calculator instance to contain
      // total variable with value of 10
      // check part of the instance of type Calculator
      expect(cal).toEqual(
        jasmine.objectContaining({
          total: 10,
        })
      );

      // expect type of calculator.total (which is Number) to contains substring "mbe"
      expect(typeof cal.total).toEqual(jasmine.stringContaining("mbe"));
    });
    describe("add()", function () {
      it("Should add number to the total", function () {
        cal.add(5);
        expect(cal.total).toBe(5);
      });
    });
    describe("subtract()", function () {
      it("Should subtract number from total", function () {
        cal.total = 20;
        cal.subtract(5);
        expect(cal.total).toBe(15);
      });
    });
    describe("multiply()", function () {
      it("Should multiply number with total", function () {
        cal.total = 5;
        cal.multiply(5);
        expect(cal.total).toBe(25);
      });
      // tobeNan. check if object is not a number
      it("does not handle NaN for multiply", function () {
        cal.total = 10;
        cal.multiply("a");
        expect(cal.total).toBeNaN();
      });
    });
    describe("divide()", function () {
      it("Should divide total by number", function () {
        cal.total = 5;
        cal.divide(5);
        expect(cal.total).toBe(1);
      });
      // check if function will throw an error.
      // put function inside a callback. because jasmine expects a function not a value returned by function
      it("should throw error when divide by zero", function () {
        cal.total = 10;

        // inside toThrow, put newError(errmsg) not only errmsg
        // because the method divide throws new Error
        expect(() => {
          cal.divide(0);
        }).toThrow(new Error("number cannot be 0."));
      });

      // toThrowError matcher
      it("should throw error when divide by 0", function () {
        cal.total = 10;
        expect(() => {
          cal.divide(0);
          // dont need to check error type unlike toThrow where you have to check errorType
        }).toThrowError(ArithmeticError, "number cannot be 0.");
      });
    });
    describe("get Version", function () {
      // jasmine will think the function is synchronous so it will call cal.version then go to next line.
      // have to use done to signal jasmine when the function finishes execution
      it("fetch version from external source", async function () {
        // mock response of promise call.
        // '{ "version": "0.8" }' string representation of json object
        // it will resolve into a
        spyOn(window, "fetch").and.returnValue(
          Promise.resolve(new Response('{ "version": "0.8" }'))
        );

        // use await and async instead of Promise chain
        // cal.version takes the above json object parse it then return the value of version key
        const version = await cal.version;
        expect(version).toBe("0.8");
      });
    });
  });
});
