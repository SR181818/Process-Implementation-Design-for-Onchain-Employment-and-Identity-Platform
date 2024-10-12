import React from 'react';
import { Link, useParams } from 'react-router-dom';

function JobDetails() {
    const { jobId } = useParams();

    return (
        <div>
            <h2>Job Details for Contract: {jobId}</h2>
            <Link to={`/chat/${jobId}`}>
                <button>Go to Chat</button>
            </Link>
        </div>
    );
}

export default JobDetails;
