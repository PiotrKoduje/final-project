const Alert = ({ type, message }) => {
  const typeClasses = {
    info: "bg-blue-100 text-blue-800 border-blue-400",
    success: "bg-green-100 text-green-800 border-green-400",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-400",
    error: "bg-red-100 text-red-800 border-red-400",
  };

  return (
    <div className={`border px-4 py-3 mt-10 rounded ${typeClasses[type]}`}>
      {message}
    </div>
  );
};

export default Alert;