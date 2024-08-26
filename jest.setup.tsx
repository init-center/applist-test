import "@testing-library/jest-dom";

jest.mock("next/image", () => (props: any) => {
  return <img {...props} priority="true" />;
});
