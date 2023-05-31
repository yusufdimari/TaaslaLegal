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
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useAuth } from "../../Components/Auth/use-auth";
import { IoMdRefresh } from "react-icons/io";
import { sendForm } from "@emailjs/browser";

function BRRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    fetchForms();
  }, []);
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

  const handleResponse = async (
    requestId,
    response,
    email,
    name,
    businessName
  ) => {
    const requestRef = doc(db, "BRRequest", requestId);
    try {
      const docSnapshot = await getDoc(requestRef);
      if (docSnapshot.exists()) {
        if (docSnapshot.data().BRForm != null || !response) {
          await updateDoc(requestRef, {
            status: response ? "Approved" : "Denied",
          });
          console.log("here 1");
          await sendForm("service_e7d1yh7", "template_svfjads", {
            to_name: name,
            approved_name: businessName,
            user_email: email,
            status: response ? "Approved" : "Denied",
          })
            .then((result) => {
              alert("sent");
            })
            .catch((error) => alert("error"));
          console.log("here 2");
        } else {
          return alert("Please Upload File");
        }
        console.log("updated", docSnapshot.data().BRForm == null);
      } else {
        console.log("Document does not exist!");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
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

  const handleDocumentUpload = async (e, requestId) => {
    const file = e.target.files[0];
    const requestRef = doc(db, "BRRequest", requestId);
    const downloadUrl = await uploadFileToStorage(file);
    try {
      const docSnapshot = await getDoc(requestRef);
      if (docSnapshot.exists()) {
        await updateDoc(requestRef, {
          BRForm: downloadUrl,
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
      <div
        style={{
          width: "95%",
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1>BRRequest List</h1>

        <IoMdRefresh size={20} onClick={fetchForms} />
      </div>
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
            <th style={{ width: "20%" }}>Business Name</th>
            <th style={{ width: "20%" }}>Alternative Business Name</th>
            <th>Business Address</th>
            <th>City</th>
            <th>NIN</th>
            <th>Signature</th>
            <th>Passport</th>
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
              <td>{request.formData?.businessName}</td>
              <td>{request.formData?.alternativeName}</td>
              <td>{request.formData?.businessAddress}</td>
              <td>{request.formData?.city}</td>
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
                  View
                </button>
              </td>
              <td>
                <button
                  onClick={() =>
                    window.open(request.formData.signatureFile, "_blank")
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
                  View
                </button>
              </td>
              <td>
                <button
                  onClick={() =>
                    window.open(request.formData.passportFile, "_blank")
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
                  View
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
                {request?.BRForm != null ? (
                  <button
                    onClick={() =>
                      handleResponse(
                        request.id,
                        true,
                        request.formData?.emailAddress,
                        request.formData?.fullName,
                        request.formData?.businessName
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
                      request.status === "Approved" ||
                      request.status === "Denied"
                    }
                  >
                    {request.status == "Approved"
                      ? "Uploaded"
                      : request.status == "Denied"
                      ? "Denied"
                      : "Pending"}
                  </button>
                ) : (
                  <input
                    type="file"
                    accept="application/pdf"
                    id={`document-upload-${request.id}`}
                    className="document-input"
                    onChange={(e) => handleDocumentUpload(e, request.id)}
                    // disabled={BRForm}
                    placeholder={"uploaded"}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BRRequests;
