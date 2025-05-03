import { useNavigate } from 'react-router-dom';
import Weddings from '../components/Products/Wedings';
import Makeups from '../components/Products/Makeups';

function ProductPage() {
  const navigate = useNavigate()


  return (

    <div className="mx-3">

      {/* List Product/Paket */}
      <div className="my-20">
        <Weddings/>
        <Makeups/>
      </div>

    </div>
  )
}

export default ProductPage