import React from 'react';

function ReviewSummary({summary}) {
  if (summary.length > 60) {
    return (
      <div className="tile-summary">
        <b>{summary.slice(0, 60)}...</b>
        <div>...{summary.slice(60)}</div>
      </div>)
  } else {
    return <div className="tile-summary"><b>{summary}</b></div>
  }
}

export default ReviewSummary;