import React, { useEffect, useState } from "react";
import CardSlider from "./CardSlider";
import NewlyAddedCardSlider from "./NewlyAddedCardSlider";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../utils/firebase-config";
import { getDownloadURL, ref } from "firebase/storage";

export default React.memo(function Slider({ movies, type }) {
  const [addedMovies, setAddedMovies] = useState([]);

  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };

  const getAddedMovies = async () => {
    const querySnapshot = await getDocs(collection(db, "Movies"));
    console.log(querySnapshot);
    const movies = querySnapshot.docs.map(async (doc) => {
      const imageRef = ref(storage, `images/${doc.data()?.ImageName}`);
      console.log(imageRef);
      await getDownloadURL(imageRef).then((url) => {
        setAddedMovies((prevMovies) => {
          if (!prevMovies.find((movie) => movie.id == doc.id)) {
            return [
              ...prevMovies,
              {
                id: doc.id,
                title: doc?.data()?.Title,
                genre: doc?.data()?.Genre,
                imageName: doc.data()?.ImageName,
                url,
              },
            ];
          } else {
            return prevMovies;
          }
        });
      });
    });
  };

  useEffect(() => {
    getAddedMovies();
  }, []);

  return (
    <div>
      <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />
      <CardSlider title="New Releases" data={getMoviesFromRange(10, 20)} />
      <CardSlider
        title="BlockBuster Movies"
        data={getMoviesFromRange(20, 30)}
      />
      <CardSlider title="Popular" data={getMoviesFromRange(30, 40)} />
      <CardSlider title="Action" data={getMoviesFromRange(40, 50)} />
      <CardSlider title="Anime" data={getMoviesFromRange(50, 60)} />
      {type !== "tv" && (
        <NewlyAddedCardSlider title="Newly Added Movies" data={addedMovies} />
      )}
    </div>
  );
});
