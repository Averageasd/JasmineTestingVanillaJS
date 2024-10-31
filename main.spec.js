describe("main.js", function () {
  describe("calculate()", function () {
    it("validate expression if first number is invalid", function () {
      // stub means don't go to the function and call it.
      // instead, pretend that it has been called.
      // spy to track how many times function has been called and arguments passed to function
      // .and.stub() makes function no-op operation
      // we dont care about actual behavior of function just what it has been called with and if it has been called
      spyOn(window, "updateResult").and.stub();
      calculate("a+3");

      // expect that updateResult will be called with Expression not recognized if expression is wrong
      expect(window.updateResult).toHaveBeenCalledOnceWith(
        "Expression not recognized"
      );
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it("validate expression if second number is invalid", function () {
      // stub means don't go to the function and call it.
      // instead, pretend that it has been called.
      // spy to track how many times function has been called and arguments passed to function
      // .and.stub() makes function no-op operation
      // we dont care about actual behavior of function just what it has been called with and if it has been called
      spyOn(window, "updateResult").and.stub();
      calculate("3+a");

      // expect that updateResult will be called with Expression not recognized if expression is wrong
      expect(window.updateResult).toHaveBeenCalledOnceWith(
        "Expression not recognized"
      );
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it("validate expression if operation is invalid", function () {
      // stub means don't go to the function and call it.
      // instead, pretend that it has been called.
      // spy to track how many times function has been called and arguments passed to function
      // .and.stub() makes function no-op operation
      // we dont care about actual behavior of function just what it has been called with and if it has been called
      spyOn(window, "updateResult").and.stub();
      calculate("3_3");

      // expect that updateResult will be called with Expression not recognized if expression is wrong
      expect(window.updateResult).toHaveBeenCalledOnceWith(
        "Expression not recognized"
      );
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it("Calls add", function () {
      // spyOn add method of Calculator
      spyOn(Calculator.prototype, "add");

      calculate("3+2");

      // add of calculator instance is called twice
      expect(Calculator.prototype.add).toHaveBeenCalledTimes(2);
      expect(Calculator.prototype.add).toHaveBeenCalledWith(3);
      expect(Calculator.prototype.add).toHaveBeenCalledWith(2);
    });
    it("Calls subtract", function () {
      spyOn(Calculator.prototype, "subtract");
      spyOn(Calculator.prototype, "add");
      calculate("3-2");
      expect(Calculator.prototype.add).toHaveBeenCalledTimes(1);
      expect(Calculator.prototype.subtract).not.toHaveBeenCalledWith(3);
      expect(Calculator.prototype.add).toHaveBeenCalledOnceWith(3);
      expect(Calculator.prototype.subtract).toHaveBeenCalledTimes(1);
      expect(Calculator.prototype.subtract).toHaveBeenCalledWith(2);
    });
    it("Calls multiply", function () {
      spyOn(Calculator.prototype, "multiply");
      spyOn(Calculator.prototype, "add");
      calculate("3*2");
      expect(Calculator.prototype.add).toHaveBeenCalledTimes(1);
      expect(Calculator.prototype.multiply).not.toHaveBeenCalledWith(3);
      expect(Calculator.prototype.add).toHaveBeenCalledOnceWith(3);
      expect(Calculator.prototype.multiply).toHaveBeenCalledTimes(1);
      expect(Calculator.prototype.multiply).toHaveBeenCalledWith(2);
    });
    it("Calls divide", function () {
      spyOn(Calculator.prototype, "divide");
      spyOn(Calculator.prototype, "add");
      calculate("3/2");
      expect(Calculator.prototype.add).toHaveBeenCalledTimes(1);
      expect(Calculator.prototype.divide).not.toHaveBeenCalledWith(3);
      expect(Calculator.prototype.add).toHaveBeenCalledOnceWith(3);
      expect(Calculator.prototype.divide).toHaveBeenCalledTimes(1);
      expect(Calculator.prototype.divide).toHaveBeenCalledWith(2);
    });
    it("calls updateResult(example with callFake)", function () {
      // callFake will call the overriden implementation of the method
      // unlike stub that does not execute the original implementation
      spyOn(Calculator.prototype, "add").and.callFake(() => {
        return "Add is called";
      });
      spyOn(window, "updateResult");
      calculate("3+2");
      expect(Calculator.prototype.add).toHaveBeenCalledTimes(2);
      expect(window.updateResult).toHaveBeenCalledWith("Add is called");
    });
    it("calls updateResult(example for returnValue to return a single value)", function () {
      spyOn(Calculator.prototype, "add").and.returnValue(1);
      spyOn(window, "updateResult");
      calculate("3+2");
      expect(Calculator.prototype.add).toHaveBeenCalledTimes(2);
      expect(window.updateResult).toHaveBeenCalledWith(1);
    });
    it("calls updateResult(example for returnValues to return multiple values)", function () {
      // returnValues
      // anytime we call the method it will return the value in the list starting from the first value
      // it will stop once it returns the last value
      // in this case, add is called twice since the expression is valid.
      // first time we call add, it will return 3
      // second time we call add, it will return 5. only the result returned from the second call
      // is passed into updateResult. therefore we expect it to return 5.
      spyOn(Calculator.prototype, "add").and.returnValues(3, 5);
      spyOn(window, "updateResult");
      calculate("3+2");
      expect(Calculator.prototype.add).toHaveBeenCalledTimes(2);
      expect(window.updateResult).toHaveBeenCalledTimes(1);
      expect(window.updateResult).toHaveBeenCalledWith(5);
    });
    it("does not handle errors", function () {
      spyOn(Calculator.prototype, "multiply").and.throwError(
        "Some random error"
      );
      expect(() => {
        window.calculate("3*2");
      }).toThrowError("Some random error");
    });
    it("Validate updateResult with calculator.add", function () {
      spyOn(window, "updateResult");
      spyOn(Calculator.prototype, "add").and.callThrough();
      calculate("3+2");
      expect(window.updateResult).toHaveBeenCalledTimes(1);
      expect(window.updateResult).toHaveBeenCalledWith(5);
    });
    it("Validate updateResult with calculator.subtract", function () {
      spyOn(window, "updateResult");
      spyOn(Calculator.prototype, "subtract").and.callThrough();
      calculate("3-2");
      expect(window.updateResult).toHaveBeenCalledTimes(1);
      expect(window.updateResult).toHaveBeenCalledWith(1);
    });
    it("Validate updateResult with calculator.multiply", function () {
      spyOn(window, "updateResult");
      spyOn(Calculator.prototype, "subtract").and.callThrough();
      calculate("3*2");
      expect(window.updateResult).toHaveBeenCalledTimes(1);
      expect(window.updateResult).toHaveBeenCalledWith(6);
    });
    it("Validate updateResult with calculator.divide", function () {
      spyOn(window, "updateResult");
      spyOn(Calculator.prototype, "divide").and.callThrough();
      calculate("3/2");
      expect(window.updateResult).toHaveBeenCalledTimes(1);
      expect(window.updateResult).toHaveBeenCalledWith(1.5);
    });
  });
  describe("updateResult()", function () {
    // before all specs run, create the result element.
    // so that, we don't need to create this element in every spec.
    beforeAll(function () {
      const element = document.createElement("div");
      element.innerText = "";
      element.setAttribute("id", "result");

      document.body.appendChild(element);

      // use this.element so that we can access it in all specs
      this.element = element;
    });
    // after all specs are executed, remove all DOM elements from the screen
    afterAll(function () {
      document.body.removeChild(this.element);
    });

    it("add result to the DOM element", function () {
      updateResult("5");
      expect(this.element.innerText).toBe("5");
    });
  });
  describe("showVersion()", function () {
    it("should call showVersion()", async function () {
      const element = spyOn(document, "getElementById").and.returnValue({
        innerText: null,
      });

      // spy on get property named version of calculator object
      // create a mock api call for "version"
      const spy = spyOnProperty(
        Calculator.prototype,
        "version",
        "get"
      ).and.returnValue(Promise.resolve("0.8"));

      // call
      // version get is called 1
      showVersion();

      // verify that mocked promise is called
      expect(spy).toHaveBeenCalled();

      const version = await spy();
      expect(element().innerText).toBe(version);
    });
  });
});
