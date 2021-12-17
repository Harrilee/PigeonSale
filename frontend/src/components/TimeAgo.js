// Referenced https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
import React, { useState, useEffect } from "react";

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
    for (let u in units) {
        if (Math.abs(elapsed) > units[u] || u === 'second') {
            return rtf.format(Math.round(elapsed/units[u]), u);
        }
    }
};

function TimeAgo(props) {

    const [timeAgo, setTimeAgo] = useState("");


    useEffect(() => {
        if (props.time.creation && props.time.modified && timeAgo.length === 0) {
            let text = "";
            if (props.time.modified === props.time.creation) {
                text = getTimeAgo(new Date(props.time.creation), new Date());
                setTimeAgo("Listed " + text);
            }
            else {
                text = getTimeAgo(new Date(props.time.modified), new Date());
                setTimeAgo("Edited  " + text);
            }
        }
    }, [props, timeAgo, setTimeAgo]);

    return (
        <div className="time-ago">
            {timeAgo}
        </div>
    )
}

export default TimeAgo;


