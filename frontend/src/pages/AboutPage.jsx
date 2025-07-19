import About from '../components/HomePage/About';

function AboutPage() {
  return (
    <div className="px-3"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.0), rgba(235,163,169,1)), url(``)',
      }}
    >

      <div className="py-20">
        <About/>
      </div>

    </div>
  )
}

export default AboutPage