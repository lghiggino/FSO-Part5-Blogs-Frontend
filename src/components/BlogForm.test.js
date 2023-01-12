import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BlogForm } from "./BlogForm";
import userEvent from "@testing-library/user-event";

describe("<BlogForm />", () => {
  it("should call the event handler with the proper form data", async () => {
    const createBlog = jest.fn((e) => e.preventDefault());
    const user = userEvent.setup();

    const newBlogData = {
      title: "",
      url: "",
    };

    const { container } = render(
      <BlogForm
        addBlog={createBlog}
        newBlogData={newBlogData}
        setNewBlogData={() => {}}
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

    await user.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].content).toBe("new blog title test");
    expect(createBlog.mock.calls[0][0].content).toBe(
      "www.newBlogTitleTest.com"
    );
  });
});
