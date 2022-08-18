import "../../assets/css/ReadMore.css";

function ReadMore({ onClick }: { onClick: () => any }) {
  return (
    <button className="custom-btn btn-4" onClick={onClick}>
      <span>Read More</span>
    </button>
  );
}

export default ReadMore;
