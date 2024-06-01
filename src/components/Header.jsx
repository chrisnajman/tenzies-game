import PropTypes from "prop-types"
import { BsDice6Fill } from "react-icons/bs"

function Header({ title }) {
  return (
    <header className="page-header">
      <h1>
        <BsDice6Fill
          aria-hidden="true"
          className="logo"
        />{" "}
        <span>{title}</span>
      </h1>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

export default Header
