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
            <div>

            </div>
            <div className="px-10 py-4">
                <form onSubmit={handleSubmit} className="flex justify-center items-center">
                    <input
                        type="text"
                        placeholder="Enter Youtube Playlist Link"
                        name="text"
                        className="input input-bordered input-accent w-5/6" />
                    <button className="btn bg-emerald-700 ml-2 text-white lg:text-lg text-sm">Success</button>
                </form>
                <p className="text-left lg:px-12 px-2 lg:py-6 pt-4 pb-2 lg:text-xl text-xs text-emerald-500">Acceptable format: https://www.youtube.com/playlist?list=PLc9n7cqrwBCv5gTPA0UlwdgsdgreS0eO6 <br /> Otherwise It will not work.</p>

            </div>
            {
                string.length > 1 && <div className="text-center flex justify-center items-center flex-col text-emerald-600">
                    <p className="lg:text-lg text-sm">Total time length of this playlist: {totalTime.hour} {totalTime.hour > 1 ? "Hours" : "Hour"} {totalTime.minute} {totalTime.minute > 1 ? "Minutes" : "Minute"} {totalTime.second} {totalTime.second > 1 ? "Seconds" : "Second"}</p>
                    <p className="lg:text-lg text-sm mt-3 lg:mt-4 text-emerald-600">
                        Average time length of each video: {averageTime.averageHour} {averageTime.averageHour > 1 ? "Hours" : "Hour"} {averageTime.averageMinute} {averageTime.averageMinute > 1 ? "Minutes" : "Minute"} {averageTime.averageSecond} {averageTime.averageSecond > 1 ? "Seconds" : "Second"}
                    </p>
                </div>
            }
        </div>
    )
}

export default Home;