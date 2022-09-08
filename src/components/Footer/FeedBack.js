import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button } from "@mui/material";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postFeedBack } from "../../actions/feedback";

const feedbackSchema = {
  sendBy_name: "",
  sendBy_id: "",
  sendBy_img: "",
  message: "",
};

export default function HelperTextMisaligned() {
  const [feedback, setFeedback] = useState(feedbackSchema);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile")),
  );

  useEffect(() => {
    if (profile?._id) {
      setFeedback({
        ...feedback,
        sendBy_name: `${profile.firstName} ${profile.lastName}`,
        sendBy_id: profile._id,
        sendBy_img: profile.profile_img,
      });
    }
  }, []);

  const handleSubmit = () => {
    if (feedback.message !== "") {
      dispatch(postFeedBack(feedback));
      setAlert(true);
    }
  };

  return (
    <>
      {alert && (
        <div className="col-12 col-md-6  col-lg-4 mx-auto mb-5 ">
          <Alert
            severity="success"
            style={{ backgroundColor: "#183a1d", color: "#fff" }}
          >
            This is a success Submited — check it out!
          </Alert>
        </div>
      )}
    </>
  );
}
