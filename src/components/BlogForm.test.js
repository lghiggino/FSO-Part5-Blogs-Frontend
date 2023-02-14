import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BlogForm } from "./BlogForm";
import userEvent from "@testing-library/user-event";

describe("<BlogForm />", () => {
  it("should change input value", async () => {
    const user = userEvent.setup();

    const { container } = render(<BlogForm />);

    const titleInput = container.querySelector("#blog-title");
    expect(titleInput).toBeDefined();
    await user.type(titleInput, "new blog title test");
    expect(titleInput.value).toBe("new blog title test");
  });

  it("should call the event handler with the proper form data", async () => {
    const createBlog = jest.fn((e) => e.preventDefault());
    const user = userEvent.setup();

    const { container } = render(
      <BlogForm
        setBlogs={() => {}}
        setMessage={() => {}}
        setErrorMessage={() => {}}
        blogFormRef={"x"}
        blogs={[]}
      />
    );

    const titleInput = container.querySelector("#blog-title");
    const urlInput = container.querySelector("#blog-url");
    const sendButton = screen.getByText("save");

    expect(titleInput).toBeDefined();
    expect(urlInput).toBeDefined();
    expect(sendButton).toBeDefined();

    await user.type(titleInput, "new blog title test");
    await user.type(urlInput, "www.newBlogTitleTest.com");

    screen.debug();

    await user.click(sendButton);

    // expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].content).toBe("new blog title test");
    expect(createBlog.mock.calls[0][0].content).toBe(
      "www.newBlogTitleTest.com"
    );
  });
});
