import { mount } from "enzyme";
import React from "react";

import { MathJaxText_ } from "../src/text";

const MathJaxContextMock = {
  Hub: {
    Register: {
      StartupHook: (str: string, cb: () => void) => {},
      MessageHook: (str: string, cb: (msg: string) => void) => {}
    },
    processSectionDelay: 20,
    getJaxFor: (node: HTMLElement) => ({ Remove: jest.fn() }),
    Config: (options: object) => {},
    Queue: (elements: any[], onRender?: () => void) => {}
  }
};

describe("MathJaxText_", () => {
  it("typesets when mounted", () => {
    const typeset = jest.spyOn(MathJaxText_.prototype, "typeset");
    const component = mount(
      <MathJaxText_ MathJax={MathJaxContextMock} input={"tex"}>
        $x^2 + y = 3$
      </MathJaxText_>
    );

    expect(typeset).toBeCalled();
  });
  it("typesets on component update", () => {
    const typeset = jest.spyOn(MathJaxText_.prototype, "typeset");
    const component = mount(
      <MathJaxText_ MathJax={MathJaxContextMock} input={"tex"}>
        $x^2 + y = 3$
      </MathJaxText_>
    );
    jest.runAllTimers();
    component.update();

    expect(typeset).toBeCalledTimes(2);
  });
});
