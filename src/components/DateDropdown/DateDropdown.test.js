import DateDropdown from "./DateDropdown";
import userEvent from "@testing-library/user-event";
import {getByRole, render, screen} from "@testing-library/react"

it("should render the dropdown menu in the document", () => {
    render(<DateDropdown/>);
    const dropMenu = screen.getByTitle("select")
    expect(dropMenu).toBeInTheDocument();
})

it("should select 2019 if 2019 is clicked", () => {
    render(<DateDropdown/>);
    const dropMenu = screen.getByTitle("select")
    userEvent.click(dropMenu)
    const date = screen.getByText("2019")
    userEvent.click(date)
    expect(date).toBeInTheDocument()
})

it("should select 2020 if 2020 is clicked", () => {
    render(<DateDropdown/>);
    const dropMenu = screen.getByTitle("select")
    userEvent.click(dropMenu)
    const date = screen.getByText("2020")
    userEvent.click(date)
    expect(date).toBeInTheDocument()
})

it("should select 2021 if 2021 is clicked", () => {
    render(<DateDropdown/>);
    const dropMenu = screen.getByTitle("select")
    userEvent.click(dropMenu)
    const date = screen.getByText("2021")
    userEvent.click(date)
    expect(date).toBeInTheDocument()
})

it("should select 2022 if 2022 is clicked", () => {
    render(<DateDropdown/>);
    const dropMenu = screen.getByTitle("select")
    userEvent.click(dropMenu)
    const date = screen.getByText("2022")
    userEvent.click(date)
    expect(date).toBeInTheDocument()
})

it("should select all if all is clicked", () => {
    render(<DateDropdown/>);
    const dropMenu = screen.getByTitle("select")
    userEvent.click(dropMenu)
    const date = screen.getByText("All")
    userEvent.click(date)
    expect(date).toBeInTheDocument()
})