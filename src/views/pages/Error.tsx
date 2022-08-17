import "../../assets/css/Error.css";

function Error({ code }: { code: number }) {
  return (
    <div id="error-page">
      <div className="error-code">
        <h1>Error {code}</h1>
      </div>
    </div>
  );
}

export default Error;
