import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "test blog title",
    author: "test author",
    id: "1",
    likes: 0,
    url: "www.testblogurl.com",
  };

  render(<Blog blog={blog} setErrorMessage={() => console.log("error")} />);

  const element = screen.getByText("test blog title");
  expect(element).toBeDefined();
});
