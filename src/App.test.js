import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import App from './App'; //test etmek istedigini import et
//import { isTSAnyKeyword } from @babel/types;
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";


// Enzyme.configure({ adapter: new Adapter() })

it("renders without crushing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App> </App>, div);
})

it("renders without crashing", () =>{
  shallow(<App />);
});

it("renders header ", () => {
  const wrapper = shallow(<App />);
  const welcome = <h1>recorder app</h1>;
  expect(wrapper.contains(welcome)).toEqual(true);
});

it.skip('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

it("renders correctly with no error message", () => {
  const wrapper = mount();
  expect(wrapper.state("error")).toEqual(null);
});

it("renders correctly", () => {
  const tree = shallow(<App />);
  expect(toJson(tree)).toMatchSnapshot();
});