import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import emailjs from '@emailjs/browser';
const ContactForm = () => {
  const [user, setUser] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const form = useRef();
  const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
   
    emailjs.sendForm('service_zvyn4uw', 'template_5vcb56c', form.current, 'kcQUIPquTRWfRvim8')
      .then((result) => {
        setUser({
          name: "",
          email: "",
          message: "",
        })
        setSubmit(true)
        const timer = setTimeout(() => {
          setSubmit(false);
      }, 900);
      return () => {
        clearTimeout(timer)
    }
      }, (error) => {
        alert("Failed to Submit ")
      });
  };
 
  return (
    <Form ref={form} onSubmit={postData} method="POST">
      <h3 className="Formheading">Interested to work together? Let's talk</h3>

      {submit && <p style={{color: "Green", margin:"auto", marginTop:"1.3rem",marginBottom:"1.3rem"}}>Submitted Successfully</p>}
      <Form.Group>
        <Form.Label>Full Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter  full name"
          required
          autoComplete="off"
          name="user_name"
          value={user.name}
          onChange={handleChange}
          className="input"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          required
          autoComplete="off"
          name="user_email"
          value={user.email}
          onChange={handleChange}
          className="input"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Message:</Form.Label>

        <Form.Control
          type="textarea"
          placeholder="Message"
          required
          autoComplete="off"
          name="message"
          value={user.message}
          onChange={handleChange}
          className="input"
        />
      </Form.Group>
      <Button variant="primary" className="from-btn" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ContactForm;
