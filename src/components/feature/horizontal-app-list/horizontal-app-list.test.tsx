import { render, screen } from "@testing-library/react";
import HorizontalAppList from ".";
import { AppInfo } from "@/types";

describe("HorizontalAppList", () => {
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

  test("renders the component with a title and app list", () => {
    render(<HorizontalAppList title="Featured Apps" appList={mockAppList} />);

    // 检查标题是否正确渲染
    expect(screen.getByText("Featured Apps")).toBeInTheDocument();

    // 检查应用列表是否正确渲染
    mockAppList.forEach((app) => {
      expect(screen.getByText(app.name)).toBeInTheDocument();
      expect(screen.getByText(app.category)).toBeInTheDocument();
    });

    // 检查应用图标是否正确渲染
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(mockAppList.length);
    mockAppList.forEach((app, index) => {
      expect(images[index]).toHaveAttribute(
        "src",
        app.image[app.image.length - 1].label
      );
      expect(images[index]).toHaveAttribute("alt", app.name);
    });
  });

  test("renders an empty list when no apps are provided", () => {
    render(<HorizontalAppList title="Empty List" appList={[]} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    expect(screen.queryAllByRole("img")).toHaveLength(0);
  });
});
