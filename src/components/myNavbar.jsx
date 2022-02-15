import { useEffect } from "react";
import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "../styles/homepage.css";
import { setIsLoggedInAction, setRedirectAction, setRoleAction, setUserAction } from "../actions";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const url = process.env.REACT_APP_BE_URL;
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.login.isloggedin);
  const role = useSelector((state) => state.login.role);

  const dispatch = useDispatch();

  const logout = async () => {
    if (role === "normal") {
      try {
        const response = await fetch(`${url}/users/logout`, {
          method: "POST",
          credentials: "include",
        });
        if (response.ok) {
          console.log("ok");
          dispatch(setIsLoggedInAction(false));
          dispatch(setRoleAction(""));
          dispatch(setUserAction(""))
          dispatch(setRedirectAction("null"))
          navigate("/", { replace: true });
        } else {
          console.log("try again");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(`${url}/proUser/logout`, {
          method: "POST",
          credentials: "include",
        });
        if (response.ok) {
          console.log("ok");
          dispatch(setIsLoggedInAction(false));
          dispatch(setRoleAction(""));
          navigate("/", { replace: true });
        } else {
          console.log("try again");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoggedIn === false) {
    return (
      <Navbar bg="light" className="nav-bar" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Fit Find</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Login" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/signup">Sign up</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar bg="light" className="nav-bar" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Fit Find</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              {role === 'pro' ?
              <Nav.Link href="/user/me">profile</Nav.Link>:<Nav.Link href="/User/me/norm">profile</Nav.Link>}
              <Nav.Link onClick={() => logout()}>Log out</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
};

export default MyNavbar;
