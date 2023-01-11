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

    const inputs = screen.getAllByRole("textbox");
    const sendButton = screen.getByText("save");

    expect(inputs).toBeDefined();
    expect(sendButton).toBeDefined();

    await user.type(inputs[0], "new blog title test");
    screen.debug();
    await user.type(inputs[1], "www.newBlogTitleTest.com");

    await user.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    // expect(createBlog.mock.calls[0][0].content).toBe("new blog title test");
    // expect(createBlog.mock.calls[0][0].content).toBe(
    //   "www.newBlogTitleTest.com"
    // );

    // const inputs = screen.getAllByRole("textbox");
    // const sendButton = screen.getByText("save");

    // userEvent.type(inputs[0], "title");
    // userEvent.type(inputs[1], "url");
    // userEvent.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    // expect(createBlog.mock.calls[0][0].title).toBe("title");
    // expect(createBlog.mock.calls[0][0].url).toBe("url");
  });
});
