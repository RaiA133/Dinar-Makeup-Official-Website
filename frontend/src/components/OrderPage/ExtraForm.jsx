function ExtraForm() {
  return (
    <div className="md:mb-10">
      {/* Header */}
      <div className="text-md sm:text-xl flex font-bold justify-center w-full my-10">Data Opsional</div>

      <fieldset className="fieldset h-full">
        <legend className="fieldset-legend ms-1">Notes <span>(opsional)</span></legend>
        <textarea className="textarea h-48 w-full" placeholder="Masukan catatan, perubahan data atau keinginan lain dengan lengkap" name="notes"></textarea>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">File <span>(opsional)</span></legend>
        <input type="file" className="file-input w-full" name="documents" />
        <label className="">beri kami gambaran desain milikmu sendiri. Contoh : desain tema wedding, desain tamu undangan, dll </label>
      </fieldset>
    </div>
  )
}

export default ExtraForm