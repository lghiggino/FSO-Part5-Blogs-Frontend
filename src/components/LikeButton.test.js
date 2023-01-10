import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LikeButton from "./LikeButton";

describe("<LikeButton />", () => {
  it("should count twice for 2 clicks on the LikeButton", async () => {
    const mockHandler = jest.fn();

    const { container } = render(
      <LikeButton blogId={"1"} addLike={mockHandler} />
    );

    screen.debug();

    const user = userEvent.setup();
    const likeButton = container.querySelector("#like-button");
    expect(likeButton).toBeDefined();
    expect(likeButton).toBeVisible();

    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
