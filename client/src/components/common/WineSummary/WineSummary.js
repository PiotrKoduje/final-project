import { API_URL } from '../../../config';
import { Link } from 'react-router-dom';

const WineSummary = ({ id, name, photos, price }) => {
  return (
    <Link
      to={`/wines/${ id }`}
      className="flex flex-col w-full h-full bg-surface p-4 border border-muted rounded-md shadow-sm hover:shadow-lg transition-shadow duration-200"
    >
      <img
        src={`${ API_URL }/public/uploads/photos/${ photos }`}
        alt={ name }
        className="w-full h-64 object-contain bg-white p-2 mb-4 rounded"
      />
      <h3 className="text-text xs:text-base lg:text-lg font-semibold mb-2">{ name }</h3>
      <p className="text-primary xs:text-base lg:text-lg font-bold mt-auto">{ price } zł</p>
    </Link>
  );
};

export default WineSummary;

