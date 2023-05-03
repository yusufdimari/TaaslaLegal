import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useAuth } from "../../../Components/Auth/use-auth";
import "./documentStyle.css";

function Documents() {
  const [forms, setForms] = useState([]);
  const db = getFirestore();
  const { user } = useAuth();

  useEffect(() => {
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

    fetchForms();
  }, []);

  return (
    <div>
      <h1>My Forms</h1>
      <ul>
        {forms.map((form) => (
          <li key={form.id}>
            <div>
              <strong>Business Name:</strong> {form.formData.businessName}
            </div>
            <div>
              <strong>Status:</strong> {form.status}
            </div>
            <div>
              <strong>Created At:</strong>{" "}
              {new Date(form.createdAt.seconds * 1000).toLocaleDateString(
                "en-GB"
              )}
            </div>
            <button
              onClick={() => (window.location.href = `/forms/${form.id}`)}
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Documents;
