import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { PiMouseScroll } from "react-icons/pi";

function Team() {

  const dataTeams = [
    '/img/gallery/teams/IMG_2331.jpg',
    '/img/gallery/teams/IMG_5922.jpg',
    '/img/gallery/teams/IMG_5935.jpg',
    '/img/gallery/teams/IMG_5975.jpg',
    '/img/gallery/teams/IMG_5976.jpg',
    '/img/gallery/teams/IMG_5978.jpg',
    '/img/gallery/teams/IMG_5979.jpg',
    '/img/gallery/teams/IMG_5981.jpg',
    '/img/gallery/teams/IMG_5983.jpg',
    '/img/gallery/teams/IMG_5985.jpg',
    '/img/gallery/teams/IMG_9706.jpeg',
  ]

  return (
    <div className="mx-1 sm:mx-20">

      {/* Judul (hanya ada di menu home) */}
      {window.location.pathname === "/" && (
        <div id='header-team' className="flex justify-center text-center gap-10 my-10 items-center">
          <div className="p-2">
            <h2 className="text-5xl font-bold mb-7 text-base-950">Tim Kami</h2>
            <p className="text-lg text-base-600">
              Profesional di Balik Setiap Momen Tak Terlupakan
            </p>
          </div>
        </div>
      )}

      <Tooltip
        id={`tooltip-team`}
        float
        delayShow={1000}   // delay before showing (in ms)
        content={
          <div className="flex items-center gap-2">
            <kbd className="kbd">Shift</kbd> + <PiMouseScroll />
          </div>
        }
      />

      <section>

        <div className="carousel carousel-center bg-transparent neutral rounded-box max-w-full space-x-4 p-4">
          {dataTeams.map((src, index) => (
            <div id={`data-team-${index}`} key={index} className="carousel-item">
              <img
                src={src}
                alt="Team"
                className="w-96 rounded-2xl"
                data-tooltip-id="tooltip-team"
                data-tooltip-place="top"
                data-tooltip-variant="light"
              />
            </div>
          ))}

        </div>

      </section>

    </div>
  )
}

export default Team