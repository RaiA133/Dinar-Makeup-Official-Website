import Weddings from '../components/Products/Weddings';
import Makeups from '../components/Products/Makeups';

function PricingPage() {

  return (
    <div className="px-3"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.0), rgba(235,163,169,1)), url(``)',
      }}
    >

      <div className="py-20">
        <Weddings/>
        <Makeups/>
      </div>

    </div>
  )
}

export default PricingPage