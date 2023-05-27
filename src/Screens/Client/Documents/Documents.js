import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import "./documentStyle.css";
import { PaystackButton } from "react-paystack";
import { useAuth } from "../../../Components/Auth/use-auth";
import { IoMdRefresh } from "react-icons/io";

function Documents() {
  const [forms, setForms] = useState([]);
  const db = getFirestore();
  const { user } = useAuth();
  let amount = 5000;

  const fetchForms = async () => {
    try {
      const formsRef = collection(db, "BRRequest");
      const q = query(formsRef, where("createdBy", "==", user.uid)); // assuming you have already initialized Firebase authentication
      const querySnapshot = await getDocs(q);
      const formsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setForms(formsList);
      console.log(formsList);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };
  useEffect(() => {
    fetchForms();
  }, []);

  const handleResponse = async (requestId) => {
    const requestRef = doc(db, "BRRequest", requestId);
    try {
      const docSnapshot = await getDoc(requestRef);
      if (docSnapshot.exists()) {
        await updateDoc(requestRef, {
          Paid: "Paid",
        });
        fetchForms();
        alert("Thanks for doing business with us! Come back soon!!");
        console.log("updated");
      } else {
        console.log("Document does not exist!");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const componentProps = {
    text: "Pay Now",
    onClose: () => alert("Wait! Don't leave :("),
  };

  return (
    <div>
      <div
        style={{
          width: "95%",
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1>My Documents</h1>

        <IoMdRefresh size={20} onClick={fetchForms} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Business Name</th>
            <th>Alternative Business Name</th>
            <th>Amount (&#8358;)</th>
            <th>Status</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.id}>
              <td>{form.formData.businessName}</td>
              <td>{form.formData.alternativeName}</td>
              <td>
                {amount
                  ? amount.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })
                  : "-"}
              </td>
              <td>{form.status}</td>
              <td>
                {form.status === "Approved" && !form.Paid ? (
                  <PaystackButton
                    publicKey="pk_test_9bfa277c5a6cc1af3619355614fa4769f43123d8"
                    onClose={() => alert("Payment not completed")}
                    text={form.paymentStatus === "paid" ? "Paid" : "Pay"}
                    onSuccess={() => handleResponse(form.id)}
                    email={form.formData.emailAddress}
                    amount={500000}
                    phone={form.formData.phone}
                  />
                ) : (
                  <button
                    disabled
                    style={{
                      backgroundColor: form.Paid == "Paid" ? "green" : "red",
                      color: "#fff",
                      cursor: "not-allowed",
                    }}
                  >
                    {form.Paid ?? "Denied"}
                  </button>
                )}
              </td>

              <td>
                <button
                  onClick={() => {
                    window.open(form.BRForm, "_blank");
                  }}
                  disabled={form.Paid != "Paid"}
                  style={{ backgroundColor: !form.Paid ? "grey" : "green" }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Documents;
