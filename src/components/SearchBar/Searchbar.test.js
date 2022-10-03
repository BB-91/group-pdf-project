import SearchBar from "./SearchBar";
import {screen, render} from "@testing-library/react"
import userEvent from "@testing-library/user-event";

it("should render searchbar upon page load", () => {
    render(<SearchBar/>);
    const searchbar = screen.getByPlaceholderText("Search!")
    expect(searchbar).toBeInTheDocument()
})