import { useNavigate } from "react-router";

const BackButton = ({ children, className }) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className={className}>
      {children}
    </button>
  );
};

export default BackButton;
