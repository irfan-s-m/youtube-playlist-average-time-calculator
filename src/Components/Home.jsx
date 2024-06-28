import { useEffect, useState } from "react";

const Home = () => {
    const [playListdata, setPlayListData] = useState([]);
    const [videoInfo, setVideoInfo] = useState([]);
    useEffect(() => {
        fetch(
            "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLC3y8-rFHvwjmgBr1327BA5bVXoQH-w5s&key=AIzaSyA0BCHh--FlKWEhB2jxIROI8ww5yQoLF6k")
            .then(res => res.json())
            .then(data => setPlayListData(data.items));
    }, []);

    useEffect(() => {
        const videosInfo = playListdata.map(item => item.snippet.resourceId.videoId).join(',')
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videosInfo}&key=AIzaSyA0BCHh--FlKWEhB2jxIROI8ww5yQoLF6k`)
            .then(res => res.json())
            .then(data => console.log(data.items))
    }, [])

    return (
        <div>

        </div>
    )
}

export default Home;
