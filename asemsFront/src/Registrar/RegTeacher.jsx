import { useRef, useState } from "react";

export default function RegTeacher() {
    const inputRefs = useRef({});
    const [validationErrors, setValidationErrors] = useState({});
    const [error, setError] = useState(null);

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;
        const nameRegex = /^[A-Za-z\s]{4,}$/;
        const currentYear = new Date().getFullYear();

        // Name validations
        if (!inputRefs.current.fname.value.trim()) {
            errors.fname = "First name is required";
        } else if (!nameRegex.test(inputRefs.current.fname.value)) {
            errors.fname = "First name should contain at least 4 letters";
        }

        if (!inputRefs.current.lname.value.trim()) {
            errors.lname = "Last name is required";
        } else if (!nameRegex.test(inputRefs.current.lname.value)) {
            errors.lname = "Last name should contain at least 4 letters";
        }

        if (!inputRefs.current.gname.value.trim()) {
            errors.gname = "Grandfather name is required";
        } else if (!nameRegex.test(inputRefs.current.gname.value)) {
            errors.gname = "Grandfather name should contain at least 4 letters";
        }

        // Location validations
        if (!inputRefs.current.nationality.value.trim()) {
            errors.nationality = "Nationality is required";
        } else if (inputRefs.current.nationality.value.trim().length < 4) {
            errors.nationality = "Nationality should be at least 4 characters";
        }

        if (!inputRefs.current.city.value.trim()) {
            errors.city = "City is required";
        } else if (inputRefs.current.city.value.trim().length < 4) {
            errors.city = "City name should be at least 4 characters";
        }

        if (!inputRefs.current.subCity.value.trim()) {
            errors.subCity = "Sub-city is required";
        } else if (inputRefs.current.subCity.value.trim().length < 4) {
            errors.subCity = "Sub-city name should be at least 4 characters";
        }

        if (!inputRefs.current.kebele.value.trim()) {
            errors.kebele = "Kebele is required";
        }

        // Contact info validations
        if (!inputRefs.current.pnum.value) {
            errors.pnum = "Phone number is required";
        } else if (!phoneRegex.test(inputRefs.current.pnum.value)) {
            errors.pnum = "Phone number must be 10-15 digits";
        }

        if (!inputRefs.current.email.value.trim()) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(inputRefs.current.email.value)) {
            errors.email = "Please enter a valid email address";
        }

        // Professional info validations
        if (!inputRefs.current.qualification.value.trim()) {
            errors.qualification = "Qualification is required";
        } else if (inputRefs.current.qualification.value.trim().length < 4) {
            errors.qualification = "Qualification should be at least 4 characters";
        }

        if (!inputRefs.current.specialization.value.trim()) {
            errors.specialization = "Specialization is required";
        } else if (inputRefs.current.specialization.value.trim().length < 4) {
            errors.specialization = "Specialization should be at least 4 characters";
        }

        if (!inputRefs.current.yearsOfExperience.value) {
            errors.yearsOfExperience = "Years of experience is required";
        } else if (inputRefs.current.yearsOfExperience.value < 0 || inputRefs.current.yearsOfExperience.value > 50) {
            errors.yearsOfExperience = "Please enter valid years of experience (0-50)";
        }

        // Date validations
        if (!inputRefs.current.dob.value) {
            errors.dob = "Date of birth is required";
        } else {
            const dobDate = new Date(inputRefs.current.dob.value);
            const currentDate = new Date();
            if (dobDate >= currentDate) {
                errors.dob = "Date of birth must be in the past";
            }
        }

        if (!inputRefs.current.dateOfReg.value) {
            errors.dateOfReg = "Date of registration is required";
        }

        // Gender validation
        if (!inputRefs.current.sex.value) {
            errors.sex = "Gender is required";
        }

        // Username validation
        if (!inputRefs.current.username.value.trim()) {
            errors.username = "Username is required";
        } else if (inputRefs.current.username.value.length < 4) {
            errors.username = "Username must be at least 4 characters";
        }

        // Password validation
        if (!inputRefs.current.password.value) {
            errors.password = "Password is required";
        } else if (inputRefs.current.password.value.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = {
            username: inputRefs.current.username.value,
            password: inputRefs.current.password.value,
            role: "ROLE_TEACHER",
            dob: inputRefs.current.dob.value,
            sex: inputRefs.current.sex.value,
            dateOfReg: inputRefs.current.dateOfReg.value,
            Nationality: inputRefs.current.nationality.value,
            city: inputRefs.current.city.value,
            subCity: inputRefs.current.subCity.value,
            kebele: inputRefs.current.kebele.value,
            pnum: inputRefs.current.pnum.value,
            email: inputRefs.current.email.value,
            status: inputRefs.current.status.checked,
            qualification: inputRefs.current.qualification.value,
            specialization: inputRefs.current.specialization.value,
            yearsOfExperience: inputRefs.current.yearsOfExperience.value,
            fname: inputRefs.current.fname.value,
            lname: inputRefs.current.lname.value,
            gname: inputRefs.current.gname.value,
        };

        try {
            const response = await fetch('http://localhost:8082/reg/teacher', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString(),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.text();
            console.log(result);
            
            // Show success modal
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
            
            // Reset form
            e.target.reset();
        } catch (error) {
            console.error('Error posting data:', error);
            setError("Registration failed! Please try again.");
        }
    };

    return (
        <>
            <div className="ms-3">
                <h2 className="ms-3 mt-3 mb-3 text-secondary">Register Teacher</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-3">
                        <input
                            id="username"
                            ref={(el) => (inputRefs.current["username"] = el)}
                            className={`form-control ${validationErrors.username ? "is-invalid" : ""}`}
                            type="text"
                            placeholder="Enter Username"
                        />
                        {validationErrors.username && (
                            <div className="invalid-feedback">{validationErrors.username}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <input
                            id="password"
                            ref={(el) => (inputRefs.current["password"] = el)}
                            className={`form-control ${validationErrors.password ? "is-invalid" : ""}`}
                            type="password"
                            placeholder="Enter Password"
                        />
                        {validationErrors.password && (
                            <div className="invalid-feedback">{validationErrors.password}</div>
                        )}
                    </div>

                    {/* First Name */}
                    <div className="mb-3">
                        <input
                            id="fname"
                            ref={(el) => (inputRefs.current["fname"] = el)}
                            className={`form-control ${validationErrors.fname ? "is-invalid" : ""}`}
                            type="text"
                            placeholder="Enter First Name"
                        />
                        {validationErrors.fname && (
                            <div className="invalid-feedback">{validationErrors.fname}</div>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="mb-3">
                        <input
                            id="lname"
                            ref={(el) => (inputRefs.current["lname"] = el)}
                            className={`form-control ${validationErrors.lname ? "is-invalid" : ""}`}
                            type="text"
                            placeholder="Enter Last Name"
                        />
                        {validationErrors.lname && (
                            <div className="invalid-feedback">{validationErrors.lname}</div>
                        )}
                    </div>

                    {/* Grandfather Name */}
                    <div className="mb-3">
                        <input
                            id="gname"
                            ref={(el) => (inputRefs.current["gname"] = el)}
                            className={`form-control ${validationErrors.gname ? "is-invalid" : ""}`}
                            type="text"
                            placeholder="Enter Grand Father Name"
                        />
                        {validationErrors.gname && (
                            <div className="invalid-feedback">{validationErrors.gname}</div>
                        )}
                    </div>

                    {/* Date of Birth */}
                    <div className="mb-3">
                        <label className="form-label">Date of Birth</label>
                        <input
                            id="dob"
                            ref={(el) => (inputRefs.current["dob"] = el)}
                            className={`form-control w-50 ${validationErrors.dob ? "is-invalid" : ""}`}
                            type="date"
                        />
                        {validationErrors.dob && (
                            <div className="invalid-feedback">{validationErrors.dob}</div>
                        )}
                    </div>

                    {/* Sex Selection */}
                    <div className="mb-3">
                        <select
                            ref={(el) => (inputRefs.current["sex"] = el)}
                            className={`form-control ${validationErrors.sex ? "is-invalid" : ""}`}
                            id="sex"
                            name="sex"
                            defaultValue=""
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {validationErrors.sex && (
                            <div className="invalid-feedback">{validationErrors.sex}</div>
                        )}
                    </div>

                    {/* Date of Registration */}
                    <div className="mb-3">
                        <label className="form-label">Date of Registration</label>
                        <input
                            id="dateOfReg"
                            ref={(el) => (inputRefs.current["dateOfReg"] = el)}
                            className={`form-control w-50 ${validationErrors.dateOfReg ? "is-invalid" : ""}`}
                            type="date"
                        />
                        {validationErrors.dateOfReg && (
                            <div className="invalid-feedback">{validationErrors.dateOfReg}</div>
                        )}
                    </div>

                    {/* Nationality */}
                    <div className="mb-3">
                        <input
                            id="nationality"
                            ref={(el) => (inputRefs.current["nationality"] = el)}
                            className={`form-control ${validationErrors.nationality ? "is-invalid" : ""}`}
                            type="text"
                            placeholder="Enter Nationality"
                        />
                        {validationErrors.nationality && (
                            <div className="invalid-feedback">{validationErrors.nationality}</div>
                        )}
                    </div>

                    {/* City */}
                    <div className="mb-3">
                        <input
                            id="city"
                            ref={(el) => (inputRefs.current["city"] = el)}
                            className={`form-control ${validationErrors.city ? "is-invalid" : ""}`}
                            type="text"
                            placeholder="Enter City"
                        />
                        {validationErrors.city && (
                            <div className="invalid-feedback">{validationErrors.city}</div>
                        )}
                    </div>

                    {/* Sub-City */}
                    <div className="mb-3">
                        <input
                            id="subCity"
                            ref={(el) => (inputRefs.current["subCity"] = el)}
                            className={`form-control ${validationErrors.subCity ? "is-invalid" : ""}`}
                            type="text"
                            placeholder="Enter Sub-City"
                        />
                        {validationErrors.subCity && (
                            <div className="invalid-feedback">{validationErrors.subCity}</div>
                        )}
                    </div>

                    {/* Kebele */}
                    <div className="mb-3">
                        <input
                            id="kebele"
                            ref={(el) => (inputRefs.current["kebele"] = el)}
                            className={`form-control ${validationErrors.kebele ? "is-invalid" : ""}`}
                            type="text"
                            placeholder="Enter Kebele"
                        />
                        {validationErrors.kebele && (
                            <div className="invalid-feedback">{validationErrors.kebele}</div>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div className="mb-3">
                        <input
                            id="pnum"
                            ref={(el) => (inputRefs.current["pnum"] = el)}
                            className={`form-control ${validationErrors.pnum ? "is-invalid" : ""}`}
                            type="text"
                            placeholder="Enter Phone Number"
                        />
                        {validationErrors.pnum && (
                            <div className="invalid-feedback">{validationErrors.pnum}</div>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <input
                            id="email"
                            ref={(el) => (inputRefs.current["email"] = el)}
                            className={`form-control ${validationErrors.email ? "is-invalid" : ""}`}
                            type="email"
                            placeholder="Enter Email"
                        />
                        {validationErrors.email && (
                            <div className="invalid-feedback">{validationErrors.email}</div>
                        )}
                    </div>

                    {/* Qualification */}
                    <div className="mb-3">
                        <input
                            id="qualification"
                            ref={(el) => (inputRefs.current["qualification"] = el)}
                            className={`form-control ${validationErrors.qualification ? "is-invalid" : ""}`}
                            type="text"
                            placeholder="Enter Qualification"
                        />
                        {validationErrors.qualification && (
                            <div className="invalid-feedback">{validationErrors.qualification}</div>
                        )}
                    </div>

                    {/* Specialization */}
                    <div className="mb-3">
                        <input
                            id="specialization"
                            ref={(el) => (inputRefs.current["specialization"] = el)}
                            className={`form-control ${validationErrors.specialization ? "is-invalid" : ""}`}
                            type="text"
                            placeholder="Enter Specialization"
                        />
                        {validationErrors.specialization && (
                            <div className="invalid-feedback">{validationErrors.specialization}</div>
                        )}
                    </div>

                    {/* Years of Experience */}
                    <div className="mb-3">
                        <input
                            id="yearsOfExperience"
                            ref={(el) => (inputRefs.current["yearsOfExperience"] = el)}
                            className={`form-control ${validationErrors.yearsOfExperience ? "is-invalid" : ""}`}
                            type="number"
                            placeholder="Enter Years of Experience"
                            min="0"
                            max="50"
                        />
                        {validationErrors.yearsOfExperience && (
                            <div className="invalid-feedback">{validationErrors.yearsOfExperience}</div>
                        )}
                    </div>

                    {/* Status Checkbox */}
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            ref={(el) => (inputRefs.current["status"] = el)}
                            id="status"
                            className="form-check-input"
                        />
                        <label className="form-check-label">Active Status</label>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary text-white ms-4 mt-3 mb-4">
                        Register
                    </button>
                </form>
            </div>

            {/* Success Modal */}
            <div className="modal fade" id="successModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Success</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Teacher registered successfully!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}