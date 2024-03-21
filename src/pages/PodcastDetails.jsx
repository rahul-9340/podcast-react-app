import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Button from "../components/common/Button";
import EpisodesDetails from "../components/common/Podcast/PodcastCard/EpisodesDetails";
import AudioPlayer from "../components/common/Podcast/AudioPlayer";

export default function PodcastDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const[playingFile,setPlayingFile] = useState("")

  useEffect(()=>{
    if (id) {
      getData();
    }
  },[id]);



  

  const getData = async () => {
    try {
      const docRef = doc(db, "podcast", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPodcast({ id: id, ...docSnap.data() });
      } else {
        console.log("No Such Document");
        toast.error("No Such Document");
        navigate("/podcasts");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, "podcast", id, "episodes")),
      (querySnapshot) => {
        const episodeData = [];
        querySnapshot.forEach((doc) => {
          episodeData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodeData);
      },
      (error) => {
        console.log("Error Fetching Episodes", error);
      }
    );

    return () => {
      unSubscribe();
    };
  }, [id]);

  console.log(podcast);

  return (
    <div>
      <Header />

      <div className="input-wrapper" style={{ marginTop: "0rem" }}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent:"space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1 className="podcast-title-heading">{podcast.title}</h1>
              {podcast.createdBy == auth.currentUser.uid && (
                <Button
                  width={"300px"}
                  text={"create Episodes"}
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episodes`);
                  }}
                />
              )}
            </div>
            <div className="banner-wrapper">
              <img src={podcast.bannerImage} />
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1 className="podcast-title-heading">Episods</h1>
            {episodes.length > 0 ? (
              <>
                {episodes.map((items, index) => {
                  return (
                    <EpisodesDetails
                      key={index}
                      index={index + 1}
                      title={items.title}
                      description={items.description}
                      audioFile={items.audioFile}
                      onClick={(file) => setPlayingFile(file)}
                    />
                  );
                  
                })}
              </>
            ) : (
              <p>No Episodes</p>
            )}
          </>
        )}
      </div>
      {playingFile && <AudioPlayer audioSrc={playingFile} 
      image={podcast.displayImage}/>}
     </div>
  );
}
   