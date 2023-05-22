import { useState, useEffect } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "./styles.css";
import { useAuth } from "../../../Components/Auth/use-auth";
import { useNavigate } from "react-router";
import emailjs from "@emailjs/browser";

export default function BRForm() {
  const storage=getStorage()
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
    NINFile: null,
    signatureFile: null,
    passportFile: null,
  });
  useEffect(() => {
    const templateParams = {
      name: "James",
      notes: "Check this out!",
    };

    emailjs
      .send(
        "<YOUR_SERVICE_ID>",
        "<YOUR_TEMPLATE_ID>",
        templateParams,
        "<YOUR_PUBLIC_KEY>"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadFileToStorage = async (file) => {
    try {
      const storageRef = ref(storage, file.name);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle the error appropriately
      return null;
    }
  };

  const handleDocumentUpload1 = async (e) => {
    const file = e.target.files[0];
    const downloadUrl = await uploadFileToStorage(file);
    setFormData({ ...formData, NINFile: downloadUrl });
  };

  const handleDocumentUpload2 = async (e) => {
    const file = e.target.files[0];
    const downloadUrl = await uploadFileToStorage(file);
    setFormData({ ...formData, signatureFile: downloadUrl });
  };

  const handleDocumentUpload3 = async (e) => {
    const file = e.target.files[0];
    const downloadUrl = await uploadFileToStorage(file);
    setFormData({ ...formData, passportFile: downloadUrl });
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



    const message = {
      text: "i hope this works",
      from: "you <username@your-email.com>",
      to: "someone <someone@your-email.com>, another <another@your-email.com>",
      cc: "else <else@your-email.com>",
      subject: "testing emailjs",
    };


    

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
        <header>Business Registration Form</header>
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
          <div className="input-box">
            <label>
              Upload National Identification Number (NIN)
              <h5 style={{ color: "red" }}>(Data Page)</h5>
            </label>
            <input
              type="file"
              accept="application/pdf" // Adjust the accepted file types if needed
              onChange={handleDocumentUpload1}
            />
          </div>
          <div className="input-box">
            <label>
              Upload signature
              <h5 style={{ color: "red" }}>(should be clear)</h5>
            </label>
            <input
              type="file"
              accept="application/pdf" // Adjust the accepted file types if needed
              onChange={handleDocumentUpload2}
            />
          </div>
          <div className="input-box">
            <label>
              Upload Passport Photo
              <h5 style={{ color: "red" }}>
                (should be written on a plain white paper)
              </h5>
            </label>
            <input
              type="file"
              accept="application/pdf" // Adjust the accepted file types if needed
              onChange={handleDocumentUpload3}
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
