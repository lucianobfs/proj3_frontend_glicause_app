import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";



function Footer() {
    return (
     
        <footer className="text-left text-dark fixed-bottom" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", position: "relative", left: "0", bottom: "0", right: "0"}}>

            <div className="">

                <div className="d-flex flex-row justify-content-around align-items-center">

                    <div className="mt-1 mb-1 col-md-4 text-center">
                        <h5 className="fw-bold">Luciano Freire</h5>
                        <a href="https://github.com/lucianobfs" target="_blank" className="text-decoration-none text-dark mr-4">
                            <FaGithub size="25px"/>
                        </a>
                        <a href="https://www.linkedin.com/in/luciano-santana-65937a221/" target="_blank" className="text-decoration-none text-dark">
                            <FaLinkedin color="#0A66C2" size="25px"/>
                        </a>
                    </div>

                    <div className="mt-1 mb-1 col-md-4 text-center container-fluid">
                        <a href="https://www.ironhack.com/br" target="_blank">
                            <img src="" style={{width: "100px", height: "auto"}}/>
                        </a>
                    </div>

                    <div className="mt-1 mb-1 col-md-4 text-center">
                        <h5 className="fw-bold">Matheus Anjo</h5>
                        <a href="https://github.com/matheusanjo" target="_blank" className="text-decoration-none text-dark mr-4">
                            <FaGithub size="25px"/>
                        </a>
                        <a href="https://www.linkedin.com/in/matheus-a-andre-04a0aa222/" target="_blank" className="text-decoration-none text-dark">
                            <FaLinkedin color="#0A66C2" size="25px"/>
                        </a>
                    </div>

                </div>
            </div>

        </footer>
    );
}

export default Footer;