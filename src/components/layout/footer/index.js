import Logo from "@/components/logo";
const Footer = () => {
  return (
    <>
      <section className="footer-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="footer-content text-center">
                <Logo src="/images/logo.svg" width="48" height="32" />

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum
                </p>
                <div className="hr"></div>
                <h6>Shastri Nagar - New Delhi India.</h6>
                <h6>
                  +01 2345 6789 12<span>|</span>+01 2345 6789 12
                </h6>
                <div className="footer-social">
                  <ul>
                    <li>
                      <a className="hover-target" href="/">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a className="hover-target" href="/">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                    <li>
                      <a className="hover-target" href="/">
                        <i className="fab fa-github"></i>
                      </a>
                    </li>
                    <li>
                      <a className="hover-target" href="/">
                        <i className="fab fa-behance"></i>
                      </a>
                    </li>
                    <li>
                      <a className="hover-target" href="/">
                        <i className="fab fa-pinterest-p"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>Copyright &copy; 2022 All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Footer;
