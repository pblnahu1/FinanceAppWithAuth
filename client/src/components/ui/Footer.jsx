import '../../App.css'
import { DollarIcon, GithubIcon, LinkedinIcon, PortfolioIcon } from "../icons";

export default function Footer() {
  return (
    <footer className="p-10 mt-auto bg-black rounded-tl-3xl rounded-tr-3xl footer footer-center shadow-top">
      <aside>
        <DollarIcon />
        <p className="font-bold">
          Pablo Torrez
          <br />
        </p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            href="www.linkedin.com/in/pablo-torrez-33a80324b"
            target="_blank"
            rel="noreferrer noopener"
          >
            <LinkedinIcon />
          </a>
          <a
            href="https://github.com/pblnahu1"
            target="_blank"
            rel="noreferrer noopener"
          >
            <GithubIcon />
          </a>
          <a
            href="https://portfolio-dev-lilac.vercel.app/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <PortfolioIcon />
          </a>
        </div>
      </nav>
    </footer>
  );
}
