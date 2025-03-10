import { useRef } from "react";

export default function RegAD() {
    const inputRefs = useRef({});

    const handleSubmit = async (e) => {
        e.preventDefault();

         const formData = {
            username: inputRefs.current.username.value,
            password: inputRefs.current.password.value,
            role: inputRefs.current.role.value,
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
            highestDegree:inputRefs.current.highestDegree.value,
            academicRank:inputRefs.current.academicRank.value,
        };

        try {
            const response = await fetch('http://localhost:8082/admin/ad', {
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
            alert("Academic Dean registered successfully!");
        } catch (error) {
            console.error('Error posting data:', error);
            alert("Registration failed!");
        }
    };

    return (
        <>
        <div className="ms-3">
            <h2 className="ms-3 mt-3 mb-3">Register Academic Dean</h2>
        <form onSubmit={handleSubmit}>
    {/* Username */}
    <input
        id="username"
        ref={(el) => (inputRefs.current["username"] = el)}
        className="form-control w-100"
        type="text"
        placeholder="Enter Username"
        required
    />
    <br />

    {/* Password */}
    <input
        id="password"
        ref={(el) => (inputRefs.current["password"] = el)}
        className="form-control w-100"
        type="password"
        placeholder="Enter Password"
        required
    />
    <br />

    {/* Hidden Input for Role */}
<input
    type="hidden"
    ref={(el) => (inputRefs.current["role"] = el)}
    name="role"
    value="ROLE_AD"
/>

    {/* Date of Birth */}
    <label className="ms-1" htmlFor="dob">Date of Birth</label>
    <input
        id="dob"
        ref={(el) => (inputRefs.current["dob"] = el)}
        className="form-control w-50 mt-2"
        type="date"
        placeholder="Enter Date of Birth"
        required
    />
    <br />

    {/* Sex Selection */}
    <select
        ref={(el) => (inputRefs.current["sex"] = el)}
        className="form-control w-100"
        id="sex"
        name="sex"
        required
         defaultValue=""
    >
        <option value="" disabled>Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
    </select>
    <br />

    {/* Date of Registration */}
     <label className="ms-1" htmlFor="dateOfReg">Date of Registration</label>
    <input
        id="dateOfReg"
        ref={(el) => (inputRefs.current["dateOfReg"] = el)}
        className="form-control w-50 mt-2"
        type="date"
        required
    />
    <br />

    {/* Nationality */}
    <input
        id="nationality"
        ref={(el) => (inputRefs.current["nationality"] = el)}
        className="form-control w-100"
        type="text"
        placeholder="Enter Nationality"
        required
    />
    <br />

    {/* City */}
    <input
        id="city"
        ref={(el) => (inputRefs.current["city"] = el)}
        className="form-control w-100"
        type="text"
        placeholder="Enter City"
        required
    />
    <br />

    {/* Sub-City */}
    <input
        id="subCity"
        ref={(el) => (inputRefs.current["subCity"] = el)}
        className="form-control w-100"
        type="text"
        placeholder="Enter Sub-City"
        required
    />
    <br />

    {/* Kebele */}
    <input
        id="kebele"
        ref={(el) => (inputRefs.current["kebele"] = el)}
        className="form-control w-100"
        type="text"
        placeholder="Enter Kebele"
        required
    />
    <br />

    {/* Phone Number */}
    <input
        id="pnum"
        ref={(el) => (inputRefs.current["pnum"] = el)}
        className="form-control w-100"
        type="text"
        placeholder="Enter Phone Number"
        required
    />
    <br />

    {/* Email */}
    <input
        id="email"
        ref={(el) => (inputRefs.current["email"] = el)}
        className="form-control w-100"
        type="email"
        placeholder="Enter Email"
        required
    />
    <br />
     {/* Qualification Input */}
                <input
                    id="qualification"
                    ref={(el) => (inputRefs.current["highestDegree"] = el)}
                    className="form-control w-100"
                    type="text"
                    placeholder="Enter Highest Degree"
                    required
                />
                <br />

                {/* Specialization Input */}
                <input
                    id="specialization"
                    ref={(el) => (inputRefs.current["academicRank"] = el)}
                    className="form-control w-100"
                    type="text"
                    placeholder="Enter Academic Rank"
                    required
                />
                <br />

      <label>
        <input
            type="checkbox"
            ref={(el) => (inputRefs.current["status"] = el)}
            id="status"
            className="ms-2 me-1"
        />
        Active Status
    </label>
    <br />

    {/* Submit Button */}
    <button type="submit" className="btn btn-primary text-white ms-4 mt-3 mb-4">
        Register
    </button>
</form>
            </div>
        </>
    );
}
