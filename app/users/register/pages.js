export default function Register() {
    return (
     <div>
      <h1>Kullanıcı Düzenleme Sayfası</h1>
        <form>
          <img
            src={image}
            alt="Profil Fotoğrafı"
          />
          <br />
          <label>Kullanıcı Id </label>
          <input value={id} />
          <br />
          <label>First Name: </label>
          <input placeholder="Lütfen adınızı yazınız"
          />
          <br />
          <label>Last Name: </label>
          <input
            placeholder="Lütfen soyadınızı yazınız"
          />
          <br />
          <label>Kullanıcı Adı: </label>
          <input
            placeholder="Lütfen kullanıcı adınızı yazınız"
          />
          <br />
          <label>Telefon Numarası: </label>
          <input placeholder="Lütfen adınızı yazınız" />
          <br />
          <label>Age: </label>
          <input onChange={(e) => setAge(e.target.value)} value={age} />
          <br />
          <label>Email </label>
          <input onChange={(e) => setEmail(e.target.value)} value={email} />
          <br />
          <label>Adres: </label>
          <textarea
            onChange={(e) => setAddress(e.target.value)}
            value={address.address}
          />
          <br />
          <label>İş Adres: </label>
          <textarea
            onChange={(e) => setCompany(e.target.value)}
            value={company.address.address}
          />
          <br />
          <button onClick={handleClickUpdate}>Güncelle</button>
        </form>
     </div>
    )
  }