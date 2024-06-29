import { useEffect, useState } from "react";
const Home = () => {
    const [playListdata, setPlayListData] = useState([]);
    const [videoInfo, setVideoInfo] = useState([]);
    const [string, setString] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const newFormValue = e.target.text.value;
        const formIntoString = newFormValue.split('=');
        if (formIntoString.length > 1) {
            const finalString = formIntoString[1];
            const str = finalString?.split('&');
            setString(str[0]);
        }
    }
    useEffect(() => {
        if (string) {
            fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${string}&key=AIzaSyA0BCHh--FlKWEhB2jxIROI8ww5yQoLF6k`)
                .then(res => res.json())
                .then(data => setPlayListData(data.items))
        }
    }, [string]);

    useEffect(() => {
        const videosInfo = playListdata.map(item => item.snippet.resourceId.videoId).join(',')
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videosInfo}&key=AIzaSyA0BCHh--FlKWEhB2jxIROI8ww5yQoLF6k`)
            .then(res => res.json())
            .then(data => setVideoInfo(data.items))
    }, [playListdata])

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
    let totalSecondsDuration = 0;
    for (const item of totalDuration) {
        totalSecondsDuration = totalSecondsDuration + item;
    }

    const totalTimeCount = (totalTimeInSecond) => {
        const hour = parseInt(totalTimeInSecond / 3600);
        const remainingSeconds = totalTimeInSecond % 3600;
        const minute = parseInt(remainingSeconds / 60);
        const second = remainingSeconds % 60;
        const { ...totalTime } = { hour, minute, second }
        return totalTime;
    }
    const totalTime = totalTimeCount(totalSecondsDuration)


    const averageTimeCount = (totalTimeInSecond) => {
        const averageTimeInSeconds = totalTimeInSecond / videoInfo.length;
        const averageHour = parseInt(averageTimeInSeconds / 3600);
        const averageTimeRemaining = averageTimeInSeconds % 3600;
        const averageMinute = parseInt(averageTimeRemaining / 60);
        const averageSecond = parseInt(averageTimeRemaining % 60);
        const { ...averageTime } = { averageHour, averageMinute, averageSecond };
        return averageTime;
    }
    const averageTime = averageTimeCount(totalSecondsDuration)
    return (
        <div>
            <form onSubmit={handleSubmit} action="">
                <input
                    type="text"
                    placeholder="Enter Youtube Playlist Link"
                    name="text"
                    className="input input-bordered input-accent w-full max-w-xs" />
                <button className="btn btn-success ml-2">Success</button>
            </form>
            {
                string.length > 1 && <div>
                    <div>
                        Total time length of this playlist: {totalTime.hour} {totalTime.hour > 1 ? "Hours" : "Hour"} {totalTime.minute} {totalTime.minute > 1 ? "Minutes" : "Minute"} {totalTime.second} {totalTime.second > 1 ? "Seconds" : "Second"}
                    </div>
                    <div>
                        Average time length of this playlist: {averageTime.averageHour} {averageTime.averageHour > 1 ? "Hours" : "Hour"} {averageTime.averageMinute} {averageTime.averageMinute > 1 ? "Minutes" : "Minute"} {averageTime.averageSecond} {averageTime.averageSecond > 1 ? "Seconds" : "Second"}
                    </div>
                </div>
            }
        </div>
    )
}

export default Home;