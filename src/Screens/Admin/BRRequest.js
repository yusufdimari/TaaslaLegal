import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../Components/Auth/use-auth";

function BRRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchForms = () => {
      const formsRef = collection(db, "BRRequest");
      const q = query(formsRef);
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const formsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRequests(formsList);
          console.log(formsList);
        },
        (error) => {
          console.error("Error fetching documents: ", error);
        }
      );

      // Return the unsubscribe function to stop listening to changes
      return unsubscribe;
    };

    fetchForms();
  }, []);
  // useEffect(() => {
  //   const unsubscribe = db
  // .collection("BRRequest")
  //       .orderBy("createdBy")
  //       .onSnapshot((snapshot) => {
  //         const newRequests = snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }));
  //         // setRequests(newRequests);
  //       });
  //     return () => unsubscribe();
  //   }, []);

  const handleResponse = async (requestId, response) => {
    const requestRef = doc(db, "BRRequest", requestId);
    try {
      const docSnapshot = await getDoc(requestRef);
      if (docSnapshot.exists()) {
        await updateDoc(requestRef, {
          status: response ? "Approved" : "Denied",
        });
        console.log("updated");
      } else {
        console.log("Document does not exist!");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div>
      <h1>BRRequest List</h1>
      <table
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Business Name</th>
            <th>Status</th>
            <th>Created At</th>
            <th>City</th>
            <th style={{ width: "20%" }}>Email</th>
            <th style={{ width: "20%" }}>Full Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.formData?.businessName}</td>
              <td
                style={{
                  backgroundColor:
                    request.status == "Approved"
                      ? "green"
                      : request.status == "Pending"
                      ? "yellow"
                      : "red",
                }}
              >
                {request.status}
              </td>
              <td>
                {new Date(request.createdAt?.seconds * 1000).toLocaleDateString(
                  "en-GB"
                )}
              </td>
              <td>{request.formData?.city}</td>
              <td>{request.formData?.emailAddress}</td>
              <td>{request.formData?.fullName}</td>
              <td>
                <button
                  onClick={() => handleResponse(request.id, true)}
                  style={{
                    backgroundColor: "green",
                    padding: 10,
                    marginRight: 10,
                    borderWidth: 0,
                    borderRadius: 10,
                    color: "white",
                  }}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleResponse(request.id, false)}
                  style={{
                    backgroundColor: "red",
                    padding: 10,
                    marginRight: 10,
                    borderWidth: 0,
                    borderRadius: 10,
                    color: "white",
                  }}
                >
                  Deny
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BRRequests;
