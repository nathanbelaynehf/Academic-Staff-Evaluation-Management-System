import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5">
            <div className="container py-5">
                <div className="row">
                    {/* About Us Section */}
                    <div className="col-md-4 mb-4 text-center text-md-start">
                        <h5 className='text-secondary mb-3'>About Us</h5>
                        <p className="text-white">
                            The Academic Staff Evaluation Management System is designed to streamline the evaluation process
                            for academic staff, ensuring transparency and efficiency.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="col-md-4 mb-4 text-center text-md-start">
                        <h5 className='text-secondary mb-3'>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white text-decoration-none">Home</a></li>
                            <li><a href="/evaluations" className="text-white text-decoration-none">Evaluations</a></li>
                            <li><a href="/reports" className="text-white text-decoration-none">Reports</a></li>
                            <li><a href="/contact" className="text-white text-decoration-none">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Contact Information Section */}
                    <div className="col-md-4 mb-4 text-center text-md-start">
                        <h5 className='text-secondary mb-3'>Contact Information</h5>
                        <ul className="list-unstyled text-white">
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                                support@academicevaluation.com
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faPhone} className="me-2" />
                                +1 (123) 456-7890
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                                123 University Drive, City, Country
                            </li>
                        </ul>
                        <div className="mt-3">
                            <a href="https://facebook.com" className="text-white me-3">
                                <FontAwesomeIcon icon={faFacebook} size="lg" />
                            </a>
                            <a href="https://twitter.com" className="text-white me-3">
                                <FontAwesomeIcon icon={faTwitter} size="lg" />
                            </a>
                            <a href="https://linkedin.com" className="text-white">
                                <FontAwesomeIcon icon={faLinkedin} size="lg" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="text-center py-3 bg-primary">
                <p className="mb-0">
                    &copy; {new Date().getFullYear()} Academic Staff Evaluation Management System. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;