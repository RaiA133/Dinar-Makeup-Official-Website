import Rating from '../components/HomePage/Rating';

function RatingPage() {
  return (
    <div className="px-3"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.0), rgba(235,163,169,1)), url(``)',
      }}
    >

      <div className="py-20">
        <Rating/>
      </div>

    </div>
  )
}

export default RatingPage