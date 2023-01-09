import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let blog = {};
  beforeAll(() => {
    blog = {
      title: "test blog title",
      author: "test author",
      id: "1",
      likes: 0,
      url: "www.testblogurl.com",
    };
  });

  it("should render the title and author in every circustance", () => {
    render(<Blog blog={blog} setErrorMessage={() => console.log("error")} />);

    const title = screen.getByText("test blog title");
    expect(title).toBeDefined();

    const author = screen.getByText("test author");
    expect(author).toBeDefined();
  });

  it("should NOT render likes and URL", () => {
    const { container } = render(
      <Blog blog={blog} setErrorMessage={() => console.log("error")} />
    );

    screen.debug();

    const url = container.querySelector(".blogUrl");
    expect(url).toBeDefined();
    expect(url).not.toBeVisible();

    const likes = container.querySelector("#blog-likes");
    expect(likes).toBeDefined();
    expect(likes).not.toBeVisible();
  });
});
