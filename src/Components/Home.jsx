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
            .then(data => setVideoInfo(data.items))
    }, [])

    const duration = videoInfo.map(item => {
        const durationValue = item.contentDetails.duration
        const match = durationValue.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = (match[1] || '0H').slice(0, -1);
        const minutes = (match[2] || '0M').slice(0, -1);
        const seconds = (match[3] || '0S').slice(0, -1);
        return `${hours ? hours + ':' : ''}${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    });

    const totalDuration = duration.map(item => {
        const singleVideoDuration = item.split(':')
        const duration = parseInt(singleVideoDuration[0]) * 3600 + parseInt(singleVideoDuration[1]) * 60 + parseInt(singleVideoDuration[2]);
        return duration;
    })
    // totalSecondsDuration = 
    totalDuration.reduce((accumulator, currentValue) => {
        // console.log(item)
        let totalSeconds = 0;
        totalSeconds = accumulator + currentValue;
        console.log(totalSeconds)
    })
    // console.log(totalSecondsDuration)
    return (
        <div>

        </div>
    )
}

export default Home;