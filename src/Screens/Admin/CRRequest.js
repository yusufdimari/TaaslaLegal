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

function CRRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchForms = () => {
      const formsRef = collection(db, "CRRequest");
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

  const handleResponse = async (requestId, response, email) => {
    const requestRef = doc(db, "CRRequest", requestId);
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

  const handleDocumentUpload = (e, requestId) => {
    // Placeholder function for handling document upload
    // You can implement the desired logic for handling the uploaded document here
    const file = e.target.files[0];
    console.log("Uploaded file:", file);
    console.log("Request ID:", requestId);
  };

  return (
    <div>
      <h1>CRRequest List</h1>
      <table
        style={{
          width: "100%",
          flex: "center",
        }}
      >
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Full Name</th>
            <th style={{ width: "20%" }}>Email</th>
            <th>Phone Number</th>
            <th>Date of Birth</th>
            <th>gender</th>
            <th style={{ width: "20%" }}>Company Name</th>
            <th style={{ width: "20%" }}>Alternative Business Name</th>
            <th>Residental Address</th>
            <th>company Address</th>
            <th>City</th>
            <th>Region</th>
            <th>NIN</th>
            <th>Action</th>
            <th>Upload Documents</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.formData?.fullName}</td>
              <td>{request.formData?.emailAddress}</td>
              <td>{request.formData?.phoneNumber}</td>
              <td>{request.formData?.dateOfBirth}</td>
              <td>{request.formData?.gender}</td>
              <td>{request.formData?.companyName}</td>
              <td>{request.formData?.alternativeName}</td>
              <td>{request.formData?.residentialAddress}</td>
              <td>{request.formData?.companyAddress}</td>
              <td>{request.formData?.city}</td>
              <td>{request.formData?.region}</td>
              <td>
                <button
                  onClick={() =>
                    window.open(request.formData.NINFile, "_blank")
                  }
                  style={{
                    backgroundColor: "grey",
                    padding: 10,
                    marginRight: 10,
                    borderWidth: 0,
                    borderRadius: 10,
                    color: "white",
                  }}
                >
                  View NIN
                </button>
              </td>
              <td>
                <button
                  onClick={() =>
                    handleResponse(
                      request.id,
                      true,
                      request.formData?.emailAddress
                    )
                  }
                  style={{
                    backgroundColor:
                      request.status === "Approved"
                        ? "green"
                        : request.status === "Denied"
                        ? "red"
                        : "blue",
                    padding: 10,
                    marginRight: 10,
                    borderWidth: 0,
                    borderRadius: 10,
                    color: "white",
                  }}
                  disabled={
                    request.status === "Approved" || request.status === "Denied"
                  }
                >
                  {request.status === "Approved"
                    ? "Approved"
                    : request.status === "Denied"
                    ? "Denied"
                    : "Approve"}
                </button>
                {request.status != "Approved" && request.status != "Denied" && (
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
                    disabled={request.status === "Approved"}
                  >
                    {request.status === "Approved" ? "Approved" : "Deny"}
                  </button>
                )}
              </td>
              <td>
                {/* Upload Document */}
                <input
                  type="file"
                  id={`document-upload-${request.id}`}
                  className="document-input"
                  onChange={(e) => handleDocumentUpload(e, request.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CRRequests;
