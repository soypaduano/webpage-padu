import logo from './../logo.svg';

export default function Header() {
    return (
      <header>
      <nav>
        <img src={logo} />
        <ol>
          <li>Pricing</li>
          <li>About</li>
          <li>Contact</li>
        </ol>
      </nav>
      </header>
    )
  } 