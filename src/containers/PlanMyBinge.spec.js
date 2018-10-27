import PlanMyBinge from "./PlanMyBinge";
import React from "react";
import {mount} from "enzyme";
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme);

describe("<PlanMyBinge/>", () => {
  it("should render test string", () => {
   let  wrapper = mount(<PlanMyBinge/>);

   console.log(wrapper.find('p').html())
   expect(wrapper.find('p')).to.exist;
  })
});