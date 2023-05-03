import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "./styles.css";
import { useAuth } from "../../../Components/Auth/use-auth";
import { useNavigate } from "react-router";

export default function BRForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    businessName: "",
    alternativeName: "",
    residentialAddress: "",
    businessAddress: "",
    city: "",
    region: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);
    const db = getFirestore();
    try {
      if (user.uid) {
        const docRef = await addDoc(collection(db, "BRRequest"), {
          formData,
          status: "Pending",
          createdBy: user.uid, // assuming you have already initialized Firebase authentication
          createdAt: new Date(),
        });
        navigate("/TaaslaLegal/client/documents");
        console.log("Document written with ID: ", docRef.id);
        // reset the form data after successful submission
        setFormData({
          fullName: "",
          emailAddress: "",
          phoneNumber: "",
          dateOfBirth: "",
          gender: "",
          businessName: "",
          alternativeName: "",
          residentialAddress: "",
          businessAddress: "",
          city: "",
          region: "",
          postalCode: "",
        });
      } else {
        throw "not logged in";
      }
    } catch (error) {
      alert("Error adding document: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <section class="brcontainer">
        <header>Registration Form</header>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-box">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter full name of proprietor"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <label>Email Address</label>
            <input
              type="email"
              name="emailAddress"
              placeholder="Enter email address"
              required
              value={formData.emailAddress}
              onChange={handleChange}
            />
          </div>

          {/* <div className="column"> */}
          <div className="input-box">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter phone number"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Enter birth date"
              required
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          {/* </div> */}
          <div className="gender-box">
            <h3>Gender</h3>
            <div className="genders">
              <div className="gender-option">
                <input
                  type="radio"
                  id="check-male"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                <label htmlFor="check-male">Male</label>
              </div>
              <div className="gender-option">
                <input
                  type="radio"
                  id="check-female"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                <label htmlFor="check-female">Female</label>
              </div>
            </div>
          </div>
          <div className="input-box business-name">
            <label>Business Name</label>
            <input
              type="text"
              placeholder="Enter Intended name"
              required
              onChange={handleChange}
              name="businessName"
            />
            <input
              type="text"
              placeholder="Enter Alternative name"
              required
              onChange={handleChange}
              name="alternativeName"
            />
          </div>

          <div className="input-box business-name">
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter full residental address"
              required
              onChange={handleChange}
              name="residentailAddress"
            />
            <input
              type="text"
              placeholder="Enter address of business"
              required
              onChange={handleChange}
              name="businessAddress"
            />

            {/* <div className="column"> */}
            <input
              type="text"
              placeholder="Enter your city"
              required
              onChange={handleChange}
              name="city"
            />
            {/* </div> */}
            {/* <div className="column"> */}
            <input
              type="text"
              placeholder="Enter your region"
              required
              onChange={handleChange}
              name="region"
            />
            <input
              type="text"
              placeholder="Enter postal code"
              required
              onChange={handleChange}
              name="postalCode"
            />
            {/* </div> */}
          </div>

          <button type="submit" className="submit-button" disabled={submitting}>
            Submit Form
          </button>
        </form>
      </section>
    </div>
  );
}
