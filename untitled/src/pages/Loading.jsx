import React from 'react';

function Loading(props) {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <h1 className="text-5xl font-bold">Loading...</h1>
                <span className="loading loading-dots loading-lg"></span>
            </div>
        </div>
    );
}

export default Loading;