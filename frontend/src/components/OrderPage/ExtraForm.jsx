import { useState } from 'react';
import ExtraFormText from "../Ai/OrderPage/ExtraFormText"
import ExtraFormImage from "../Ai/OrderPage/ExtraFormImage"

function ExtraForm({ formData, handleValidationData }) {
  const [resultAIText, setResultAIText] = useState('');
  const [resultImage, setResultImage] = useState('');

  return (
    <div className="md:mb-10">
      {/* Header */}
      <div className="text-md sm:text-xl flex font-bold justify-center w-full my-5">Data Opsional</div>

      {/* Notes (Opsional) */}
      <fieldset className="fieldset h-full">
        <legend className="fieldset-legend ms-1">Notes <span>(opsional)</span></legend>
        <div className='relative'>

          <textarea className="textarea h-48 w-full" placeholder="Masukan catatan, perubahan data atau keinginan lain dengan lengkap"
            name="notes"
            value={resultAIText} // pakai value dari state
            onChange={(e) => setResultAIText(e.target.value)}
          >
          </textarea>

          {/* Generate Deskripsi Tambhan dengan AI */}
          <ExtraFormText
            formData={formData}
            handleValidationData={handleValidationData}
            resultAIText={resultAIText}
            setResultAIText={setResultAIText}
          />

        </div>
      </fieldset>

      {/* File (Opsional) */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">File <span>(opsional)</span></legend>
        <div className="join">

          <input className="file-input w-full join-item" type="file" name="documents" />

          {/* Generate Desain / Gambaran Tema dengan AI  */}
          <ExtraFormImage
            formData={formData}
            handleValidationData={handleValidationData}
            resultImage={resultImage}
            setResultImage={setResultImage}
          />

        </div>
        {resultImage && (
          <p className="text-sm text-green-500 mt-1">Gambar dari AI berhasil dibuat.</p>
        )}
        <label className="">beri kami gambaran desain milikmu sendiri. Contoh : desain tema wedding, desain tamu undangan, dll </label>
      </fieldset>

    </div>
  )
}

export default ExtraForm