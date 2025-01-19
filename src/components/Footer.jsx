import logo from "../assets/logo.webp";
import useDevice from "../hooks/useDevice";
const Footer = () => {
  const { siteName } = useDevice();
  return (
    <>
      <footer className="footer bg-base-200 text-base-content justify-evenly p-10">
        <aside>
          <img src={logo} alt="logo" className="w-24 h-24" />
          <p>
            {siteName} Ltd.
            <br />
            Providing reliable Service since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">office</a>
          <a className="link link-hover">Apartments</a>
          <a className="link link-hover">House</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
