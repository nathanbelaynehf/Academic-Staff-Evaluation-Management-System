import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NotificationComponent = ({ showModal, setShowModal }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8082/stud/notifications',{credentials: "include",})
      .then(response => response.json())
      .then(data => {
        console.log("Fetched Notifications:", data);  // Debugging log
        if (data.length > 0) {
          setNotifications(data);
          console.log("Modal should be opening...");  // Debugging log
        }
      })
      .catch(error => console.error('Error fetching notifications:', error));
  }, []);

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showModal]);

  return (
    <div>
      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal fade show d-block" id="notificationModal" role="dialog" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Notifications</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <ul>
                {notifications.map((notification, index) => (
                  <li key={index} className="text-danger">
                     {notification}
                 </li>
                   ))}
                </ul>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
