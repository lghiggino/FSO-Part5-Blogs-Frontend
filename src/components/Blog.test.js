import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let blog = {};
  let container;
  beforeAll(() => {
    blog = {
      title: "test blog title",
      author: "test author",
      id: "1",
      likes: 0,
      url: "www.testblogurl.com",
    };
  });

  beforeEach(() => {
    container = render(
      <Blog blog={blog} setErrorMessage={() => console.log("error")} />
    ).container;
  });

  it("should render the title and author in every circustance", () => {
    const title = screen.getByText("test blog title");
    expect(title).toBeDefined();

    const author = screen.getByText("test author");
    expect(author).toBeDefined();
  });

  it("should NOT render likes and URL", () => {
    const url = container.querySelector(".blogUrl");
    expect(url).toBeDefined();
    expect(url).not.toBeVisible();

    const likes = container.querySelector("#blog-likes");
    expect(likes).toBeDefined();
    expect(likes).not.toBeVisible();
  });

  it("should show the url and number of likes upon clicking on the View button", async () => {
    // screen.debug();
    const user = userEvent.setup();
    const button = screen.getByText("View");
    expect(button).toBeVisible();

    await user.click(button);

    const url = container.querySelector(".blogUrl");
    expect(url).toBeDefined();
    expect(url).toBeVisible();

    const likes = container.querySelector("#blog-likes");
    expect(likes).toBeDefined();
    expect(likes).toBeVisible();
  });
});
