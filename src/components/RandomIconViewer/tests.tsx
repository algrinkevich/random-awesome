import { render, screen, act } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import RandomIconViewer from "./index";

const ICON_SHOW_DELAY = 3000;

function setup() {
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  render(<RandomIconViewer />);

  return { user };
}

describe("Random icon viewer component tests", () => {
  beforeAll(() => {
    globalThis.jest = {
      ...globalThis.jest,
      advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
    };
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test("Button and icon are displayed when starting the app", () => {
    setup();
    
    const buttonEl = screen.getByRole("button", {
      name: /get icon/i,
    });
    const iconEl = screen.getByTitle(/icon$/i).parentElement;

    expect(buttonEl).toBeEnabled();
    expect(buttonEl).toHaveTextContent("Get Icon");
    expect(iconEl).toBeVisible();
  });

  test("New icon is displayed after 3 seconds when button is pressed", async () => {
    const { user } = setup();
    const previousIcon = screen.getByTitle(/icon$/i);
    const buttonEl = screen.getByRole("button", {
      name: /get icon/i,
    });
    await user.click(buttonEl);

    act(() => {
      vi.advanceTimersByTime(ICON_SHOW_DELAY);
    });

    const newIcon = screen.getByTitle(/icon$/i);

    expect(previousIcon.textContent).not.toEqual(newIcon.textContent);
  });

  test("New icon is not displayed after 2999 ms when button is pressed", async () => {
    const { user } = setup();
    const previousIcon = screen.getByTitle(/icon$/i);
    const buttonEl = screen.getByRole("button", {
      name: /get icon/i,
    });

    await user.click(buttonEl);

    act(() => {
      vi.advanceTimersByTime(ICON_SHOW_DELAY - 1);
    });

    const newIcon = screen.getByTitle(/icon$/i);

    expect(previousIcon.textContent).toEqual(newIcon.textContent);
  });

  test("Corresponding icon and number are displayed on button on every click", async () => {
    const { user } = setup();
    const numOfClicks = 3;
    let previousIcon = screen.getByTitle(/icon$/i);
    const buttonEl = screen.getByRole("button", {
      name: /get icon/i,
    });

    for (let i = 0; i < numOfClicks; i++) {
      await user.click(buttonEl);
    }
    let newIcon = null;

    for (let i = 0; i < numOfClicks - 1; i++) {
      const counterEl = document.getElementsByClassName(
        "get-icon-button__counter"
      )[0];

      expect(Number(counterEl.textContent)).toEqual(numOfClicks - i);
      act(() => {
        vi.advanceTimersByTime(ICON_SHOW_DELAY);
      });
      newIcon = screen.getByTitle(/icon$/i);

      expect(previousIcon.textContent).not.toEqual(newIcon.textContent);

      previousIcon = newIcon;
    }
  });
});
