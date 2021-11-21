import React, { useState, useEffect } from "react";

function TimeAgo(props) {

    const [timeAgo, setTimeAgo] = useState("");
    // in miliseconds
    const units = {
    year  : 24 * 60 * 60 * 1000 * 365,
    month : 24 * 60 * 60 * 1000 * 365/12,
    day   : 24 * 60 * 60 * 1000,
    hour  : 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
    }

    let rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    const getTimeAgo = (givenDate, compareTo) => {
        let elapsed = givenDate - compareTo;
        console.log(elapsed);
        for (let u in units) {
            if (Math.abs(elapsed) > units[u] || u == 'second') {
                return rtf.format(Math.round(elapsed/units[u]), u);
            }
        }
    }

    useEffect(() => {
        if (props.time.creation && props.time.modified && timeAgo.length === 0) {
            let text = "";
            if (props.time.modified === props.time.creation) {
                text = getTimeAgo(new Date(props.time.creation), new Date());
                setTimeAgo("Listed " + text);
            }
            else {
                text = getTimeAgo(new Date(props.time.creation), new Date(props.time.modified));
                setTimeAgo("Edited  " + text);
            }
        }
    }, [props.time, timeAgo, setTimeAgo, getTimeAgo]);

    return (
        <div className="time-ago">
            {timeAgo}
        </div>
    )
}

export default TimeAgo;


