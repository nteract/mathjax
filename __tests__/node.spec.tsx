import { mount } from "enzyme";
import React from "react";

import { MathJaxNode_ } from "../src/node";

jest.useFakeTimers();

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

describe("MathJaxNode_", () => {
  it("typesets when mounted", () => {
    const typeset = jest.spyOn(MathJaxNode_.prototype, "typeset");
    const component = mount(
      <MathJaxNode_ inline MathJax={MathJaxContextMock} input={"tex"}>
        $x^2 + y = 3$
      </MathJaxNode_>
    );
    jest.runAllTimers();
    component.update();

    expect(typeset).toBeCalled();
  });
  it("clears typesetting when unmounted", () => {
    const clear = jest.spyOn(MathJaxNode_.prototype, "clear");
    const component = mount(
      <MathJaxNode_ inline MathJax={MathJaxContextMock} input={"tex"}>
        $x^2 + y = 3$
      </MathJaxNode_>
    );
    jest.runAllTimers();
    component.update();
    component.unmount();

    expect(clear).toBeCalled();
  });
  it("typesets with force update when props change", () => {
    const typeset = jest.spyOn(MathJaxNode_.prototype, "typeset");
    const component = mount(
      <MathJaxNode_ inline MathJax={MathJaxContextMock} input="tex">
        $x^2 + y = 3$
      </MathJaxNode_>
    );
    jest.runAllTimers();
    component.setProps({ inline: false });

    expect(typeset).toBeCalledWith(true);
  });
});
