import FileUploader from "./FileUploader";
import {render, screen, getByRole} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("should render the form", () => {
    render(<FileUploader/>);
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
}); 