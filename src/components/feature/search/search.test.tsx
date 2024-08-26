import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Search } from ".";
import { AppInfo } from "@/types";

describe("Search Component", () => {
  const mockAppList: AppInfo[] = [
    {
      name: "Test App 1",
      image: [
        {
          label:
            "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/2d/53/2c/2d532c90-4e98-295b-aaa7-14be5e751de3/AppIcon-0-0-1x_U007emarketing-0-5-0-85-220.png/53x53bb.png",
          attributes: {
            height: "75",
          },
        },
      ],
      summary: "Test App 1 Summary",
      artist: "Test Artist 1",
      id: "1",
      category: "Category 1",
      artistId: 1,
      artistName: "Test Artist 1",
      genres: [],
      price: "1",
      description: "Test App 1 Description",
      userRatingCount: 100,
      averageUserRating: 4.5,
    },
    {
      name: "Test App 2",
      image: [
        {
          label:
            "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/2d/53/2c/2d532c90-4e98-295b-aaa7-14be5e751de3/AppIcon-0-0-1x_U007emarketing-0-5-0-85-220.png/53x53bb.png",
          attributes: {
            height: "75",
          },
        },
      ],
      summary: "Test App 2 Summary",
      artist: "Test Artist 2",
      id: "2",
      category: "Category 2",
      artistId: 2,
      artistName: "Test Artist 2",
      genres: [],
      price: "2",
      description: "Test App 2 Description",
      userRatingCount: 200,
      averageUserRating: 4.5,
    },
  ];

  test("Search", async () => {
    const mockOnInputChanged = jest.fn();

    const { rerender } = render(
      <Search resultList={mockAppList} onInputChanged={mockOnInputChanged} />
    );

    const inputElement = screen.getByPlaceholderText("Search...");

    fireEvent.change(inputElement, { target: { value: "Test App 1" } });

    await waitFor(() => {
      expect(mockOnInputChanged).toHaveBeenCalledWith("Test App 1");
    });

    const filteredList = mockAppList.filter((app) => app.name === "Test App 1");
    rerender(
      <Search resultList={filteredList} onInputChanged={mockOnInputChanged} />
    );

    expect(screen.getByText("Test App 1")).toBeInTheDocument();
    expect(screen.queryByText("Test App 2")).not.toBeInTheDocument();
  });
});
