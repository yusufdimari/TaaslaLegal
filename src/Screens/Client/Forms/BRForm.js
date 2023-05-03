import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import './styles.css'

export default function BRForm() {
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
        const db = getFirestore();
        try {
          const docRef = await addDoc(collection(db, "BRRequest"), formData);
          console.log("Document written with ID: ", docRef.id);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      };
  return (
<div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:20, marginBottom:20}}>
<section class="brcontainer">
      <header>Registration Form</header>
      <form onSubmit={handleSubmit}>
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

      <div className="column">
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
      </div>
      <div className="gender-box">
        <h3>Gender</h3>
        <div className="gender-option">
          <div className="gender">
            <input
              type="radio"
              id="check-male"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            <label>Male</label>
            <input
              type="radio"
              id="check-male"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange} />
            <label>Female</label>

              </div>
              </div>
              </div>
                    <div class="input-box business-name">
            <label>Business Name</label>
            <input type="text" placeholder="Enter Intended name" required />
            <input type="text" placeholder="Enter Alternative name" required />
          </div>

          <div class="input-box address">
            <label>Address</label>
            <input type="text" placeholder="Enter full residental address" required />
            <input type="text" placeholder="Enter address of business" required />
            <div class="column">
  
              <input type="text" placeholder="Enter your city" required />
            </div>
            <div class="column">
              <input type="text" placeholder="Enter your region" required />
              <input type="text" placeholder="Enter postal code" required />
            </div>
          </div>

      </form>
      </section>
</div>)
}