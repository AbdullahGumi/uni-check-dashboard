interface IProps {
  errorsArray?: string[];
  error?: string;
}

function ErrorDisplay({ errorsArray, error }: IProps) {
  if (errorsArray && errorsArray.length > 0) {
    return (
      <div className="w-full bg-red-200 p-5 rounded-lg my-5">
        {errorsArray.map((error) => (
          <p key={error} className="text-red-600 font-semibold text-xs">
            * {error}
          </p>
        ))}
      </div>
    );
  } else if (error) {
    return (
      <div className="w-full bg-red-200 p-5 rounded-lg my-5">
        <p className="text-red-600 font-semibold text-xs">* {error}</p>
      </div>
    );
  } else {
    return null;
  }
}

export default ErrorDisplay;
