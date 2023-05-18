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
    alert("Thanks for doing business with us! Come back soon!!");
    const requestRef = doc(db, "BRRequest", requestId);
    try {
      const docSnapshot = await getDoc(requestRef);
      if (docSnapshot.exists()) {
        await updateDoc(requestRef, {
          paymentStatus: "Paid",
        });
        fetchForms();
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
      <h1>My Forms</h1>
      <table>
        <thead>
          <tr>
            <th>Business Name</th>
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
                {form.status === "Approved" ? (
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
                      backgroundColor: form.status == "Denied" ? "red" : "#ccc",
                      color: "#fff",
                      cursor: "not-allowed",
                    }}
                  >
                    {form.status}
                  </button>
                )}
              </td>

              <td>
                <button
                  onClick={() => (window.location.href = `/forms/${form.id}`)}
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
