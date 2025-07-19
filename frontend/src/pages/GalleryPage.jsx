import Gallery from '../components/HomePage/Gallery';

function GalleryPage() {
  return (
    <div className="px-3"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.0), rgba(235,163,169,1)), url(``)',
      }}
    >

      <div className="py-20">
        <Gallery />
      </div>

    </div>
  )
}

export default GalleryPage