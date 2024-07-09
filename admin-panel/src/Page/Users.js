import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_BASE } from "./constant";
import "./Users.css"; // Import the CSS file

const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_BASE}/getusers`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-container">
      {loading ? (
        <p className="text-center my-2">Loading...</p>
      ) : data.length > 0 ? (
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Intention</th>
                <th>Height</th>
                <th>Job Title</th>
                <th>Personality</th>
                <th>Hobbies</th>
                <th>Drinks</th>
                <th>Image URLs</th> {/* New column for image URLs */}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.email || "N/A"}</td>
                  <td>{item.firstName || "N/A"}</td>
                  <td>{item.lastName || "N/A"}</td>
                  <td>{item.gender || "N/A"}</td>
                  <td>{item.age || "N/A"}</td>
                  <td>{item.intention || "N/A"}</td>
                  <td>{item.height || "N/A"}</td>
                  <td>{item.jobTitle || "N/A"}</td>
                  <td>
                    {Array.isArray(item.personality) ? item.personality.join(", ") : "N/A"}
                  </td>
                  <td>
                    {Array.isArray(item.hobbies) ? item.hobbies.join(", ") : "N/A"}
                  </td>
                  <td>{item.drinks || "N/A"}</td>
                  <td>
                    {item.imageUrls && item.imageUrls.length > 0 ? (
                      <ul>
                        {item.imageUrls.map((url, index) => (
                          <li key={index}>
                            <img src={url} alt={`Image ${index + 1}`} style={{ width: "100px", height: "100px" }} />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Empty Data</p>
      )}
    </div>
  );
};

export default Users;
