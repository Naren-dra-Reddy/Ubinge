import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { db, storage } from "../utils/firebase-config";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { redirect, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState(null);
  const { auth, setAuth } = useAuth() || {};
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(title, genre, image);
    const imageRef = ref(storage, `images/${image?.name}`);
    image &&
      (await uploadBytes(imageRef, image).then((snapshot) => {
        console.log(snapshot);
      }));
    await addDoc(collection(db, "Movies"), {
      Title: title,
      ImageName: image?.name || "",
      Genre: genre,
    }).then(() => {
      console.log("here");
      navigate("/");
    });
  };

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Navbar />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Add a movie</h3>
            </div>
            <div className="container flex column">
              <input
                type="text"
                placeholder="Enter movie title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="image-form-item">
                <label>Upload an image</label>
                <input
                  type="file"
                  placeholder="Title"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <input
                type="text"
                placeholder="Enter genre"
                onChange={(e) => setGenre(e.target.value)}
              />

              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          //   align-items: flex-start;
          input {
            padding: 0.5rem 0.5rem;
            width: 15rem;
          }
          input#file-upload-button {
            text: ef;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
          .image-form-item {
            display: flex;
            gap: 0.5em;
            flex-direction: column;
            align-items: flex-start;
            input {
              padding-left: 0;
            }
          }
        }
      }
    }
  }
`;

export default AddMovie;
