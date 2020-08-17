import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import gatsbyLogo from "../images/gatsby-icon.png"

const isActive = ({ isCurrent }) => {
  return {
    className: isCurrent ? "active" : "navlink",
  }
}

const NavLink = props => <Link getProps={isActive} {...props} />

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <span style={{ display: "flex", alignItems: "center" }}>
        <img
          src={gatsbyLogo}
          alt="Gatsby Garb Logo"
          style={{
            borderRadius: "50%",
            border: "3px solid orange",
            margin: "0 5px",
            width: "50px",
          }}
        />
        <h1 style={{ margin: 0 }}>
          <NavLink to="/">{siteTitle}</NavLink>
        </h1>
      </span>
      <NavLink to="/blog">Blog</NavLink>
      <NavLink to="/products">Store</NavLink>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
